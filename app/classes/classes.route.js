const ClassesController = require("./classes.controller");

module.exports = (router) => {
  router.route("/classes").get(ClassesController.getAllClasss);

  router.route("/classes").post(ClassesController.addClass);

  router.route("/classes/:id").delete(ClassesController.deleteClass);
};
