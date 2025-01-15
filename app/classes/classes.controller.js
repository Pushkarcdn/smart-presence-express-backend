const { successResponse } = require("../../utils");
const { NotFoundException } = require("../../exceptions/index");
const ClassesService = require("./classes.service");

const addClass = async (req, res, next) => {
  try {
    const item = await ClassesService.addClass(req.body);
    return successResponse(res, item, "create", "class");
  } catch (error) {
    next(error);
  }
};

const getAllClasss = async (req, res, next) => {
  try {
    const classes = await ClassesService.getAllClasses();
    return successResponse(res, classes, "fetch", "classes");
  } catch (error) {
    next(error);
  }
};

const deleteClass = async (req, res, next) => {
  try {
    const { id } = req.params;
    const item = await ClassesService.deleteClass(id);
    if (!item) throw new NotFoundException("notFound", "classes");
    return successResponse(res, "deleted", "delete", "classes");
  } catch (error) {
    next(error);
  }
};

module.exports = {
  addClass,
  getAllClasss,
  deleteClass,
};
