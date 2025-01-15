const RegisterController = require("./register.controller");
const SignInController = require("./signin.controller.js");
const SignOutController = require("./signout.controller.js");
const validator = require("../../middlewares/joi.middleware");

const { addUserValidation } = require("../users/user.validation.js");

module.exports = (router) => {
  router
    .route("/register")
    .post(validator(addUserValidation), RegisterController.registerUser);

  router.route("/signin").post(SignInController.signInUser);

  router.route("/signout").get(SignOutController.signOutUser);

  router.route("/current-user").get(SignInController.currentUser);
};
