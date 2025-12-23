import React, { useState, useEffect } from "react";
import './navbar.css';
import logo from '../../assets/logo.jpg';
import contactImg from '../../assets/contactImg.jpg';
import { Link as ScrollLink, scroller } from "react-scroll";
import { Link as RouterLink, useLocation, useNavigate } from "react-router-dom";

import Menu from '../../assets/menu.jpg';

const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const isHomePage = location.pathname === "/";

  // Handle scroll after navigation from another page
  useEffect(() => {
    if (isHomePage && location.state?.scrollTo) {
        scroller.scrollTo(location.state.scrollTo, {
            smooth: true,
            offset: -50,
            duration: 500,
        });
        // Clear state to prevent scroll on refresh (optional but good practice)
        window.history.replaceState({}, document.title);
    }
  }, [location, isHomePage]);

  const navItems = [
    { id: 'intro', label: 'Intro' },
    { id: 'works', label: 'Skills' }, // Preserving existing ID 'works' for label 'Skills'
    { id: 'skills', label: 'Works' }, // Preserving existing ID 'skills' for label 'Works'
    { id: 'clients', label: 'Clients' }
  ];

  const handleMobileNavClick = (id) => {
    setShowMenu(false);
    if (!isHomePage) {
        navigate('/', { state: { scrollTo: id } });
    }
  };

  return (
    <nav className="navbar">
      <img src={logo} alt="Brand Logo" className='logo' onClick={() => navigate('/')} style={{cursor: 'pointer'}} />

      <div className="desktopMenu">
        {navItems.map((item) => (
            isHomePage ? (
                <ScrollLink
                    key={item.id}
                    activeClass="active"
                    to={item.id}
                    spy={true}
                    smooth={true}
                    offset={-50}
                    duration={500}
                    className="desktopMenuListItem"
                >
                    {item.label}
                </ScrollLink>
            ) : (
                <span 
                    key={item.id} 
                    className="desktopMenuListItem" 
                    onClick={() => navigate('/', { state: { scrollTo: item.id } })}
                >
                    {item.label}
                </span>
            )
        ))}

        <RouterLink to="/blogs" className="desktopMenuListItem">
          Blogs
        </RouterLink>
      </div>

     
      <button 
        className="desktopMenuBtn"
        onClick={() => {
            if (isHomePage) {
                scroller.scrollTo('contact', { smooth: true, offset: -50, duration: 500 });
            } else {
                navigate('/', { state: { scrollTo: 'contact' } });
            }
        }}
      >
        <img src={contactImg} alt="Contact Me" className="desktopMenuImg" />
        Contact Me
      </button>

     
      <img
        src={Menu}
        alt="Menu Icon"
        className='mobMenu'
        onClick={() => setShowMenu(!showMenu)}
      />

     
      <div className={`navMenu ${showMenu ? 'show' : ''}`}>
        {navItems.map((item) => (
            isHomePage ? (
                <ScrollLink
                    key={item.id}
                    to={item.id}
                    activeClass="active"
                    spy={true}
                    smooth={true}
                    offset={-50}
                    duration={500}
                    className="ListItem"
                    onClick={() => setShowMenu(false)}
                >
                    {item.label}
                </ScrollLink>
            ) : (
                <span 
                    key={item.id}
                    className="ListItem"
                    onClick={() => handleMobileNavClick(item.id)}
                >
                    {item.label}
                </span>
            )
        ))}

        <RouterLink to="/blogs" className="ListItem" onClick={() => setShowMenu(false)}>
            Blogs
        </RouterLink>

        {isHomePage ? (
            <ScrollLink
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
            </ScrollLink>
        ) : (
            <span className="ListItem" onClick={() => handleMobileNavClick('contact')}>
                Contact
            </span>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
