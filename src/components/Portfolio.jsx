import React from "react";

export default function Portfolio() {
  const projects = [
    {
      title: "Innovation Matrix Framework",
      category: "Strategic Framework",
      description:
        "Comprehensive systems approach to organizational innovation and capability building",
      impact: "Applied across 15+ organizations",
      tech: "Systems Thinking, Design Thinking",
    },
    {
      title: "Rural Innovation Ecosystem",
      category: "Regional Development",
      description:
        "Place-based innovation strategy connecting universities, communities, and enterprises",
      impact: "25% increase in local participation",
      tech: "Stakeholder Mapping, Ecosystem Design",
    },
    {
      title: "Leadership Excellence Program",
      category: "Education Design",
      description:
        "Executive development curriculum focusing on empowered decision-making",
      impact: "Improved decision velocity by 40%",
      tech: "Curriculum Design, Coaching Methods",
    },
    {
      title: "Systems Thinking Toolkit",
      category: "Methodology",
      description:
        "Practical tools and frameworks for complex problem solving in organizations",
      impact: "Adopted by 8 universities",
      tech: "Workshop Design, Facilitation",
    },
  ];

  return (
    <section id="portfolio">
      <div className="container">
        <h2 className="slide-left">Portfolio & Impact</h2>
        <p
          className="reveal"
          style={{ marginBottom: 32, color: "var(--text-soft)" }}
        >
          Selected projects and frameworks that demonstrate strategic innovation
          and measurable impact
        </p>
        <div
          className="stack-16"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px,1fr))",
            gap: 20,
          }}
        >
          {projects.map((project, i) => (
            <div
              className="card reveal"
              key={i}
              style={{ height: "fit-content" }}
            >
              <div
                style={{
                  fontSize: 12,
                  fontWeight: 600,
                  color: "var(--accent-orange)",
                  textTransform: "uppercase",
                  letterSpacing: "0.5px",
                  marginBottom: 8,
                }}
              >
                {project.category}
              </div>
              <h3
                style={{ fontSize: 18, marginBottom: 12, color: "var(--text)" }}
              >
                {project.title}
              </h3>
              <p
                style={{
                  color: "var(--text-soft)",
                  marginBottom: 12,
                  fontSize: 14,
                  lineHeight: 1.5,
                }}
              >
                {project.description}
              </p>
              <div style={{ marginBottom: 12 }}>
                <div
                  style={{
                    fontSize: 12,
                    color: "var(--accent-teal)",
                    fontWeight: 600,
                  }}
                >
                  Impact:
                </div>
                <div style={{ fontSize: 13, color: "var(--text-soft)" }}>
                  {project.impact}
                </div>
              </div>
              <div
                style={{
                  fontSize: 11,
                  color: "var(--muted)",
                  borderTop: "1px solid var(--border)",
                  paddingTop: 8,
                  marginTop: "auto",
                }}
              >
                {project.tech}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
