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
  "jwt-company",
  new Strategy(otps, async ({ company_id, company_admin_email }, done) => {
    try {
      const { rows } = await pool.query(
        "SELECT company_id, company_admin_email FROM company_info WHERE company_id = $1 AND company_admin_email = $2",
        [company_id, company_admin_email]
      );

      if (!rows.length) {
        throw new Error("401 not authorized");
      }

      let user = {
        company_id: rows[0].company_id,
        company_admin_email: rows[0].company_admin_email,
      };

      return await done(null, user);
    } catch (error) {
      console.log(error.message);
      done(null, false);
    }
  })
);

exports.companyUserAuth = passport.authenticate("jwt-company", { session: false });
