import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Enhanced React scroll reveals with more animations
export function useScrollRevealsReact(React) {
  const { useEffect } = React;
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Enhanced reveal animations with different effects
      gsap.utils
        .toArray(".reveal, .slide-left, .slide-right, .fade-in, .scale-in")
        .forEach((el) => {
          const x = el.classList.contains("slide-left")
            ? -50
            : el.classList.contains("slide-right")
            ? 50
            : 0;

          const scale = el.classList.contains("scale-in") ? 0.8 : 1;
          const y = el.classList.contains("fade-in") ? 30 : x === 0 ? 20 : 0;

          gsap.fromTo(
            el,
            {
              opacity: 0,
              x,
              y,
              scale,
              rotationX: el.classList.contains("card") ? 45 : 0,
            },
            {
              opacity: 1,
              x: 0,
              y: 0,
              scale: 1,
              rotationX: 0,
              duration: el.classList.contains("card") ? 1 : 0.9,
              ease: "power2.out",
              scrollTrigger: {
                trigger: el,
                start: "top 85%",
                toggleActions: "play none none reverse",
              },
            }
          );
        });

      // Advanced text animation with typewriter effect and morphing
      gsap.utils.toArray("h1, h2, h3").forEach((heading) => {
        const text = heading.textContent;
        heading.innerHTML = "";

        gsap.fromTo(
          heading,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power2.out",
            scrollTrigger: {
              trigger: heading,
              start: "top 85%",
              toggleActions: "play none none reverse",
              onEnter: () => {
                let i = 0;
                const typeWriter = () => {
                  if (i < text.length) {
                    heading.innerHTML += text.charAt(i);
                    i++;
                    setTimeout(typeWriter, 30);
                  }
                };
                typeWriter();
              },
            },
          }
        );
      });

      // Enhanced parallax effects with multiple layers
      gsap.utils.toArray("[data-parallax]").forEach((el) => {
        const strength = parseFloat(el.getAttribute("data-parallax") || "0.3");
        gsap.to(el, {
          yPercent: () => -strength * 30,
          ease: "none",
          scrollTrigger: {
            trigger: el.parentElement,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      });

      // Advanced portfolio items with 3D flip effect and stagger
      gsap.utils.toArray(".portfolio-item").forEach((item, index) => {
        gsap.fromTo(
          item,
          {
            y: 80,
            opacity: 0,
            scale: 0.9,
            rotationY: 15,
          },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            rotationY: 0,
            duration: 1,
            ease: "power3.out",
            delay: index * 0.15,
            scrollTrigger: {
              trigger: item,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );

        // Enhanced hover effect with morphing
        item.addEventListener("mouseenter", () => {
          gsap.to(item, {
            rotationY: 5,
            z: 50,
            scale: 1.02,
            duration: 0.3,
            ease: "power2.out",
          });
        });

        item.addEventListener("mouseleave", () => {
          gsap.to(item, {
            rotationY: 0,
            z: 0,
            scale: 1,
            duration: 0.3,
            ease: "power2.out",
          });
        });
      });

      // Timeline items with alternating slide animations and morphing
      gsap.utils.toArray(".timeline-item").forEach((item, index) => {
        const isOdd = index % 2 === 0;
        gsap.fromTo(
          item,
          {
            x: isOdd ? -120 : 120,
            opacity: 0,
            scale: 0.8,
            rotation: isOdd ? -5 : 5,
          },
          {
            x: 0,
            opacity: 1,
            scale: 1,
            rotation: 0,
            duration: 1.2,
            ease: "power2.out",
            scrollTrigger: {
              trigger: item,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });

      // Advanced stats counter animation with bounce effect and formatting
      gsap.utils.toArray(".stat-number").forEach((stat) => {
        const endValue = parseInt(stat.textContent) || 0;
        gsap.fromTo(
          stat,
          { textContent: 0, scale: 0.5 },
          {
            textContent: endValue,
            scale: 1,
            duration: 2.5,
            ease: "back.out(1.7)",
            snap: { textContent: 1 },
            scrollTrigger: {
              trigger: stat,
              start: "top 80%",
              toggleActions: "play none none none",
            },
          }
        );
      });

      // Enhanced magnetic hover effects for buttons with ripple
      gsap.utils.toArray(".btn").forEach((btn) => {
        // Add pulse animation
        gsap.to(btn, {
          scale: 1.02,
          duration: 2,
          ease: "power2.inOut",
          yoyo: true,
          repeat: -1,
          paused: true,
        });

        btn.addEventListener("mousemove", (e) => {
          const rect = btn.getBoundingClientRect();
          const x = e.clientX - rect.left - rect.width / 2;
          const y = e.clientY - rect.top - rect.height / 2;

          gsap.to(btn, {
            x: x * 0.3,
            y: y * 0.3,
            scale: 1.05,
            duration: 0.3,
            ease: "power2.out",
          });
        });

        btn.addEventListener("mouseleave", () => {
          gsap.to(btn, {
            x: 0,
            y: 0,
            scale: 1,
            duration: 0.5,
            ease: "elastic.out(1, 0.3)",
          });
        });
      });

      // Contact items slide in effect with stagger and morphing
      gsap.utils.toArray(".contact-item").forEach((item, index) => {
        gsap.fromTo(
          item,
          {
            x: -50,
            opacity: 0,
            rotationY: -15,
          },
          {
            x: 0,
            opacity: 1,
            rotationY: 0,
            duration: 0.8,
            delay: index * 0.1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: item,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });

      // Skills bars animation with gradient fill
      gsap.utils.toArray(".skill-bar").forEach((bar) => {
        const percentage = bar.getAttribute("data-percentage") || "0";
        gsap.fromTo(
          bar,
          { width: "0%" },
          {
            width: percentage + "%",
            duration: 1.5,
            ease: "power2.out",
            scrollTrigger: {
              trigger: bar,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });

      // Floating elements with random motion
      gsap.utils.toArray(".float").forEach((element) => {
        gsap.to(element, {
          y: -20,
          duration: 2 + Math.random() * 2,
          ease: "power2.inOut",
          yoyo: true,
          repeat: -1,
          delay: Math.random() * 2,
        });
      });

      // Section background animations with morphing
      gsap.utils.toArray("section").forEach((section, index) => {
        gsap.fromTo(
          section,
          {
            backgroundColor: "rgba(255,255,255,0)",
          },
          {
            backgroundColor:
              index % 2 === 0
                ? "rgba(248,250,252,0.5)"
                : "rgba(255,255,255,0.8)",
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: section,
              start: "top 80%",
              end: "bottom 20%",
              toggleActions: "play reverse play reverse",
            },
          }
        );
      });

      // Mouse follower effect
      const cursor = document.createElement("div");
      cursor.className = "custom-cursor";
      cursor.style.cssText = `
        position: fixed;
        width: 20px;
        height: 20px;
        background: radial-gradient(circle, rgba(249,115,22,0.8), rgba(6,182,212,0.6));
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        mix-blend-mode: difference;
        transform: translate(-50%, -50%);
      `;
      document.body.appendChild(cursor);

      document.addEventListener("mousemove", (e) => {
        gsap.to(cursor, {
          x: e.clientX,
          y: e.clientY,
          duration: 0.1,
          ease: "power2.out",
        });
      });
    });
    return () => ctx.revert();
  }, []);
}

// Enhanced button ripples with magnetic effect
export function useButtonRipplesReact(React) {
  const { useEffect } = React;
  useEffect(() => {
    const cleanup = [];

    // Ripple effect
    document.querySelectorAll(".btn.ripple").forEach((btn) => {
      const handler = (e) => {
        const rect = btn.getBoundingClientRect();
        const span = document.createElement("span");
        const size = Math.max(rect.width, rect.height);
        span.style.width = span.style.height = size + "px";
        span.style.left = e.clientX - rect.left - size / 2 + "px";
        span.style.top = e.clientY - rect.top - size / 2 + "px";
        span.className = "ripple-effect";
        btn.appendChild(span);

        gsap.fromTo(
          span,
          { scale: 0, opacity: 0.6 },
          {
            scale: 2,
            opacity: 0,
            duration: 0.8,
            ease: "power2.out",
            onComplete: () => span.remove(),
          }
        );
      };
      btn.addEventListener("pointerdown", handler);
      cleanup.push(() => btn.removeEventListener("pointerdown", handler));
    });

    // Hover scale effect
    document.querySelectorAll(".btn").forEach((btn) => {
      const enterHandler = () => {
        gsap.to(btn, {
          scale: 1.05,
          duration: 0.3,
          ease: "power2.out",
        });
      };

      const leaveHandler = () => {
        gsap.to(btn, {
          scale: 1,
          duration: 0.3,
          ease: "power2.out",
        });
      };

      btn.addEventListener("mouseenter", enterHandler);
      btn.addEventListener("mouseleave", leaveHandler);

      cleanup.push(() => {
        btn.removeEventListener("mouseenter", enterHandler);
        btn.removeEventListener("mouseleave", leaveHandler);
      });
    });

    return () => cleanup.forEach((fn) => fn());
  }, []);
}

// Enhanced scatter reform animation
export function scatterReform(containerRef, textRef) {
  const nodes = gsap.utils.toArray(".loader .icon");

  // More dramatic scatter effect
  gsap.set(nodes, {
    x: () => gsap.utils.random(-300, 300),
    y: () => gsap.utils.random(-200, 200),
    opacity: 0,
    scale: () => gsap.utils.random(0.5, 1.5),
    rotation: () => gsap.utils.random(-180, 180),
  });

  const tl = gsap.timeline();

  tl.to(nodes, {
    opacity: 1,
    duration: 0.8,
    stagger: 0.03,
    ease: "power2.out",
  })
    .to(nodes, {
      x: 0,
      y: 0,
      scale: 1,
      rotation: 0,
      duration: 1.5,
      ease: "power3.inOut",
      stagger: 0.02,
    })
    .fromTo(
      textRef.current,
      {
        clipPath: "inset(0 100% 0 0)",
        scale: 0.8,
        opacity: 0,
      },
      {
        clipPath: "inset(0 0% 0 0)",
        scale: 1,
        opacity: 1,
        duration: 1.2,
        ease: "power3.inOut",
      },
      "-=0.8"
    )
    .to(".loader", {
      autoAlpha: 0,
      scale: 0.9,
      duration: 0.8,
      ease: "power2.out",
      delay: 0.5,
    });

  return tl;
}

// Floating animation for hero elements
export function initFloatingAnimations() {
  gsap.to(".hero .avatar", {
    y: -15,
    duration: 3,
    ease: "power2.inOut",
    yoyo: true,
    repeat: -1,
  });

  gsap.to(".cosmic-particle", {
    y: -20,
    x: 10,
    duration: 4,
    ease: "power1.inOut",
    yoyo: true,
    repeat: -1,
    stagger: 0.5,
  });
}

// Text typing effect
export function typeWriter(element, text, speed = 50) {
  return new Promise((resolve) => {
    let i = 0;
    element.textContent = "";

    function type() {
      if (i < text.length) {
        element.textContent += text.charAt(i);
        i++;
        setTimeout(type, speed);
      } else {
        resolve();
      }
    }
    type();
  });
}

// Smooth scroll navigation
export function initSmoothScroll() {
  gsap.utils.toArray('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        gsap.to(window, {
          duration: 1.5,
          scrollTo: {
            y: target,
            offsetY: 80,
          },
          ease: "power2.inOut",
        });
      }
    });
  });
}

// Advanced morphing text animation
export function morphingTextAnimation() {
  gsap.utils.toArray(".morph-text").forEach((element) => {
    const originalText = element.textContent;
    const words = originalText.split(" ");

    element.innerHTML = words
      .map((word) => `<span class="morph-word">${word}</span>`)
      .join(" ");

    gsap.fromTo(
      ".morph-word",
      {
        opacity: 0,
        y: 20,
        rotationX: -90,
      },
      {
        opacity: 1,
        y: 0,
        rotationX: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: element,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      }
    );
  });
}

// Advanced card stacking animation
export function cardStackAnimation() {
  gsap.utils.toArray(".card-stack").forEach((stack) => {
    const cards = gsap.utils.toArray(".card-stack .card");

    cards.forEach((card, index) => {
      gsap.set(card, {
        zIndex: cards.length - index,
        y: index * 8,
        rotation: index * 2,
        scale: 1 - index * 0.05,
      });

      gsap.fromTo(
        card,
        {
          y: 100 + index * 20,
          opacity: 0,
          rotation: 15 + index * 5,
        },
        {
          y: index * 8,
          opacity: 1,
          rotation: index * 2,
          duration: 0.8,
          delay: index * 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: stack,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );
    });
  });
}

// Liquid button animation
export function liquidButtonAnimation() {
  gsap.utils.toArray(".liquid-btn").forEach((btn) => {
    const liquid = btn.querySelector(".liquid");
    if (!liquid) return;

    btn.addEventListener("mouseenter", () => {
      gsap.to(liquid, {
        scaleX: 1.2,
        scaleY: 0.8,
        duration: 0.4,
        ease: "power2.out",
      });
    });

    btn.addEventListener("mouseleave", () => {
      gsap.to(liquid, {
        scaleX: 1,
        scaleY: 1,
        duration: 0.4,
        ease: "power2.out",
      });
    });

    btn.addEventListener("click", () => {
      gsap.to(liquid, {
        scale: 0.9,
        duration: 0.1,
        yoyo: true,
        repeat: 1,
        ease: "power2.inOut",
      });
    });
  });
}

// Advanced particle system
export function particleSystemAnimation() {
  const particles = [];
  const particleCount = 50;

  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement("div");
    particle.className = "particle";
    particle.style.cssText = `
      position: absolute;
      width: ${Math.random() * 4 + 2}px;
      height: ${Math.random() * 4 + 2}px;
      background: radial-gradient(circle, rgba(249,115,22,${
        Math.random() * 0.8
      }), rgba(6,182,212,${Math.random() * 0.6}));
      border-radius: 50%;
      pointer-events: none;
      z-index: 1;
    `;

    document.body.appendChild(particle);
    particles.push(particle);

    gsap.set(particle, {
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      opacity: Math.random() * 0.8 + 0.2,
    });

    gsap.to(particle, {
      x: `+=${Math.random() * 200 - 100}`,
      y: `+=${Math.random() * 200 - 100}`,
      opacity: Math.random() * 0.5 + 0.1,
      duration: Math.random() * 10 + 5,
      ease: "none",
      repeat: -1,
      yoyo: true,
    });
  }

  return () => {
    particles.forEach((particle) => particle.remove());
  };
}

// Advanced timeline animation for complex sequences
export function complexTimelineAnimation() {
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: ".complex-section",
      start: "top center",
      end: "bottom center",
      scrub: 1,
    },
  });

  tl.fromTo(
    ".complex-section .title",
    { opacity: 0, scale: 0.5 },
    { opacity: 1, scale: 1, duration: 0.5 }
  )
    .fromTo(
      ".complex-section .subtitle",
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 0.5 },
      "-=0.3"
    )
    .fromTo(
      ".complex-section .content",
      { opacity: 0, x: -100 },
      { opacity: 1, x: 0, duration: 0.5 },
      "-=0.3"
    )
    .fromTo(
      ".complex-section .image",
      { opacity: 0, scale: 0.8, rotation: -10 },
      { opacity: 1, scale: 1, rotation: 0, duration: 0.5 },
      "-=0.3"
    );

  return tl;
}

// Magnetic elements animation
export function magneticElements() {
  gsap.utils.toArray(".magnetic").forEach((element) => {
    element.addEventListener("mousemove", (e) => {
      const rect = element.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      gsap.to(element, {
        x: x * 0.3,
        y: y * 0.3,
        duration: 0.3,
        ease: "power2.out",
      });
    });

    element.addEventListener("mouseleave", () => {
      gsap.to(element, {
        x: 0,
        y: 0,
        duration: 0.5,
        ease: "elastic.out(1, 0.3)",
      });
    });
  });
}

// Advanced reveal animations with clip-path
export function clipPathReveals() {
  gsap.utils.toArray(".clip-reveal").forEach((element) => {
    gsap.fromTo(
      element,
      {
        clipPath: "inset(0 100% 0 0)",
        opacity: 0,
      },
      {
        clipPath: "inset(0 0% 0 0)",
        opacity: 1,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: element,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      }
    );
  });
}

// Staggered grid animation
export function staggeredGridAnimation() {
  gsap.utils.toArray(".stagger-grid .grid-item").forEach((item, index) => {
    const row = Math.floor(index / 3);
    const col = index % 3;

    gsap.fromTo(
      item,
      {
        opacity: 0,
        scale: 0.8,
        rotationY: -45,
        x: col % 2 === 0 ? -50 : 50,
        y: 30,
      },
      {
        opacity: 1,
        scale: 1,
        rotationY: 0,
        x: 0,
        y: 0,
        duration: 0.8,
        delay: row * 0.2 + col * 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: item,
          start: "top 90%",
          toggleActions: "play none none reverse",
        },
      }
    );
  });
}

// Advanced hover effects with morphing
export function advancedHoverEffects() {
  gsap.utils.toArray(".advanced-hover").forEach((element) => {
    const overlay = element.querySelector(".hover-overlay");
    const content = element.querySelector(".hover-content");

    if (!overlay || !content) return;

    element.addEventListener("mouseenter", () => {
      gsap.to(overlay, {
        scale: 1,
        duration: 0.4,
        ease: "power2.out",
      });
      gsap.to(content, {
        y: 0,
        opacity: 1,
        duration: 0.3,
        delay: 0.1,
        ease: "power2.out",
      });
    });

    element.addEventListener("mouseleave", () => {
      gsap.to(overlay, {
        scale: 0,
        duration: 0.4,
        ease: "power2.out",
      });
      gsap.to(content, {
        y: 20,
        opacity: 0,
        duration: 0.3,
        ease: "power2.out",
      });
    });
  });
}

// Parallax layers animation
export function parallaxLayers() {
  gsap.utils.toArray(".parallax-layer").forEach((layer, index) => {
    const speed = (index + 1) * 0.5;

    gsap.to(layer, {
      yPercent: -speed * 50,
      ease: "none",
      scrollTrigger: {
        trigger: layer.parentElement,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    });
  });
}

// Text scramble effect
export function textScrambleAnimation() {
  gsap.utils.toArray(".scramble-text").forEach((element) => {
    const originalText = element.textContent;
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*";

    function scramble() {
      let scrambled = "";
      for (let i = 0; i < originalText.length; i++) {
        scrambled += chars[Math.floor(Math.random() * chars.length)];
      }
      element.textContent = scrambled;
    }

    gsap.fromTo(
      element,
      { opacity: 0 },
      {
        opacity: 1,
        duration: 0.5,
        scrollTrigger: {
          trigger: element,
          start: "top 85%",
          toggleActions: "play none none reverse",
          onEnter: () => {
            let iterations = 0;
            const maxIterations = 10;

            const interval = setInterval(() => {
              scramble();
              iterations++;

              if (iterations >= maxIterations) {
                clearInterval(interval);
                element.textContent = originalText;
              }
            }, 50);
          },
        },
      }
    );
  });
}
