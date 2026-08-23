"use client";

import { useState } from "react";

const FORM_ENDPOINT = "https://formsubmit.co/fatinfuadraj035@gmail.com";

export default function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = (name, value) => {
    switch (name) {
      case "name":
        if (!value.trim()) return "Please enter your name.";
        if (value.trim().length < 2) return "Your name needs at least 2 characters.";
        return "";
      case "email":
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!value.trim()) return "Please enter your email address.";
        if (!emailRegex.test(value.trim())) return "That email address doesn\u2019t look valid.";
        return "";
      case "message":
        if (!value.trim()) return "Please write a short message.";
        if (value.trim().length < 10) return "Please write a little more (at least 10 characters).";
        return "";
      default:
        return "";
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: validate(name, value) }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus(null);

    const newErrors = {
      name: validate("name", formData.name),
      email: validate("email", formData.email),
      message: validate("message", formData.message),
    };

    setErrors(newErrors);

    if (Object.values(newErrors).some((err) => err)) {
      setStatus({ type: "error", text: "Please fix the highlighted fields and try again." });
      return;
    }

    setIsSubmitting(true);

    if (FORM_ENDPOINT) {
      try {
        const formDataObj = new FormData();
        formDataObj.append("name", formData.name);
        formDataObj.append("email", formData.email);
        formDataObj.append("message", formData.message);
        formDataObj.append("_subject", "New message from portfolio");
        formDataObj.append("_captcha", "false");

        const response = await fetch(FORM_ENDPOINT, {
          method: "POST",
          body: formDataObj,
          headers: { Accept: "application/json" },
        });

        if (!response.ok) throw new Error("Form endpoint rejected the request");
        setStatus({ type: "success", text: "Thanks! Your message is on its way \u2014 I\u2019ll reply within 24 hours." });
        setFormData({ name: "", email: "", message: "" });
      } catch (err) {
        setStatus({ type: "error", text: "Something went wrong sending your message. Please email me directly instead." });
      }
    } else {
      await new Promise((resolve) => setTimeout(resolve, 700));
      setStatus({ type: "success", text: "Thanks! Your message is on its way \u2014 I\u2019ll reply within 24 hours. (Demo mode: wire up FORM_ENDPOINT to actually receive it.)" });
      setFormData({ name: "", email: "", message: "" });
    }

    setIsSubmitting(false);
  };

  return (
    <section className="section contact" id="contact">
      <div className="container">
        <div className="contact-grid">
          <div className="contact-info reveal">
            <p className="section-eyebrow">Contact</p>
            <h2 className="section-title">Let&rsquo;s make something good together.</h2>
            <p>
              Got footage that needs a story? A deadline that&rsquo;s breathing down your neck?
              Tell me about your project and I&rsquo;ll get back to you within 24 hours.
            </p>

            <a className="contact-email" href="mailto:fatinfuadraj035@gmail.com">fatinfuadraj035@gmail.com</a>

            <ul className="socials" aria-label="Social media links">
              <li><a href="https://youtube.com" target="_blank" rel="noopener noreferrer">YouTube</a></li>
              <li><a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a></li>
              <li><a href="https://vimeo.com" target="_blank" rel="noopener noreferrer">Vimeo</a></li>
              <li><a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
            </ul>
          </div>

          <form className="contact-form reveal" id="contact-form" noValidate onSubmit={handleSubmit}>
            <input type="hidden" name="_subject" value="New message from portfolio" />
            <input type="hidden" name="_captcha" value="false" />
            
            <div className={`field ${errors.name ? "is-invalid" : ""}`}>
              <label htmlFor="contact-name">Name</label>
              <input
                id="contact-name"
                name="name"
                type="text"
                autoComplete="name"
                required
                minLength="2"
                placeholder="Jane Doe"
                value={formData.name}
                onChange={handleChange}
                aria-invalid={!!errors.name}
              />
              <p className="field-error" id="contact-name-error" hidden={!errors.name}>{errors.name}</p>
            </div>

            <div className={`field ${errors.email ? "is-invalid" : ""}`}>
              <label htmlFor="contact-email">Email</label>
              <input
                id="contact-email"
                name="email"
                type="email"
                autoComplete="email"
                required
                placeholder="jane@studio.com"
                value={formData.email}
                onChange={handleChange}
                aria-invalid={!!errors.email}
              />
              <p className="field-error" id="contact-email-error" hidden={!errors.email}>{errors.email}</p>
            </div>

            <div className={`field ${errors.message ? "is-invalid" : ""}`}>
              <label htmlFor="contact-message">Message</label>
              <textarea
                id="contact-message"
                name="message"
                rows="5"
                required
                minLength="10"
                placeholder="Tell me about your project, timeline, and budget…"
                value={formData.message}
                onChange={handleChange}
                aria-invalid={!!errors.message}
              ></textarea>
              <p className="field-error" id="contact-message-error" hidden={!errors.message}>{errors.message}</p>
            </div>

            <button type="submit" className="btn btn-primary btn-block" disabled={isSubmitting}>
              {isSubmitting ? "Sending…" : "Send Message"}
            </button>

            {status && (
              <p className={`form-status is-${status.type}`} role="status" aria-live="polite">
                {status.text}
              </p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
