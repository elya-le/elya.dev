import { useState, Suspense } from "react";
import { myProjects } from "../constants/index.js";
import { Canvas } from "@react-three/fiber";
import { Center, OrbitControls } from "@react-three/drei";
import DemoComputer from "../components/DemoComputer.jsx";
import CanvasLoader from "../components/CanvasLoader.jsx";

// Define the number of projects
const projectCount = myProjects.length;

const Projects = () => {
  // State to keep track of the selected project index
  const [selectedProjectIndex, setSelectedProjectIndex] = useState(0);

  // Get the current project based on the selected index
  const currentProject = myProjects[selectedProjectIndex];

  // Function to handle navigation through projects
  const handleNavigation = (direction) => {
    setSelectedProjectIndex((prevIndex) => {
      if (direction === "previous") {
        return prevIndex === 0 ? projectCount - 1 : prevIndex - 1;
      } else if (direction === "next") {
        return prevIndex === projectCount - 1 ? 0 : prevIndex + 1;
      }
    });
  };

  return (
    <section
    className="projects-section h-screen border-4 border-green-300 bg-fixed bg-cover bg-center"
    id="projects"
  >
      {/* Section Header */}
      <p className="head-text text-center">PIB</p>

      {/* Project Grid Container */}
      <div className="grid lg:grid-cols-1 grid-cols-1 gap-5 w-1/2 mt-6">
        {/* Project Details */}
        <div className="border-4 h-80 gap-5 relative p-6 shadow-lg rounded-lg bg-black-800">
          {/* Spotlight Image */}

          {/* Project Title and Description */}
          <div className="gap-4 text-white-600">
            <p className="text-white text-2xl font-bold">{currentProject.title}</p>
            <p className="text-sm">{currentProject.desc}</p>
            <p className="text-sm text-gray-400">{currentProject.subdesc}</p>
          </div>

          {/* Tech Stack and Live Site Link */}
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              {currentProject.tags.map((tag, index) => (
                <div key={index} className="tech-logo">
                  <img src={tag.path} alt={tag.name} className="w-6 h-6" />
                </div>
              ))}
            </div>
            <a
              className="flex items-center gap-2 text-white hover:underline"
              href={currentProject.href}
              target="_blank"
              rel="noreferrer"
            >
              <p>Visit Live Site</p>
              <img
                src="/assets/arrow-up.png"
                className="w-4 h-4"
                alt="arrow"
              />
            </a>
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-between items-center mt-4">
            <button
              className="arrow-btn bg-gray-700 hover:bg-gray-600 p-2 rounded-full"
              onClick={() => handleNavigation("previous")}
            >
              <img
                src="/assets/left-arrow.png"
                alt="left arrow"
                className="w-4 h-4"
              />
            </button>
            <button
              className="arrow-btn bg-gray-700 hover:bg-gray-600 p-2 rounded-full"
              onClick={() => handleNavigation("next")}
            >
              <img
                src="/assets/right-arrow.png"
                alt="right arrow"
                className="w-4 h-4"
              />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;
