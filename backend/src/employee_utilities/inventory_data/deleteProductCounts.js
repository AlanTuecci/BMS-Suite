const pool = require("../../db");

exports.deleteProductCounts = async (req, res) => {
  const { company_id, employee_id } = req.user;
  const { product_sku, product_count_id } = req.body;

  try {
    const response = await pool.query(
      "select access_control_level from inventory_access_info where company_id = $1 and employee_id = $2",
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
    const { rowCount } = await pool.query(
      "delete from product_counts where company_id = $1 and product_sku = $2 and product_count_id = $3",
      [company_id, product_sku, product_count_id]
    );

    if (rowCount > 0) {
      return res.status(200).json({
        success: true,
        message: `Product Count deleted!`,
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
