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

  // Memoize media query check for better performance
  const prefersReducedMotion = useMemo(() => {
    if (typeof window === "undefined" || !window.matchMedia) return false;
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);

  // Reset name refs
  nameRefs.current = [];

  useButtonRipplesReact(React);

  const initialized = useRef(false);

  // Memoize name splitting for better performance
  const nameLetters = useMemo(() => ({
    john: "John".split(""),
    rainford: "Rainford".split("")
  }), []);

  const handleButtonClick = useCallback((action) => {
    switch (action) {
      case 'linkedin':
        window.open('https://linkedin.com/in/johnrainford', '_blank');
        break;
      case 'profile':
        document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
        break;
    }
  }, []);

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;

    const ctx = gsap.context(() => {
      // Enhanced initial states
      gsap.set([profileRef.current, buttonsRef.current, subtitleRef.current], {
        opacity: 0,
        y: 60,
      });

      gsap.set(badgeRef.current, {
        opacity: 0,
        y: -30,
        scale: 0.8,
      });

      gsap.set(nameRefs.current, { 
        opacity: 0, 
        y: 40, 
        rotateX: 45,
        transformOrigin: "center bottom"
      });

      gsap.set(keywordCardRef.current, {
        opacity: 0,
        scale: 0.7,
        rotationY: 25,
        transformOrigin: "center center"
      });

      // Enhanced entrance timeline
      const mainTl = gsap.timeline({ delay: 0.3 });

      // Badge entrance
      mainTl
        .to(badgeRef.current, {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: prefersReducedMotion ? 0.01 : 0.8,
          ease: "back.out(1.2)",
        })
        // Profile photo with enhanced animation
        .to(profileRef.current, {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: prefersReducedMotion ? 0.01 : 1.4,
          ease: "elastic.out(1, 0.5)",
        }, "-=0.3")
        // Name letters with improved stagger
        .to(
          nameRefs.current,
          {
            opacity: 1,
            y: 0,
            rotateX: 0,
            duration: prefersReducedMotion ? 0.01 : 0.8,
            ease: "back.out(1.5)",
            stagger: prefersReducedMotion ? 0 : 0.08,
          },
          "-=0.9"
        )
        // Subtitle
        .to(
          subtitleRef.current,
          {
            opacity: 1,
            y: 0,
            duration: prefersReducedMotion ? 0.01 : 0.6,
            ease: "power2.out",
          },
          "-=0.4"
        )
        // CTA buttons with enhanced stagger
        .to(
          buttonsRef.current.children,
          {
            opacity: 1,
            y: 0,
            duration: prefersReducedMotion ? 0.01 : 0.8,
            stagger: prefersReducedMotion ? 0 : 0.15,
            ease: "back.out(1.2)",
          },
          "-=0.3"
        )
        // Keyword card with enhanced entrance
        .to(
          keywordCardRef.current,
          {
            opacity: 1,
            scale: 1,
            rotationY: 0,
            duration: prefersReducedMotion ? 0.01 : 1,
            ease: "elastic.out(1, 0.6)",
          },
          "-=0.5"
        );

      // Add hover animations
      if (!prefersReducedMotion) {
        gsap.set(profileRef.current, { transformOrigin: "center center" });
        
        profileRef.current?.addEventListener('mouseenter', () => {
          gsap.to(profileRef.current, { scale: 1.05, duration: 0.3, ease: "power2.out" });
        });
        
        profileRef.current?.addEventListener('mouseleave', () => {
          gsap.to(profileRef.current, { scale: 1, duration: 0.3, ease: "power2.out" });
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
      {/* Enhanced background elements */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.05),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(16,185,129,0.05),transparent_50%)]" />
      
      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center min-h-[80vh] py-20 md:py-24">
          {/* Left Column - Enhanced Content */}
          <div className="space-y-8 lg:order-1 order-2">
            {/* Enhanced Badge */}
            <div 
              ref={badgeRef}
              className="inline-flex items-center px-5 py-3 bg-gradient-to-r from-emerald-500/10 via-cyan-500/10 to-blue-500/10 backdrop-blur-sm border border-emerald-400/20 rounded-full text-emerald-600 text-sm font-semibold tracking-wide shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <span className="w-2.5 h-2.5 bg-gradient-to-r from-emerald-400 to-cyan-400 rounded-full mr-3 animate-pulse shadow-lg shadow-emerald-400/50"></span>
              ✨ FRSA • FTLS • Innovation Leader
            </div>

            {/* Enhanced Main Heading */}
            <div ref={headingRef} className="space-y-4 select-none">
              <h1 className="text-5xl sm:text-6xl lg:text-8xl font-black leading-tight tracking-tight">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500 inline-block drop-shadow-sm">
                  {nameLetters.john.map((ch, i) => (
                    <span
                      key={`john-${i}`}
                      ref={(el) => (nameRefs.current[i] = el)}
                      className="inline-block will-change-transform hover:scale-110 transition-transform duration-200"
                    >
                      {ch}
                    </span>
                  ))}
                </span>
              </h1>
              <h1 className="text-5xl sm:text-6xl lg:text-8xl font-black leading-tight tracking-tight">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 via-cyan-300 to-blue-400 inline-block drop-shadow-sm">
                  {nameLetters.rainford.map((ch, i) => (
                    <span
                      key={`rain-${i}`}
                      ref={(el) => (nameRefs.current[nameLetters.john.length + i] = el)}
                      className="inline-block will-change-transform hover:scale-110 transition-transform duration-200"
                    >
                      {ch}
                    </span>
                  ))}
                </span>
              </h1>
            </div>

            {/* Enhanced Subtitle */}
            <div ref={subtitleRef} className="space-y-4">
              <p className="text-xl sm:text-2xl text-slate-600 font-medium leading-relaxed max-w-lg">
                Strategic Transformation & Innovation Leadership
              </p>
              <p className="text-lg text-slate-500 leading-relaxed max-w-xl">
                Driving digital transformation and sustainable innovation across global enterprises
              </p>
            </div>

            {/* Enhanced CTA Buttons */}
            <div ref={buttonsRef} className="flex flex-wrap gap-4">
              <button 
                onClick={() => handleButtonClick('linkedin')}
                className="group relative inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/30 focus:outline-none focus:ring-4 focus:ring-blue-400/30 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-cyan-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <svg className="w-5 h-5 mr-3 relative z-10" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z" clipRule="evenodd" />
                </svg>
                <span className="relative z-10">Connect on LinkedIn</span>
                <svg className="w-5 h-5 ml-3 transition-transform group-hover:translate-x-1 relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
              
              <button 
                onClick={() => handleButtonClick('profile')}
                className="group relative inline-flex items-center px-8 py-4 bg-gradient-to-r from-emerald-600 to-cyan-600 hover:from-emerald-700 hover:to-cyan-700 text-white font-bold rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-emerald-500/30 focus:outline-none focus:ring-4 focus:ring-emerald-400/30 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-400/20 to-cyan-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <svg className="w-5 h-5 mr-3 relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <span className="relative z-10">View Profile</span>
                <svg className="w-5 h-5 ml-3 transition-transform group-hover:translate-x-1 relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>

          {/* Right Column - Enhanced Profile Image */}
          <div className="flex justify-center lg:justify-end lg:order-2 order-1">
            <div ref={profileRef} className="relative cursor-pointer">
              <div className="relative w-64 h-80 sm:w-72 sm:h-[400px] lg:w-96 lg:h-[500px]">
                {/* Enhanced glow effect */}
                <div className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-emerald-400/20 via-cyan-400/20 to-blue-400/20 blur-2xl animate-pulse" />
                <div className="absolute -inset-2 rounded-2xl bg-gradient-to-br from-emerald-300/30 via-cyan-300/20 to-blue-300/30 blur-xl" />
                
                {/* Enhanced image container */}
                <div className="relative bg-white rounded-3xl p-2 shadow-2xl ring-1 ring-slate-200/50 backdrop-blur-sm">
                  <img
                    src="/john-rainford.png"
                    alt="John Rainford - Strategic Transformation & Innovation Leadership"
                    className="w-full h-full object-cover rounded-2xl shadow-lg"
                    loading="eager"
                  />
                  <div className="absolute inset-0 rounded-2xl bg-[radial-gradient(circle_at_65%_35%,rgba(0,0,0,0.03),transparent_70%)] pointer-events-none" />
                </div>

                {/* Enhanced Status Badge */}
                <div
                  ref={keywordCardRef}
                  className="absolute -bottom-8 -right-8 bg-white/95 backdrop-blur-lg border border-emerald-200/50 rounded-2xl p-6 shadow-2xl hover:shadow-3xl transition-shadow duration-300"
                >
                  <div className="flex items-center space-x-4">
                    <div className="relative">
                      <div className="w-4 h-4 bg-gradient-to-r from-emerald-400 to-cyan-400 rounded-full animate-pulse shadow-lg shadow-emerald-400/50"></div>
                      <div className="absolute inset-0 w-4 h-4 bg-gradient-to-r from-emerald-400 to-cyan-400 rounded-full animate-ping opacity-20"></div>
                    </div>
                    <div>
                      <p className="text-base font-bold text-slate-800 tracking-wide">
                        FRSA • FTLS
                      </p>
                      <p className="text-sm text-slate-600 font-medium">
                        Leadership Fellow
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
