import React, { useRef } from 'react';
import './contact.css';
import cdt from '../../assets/cdt.png';
import cognifyz from '../../assets/cognifyz.png';
import rokka from '../../assets/rokka.png';
import codsoft from '../../assets/codsoft.png';
import Sale247 from '../../assets/sale247.jpg';
import chichii from '../../assets/chichii.png';
import emailjs from '@emailjs/browser';

const FacebookIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
  </svg>
);

const InstagramIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" strokeWidth="3"/>
  </svg>
);

const LinkedinIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
    <rect x="2" y="9" width="4" height="12"/>
    <circle cx="4" cy="4" r="2"/>
  </svg>
);

const YoutubeIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.95A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/>
    <polygon fill="currentColor" stroke="none" points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02"/>
  </svg>
);

const SOCIALS = [
  {
    key: 'fb',
    label: 'Facebook',
    url: 'https://www.facebook.com/Snookysamir/',
    Icon: FacebookIcon,
  },
  {
    key: 'ig',
    label: 'Instagram',
    url: 'https://www.instagram.com/samirbogati/',
    Icon: InstagramIcon,
  },
  {
    key: 'li',
    label: 'LinkedIn',
    url: 'https://www.linkedin.com/in/er-samir-bogati-62bb04165/',
    Icon: LinkedinIcon,
  },
  {
    key: 'yt',
    label: 'YouTube',
    url: 'https://www.youtube.com/@samirbogati4451',
    Icon: YoutubeIcon,
  },
];

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
          I've had the opportunity to work with a diverse group of companies. Some notable ones include:
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
        <span className="contactDesc">Let's connect! Fill out the form to discuss work or opportunities.</span>
        <form className="contactForm" ref={form} onSubmit={sendEmail}>
          <input type="text" className="name" placeholder="Your Name" name="your_name" required />
          <input type="email" className="email" placeholder="Your Email" name="your_email" required />
          <textarea className="msg" name="message" rows="5" placeholder="Your Message" required></textarea>
          <button type="submit" className="submitBtn">Submit</button>
        </form>

        <div className="socialSection">
          <p className="socialHeading">Find me on</p>
          <div className="socialLinks">
            {SOCIALS.map(({ key, label, url, Icon }, i) => (
              <a
                key={key}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className={`socialBtn social-${key}`}
                style={{ animationDelay: `${i * 0.08}s` }}
              >
                <span className="socialIcon"><Icon /></span>
                <span className="socialLabel">{label}</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
