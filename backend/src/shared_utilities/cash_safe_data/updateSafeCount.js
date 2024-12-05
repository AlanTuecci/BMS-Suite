const pool = require("../../db");

exports.updateSafeCount = async (req, res) => {
  const { user_type, company_id } = req.user;
  const employee_id = req.user.employee_id ?? 0;
  const { count_id } = req.body;

  //Note: The body needs to have either a new value or an existing value, otherwise the value in the database will be cleared!
  const draws = req.body.draws ?? 0;
  const loans = req.body.loans ?? null;
  const coin_change = req.body.coin_change ?? 0;
  const pennies = req.body.pennies ?? 0;
  const nickels = req.body.nickels ?? 0;
  const dimes = req.body.dimes ?? 0;
  const quarters = req.body.quarters ?? 0;
  const singles = req.body.singles ?? 0;
  const doubles = req.body.doubles ?? 0;
  const fives = req.body.fives ?? 0;
  const tens = req.body.tens ?? 0;
  const twenties = req.body.twenties ?? 0;
  const fifties = req.body.fifties ?? 0;
  const hundreds = req.body.hundreds ?? 0;

  let total =
    parseInt(draws || 0) +
    parseInt(coin_change || 0) +
    parseInt(pennies || 0) +
    parseInt(nickels || 0) +
    parseInt(dimes || 0) +
    parseInt(quarters || 0) +
    parseInt(singles || 0) +
    parseInt(doubles || 0) +
    parseInt(fives || 0) +
    parseInt(tens || 0) +
    parseInt(twenties || 0) +
    parseInt(fifties || 0) +
    parseInt(hundreds || 0);

  if (loans !== null) {
    total = total + (parseInt(loans) || 0);
  }

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
      `SELECT count_id
       FROM safe_record 
       WHERE company_id = $1 AND count_id = $2`,
      [company_id, count_id]
    );

    const countExists = response.rows[0];

    if (!countExists) {
      return res.status(401).json({
        errors: [
          {
            type: "field",
            value: count_id,
            msg: "Safe count does not exist.",
            path: "count_id",
            location: "body",
          },
        ],
      });
    }

    await client.query(
      "UPDATE safe_record SET employee_id = $1, count_timestamp = now(), draws = $2, loans = $3, coin_change = $4, pennies = $5, nickels = $6, dimes = $7, quarters = $8, singles = $9, doubles = $10, fives = $11, tens = $12, twenties = $13, fifties = $14, hundreds = $15, total = $16 WHERE company_id = $17 AND count_id = $18",
      [
        employee_id,
        draws,
        loans,
        coin_change,
        pennies,
        nickels,
        dimes,
        quarters,
        singles,
        doubles,
        fives,
        tens,
        twenties,
        fifties,
        hundreds,
        total,
        company_id,
        count_id,
      ]
    );

    await client.query("COMMIT");

    return res.status(200).json({
      success: true,
      message: `Safe count updated!`,
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
