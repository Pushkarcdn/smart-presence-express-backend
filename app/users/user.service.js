const { users, groups, programs, modules } = require("../../lib/sequelize");

const addUser = async (payload) => {
  console.log(payload);
  return await users.create(payload);
};

const getAllUser = async () => {
  return await users.findAll();
};

const getUsersByField = async (where) => {
  return await users.findAll({
    where,
    include: [
      {
        model: groups,
        as: "group",
        attributes: ["name"],
        include: [
          {
            model: programs,
            as: "program",
            attributes: ["name"],
          },
        ],
      },
      {
        model: modules,
        as: "module",
        attributes: ["name"],
        include: [
          {
            model: programs,
            as: "program",
            attributes: ["name"],
          },
        ],
      },
    ],
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
    include: [
      {
        model: groups,
        as: "group",
        attributes: ["id", "name"],
        include: [
          {
            model: programs,
            as: "program",
            attributes: ["id", "name"],
          },
        ],
      },
      {
        model: modules,
        as: "module",
        attributes: ["id", "name"],
        include: [
          {
            model: programs,
            as: "program",
            attributes: ["id", "name"],
          },
        ],
      },
    ],
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
