const pool = require("../db");
const { hash } = require("bcryptjs");
const { sign } = require("jsonwebtoken");
const { SECRET } = require("../constants");

exports.employeeRegister = async (req, res) => {
  const { invite_code, full_name, email, password } = req.body;

  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    let { rows } = await client.query("select * from invite_codes where invite_code = $1 and employee_email = $2", [
      invite_code,
      email,
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

    const hashedPassword = await hash(password, 10);
    await client.query(
      "insert into employee_info(company_id, full_name, employee_email, employee_password) values($1, $2, $3, $4)",
      [rows[0].company_id, full_name, email, hashedPassword]
    );

    const response = await client.query("select employee_id from employee_info where employee_email = $1", [email]);

    const employee_id = response.rows[0].employee_id;

    await client.query(
      "insert into inventory_access_info(company_id, employee_id, access_control_level) values($1, $2, $3)",
      [rows[0].company_id, employee_id, 0]
    );

    await client.query(
      "insert into employee_labor_info(company_id, employee_id, hourly_wage, access_control_level) values($1, $2, $3, $4)",
      [rows[0].company_id, employee_id, 0, 0]
    );

    await client.query(
      "insert into cash_access_info(company_id, employee_id, access_control_level) values($1, $2, $3)",
      [rows[0].company_id, employee_id, 0]
    );

    const hashedPin = await hash("0000", 10);
    await client.query(
      "insert into employee_time_pin_record(company_id, employee_id, employee_time_pin) values($1, $2, $3)",
      [rows[0].company_id, employee_id, hashedPin]
    );

    await client.query("delete from invite_codes where invite_code = $1", [invite_code]);

    await client.query("COMMIT");

    return res.status(201).json({
      success: true,
      message: "The registration was successful!",
    });
  } catch (error) {
    console.log(error.message);
    await client.query("ROLLBACK");

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
  } finally {
    client.release();
  }
};

exports.employeeLogin = async (req, res) => {
  let user = req.user;
  let payload = {
    user_type: "employee",
    company_id: user.company_id,
    employee_id: user.employee_id,
    employee_email: user.employee_email,
  };

  try {
    let inventory_access_level = 0;
    let labor_access_level = 0;
    let cash_access_level = 0;

    let response = await pool.query(
      `SELECT access_control_level
       FROM inventory_access_info
       WHERE company_id = $1
        AND employee_id = $2`,
      [user.company_id, user.employee_id]
    );
    if (response.rows.length != 0) {
      inventory_access_level = response.rows[0].access_control_level;
    }

    response = await pool.query(
      `SELECT access_control_level
       FROM employee_labor_info
       WHERE company_id = $1
        AND employee_id = $2`,
      [user.company_id, user.employee_id]
    );
    if (response.rows.length != 0) {
      labor_access_level = response.rows[0].access_control_level;
    }

    response = await pool.query(
      `SELECT access_control_level
       FROM cash_access_info
       WHERE company_id = $1
        AND employee_id = $2`,
      [user.company_id, user.employee_id]
    );
    if (response.rows.length != 0) {
      cash_access_level = response.rows[0].access_control_level;
    }

    const token = sign(payload, SECRET);

    return res.status(200).cookie("token", token, { httpOnly: true }).json({
      success: true,
      message: "Login successful.",
      user_type: "employee",
      inventory_access_level: inventory_access_level,
      labor_access_level: labor_access_level,
      cash_access_level: cash_access_level,
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
