import React from "react";

export default function Testimonials() {
  const quotes = [
    [
      "A thoughtful strategist who brings clarity to complex systems.",
      "University Dean",
    ],
    [
      "John helps leaders see what matters and act with confidence.",
      "CEO, Growth Venture",
    ],
    [
      "A rare combination of educator, innovator, and advisor.",
      "Program Director",
    ],
  ];
  return (
    <section id="testimonials" className="section-muted">
      <div className="container">
        <h2 className="slide-left">Testimonials</h2>
        <div
          className="stack-16"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px,1fr))",
            gap: 16,
            marginTop: 12,
          }}
        >
          {quotes.map(([q, a], i) => (
            <div key={i} className="card reveal">
              <div style={{ fontStyle: "italic" }}>“{q}”</div>
              <div style={{ marginTop: 8, color: "var(--muted)" }}>— {a}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
