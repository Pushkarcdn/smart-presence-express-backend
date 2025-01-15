const { successResponse } = require("../../utils");
const { NotFoundException } = require("../../exceptions/index");
const ModulesService = require("./modules.service");

const addModule = async (req, res, next) => {
  try {
    const module = await ModulesService.addPModule(req.body);
    return successResponse(res, module, "create", "module");
  } catch (error) {
    next(error);
  }
};

const getAllModules = async (req, res, next) => {
  try {
    const modules = await ModulesService.getAllModules();
    return successResponse(res, modules, "fetch", "modules");
  } catch (error) {
    next(error);
  }
};

const deleteModule = async (req, res, next) => {
  try {
    const { id } = req.params;
    const module = await ModulesService.deleteModule(id);
    if (!module) throw new NotFoundException("notFound", "modules");
    return successResponse(res, "deleted", "delete", "modules");
  } catch (error) {
    next(error);
  }
};

module.exports = {
  addModule,
  getAllModules,
  deleteModule,
};
