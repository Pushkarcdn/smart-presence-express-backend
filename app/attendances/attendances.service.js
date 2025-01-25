const { attendances } = require("../../lib/sequelize");

const markPresence = async (userId) => {
  return await attendances.create({
    userId,
  });
};

const getAllAttendances = async () => {
  return await attendances.findAll();
};

const getAttendancesByField = async (where) => {
  return await attendances.findAll({
    where,
  });
};

const getLastAttendance = async (userId) => {
  return await attendances.findOne({
    where: {
      userId,
    },
    order: [["createdAt", "DESC"]],
  });
};

const deleteAttendance = async (id) => {
  return await attendances.destroy({
    where: {
      id,
    },
  });
};

module.exports = {
  markPresence,
  getAllAttendances,
  getLastAttendance,
  getAttendancesByField,
  deleteAttendance,
};
