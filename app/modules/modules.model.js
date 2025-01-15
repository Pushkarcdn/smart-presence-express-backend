const CommonEntity = require("../common/common.entity");

module.exports = (sequelize, DataTypes) => {
  const Modules = sequelize.define(
    "modules",
    {
      ...CommonEntity,

      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      programId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: "programs",
          key: "id",
        },
      },
      name: {
        type: DataTypes.STRING(64),
        allowNull: false,
      },
      credits: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      paranoid: true,
    }
  );

  return Modules;
};
