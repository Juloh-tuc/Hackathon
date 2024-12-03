import { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/images/logo.png";
import "../components/NavBar.css";
import menuIcon from "../assets/images/menu.png";

function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      {window.location.pathname === "/" && (
        <img className="logo" src={logo} alt="le super logo" />
      )}
      <nav className="navbar">
        <div className="navbar-header">
          <button
            className="burger-menu"
            type="button"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            <img src={menuIcon} alt="Menu burger" className="menu-icon" />
          </button>
        </div>
        <ul className={`navbar-links ${isMenuOpen ? "open" : ""}`}>
          <li>
            <Link to="/forum" onClick={() => setIsMenuOpen(false)}>
              Forum
            </Link>
          </li>
          <li>
            <Link to="/" onClick={() => setIsMenuOpen(false)}>
              Home
            </Link>
          </li>
          <li>
            <Link to="/contact/123" onClick={() => setIsMenuOpen(false)}>
              Contact
            </Link>
          </li>
        </ul>
      </nav>
    </>
  );
}

export default NavBar;
