const CommonEntity = require("../common/common.entity");

module.exports = (sequelize, DataTypes) => {
  const Programs = sequelize.define(
    "programs",
    {
      ...CommonEntity,

      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      name: {
        type: DataTypes.STRING(64),
        allowNull: false,
      },
      totalCredits: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      paranoid: true,
    }
  );

  return Programs;
};
