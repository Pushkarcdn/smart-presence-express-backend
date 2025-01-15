const { successResponse } = require("../../utils");
const { NotFoundException } = require("../../exceptions/index");
const AttendancesService = require("./attendances.service");

const markPresence = async (req, res, next) => {
  try {
    const { id } = req.body;
    const attendance = await AttendancesService.markPresence(id);
    return successResponse(res, attendance, "mark", "Attendance");
  } catch (error) {
    next(error);
  }
};

const getAllAttendances = async (req, res, next) => {
  try {
    const attendances = await AttendancesService.getAllAttendances();
    return successResponse(res, attendances, "fetch", "Attendance");
  } catch (error) {
    next(error);
  }
};

const getAttendanceByClass = async (req, res, next) => {
  try {
    const { id } = req.params;

    const attendances = await AttendancesService.getAttendancesByField({
      classId: id,
    });
    return successResponse(res, attendances, "fetch", "Attendance");
  } catch (error) {
    next(error);
  }
};

const deleteAttendance = async (req, res, next) => {
  try {
    const { id } = req.params;
    const attendance = await AttendancesService.deleteAttendance(id);
    if (!attendance) throw new NotFoundException("notFound", "attendances");
    return successResponse(res, "deleted", "delete", "Attendance");
  } catch (error) {
    next(error);
  }
};

module.exports = {
  markPresence,
  getAllAttendances,
  getAttendanceByClass,
  deleteAttendance,
};
