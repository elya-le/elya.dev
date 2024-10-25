import { useState, Suspense } from "react";
import { myProjects } from "../constants/index.js";
import { Canvas } from "@react-three/fiber";
import { Center } from "@react-three/drei";
import DemoComputer from '../components/DemoComputer.jsx';
import CanvasLoader from "../components/CanvasLoader.jsx"; 

// define the number of projects
const projectCount = myProjects.length;

// projects component
const Projects = () => {
  // state to keep track of the selected project index
  const [selectedProjectIndex, setSelectedProjectIndex] = useState(0);

  // current project based on selectedProjectIndex
  const currentProject = myProjects[selectedProjectIndex];

  // navigation through projects
  const handleNavigation = (direction) => {
    setSelectedProjectIndex((prevIndex) => {
      if (direction === 'previous') {
        console.log('Previous Button Clicked');
        return prevIndex === 0 ? projectCount - 1 : prevIndex - 1;
      } else if (direction === 'next') {
        console.log('Next Button Clicked');
        return prevIndex === projectCount - 1 ? 0 : prevIndex + 1;
      }
    });
  };

  return (
    <section className="c-space my-20">
      {/* header */}
      <p className="head-text">Thing's I've built</p>

      {/* project grid container */}
      <div className="grid lg:grid-cols-2 grid-cols-1 mt-12 gap-5 w-full">
        
        {/* project details and navigation container */}
        <div className="flex flex-col gap-5 relative sm:p-10 py-10 px-5 shadow-2xl shadow-black-200 rounded-xl">
          
          {/* spotlight image */}
          <div className="absolute top-0 right-0">
            <img 
              src={currentProject.spotlight} 
              alt="spotlight" 
              className="w-full h-96 object-cover rounded-xl" 
            />
          </div>

          {/* project title and description */}
          <div className="flex flex-col gap-5 text-white-600 my-5">
            <p className="text-white text-2xl font-semibold animatedText">
              {currentProject.title}
            </p>
            <p className="animatedText">
              {currentProject.desc}
            </p>
            <p className="animatedText">
              {currentProject.subdesc}
            </p>
          </div>

          {/* tech stack and live site link */}
          <div className="flex items-center justify-between flex-wrap gap-5">
            <div className="flex items-center gap-3">
              {currentProject.tags.map((tag, index) => (
                <div key={index} className="tech-logo">
                  <img src={tag.path} alt={tag.name}/>
                </div>
              ))}
            </div>
            <a
              className="flex items-center gap-2 cursor-pointer text-white-600"
              href={currentProject.href}
              target="_blank"
              rel="noreferrer"
            >         
              <p>Visit Live Site</p>
              <img 
                src="/assets/arrow-up.png" 
                className="w-3 h-3" 
                alt="arrow" 
              />
            </a>
          </div>

          {/* arrow navigation buttons */}
          <div className="flex justify-between items-center absolute bottom-5 left-0 right-0 px-5">
            <button 
              className="arrow-btn" 
              onClick={() => handleNavigation('previous')}
            >
              <img src="/assets/left-arrow.png" alt="left arrow" className="w-4 h-4" />
            </button>
            <button 
              className="arrow-btn" 
              onClick={() => handleNavigation('next')}
            >
              <img src="/assets/right-arrow.png" alt="right arrow" className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* three.js canvas component */}
        <div className="border border-black-300 bg-black-200 rounded-lg h-96 md:h-full">
          <Canvas>
            <ambientLight intensity={Math.PI} />
            <directionalLight position={[10, 10, 5]} />
            <Center>
              {/* Placeholder for 3D model, texture */}
              <Suspense fallback={<CanvasLoader />}>
                <group scale={2} position={[0, -3, 0]} rotation={[0, -0.1, 0]}>
                  <DemoComputer texture={currentProject.texture} />
                </group>
              </Suspense>
            </Center>
            {/* <OrbitControls maxPolarAngle={Math.PI / 2} enableZoom={false} /> */}
          </Canvas>
        </div>
      </div>
    </section>
  );
}

export default Projects;
