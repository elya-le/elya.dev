import React, { useState, useEffect } from "react";

const About = () => {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth); // state to track screen width
  const [marginTop, setMarginTop] = useState(0); // dynamic margin-top to control overlap

  // update screen width on resize
  useEffect(() => {
    const handleResize = () => setScreenWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize); // clean up event listener
  }, []);

  // track scroll and dynamically adjust margin-top
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY; // current scroll position
      const maxOverlap = window.innerHeight * 0.42; // 1/4 of the hero section height
      const newMarginTop = Math.min(scrollTop, maxOverlap); // gradually reduce margin-top
      setMarginTop(-newMarginTop); // set a negative margin to create overlap
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll); // cleanup on unmount
  }, []);

  // dynamically calculate dimensions based on screen size
  const getResponsiveDimensions = () => {
    if (screenWidth > 1024) {
      return { height: "250px", width: "100%" }; // fullscreen
    } else if (screenWidth > 768) {
      return { height: "250px", width: "800px" }; // tablet
    } else {
      return { height: "340px", width: "99%" }; // mobile
    }
  };

  const responsiveDimensions = getResponsiveDimensions();

  return (
    <section
      id="about"
      className="about-section relative z-20 w-full text-white flex justify-center items-center bg-transparent px-4 py-2 pb-2 sm:pb-10 mb-10"
      style={{
        marginTop: `${marginTop}px`, // dynamic margin-top for overlap
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
            backgroundColor: "#262900", // specific background color for the container
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
            backgroundColor: "#262900", // specific background color for the container
          }}
        >
          <p className="text-lg font-thin">
            Full-Stack Developer with a background in UI/UX, motion design, and
            3D art. <br /> <br />
            With every new skill I develop and driven by my beliefs in autonomy, equity, and empowerment, I strive to build technology that fosters inclusion and uplifts communities. 
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;

