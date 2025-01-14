const { successResponse } = require("../../utils");
const { HttpException } = require("../../exceptions/index");

const { getAdminByEmail, addAdmin } = require("../admins/admin.service");

const registerAdmin = async (req, res, next) => {
  try {
    const existingAdmin = await getAdminByEmail(req.body.email);
    if (existingAdmin) throw new HttpException(409, "duplicateData", "admin");

    if (req.file) {
      if (req?.file && req.file?.path?.startsWith("public")) {
        req.file.path = req.file.path.slice(6);
      }
      req.body.profileImage = req.file.path;
    }

    const createdAdmin = await addAdmin(req.body);
    return successResponse(res, createdAdmin, "create", "admin");
  } catch (error) {
    next(error);
  }
};

module.exports = { registerAdmin };
