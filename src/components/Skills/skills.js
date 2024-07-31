import React from "react";
import './skills.css';
import UIDesign from "../../assets/UIDesign.png";
import WebDesign from "../../assets/WebDesign.jpg";
import VidDesign from "../../assets/VidDesign.jpg";
import dirsub from "../../assets/dirsub.jpg";
import offpage from "../../assets/offpage.jpg";
import contntwrite from "../../assets/contntwrite.png";
const Skills = () => {
  return (
    <section id='skills'>
      <span className="skillTitle">What do I do?</span><br/>
      <span className="skillDesc">
        I am a skilled and passionate web designer with experience in creating visually appealing and user-friendly websites. 
        I have a strong understanding of design and a keen eye for detail. I am proficient in HTML, CSS, JavaScript, React, 
        Node, as well as Video Editing.
      </span>
      <div className="skillBars">
        <div className="skillBar">
          <img src={UIDesign} alt="UIDesign" className="skillBarImg"/>
          <div className="skillBarText">
            <h2>Website Development</h2>
            <p>Previously developed website: 
              <a href="https://www.rokkabrothers.com" target="_blank" rel="noopener noreferrer"> RokkaBrothers</a>
            </p>
          </div>
        </div>
        <div className="skillBar">
          <img src={WebDesign} alt="WebDesign" className="skillBarImg"/>
          <div className="skillBarText">
            <h2>App Design</h2>
            <p>Visit my GitHub to see some of my works: 
              <a href="https://github.com/samir23bogati" target="_blank" rel="noopener noreferrer"> @samir23bogati</a>
            </p>
          </div>
        </div>
        <div className="skillBar">
          <img src={VidDesign} alt="VidDesign" className="skillBarImg"/>
          <div className="skillBarText">
            <h2>Video Editing</h2>
            <p>Visit my YouTube to see more of my works: 
              <a href="https://www.youtube.com/channel/UCLysA-GNyeNdPo8MVcn1e-A" target="_blank" rel="noopener noreferrer"> @samirbogati</a>
            </p>
          </div>
        </div>
        <div className="skillBar">
          <img src={dirsub} alt="VidDesign" className="skillBarImg"/>
          <div className="skillBarText">
            <h2>SEO Directory Submission</h2>
            <p>As a premier freelancer in SEO directory submission, I will provide exceptional results in line with your requirements and contract specifications, driving improved search engine rankings and increased online visibility for your business. </p>
          </div>
        </div>
        <div className="skillBar">
          <img src={offpage} alt="VidDesign" className="skillBarImg"/>
          <div className="skillBarText">
            <h2>OFF Page SEO</h2>
            <p>As a top freelancer specializing in off-page SEO, I will deliver outstanding results tailored to your specific requirements and contract specifications, ensuring enhanced visibility and performance for your website. </p>
          </div>
        </div>
        <div className="skillBar">
          <img src={contntwrite} alt="VidDesign" className="skillBarImg"/>
          <div className="skillBarText">
            <h2>SEO Content Writing</h2>
            <p>I will deliver 100% original SEO-optimized content tailored to your requirements and contract specifications, ensuring zero plagiarism and maximum engagement.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Skills;
