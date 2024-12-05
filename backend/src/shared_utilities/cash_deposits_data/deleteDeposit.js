const pool = require("../../db");

exports.deleteDeposit = async (req, res) => {
  const { user_type, company_id } = req.user;
  const employee_id = req.user.employee_id ?? 0;
  const { deposit_id } = req.body;

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

    await client.query("BEGIN");

    const { rows } = await client.query(
      `SELECT * 
       FROM register_deposits_record 
       WHERE company_id = $1 AND deposit_id = $2`,
      [company_id, deposit_id]
    );

    if (rows.length == 0) {
      return res.status(500).json({
        errors: [
          {
            type: "field",
            value: deposit_id,
            msg: "Deposit not found.",
            path: "deposit_id",
            location: "body",
          },
        ],
      });
    } else {
      await client.query(
        `DELETE FROM register_deposits_record
         WHERE company_id = $1 AND deposit_id = $2`,
        [company_id, deposit_id]
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
