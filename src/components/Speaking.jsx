import React from "react";
import { Mic, Users, BookOpen, Award } from "lucide-react";

export default function Speaking() {
  const events = [
    {
      title: "Keynote: Samaritans UK",
      topic: "Emotional Intelligence & Compassion",
      type: "Keynote",
      icon: Mic,
      description: "Exploring human-centered leadership in challenging times",
    },
    {
      title: "Future of Humanity Conference",
      topic: "Creative Switzerland 2025",
      type: "Featured Speaker",
      icon: Users,
      description: "Innovation ecosystems and sustainable development",
    },
    {
      title: "University Leadership Forums",
      topic: "Systems Thinking in Education",
      type: "Workshop Series",
      icon: BookOpen,
      description:
        "Transforming educational institutions through strategic thinking",
    },
    {
      title: "International Innovation Summit",
      topic: "Rural Innovation Strategies",
      type: "Panel Discussion",
      icon: Award,
      description: "Place-based approaches to regional development",
    },
  ];

  return (
    <section id="speaking" className="section-muted">
      <div className="container">
        <h2 className="slide-left">Speaking & Thought Leadership</h2>
        <p
          className="reveal"
          style={{ marginBottom: 32, color: "var(--text-soft)" }}
        >
          Sharing insights on leadership, innovation, and systems thinking at
          international venues
        </p>
        <div
          className="stack-16"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px,1fr))",
            gap: 20,
          }}
        >
          {events.map((event, i) => {
            const Icon = event.icon;
            return (
              <div className="card reveal" key={i}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    marginBottom: 12,
                  }}
                >
                  <div
                    style={{
                      padding: 8,
                      borderRadius: 8,
                      background:
                        "linear-gradient(135deg, var(--accent-orange), var(--accent-coral))",
                      display: "flex",
                    }}
                  >
                    <Icon size={18} color="white" />
                  </div>
                  <div
                    style={{
                      fontSize: 11,
                      fontWeight: 600,
                      color: "var(--accent-teal)",
                      textTransform: "uppercase",
                      letterSpacing: "0.5px",
                    }}
                  >
                    {event.type}
                  </div>
                </div>
                <h3
                  style={{
                    fontSize: 16,
                    marginBottom: 8,
                    color: "var(--text)",
                  }}
                >
                  {event.title}
                </h3>
                <div
                  style={{
                    fontSize: 14,
                    fontWeight: 600,
                    color: "var(--accent-orange)",
                    marginBottom: 8,
                  }}
                >
                  {event.topic}
                </div>
                <p
                  style={{
                    color: "var(--text-soft)",
                    fontSize: 13,
                    lineHeight: 1.5,
                  }}
                >
                  {event.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
