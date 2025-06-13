import React from "react";
import './skills.css';
import UIDesign from "../../assets/UIDesign.png";
import WebDesign from "../../assets/WebDesign.png";
import VidDesign from "../../assets/VidDesign.png";
import dirsub from "../../assets/dirsub.jpg";
import offpage from "../../assets/offpage.jpg";
import contntwrite from "../../assets/contntwrite.png";

const skillData = [
  {
    img: UIDesign,
    title: "Website Development",
    desc: (
      <>
        Previously developed website: <br />
        <a href="https://www.rokkabrothers.com" target="_blank" rel="noopener noreferrer">RokkaBrothers</a>
      </>
    )
  },
  {
    img: WebDesign,
    title: "App Design",
    desc: (
      <>
        Live on Play Store:<br />
        <a href="https://play.google.com/store/apps/details?id=com.chichii.online&hl=en_US" target="_blank" rel="noopener noreferrer">
          Chichii Online
        </a>
        <br />
        A fully functional food ordering app with modern UI/UX, Firebase integration, order tracking, and BLoC state management. Built using Flutter and deployed to production.
      </>
    )
  },
  {
    img: VidDesign,
    title: "Video Editing",
    desc: (
      <>
        Visit my YouTube: <br />
        <a href="https://www.youtube.com/channel/UCLysA-GNyeNdPo8MVcn1e-A" target="_blank" rel="noopener noreferrer">@samirbogati</a>
      </>
    )
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
        I am a passionate full-stack developer and UI/UX designer skilled in creating clean, responsive websites and applications. I specialize in React, Node.js, Flutter, Firebase, and SEO strategies to build solutions that are fast, modern, and scalable.
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
