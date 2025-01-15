const { successResponse } = require("../../utils");
const { NotFoundException } = require("../../exceptions/index");
const ProgramsService = require("./programs.service");

const addProgram = async (req, res, next) => {
  try {
    const program = await ProgramsService.addProgram(req.body);
    return successResponse(res, program, "create", "Program");
  } catch (error) {
    next(error);
  }
};

const getAllPrograms = async (req, res, next) => {
  try {
    const programs = await ProgramsService.getAllPrograms();
    return successResponse(res, programs, "fetch", "Program");
  } catch (error) {
    next(error);
  }
};

const deleteProgram = async (req, res, next) => {
  try {
    const { id } = req.params;
    const program = await ProgramsService.deleteProgram(id);
    if (!program) throw new NotFoundException("notFound", "programs");
    return successResponse(res, "deleted", "delete", "programs");
  } catch (error) {
    next(error);
  }
};

module.exports = {
  addProgram,
  getAllPrograms,
  deleteProgram,
};
