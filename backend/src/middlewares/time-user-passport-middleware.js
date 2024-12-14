const passport = require("passport");
const { Strategy } = require("passport-jwt");
const { TIME_SECRET } = require("../constants");
const pool = require("../db");

const cookieExtracter = (req) => {
  let token = null;
  if (req && req.cookies) {
    token = req.cookies["access_token"];
  }
  return token;
};

const otps = {
  secretOrKey: TIME_SECRET,
  jwtFromRequest: cookieExtracter,
};

passport.use(
  "jwt-time-user",
  new Strategy(otps, async ({ company_id, employee_id, shift_id }, done) => {
    try {
      const { rows } = await pool.query(
        "SELECT company_id, employee_id FROM employee_info WHERE company_id = $1 AND employee_id = $2",
        [company_id, employee_id]
      );

      if (!rows.length) {
        throw new Error("401 not authorized");
      }

      let user = {
        user_type: "time-user",
        company_id: rows[0].company_id,
        employee_id: rows[0].employee_id,
        shift_id: shift_id,
      };

      return await done(null, user);
    } catch (error) {
      console.log(error.message);
      done(null, false);
    }
  })
);

exports.timeUserAuth = passport.authenticate("jwt-time-user", { session: false });
