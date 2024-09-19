const passport = require("passport");
const { trategy, Strategy } = require("passport-jwt");
const { SECRET } = require("../constants");
const db = require("../db");

const cookieExtracter = (req) => {
  let token = null;
  if (req && req.cookies) {
    token = req.cookies["token"];
  }
  return token;
};

const otps = {
  secretOrKey: SECRET,
  jwtFromRequest: cookieExtracter,
};

passport.use(
  new Strategy(otps, async ({ id }, done) => {
    try {
      const { rows } = await db.query("SELECT user_id, email FROM users WHERE user_id = $1", [id]);

      if (!rows.length) {
        throw new Error("401 not authorized");
      }

      let user = { id: rows[0].user_id, email: rows[0].email };

      return await done(null, user);
    } catch (error) {
      console.log(error.message);
      done(null, false);
    }
  })
);

exports.userAuth = passport.authenticate("jwt", { session: false });
