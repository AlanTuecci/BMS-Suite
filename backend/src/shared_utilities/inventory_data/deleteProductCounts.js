const pool = require("../../db");

exports.deleteProductCounts = async (req, res) => {
  const { user_type, company_id } = req.user;
  const employee_id = req.user.employee_id ?? 0;
  const { product_sku, product_count_id } = req.body;

  try {
    if (user_type !== "company") {
      const response = await pool.query(
        `SELECT access_control_level
         FROM inventory_access_info 
         WHERE company_id = $1 AND employee_id = $2`,
        [company_id, employee_id]
      );

      const accessLevel = response.rows[0].access_control_level;

      if (accessLevel < 3) {
        return res.status(401).json({
          errors: [
            {
              type: "field",
              value: employee_id,
              msg: "Unauthorized operation.",
              path: "employee_id",
              location: "user",
            },
          ],
        });
      }
    }

    const { rowCount } = await pool.query(
      `DELETE FROM product_counts
       WHERE company_id = $1 AND product_sku = $2 AND product_count_id = $3`,
      [company_id, product_sku, product_count_id]
    );

    if (rowCount > 0) {
      return res.status(200).json({
        success: true,
        message: `Product count deleted!`,
      });
    } else {
      return res.status(500).json({
        errors: [
          {
            type: "field",
            value: product_count_id,
            msg: `Unable to delete product count.`,
            path: "product_count_id",
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
