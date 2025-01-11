import React from "react";

const Footer = () => {
  return (
    <footer
      className="text-white py-4 text-center"
      style={{
        backgroundColor: "#16181D", // custom background color
      }}
    >
      <p className="text-sm">
        © {new Date().getFullYear()} <a href="https://www.elya.dev" className="underline">Elya.Dev</a> — Designed and built by me, Elya
      </p>
    </footer>
  );
};

export default Footer;
