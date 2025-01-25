const { successResponse } = require("../../utils");
const {
  invalidateAccessToken,
} = require("../accessTokens/accessToken.service");

const signOutUser = async (req, res, next) => {
  try {
    res.clearCookie("access_token", {
      httpOnly: true,
      // for localhost only
      // secure: true,
      // sameSite: "none",
      // for running on local devices using IP
      secure: false,
      sameSite: "lax",
      // domain: "192.168.1.65", // Allow the cookie to be set for the backend's IP
    });

    if (req.cookies.access_token)
      await invalidateAccessToken(req.cookies.access_token);

    return successResponse(
      res,
      "User signed out successfully",
      "loggedOut",
      "auth.signout"
    );
  } catch (error) {
    next(error);
  }
};

module.exports = { signOutUser };
