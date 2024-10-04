const db = require("../db");
const { hash } = require("bcryptjs");
const { sign } = require("jsonwebtoken");
const { SECRET } = require("../constants");

exports.employeeRegister = async (req, res) => {
  const { invite_code, full_name, email, password } = req.body;

  try {
    // Are the company id and invite code valid?
    let { rows } = await db.query("select * from invite_codes where invite_code = $1 and employee_email = $2", [
      invite_code,
      email
    ]);

    if (!rows.length) {
      return res.status(404).json({
        errors: [
          {
            type: "field",
            value: email,
            msg: `Unable to find invite code for email: ${email}`,
            path: "email",
            location: "body",
          },
        ],
      });
    }

    // Insert the employee registration details with the hashed password
    const hashedPassword = await hash(password, 10);
    await db.query(
      "insert into employee_info(company_id, full_name, employee_email, employee_password) values($1, $2, $3, $4)",
      [rows[0].company_id, full_name, email, hashedPassword]
    );

    // Delete the invite code since it was just used
    await db.query("delete from invite_codes where invite_code = $1", [invite_code]);

    return res.status(201).json({
      success: true,
      message: "The registration was successful!",
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      errors: [
        {
          type: "Unknown",
          value: "Unkown",
          msg: "Unknown error occurred.",
          path: "Unknown",
          location: "Unknown",
        },
      ],
      error: error,
    });
  }
};

exports.employeeLogin = async (req, res) => {
  let user = req.user;
  let payload = {
    company_id: user.company_id,
    employee_id: user.employee_id,
    employee_email: user.employee_email,
  };

  try {
    const token = sign(payload, SECRET);

    return res.status(200).cookie("token", token, { httpOnly: true }).json({
      success: true,
      message: "Login successful.",
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      errors: [
        {
          type: "Unknown",
          value: "Unkown",
          msg: "Unknown error occurred.",
          path: "Unknown",
          location: "Unknown",
        },
      ],
      error: error,
    });
  }
};
