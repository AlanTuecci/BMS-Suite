const pool = require("../db");
const { hash } = require("bcryptjs");

exports.updatePin = async (req, res) => {
  const { company_id, employee_id } = req.user;
  const { pin } = req.body;

  if (typeof pin != "string" || pin.length > 4) {
    return res.status(400).json({
      errors: [
        {
          type: "field",
          value: pin,
          msg: "PIN is too long.",
          path: "pin",
          location: "body",
        },
      ],
    });
  }

  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    const hashedPin = await hash(pin, 10);

    await client.query(
      `UPDATE employee_time_pin_record 
       SET employee_time_pin = $1 
       WHERE company_id = $2 
        AND employee_id = $3`,
      [hashedPin, company_id, employee_id]
    );

    await client.query("COMMIT");

    return res.status(201).json({
      success: true,
      message: "PIN updated successfully!",
    });
  } catch (error) {
    console.log(error.message);
    await client.query("ROLLBACK");

    return res.status(500).json({
      errors: [
        {
          type: "Unknown",
          value: "Unkown",
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
