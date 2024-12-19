const pool = require("../../db");

exports.getAllPastShifts = async (req, res) => {
  const { company_id, user_type } = req.user;

  if (user_type !== "company") {
    return res.status(401).json({
      errors: [
        {
          type: "field",
          value: user_type,
          msg: "Unauthorized.",
          path: "user_type",
          location: "cookie",
        },
      ],
    });
  }

  const { month_num } = req.body;

  if (month_num > 12 || month_num < 0) {
    return res.status(400).json({
      errors: [
        {
          type: "field",
          value: month_num,
          msg: "Not valid month number.",
          path: "month_num",
          location: "body",
        },
      ],
    });
  }

  try {
    const { rows } = await pool.query(
      `SELECT 
        employee_id,
        shift_id,
        clock_in_timestamp,
        clock_out_timestamp,
        break_start_timestamp,
        break_end_timestamp
       FROM time_punch_record
       WHERE company_id = $1 
        AND is_active = false
        AND EXTRACT(MONTH FROM clock_in_timestamp) = $2
       ORDER BY clock_in_timestamp DESC`,
      [company_id, month_num]
    );

    return res.status(200).json(rows);
  } catch (error) {
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
