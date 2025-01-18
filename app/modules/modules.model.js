const CommonEntity = require("../common/common.entity");

module.exports = (sequelize, DataTypes) => {
  const Modules = sequelize.define("modules", {
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
  });

  Modules.associate = (models) => {
    Modules.belongsTo(models.programs, {
      foreignKey: "programId",
      as: "program",
    });

    Modules.hasMany(models.users, {
      foreignKey: "moduleId",
      as: "teachers",
    });
  };

  return Modules;
};
