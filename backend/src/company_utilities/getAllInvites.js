const db = require("../db");

exports.getAllInvites = async (req, res) => {
  const { company_id } = req.body;

  try {
    const { rows } = await db.query("select * from invite_codes where company_id = $1", [company_id]);

    return res.status(201).json(rows);
  } catch (error) {
    return res.status(400).json({
      error: error.message,
    });
  }
};
