import { useState } from "react";
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
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-grey/100">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center py-5 mx-auto c-space">
          {/* logo */}
          <a href="/" className="text-neutral-400 text-xl hover:text-white transition-colors">
            {/* &lt; Elya /&gt; */}
            Elya_
          </a>

          {/* centered toggle */}
          <div className="flex-grow flex justify-center">
            <div className="flex items-center p-2 rounded-md shadow-md">
              <p className="text-sm text-white mr-2"> {/* Placeholder */}</p>
              <label className="toggle-switch">
                <input
                  type="checkbox"
                  checked={animationName === "Fast"} // reflects "Fast" animation state
                  onChange={toggleAnimation} // toggles the state on change
                />
                <span className="slider"></span>
              </label>
            </div>
          </div>

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
