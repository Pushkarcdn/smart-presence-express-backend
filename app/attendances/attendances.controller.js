const { Op } = require("sequelize");

const { successResponse } = require("../../utils");
const { NotFoundException, HttpException } = require("../../exceptions/index");
const AttendancesService = require("./attendances.service");
const UsersService = require("../users/user.service");
const ClassService = require("../classes/classes.service");

const markPresence = async (req, res, next) => {
  try {
    const { id } = req.params;
    await AttendancesService.markPresence(id);
    const user = await UsersService.getUserByID(id);
    delete user.password;
    return successResponse(res, user, "update", "Attendance");
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

const getAttendanceByDay = async (req, res, next) => {
  try {
    const teacherId = req.user.id;
    const { groupId, date } = req.body;

    const targetDate = new Date(date);
    if (isNaN(targetDate.getTime()))
      throw new HttpException(422, "Invalid dateeeee", "Attendance");

    const classData = await ClassService.getClassByField({
      teacherId,
      groupId,
      date: {
        [Op.gte]: targetDate,
        [Op.lt]: new Date(targetDate.getTime() + 24 * 60 * 60 * 1000), // Add one day to targetDate
      },
    });

    if (!classData) throw new NotFoundException("notFound", "class");

    const { startTime, endTime } = classData;

    const nepaliToUtcOffset = 5 * 60 + 45; // 5 hours and 45 minutes

    // const startTimestamp = new Date(`${date}T${startTime}+00:00`);
    // const endTimestamp = new Date(`${date}T${endTime}+00:00`);

    const startTimeUtc = new Date(`${date}T${startTime}+00:00`);
    const endTimeUtc = new Date(`${date}T${endTime}+00:00`);

    // Adjust the times from Nepali Time to UTC
    startTimeUtc.setMinutes(startTimeUtc.getMinutes() - nepaliToUtcOffset);
    endTimeUtc.setMinutes(endTimeUtc.getMinutes() - nepaliToUtcOffset);

    if (isNaN(startTimeUtc.getTime()) || isNaN(endTimeUtc.getTime())) {
      throw new HttpException(422, "Invalid start or end time", "Attendance");
    }

    console.log("startTimeUtc", startTimeUtc);
    console.log("endTimeUtc", endTimeUtc);

    // Get attendances created between the start and end time in UTC
    const attendances = await AttendancesService.getAttendancesByField({
      createdAt: {
        [Op.gte]: startTimeUtc,
        [Op.lt]: endTimeUtc,
      },
    });

    // if (isNaN(startTimestamp.getTime()) || isNaN(endTimestamp.getTime())) {
    //   throw new HttpException(422, "Invalid start or end time", "Attendance");
    // }

    // console.log("startTimestamp", startTimestamp);
    // console.log("endTimestamp", endTimestamp);

    // // get attendances from attendance table which has been created between the start and end time of the class
    // const attendances = await AttendancesService.getAttendancesByField({
    //   createdAt: {
    //     [Op.gte]: startTimestamp,
    //     [Op.lt]: endTimestamp,
    //   },
    // });

    return successResponse(
      res,
      {
        attendances,
        classData,
      },
      "fetch",
      "Attendance"
    );
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
  getAttendanceByDay,
  deleteAttendance,
};
