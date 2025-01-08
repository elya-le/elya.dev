import React, { useState } from "react";
import Navbar from "./sections/Navbar.jsx";
import Hero from "./sections/Hero";
import Projects from "./sections/Projects";
import About from "./sections/About";
import Contact from "./sections/Contact";

const App = () => {
  const [animationName, setAnimationName] = useState("Slow"); // manage animation state

  // toggle animation state
  const toggleAnimation = () => {
    setAnimationName((prev) => (prev === "Slow" ? "Fast" : "Slow"));
    console.log("Animation toggled to:", animationName === "Slow" ? "Fast" : "Slow");
  };

  return (
    <>
      <Navbar animationName={animationName} toggleAnimation={toggleAnimation} />
      <Hero animationName={animationName} />
      <About />
      <Projects />
      <Contact />
    </>
  );
};

export default App;
