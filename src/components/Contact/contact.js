import React, { useRef } from 'react';
import './contact.css';
import cdt from '../../assets/cdt.png';
import cognifyz from '../../assets/cognifyz.png';
import rokka from '../../assets/rokka.png';
import codsoft from '../../assets/codsoft.png';
import Sale247 from '../../assets/sale247.jpg';
import chichii from '../../assets/chichii.png';
import FacebookIcon from '../../assets/fbicon.png';
import InstagramIcon from '../../assets/igicon.png';
import LinkedinIcon from '../../assets/linkedinicon.png';
import YoutubeIcon from '../../assets/yticon.png';
import emailjs from '@emailjs/browser';

const Contact = () => {
    const form = useRef();
    
    const sendEmail = (e) => {
        e.preventDefault();
        emailjs.sendForm('service_jgd6hky', 'template_fza9pby', form.current, 'UGfAxnA7FLZgNdyBC')
            .then((result) => {
                console.log(result.text);
                alert('Email Sent!');
                e.target.reset(); 
            }, (error) => {
                console.error('Failed to send email', error); 
                alert('Failed to send email, please try again later.');
            });
    };

    return (
        <section id="contactPage">
        <div id="clients" className="fade-in">
          <h1 className="contactPageTitle">My Clients</h1>
          <p className="clientDesc">
            I’ve had the opportunity to work with a diverse group of companies. Some notable ones include:
          </p>
          <div className="clientImgs">
            <a href="https://www.rokkabrothers.com" target="_blank" rel="noopener noreferrer">
              <img src={rokka} alt="rokka" className="clientImg" />
            </a>
            <a href="https://sale247.netlify.app/" target="_blank" rel="noopener noreferrer">
              <img src={Sale247} alt="Sale247" className="clientImg" />
            </a>
            <a href="https://chichii.online/" target="_blank" rel="noopener noreferrer">
              <img src={chichii} alt="chichii" className="clientImg" />
            </a>
            <img src={cognifyz} alt="cognifyz" className="clientImg" />
            <img src={cdt} alt="cherie" className="clientImg" />
            <img src={codsoft} alt="codsoft" className="clientImg" />
          </div>
        </div>
  
        <div id="contact" className="fade-in">
          <h1 className="contactPageTitle">Contact Me</h1>
          <span className="contactDesc">Let’s connect! Fill out the form to discuss work or opportunities.</span>
          <form className="contactForm" ref={form} onSubmit={sendEmail}>
            <input type="text" className="name" placeholder="Your Name" name="your_name" required />
            <input type="email" className="email" placeholder="Your Email" name="your_email" required />
            <textarea className="msg" name="message" rows="5" placeholder="Your Message" required></textarea>
            <button type="submit" className="submitBtn">Submit</button>
            <div className="links">
              <a href="https://www.facebook.com/Snookysamir/" target="_blank" rel="noopener noreferrer">
                <img src={FacebookIcon} alt="Facebook" className="link hover-bounce" />
              </a>
              <a href="https://www.instagram.com/samirbogati/" target="_blank" rel="noopener noreferrer">
                <img src={InstagramIcon} alt="Instagram" className="link hover-bounce" />
              </a>
              <a href="https://www.linkedin.com/in/samir-bogati-62bb04165/" target="_blank" rel="noopener noreferrer">
                <img src={LinkedinIcon} alt="Linkedin" className="link hover-bounce" />
              </a>
              <a href="https://www.youtube.com/@samirbogati4451" target="_blank" rel="noopener noreferrer">
                <img src={YoutubeIcon} alt="Youtube" className="link hover-bounce" />
              </a>
            </div>
          </form>
        </div>
      </section>
    );
  };
  
  export default Contact;