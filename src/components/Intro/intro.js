import React from "react";
import "./intro.css";
import bg from "../../assets/bg.png";
import { Link } from "react-scroll";
import btnImg from "../../assets/btnImg.png";
const Intro = () => {
  return (
    <section id="intro">
      <div className="introContent">
        <span className="hello">Hello,</span>
        <span className="introText">
          I'm <span className="introName">Samir Bogati</span>
          <br />
          Computer Engineer{" "}
          <p className="introPara">
            Enthusiastic Computer Engineering Student.
            <br /> Eager to Learn And Develop Skills As Full Stack Developer.
          </p>
        </span>
       <Link
          to="contact"          // id of the target section
          smooth={true}         // smooth scrolling
          duration={500}        // animation duration in ms
          offset={-50}          // optional: adjust for sticky navbar
        >
          <button className="btn">
            <img src={btnImg} alt="Hire ME" className="btnImg" />
            Hire Me
          </button>
        </Link>
      </div>
      <img src={bg} alt="Profile" className="bg" />
    </section>
  );
};
export default Intro;
