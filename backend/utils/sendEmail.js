const nodemailer = require("nodemailer");

// Two ways to send email:
// 1. RESEND_API_KEY set -> Resend (used on Render, which blocks Gmail).
//    Without your own domain it can only send to your Resend account email.
// 2. Otherwise          -> Gmail through Nodemailer (works on your own computer).
const FROM_NAME = "Eat Chic";

const sendWithResend = async (to, subject, htmlContent) => {
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      "Content-Type": "application/json",
      "User-Agent": "eat-chic-backend",
    },
    body: JSON.stringify({
      from: `${FROM_NAME} <onboarding@resend.dev>`,
      to: [to],
      subject,
      html: htmlContent,
    }),
  });
  if (!res.ok) {
    throw new Error(`Resend responded ${res.status}: ${await res.text()}`);
  }
  return (await res.json()).id;
};

const sendWithGmail = async (to, subject, htmlContent) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS },
  });
  const info = await transporter.sendMail({
    from: `"${FROM_NAME}" <${process.env.EMAIL_USER}>`,
    to,
    subject,
    html: htmlContent,
  });
  return info.messageId;
};

const sendEmail = async (to, subject, htmlContent) => {
  try {
    const id = process.env.RESEND_API_KEY
      ? await sendWithResend(to, subject, htmlContent)
      : await sendWithGmail(to, subject, htmlContent);
    console.log("Email sent successfully:", id);
    return true;
  } catch (error) {
    console.error("Error sending email:", error.message);
    return false;
  }
};

module.exports = sendEmail;