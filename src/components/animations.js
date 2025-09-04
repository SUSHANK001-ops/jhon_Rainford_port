import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Enhanced React scroll reveals with more animations
export function useScrollRevealsReact(React) {
  const { useEffect } = React;
  useEffect(() => {
    const ctx = gsap.context(() => {
      const isMobile = () =>
        typeof window !== "undefined" &&
        (window.matchMedia?.("(max-width: 768px)").matches ||
          ScrollTrigger.isTouch);

      // On mobile, trigger as soon as the element enters the viewport to avoid late reveals
      const startEarly = (desktop = "top 85%") =>
        isMobile() ? "top bottom" : desktop;

      const toggleMode = (
        desktop = "play none none reverse",
        mobile = "play none none none"
      ) => (isMobile() ? mobile : desktop);

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

          const alreadyInView = () => {
            const rect = el.getBoundingClientRect();
            const vh =
              window.innerHeight || document.documentElement.clientHeight;
            // Consider it visible if its top is within 90% of viewport height
            return rect.top <= vh * 0.9;
          };

          const startPos = startEarly("top 85%", "top 95%");
          const toggle = toggleMode(
            "play none none reverse",
            "play none none none"
          );

          const fromVars = {
            opacity: 0,
            x,
            y,
            scale,
            rotationX: el.classList.contains("card") ? 45 : 0,
          };
          const toVars = {
            opacity: 1,
            x: 0,
            y: 0,
            scale: 1,
            rotationX: 0,
            duration: el.classList.contains("card") ? 1 : 0.9,
            ease: "power2.out",
          };

          if (alreadyInView()) {
            // Animate immediately if already visible on load
            gsap.fromTo(el, fromVars, toVars);
          } else {
            gsap.fromTo(el, fromVars, {
              ...toVars,
              scrollTrigger: {
                trigger: el,
                start: startPos,
                toggleActions: toggle,
              },
            });
          }
        });

      // Text animation with typewriter effect
      gsap.utils.toArray("h1, h2, h3").forEach((heading) => {
        const text = heading.textContent;

        const alreadyInView = () => {
          const rect = heading.getBoundingClientRect();
          const vh =
            window.innerHeight || document.documentElement.clientHeight;
          return rect.top <= vh * 0.95; // very early threshold
        };

        const runTypewriter = () => {
          heading.textContent = "";
          let i = 0;
          const typeWriter = () => {
            if (i < text.length) {
              heading.textContent += text.charAt(i);
              i++;
              setTimeout(typeWriter, 45);
            }
          };
          typeWriter();
        };

        if (alreadyInView()) {
          // Immediate for headings already visible
          gsap.fromTo(
            heading,
            { opacity: 0, y: 20 },
            {
              opacity: 1,
              y: 0,
              duration: 0.5,
              ease: "power2.out",
              onComplete: runTypewriter,
            }
          );
        } else {
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
                start: startEarly("top 85%", "top 95%"),
                toggleActions: toggleMode(
                  "play none none reverse",
                  "play none none none"
                ),
                onEnter: runTypewriter,
              },
            }
          );
        }
      });

      // Enhanced parallax effects
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

      // Portfolio items with 3D flip effect
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
              start: startEarly("top 85%", "top 95%"),
              toggleActions: toggleMode(
                "play none none reverse",
                "play none none none"
              ),
            },
          }
        );

        // Add hover effect
        item.addEventListener("mouseenter", () => {
          gsap.to(item, {
            rotationY: 5,
            z: 50,
            duration: 0.3,
            ease: "power2.out",
          });
        });

        item.addEventListener("mouseleave", () => {
          gsap.to(item, {
            rotationY: 0,
            z: 0,
            duration: 0.3,
            ease: "power2.out",
          });
        });
      });

      // Timeline items with alternating slide animations
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
              start: startEarly("top 80%", "top 90%"),
              toggleActions: toggleMode(
                "play none none reverse",
                "play none none none"
              ),
            },
          }
        );
      });

      // Stats counter animation with bounce effect
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
              start: startEarly("top 80%", "top 90%"),
              toggleActions: toggleMode(
                "play none none none",
                "play none none none"
              ),
            },
          }
        );
      });

      // Enhanced magnetic hover effects for buttons
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

      // Contact items slide in effect with stagger
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
              start: startEarly("top 85%", "top 95%"),
              toggleActions: toggleMode(
                "play none none reverse",
                "play none none none"
              ),
            },
          }
        );
      });

      // Skills bars animation
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
              start: startEarly("top 85%", "top 95%"),
              toggleActions: toggleMode(
                "play none none reverse",
                "play none none none"
              ),
            },
          }
        );
      });

      // Floating elements
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

      // Section background animations
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
              start: startEarly("top 80%", "top 90%"),
              end: isMobile() ? "bottom 10%" : "bottom 20%",
              toggleActions: toggleMode(
                "play reverse play reverse",
                "play reverse play reverse"
              ),
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
