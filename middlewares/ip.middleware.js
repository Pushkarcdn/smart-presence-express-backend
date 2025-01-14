const getUserIp = (req, res, next) => {
  try {
    const realIp =
      req.headers["cf-connecting-ip"] ||
      req.headers["x-forwarded-for"]?.split(",")[0].trim() ||
      req.connection.remoteAddress;

    // Set the real IP address directly on req.ip
    req.ip = realIp;

    next();
  } catch (err) {
    next(err);
  }
};

module.exports = { getUserIp };
