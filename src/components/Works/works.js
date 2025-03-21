import React from "react";
import "./works.css";
import rct from "../../assets/rct.png";
import html from "../../assets/html.png";
import css from "../../assets/css.png";
import js from "../../assets/js.png";
import node from "../../assets/node.png";
import github from "../../assets/github.png";
import flutter from "../../assets/flutter.png";

const Works = () => {
  return (
    <section id="works">
      <h2 className="workstitle">My Skills</h2>
      <span className="worksDesc">
        I am a **versatile and passionate software engineer** with expertise in{" "}
        **web development, mobile application development, and digital creativity**. 
        I specialize in **HTML, CSS, JavaScript, React, and Node.js**, ensuring highly 
        functional and visually appealing websites.
        <br />
        <br />
        As an **Android & Flutter developer**, I create seamless, intuitive applications 
        that deliver great user experiences. My skill set also includes **SEO optimization**, 
        helping businesses enhance their digital presence. Additionally, I have a strong 
        foundation in **video editing**, blending technology with creativity.
        <br />
        <br />
        Whether designing interfaces, developing full-stack applications, or optimizing 
        online reach, I am committed to **innovation, performance, and excellence** in 
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
      <button className="workBtn" onClick={() => window.open("your-portfolio-link", "_blank")}>See More</button>
    </section>
  );
};
export default Works;
