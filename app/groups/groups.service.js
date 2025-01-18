const { groups } = require("../../lib/sequelize");

const addGroup = async (payload) => {
  return await groups.create(payload);
};

const getAllGroups = async () => {
  return await groups.findAll({
    include: [
      {
        association: "program",
        attributes: ["name"],
      },
    ],
  });
};

const getGroupById = async (id) => {
  return await groups.findByPk(id);
};

const updateGroup = async (id, payload) => {
  return await groups.update(payload, {
    where: {
      id,
    },
  });
};

const deleteGroup = async (id) => {
  return await groups.destroy({
    where: {
      id,
    },
  });
};

module.exports = {
  addGroup,
  getAllGroups,
  getGroupById,
  updateGroup,
  deleteGroup,
};
