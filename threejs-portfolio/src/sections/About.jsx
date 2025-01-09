import React from "react";

const About = () => {
  return (
    <section
      id="about"
      className="about-section w-full bg-gray-900 text-white py-20 px-6 flex justify-center items-center border-2 border-red-500"
      style={{
        backgroundColor: "#1A1C21", 
      }}
>
      <div className="max-w-4xl text-left border-2 border-blue-500 p-4">
      <p className="text-lg border border-green-500 p-2">
  A Full-Stack Developer with a background in UI/UX, motion design, and 3D art. <br />
  While I’m still working towards aligning my projects with my core interests... <br />
  my drive to learn new languages and frameworks is rooted in my beliefs of <br />
  autonomy, equity, empowerment, and protecting the rights of all individuals— <br />
  especially those whose voices are often underrepresented. <br /><br />
  With each skill I develop, I strive to build technology that fosters inclusion <br />
  and uplifts communities.
</p>

      </div>
    </section>
  );
};

export default About;



