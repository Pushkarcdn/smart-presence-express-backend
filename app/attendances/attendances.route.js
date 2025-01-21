const AttendanceController = require("./attendances.controller");

module.exports = (router) => {
  router.route("/attendances").get(AttendanceController.getAllAttendances);

  router
    .route("/class-attendances/:id")
    .get(AttendanceController.getAttendanceByClass);

  router.route("/record-presence/:id").get(AttendanceController.markPresence);

  router
    .route("/day-attendances")
    .post(AttendanceController.getAttendanceByDay);

  router
    .route("/attendances/:id")
    .delete(AttendanceController.deleteAttendance);
};
