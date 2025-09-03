import React, { useEffect, useState } from "react";
import { gsap } from "gsap";
import { User, Code, Briefcase, Mail, Star, Zap } from "lucide-react";

const LoadingScreen = ({ onLoadingComplete }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Quick progress animation
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + Math.random() * 25;
      });
    }, 100);

    // Complete loading after 1.5 seconds (faster)
    const timer = setTimeout(() => {
      clearInterval(progressInterval);
      setProgress(100);

      // Animate out the loading screen quickly
      gsap.to(".white-loader", {
        opacity: 0,
        scale: 1.05,
        duration: 0.4,
        ease: "power2.inOut",
        onComplete: () => {
          if (onLoadingComplete) {
            onLoadingComplete();
          }
        },
      });
    }, 1500);

    // Initial animations
    gsap
      .timeline()
      .from(".loading-icons .icon", {
        scale: 0,
        rotation: 180,
        duration: 0.6,
        stagger: 0.08,
        ease: "back.out(1.7)",
      })
      .from(
        ".loading-title",
        {
          y: 20,
          opacity: 0,
          duration: 0.4,
          ease: "power2.out",
        },
        "-=0.3"
      )
      .from(
        ".loading-bar-container",
        {
          scaleX: 0,
          duration: 0.3,
          ease: "power2.out",
        },
        "-=0.1"
      );

    return () => {
      clearInterval(progressInterval);
      clearTimeout(timer);
    };
  }, [onLoadingComplete]);

  return (
    <div className="white-loader">
      <div className="loading-content">
        <div className="loading-icons">
          <div className="icon">
            <User size={20} />
          </div>
          <div className="icon">
            <Code size={20} />
          </div>
          <div className="icon">
            <Briefcase size={20} />
          </div>
          <div className="icon">
            <Star size={20} />
          </div>
          <div className="icon">
            <Zap size={20} />
          </div>
          <div className="icon">
            <Mail size={20} />
          </div>
        </div>

        <h1 className="loading-title">John Rainford</h1>
        <p className="loading-subtitle">Loading Portfolio...</p>

        <div className="loading-bar-container">
          <div className="loading-bar" style={{ width: `${progress}%` }} />
        </div>
      </div>

      <style jsx>{`
        .white-loader {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 9999;
        }

        .loading-content {
          text-align: center;
          padding: 2rem;
        }

        .loading-icons {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.8rem;
          margin-bottom: 1.5rem;
        }

        .loading-icons .icon {
          width: 40px;
          height: 40px;
          background: linear-gradient(135deg, #2563eb, #3b82f6);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          box-shadow: 0 8px 20px rgba(37, 99, 235, 0.3);
        }

        .loading-title {
          font-size: 2rem;
          font-weight: 700;
          color: #1e293b;
          background: linear-gradient(135deg, #2563eb, #3b82f6);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin-bottom: 0.5rem;
        }

        .loading-subtitle {
          color: #64748b;
          font-size: 1rem;
          margin-bottom: 1.5rem;
        }

        .loading-bar-container {
          width: 250px;
          height: 3px;
          background: #e0f2fe;
          border-radius: 2px;
          overflow: hidden;
          margin: 0 auto;
        }

        .loading-bar {
          height: 100%;
          background: linear-gradient(135deg, #2563eb, #3b82f6);
          border-radius: 2px;
          transition: width 0.2s ease;
        }
      `}</style>
    </div>
  );
};

export default LoadingScreen;
