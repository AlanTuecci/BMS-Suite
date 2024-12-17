const pool = require("../db");

exports.clockIn = async (req, res) => {
  const { company_id, employee_id } = req.user;

  let response = await pool.query(
    `SELECT shift_id
     FROM active_shift_record
     WHERE company_id = $1
      AND employee_id = $2`,
    [company_id, employee_id]
  );

  if (response.rows.length != 0) {
    return res.status(400).clearCookie("access_token", { httpOnly: true }).json({
      errors: [
        {
          type: "field",
          value: employee_id,
          msg: "Employee already clocked in.",
          path: "employee_id",
          location: "body",
        },
      ],
    });
  }

  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    await client.query(
      `INSERT INTO time_punch_record(
       company_id, 
       employee_id, 
       is_active,
       clock_out_timestamp, 
       break_start_timestamp, 
       break_end_timestamp) 
      values($1, $2, true, null, null, null)`,
      [company_id, employee_id]
    );

    const { rows } = await client.query(
      `SELECT shift_id
       FROM time_punch_record
       WHERE is_active = true
        AND company_id = $1
        AND employee_id = $2`,
      [company_id, employee_id]
    );

    await client.query(
      `INSERT INTO active_shift_record(
        company_id,
        employee_id,
        shift_id)
       values($1, $2, $3)`,
      [company_id, employee_id, rows[0].shift_id]
    );

    await client.query("COMMIT");

    return res.status(200).clearCookie("access_token", { httpOnly: true }).json({
      success: true,
      message: `Clocked in!`,
      signed_in: false,
      clocked_in: true,
      on_break: false,
      had_break: false,
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
