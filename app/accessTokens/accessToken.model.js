const CommonEntity = require("../common/common.entity");

module.exports = (sequelize, DataTypes) => {
  const AccessTokens = sequelize.define(
    "access_tokens",
    {
      ...CommonEntity,

      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      accessToken: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      adminId: {
        type: DataTypes.UUID,
        allowNull: true,
        references: {
          model: "admins",
          key: "id",
        },
        onDelete: "CASCADE",
      },
      ip: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
    },
    {
      paranoid: true,
    }
  );

  return AccessTokens;
};
