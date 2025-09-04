import React, { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

export default function Skills() {
  useEffect(() => {
    const ctx = gsap.context(() => {
      const items = gsap.utils.toArray("#skills .skill");
      gsap.set(items, {
        x: () => gsap.utils.random(-50, 50),
        y: () => gsap.utils.random(-30, 30),
        opacity: 0,
      });
      const isMobile = () =>
        typeof window !== "undefined" &&
        (window.matchMedia?.("(max-width: 768px)").matches ||
          ScrollTrigger.isTouch);

      ScrollTrigger.create({
        trigger: "#skills",
        start: isMobile() ? "top bottom" : "top 80%",
        toggleActions: isMobile()
          ? "play none none none"
          : "play none none reverse",
        once: true,
        onEnter: () => {
          gsap.to(items, {
            x: 0,
            y: 0,
            opacity: 1,
            duration: 0.9,
            stagger: 0.07,
            ease: "power3.out",
          });
        },
      });
    });
    return () => ctx.revert();
  }, []);
  return (
    <section id="skills">
      <div className="container">
        <h2 className="slide-left">Skills & Services</h2>
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
            ["Business Consulting", "Strategy, diagnostics, transformation"],
            ["Empowered Organizations", "Capability building, leadership"],
            ["Rural Innovation", "Ecosystems and place-based growth"],
            ["Education", "Program design and delivery"],
          ].map(([t, d], i) => (
            <div key={i} className="card skill">
              <div style={{ fontWeight: 700 }}>{t}</div>
              <div style={{ color: "var(--muted)", marginTop: 6 }}>{d}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
