import React from "react";
import "./works.css";
import rct from "../../assets/rct.png";
import html from "../../assets/html.png";
import css from "../../assets/css.png";
import js from "../../assets/js.png";
import node from "../../assets/node.png";
import github from "../../assets/github.png";
import flutter from "../../assets/flutter.jpg";

const Works = () => {
  return (
    <section id="works">
      <h2 className="workstitle">My Skills</h2>
      <span className="worksDesc">
        I am a Passionate Software Engineer with expertise in{" "}
        Web Development, Mobile Application Development, and Digital Creativity. 
        I specialize in React, Node.js,Dart,Flutter,MERN STACK ensuring highly 
        functional and visually appealing Websites.
        <br />
        <br />
        As an Android & Flutter developer, I create seamless, intuitive applications 
        that deliver great user experiences. My skill set also includes SEO Optimization, 
        helping businesses enhance their digital presence. Additionally, I have a strong 
        foundation in Video Editing, blending technology with creativity.
        <br />
        <br />
        Whether Designing Interfaces, Developing Full-Stack applications, or optimizing 
        online reach, I am committed to Innovation, Performance, and Excellence in 
        every project I undertake.
      </span>
      
      <div className="worksImgs">
        <img src={html} alt="html" className="worksImg" />
        <img src={css} alt="css" className="worksImg" />
        <img src={js} alt="js" className="worksImg" />
        <img src={rct} alt="react" className="worksImg" />
        <img src={node} alt="node" className="worksImg" />
        <img src={flutter} alt="flutter" className="worksImg" />
        <img src={github} alt="github" className="worksImg" />
      </div>
      <button className="workBtn">See More</button>
    </section>
  );
};
export default Works;
