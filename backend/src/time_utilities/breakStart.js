const pool = require("../db");

exports.breakStart = async (req, res) => {
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
    return res.status(400).json({
      errors: [
        {
          type: "field",
          value: employee_id,
          msg: "Employee not clocked in.",
          path: "employee_id",
          location: "body",
        },
      ],
    });
  } else {
    shift_id = response.rows[0].shift_id;
  }

  response = await pool.query(
    `SELECT break_start_timestamp
     FROM time_punch_record
     WHERE company_id = $1
      AND employee_id = $2
      AND shift_id = $3`,
    [company_id, employee_id, shift_id]
  );

  if (response.rows[0].break_start_timestamp) {
    return res.status(400).json({
      errors: [
        {
          type: "field",
          value: employee_id,
          msg: "Break already started.",
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
      `UPDATE time_punch_record
       SET break_start_timestamp = now()
       WHERE company_id = $1
        AND employee_id = $2
        AND shift_id = $3`,
      [company_id, employee_id, shift_id]
    );

    await client.query("COMMIT");

    return res.status(200).json({
      success: true,
      message: `Break started!`,
      signed_in: true,
      clocked_in: true,
      on_break: true,
    });
  } catch (error) {
    console.log(error);
    await client.query("ROLLBACK");

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
  } finally {
    client.release();
  }
};
