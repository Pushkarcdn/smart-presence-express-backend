const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const config = require("../config/config");
const { getAccessToken } = require("../app/accessTokens/accessToken.service");
const { getAdminByID } = require("../app/users/user.service");
const { isUserAllowed } = require("../config/protect");

let extractedToken = null;

const extractToken = (req) => {
  extractedToken = req?.cookies?.access_token || null;
  return req?.cookies?.access_token || null;
};

// Options for JWT strategy
const opts = {
  jwtFromRequest: ExtractJwt.fromExtractors([extractToken]),
  secretOrKey: config.jwtConfig.accessTokenSecret,
  algorithms: ["HS256"],
  passReqToCallback: true, // Enables req access in callback
};

module.exports = (passport) => {
  passport.use(
    new JwtStrategy(
      opts,
      /**
       * Passport callback function with req
       * @param {import('express').Request} req - Express request object
       * @param {Object} jwt_payload - Decoded JWT payload
       * @param {Function} done - Passport callback
       */
      async (req, jwt_payload, done) => {
        try {
          const { role, sub } = jwt_payload;

          if (!extractedToken) return done(null, false);

          let user = null;

          // Fetch user based on role
          // change admin to user
          user = await getAdminByID(sub);

          if (!user) return done(null, false);

          // Fetch the access token information
          const accessTokenRecord = await getAccessToken(extractedToken);

          if (!accessTokenRecord) return done(null, false);

          // Check if the access token is valid
          const { isActive } = accessTokenRecord.dataValues;
          if (!isActive) return done(null, false);

          // Check if the user is allowed to access the resource

          const route = req.originalUrl;
          const method = req.method;

          if (!isUserAllowed(route, method, role)) return done(null, false);

          // Remove sensitive information before returning user
          delete user.dataValues.password;

          // Return authenticated user
          return done(null, user.dataValues);
        } catch (err) {
          // In case of error, pass it to done()
          console.error("errorrrrrr in jwt.passport.js");
          return done(err, false);
        }
      }
    )
  );
};
