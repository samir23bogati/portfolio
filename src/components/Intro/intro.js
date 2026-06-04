import { useEffect, useRef } from "react";
import "./intro.css";
import bg from "../../assets/bg.png";
import { Link } from "react-scroll";
import btnImg from "../../assets/btnImg.png";

/* Module-level flag: reset on browser refresh, survives route navigation */
let introAnimated = false;

const Intro = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    if (introAnimated) {
      /* Already animated this session — show final state instantly */
      section.classList.add("intro-done");
      return;
    }

    /* First mount after a page refresh — fire the staggered entrance */
    introAnimated = true;
    /* Slight delay so the page loader has started its exit */
    const t = setTimeout(() => {
      section.classList.add("intro-animate");
    }, 1700);

    return () => clearTimeout(t);
  }, []);

  return (
    <section id="intro" ref={sectionRef}>
      <div className="introContent">
        <span className="hello intro-el el-1">Hello,</span>
        <span className="introText intro-el el-2">
          I'm <span className="introName">Er. Samir Bogati</span>
          <br />
          Computer Engineer{" "}
          <p className="introPara intro-el el-3">
            Crafting scalable mobile &amp; web applications with modern technologies
            <br />and seamless user experiences.
          </p>
        </span>
        <Link to="contact" smooth={true} duration={500} offset={-50}>
          <button className="btn intro-el el-4">
            <img src={btnImg} alt="Hire ME" className="btnImg" />
            Contact Me
          </button>
        </Link>
      </div>
      <img src={bg} alt="Profile" className="bg intro-bg" />
    </section>
  );
};

export default Intro;
