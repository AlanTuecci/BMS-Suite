const db = require("../../db");

exports.setMinInventoryAccessControl = async (req, res) => {
  const { company_id } = req.user;
  const { min_access_control } = req.body;

  try {
    const { rows } = await db.query("select * from inventory_access_control where company_id = $1", [company_id]);

    if (rows.length == 0) {
      if (min_access_control) {
        await db.query(
          "insert into inventory_access_control(company_id, inventory_min_access_control_level) values($1, $2)",
          [company_id, min_access_control]
        );
      } else {
        await db.query(
          "insert into inventory_access_control(company_id, inventory_min_access_control_level) values($1, $2)",
          [company_id, 1]
        );
      }
    } else {
      await db.query(
        "UPDATE inventory_access_control SET inventory_min_access_control_level = $1 WHERE company_id = $2",
        [min_access_control, company_id]
      );
    }

    return res.status(200).json({
      success: true,
      message: `Inventory min access control level set!`,
    });
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
