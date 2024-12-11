const pool = require("../../db");

exports.deleteSafeCount = async (req, res) => {
  const { user_type, company_id } = req.user;
  const employee_id = req.user.employee_id ?? 0;
  const { count_id } = req.body;

  const client = await pool.connect();

  try {
    if (user_type !== "company") {
      let response = await client.query(
        `SELECT access_control_level
         FROM cash_access_info 
         WHERE company_id = $1 AND employee_id = $2`,
        [company_id, employee_id]
      );

      const accessLevel = response.rows[0].access_control_level;

      if (accessLevel < 3) {
        return res.status(401).json({
          errors: [
            {
              type: "field",
              value: employee_id,
              msg: "Unauthorized operation.",
              path: "employee_id",
              location: "user",
            },
          ],
        });
      }
    }

    const { rows } = await client.query(
      `SELECT *
       FROM safe_record
       WHERE company_id = $1 AND count_id = $2`,
      [company_id, count_id]
    );

    if (rows.length == 0) {
      return res.status(500).json({
        errors: [
          {
            type: "field",
            value: count_id,
            msg: "Safe count not found.",
            path: "count_id",
            location: "body",
          },
        ],
      });
    } else {
      await client.query(
        `DELETE FROM safe_record 
         WHERE company_id = $1 AND count_id = $2`,
        [company_id, count_id]
      );
    }

    await client.query("COMMIT");

    return res.status(200).json({
      success: true,
      message: `Deposit deleted!`,
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
