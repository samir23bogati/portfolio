import React, { useRef } from 'react';
import './contact.css';
import cdt from '../../assets/cdt.png';
import cognifyz from '../../assets/cognifyz.png';
import rokka from '../../assets/rokka.png';
import codsoft from '../../assets/codsoft.png';
import FacebookIcon from '../../assets/fbicon.png';
import InstagramIcon from '../../assets/igicon.png';
import LinkedinIcon from '../../assets/linkedinicon.png';
import YoutubeIcon from '../../assets/yticon.png';
import emailjs from '@emailjs/browser';

const Contact = () => {
    const form = useRef();
    
    const sendEmail = (e) => {
        e.preventDefault();
        console.log('Send email function called');
        emailjs.sendForm('service_jgd6hky', 'template_fza9pby', form.current, 'E96jxSkDoQ8KGI72h')
            .then((result) => {
                console.log(result.text);
                alert('Email Sent!');
                e.target.reset(); // Clear the form after sending
            }, (error) => {
                console.error('Failed to send email', error); // Log the entire error object
                alert('Failed to send email, please try again later.');
            });
    };

    return (
        <section id='contactPage'>
            <div id='clients'>
                <h1 className='contactPageTitle'>My Clients</h1>
                <p className='clientDesc'>
                    I have had the opportunity to work with a diverse group of companies. Some of the notable companies I have worked with include:
                </p>
                <div className='clientImgs'>
                <a href="https://www.rokkabrothers.com" target="_blank" rel="noopener noreferrer">
                <img src={rokka} alt="rokka" className='clientImg'/>
    </a>
                   
                    <img src={cognifyz} alt="cognifyz" className='clientImg'/>
                    <img src={cdt} alt="cherie" className='clientImg'/>
                    <img src={codsoft} alt="codsoft" className='clientImg'/>
                </div>
            </div>
            <div id='contact'>
                <h1 className='contactPageTitle'>Contact Me</h1>
                <span className='contactDesc'>Please fill out the form below to discuss any work opportunities</span>
                <form className='contactForm' ref={form} onSubmit={sendEmail}>
                    <input type="text" className='name' placeholder='Your Name' name='your_name'/>
                    <input type="email" className='email' placeholder='Your Email' name='your_email'/>
                    <textarea className="msg" name="message" rows="5" placeholder='Your Message'></textarea>
                    <button type='submit' value='send' className='submitBtn'>Submit</button>
                    <div className='links'>
                        <a href="https://www.facebook.com/Snookysamir/" target="_blank" rel="noopener noreferrer">
      <img src={FacebookIcon} alt="Facebook" className="link" />
    </a>
    <a href="https://www.instagram.com/samirbogati/" target="_blank" rel="noopener noreferrer">
    <img src={InstagramIcon} alt="Instagram" className='link' />
    </a>
    <a href="https://www.linkedin.com/in/samir-bogati-62bb04165/" target="_blank" rel="noopener noreferrer">
    <img src={LinkedinIcon} alt="Linkedin" className='link' />
    </a>
    <a href="https://www.youtube.com/@samirbogati4451" target="_blank" rel="noopener noreferrer">
    <img src={YoutubeIcon} alt="Youtube" className='link' />
    </a>
                        
                      
                    </div>
                </form>
            </div>
        </section>
    );
}

export default Contact;
