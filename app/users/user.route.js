const validator = require("../../middlewares/joi.middleware");
const { updateUserValidation } = require("./user.validation");
const UserController = require("./user.controller");

module.exports = (router) => {
  router.route("/users").get(UserController.getAllUsers);

  router.route("/students").get(UserController.getStudents);

  router.route("/teachers").get(UserController.getTeachers);

  router.route("/admins").get(UserController.getAdmins);

  router.route("/users/:id").get(UserController.getUserByID);

  router
    .route("/users/:id")
    .put(validator(updateUserValidation), UserController.updateUser);

  router.route("/users/:id").delete(UserController.deleteUser);
};
