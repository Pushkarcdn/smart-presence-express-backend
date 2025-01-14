const { successResponse } = require("../../utils");

const { AuthException, HttpException } = require("../../exceptions/index");
const { signAccessToken } = require("../../lib/jwt");
const { saveAccessToken } = require("../accessTokens/accessToken.service");
const { verifyHashedPassword } = require("../../lib/bcrypt.js");

const { getAdminByEmail, updateAdmin } = require("../admins/admin.service.js");

const currentUser = async (req, res, next) => {
  try {
    if (req?.user) {
      return successResponse(res, req?.user, "fetch", "auth");
    } else {
      throw new AuthException("unauthorized", "");
    }
  } catch (err) {
    next(err);
  }
};

const signinAdmin = async (req, res, next) => {
  try {
    const { email } = req.body;
    const admin = await getAdminByEmail(email);

    if (!admin) throw new AuthException("invalidCredential", "");

    processLogin(req, res, next, admin);
  } catch (error) {
    next(error);
  }
};

const processLogin = async (req, res, next, user) => {
  try {
    const role = user.role;
    const { password } = req.body;
    const hashedPassword = user.password;

    if (!hashedPassword && user?.oAuthId) {
      const oauthProvider = user?.oAuthProvider;
      throw new HttpException(
        403,
        "Please sign in with " +
          oauthProvider +
          " as you have signed up with " +
          oauthProvider,
        "OAuth"
      );
    }

    const isMatch = await verifyHashedPassword(password, hashedPassword);

    if (!isMatch) throw new AuthException("invalidCredential", "");

    const accessToken = await signAccessToken({
      id: user.dataValues.id,
      email: user.dataValues.email,
      role,
    });

    let tokenPayload = {
      accessToken,
      email: user?.dataValues?.email,
      ip: req?.ip,
    };

    await updateAdmin(user.dataValues.id, { lastLogin: new Date() });

    await saveAccessToken(tokenPayload);

    res.cookie("access_token", accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
    });

    return successResponse(res, "Successfully Logged in", "loggedIn", role);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  currentUser,
  signinAdmin,
};
