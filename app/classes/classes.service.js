const {
  classes,
  groups,
  users,
  modules,
  programs,
} = require("../../lib/sequelize");

const addClass = async (payload) => {
  return await classes.create(payload);
};

const getAllClasses = async () => {
  return await classes.findAll({
    include: [
      {
        model: groups,
        as: "group",
        attributes: ["name"],
      },
      {
        model: users,
        as: "teacher",
        attributes: ["firstName", "lastName", "email"],
        include: [
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
      },
    ],
  });
};

const getClassById = async (id) => {
  return await classes.findOne({
    where: {
      id,
    },
    include: [
      {
        model: groups,
        as: "group",
        attributes: ["name"],
      },
      {
        model: users,
        as: "teacher",
        attributes: ["id", "firstName", "lastName", "email"],
        include: [
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
      },
    ],
  });
};

const getClassByField = async (where) => {
  return await classes.findOne({
    where,
    include: [
      {
        model: groups,
        as: "group",
        attributes: ["name"],
        include: [
          {
            model: users,
            as: "group",
            attributes: ["id", "firstName", "lastName", "email", "role"],
          },
        ],
      },
      {
        model: users,
        as: "teacher",
        attributes: ["id", "firstName", "lastName", "email"],
        include: [
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
      },
    ],
  });
};

const updateClass = async (id, payload) => {
  return await classes.update(payload, {
    where: {
      id,
    },
  });
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
  getClassById,
  getClassByField,
  updateClass,
  deleteClass,
};
