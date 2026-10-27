const express = require("express");
const router = express.Router();
const sendEmail = require("../utils/sendEmail");

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
      await sendEmail(
        "42130811@students.liu.edu.lb", 
        `New Website Contact Form: ${subject || "No Subject"}`,
        `
          <h2>New Contact Form Message</h2>
          <p><strong>From:</strong> ${name}</p>
          <p><strong>User's Email:</strong> ${email}</p>
          <p><strong>Subject:</strong> ${subject || "N/A"}</p>
          <hr />
          <p><strong>Message:</strong></p>
          <p style="background-color: #f4f6f8; padding: 12px; border-left: 4px solid #3e3c94;">
            ${message}
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