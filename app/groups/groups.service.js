const { groups } = require("../../lib/sequelize");

const addGroup = async (payload) => {
  return await groups.create(payload);
};

const getAllGroups = async () => {
  return await groups.findAll();
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
  deleteGroup,
};
