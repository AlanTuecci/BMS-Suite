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
  "jwt-auth",
  new Strategy(otps, async ({ user_type, company_id, company_admin_email, employee_id, employee_email }, done) => {
    try {
      let user = {};

      if (user_type == "company") {
        const { rows } = await pool.query(
          "SELECT company_id FROM company_info WHERE company_id = $1 AND company_admin_email = $2",
          [company_id, company_admin_email]
        );
        if (!rows.length) {
          throw new Error("401 not authorized");
        }

        user = {
          user_type: "company",
          company_id: rows[0].company_id,
          inventory_access_level: 4,
          labor_access_level: 4,
          cash_access_level: 4,
        };
      } else if (user_type == "employee") {
        const { rows } = await pool.query(
          "SELECT company_id, employee_id FROM employee_info WHERE company_id = $1 AND employee_id = $2 AND employee_email = $3",
          [company_id, employee_id, employee_email]
        );

        if (!rows.length) {
          throw new Error("401 not authorized");
        }

        let inventory_access_level = 0;
        let labor_access_level = 0;
        let cash_access_level = 0;

        let response = await pool.query(
          `SELECT access_control_level
           FROM inventory_access_info
           WHERE company_id = $1
            AND employee_id = $2`,
          [company_id, employee_id]
        );
        if (response.rows.length != 0) {
          inventory_access_level = response.rows[0].access_control_level;
        }

        response = await pool.query(
          `SELECT access_control_level
           FROM employee_labor_info
           WHERE company_id = $1
            AND employee_id = $2`,
          [company_id, employee_id]
        );
        if (response.rows.length != 0) {
          labor_access_level = response.rows[0].access_control_level;
        }

        response = await pool.query(
          `SELECT access_control_level
           FROM cash_access_info
           WHERE company_id = $1
             AND employee_id = $2`,
          [company_id, employee_id]
        );
        if (response.rows.length != 0) {
          cash_access_level = response.rows[0].access_control_level;
        }

        user = {
          user_type: "employee",
          company_id: rows[0].company_id,
          employee_id: rows[0].employee_id,
          inventory_access_level: inventory_access_level,
          labor_access_level: labor_access_level,
          cash_access_level: cash_access_level,
        };
      } else if (user_type == "time_admin") {
        const { rows } = await pool.query(
          "SELECT company_id, company_admin_email FROM company_info WHERE company_id = $1 AND company_admin_email = $2",
          [company_id, company_admin_email]
        );
        if (!rows.length) {
          throw new Error("401 not authorized");
        }

        user = {
          user_type: "time_admin",
          company_id: rows[0].company_id,
          company_admin_email: rows[0].company_admin_email,
          inventory_access_level: 0,
          labor_access_level: 0,
          cash_access_level: 0,
        };
      }

      return await done(null, user);
    } catch (error) {
      console.log(error.message);
      done(null, false);
    }
  })
);

exports.userAuth = passport.authenticate("jwt-auth", { session: false });
