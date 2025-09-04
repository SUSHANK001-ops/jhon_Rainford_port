import React, { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

export default function Experience() {
  useEffect(() => {
    const ctx = gsap.context(() => {
      const isMobile = () =>
        typeof window !== "undefined" &&
        (window.matchMedia?.("(max-width: 768px)").matches ||
          ScrollTrigger.isTouch);

      const startPos = isMobile() ? "top bottom" : "top 85%";

      gsap.utils.toArray("#experience .card").forEach((el) => {
        gsap.fromTo(
          el,
          { autoAlpha: 0, y: 18 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.6,
            ease: "power2.out",
            scrollTrigger: {
              trigger: el,
              start: startPos,
              toggleActions: isMobile()
                ? "play none none none"
                : "play none none reverse",
              once: true,
            },
          }
        );
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <section id="experience">
      <div className="container">
        <h2 className="slide-left">Experience & Achievements</h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "20px",
            marginTop: 32,
          }}
        >
          {[
            "Leadership Education",
            "University Partnerships",
            "Innovation Consulting",
            "Systems Thinking Workshops",
            "Board Advisory",
            "Rural Innovation",
            "Empowered Organizations",
          ].map((label, i) => (
            <div
              key={i}
              className="card"
              style={{ minHeight: 160, padding: "20px" }}
            >
              <div
                style={{
                  fontWeight: 700,
                  fontSize: "18px",
                  marginBottom: "8px",
                }}
              >
                {label}
              </div>
              <div style={{ color: "var(--muted)", marginTop: 6 }}>
                Selected engagements and outcomes.
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
