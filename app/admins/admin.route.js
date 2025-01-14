const validator = require("../../middlewares/joi.middleware");
const { updateAdminValidation } = require("./admin.validation");
const AdminController = require("./admin.controller");
const upload = require("../../lib/multer");

module.exports = (router) => {
  router.route("/admins").get(AdminController.getAdmins);

  router.route("/admins/:id").get(AdminController.getAdminByID);

  router
    .route("/admins/:id")
    .put(
      validator(updateAdminValidation),
      upload.single("profileImage"),
      AdminController.updateAdmin
    );

  router.route("/admins/:id").delete(AdminController.deleteAdmin);
};
