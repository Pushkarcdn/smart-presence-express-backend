const { successResponse } = require("../../utils");
const { NotFoundException } = require("../../exceptions/index");
const GrooupsService = require("./groups.service");

const addGroup = async (req, res, next) => {
  try {
    const group = await GrooupsService.addGroup(req.body);
    return successResponse(res, group, "create", "group");
  } catch (error) {
    next(error);
  }
};

const getAllGroups = async (req, res, next) => {
  try {
    const groups = await GrooupsService.getAllGroups();
    return successResponse(res, groups, "fetch", "groups");
  } catch (error) {
    next(error);
  }
};

const getGroupById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const group = await GrooupsService.getGroupById(id);
    if (!group) throw new NotFoundException("notFound", "groups");
    return successResponse(res, group, "fetch", "group");
  } catch (error) {
    next(error);
  }
};

const updateGroup = async (req, res, next) => {
  try {
    const { id } = req.params;
    const group = await GrooupsService.updateGroup(id, req.body);
    if (!group) throw new NotFoundException("notFound", "groups");
    return successResponse(res, group, "update", "group");
  } catch (error) {
    next(error);
  }
};

const deleteGroup = async (req, res, next) => {
  try {
    const { id } = req.params;
    const group = await GrooupsService.deleteGroup(id);
    if (!group) throw new NotFoundException("notFound", "groups");
    return successResponse(res, "deleted", "delete", "groups");
  } catch (error) {
    next(error);
  }
};

module.exports = {
  addGroup,
  getAllGroups,
  getGroupById,
  updateGroup,
  deleteGroup,
};
