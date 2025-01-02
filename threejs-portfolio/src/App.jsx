import React, { useState } from "react";
import Navbar from "./sections/Navbar.jsx";
import Hero from "./sections/Hero";
import Projects from "./sections/Projects";

const App = () => {
  const [animationName, setAnimationName] = useState("Slow"); // manage animation state

  // toggle animation state
  const toggleAnimation = () => {
    setAnimationName((prev) => (prev === "Slow" ? "Fast" : "Slow"));
    console.log("Animation toggled to:", animationName === "Slow" ? "Fast" : "Slow");
  };

  return (
    <>
      {/* Navbar */}
      <Navbar animationName={animationName} toggleAnimation={toggleAnimation} />

      {/* Hero Section */}
      <Hero animationName={animationName} />

      {/* Projects Section */}
      <Projects />
    </>
  );
};

export default App;
