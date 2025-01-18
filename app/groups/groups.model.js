const CommonEntity = require("../common/common.entity");

module.exports = (sequelize, DataTypes) => {
  const Groups = sequelize.define(
    "groups",
    {
      ...CommonEntity,

      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      name: {
        type: DataTypes.STRING(16),
        allowNull: false,
      },
      programId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: "programs",
          key: "id",
        },
      },
    },
    {
      paranoid: true,
    }
  );

  Groups.associate = (models) => {
    Groups.belongsTo(models.programs, {
      foreignKey: "programId",
      as: "program",
    });

    // Groups.hasMany(models.users, {
    //   foreignKey: "groupId",
    //   as: "students",
    // });
  };

  return Groups;
};
