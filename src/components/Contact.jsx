import React from "react";

export default function Contact() {
  return (
    <section id="contact">
      <div className="container">
        <h2 className="slide-left">Contact</h2>
        <div
          className="reveal"
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(600px 200px at 80% 20%, rgba(15,37,68,0.06), transparent)",
            zIndex: -1,
          }}
          data-parallax="0.25"
          aria-hidden
        />
        <form
          className="contact-form reveal"
          onSubmit={(e) => {
            e.preventDefault();
            alert("Thanks!");
          }}
        >
          <input required placeholder="Your name" />
          <input type="email" required placeholder="Email" />
          <textarea placeholder="Message" />
          <div style={{ display: "flex", gap: 10 }}>
            <button className="btn btn-primary ripple" type="submit">
              Send
            </button>
            <a href="#about" className="btn ripple">
              Back to top
            </a>
          </div>
        </form>
        <div className="socials reveal">
          {["LinkedIn", "Google Scholar", "X", "Email"].map((s, i) => (
            <a key={i} href="#" aria-label={s}>
              {s}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
