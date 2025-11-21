import React, { useState } from "react";
import './navbar.css';
import logo from '../../assets/logo.jpg';
import contactImg from '../../assets/contactImg.jpg';
import { Link } from 'react-scroll';
import Menu from '../../assets/menu.jpg';

const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <nav className="navbar">
     <img src={logo} alt="Brand Logo" className='logo' />
      <div className="desktopMenu">
        {["intro", "works","skills",  "clients"].map((section) => (
          <Link 
            key={section}
            activeClass="active"
            to={section}
            spy={true}
            smooth={true}
            offset={-50}
            duration={500}
            className="desktopMenuListItem"
          >
            {section.charAt(0).toUpperCase() + section.slice(1)}
          </Link>
        ))}
      </div>
      <Link 
        to='contact' 
        spy={true} 
        smooth={true} 
        offset={-50} 
        duration={500} 
        className="desktopMenuBtn"
      >
        <img src={contactImg} alt="Contact Me" className="desktopMenuImg" />
        Contact Me
      </Link>

      <img src={Menu} alt="Menu Icon" className='mobMenu' onClick={() => setShowMenu(!showMenu)} />

      <div className={`navMenu ${showMenu ? 'show' : ''}`}>
        {["intro","skills",  "works", "clients", "contact"].map((section) => (
          <Link 
            key={section}
            activeClass="active"
            to={section}
            spy={true}
            smooth={true}
            offset={-50}
            duration={500}
            className="ListItem"
            onClick={() => setShowMenu(false)}
          >
            {section.charAt(0).toUpperCase() + section.slice(1)}
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default Navbar;