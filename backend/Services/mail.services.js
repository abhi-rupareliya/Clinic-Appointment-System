require("dotenv").config();
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: false,
  requireTLS: true,
  auth: {
    user: process.env.EMAIL_MAILER,
    pass: process.env.EMAIL_PASS,
  },
});

exports.sendEmail = async (recipients, subject, text) => {
  try {
    const mailOptions = {
      from: process.env.EMAIL_MAILER,
      to: recipients,
      subject: subject,
      text: text,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent:", info.messageId);
    return { error: null, info };
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
};
