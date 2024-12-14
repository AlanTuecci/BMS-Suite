exports.logout = async (req, res) => {
  try {
    res.clearCookie("access_token", { httpOnly: true });
    return res.status(200).clearCookie("token", { httpOnly: true }).json({
      success: true,
      message: "Logout successful.",
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

exports.timeSignEmployeeOut = async (req, res) => {
  return res.status(200).clearCookie("access_token", { httpOnly: true }).json({
    success: true,
    message: "Employee sign out successful.",
  });
};

exports.returnAllUserTypeAndPermissionLevels = async (req, res) => {
  return res.status(200).json({
    user_type: req.user.user_type,
    inventory_access_level: req.user.inventory_access_level,
    labor_access_level: req.user.labor_access_level,
    cash_access_level: req.user.cash_access_level,
  });
};
