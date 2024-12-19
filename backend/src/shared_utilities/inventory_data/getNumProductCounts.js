const pool = require("../../db");

exports.getNumProductCounts = async (req, res) => {
  const { company_id } = req.user;
  const { product_sku } = req.body;

  try {
    const { rows } = await pool.query(
      `SELECT count(product_count_id)
       FROM product_counts 
       WHERE company_id = $1 
        AND product_sku = $2`,
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

    return res.status(200).json(rows[0]);
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
