import React, { useState, useEffect } from "react";

const About = () => {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth); // state to track screen width

  // update screen width on resize
  useEffect(() => {
    const handleResize = () => setScreenWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize); // clean up event listener
  }, []);

  // dynamically calculate dimensions based on screen size
  const getResponsiveDimensions = () => {
    if (screenWidth > 1024) {
      return { height: "450px", width: "100%" }; // fullscreen
    } else if (screenWidth > 768) {
      return { height: "450px", width: "800px" }; // tablet
    } else {
      return { height: "700px", width: "99%" }; // mobile
    }
  };

  const responsiveDimensions = getResponsiveDimensions();

  return (
    <section
      id="about"
      className="about-section w-full text-white flex justify-center items-center px-4 py-2"
      style={{
        backgroundColor: "#1A1C21", // unified background color
      }}
    >
      <div
        className="max-w-4xl w-full flex flex-col lg:flex-row gap-4"
        style={{
          height: responsiveDimensions.height,
          width: responsiveDimensions.width,
        }}
      >
        {/* First Container */}
        <div
          className="flex-1 p-5"
          style={{
            backgroundColor: "#23272F", // specific background color for the container
          }}
        >
          <p className="text-lg">
            {/* Placeholder text */}
          </p>
        </div>

        {/* Second Container */}
        <div
          className="flex-1 p-5"
          style={{
            backgroundColor: "#23272F", // specific background color for the container
          }}
        >
          <p className="text-lg">
            Full-Stack Developer with a background in UI/UX, motion design, and
            3D art. <br /> <br />
            Driven by my beliefs in autonomy, equity, and empowerment, I strive to build technology that fosters inclusion and uplifts communities with every new skill I develop.
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;
