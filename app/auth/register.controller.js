const { successResponse } = require("../../utils");
const { HttpException } = require("../../exceptions/index");

const { getUserByEmail, addUser } = require("../users/user.service");

const registerUser = async (req, res, next) => {
  try {
    const existingUser = await getUserByEmail(req.body.email);
    if (existingUser) throw new HttpException(409, "duplicateData", "user");

    const createdUser = await addUser(req.body);
    return successResponse(res, createdUser, "create", "User");
  } catch (error) {
    next(error);
  }
};

module.exports = {
  registerUser,
};
