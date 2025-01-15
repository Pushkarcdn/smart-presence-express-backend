const { programs } = require("../../lib/sequelize");

const addProgram = async (payload) => {
  return await programs.create(payload);
};

const getAllPrograms = async () => {
  return await programs.findAll();
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
  getAllPrograms,
  deleteProgram,
};
