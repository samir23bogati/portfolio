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

       
        <Link
          activeClass="active"
          to="works"       
          spy={true}
          smooth={true}
          offset={-50}
          duration={500}
          className="desktopMenuListItem"
        >
          Skills
        </Link>

        
        <Link
          activeClass="active"
          to="skills"     
          spy={true}
          smooth={true}
          offset={-50}
          duration={500}
          className="desktopMenuListItem"
        >
          Works
        </Link>

      
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

     
      <img
        src={Menu}
        alt="Menu Icon"
        className='mobMenu'
        onClick={() => setShowMenu(!showMenu)}
      />

     
      <div className={`navMenu ${showMenu ? 'show' : ''}`}>

      
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

       
        <Link
          to="works"    
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

       
        <Link
          to="skills"   
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
