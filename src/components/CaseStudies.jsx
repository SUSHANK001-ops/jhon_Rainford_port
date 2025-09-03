import React from "react";

export default function CaseStudies() {
  const items = [
    {
      title: "Empowering a Rural Cluster",
      result: "New venture pipeline and training programs",
      impact: "25% increase in local participation",
    },
    {
      title: "University Innovation Hub",
      result: "Systems mapping and portfolio approach",
      impact: "Faster proof-of-concept cycles",
    },
    {
      title: "Leadership for Growth",
      result: "Executive program and coaching",
      impact: "Improved decision velocity",
    },
  ];
  return (
    <section id="cases">
      <div className="container">
        <h2 className="slide-left">Selected Case Studies</h2>
        <div
          className="stack-16"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px,1fr))",
            gap: 16,
            marginTop: 12,
          }}
        >
          {items.map((c, i) => (
            <div className="card reveal" key={i}>
              <div style={{ fontWeight: 700 }}>{c.title}</div>
              <div style={{ color: "var(--muted)", marginTop: 6 }}>
                Outcome: {c.result}
              </div>
              <div style={{ color: "var(--muted)", marginTop: 6 }}>
                Impact: {c.impact}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
