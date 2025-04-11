import React from "react";
import './skills.css';
import UIDesign from "../../assets/UIDesign.png";
import WebDesign from "../../assets/WebDesign.jpg";
import VidDesign from "../../assets/VidDesign.jpg";
import dirsub from "../../assets/dirsub.jpg";
import offpage from "../../assets/offpage.jpg";
import contntwrite from "../../assets/contntwrite.png";
const skillData = [
  {
    img: UIDesign,
    title: "Website Development",
    desc: <>Previously developed website: <a href="https://www.rokkabrothers.com" target="_blank" rel="noopener noreferrer">RokkaBrothers</a></>
  },
  {
    img: WebDesign,
    title: "App Design",
    desc: <>Visit my GitHub to see some of my works: <a href="https://github.com/samir23bogati" target="_blank" rel="noopener noreferrer">@samir23bogati</a></>
  },
  {
    img: VidDesign,
    title: "Video Editing",
    desc: <>Visit my YouTube: <a href="https://www.youtube.com/channel/UCLysA-GNyeNdPo8MVcn1e-A" target="_blank" rel="noopener noreferrer">@samirbogati</a></>
  },
  {
    img: dirsub,
    title: "SEO Directory Submission",
    desc: "Exceptional results driving improved search engine rankings and increased visibility."
  },
  {
    img: offpage,
    title: "OFF Page SEO",
    desc: "Enhanced visibility and performance for your website through powerful off-page SEO."
  },
  {
    img: contntwrite,
    title: "SEO Content Writing",
    desc: "Original SEO-optimized content, zero plagiarism, maximum engagement."
  },
];

const Skills = () => {
  return (
    <section id='skills'>
      <h2 className="skillTitle">What do I do?</h2>
      <p className="skillDesc">
        I am a skilled and passionate web designer with experience in creating visually appealing and user-friendly websites.
        I have a strong understanding of design and a keen eye for detail. Proficient in HTML, CSS, JavaScript, React, Node, and Video Editing.
      </p>
      <div className="skillGrid">
        {skillData.map((skill, index) => (
          <div className="skillCard fadeInUp" key={index} style={{ animationDelay: `${index * 0.15}s` }}>
            <img src={skill.img} alt={skill.title} className="skillCardImg" />
            <div className="skillCardText">
              <h3>{skill.title}</h3>
              <p>{skill.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Skills;