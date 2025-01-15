const { users } = require("../../lib/sequelize");

const addUser = async (payload) => {
  return await users.create(payload);
};

const getAllUser = async () => {
  return await users.findAll();
};

const getUsersByField = async (where) => {
  return await users.findAll({
    where,
  });
};

const getUserByEmail = async (email) => {
  return await users.findOne({
    where: {
      email,
    },
  });
};

const getUserByID = async (id) => {
  return await users.findOne({
    where: {
      id,
    },
  });
};

const updateUser = async (id, payload) => {
  return await users.update(payload, {
    where: {
      id,
    },
  });
};

const deleteUser = async (id) => {
  return await users.destroy({
    where: {
      id,
    },
  });
};

module.exports = {
  addUser,
  getAllUser,
  getUsersByField,
  getUserByEmail,
  getUserByID,
  updateUser,
  deleteUser,
};
