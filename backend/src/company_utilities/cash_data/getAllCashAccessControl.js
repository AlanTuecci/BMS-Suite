const pool = require("../../db");

exports.getAllCashAccessControl = async (req, res) => {
  const { company_id } = req.user;

  try {
    const { rows } = await pool.query(
      "select employee_id, access_control_level from cash_access_info where company_id = $1 and employee_id > 0",
      [company_id]
    );

    if (rows.length == 0) {
      return res.status(500).json({
        errors: [
          {
            type: "field",
            value: company_id,
            msg: "No assigned permissions found.",
            path: "company_id",
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
