const db = require("../db");

exports.deleteInvite = async (req, res) => {
  const { company_id, invite_code } = req.body;

  try {
    await db.query("delete from invite_codes where (company_id = $1 AND invite_code = $2)", [company_id, invite_code]);

    return res.status(201).json({
      success: true,
      message: "The invite code was successfully deleted!",
    });
  } catch (error) {
    return res.status(400).json({
      error: error.message,
    });
  }
};
