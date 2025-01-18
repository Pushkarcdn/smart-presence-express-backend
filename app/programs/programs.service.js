const { programs, modules, groups, users } = require("../../lib/sequelize");

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
  return await programs.findAll({
    include: [
      {
        model: modules,
        as: "modules",
        attributes: ["id", "name", "credits"],
        include: [
          {
            model: users,
            as: "teachers",
            attributes: ["id", "firstName", "lastName"],
          },
        ],
      },
      {
        model: groups,
        as: "groups",
        attributes: ["id", "name"],
      },
    ],
  });
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
