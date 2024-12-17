const { sign } = require("jsonwebtoken");
const { SECRET } = require("../constants");

exports.timeLogin = async (req, res) => {
  let user = req.user || req.body;
  let payload = {
    user_type: "time_admin",
    company_id: user.company_id,
    company_admin_email: user.company_admin_email,
  };

  try {
    const token = sign(payload, SECRET);

    return res.status(200).cookie("token", token, { httpOnly: true }).json({
      success: true,
      message: "Login successful.",
      user_type: "time_admin",
      inventory_access_level: 0,
      labor_access_level: 0,
      cash_access_level: 0,
    });
  } catch (error) {
    console.log(error.message);
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
