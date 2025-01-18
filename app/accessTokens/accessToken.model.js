const CommonEntity = require("../common/common.entity");

module.exports = (sequelize, DataTypes) => {
  const AccessTokens = sequelize.define("accessTokens", {
    ...CommonEntity,

    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: "users",
        key: "id",
      },
      onDelete: "CASCADE",
    },
    accessToken: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    ip: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  });

  return AccessTokens;
};
