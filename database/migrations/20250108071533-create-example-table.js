"use strict";

const CommonEntity = require("../common-attributes");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */

    await queryInterface.createTable(
      "example",
      {
        ...CommonEntity,

        id: {
          type: Sequelize.UUID,
          primaryKey: true,
          defaultValue: Sequelize.UUIDV4,
        },
        firstName: {
          type: Sequelize.STRING(64),
          allowNull: false,
        },
        lastName: {
          type: Sequelize.STRING(64),
          allowNull: false,
        },
        email: {
          type: Sequelize.STRING(128),
          allowNull: false,
          unique: {
            args: true,
            msg: "User with this email already exists",
          },
        },
        phone: {
          type: Sequelize.STRING(16),
          allowNull: true,
        },
        password: {
          type: Sequelize.STRING(256),
          allowNull: false,
        },
        lastLogin: {
          type: Sequelize.DATE,
          allowNull: true,
        },
        profileImage: {
          type: Sequelize.TEXT,
          allowNull: true,
        },
        address: {
          type: Sequelize.STRING(128),
          allowNull: true,
        },
        role: {
          type: Sequelize.ENUM({
            values: ["admin", "superAdmin"],
          }),
          allowNull: true,
          defaultValue: "admin",
        },
      },
      {
        paranoid: true,
      }
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */

    await queryInterface.dropTable("admins");
  },
};
