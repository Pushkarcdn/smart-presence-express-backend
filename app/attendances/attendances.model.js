const CommonEntity = require("../common/common.entity");

module.exports = (sequelize, DataTypes) => {
  const Attendances = sequelize.define(
    "attendances",
    {
      ...CommonEntity,

      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      userId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: "users",
          key: "id",
        },
      },
    },
    {
      paranoid: true,
    }
  );

  return Attendances;
};
