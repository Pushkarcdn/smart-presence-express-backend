const { modules } = require("../../lib/sequelize");

const addModule = async (payload) => {
  return await modules.create(payload);
};

const getAllModules = async () => {
  return await modules.findAll();
};

const deleteModule = async (id) => {
  return await modules.destroy({
    where: {
      id,
    },
  });
};

module.exports = {
  addModule,
  getAllModules,
  deleteModule,
};
