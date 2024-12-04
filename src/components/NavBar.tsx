import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../assets/images/logo.png";
import menuIcon from "../assets/images/menu.png";
import "../components/NavBar.css";

function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const isHomePage = location.pathname === "/"; // Détecter si c'est la page d'accueil

  return (
    <>
      {isHomePage && <img className="logo" src={logo} alt="le super logo" />}
      <nav className="navbar">
        <div className="navbar-header">
          <button
            className={`burger-menu ${isHomePage ? "home-page" : ""}`}
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
            <Link to="/contact/" onClick={() => setIsMenuOpen(false)}>
              Contact
            </Link>
          </li>
        </ul>
      </nav>
    </>
  );
}

export default NavBar;
