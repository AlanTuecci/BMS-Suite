const pool = require("../../db");

exports.getNumSafeCounts = async (req, res) => {
  const { company_id } = req.user;

  try {
    const { rows } = await pool.query(
      `SELECT count(count_id)
       FROM safe_record 
       WHERE company_id = $1`,
      [company_id]
    );

    return res.status(200).json(rows[0]);
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
