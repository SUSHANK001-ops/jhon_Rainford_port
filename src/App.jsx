import React, { useState, useEffect } from "react";
import "./App.css";
import LoadingScreen from "./components/LoadingScreen.jsx";
import Loader from "./components/Loader.jsx";
import Hero from "./components/Hero.jsx";
import About from "./components/About.jsx";
import Experience from "./components/Experience.jsx";
import Portfolio from "./components/Portfolio.jsx";
import Publications from "./components/Publications.jsx";
import Speaking from "./components/Speaking.jsx";
import Skills from "./components/Skills.jsx";
import Testimonials from "./components/Testimonials.jsx";
import Contact from "./components/Contact.jsx";
import ScrollProgress from "./components/ScrollProgress.jsx";
import CosmicBackground from "./components/CosmicBackground.jsx";
import { useScrollRevealsReact } from "./components/animations";

export default function App() {
  const [loadingComplete, setLoadingComplete] = useState(false); // Start with false to show loading screen
  useScrollRevealsReact(React);

  // Auto complete loading after 3 seconds as fallback
  useEffect(() => {
    const fallbackTimer = setTimeout(() => {
      setLoadingComplete(true);
    }, 3000);

    return () => clearTimeout(fallbackTimer);
  }, []);

  // Temporarily disable loading screen to debug
  // if (!loadingComplete) {
  //   return <LoadingScreen onLoadingComplete={() => setLoadingComplete(true)} />;
  // }

  return (
    <>
      <CosmicBackground />
      <ScrollProgress />
      <Loader />
      <Hero />
      <About />
      <Experience />
      <Portfolio />
      {/* <Publications /> */}
      <Speaking />
      <Skills />
      <Testimonials />
      {/* <Contact /> */}
      <footer
        className="section-muted"
        style={{
          padding: "36px 0",
          textAlign: "center",
          color: "var(--muted)",
        }}
      >
        <div className="container">
          © {new Date().getFullYear()} John Rainford — All rights reserved.
        </div>
      </footer>
    </>
  );
}
