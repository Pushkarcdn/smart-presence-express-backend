const cookieExtractor = (req) => {
  let token;
  if (req && req.cookies) token = req.cookies["access_token"];
  return token;
};

module.exports = cookieExtractor;
