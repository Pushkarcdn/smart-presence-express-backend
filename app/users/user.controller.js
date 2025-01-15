const { successResponse } = require("../../utils");
const { NotFoundException } = require("../../exceptions/index");
const UsersService = require("./user.service");

const getAllUsers = async (req, res, next) => {
  try {
    const users = await UsersService.getAllUser();
    return successResponse(res, users, "fetch", "User");
  } catch (error) {
    next(error);
  }
};

const getUserByID = async (req, res, next) => {
  const { id } = req.params;
  try {
    const users = await UsersService.getUserByID(id);
    if (!users) throw new NotFoundException("notFound", "Users");

    return successResponse(res, users, "fetch", "Users");
  } catch (error) {
    next(error);
  }
};

const getUserByEmail = async (req, res, next) => {
  const { email } = req.params;
  try {
    const users = await UsersService.getUserByEmail(email);
    if (!users) throw new NotFoundException("notFound", "Users");

    return successResponse(res, users, "fetch", "Users");
  } catch (error) {
    next(error);
  }
};

const getStudents = async (req, res, next) => {
  try {
    const users = await UsersService.getUsersByField({
      role: "student",
    });
    if (!users) throw new NotFoundException("notFound", "Users");

    return successResponse(res, users, "fetch", "Users");
  } catch (error) {
    next(error);
  }
};

const getTeachers = async (req, res, next) => {
  try {
    const users = await UsersService.getUsersByField({
      role: "teacher",
    });
    if (!users) throw new NotFoundException("notFound", "Users");

    return successResponse(res, users, "fetch", "Users");
  } catch (error) {
    next(error);
  }
};

const getAdmins = async (req, res, next) => {
  try {
    const users = await UsersService.getUsersByField({
      role: "admin",
    });
    if (!users) throw new NotFoundException("notFound", "Users");

    return successResponse(res, users, "fetch", "Users");
  } catch (error) {
    next(error);
  }
};

const updateUser = async (req, res, next) => {
  try {
    const { id } = req.params;

    const existingUser = await UsersService.getUserByID(id);
    if (!existingUser) throw new NotFoundException("notFound", "Users");

    const users = await UsersService.updateUser(id, req.body);
    if (users[0]) throw new NotFoundException("notFound", "Users");
    return successResponse(res, "updated", "update", "User");
  } catch (err) {
    next(err);
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await UsersService.deleteUser(id);
    if (!user) throw new NotFoundException("notFound", "Users");
    return successResponse(res, "deleted", "delete", "User");
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllUsers,
  getUserByID,
  getUserByEmail,
  getStudents,
  getTeachers,
  getAdmins,
  updateUser,
  deleteUser,
};
