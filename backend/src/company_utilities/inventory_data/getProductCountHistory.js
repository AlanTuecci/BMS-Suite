const pool = require("../../db");

exports.getProductCountHistory = async (req, res) => {
  const { company_id } = req.user;
  const { product_sku, num_entries } = req.body;

  try {
    const { rows } = await pool.query(
      "select * from product_counts where company_id = $1 and product_sku = $2 order by count_date desc, count_time desc limit $3",
      [company_id, product_sku, num_entries]
    );

    if (rows.length == 0) {
      return res.status(500).json({
        errors: [
          {
            type: "field",
            value: product_sku,
            msg: "Product not found.",
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
