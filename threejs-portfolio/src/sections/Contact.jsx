import React from "react";

const Contact = () => {
  return (
    <section
      id="contact"
      className="contact-section w-full bg-gray-900 text-white py-20 px-6 flex justify-center items-center"
      style={{
        backgroundColor: "#1A1C21", 
      }}
    >
      <div className="max-w-4xl text-left">
        <p className="text-lg mb-4">
          I'm always open to exciting opportunities or collaborations.<br /> 
          Lets build together!
        </p>
        <a
          href="mailto:your-email@example.com"
          className="inline-block px-6 py-3 text-black bg-white rounded-full transition hover:bg-gray-300"
        >
          Email Me
        </a>
      </div>
    </section>
  );
};

export default Contact;
