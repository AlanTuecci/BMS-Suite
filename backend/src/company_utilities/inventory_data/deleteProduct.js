const pool = require("../../db");

exports.deleteProduct = async (req, res) => {
  const { company_id } = req.user;
  const { product_sku } = req.body;

  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    const { rows } = await client.query("select * from product_info where company_id = $1 and product_sku = $2", [
      company_id,
      product_sku,
    ]);

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
    } else {
      await client.query("delete from product_counts where company_id = $1 and product_sku = $2", [
        company_id,
        product_sku,
      ]);
      await client.query("delete from product_info where company_id = $1 and product_sku = $2", [
        company_id,
        product_sku,
      ]);
    }

    await client.query("COMMIT");

    return res.status(200).json({
      success: true,
      message: `Product and records deleted!`,
    });
  } catch (error) {
    console.log(error);
    await client.query("ROLLBACK");

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
  } finally {
    client.release();
  }
};
