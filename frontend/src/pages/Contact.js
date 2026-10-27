import React, { useState } from "react";
import { API_URL } from "../config";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [statusMessage, setStatusMessage] = useState("");
  const [statusOk, setStatusOk] = useState(true);
  const [sending, setSending] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);

    try {
      const response = await fetch(`${API_URL}/api/contact/send-message`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setStatusOk(true);
        setStatusMessage("Message sent. We'll get back to you by email.");
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        setStatusOk(false);
        setStatusMessage(data.message || "The message couldn't be sent. Please try again.");
      }
    } catch (err) {
      setStatusOk(false);
      setStatusMessage("Can't reach the server right now. Check your connection and try again.");
    }

    setSending(false);
    setTimeout(() => setStatusMessage(""), 4000);
  };

  return (
    <section className="page">
      <div className="wrap">
        <div className="page-head">
          <h1>Get in touch</h1>
          <p>Questions, feedback or a table for a big group? Send us a message or call us directly.</p>
        </div>

        <div className="contact-layout">
          <div className="contact-details">
            <h2>Contact details</h2>
            <dl>
              <div className="detail">
                <dt>Address</dt>
                <dd>Lebanon</dd>
              </div>
              <div className="detail">
                <dt>Phone</dt>
                <dd><a href="tel:+96107727272">+961 07 727 272</a></dd>
              </div>
              <div className="detail">
                <dt>Email</dt>
                <dd><a href="mailto:42130811@students.liu.edu.lb">42130811@students.liu.edu.lb</a></dd>
              </div>
              <div className="detail">
                <dt>Hours</dt>
                <dd>Monday to Saturday, 9:00 AM – 11:00 PM</dd>
              </div>
            </dl>
          </div>

          <form className="contact-form" onSubmit={handleSubmit}>
            {statusMessage && (
              <div className={`notice ${statusOk ? "notice-ok" : "notice-error"}`} role="status">
                {statusMessage}
              </div>
            )}

            <div className="form-row">
              <div className="field">
                <label htmlFor="c-name">Your name</label>
                <input
                  id="c-name"
                  className="input"
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="field">
                <label htmlFor="c-email">Email</label>
                <input
                  id="c-email"
                  className="input"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="name@example.com"
                  required
                />
              </div>
            </div>

            <div className="field">
              <label htmlFor="c-subject">Subject</label>
              <input
                id="c-subject"
                className="input"
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder="How can we help?"
              />
            </div>

            <div className="field">
              <label htmlFor="c-message">Message</label>
              <textarea
                id="c-message"
                className="input"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows="5"
                required
              ></textarea>
            </div>

            <button type="submit" className="btn btn-primary" disabled={sending}>
              {sending ? "Sending…" : "Send message"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

export default Contact;
