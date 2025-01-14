// const db = require("../../lib/sequelize");
const { admins } = require("../../lib/sequelize");

const addAdmin = async (payload) => {
  return await admins.create(payload);
};

const getAdmins = async () => {
  return await admins.findAll({
    where: {
      role: "admin",
    },
  });
};

const getAdminByEmail = async (email) => {
  return await admins.findOne({
    where: {
      email: email,
    },
  });
};

const getAdminByID = async (id) => {
  return await admins.findOne({
    where: {
      id,
    },
  });
};

const updateAdmin = async (id, payload) => {
  return await admins.update(payload, {
    where: {
      id,
    },
  });
};

const deleteAdmin = async (id) => {
  return await admins.destroy({
    where: {
      id,
    },
  });
};

module.exports = {
  addAdmin,
  getAdmins,
  getAdminByEmail,
  getAdminByID,
  updateAdmin,
  deleteAdmin,
};
