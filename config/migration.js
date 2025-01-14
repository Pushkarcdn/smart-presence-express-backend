// Load environment variables from the corresponding .env file
// If NODE_ENV is not defined, it will load from the default ".env" file
require("dotenv").config({
  path: `.env.${process.env.NODE_ENV || "development"}`,
});

/**
 * PostgreSQL migration configuration
 * It uses environment variables with default fallback values in case they are not provided.
 * `dialect` is set to "postgresql" for PostgreSQL migrations.
 */
const pgMigrationConfig = {
  host: process.env.POSTGRES,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DATABASE,
  dialect: "postgresql", // Specify the dialect for PostgreSQL
};

/**
 * MySQL migration configuration
 * Similarly, it uses environment variables with default fallback values.
 * `dialect` is set to "mysql" for MySQL migrations.
 */
const mysqlMigrationConfig = {
  host: process.env.MYSQL,
  username: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  dialect: "mysql", // Specify the dialect for MySQL
};

// Retrieve the database dialect from environment variables or default to PostgreSQL
const dialect = process.env.DIALECT || "postgres";

// Export the configuration based on the database dialect
// If the dialect is "postgres", PostgreSQL config will be used
// Otherwise, MySQL config will be used
module.exports =
  dialect === "postgres" ? pgMigrationConfig : mysqlMigrationConfig;

// Log which environment and dialect are being used
console.log(
  `Using ${
    process.env.NODE_ENV || "default"
  } environment and ${dialect} dialect`
);
