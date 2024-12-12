const pool = require("../../db");

exports.getAllLatestProductCounts = async (req, res) => {
  const { company_id } = req.user;

  try {
    const { rows } = await pool.query(
      `SELECT DISTINCT ON (product_sku)
        product_info.product_sku, 
        product_info.product_name,
        product_counts.product_count_id,
        product_counts.employee_id,
        product_counts.count_timestamp,
        product_counts.on_hand_loose_unit_count,
        product_counts.on_hand_tray_count,
        product_counts.on_hand_case_count
      FROM product_info
      INNER JOIN product_counts ON product_info.product_sku = product_counts.product_sku
      WHERE product_info.company_id = $1
      ORDER BY product_sku, count_timestamp DESC`,
      [company_id]
    );

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
