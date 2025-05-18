/* eslint-disable jsx-a11y/iframe-has-title */
import React, { useEffect } from 'react';
import './Contact.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faPhone, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import { faFacebook, faTwitter, faInstagram, faLinkedin } from '@fortawesome/free-brands-svg-icons';

const Contact = () => {
  useEffect(() => {
    // Animation for contact items
    const contactItems = document.querySelectorAll('.contact-item');
    contactItems.forEach((item, index) => {
      item.style.animationDelay = `${index * 0.1}s`;
      item.classList.add('animate');
    });
  }, []);

  return (
    <div className="contact-container">
      <div className="overlay"></div>
      <div className="container">
        <h1 className="title">Contact Us</h1>
        <p className="subtitle">We'd love to hear from you</p>

        <div className="contact-grid">
          {/* Contact Information */}
          <div className="contact-info">
            <div className="contact-item">
              <div className="icon-circle">
                <FontAwesomeIcon icon={faPhone} className="contact-icon" />
              </div>
              <div className="contact-text">
                <h3>Phone</h3>
                <p>+91 79733 88650</p>
              </div>
            </div>

            <div className="contact-item">
              <div className="icon-circle">
                <FontAwesomeIcon icon={faEnvelope} className="contact-icon" />
              </div>
              <div className="contact-text">
                <h3>Email</h3>
                <p>Telusinstitute@gmail.com</p>
              </div>
            </div>

            <div className="contact-item">
              <div className="icon-circle">
                <FontAwesomeIcon icon={faMapMarkerAlt} className="contact-icon" />
              </div>
              <div className="contact-text">
                <h3>Address</h3>
                <p>
                  TelusInstitute <br />
                  Street No 05, Dagana Rd, near Ramgarhia Chowk, <br />
                  Labh Nagar, Subhash Nagar, Hoshiarpur, <br />
                  Punjab - 146001, India
                </p>
              </div>
            </div>

            <div className="social-links">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="Facebook">
                <FontAwesomeIcon icon={faFacebook} />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="Twitter">
                <FontAwesomeIcon icon={faTwitter} />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="Instagram">
                <FontAwesomeIcon icon={faInstagram} />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="LinkedIn">
                <FontAwesomeIcon icon={faLinkedin} />
              </a>
            </div>
          </div>

          {/* Map Section */}
          <div className="map-container">
            <div className="map-wrapper">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3400.7663198358628!2d75.89119969603107!3d31.53057747871332!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x391afd668f24d407%3A0xfa9ba4877f17c3e2!2sTelus%20Institute%20%7C%20Computer%20Training%20Center%20%7C%20Basic%20Computer%20%7C%20Tally%20%7C%20Advance%20Excel%20%7C%20Spoken%20English%20Course%20in%20Hoshiarpur.!5e0!3m2!1sen!2sin!4v1727327979051!5m2!1sen!2sin" 
                width="100%" 
                height="100%" 
                style={{ border: '0' }} 
                allowFullScreen 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;