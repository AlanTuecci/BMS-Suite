const pool = require("../../db");

exports.deleteInvite = async (req, res) => {
  const { company_id } = req.user;
  const { employee_email } = req.body;

  try {
    const { rowCount } = await pool.query(
      "delete from invite_codes where company_id = $1 and employee_email = $2",
      [company_id, employee_email]
    );

    if (rowCount > 0) {
      return res.status(200).json({
        success: true,
        message: `Invite deleted!`,
      });
    } else {
      return res.status(500).json({
        errors: [
          {
            type: "field",
            value: employee_email,
            msg: `Unable to delete invite for ${employee_email}.`,
            path: "employee_info",
            location: "body",
          },
        ],
      });
    }
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
