const { modules, programs } = require("../../lib/sequelize");

const addModule = async (payload) => {
  return await modules.create(payload);
};

const getAllModules = async () => {
  return await modules.findAll({
    include: [
      {
        model: programs,
        as: "program",
        attributes: ["name", "totalCredits"],
      },
    ],
  });
};

const getModuleById = async () => {
  return await modules.findOne({
    include: [
      {
        model: programs,
        as: "program",
        attributes: ["id", "name", "totalCredits"],
      },
    ],
  });
};

const updateModule = async (id, payload) => {
  return await modules.update(payload, {
    where: {
      id,
    },
  });
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
  getModuleById,
  updateModule,
  deleteModule,
};
