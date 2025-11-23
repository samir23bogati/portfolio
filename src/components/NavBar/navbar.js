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

      {/* DESKTOP MENU */}
      <div className="desktopMenu">

        {/* Intro */}
        <Link
          activeClass="active"
          to="intro"
          spy={true}
          smooth={true}
          offset={-50}
          duration={500}
          className="desktopMenuListItem"
        >
          Intro
        </Link>

        {/* Skills → goes to works */}
        <Link
          activeClass="active"
          to="works"        // swapped
          spy={true}
          smooth={true}
          offset={-50}
          duration={500}
          className="desktopMenuListItem"
        >
          Skills
        </Link>

        {/* Works → goes to skills */}
        <Link
          activeClass="active"
          to="skills"       // swapped
          spy={true}
          smooth={true}
          offset={-50}
          duration={500}
          className="desktopMenuListItem"
        >
          Works
        </Link>

        {/* Clients */}
        <Link
          activeClass="active"
          to="clients"
          spy={true}
          smooth={true}
          offset={-50}
          duration={500}
          className="desktopMenuListItem"
        >
          Clients
        </Link>

      </div>

      {/* CONTACT BUTTON */}
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

      {/* MOBILE MENU ICON */}
      <img
        src={Menu}
        alt="Menu Icon"
        className='mobMenu'
        onClick={() => setShowMenu(!showMenu)}
      />

      {/* MOBILE MENU */}
      <div className={`navMenu ${showMenu ? 'show' : ''}`}>

        {/* Intro */}
        <Link
          to="intro"
          activeClass="active"
          spy={true}
          smooth={true}
          offset={-50}
          duration={500}
          className="ListItem"
          onClick={() => setShowMenu(false)}
        >
          Intro
        </Link>

        {/* Skills → goes to works */}
        <Link
          to="works"     // swapped
          activeClass="active"
          spy={true}
          smooth={true}
          offset={-50}
          duration={500}
          className="ListItem"
          onClick={() => setShowMenu(false)}
        >
          Skills
        </Link>

        {/* Works → goes to skills */}
        <Link
          to="skills"    // swapped
          activeClass="active"
          spy={true}
          smooth={true}
          offset={-50}
          duration={500}
          className="ListItem"
          onClick={() => setShowMenu(false)}
        >
          Works
        </Link>

        {/* Clients */}
        <Link
          to="clients"
          activeClass="active"
          spy={true}
          smooth={true}
          offset={-50}
          duration={500}
          className="ListItem"
          onClick={() => setShowMenu(false)}
        >
          Clients
        </Link>

        {/* Contact */}
        <Link
          to="contact"
          activeClass="active"
          spy={true}
          smooth={true}
          offset={-50}
          duration={500}
          className="ListItem"
          onClick={() => setShowMenu(false)}
        >
          Contact
        </Link>

      </div>
    </nav>
  );
};

export default Navbar;
