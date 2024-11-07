const { check } = require("express-validator");
const db = require("../db");
const { compare } = require("bcryptjs");

//password
const password = check("password")
  .isLength({ min: 6, max: 15 })
  .withMessage("Password must be between 6 and 15 characters long.");

//companyEIN
const companyEIN = check("company_ein")
  .isLength({ min: 9, max: 9 })
  .withMessage("Company EIN must be 9 characters long.");

//email
const email = check("email").isEmail().withMessage("Please provide a valid email.");

//check if email exists in employees table
const employeeEmailExists = check("email").custom(async (value) => {
  const { rows } = await db.query("SELECT * from employee_info WHERE employee_email = $1", [value]);

  if (rows.length) {
    throw new Error("Email already exists.");
  }
});

//check if email exists in company table
const companyEmailExists = check("email").custom(async (value) => {
  const { rows } = await db.query("SELECT * from company_info WHERE company_admin_email = $1", [value]);

  if (rows.length) {
    throw new Error("Email already exists.");
  }
});

//employee login validation
const employeeLoginFieldsCheck = check("email").custom(async (value, { req }) => {
  const user = await db.query("SELECT * from employee_info WHERE employee_email = $1", [value]);

  if (!user.rows.length) {
    throw new Error("Email not found.");
  }

  const validPassword = await compare(req.body.password, user.rows[0].employee_password);

  if (!validPassword) {
    throw new Error("Invalid password.");
  }

  req.user = user.rows[0];
});

//company login validation
const companyLoginFieldsCheck = check("email").custom(async (value, { req }) => {
  const user = await db.query("SELECT * from company_info WHERE company_admin_email = $1", [value]);

  if (!user.rows.length) {
    throw new Error("Email not found.");
  }

  const validPassword = await compare(req.body.password, user.rows[0].company_admin_password);

  if (!validPassword) {
    throw new Error("Invalid password for inputted email.");
  }

  req.user = user.rows[0];
});

module.exports = {
  employeeRegisterValidation: [email, password, employeeEmailExists],
  employeeLoginValidation: [email, password, employeeLoginFieldsCheck],
  companyRegisterValidation: [email, password, companyEmailExists, companyEIN],
  companyLoginValidation: [email, password, companyLoginFieldsCheck],
};
