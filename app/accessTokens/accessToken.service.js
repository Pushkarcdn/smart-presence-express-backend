const db = require("../../lib/sequelize");
const { access_tokens } = db;

const saveAccessToken = async (payload) => {
  return await access_tokens.create(payload);
};

/**
 * Get details of a access token.
 * @param {string} access_token - The email of the AccessToken config.
 * @returns {object} - The AccessToken details if found.
 * @throws {HttpException} - Throws error if the access token is not found.
 */

const getAccessToken = async (accessToken) => {
  return await access_tokens.findOne({
    where: {
      accessToken: accessToken,
    },
  });
};

const getAccessTokensByUserId = async (userId) => {
  return await access_tokens.find({
    where: {
      userId,
    },
  });
};

const invalidateAccessToken = async (accessToken) => {
  return await access_tokens.update(
    {
      isActive: false,
    },
    {
      where: {
        accessToken,
      },
    }
  );
};

module.exports = {
  saveAccessToken,
  getAccessToken,
  getAccessTokensByUserId,
  invalidateAccessToken,
};
