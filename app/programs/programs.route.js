const ProgramsController = require("./programs.controller");

module.exports = (router) => {
  router.route("/programs").get(ProgramsController.getAllPrograms);

  router.route("/programs").post(ProgramsController.addProgram);

  router.route("/programs/:id").delete(ProgramsController.deleteProgram);
};
