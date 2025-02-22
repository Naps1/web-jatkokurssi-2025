import React, { useState } from "react";

const Contact = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    setSubmitted(true);
    event.target.reset(); // Reset the form fields
  };

  return (
    <section id="contact" className="section">
      <h2>Contact</h2>
      <p>Here should be some way of contacting me.</p>
      <p>
        Fill in this beautiful form, and someone will hopefully read it and get
        back to you.
      </p>

      <form id="contactForm" className="form" onSubmit={handleSubmit}>
        <input type="text" id="name" placeholder="Your Name" required />
        <input type="email" id="email" placeholder="Your Email" required />
        <textarea id="message" placeholder="Your Message" required></textarea>
        <button type="submit">Submit</button>
      </form>

      {submitted && <div className="message">Thank you for your message!</div>}
    </section>
  );
};

export default Contact;
