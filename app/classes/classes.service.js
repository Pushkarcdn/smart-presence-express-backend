const { classes } = require("../../lib/sequelize");

const addClass = async (payload) => {
  return await classes.create(payload);
};

const getAllClasses = async () => {
  return await classes.findAll();
};

const deleteClass = async (id) => {
  return await classes.destroy({
    where: {
      id,
    },
  });
};

module.exports = {
  addClass,
  getAllClasses,
  deleteClass,
};
