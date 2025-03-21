import React from "react";
import './works.css';
import rct from'../../assets/rct.png';
import html from "../../assets/html.png";
import css from "../../assets/css.png";
import js from "../../assets/js.png";
import node from "../../assets/node.png";
import github from "../../assets/github.png";
import flutter from "../../assets/flutter.jpg";

const Works = () => {
  return (
    <section id='works'>
        <h2 className="workstitle">My Skills</h2>
        <span className="worksDesc">I take pride in paying attention to the smallest details and making sure that my work is perfect. I am excited to bring my skills and experience to help business achieve their goals and create a strong online presence. </span>
      <div className="worksImgs">
        <img src={html} alt="html" className="worksImg"/>
        <img src={css} alt="css" className="worksImg"/>
        <img src={js} alt="js" className="worksImg"/>
        <img src={rct} alt="react" className="worksImg"/>
        <img src={node} alt="node" className="worksImg"/>
        <img src={flutter} alt="node" className="worksImg"/>
        <img src={github} alt="github" className="worksImg"/>
      </div>
      <button className="workBtn">See More</button>
    </section>
  )
}
export default Works;