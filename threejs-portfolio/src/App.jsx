import React, { useState, useRef, useEffect } from "react";
import Navbar from "./sections/Navbar.jsx";
import Hero from "./sections/Hero";
import Projects from "./sections/Projects";

const App = () => {
  const [animationName, setAnimationName] = useState("Slow"); // manage animation state
  const heroRef = useRef(null); // reference for the Hero section
  const projectsRef = useRef(null); // reference for the Projects section
  const [isHeroComplete, setIsHeroComplete] = useState(false); // track Hero animation completion

  // toggle animation state
  const toggleAnimation = () => {
    setAnimationName((prev) => (prev === "Slow" ? "Fast" : "Slow"));
    console.log("Animation toggled to:", animationName === "Slow" ? "Fast" : "Slow");
  };

  // Determine if Hero has completed its scroll animation
  useEffect(() => {
    const handleScroll = () => {
      if (heroRef.current) {
        const heroBottom = heroRef.current.getBoundingClientRect().bottom;
        setIsHeroComplete(heroBottom <= 0); // Set to true when Hero scrolls out
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Navbar with animation toggle */}
      <Navbar animationName={animationName} toggleAnimation={toggleAnimation} />

      {/* Hero Section */}
      <div ref={heroRef}>
        <Hero animationName={animationName} isHeroInView={!isHeroComplete} />
      </div>

      {/* Projects Section */}
      <div ref={projectsRef} className={`projects-section ${isHeroComplete ? "visible" : "hidden"}`}>
        <Projects />
      </div>
    </>
  );
};

export default App;
