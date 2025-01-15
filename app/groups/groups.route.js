const GroupsController = require("./groups.controller");

module.exports = (router) => {
  router.route("/groups").get(GroupsController.getAllGroups);

  router.route("/groups").post(GroupsController.addGroup);

  router.route("/groups/:id").delete(GroupsController.deleteGroup);
};
