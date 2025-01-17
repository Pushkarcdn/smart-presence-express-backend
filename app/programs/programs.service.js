const { programs } = require("../../lib/sequelize");

const addProgram = async (payload) => {
  return await programs.create(payload);
};

const updateProgram = async (id, payload) => {
  return await programs.update(payload, {
    where: {
      id,
    },
  });
};

const getAllPrograms = async () => {
  return await programs.findAll();
};

const getProgramById = async (id) => {
  return await programs.findOne({
    where: {
      id,
    },
  });
};

const deleteProgram = async (id) => {
  return await programs.destroy({
    where: {
      id,
    },
  });
};

module.exports = {
  addProgram,
  updateProgram,
  getProgramById,
  getAllPrograms,
  deleteProgram,
};
