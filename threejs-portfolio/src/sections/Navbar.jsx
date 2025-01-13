import { useState, useEffect } from "react";
import { navLinks } from "../constants/index.js";

const NavItems = ({ onClick = () => {} }) => (
  <ul className="nav-ul">
    {navLinks.map((item) => (
      <li key={item.id} className="nav-li">
        <a href={item.href} className="nav-li_a" onClick={onClick}>
          {item.name}
        </a>
      </li>
    ))}
  </ul>
);

const Navbar = ({ animationName, toggleAnimation }) => {
  const [isOpen, setIsOpen] = useState(false); // state for menu
  const [isVisible, setIsVisible] = useState(true); // state for navbar visibility
  const [lastScrollPos, setLastScrollPos] = useState(0); // state for last scroll position

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;

      // Hide navbar when scrolling down, show when scrolling up
      if (currentScrollPos > lastScrollPos && currentScrollPos > 0) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }

      setLastScrollPos(currentScrollPos); // Update last scroll position
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll); // Cleanup on unmount
  }, [lastScrollPos]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 bg-grey/100 transition-transform duration-300 ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center py-5 mx-auto c-space">
          {/* logo */}
          <a href="/" className="text-white text-xl hover:text-white transition-colors">
            Elya_
          </a>

          {/* centered toggle */}

          {/* navigation */}
          <nav className="sm:flex hidden">
            <NavItems />
          </nav>

          {/* mobile menu toggle */}
          <button
            onClick={toggleMenu}
            className="text-neutral-400 hover:text-white focus:outline-none sm:hidden flex"
            aria-label="Toggle menu"
          >
            <img
              src={isOpen ? "assets/close.svg" : "assets/menu.svg"}
              alt="toggle"
              className="w-6 h-6"
            />
          </button>
        </div>
      </div>

      {/* mobile Sidebar */}
      <div className={`nav-sidebar ${isOpen ? "max-h-screen" : "max-h-0"}`}>
        <nav className="p-5">
          <NavItems onClick={closeMenu} />
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
