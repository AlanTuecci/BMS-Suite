const pool = require("../../db");
const { SERVER_EMAIL, SERVER_EMAIL_PASSWORD } = require("../../constants");
const nodemailer = require("nodemailer");

exports.inviteEmployee = async (req, res) => {
  const { employee_email } = req.body;
  const { company_id } = req.user;

  const client = await pool.connect();

  const invite_code = Math.floor(Math.random() * 999999) + 1;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 587,
    secure: true,
    auth: {
      user: SERVER_EMAIL,
      pass: SERVER_EMAIL_PASSWORD,
    },
  });

  const mail_options = {
    from: SERVER_EMAIL,
    to: employee_email,
    subject: "Your Invite Code to BMS Suite!",
    text: `Your invite code is: ${invite_code}.`,
    html: `<h1>Welcome to BMS Suite</h1>Your invite code is: <b>${invite_code}</b>.<br><br>Please keep in mind, when creating your account, you must use the email exactly as it appears here: <b>${employee_email}</b>`,
  };

  try {
    await client.query("BEGIN");
    let query = await client.query("select * from invite_codes where invite_code = $1", [
      invite_code,
    ]);
    if (query.rows.length) {
      return res.status(500).json({
        error: "Unable to generate unique invite code! Please try again.",
      });
    }

    query = await client.query("select * from invite_codes where employee_email = $1", [
      employee_email,
    ]);
    if (query.rows.length) {
      return res.status(404).json({
        error: `There is already an invite for employee with email ${employee_email}! Please use a different email.`,
      });
    }

    await client.query(
      "insert into invite_codes(company_id, invite_code, employee_email) values($1, $2, $3)",
      [company_id, invite_code, employee_email]
    );

    await transporter.sendMail(mail_options);

    await client.query("COMMIT");

    return res.status(201).json({
      success: true,
      message: `Invite sent to ${employee_email}!`,
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
