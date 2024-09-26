const db = require("../db");

exports.addInvite = async (req, res) => {
  const { company_id, invite_code } = req.body;

  try {
    await db.query("insert into invite_codes(company_id, invite_code) values($1, $2)", [company_id, invite_code]);

    return res.status(201).json({
      success: true,
      message: "The invite code was successfully added!",
    });
  } catch (error) {
    return res.status(400).json({
      error: error.message,
    });
  }
};
