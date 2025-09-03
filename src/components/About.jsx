import React from "react";

export default function About() {
  return (
    <section id="about" className="">
      <div className="container">
        <div className="stack-24">
          <h2 className="slide-left">About John Rainford</h2>
          <div
            className="reveal"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: 24,
              alignItems: "start",
            }}
          >
            <div>
              <p className="slide-right">
                Fellow of the Royal Society of Arts (FRSA) and Fellow of the
                Teaching and Learning Society (FTLS), John brings over three
                decades of expertise in transforming organizations through
                strategic thinking and innovative leadership approaches.
              </p>
              <p className="slide-right">
                His work spans university partnerships, rural innovation
                ecosystems, and empowered organizational development, with a
                focus on unlocking hidden potential in complex systems.
              </p>
            </div>
            <div className="timeline">
              {[
                [
                  "Strategic Vision",
                  "Systems thinking for organizational transformation",
                ],
                [
                  "Innovation Leadership",
                  "Building capability and creative problem-solving",
                ],
                [
                  "Educational Excellence",
                  "Program design and leadership development",
                ],
                ["Sustainable Growth", "Long-term value creation and impact"],
              ].map(([t, d], i) => (
                <div className="timeline-item reveal" key={i}>
                  <div className="dot" />
                  <div>
                    <div className="card">
                      <strong>{t}</strong>
                      <div style={{ color: "", marginTop: 6 }}>
                        {d}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
