const pool = require("../../db");

exports.getAllInvites = async (req, res) => {
  const { company_id } = req.user;

  try {
    const { rows } = await pool.query("select * from invite_codes where company_id = $1", [
      company_id,
    ]);

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
