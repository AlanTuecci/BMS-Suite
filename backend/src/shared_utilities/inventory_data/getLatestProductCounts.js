const pool = require("../../db");

exports.getLatestProductCounts = async (req, res) => {
  const { company_id } = req.user;
  const { product_sku } = req.body;

  try {
    const { rows } = await pool.query(
      `SELECT 
          product_sku,
          product_count_id,
          employee_id,
          count_timestamp,
          on_hand_loose_unit_count,
          on_hand_tray_count,
          on_hand_case_count
        FROM product_counts 
        WHERE company_id = $1 AND product_sku = $2 
        ORDER BY count_timestamp DESC LIMIT 1`,
      [company_id, product_sku]
    );

    if (rows.length == 0) {
      return res.status(500).json({
        errors: [
          {
            type: "field",
            value: product_sku,
            msg: "Product not found.",
            path: "product_sku",
            location: "body",
          },
        ],
      });
    }

    return res.status(200).json(rows);
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
