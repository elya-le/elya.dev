import { useState } from "react";
import { myProjects } from "../constants/index.js";

const Projects = () => {
  const [selectedProjectIndex, setSelectedProjectIndex] = useState(0); // state for current project

  const currentProject = myProjects[selectedProjectIndex]; // get current project data

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
      className="projects-section h-screen relative z-10 bg-green-100"
      id="projects"
    >
      {/* section header */}
      <p className="head-text text-center">Projects</p>

      {/* project grid container */}
      <div className="grid lg:grid-cols-1 grid-cols-1 gap-5 w-1/2 mt-6 mx-auto">
        {/* project details */}
        <div className="border-4 h-80 gap-5 relative p-6 shadow-lg rounded-lg bg-black-800">
          {/* project title and description */}
          <div className="gap-4 text-white-600">
            <p className="text-white text-2xl font-bold">{currentProject.title}</p>
            <p className="text-sm">{currentProject.desc}</p>
            <p className="text-sm text-gray-400">{currentProject.subdesc}</p>
          </div>

          {/* navigation buttons */}
          <div className="flex justify-between items-center mt-4">
            <button
              className="arrow-btn bg-gray-700 hover:bg-gray-600 p-2 rounded-full"
              onClick={() => handleNavigation("previous")}
            >
              Prev
            </button>
            <button
              className="arrow-btn bg-gray-700 hover:bg-gray-600 p-2 rounded-full"
              onClick={() => handleNavigation("next")}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;
