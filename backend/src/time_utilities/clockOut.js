const pool = require("../db");

exports.clockOut = async (req, res) => {
  const { company_id, employee_id } = req.user;

  let shift_id = 0;

  let response = await pool.query(
    `SELECT shift_id
     FROM active_shift_record
     WHERE company_id = $1
      AND employee_id = $2`,
    [company_id, employee_id]
  );

  if (response.rows.length == 0) {
    return res.status(400).clearCookie("access_token", { httpOnly: true }).json({
      errors: [
        {
          type: "field",
          value: employee_id,
          msg: "Employee already clocked out.",
          path: "employee_id",
          location: "body",
        },
      ],
    });
  } else {
    shift_id = response.rows[0].shift_id;

    response = await pool.query(
      `SELECT break_start_timestamp,
        break_end_timestamp
       FROM time_punch_record
       WHERE company_id = $1
        AND employee_id = $2
        AND shift_id = $3`,
      [company_id, employee_id, shift_id]
    );

    if (response.rows[0].break_start_timestamp && !response.rows[0].break_end_timestamp) {
      return res.status(400).clearCookie("access_token", { httpOnly: true }).json({
        errors: [
          {
            type: "field",
            value: employee_id,
            msg: "Employee currently on break - Cannot clock out.",
            path: "employee_id",
            location: "body",
          },
        ],
      });
    }
  }

  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    await client.query(
      `UPDATE time_punch_record
       SET clock_out_timestamp = now(),
        is_active = false
       WHERE company_id = $1
        AND employee_id = $2
        AND shift_id = $3`,
      [company_id, employee_id, shift_id]
    );

    await client.query(
      `DELETE FROM active_shift_record
       WHERE company_id = $1
        AND employee_id = $2
        AND shift_id = $3`,
      [company_id, employee_id, shift_id]
    );

    await client.query("COMMIT");

    return res.status(200).clearCookie("access_token", { httpOnly: true }).json({
      success: true,
      message: `Clocked out!`,
      signed_in: false,
      clocked_in: false,
      on_break: false,
      had_break: true,
    });
  } catch (error) {
    console.log(error);
    await client.query("ROLLBACK");

    return res.status(500).clearCookie("access_token", { httpOnly: true }).json({
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
  } finally {
    client.release();
  }
};
