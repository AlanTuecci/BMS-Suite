const pool = require("../../db");

exports.getEmployeeIdsAndNames = async (req, res) => {
  const { company_id } = req.user;

  try {
    let { rows } = await pool.query(
      `SELECT employee_id,
        full_name
      From employee_info 
      WHERE company_id = $1 
       AND employee_id > 0`,
      [company_id]
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
