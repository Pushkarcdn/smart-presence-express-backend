const { successResponse } = require("../../utils");

const { AuthException } = require("../../exceptions/index");
const { signAccessToken } = require("../../lib/jwt");
const { saveAccessToken } = require("../accessTokens/accessToken.service");
const { verifyHashedPassword } = require("../../lib/bcrypt.js");

const {
  getUserByEmail,
  getUserByID,
  updateUser,
} = require("../users/user.service.js");

const currentUser = async (req, res, next) => {
  try {
    if (req?.user) {
      const user = await getUserByID(req?.user?.id);
      delete user.password;
      return successResponse(res, user, "fetch", "auth");
    } else {
      throw new AuthException("unauthorized", "");
    }
  } catch (err) {
    next(err);
  }
};

const signInUser = async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await getUserByEmail(email);

    if (!user) throw new AuthException("invalidCredential", "");

    processLogin(req, res, next, user);
  } catch (error) {
    next(error);
  }
};

const processLogin = async (req, res, next, user) => {
  try {
    const role = user.role;
    const { password } = req.body;
    const hashedPassword = user.password;

    // console.log(user.email, user.role);

    // if (!hashedPassword && user?.oAuthId) {
    //   const oauthProvider = user?.oAuthProvider;
    //   throw new HttpException(
    //     403,
    //     "Please sign in with " +
    //       oauthProvider +
    //       " as you have signed up with " +
    //       oauthProvider,
    //     "OAuth"
    //   );
    // }

    const isMatch = await verifyHashedPassword(password, hashedPassword);

    if (!isMatch) throw new AuthException("invalidCredential", "");

    const accessToken = await signAccessToken({
      id: user.id,
      email: user.email,
      role,
    });

    let tokenPayload = {
      accessToken,
      userId: user?.id,
      ip: req?.ip,
    };

    await updateUser(user.id, { lastLogin: new Date() });

    await saveAccessToken(tokenPayload);

    res.cookie("access_token", accessToken, {
      httpOnly: true,
      // for localhost & azure
      // secure: true,
      // sameSite: "none",
      // for running on local devices using IP
      secure: true,
      sameSite: "lax",
      // domain: "192.168.1.65", // Allow the cookie to be set for the backend's IP
    });

    return successResponse(res, "Successfully Logged in", "loggedIn", role);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  currentUser,
  signInUser,
};
