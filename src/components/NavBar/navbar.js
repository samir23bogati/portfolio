import React, { useState, useEffect } from "react";
import './navbar.css';
import logo from '../../assets/logo.jpg';
import contactImg from '../../assets/contactImg.jpg';
import { Link as ScrollLink, scroller } from "react-scroll";
import { Link as RouterLink, useLocation, useNavigate } from "react-router-dom";
import Menu from '../../assets/menu.jpg';
import { useTheme } from '../../context/ThemeContext';

const SunIcon = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="5"/>
    <line x1="12" y1="1"  x2="12" y2="3"/>
    <line x1="12" y1="21" x2="12" y2="23"/>
    <line x1="4.22" y1="4.22"   x2="5.64"  y2="5.64"/>
    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
    <line x1="1"  y1="12" x2="3"  y2="12"/>
    <line x1="21" y1="12" x2="23" y2="12"/>
    <line x1="4.22" y1="19.78"  x2="5.64"  y2="18.36"/>
    <line x1="18.36" y1="5.64"  x2="19.78" y2="4.22"/>
  </svg>
);

const MoonIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="none">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
  </svg>
);

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      className={`themeToggle${isDark ? "" : " is-light"}`}
      onClick={toggleTheme}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      title={isDark ? "Switch to light mode" : "Switch to dark mode"}
    >
      {/* Sliding pill track */}
      <span className="tt-track">
        <span className="tt-thumb" />
      </span>
      {/* Icons */}
      <span className="tt-icons" aria-hidden="true">
        <span className="tt-sun"><SunIcon /></span>
        <span className="tt-moon"><MoonIcon /></span>
      </span>
    </button>
  );
};

const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const isHomePage = location.pathname === "/";

  useEffect(() => {
    if (isHomePage && location.state?.scrollTo) {
      scroller.scrollTo(location.state.scrollTo, {
        smooth: true, offset: -50, duration: 500,
      });
      window.history.replaceState({}, document.title);
    }
  }, [location, isHomePage]);

  const navItems = [
    { id: 'intro',    label: 'Intro'    },
    { id: 'works',    label: 'Skills'   },
    { id: 'skills',   label: 'Works'    },
    { id: 'products', label: 'Products' },
    { id: 'clients',  label: 'Clients'  },
  ];

  const handleMobileNavClick = (id) => {
    setShowMenu(false);
    if (!isHomePage) navigate('/', { state: { scrollTo: id } });
  };

  return (
    <nav className="navbar">
      <img src={logo} alt="Brand Logo" className="logo"
        onClick={() => navigate('/')} style={{ cursor: 'pointer' }} />

      <div className="desktopMenu">
        {navItems.map((item) =>
          isHomePage ? (
            <ScrollLink key={item.id} activeClass="active" to={item.id}
              spy smooth offset={-50} duration={500} className="desktopMenuListItem">
              {item.label}
            </ScrollLink>
          ) : (
            <span key={item.id} className="desktopMenuListItem"
              onClick={() => navigate('/', { state: { scrollTo: item.id } })}>
              {item.label}
            </span>
          )
        )}
        <RouterLink to="/blogs" className="desktopMenuListItem">Blogs</RouterLink>
      </div>

      {/* Right-side actions — always visible */}
      <div className="navbarActions">
        <ThemeToggle />

        <button className="desktopMenuBtn"
          onClick={() => {
            if (isHomePage) scroller.scrollTo('contact', { smooth: true, offset: -50, duration: 500 });
            else navigate('/', { state: { scrollTo: 'contact' } });
          }}>
          <img src={contactImg} alt="Contact Me" className="desktopMenuImg" />
          Contact Me
        </button>

        <img src={Menu} alt="Menu" className="mobMenu"
          onClick={() => setShowMenu(!showMenu)} />
      </div>

      {/* Mobile dropdown */}
      <div className={`navMenu ${showMenu ? 'show' : ''}`}>
        {navItems.map((item) =>
          isHomePage ? (
            <ScrollLink key={item.id} to={item.id} activeClass="active"
              spy smooth offset={-50} duration={500}
              className="ListItem" onClick={() => setShowMenu(false)}>
              {item.label}
            </ScrollLink>
          ) : (
            <span key={item.id} className="ListItem"
              onClick={() => handleMobileNavClick(item.id)}>
              {item.label}
            </span>
          )
        )}
        <RouterLink to="/blogs" className="ListItem" onClick={() => setShowMenu(false)}>
          Blogs
        </RouterLink>
        {isHomePage ? (
          <ScrollLink to="contact" activeClass="active" spy smooth offset={-50} duration={500}
            className="ListItem" onClick={() => setShowMenu(false)}>
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
