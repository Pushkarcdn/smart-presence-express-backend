const ProgramsController = require("./programs.controller");

module.exports = (router) => {
  router.route("/programs").get(ProgramsController.getAllPrograms);

  router.route("/programs/:id").get(ProgramsController.getProgramById);

  router.route("/programs").post(ProgramsController.addProgram);

  router.route("/programs/:id").put(ProgramsController.updateProgram);

  router.route("/programs/:id").delete(ProgramsController.deleteProgram);
};
