const { hashPassword } = require("../../lib/bcrypt");
const CommonEntity = require("../common/common.entity");

module.exports = (sequelize, DataTypes) => {
  const Admins = sequelize.define(
    "admins",
    {
      ...CommonEntity,

      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      firstName: {
        type: DataTypes.STRING(64),
        allowNull: false,
      },
      lastName: {
        type: DataTypes.STRING(64),
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING(128),
        allowNull: false,
        unique: {
          args: true,
          msg: "User with this email already exists",
        },
      },
      phone: {
        type: DataTypes.STRING(16),
        allowNull: true,
      },
      password: {
        type: DataTypes.STRING(256),
        allowNull: false,
      },
      lastLogin: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      profileImage: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      address: {
        type: DataTypes.STRING(128),
        allowNull: true,
      },
      role: {
        type: DataTypes.ENUM({
          values: ["admin", "superAdmin"],
        }),
        allowNull: true,
        defaultValue: "admin",
      },
    },
    {
      paranoid: true,
    }
  );

  // Lifecycle hooks for password hashing
  Admins.beforeCreate(async (admin) => {
    if (admin.password) {
      admin.password = await hashPassword(admin.password);
    }
  });

  Admins.beforeUpdate(async (admin) => {
    if (admin.changed("password")) {
      admin.password = await hashPassword(admin.password);
    }
  });

  return Admins;
};
