import React, { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function CosmicBackground() {
  useEffect(() => {
    const orbs = [];
    const container = document.querySelector(".cosmic-container");
    if (!container) return;

    // Create floating cosmic orbs with bright theme colors
    for (let i = 0; i < 15; i++) {
      const orb = document.createElement("div");
      orb.className = "cosmic-orb";

      const size = gsap.utils.random(10, 30);
      const colors = [
        "rgba(255, 107, 53, 0.08)", // orange
        "rgba(0, 212, 170, 0.06)", // teal
        "rgba(139, 92, 246, 0.05)", // purple
        "rgba(251, 191, 36, 0.04)", // gold
      ];

      orb.style.cssText = `
        width: ${size}px;
        height: ${size}px;
        background: ${colors[i % colors.length]};
        border-radius: 50%;
        left: ${gsap.utils.random(0, 100)}%;
        top: ${gsap.utils.random(0, 100)}%;
        position: absolute;
        filter: blur(1px);
      `;

      container.appendChild(orb);
      orbs.push(orb);

      // Enhanced animation for each orb
      gsap.to(orb, {
        x: () => gsap.utils.random(-150, 150),
        y: () => gsap.utils.random(-150, 150),
        rotation: 360,
        scale: () => gsap.utils.random(0.5, 1.5),
        duration: gsap.utils.random(12, 20),
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      // Opacity animation
      gsap.to(orb, {
        opacity: () => gsap.utils.random(0.3, 0.8),
        duration: gsap.utils.random(3, 6),
        repeat: -1,
        yoyo: true,
        ease: "power2.inOut",
      });
    }

    // Create geometric shapes
    for (let i = 0; i < 8; i++) {
      const shape = document.createElement("div");
      shape.className = "cosmic-shape";

      const size = gsap.utils.random(20, 60);
      const isCircle = i % 2 === 0;

      shape.style.cssText = `
        width: ${size}px;
        height: ${size}px;
        background: linear-gradient(135deg, rgba(255,107,53,0.05), rgba(0,212,170,0.03));
        border-radius: ${isCircle ? "50%" : "10px"};
        left: ${gsap.utils.random(10, 90)}%;
        top: ${gsap.utils.random(10, 90)}%;
        position: absolute;
        border: 1px solid rgba(15, 23, 42, 0.05);
      `;

      container.appendChild(shape);
      orbs.push(shape);

      // Rotate and float
      gsap.to(shape, {
        rotation: isCircle ? 360 : 180,
        duration: gsap.utils.random(15, 25),
        repeat: -1,
        ease: "none",
      });

      gsap.to(shape, {
        y: () => gsap.utils.random(-30, 30),
        duration: gsap.utils.random(8, 12),
        repeat: -1,
        yoyo: true,
        ease: "power2.inOut",
      });
    }

    return () => {
      orbs.forEach((orb) => orb.remove());
    };
  }, []);

  return (
    <div
      className="cosmic-container"
      style={{
        position: "fixed",
        inset: 0,
        pointerEvents: "none",
        zIndex: -1,
        overflow: "hidden",
        background: `
        radial-gradient(circle at 20% 80%, rgba(255, 107, 53, 0.02) 0%, transparent 50%),
        radial-gradient(circle at 80% 20%, rgba(0, 212, 170, 0.02) 0%, transparent 50%),
        radial-gradient(circle at 40% 40%, rgba(139, 92, 246, 0.01) 0%, transparent 50%)
      `,
      }}
    >
      <div className="cosmic-bg" />
    </div>
  );
}
