// Load environment variables from the corresponding .env file
// If NODE_ENV is not defined, it will load from the default ".env" file

require("dotenv").config({ path: `.env.${process.env.NODE_ENV || ".env"}` });

module.exports = {
  /**
   * Database Dialect Configuration
   * Chooses between supported databases (PostgreSQL, MySQL, etc.)
   */

  dialect: {
    postgres: "postgres",
    mysql: "mysql",
  },

  /**
   * JWT Token Configuration
   * These values are used for generating JWTs with expiration and secrets.
   */
  jwtConfig: {
    accessTokenExpiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN, // Expiration time for Access Token
    refreshTokenExpiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN, // Expiration time for Refresh Token
    accessTokenSecret: process.env.ACCESS_TOKEN_SECRET, // Secret for Access Token
    refreshTokenSecret: process.env.REFRESH_TOKEN_SECRET, // Secret for Refresh Token
  },

  /**
   * Mailer Configuration
   */
  mailerConfig: {
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASSWORD,
    },
    templateEngine: process.env.TEMPLATE_ENGINE, // Choose between "handlebars" or "ejs"
  },

  // Email addresses for recieving emails
  emails: {},

  /**
   * OAuth Configuration for Google and Facebook
   * Stores API keys for OAuth providers.
   */
  // oauth: {
  //   google: {
  //     clientId: process.env.GOOGLE_CLIENT_ID, // Google Client ID for OAuth
  //     clientSecret: process.env.GOOGLE_CLIENT_SECRET, // Google Client Secret for OAuth
  //   },
  //   facebook: {
  //     appId: process.env.FACEBOOK_CLIENT_ID, // Facebook App ID for OAuth
  //     appSecret: process.env.FACEBOOK_CLIENT_SECRET, // Facebook App Secret for OAuth
  //   },
  // },

  /**
   * Server Configuration
   */
  port: process.env.PORT || 3001, // Default to port 3000 if not set

  /**
   * PostgreSQL Database Configuration
   * Used when PostgreSQL is the chosen database.
   */
  postgres: {
    host: process.env.POSTGRES, // PostgreSQL Host
    user: process.env.POSTGRES_USER, // PostgreSQL User
    password: process.env.POSTGRES_PASSWORD, // PostgreSQL Password
    port: process.env.POSTGRES_PORT, // PostgreSQL Port
    database: process.env.POSTGRES_DATABASE, // PostgreSQL Database Name
    ca: process.env.CA,
  },

  /**
   * Session Configuration
   */
  sessionConfig: {
    secret: process.env.SESSION_SECRET, // Default secret key for sessions
  },
};
