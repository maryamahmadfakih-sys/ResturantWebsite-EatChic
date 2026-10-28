const express = require("express");
const router = express.Router();
const sendEmail = require("../utils/sendEmail");

// Where contact messages are delivered. Set CONTACT_TO to change it.
const CONTACT_TO = process.env.CONTACT_TO || "maryamahmadfakih@gmail.com";

// Stop visitors from injecting HTML into the email
const escapeHtml = (text = "") =>
  String(text).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

router.post("/send-message", async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    // 1. Validation check
    if (!name || !email || !message) {
      return res.status(400).json({ message: "Please fill in all required fields." });
    }

    // 2. Log message to backend terminal (Great for debugging)
    console.log("New Contact Form Submission:", { name, email, subject, message });

    // 3. Send email to your student inbox (Safely wrapped)
    try {
      const safe = {
        name: escapeHtml(name),
        email: escapeHtml(email),
        subject: escapeHtml(subject),
        message: escapeHtml(message).replace(/\n/g, "<br />"),
      };
      await sendEmail(
        CONTACT_TO,
        `New Website Contact Form: ${subject || "No Subject"}`,
        `
          <h2>New Contact Form Message</h2>
          <p><strong>From:</strong> ${safe.name}</p>
          <p><strong>User's Email:</strong> ${safe.email}</p>
          <p><strong>Subject:</strong> ${safe.subject || "N/A"}</p>
          <hr />
          <p><strong>Message:</strong></p>
          <p style="background-color: #f4f6f8; padding: 12px; border-left: 4px solid #4F5B2A;">
            ${safe.message}
          </p>
        `
      );
    } catch (emailError) {
      console.error("Nodemailer failed to send email:", emailError.message);
      // We log the error here, but allow the user request to succeed
    }

    // 4. Return success response to React
    return res.json({ message: "Message sent successfully!" });

  } catch (error) {
    console.error("Contact Route Error:", error);
    return res.status(500).json({ message: "Failed to process message." });
  }
});

module.exports = router;