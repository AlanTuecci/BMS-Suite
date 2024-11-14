const pool = require("../../db");

exports.assignCashAccessControl = async (req, res) => {
  const { company_id } = req.user;
  const { employee_id, access_control_level } = req.body;

  try {
    const { rows } = await pool.query("select * from cash_access_info where company_id = $1 and employee_id = $2", [
      company_id,
      employee_id,
    ]);

    if (rows.length == 0) {
      await pool.query("insert into cash_access_info(company_id, employee_id, access_control_level) values($1, $2, $3)", [
        company_id,
        employee_id,
        access_control_level,
      ]);
    } else {
      await pool.query(
        "UPDATE cash_access_info SET access_control_level = $1 WHERE company_id = $2 AND employee_id = $3",
        [access_control_level, company_id, employee_id]
      );
    }

    return res.status(200).json({
      success: true,
      message: `Cash access level set!`,
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
