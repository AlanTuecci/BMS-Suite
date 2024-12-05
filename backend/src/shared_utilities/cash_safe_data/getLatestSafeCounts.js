const pool = require("../../db");

exports.getLatestSafeCounts = async (req, res) => {
  const { company_id } = req.user;
  const num_entries = req.body.num_entries ?? 10;
  const min_entry_num = req.body.min_entry_num ?? 0;

  try {
    const { rows } = await pool.query(
      `SELECT
        employee_id,
        count_id,
        count_timestamp,
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
        total 
       FROM safe_record 
       WHERE company_id = $1
       ORDER BY count_timestamp DESC 
       LIMIT $2 OFFSET $3`,
      [company_id, num_entries, min_entry_num]
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
