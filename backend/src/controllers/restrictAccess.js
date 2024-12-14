exports.restrictAccess = async (req, res, next) => {
  const { user_type } = req.user;

  if (user_type !== "company" && user_type !== "employee") {
    return res.status(401).json({
      errors: [
        {
          type: "field",
          value: user_type,
          msg: "Unauthorized.",
          path: "user_type",
          location: "cookie",
        },
      ],
    });
  } else {
    next();
  }
};
