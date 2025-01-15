const db = require("../../lib/sequelize");
const { accessTokens } = db;

const saveAccessToken = async (payload) => {
  return await accessTokens.create(payload);
};

const getAccessToken = async (accessToken) => {
  return await accessTokens.findOne({
    where: {
      accessToken: accessToken,
    },
  });
};

const getAccessTokensByUserId = async (userId) => {
  return await accessTokens.find({
    where: {
      userId,
    },
  });
};

const invalidateAccessToken = async (accessToken) => {
  return await accessTokens.update(
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
