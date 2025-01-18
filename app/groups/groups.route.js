const GroupsController = require("./groups.controller");

module.exports = (router) => {
  router.route("/groups").get(GroupsController.getAllGroups);

  router.route("/groups/:id").get(GroupsController.getGroupById);

  router.route("/groups").post(GroupsController.addGroup);

  router.route("/groups/:id").put(GroupsController.updateGroup);

  router.route("/groups/:id").delete(GroupsController.deleteGroup);
};
