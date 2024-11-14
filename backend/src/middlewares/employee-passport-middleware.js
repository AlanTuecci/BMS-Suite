const passport = require("passport");
const { Strategy } = require("passport-jwt");
const { SECRET } = require("../constants");
const pool = require("../db");

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
  "jwt-employee",
  new Strategy(otps, async ({ company_id, employee_id }, done) => {
    try {
      const { rows } = await pool.query(
        "SELECT company_id, employee_id, employee_email FROM employee_info WHERE company_id = $1 AND employee_id = $2",
        [company_id, employee_id]
      );

      if (!rows.length) {
        throw new Error("401 not authorized");
      }

      let user = {
        company_id: rows[0].company_id,
        employee_id: rows[0].employee_id,
        employee_email: rows[0].employee_email,
      };

      return await done(null, user);
    } catch (error) {
      console.log(error.message);
      done(null, false);
    }
  })
);

exports.employeeUserAuth = passport.authenticate("jwt-employee", { session: false });
