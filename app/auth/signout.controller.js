const { successResponse } = require("../../utils");
const {
  invalidateAccessToken,
} = require("../accessTokens/accessToken.service");

const signOutUser = async (req, res, next) => {
  try {
    res.clearCookie("access_token", {
      httpOnly: true,
      secure: true,
      sameSite: "none",
    });

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
