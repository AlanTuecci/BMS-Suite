const pool = require("../db");
const { compare } = require("bcryptjs");
const { sign } = require("jsonwebtoken");
const { TIME_SECRET } = require("../constants");

exports.checkEmployeePin = async (req, res) => {
  const { company_id } = req.user;
  const { employee_id, pin } = req.body;

  if (typeof pin != "string" || pin.length > 4) {
    return res.status(400).json({
      errors: [
        {
          type: "field",
          value: pin,
          msg: "PIN is in bad format.",
          path: "pin",
          location: "body",
        },
      ],
    });
  }

  const { rows } = await pool.query(
    `SELECT employee_time_pin 
     FROM employee_time_pin_record 
     WHERE company_id = $1 
      AND employee_id = $2`,
    [company_id, employee_id]
  );

  const validPin = await compare(pin, rows[0].employee_time_pin);

  if (!validPin) {
    return res.status(400).json({
      errors: [
        {
          type: "field",
          value: pin,
          msg: "PIN is invalid.",
          path: "pin",
          location: "body",
        },
      ],
    });
  } else {
    let clocked_in = false;
    let on_break = false;
    let shift_id = 0;

    const response = await pool.query(
      `SELECT shift_id
       FROM active_shift_record
       WHERE company_id = $1
        AND employee_id = $2`,
      [company_id, employee_id]
    );

    if (response.rows.length != 0) {
      shift_id = response.rows[0].shift_id;

      clocked_in = true;

      const { rows } = await pool.query(
        `SELECT break_start_timestamp, break_end_timestamp
         FROM time_punch_record
         WHERE company_id = $1
          AND employee_id = $2
          AND shift_id = $3`,
        [company_id, employee_id, response.rows[0].shift_id]
      );

      if (rows[0].break_start_timestamp != null && rows[0].break_end_timestamp == null) {
        on_break = true;
      }
    }

    const payload = {
      user_type: "time_employee",
      company_id: company_id,
      employee_id: employee_id,
    };

    const access_token = sign(payload, TIME_SECRET, { expiresIn: 60 });

    return res.status(200).cookie("access_token", access_token, { httpOnly: true }).json({
      success: true,
      message: "Pin is valid!",
      signed_in: true,
      clocked_in: clocked_in,
      on_break: on_break,
    });
  }
};
