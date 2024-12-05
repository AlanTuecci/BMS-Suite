const pool = require("../../db");

exports.getLaborAccessControlById = async (req, res) => {
  const { company_id } = req.user;
  const { employee_id } = req.body;

  try {
    const { rows } = await pool.query(
      `SELECT access_control_level
       FROM employee_labor_info
       WHERE company_id = $1 AND employee_id = $2`,
      [company_id, employee_id]
    );

    if (rows.length == 0) {
      return res.status(500).json({
        errors: [
          {
            type: "field",
            value: employee_id,
            msg: "No permissions found.",
            path: "employee_id",
            location: "user",
          },
        ],
      });
    }

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
