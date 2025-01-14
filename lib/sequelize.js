// sequelize.js

/**
 * Sequelize Initialization and Model Loader
 * This module initializes Sequelize with connection settings, hooks, and configurations.
 * It loads all models, sets up associations, and includes transaction support using CLS.
 *
 * Dependencies:
 * - Sequelize: ORM for relational databases.
 * - config: Configuration file for database settings.
 * - cls-hooked: Continuation Local Storage for transaction management.
 * - glob: File-matching library for loading model files.
 * - logger: Custom logger for structured logging.
 */

const { postgres, dialect } = require("../config/config");
const glob = require("glob");
const { Sequelize } = require("sequelize");
const { isIterable } = require("../utils");
const cls = require("cls-hooked");
const fs = require("fs");
const path = require("path");
// const { logger } = require("../utils");

// Initialize namespace for transaction management
const namespace = cls.createNamespace("transactional");

Sequelize.useCLS(namespace);

const caCertPath = path.resolve(__dirname, "../ca.pem");
const caCert = fs.readFileSync(caCertPath).toString();

// Initialize Sequelize with connection details
const sequelize = new Sequelize(
  postgres.database,
  postgres.user,
  postgres.password,
  {
    host: postgres.host,
    port: postgres.port,
    dialect: dialect.postgres,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: true,
        ca: caCert,
      },
    },
    pool: {
      max: 5,
      idle: 30000,
    },
    define: {
      underscored: false,
      hooks: {
        beforeCreate(instance, options) {
          if (options.userId) {
            instance.createdBy = instance.createdBy || options.userId;
            instance.updatedBy = instance.updatedBy || options.userId;
          }
        },
        beforeBulkCreate(instances, options) {
          if (isIterable(instances)) {
            instances.forEach((instance) => {
              if (options.userId) {
                instance.createdBy = instance.createdBy || options.userId;
                instance.updatedBy = instance.updatedBy || options.userId;
              }
            });
          }
        },
        beforeUpdate(instance, options) {
          if (options.userId) {
            instance.updatedBy = options.userId;
          }
        },
        beforeBulkUpdate(instances, options) {
          if (isIterable(instances)) {
            instances.forEach((instance) => {
              if (options.userId) {
                instance.updatedBy = options.userId;
              }
            });
          }
        },
      },
    },
  }
);

// Load all model files and initialize models
const models = glob.sync(__dirname + `/../app/**/*.model.js`);

const db = {};

models.forEach((modelFile) => {
  try {
    if (process.env.NODE_ENV === "development") {
      // logger.info("Loading Model :: " + modelFile);
      console.log("Loading Model :: " + modelFile);
    }

    const model = require(modelFile)(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  } catch (error) {
    console.error("Error loading model file:", modelFile, error);
    // logger.error("Error loading model file:", modelFile, error);
  }
});

// Setup model associations if available
Object.keys(db).forEach((modelName) => {
  if (typeof db[modelName].associate === "function") {
    db[modelName].associate(db);
  }
});

// Export initialized Sequelize instance and models
db.sequelize = sequelize;
db.Sequelize = Sequelize;

// console.log(db);

module.exports = db;
