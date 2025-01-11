import { useState, useEffect, useRef } from "react";
import { myProjects } from "../constants/index.js";
import { HiArrowTurnRightUp } from "react-icons/hi2";

const Projects = () => {
  const [selectedProjectIndex, setSelectedProjectIndex] = useState(0); // state for current project
  const [screenWidth, setScreenWidth] = useState(window.innerWidth); // state to track screen width
  const [currentImageIndex, setCurrentImageIndex] = useState(0); // state for internal image carousel

  const currentProject = myProjects[selectedProjectIndex]; // get current project data
  const carouselRef = useRef(null); // reference for the internal image carousel

  // update screen width on resize
  useEffect(() => {
    const handleResize = () => setScreenWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize); // clean up event listener
  }, []);

  // dynamically calculate dimensions based on screen size
  const getResponsiveDimensions = () => {
    if (screenWidth > 1024) {
      return { height: "700px", width: "900px" }; // fullscreen
    } else if (screenWidth > 768) {
      return { height: "600px", width: "800px" }; // tablet
    } else {
      return { height: "700px", width: "99%" }; // mobile
    }
  };

  const getResponsiveImageSize = () => {
    if (screenWidth > 1024) {
      return { height: 250, width: 400 }; // fullscreen
    } else if (screenWidth > 768) {
      return { height: 200, width: 300 }; // tablet
    } else {
      return { height: 180, width: 280 }; // mobile
    }
  };

  const getSubdescHeight = () => {
    if (screenWidth > 1024) {
      return "125px"; // height for desktop
    } else if (screenWidth > 768) {
      return "105px"; // height for tablet
    } else {
      return "150px"; // height for mobile
    }
  };

  const responsiveDimensions = getResponsiveDimensions();
  const responsiveImageSize = getResponsiveImageSize();
  const subdescHeight = getSubdescHeight(); // get height dynamically

  // click on an image to navigate to the next image
  const handleImageClick = (direction) => {
    const totalImages = Object.keys(currentProject).filter((key) =>
      key.startsWith("previewImg")
    ).length; // count total images

    setCurrentImageIndex((prevIndex) => {
      let newIndex;
      if (direction === "next") {
        newIndex = (prevIndex + 1) % totalImages; // move to the next image, loop back if at the last image
      } else if (direction === "previous") {
        newIndex = (prevIndex - 1 + totalImages) % totalImages; // move to the previous image, loop back if at the first image
      }
      const scrollPosition = newIndex * (responsiveImageSize.width + 16); // calculate scroll offset
      carouselRef.current.scrollTo({ left: scrollPosition, behavior: "smooth" }); // smooth scroll
      return newIndex;
    });
  };

  const handleNavigation = (direction) => {
    setSelectedProjectIndex((prevIndex) => {
      if (direction === "previous") {
        return prevIndex === 0 ? myProjects.length - 1 : prevIndex - 1; // move to previous project
      } else if (direction === "next") {
        return prevIndex === myProjects.length - 1 ? 0 : prevIndex + 1; // move to next project
      }
    });
    setCurrentImageIndex(0); // reset the internal image index when changing projects
  };

  return (
    <section
      className="projects-section h-screen relative z-10 flex justify-center items-center px-4 py-4"
      id="projects"
      style={{
        backgroundColor: "#1A1C21",
        // padding: "16px", // adjust padding for testing
      }}
    >
      {/* project grid container */}
      <div
        className="relative p-4 shadow-lg bg-opacity-80 flex flex-col"
        style={{
          backgroundColor: "#23272F",
          height: responsiveDimensions.height,
          width: responsiveDimensions.width,
        }}
      >
        {/* project title and description */}
        <div className="p-1 flex-1 w-full">
          <p className="text-white text-lg lg:text-2xl font-medium">
            {currentProject.title}
          </p>
          <p className="text-sm">{currentProject.desc}</p>

          {/* internal image carousel */}
          <div
            ref={carouselRef}
            className="mt-4 whitespace-nowrap overflow-x-auto hide-scrollbar"
            style={{
              overflowX: "scroll", // enable horizontal scrolling
              overflowY: "hidden",
              cursor: "pointer",
            }}
          >
            {Object.keys(currentProject)
              .filter((key) => key.startsWith("previewImg"))
              .map((key, index) => (
                <div
                  key={index}
                  style={{
                    display: "inline-block", // display images inline
                    verticalAlign: "top",
                    marginRight: "16px", // spacing between images
                    height: `${responsiveImageSize.height}px`,
                    width: `${responsiveImageSize.width}px`,
                  }}
                  onClick={() =>
                    handleImageClick(
                      index === currentImageIndex ? "next" : "previous"
                    )
                  }
                >
                  <img
                    src={currentProject[key]}
                    alt={`${currentProject.title} screenshot ${index + 1}`}
                    style={{
                      height: "100%",
                      width: "100%",
                      objectFit: "cover", // maintain image aspect ratio
                    }}
                  />
                </div>
              ))}
          </div>

          {/* live link and github repo */}
          <div className="links mt-4">
            {currentProject.repoLink && currentProject.title === "Current portfolio site" ? (
              <a
                href={currentProject.repoLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white mr-4 inline-flex items-center border border-white rounded-full px-4 py-2 transition-colors hover:bg-white hover:text-black"
              >
                Github <HiArrowTurnRightUp className="ml-1" />
              </a>
            ) : currentProject.liveLink ? (
              <a
                href={currentProject.liveLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white mr-4 inline-flex items-center border border-white rounded-full px-4 py-2 transition-colors hover:bg-white hover:text-black"
              >
                Live Link <HiArrowTurnRightUp className="ml-1" />
              </a>
            ) : null}
          </div>

          {/* sub-description */}
          <div
            className="subdesc mt-6"
            dangerouslySetInnerHTML={{ __html: currentProject.subdesc }}
            style={{
              height: subdescHeight,
              overflow: "hidden", // ensure content stays within the height
              border: "1px solid white",
            }}
          ></div>

          {/* add tags */}
          <div className="tags mt-4 flex flex-wrap gap-2">
            {currentProject.tags.map((tag) => (
              <span
                key={tag.id}
                className="px-3 py-1 text-sm font-medium rounded-full text-white"
                style={{
                  backgroundColor: tag.color,
                  color: tag.textColor || "#ffffff",
                }}
              >
                {tag.name}
              </span>
            ))}
          </div>
        </div>

        {/* navigation buttons for projects */}
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

export default Projects;
