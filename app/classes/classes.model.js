const CommonEntity = require("../common/common.entity");

module.exports = (sequelize, DataTypes) => {
  const Classes = sequelize.define("classes", {
    ...CommonEntity,

    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    startTime: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    endTime: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    teacherId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "users",
        key: "id",
      },
      onDelete: "CASCADE",
    },
    groupId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "groups",
        key: "id",
      },
      onDelete: "CASCADE",
    },
  });

  Classes.associate = (models) => {
    Classes.belongsTo(models.groups, {
      foreignKey: "groupId",
      as: "group",
    });

    Classes.belongsTo(models.users, {
      foreignKey: "teacherId",
      as: "teacher",
    });
  };

  return Classes;
};
