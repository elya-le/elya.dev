import { useState, useEffect } from "react";
import { myProjects } from "../constants/index.js";

const Projects = () => {
  const [selectedProjectIndex, setSelectedProjectIndex] = useState(0); // state for current project
  const [screenWidth, setScreenWidth] = useState(window.innerWidth); // state to track screen width

  const currentProject = myProjects[selectedProjectIndex]; // get current project data

  // update screen width on resize
  useEffect(() => {
    const handleResize = () => setScreenWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize); // clean up event listener
  }, []);

  // dynamically calculate dimensions based on screen size
  const getResponsiveDimensions = () => {
    if (screenWidth > 1024) {
      return { height: "650px", width: "900px" }; // Fullscreen
    } else if (screenWidth > 768) {
      return { height: "600px", width: "800px" }; // Tablet
    } else {
      return { height: "700px", width: "99%" }; // Mobile
    }
  };

  const getResponsiveImageSize = () => {
    if (screenWidth > 1024) {
      return { height: "250px", width: "400px" }; // Fullscreen
    } else if (screenWidth > 768) {
      return { height: "200px", width: "300px" }; // Tablet
    } else {
      return { height: "180px", width: "280px" }; // Mobile
    }
  };

  const responsiveDimensions = getResponsiveDimensions();
  const responsiveImageSize = getResponsiveImageSize();

  const handleNavigation = (direction) => {
    setSelectedProjectIndex((prevIndex) => {
      if (direction === "previous") {
        return prevIndex === 0 ? myProjects.length - 1 : prevIndex - 1; // move to previous project
      } else if (direction === "next") {
        return prevIndex === myProjects.length - 1 ? 0 : prevIndex + 1; // move to next project
      }
    });
  };

  return (
    <section
      className="projects-section h-screen relative z-10 flex justify-center items-center"
      id="projects"
      style={{
        backgroundColor: "#161616",
      }}
    >
      {/* project grid container */}
      <div
        className="relative p-6 shadow-lg bg-black bg-opacity-80 flex flex-col"
        style={{
          height: responsiveDimensions.height,
          width: responsiveDimensions.width,
        }}
      >
        {/* project title and description */}
        <div className="p-1 flex-1 w-full">
          <p className="text-white text-lg lg:text-2xl font-bold">
            {currentProject.title}
          </p>
          <p className="text-sm">{currentProject.desc}</p>

          {/* project screenshots - horizontally scrollable */}
          <div
            className="mt-4 flex overflow-x-scroll hide-scrollbar"
            style={{
              gap: "16px", // spacing between images
              scrollSnapType: "x mandatory",
              display: "flex",
              overscrollBehaviorX: "contain", // avoid undesired scrolling behavior
              WebkitOverflowScrolling: "touch", // enable smooth scrolling on mobile
            }}
          >
            {Object.keys(currentProject)
              .filter((key) => key.startsWith("previewImg"))
              .map((key, index) => (
                <div
                  key={index}
                  style={{
                    scrollSnapAlign: "start",
                    flex: "0 0 auto", // ensures one image per view
                    height: responsiveImageSize.height,
                    width: responsiveImageSize.width,
                  }}
                >
                  <img
                    src={currentProject[key]}
                    alt={`${currentProject.title} screenshot ${index + 1}`}
                    className="shadow-lg"
                    style={{
                      height: "100%",
                      width: "100%",
                      objectFit: "fill", // maintain image aspect ratio
                    }}
                  />
                </div>
              ))}
          </div>
          <div
            className="subdesc mt-6"
            dangerouslySetInnerHTML={{ __html: currentProject.subdesc }}
          ></div>

          {/* Add Live Link and GitHub Repo */}
          <div className="links mt-4">
            {/* Render Tags */}
            <div className="tags mt-4 flex flex-wrap gap-2">
              {currentProject.tags.map((tag) => (
                <span
                  key={tag.id}
                  className="px-3 py-1 text-sm font-medium rounded-full text-white"
                  style={{
                    backgroundColor: tag.color, // Use the color property dynamically
                  }}
                >
                  {tag.name}
                </span>
              ))}
            </div>
            {currentProject.liveLink && (
              <a
                href={currentProject.liveLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 underline mr-4"
              >
                Live Link
              </a>
            )}
            {currentProject.repoLink && (
              <a
                href={currentProject.repoLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 underline"
              >
                GitHub Repo
              </a>
            )}
          </div>
        </div>

        {/* navigation buttons */}
        <div className="flex justify-between items-center mt-4 w-full">
          <button
            className="arrow-btn p-2 rounded-full"
            onClick={() => handleNavigation("previous")}
          >
            &lt;
          </button>
          <button
            className="arrow-btn p-2 rounded-full"
            onClick={() => handleNavigation("next")}
          >
            &gt;
          </button>
        </div>
      </div>
    </section>
  );
};

// Move the export default statement here, outside the component
export default Projects;
