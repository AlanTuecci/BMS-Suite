const db = require("../../db");

exports.addProduct = async (req, res) => {
  const { company_id } = req.user;
  const { product_sku, product_name, product_description } = req.body;

  try {
    const { rows } = await db.query("select * from product_info where company_id = $1 and product_sku = $2", [
      company_id,
      product_sku,
    ]);

    if (rows.length == 0) {
      await db.query(
        "insert into product_info(company_id, product_sku, product_name, product_description) values($1, $2, $3, $4)",
        [company_id, product_sku, product_name, product_description]
      );
    } else {
      await db.query(
        "UPDATE product_info SET product_name = $1, product_description = $2 WHERE company_id = $3 AND product_sku = $4",
        [product_name, product_description, company_id, product_sku]
      );
    }

    return res.status(200).json({
      success: true,
      message: `Product added!`,
    });
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
