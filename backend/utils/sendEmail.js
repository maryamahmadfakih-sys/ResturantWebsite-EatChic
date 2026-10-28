const nodemailer = require("nodemailer");

// Two ways to send email:
// 1. BREVO_API_KEY set  -> Brevo's HTTPS API. Use this on hosts that block
//    email ports, like Render's free tier.
// 2. Otherwise          -> Gmail through Nodemailer (fine on your own computer).
const FROM_EMAIL = process.env.EMAIL_FROM || process.env.EMAIL_USER;
const FROM_NAME = "Eat Chic";

const sendWithBrevo = async (to, subject, htmlContent) => {
  const res = await fetch("https://api.brevo.com/v3/smtp/email", {
    method: "POST",
    headers: {
      "api-key": process.env.BREVO_API_KEY,
      "Content-Type": "application/json",
      accept: "application/json",
    },
    body: JSON.stringify({
      sender: { name: FROM_NAME, email: FROM_EMAIL },
      to: [{ email: to }],
      subject,
      htmlContent,
    }),
  });
  if (!res.ok) {
    throw new Error(`Brevo responded ${res.status}: ${await res.text()}`);
  }
  return (await res.json()).messageId;
};

const sendWithGmail = async (to, subject, htmlContent) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS },
  });
  const info = await transporter.sendMail({
    from: `"${FROM_NAME}" <${FROM_EMAIL}>`,
    to,
    subject,
    html: htmlContent,
  });
  return info.messageId;
};

const sendEmail = async (to, subject, htmlContent) => {
  try {
    const id = process.env.BREVO_API_KEY
      ? await sendWithBrevo(to, subject, htmlContent)
      : await sendWithGmail(to, subject, htmlContent);
    console.log("Email sent successfully:", id);
    return true;
  } catch (error) {
    console.error("Error sending email:", error.message);
    return false;
  }
};

module.exports = sendEmail;
