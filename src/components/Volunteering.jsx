import React from "react";

export default function Volunteering() {
  return (
    <section id="volunteering" className="section-muted">
      <div className="container">
        <h2 className="slide-left">Volunteering & Causes</h2>
        <div
          className="stack-16"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px,1fr))",
            gap: 16,
            marginTop: 12,
          }}
        >
          {[
            ["Education", "Scholarship & mentorship"],
            ["Health", "Community wellbeing"],
            ["Empowerment", "Inclusive opportunities"],
          ].map(([t, d], i) => (
            <div key={i} className="card reveal">
              <div style={{ fontWeight: 700 }}>{t}</div>
              <div style={{ color: "var(--muted)", marginTop: 6 }}>{d}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
