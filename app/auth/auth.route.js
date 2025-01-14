const RegisterController = require("./register.controller");
const SignInController = require("./signin.controller.js");
const SignOutController = require("./signout.controller.js");
const validator = require("../../middlewares/joi.middleware");

const { addAdminValidation } = require("../admins/admin.validation.js");
// const upload = require("../../lib/multer");

module.exports = (router) => {
  // admin

  router.route("/register/admin").post(
    // upload.single("profileImage"),
    validator(addAdminValidation),
    RegisterController.registerAdmin
  );

  router.route("/signin/admin").post(SignInController.signinAdmin);

  // signout all/any user

  router.route("/signout").get(SignOutController.signOutUser);

  router.route("/current-user").get(SignInController.currentUser);
};
