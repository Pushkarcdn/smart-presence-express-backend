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
  getAttendancesByField,
  deleteAttendance,
};
