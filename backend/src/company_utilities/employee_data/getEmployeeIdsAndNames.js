const db = require("../../db");

exports.getEmployeeIdsAndNames = async (req, res) => {
  const { company_id } = req.user;

  try {
    let { rows } = await db.query("select * from employee_info where company_id = $1", [company_id]);

    let fieldToRemove = [
      "company_id",
      "employee_password",
      "employee_email",
      "employee_register_date",
      "extern_employee_id",
    ];

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
