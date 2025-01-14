const { Sequelize } = require("sequelize");

const CommonEntity = {
  isActive: {
    type: Sequelize.BOOLEAN,
    defaultValue: true,
  },
  createdAt: {
    type: Sequelize.DATE,
    allowNull: false,
    defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
  },
  updatedAt: {
    type: Sequelize.DATE,
    allowNull: false,
    defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
  },
  deletedAt: {
    type: Sequelize.DATE,
    allowNull: true,
  },
  createdBy: {
    type: Sequelize.UUID,
    allowNull: true,
  },
  updatedBy: {
    type: Sequelize.UUID,
    allowNull: true,
  },
};

module.exports = CommonEntity;
