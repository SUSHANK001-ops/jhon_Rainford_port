import React from "react";

export default function Publications() {
  return (
    <section id="publications" className="section-muted">
      <div className="container">
        <h2 className="slide-left">Publications & Patents</h2>
        <p className="reveal">
          Featured frameworks: Innovation Matrix, Systems Thinking approaches,
          and more.
        </p>
        <div className="carousel" style={{ marginTop: 14 }}>
          {[
            "Innovation Matrix",
            "Systems Thinking",
            "Leadership Patterns",
            "Rural Futures",
            "Capability Building",
          ].map((t, i) => (
            <div
              key={i}
              className="book reveal"
              style={{ transformOrigin: "center" }}
            >
              {" "}
              {t}{" "}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
