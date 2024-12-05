const pool = require("../../db");

exports.updateDeposit = async (req, res) => {
  const { user_type, company_id } = req.user;
  const employee_id = req.user.employee_id ?? 0;
  const { deposit_id, deposit_amount } = req.body;
  const depositor_employee_id = req.body.depositor_employee_id ?? 0;
  const depositee_employee_id = req.body.depositee_employee_id ?? 0;
  const extern_deposit_id = req.body.extern_deposit_id ?? null;

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

      if (accessLevel < 2) {
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

    response = await client.query(
      `SELECT deposit_id 
       FROM register_deposits_record 
       WHERE company_id = $1 AND deposit_id = $2`,
      [company_id, deposit_id]
    );

    const depositExists = response.rows[0];

    if (!depositExists) {
      return res.status(401).json({
        errors: [
          {
            type: "field",
            value: deposit_id,
            msg: "Deposit does not exist.",
            path: "deposit_id",
            location: "body",
          },
        ],
      });
    }

    await client.query(
      `UPDATE register_deposits_record 
       SET deposit_amount = $1, 
           deposit_timestamp = now(), 
           depositor_employee_id = $2, 
           depositee_employee_id = $3, 
           extern_deposit_id = $4 
       WHERE company_id = $5 AND deposit_id = $6`,
      [deposit_amount, depositor_employee_id, depositee_employee_id, extern_deposit_id, company_id, deposit_id]
    );

    await client.query("COMMIT");

    return res.status(200).json({
      success: true,
      message: `Register deposit updated!`,
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
