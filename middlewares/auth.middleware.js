const httpContext = require("express-http-context");
const passport = require("passport");
const { unprotectedRoutes } = require("../config/protect");
const { match } = require("node-match-path");

const authMiddleware = (req, res, next) => {
  try {
    let isPublicRoute = false;

    unprotectedRoutes.forEach((item) => {
      const { matches } = match(item.route, req.path);
      const isMethodMatch = item.methods.includes(req.method);
      if (matches && isMethodMatch) {
        isPublicRoute = true;
      }
    });

    if (isPublicRoute) {
      next();
    } else {
      passport.authenticate("jwt", { session: false })(req, res, async () => {
        const userInfo = (({ id, email, role }) => ({
          userId: id,
          email,
          role,
        }))(req.user);

        httpContext.set("user", userInfo);
        // console.log("http ", httpContext.get("user"));
        next();
      });
    }
  } catch (err) {
    next(err);
  }
};

module.exports = { authMiddleware };
