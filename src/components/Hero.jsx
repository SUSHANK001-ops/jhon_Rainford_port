import React, { useEffect, useRef, useCallback, useMemo } from "react";
import { useButtonRipplesReact } from "./animations";
import { gsap } from "gsap";

export default function Hero() {
  const heroRef = useRef(null);
  const profileRef = useRef(null);
  const headingRef = useRef(null);
  const buttonsRef = useRef(null);
  const keywordCardRef = useRef(null);
  const nameRefs = useRef([]);
  const subtitleRef = useRef(null);
  const badgeRef = useRef(null);
  const backgroundRef = useRef(null);
  const particlesRef = useRef([]);
  const glowRef = useRef(null);
  const floatingElementsRef = useRef([]);
  const morphingShapeRef = useRef(null);
  const textGlowRef = useRef(null);

  const prefersReducedMotion = useMemo(() => {
    if (typeof window === "undefined" || !window.matchMedia) return false;
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);

  nameRefs.current = [];
  particlesRef.current = [];
  floatingElementsRef.current = [];

  useButtonRipplesReact(React);

  const initialized = useRef(false);

  const nameLetters = useMemo(() => ({
    john: "John".split(""),
    rainford: "Rainford".split("")
  }), []);

  const handleButtonClick = useCallback((action) => {
    if (!prefersReducedMotion) {
      // Enhanced ripple effect with multiple layers
      gsap.timeline()
        .to(buttonsRef.current.children, {
          scale: 0.92,
          duration: 0.1,
          ease: "power2.out"
        })
        .to(buttonsRef.current.children, {
          scale: 1.05,
          duration: 0.2,
          ease: "elastic.out(1.5, 0.3)"
        })
        .to(buttonsRef.current.children, {
          scale: 1,
          duration: 0.3,
          ease: "power2.out"
        });
    }

    switch (action) {
      case 'linkedin':
        window.open('https://www.linkedin.com/in/john-rainford-012753?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app', '_blank');
        break;
      case 'profile':
        document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
        break;
    }
  }, [prefersReducedMotion]);

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;

    const ctx = gsap.context(() => {
      // Enhanced initial states with more dramatic positioning
      gsap.set([profileRef.current, buttonsRef.current, subtitleRef.current], {
        opacity: 0,
        y: 120,
        scale: 0.6,
        rotation: 5,
      });

      gsap.set(badgeRef.current, {
        opacity: 0,
        y: -80,
        scale: 0.4,
        rotation: -20,
        transformOrigin: "center center"
      });

      gsap.set(nameRefs.current, { 
        opacity: 0, 
        y: 100, 
        rotateX: 120,
        rotateY: 15,
        scale: 0.6,
        transformOrigin: "center bottom",
        filter: "blur(10px)"
      });

      gsap.set(keywordCardRef.current, {
        opacity: 0,
        scale: 0.3,
        rotationY: 90,
        rotationX: 45,
        x: 100,
        y: 50,
        transformOrigin: "center center"
      });

      gsap.set(textGlowRef.current, {
        opacity: 0,
        scale: 0.8
      });

      // Advanced floating animations for background elements
      if (!prefersReducedMotion) {
        // Morphing background shapes
        gsap.to(morphingShapeRef.current, {
          rotation: 360,
          duration: 20,
          repeat: -1,
          ease: "none"
        });

        // Complex floating patterns
        gsap.to(backgroundRef.current?.children || [], {
          y: (i) => `random(${-30 - i * 5}, ${30 + i * 5})`,
          x: (i) => `random(${-25 - i * 3}, ${25 + i * 3})`,
          rotation: (i) => `random(${-15 - i * 2}, ${15 + i * 2})`,
          scale: (i) => `random(0.8, ${1.2 + i * 0.1})`,
          duration: (i) => `random(${4 + i}, ${8 + i})`,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          stagger: {
            each: 0.3,
            from: "random"
          }
        });

        // Pulsating glow with color shifts
        gsap.timeline({ repeat: -1 })
          .to(glowRef.current, {
            scale: 1.3,
            opacity: 0.9,
            duration: 3,
            ease: "sine.inOut"
          })
          .to(glowRef.current, {
            scale: 0.9,
            opacity: 0.6,
            duration: 3,
            ease: "sine.inOut"
          });

        // Text glow effect
        gsap.timeline({ repeat: -1, yoyo: true })
          .to(textGlowRef.current, {
            opacity: 1,
            scale: 1.02,
            duration: 2,
            ease: "sine.inOut"
          });
      }

      // Master entrance timeline with advanced sequencing
      const masterTl = gsap.timeline({ delay: 0.5 });

      masterTl
        // Dramatic badge entrance with multiple effects
        .to(badgeRef.current, {
          opacity: 1,
          y: 0,
          scale: 1,
          rotation: 0,
          duration: prefersReducedMotion ? 0.01 : 2,
          ease: "elastic.out(1.8, 0.4)",
        })
        .to(badgeRef.current, {
          rotationY: 360,
          duration: prefersReducedMotion ? 0 : 1,
          ease: "power2.inOut"
        }, "-=1")
        
        // Profile with magnetic field effect
        .to(profileRef.current, {
          opacity: 1,
          y: 0,
          scale: 1,
          rotation: 0,
          duration: prefersReducedMotion ? 0.01 : 2.5,
          ease: "elastic.out(1.5, 0.3)",
        }, "-=1.5")
        
        // Name letters with wave and blur effects
        .to(nameRefs.current, {
          opacity: 1,
          y: 0,
          rotateX: 0,
          rotateY: 0,
          scale: 1,
          filter: "blur(0px)",
          duration: prefersReducedMotion ? 0.01 : 1.5,
          ease: "back.out(2.5)",
          stagger: {
            each: prefersReducedMotion ? 0 : 0.15,
            from: "start"
          },
        }, "-=2")
        
        // Text glow reveal
        .to(textGlowRef.current, {
          opacity: 1,
          scale: 1,
          duration: prefersReducedMotion ? 0.01 : 1,
          ease: "power3.out"
        }, "-=1")
        
        // Subtitle with typewriter effect and bounce
        .to(subtitleRef.current, {
          opacity: 1,
          y: 0,
          scale: 1,
          rotation: 0,
          duration: prefersReducedMotion ? 0.01 : 1.2,
          ease: "back.out(1.7)",
        }, "-=0.8")
        
        // Buttons with magnetic attraction effect
        .to(buttonsRef.current.children, {
          opacity: 1,
          y: 0,
          scale: 1,
          rotation: 0,
          duration: prefersReducedMotion ? 0.01 : 1.5,
          stagger: {
            each: prefersReducedMotion ? 0 : 0.25,
            from: "start"
          },
          ease: "elastic.out(1.8, 0.4)",
        }, "-=0.6")
        
        // Keyword card with complex 3D flip
        .to(keywordCardRef.current, {
          opacity: 1,
          scale: 1,
          rotationY: 0,
          rotationX: 0,
          x: 0,
          y: 0,
          duration: prefersReducedMotion ? 0.01 : 2,
          ease: "back.out(2)",
        }, "-=1");

      // Advanced hover animations with physics
      if (!prefersReducedMotion) {
        // Profile image with magnetic field
        profileRef.current?.addEventListener('mouseenter', () => {
          gsap.timeline()
            .to(profileRef.current, { 
              scale: 1.12, 
              rotationY: 8,
              rotationX: 3,
              z: 50,
              duration: 0.6, 
              ease: "power3.out" 
            })
            .to(keywordCardRef.current, { 
              scale: 1.08, 
              rotationY: -5,
              y: -10,
              duration: 0.6, 
              ease: "power3.out" 
            }, 0)
            .to(glowRef.current, {
              scale: 1.4,
              opacity: 1,
              duration: 0.6,
              ease: "power3.out"
            }, 0);
        });
        
        profileRef.current?.addEventListener('mouseleave', () => {
          gsap.timeline()
            .to(profileRef.current, { 
              scale: 1, 
              rotationY: 0,
              rotationX: 0,
              z: 0,
              duration: 0.8, 
              ease: "elastic.out(1.2, 0.3)" 
            })
            .to(keywordCardRef.current, { 
              scale: 1, 
              rotationY: 0,
              y: 0,
              duration: 0.8, 
              ease: "elastic.out(1.2, 0.3)" 
            }, 0)
            .to(glowRef.current, {
              scale: 1.1,
              opacity: 0.8,
              duration: 0.8,
              ease: "power3.out"
            }, 0);
        });

        // Enhanced name letter interactions
        nameRefs.current.forEach((letter, i) => {
          if (letter) {
            letter.addEventListener('mouseenter', () => {
              gsap.timeline()
                .to(letter, {
                  scale: 1.4,
                  y: -20,
                  rotationZ: gsap.utils.random(-15, 15),
                  color: "#10b981",
                  textShadow: "0 0 30px rgba(16, 185, 129, 0.8)",
                  duration: 0.4,
                  ease: "back.out(2)"
                })
                .to(nameRefs.current.filter((_, idx) => Math.abs(idx - i) <= 1 && idx !== i), {
                  scale: 1.1,
                  y: -5,
                  duration: 0.3,
                  ease: "power2.out"
                }, 0);
            });
            
            letter.addEventListener('mouseleave', () => {
              gsap.to([letter, ...nameRefs.current.filter((_, idx) => Math.abs(idx - i) <= 1 && idx !== i)], {
                scale: 1,
                y: 0,
                rotationZ: 0,
                textShadow: "none",
                duration: 0.6,
                ease: "elastic.out(1.2, 0.3)"
              });
            });
          }
        });

        // Enhanced button hover with ripple effects
        Array.from(buttonsRef.current?.children || []).forEach(button => {
          button.addEventListener('mouseenter', () => {
            gsap.timeline()
              .to(button, {
                scale: 1.12,
                y: -5,
                rotationY: 5,
                duration: 0.4,
                ease: "power3.out"
              })
              .to(button.querySelector('.ripple-effect'), {
                scale: 1.5,
                opacity: 0.3,
                duration: 0.6,
                ease: "power2.out"
              }, 0);
          });
          
          button.addEventListener('mouseleave', () => {
            gsap.timeline()
              .to(button, {
                scale: 1,
                y: 0,
                rotationY: 0,
                duration: 0.5,
                ease: "elastic.out(1.2, 0.3)"
              })
              .to(button.querySelector('.ripple-effect'), {
                scale: 1,
                opacity: 0,
                duration: 0.4,
                ease: "power2.out"
              }, 0);
          });
        });
      }
    }, heroRef);

    return () => ctx.revert();
  }, [prefersReducedMotion, nameLetters]);

  return (
    <div
      ref={heroRef}
      className="relative min-h-screen overflow-hidden flex items-center bg-gradient-to-br from-slate-50 via-white to-blue-50/30"
      aria-label="Hero section introducing John Rainford"
    >
      {/* Advanced animated background elements */}
      <div ref={backgroundRef} className="absolute inset-0 pointer-events-none">
        {/* Morphing geometric shapes */}
        <div ref={morphingShapeRef} className="absolute top-1/4 left-1/4 w-64 h-64 opacity-20">
          <div className="w-full h-full bg-gradient-to-br from-blue-400/30 via-purple-400/30 to-pink-400/30 rounded-[30%_70%_70%_30%/30%_30%_70%_70%] blur-3xl animate-pulse" />
        </div>
        
        {/* Floating orbs with enhanced effects */}
        <div ref={(el) => floatingElementsRef.current[0] = el} className="absolute top-20 left-10 w-40 h-40 bg-gradient-to-br from-blue-400/15 via-cyan-400/15 to-emerald-400/15 rounded-full blur-2xl" />
        <div ref={(el) => floatingElementsRef.current[1] = el} className="absolute top-40 right-20 w-32 h-32 bg-gradient-to-br from-emerald-400/15 via-teal-400/15 to-cyan-400/15 rounded-full blur-xl" />
        <div ref={(el) => floatingElementsRef.current[2] = el} className="absolute bottom-32 left-32 w-56 h-56 bg-gradient-to-br from-yellow-400/15 via-orange-400/15 to-red-400/15 rounded-full blur-3xl" />
        <div ref={(el) => floatingElementsRef.current[3] = el} className="absolute bottom-20 right-40 w-36 h-36 bg-gradient-to-br from-pink-400/15 via-rose-400/15 to-purple-400/15 rounded-full blur-2xl" />
        <div ref={(el) => floatingElementsRef.current[4] = el} className="absolute top-1/2 left-1/3 w-24 h-24 bg-gradient-to-br from-indigo-400/20 via-purple-400/20 to-pink-400/20 rounded-full blur-xl" />
        
        {/* Animated grid pattern */}
        <div className="absolute inset-0 opacity-[0.02]" style={{
          backgroundImage: `radial-gradient(circle at 25% 25%, #10b981 2px, transparent 2px),
                           radial-gradient(circle at 75% 75%, #3b82f6 2px, transparent 2px)`,
          backgroundSize: '50px 50px',
          backgroundPosition: '0 0, 25px 25px'
        }} />
      </div>

      {/* Enhanced gradient overlays with animation */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.12),transparent_70%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(16,185,129,0.12),transparent_70%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(168,85,247,0.08),transparent_60%)]" />
      
      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center min-h-[80vh] py-20 md:py-24">
          {/* Left Column */}
          <div className="space-y-8 lg:order-1 order-2">
            {/* Enhanced Animated Badge */}
            <div 
              ref={badgeRef}
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-emerald-500/20 via-cyan-500/20 to-blue-500/20 backdrop-blur-2xl border border-emerald-400/40 rounded-2xl text-emerald-600 text-sm font-bold tracking-wide shadow-2xl hover:shadow-3xl transition-all duration-700 cursor-pointer group relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-400/0 via-cyan-400/10 to-blue-400/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <span className="w-4 h-4 bg-gradient-to-r from-emerald-400 to-cyan-400 rounded-full mr-4 shadow-lg shadow-emerald-400/60 relative z-10">
                <span className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-cyan-400 rounded-full animate-ping opacity-40" />
              </span>
              <span className="relative z-10 bg-gradient-to-r from-emerald-600 to-cyan-600 bg-clip-text text-transparent">
                ✨ FRSA • FTLS • Innovation Leader
              </span>
            </div>

            {/* Enhanced Main Heading with glow effect */}
            <div ref={headingRef} className="space-y-6 select-none relative">
              <div ref={textGlowRef} className="absolute inset-0 blur-3xl opacity-30 bg-gradient-to-r from-amber-400 via-emerald-400 to-cyan-400 rounded-3xl" />
              <h1 className="text-6xl sm:text-7xl lg:text-9xl font-black leading-none tracking-tighter relative z-10">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500 inline-block drop-shadow-2xl filter">
                  {nameLetters.john.map((ch, i) => (
                    <span
                      key={`john-${i}`}
                      ref={(el) => (nameRefs.current[i] = el)}
                      className="inline-block will-change-transform cursor-pointer transition-all duration-500 hover:text-emerald-400 relative"
                      style={{ 
                        textShadow: '0 0 40px rgba(251, 191, 36, 0.6), 0 0 80px rgba(251, 191, 36, 0.3)',
                        filter: 'drop-shadow(0 10px 20px rgba(251, 191, 36, 0.3))'
                      }}
                    >
                      {ch}
                    </span>
                  ))}
                </span>
              </h1>
              <h1 className="text-6xl sm:text-7xl lg:text-9xl font-black leading-none tracking-tighter relative z-10">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 via-cyan-300 to-blue-400 inline-block drop-shadow-2xl filter">
                  {nameLetters.rainford.map((ch, i) => (
                    <span
                      key={`rain-${i}`}
                      ref={(el) => (nameRefs.current[nameLetters.john.length + i] = el)}
                      className="inline-block will-change-transform cursor-pointer transition-all duration-500 hover:text-amber-400 relative"
                      style={{ 
                        textShadow: '0 0 40px rgba(16, 185, 129, 0.6), 0 0 80px rgba(16, 185, 129, 0.3)',
                        filter: 'drop-shadow(0 10px 20px rgba(16, 185, 129, 0.3))'
                      }}
                    >
                      {ch}
                    </span>
                  ))}
                </span>
              </h1>
            </div>

            {/* Enhanced Subtitle */}
            <div ref={subtitleRef} className="space-y-6">
              <p className="text-2xl sm:text-3xl text-slate-700 font-bold leading-relaxed max-w-lg bg-gradient-to-r from-slate-700 via-slate-600 to-slate-700 bg-clip-text text-transparent drop-shadow-lg">
                Strategic Transformation & Innovation Leadership
              </p>
              <p className="text-xl text-slate-500 leading-relaxed max-w-xl font-medium">
                Driving digital transformation and sustainable innovation across global enterprises with cutting-edge solutions
              </p>
            </div>

            {/* Enhanced CTA Buttons with advanced effects */}
            <div ref={buttonsRef} className="flex flex-wrap gap-6">
              <button 
                onClick={() => handleButtonClick('linkedin')}
                className="group relative inline-flex items-center px-10 py-5 bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 hover:from-blue-700 hover:via-blue-800 hover:to-blue-900 text-white font-bold rounded-2xl transition-all duration-700 focus:outline-none focus:ring-4 focus:ring-blue-400/40 overflow-hidden shadow-2xl hover:shadow-3xl transform-gpu"
              >
                <div className="ripple-effect absolute inset-0 bg-gradient-to-r from-blue-400/0 via-white/20 to-blue-400/0 -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1200" />
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-cyan-400/10 to-blue-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <svg className="w-6 h-6 mr-4 relative z-10 group-hover:rotate-12 transition-transform duration-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z" clipRule="evenodd" />
                </svg>
                <span className="relative z-10 text-lg">Connect on LinkedIn</span>
                <svg className="w-6 h-6 ml-4 transition-transform group-hover:translate-x-3 group-hover:scale-125 relative z-10 duration-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
              
              <button 
                onClick={() => handleButtonClick('profile')}
                className="group relative inline-flex items-center px-10 py-5 bg-gradient-to-r from-emerald-600 via-emerald-700 to-cyan-700 hover:from-emerald-700 hover:via-cyan-700 hover:to-cyan-800 text-white font-bold rounded-2xl transition-all duration-700 focus:outline-none focus:ring-4 focus:ring-emerald-400/40 overflow-hidden shadow-2xl hover:shadow-3xl transform-gpu"
              >
                <div className="ripple-effect absolute inset-0 bg-gradient-to-r from-emerald-400/0 via-white/20 to-cyan-400/0 -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1200" />
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/0 via-teal-400/10 to-cyan-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <svg className="w-6 h-6 mr-4 relative z-10 group-hover:rotate-12 transition-transform duration-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <span className="relative z-10 text-lg">View Profile</span>
                <svg className="w-6 h-6 ml-4 transition-transform group-hover:translate-x-3 group-hover:scale-125 relative z-10 duration-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>

          {/* Right Column - Enhanced Profile Image with advanced 3D effects */}
          <div className="flex justify-center lg:justify-end lg:order-2 order-1">
            <div ref={profileRef} className="relative cursor-pointer group perspective-1000">
              <div className="relative w-72 h-96 sm:w-80 sm:h-[450px] lg:w-[420px] lg:h-[550px]">
                {/* Enhanced multi-layer glow with color shifting */}
                <div ref={glowRef} className="absolute -inset-8 rounded-[3rem] bg-gradient-to-br from-emerald-400/40 via-cyan-400/40 to-blue-400/40 blur-[40px] group-hover:blur-[30px] transition-all duration-700" />
                <div className="absolute -inset-6 rounded-[2.5rem] bg-gradient-to-br from-emerald-300/50 via-cyan-300/40 to-blue-300/50 blur-[30px] group-hover:scale-115 transition-transform duration-700" />
                <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-br from-emerald-200/60 via-cyan-200/50 to-blue-200/60 blur-[20px] group-hover:blur-[15px] transition-all duration-700" />
                <div className="absolute -inset-2 rounded-[1.5rem] bg-gradient-to-br from-white/30 via-emerald-100/20 to-cyan-100/30 blur-[10px] group-hover:scale-105 transition-transform duration-700" />
                
                {/* Enhanced image container with 3D transform */}
                <div className="relative bg-white/98 backdrop-blur-xl rounded-[2.5rem] p-3 shadow-[0_25px_60px_-5px_rgba(0,0,0,0.3)] ring-1 ring-white/60 group-hover:ring-emerald-200/60 transition-all duration-700 group-hover:shadow-[0_35px_80px_-5px_rgba(16,185,129,0.4)] transform-gpu">
                  <img
                    src="/john-rainford.png"
                    alt="John Rainford - Strategic Transformation & Innovation Leadership"
                    className="w-full h-full object-cover rounded-[2rem] shadow-2xl group-hover:shadow-3xl transition-shadow duration-700"
                    loading="eager"
                  />
                  <div className="absolute inset-0 rounded-[2rem] bg-[radial-gradient(circle_at_65%_35%,rgba(0,0,0,0.04),transparent_70%)] pointer-events-none group-hover:bg-[radial-gradient(circle_at_65%_35%,rgba(16,185,129,0.08),transparent_70%)] transition-all duration-700" />
                  
                  {/* Shimmer effect */}
                  <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000 ease-in-out" />
                </div>

                {/* Enhanced Floating Status Badge with 3D effect */}
                <div
                  ref={keywordCardRef}
                  className="absolute -bottom-10 -right-10 bg-white/98 backdrop-blur-2xl border border-emerald-200/70 rounded-3xl p-8 shadow-[0_20px_40px_-5px_rgba(0,0,0,0.3)] hover:shadow-[0_30px_60px_-5px_rgba(16,185,129,0.4)] transition-all duration-700 cursor-pointer group-hover:scale-110 hover:border-emerald-300/90 transform-gpu"
                >
                  <div className="flex items-center space-x-5">
                    <div className="relative">
                      <div className="w-5 h-5 bg-gradient-to-r from-emerald-400 to-cyan-400 rounded-full shadow-2xl shadow-emerald-400/60">
                        <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-cyan-400 rounded-full animate-ping opacity-40" />
                        <div className="absolute -inset-1 bg-gradient-to-r from-emerald-400/30 to-cyan-400/30 rounded-full animate-pulse" />
                        <div className="absolute -inset-3 bg-gradient-to-r from-emerald-400/20 to-cyan-400/20 rounded-full animate-pulse delay-300" />
                      </div>
                    </div>
                    <div>
                      <p className="text-lg font-black text-slate-800 tracking-wide bg-gradient-to-r from-emerald-600 to-cyan-600 bg-clip-text text-transparent drop-shadow-lg">
                        FRSA • FTLS
                      </p>
                      <p className="text-base text-slate-600 font-bold">
                        Leadership Fellow
                      </p>
                    </div>
                  </div>
                  
                  {/* Badge shimmer effect */}
                  <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-transparent via-emerald-100/20 to-transparent -skew-x-12 translate-x-[-200%] hover:translate-x-[200%] transition-transform duration-1200 ease-in-out" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
