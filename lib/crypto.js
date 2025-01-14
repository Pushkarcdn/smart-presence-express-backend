const crypto = require("crypto");

const generateOtp = () => {
  // 6 digit otp code
  const otp = crypto.getRandomValues(new Uint32Array(1))[0] % 1000000;
  return otp.toString();
};

module.exports = { generateOtp };
