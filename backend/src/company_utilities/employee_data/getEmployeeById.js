const pool = require("../../db");

exports.getEmployeeById = async (req, res) => {
  const { company_id } = req.user;
  const { employee_id } = req.body;

  try {
    let { rows } = await pool.query("select * from employee_info where company_id = $1 and employee_id = $2", [
      company_id,
      employee_id,
    ]);

    let fieldToRemove = ["employee_password"];

    rows.forEach((obj) => {
      fieldToRemove.forEach((field) => {
        delete obj[field];
      });
    });

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
