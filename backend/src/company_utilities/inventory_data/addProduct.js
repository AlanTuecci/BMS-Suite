const pool = require("../../db");

exports.addProduct = async (req, res) => {
  const { company_id } = req.user;
  const { product_sku, product_name } = req.body;
  const product_description = req.body.product_description ?? "";

  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    const { rows } = await client.query("select * from product_info where company_id = $1 and product_sku = $2", [
      company_id,
      product_sku,
    ]);

    if (rows.length != 0) {
      return res.status(500).json({
        errors: [
          {
            type: "field",
            value: product_sku,
            msg: "Product already exists.",
            path: "product_sku",
            location: "body",
          },
        ],
      });
    } else {
      await client.query(
        "insert into product_info(company_id, product_sku, product_name, product_description) values($1, $2, $3, $4)",
        [company_id, product_sku, product_name, product_description]
      );
      await client.query(
        "insert into product_counts(company_id, product_sku, employee_id, on_hand_loose_unit_count, on_hand_tray_count, on_hand_case_count) values($1, $2, 0, $3, $4, $5)",
        [company_id, product_sku, 0, 0, 0]
      );
    }

    await client.query("COMMIT");

    return res.status(200).json({
      success: true,
      message: `Product added!`,
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
