const db = require("../db");
const { hash } = require("bcryptjs");
const { sign } = require("jsonwebtoken");
const { SECRET } = require("../constants");

exports.companyRegister = async (req, res) => {
  const { email, password, company_ein } = req.body;

  try {
    // Is the company EIN unused?
    let { rows } = await db.query("select * from company_info where company_ein = $1", [company_ein]);

    if (rows.length) {
      return res.status(404).json({
        errors: [
          {
            type: "field",
            value: company_ein,
            msg: "There is already a registered company with that same EIN.",
            path: "company_ein",
            location: "body",
          },
        ],
      });
    }

    // Insert the company registration details with the hashed password
    const hashedPassword = await hash(password, 10);
    await db.query(
      "insert into company_info(company_admin_email, company_admin_password, company_ein) values($1, $2, $3)",
      [email, hashedPassword, company_ein]
    );

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
          value: "Unknown",
          msg: "Unknown error occurred.",
          path: "Unknown",
          location: "Unknown",
        },
      ],
      error: error,
    });
  }
};

exports.companyLogin = async (req, res) => {
  let user = req.user;
  let payload = {
    company_id: user.company_id,
    company_admin_email: user.company_admin_email,
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
          value: "Unknown",
          msg: "Unknown error occurred.",
          path: "Unknown",
          location: "Unknown",
        },
      ],
      error: error,
    });
  }
};
