const { successResponse } = require("../../utils");
const { NotFoundException } = require("../../exceptions/index");
const AdminsService = require("./admin.service");

const getAdmins = async (req, res, next) => {
  try {
    const admins = await AdminsService.getAdmins();
    return successResponse(res, admins, "fetch", "Admin");
  } catch (error) {
    next(error);
  }
};

const getAdminByID = async (req, res, next) => {
  const { id } = req.params;
  try {
    const admins = await AdminsService.getAdminByID(id);
    if (!admins) throw new NotFoundException("notFound", "Admins");

    return successResponse(res, admins, "fetch", "Admin");
  } catch (error) {
    next(error);
  }
};

const updateAdmin = async (req, res, next) => {
  try {
    const { id } = req.params;

    const existingAdmin = await AdminsService.getAdminByID(id);
    if (!existingAdmin) throw new NotFoundException("notFound", "Admins");

    if (req.file) {
      if (req?.file && req.file?.path?.startsWith("public")) {
        req.file.path = req.file.path.slice(6);
      }
      req.body.profileImage = req.file.path;
    }

    const admin = await AdminsService.updateAdmin(id, req.body);
    if (!admin[0]) throw new NotFoundException("notFound", "Admins");
    return successResponse(res, "updated", "update", "Admin");
  } catch (err) {
    next(err);
  }
};

const deleteAdmin = async (req, res, next) => {
  try {
    const { id } = req.params;
    const admin = await AdminsService.deleteAdmin(id);
    if (!admin) throw new NotFoundException("notFound", "Admins");
    return successResponse(res, "deleted", "delete", "Admin");
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAdmins,
  getAdminByID,
  updateAdmin,
  deleteAdmin,
};
