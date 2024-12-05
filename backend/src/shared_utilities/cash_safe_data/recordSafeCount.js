const pool = require("../../db");

exports.recordSafeCount = async (req, res) => {
  const { user_type, company_id } = req.user;
  const employee_id = req.user.employee_id ?? 0;

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
        "select access_control_level from cash_access_info where company_id = $1 and employee_id = $2",
        [company_id, employee_id]
      );

      const accessLevel = response.rows[0].access_control_level;

      if (accessLevel < 1) {
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

    await client.query(
      "INSERT INTO safe_record(company_id, employee_id, draws, loans, coin_change, pennies, nickels, dimes, quarters, singles, doubles, fives, tens, twenties, fifties, hundreds, total) values($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17)",
      [
        company_id,
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
      ]
    );

    await client.query("COMMIT");

    return res.status(200).json({
      success: true,
      message: `Safe count recorded!`,
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
