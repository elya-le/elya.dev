import React from "react";

const About = () => {
  return (
    <section
      id="about"
      className="about-section w-full bg-gray-900 text-white px-4 py-4 flex justify-center items-center"
      style={{
        backgroundColor: "#1A1C21",
      }}
    >
      <div className="max-w-4xl w-full flex flex-col lg:flex-row gap-4">
        {/* First Container */}
        <div className="flex-1 p-4"
        style={{
          backgroundColor: "#23272F", // specific background color for the second container
        }}>
          <p className="text-lg p-2">
          </p>
        </div>

        {/* Second Container */}
        <div className="flex-1 p-4"
        style={{
          backgroundColor: "#23272F", // specific background color for the second container
        }}>
          <p className="text-lg">
            Full-Stack Developer with a background in UI/UX, motion design, and 3D art. <br />
            While I’m still working towards aligning my projects with my core interests... <br />
            my drive to learn new languages and frameworks is rooted in my beliefs of <br />
            autonomy, equity, empowerment, and protecting the rights of all individuals— <br />
            especially those whose voices are often underrepresented. <br /><br />
            With each skill I develop, I strive to build technology that fosters inclusion <br />
            and uplifts communities.
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;

