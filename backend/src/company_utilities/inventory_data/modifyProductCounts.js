const pool = require("../../db");

exports.modifyProductCounts = async (req, res) => {
  const { company_id } = req.user;
  const { product_sku, product_count_id } = req.body;

  const on_hand_loose_unit_count = req.body.on_hand_loose_unit_count ?? 0;
  const on_hand_tray_count = req.body.on_hand_tray_count ?? 0;
  const on_hand_case_count = req.body.on_hand_case_count ?? 0;

  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    response = await client.query("select product_sku from product_info where company_id = $1 and product_sku = $2", [
      company_id,
      product_sku,
    ]);

    const productExists = response.rows[0];

    if (!productExists) {
      return res.status(401).json({
        errors: [
          {
            type: "field",
            value: product_sku,
            msg: "Product does not exist.",
            path: "product_sku",
            location: "body",
          },
        ],
      });
    }

    await client.query(
      "UPDATE product_counts SET employee_id = 0, count_date = current_date, count_time = current_time, on_hand_loose_unit_count = $1, on_hand_tray_count = $2, on_hand_case_count = $3 WHERE company_id = $4 AND product_sku = $5 AND product_count_id = $6",
      [on_hand_loose_unit_count, on_hand_tray_count, on_hand_case_count, company_id, product_sku, product_count_id]
    );

    await client.query("COMMIT");

    return res.status(200).json({
      success: true,
      message: `Product counts updated!`,
    });
  } catch (error) {
    await client.query("ROLLBACK");

    return res.status(500).json({
      errors: [
        {
          type: "Unknown",
          value: "Unknnown",
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
