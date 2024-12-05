const pool = require("../../db");

exports.updateProduct = async (req, res) => {
  const { company_id } = req.user;
  const { product_sku, product_name, product_description } = req.body;

  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    const { rows } = await client.query(
      `SELECT * 
       FROM product_info 
       WHERE company_id = $1 AND product_sku = $2`,
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
    } else {
      if (product_name) {
        await client.query(
          `UPDATE product_info 
           SET product_name = $1
           WHERE company_id = $2 AND product_sku = $3`,
          [product_name, company_id, product_sku]
        );
      }
      if (product_description) {
        await client.query(
          `UPDATE product_info 
           SET product_description = $1 
           WHERE company_id = $2 AND product_sku = $3`,
          [product_description, company_id, product_sku]
        );
      }
    }

    await client.query("COMMIT");

    return res.status(200).json({
      success: true,
      message: `Product details updated!`,
    });
  } catch (error) {
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
