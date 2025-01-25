const { hashPassword } = require("../../lib/bcrypt");
const CommonEntity = require("../common/common.entity");

module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define("users", {
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
      allowNull: false,
      unique: {
        args: true,
        msg: "User with this phone number already exists",
      },
    },
    address: {
      type: DataTypes.STRING(128),
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING(256),
      allowNull: true,
    },
    lastLogin: {
      type: DataTypes.DATE,
      allowNull: true,
    },

    role: {
      type: DataTypes.ENUM({
        values: ["admin", "superAdmin", "teacher", "student"],
      }),
      allowNull: false,
    },

    // for students
    groupId: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: "groups",
        key: "id",
      },
      onDelete: "CASCADE",
    },

    // for teachers
    moduleId: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: "modules",
        key: "id",
      },
      onDelete: "CASCADE",
    },
  });

  // Lifecycle hooks for password hashing
  Users.beforeCreate(async (user) => {
    if (user.password) {
      user.password = await hashPassword(user.password);
    }
  });

  Users.beforeUpdate(async (user) => {
    if (user.changed("password")) {
      user.password = await hashPassword(user.password);
    }
  });

  Users.associate = (models) => {
    Users.belongsTo(models.groups, {
      foreignKey: "groupId",
      as: "group",
    });

    Users.belongsTo(models.modules, {
      foreignKey: "moduleId",
      as: "module",
    });
  };

  return Users;
};
