const pool = require("../../db");

exports.removeProductCounts = async (req, res) => {
  const { company_id } = req.user;
  const { product_sku, product_count_id } = req.body;

  try {
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
