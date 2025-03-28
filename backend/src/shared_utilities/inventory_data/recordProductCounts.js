const pool = require("../../db");

exports.recordProductCounts = async (req, res) => {
  const { user_type, company_id } = req.user;
  const employee_id = req.user.employee_id ?? 0;
  const { product_sku } = req.body;

  const on_hand_loose_unit_count = req.body.on_hand_loose_unit_count ?? 0;
  const on_hand_tray_count = req.body.on_hand_tray_count ?? 0;
  const on_hand_case_count = req.body.on_hand_case_count ?? 0;

  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    if (user_type !== "company") {
      let response = await client.query(
        `SELECT access_control_level
         FROM inventory_access_info
         WHERE company_id = $1 AND employee_id = $2`,
        [company_id, employee_id]
      );

      const accessLevel = response.rows[0].access_control_level;

      if (accessLevel < 1) {
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
    }

    response = await client.query(
      `SELECT product_sku
       FROM product_info 
       WHERE company_id = $1 AND product_sku = $2`,
      [company_id, product_sku]
    );

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
      "insert into product_counts(company_id, product_sku, employee_id, on_hand_loose_unit_count, on_hand_tray_count, on_hand_case_count) values($1, $2, $3, $4, $5, $6)",
      [company_id, product_sku, employee_id, on_hand_loose_unit_count, on_hand_tray_count, on_hand_case_count]
    );

    await client.query("COMMIT");

    return res.status(200).json({
      success: true,
      message: `Product counts recorded!`,
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
