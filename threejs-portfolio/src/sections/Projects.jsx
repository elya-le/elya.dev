import { useState, useEffect, useRef } from "react";
import { myProjects } from "../constants/index.js";
import { GoArrowUpRight, GoArrowLeft, GoArrowRight } from "react-icons/go";
import { HiArrowTurnRightUp } from "react-icons/hi2";
import { SlArrowLeft, SlArrowRight } from "react-icons/sl";

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

  //  // dynamically calculate padding based on screen size
  // const getResponsivePadding = () => {
  //   if (screenWidth > 1024) {
  //     return "40px"; // larger padding for desktop
  //   } else if (screenWidth > 768) {
  //     return "20px"; // medium padding for tablets
  //   } else {
  //     return "10px"; // smaller padding for mobile
  //   }
  // };

  // const padding = getResponsivePadding(); // calculate the padding

  // dynamically calculate dimensions based on screen size
  const getResponsiveDimensions = () => {
    if (screenWidth > 1024) {
      return { height: "770px", width: "896px" }; // fullscreen
    } else if (screenWidth > 768) {
      return { height: "750px", width: "800px" }; // tablet
    } else {
      return { height: "680px", width: "99%" }; // mobile
    }
  };

  const getResponsiveImageSize = () => {
    if (screenWidth > 1024) {
      return { height: 350, width: 600 }; // fullscreen
    } else if (screenWidth > 768) {
      return { height: 350, width: 600 }; // tablet
    } else {
      return { height: 220, width: 280 }; // mobile
    }
  };

  const getSubdescHeight = () => {
    if (screenWidth > 1024) {
      return "115px"; // height for desktop
    } else if (screenWidth > 768) {
      return "120px"; // height for tablet
    } else {
      return "135px"; // height for mobile
    }
  };

  const responsiveDimensions = getResponsiveDimensions();
  const responsiveImageSize = getResponsiveImageSize();
  const subdescHeight = getSubdescHeight(); // get height dynamically

  // click on an image to navigate and toggle visibility
  const handleImageClick = (index) => {
  const totalImages = Object.keys(currentProject).filter((key) =>
    key.startsWith("previewImg")
  ).length;

  if (index === currentImageIndex) {
    // Special case: if the first image is clicked again, scroll to the second image
    if (index === 0) {
      const nextIndex = (index + 1) % totalImages; // Move to the second image
      const scrollPosition = nextIndex * (responsiveImageSize.width * 1.05);
      setCurrentImageIndex(nextIndex);
      carouselRef.current.scrollTo({ left: scrollPosition, behavior: "smooth" });
    } else {
      // Otherwise, go back to the previous image
      const prevIndex = (index - 1 + totalImages) % totalImages; // Wrap around if necessary
      const scrollPosition = prevIndex * (responsiveImageSize.width * 1.05);
      setCurrentImageIndex(prevIndex);
      carouselRef.current.scrollTo({ left: scrollPosition, behavior: "smooth" });
    }
  } else {
    // Otherwise, scroll to make the clicked image fully visible
    const newIndex = index % totalImages;
    const scrollPosition = newIndex * (responsiveImageSize.width * 1.05);
    setCurrentImageIndex(newIndex);
    carouselRef.current.scrollTo({ left: scrollPosition, behavior: "smooth" });
  }
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

  // added: handle warning for mobile view when clicking "Live Link"
  const handleLiveLinkClick = (e, link) => {
    if (screenWidth <= 768) {
      // mobile screen threshold
      e.preventDefault(); // prevent default navigation
      const userConfirmed = window.confirm(
        "This project is best viewed on a desktop. Mobile experience will be limited. Proceed anyway?"
      );
      if (userConfirmed) {
        window.open(link, "_blank"); // open the link if confirmed
      }
    }
  };

  return (
    <section
      className="projects-section relative z-10 flex flex-col justify-center items-center px-4 py-2 pb-5"
      id="projects"
      style={{
        backgroundColor: "#191B00",
      }}
    >
      {/* Header Section for "Selected Projects" */}
      <div
      style={{
        height: responsiveDimensions.height,
        width: responsiveDimensions.width,
      }}>
        <div className="border w-full text-left mb-1">
          <p className="text-white text-xl font-thin">Selected Projects</p>
        </div>
        {/* project grid container */}
        <div
        className="relative bg-opacity-80 flex flex-col justify-center bg-[#23272F] h-[responsiveDimensions.height] w-[responsiveDimensions.width] p-2 lg:p-5 md:p-4 sm:px-2 sm:py-4"
          // className="relative border p-5 shadow-lg bg-opacity-80 flex flex-col"
          style={{
            backgroundColor: "#262900",
          }}
        >
          <div className="p-1 flex-1 w-full">

            {/* internal image carousel */}
            <div
              ref={carouselRef}
              className="whitespace-nowrap overflow-x-auto hide-scrollbar"
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
                      height: `${responsiveImageSize.height}px`, // dynamically apply height
                      width: `${responsiveImageSize.width}px`, // dynamically apply width
                    }}
                    onClick={() => handleImageClick(index)} // attach click handler
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
            {/* project title and description */}
            <p className="mt-4 text-white text-lg lg:text-2xl font-medium">
              {currentProject.title}
            </p>
            <p className="t font-thin">
              {currentProject.desc}
            </p>

            {/* live link and github repo */}
            <div className="links mt-4">
              {currentProject.repoLink && currentProject.title === "Current portfolio site" ? (
                <a
                  href={currentProject.repoLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white text-sm inline-flex items-center border border-white rounded-full pl-4 pr-3 py-1.5 transition-colors hover:bg-[#464d5c] bg-[#4C5200]"
                >
                  Github <GoArrowUpRight className="text-lg font-thin ml-1"/>
                </a>
              ) : currentProject.liveLink ? (
                <>
                  <a
                    href={currentProject.liveLink}
                    onClick={(e) =>
                      handleLiveLinkClick(e, currentProject.liveLink)
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white text-sm inline-flex items-center border border-white rounded-full pl-4 pr-3 py-1.5 transition-colors hover:bg-[#464d5c] bg-[#4C5200]"
                  >
                    Live Link <GoArrowUpRight className="text-lg font-thin ml-1"/>
                  </a>
                </>
              ) : null}
            </div>

            {/* sub-description */}
            <div
              className="subdesc mt-4"
              dangerouslySetInnerHTML={{ __html: currentProject.subdesc }}
              style={{
                height: subdescHeight,
              }}
            ></div>

            {/* add tags */}
            <div className="tags mt-4 flex flex-wrap gap-2">
              {currentProject.tags.map((tag) => (
                <span
                  key={tag.id}
                  className="px-3 py-1 text-sm font-thin rounded-full text-white"
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
          <div className="flex justify-between items-center px-1 pb-2 w-full">
            {/* previous button */}
            <button
              className="text-lg flex items-center "
              onClick={() => handleNavigation("previous")}
            >
              <GoArrowLeft className="ml-1 text-white transition-colors" />
              {/* Prev */}
            </button>
           {/* slider counter as dots */}
            <div className="flex gap-2">
              {myProjects.map((_, index) => (
                <span
                  key={index}
                  className={`w-2 h-2 rounded-full border ${
                    // index === selectedProjectIndex ? "bg-gray-500 border-gray-500" : "border-gray-500"
                    index === selectedProjectIndex ? "bg-white border-white" : "border-white"
                  }`}
                ></span>
              ))}
            </div>
            {/* next button */}
            <button
              className="text-lg flex items-center "
              // className="text-sm flex items-center rounded-full gap-2 px-2 py-2 border border-white hover:border-gray-400 transition-colors hover:bg-[#464d5c] bg-[#343944] text-white"
              onClick={() => handleNavigation("next")}
            >
              <GoArrowRight className="mr-1 text-grey transition-colors" />
              {/* Next */}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;
