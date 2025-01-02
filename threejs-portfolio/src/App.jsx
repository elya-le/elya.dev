import React, { useState } from "react";
import Navbar from "./sections/Navbar.jsx";
import Hero from "./sections/Hero";
import Projects from "./sections/Projects";

const App = () => {
  // manage animation state at the top level
  const [animationName, setAnimationName] = useState("Slow");

  // toggle between "Slow" and "Fast" animation
  const toggleAnimation = () => {
    setAnimationName((prev) => (prev === "Slow" ? "Fast" : "Slow"));
    console.log("Animation toggled to:", animationName === "Slow" ? "Fast" : "Slow");
  };

  return (
    <>
      {/* pass animation state and toggle function to Navbar and Hero */}
      <Navbar animationName={animationName} toggleAnimation={toggleAnimation} />
      <Hero animationName={animationName} />
      {/* scrollable content with higher z-index */}
      <section
        style={{
          height: "200vh",
          backgroundColor: "transparent",
          position: "relative", // ensures z-index applies
          zIndex: 10, // higher z-index to ensure it sits above other content
        }}
      >
        <h1
          style={{
            color: "white",
            textAlign: "left",
            paddingTop: "160vh",
          }}
        >
          <Projects /> {/* include Projects section */}
      
        </h1>
      </section>
    </>
  );
};

export default App;
