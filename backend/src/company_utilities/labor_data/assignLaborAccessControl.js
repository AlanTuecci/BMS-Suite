const db = require("../../db");

exports.assignLaborAccessControl = async (req, res) => {
  const { company_id } = req.user;
  const { employee_id, access_control_level, hourly_wage } = req.body;

  try {
    const { rows } = await db.query("select * from employee_labor_info where company_id = $1 and employee_id = $2", [
      company_id,
      employee_id,
    ]);

    if (rows.length == 0) {
      await db.query(
        "insert into employee_labor_info(company_id, employee_id, hourly_wage, access_control_level) values($1, $2, $3, $4)",
        [company_id, employee_id, hourly_wage, access_control_level]
      );
    } else {
      await db.query(
        "UPDATE employee_labor_info SET hourly_wage = $1, access_control_level=$2 WHERE company_id = $3 AND employee_id = $4",
        [hourly_wage, access_control_level, company_id, employee_id]
      );
    }

    return res.status(200).json({
      success: true,
      message: `Hourly wage and permission level set!`,
    });
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
