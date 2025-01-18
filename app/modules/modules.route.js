const ModulesController = require("./modules.controller");

module.exports = (router) => {
  router.route("/modules").get(ModulesController.getAllModules);

  router.route("/modules/:id").get(ModulesController.getModuleById);

  router.route("/modules").post(ModulesController.addModule);

  router.route("/modules/:id").put(ModulesController.updateModule);

  router.route("/modules/:id").delete(ModulesController.deleteModule);
};
