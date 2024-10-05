import React from 'react';
import { FaFacebookSquare, FaYelp, FaGoogle, FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock } from 'react-icons/fa';

const ContactSection = () => {
  return (
    <section id="contact" className="section" style={sectionStyle}>
      <div className="section-content">
        <h2 style={titleStyle}>Get In Touch</h2>
        <p style={subtitleStyle}>We're Here To Assist You</p>
        <div style={contactContainerStyle}>
          <div style={formContainerStyle}>
            <form>
              <div style={inputGroupStyle}>
                <label htmlFor="name" style={labelStyle}>Name <span style={requiredStyle}>*</span></label>
                <input type="text" id="name" placeholder="Jane Smith" style={inputStyle} required />
              </div>
              <div style={inputGroupStyle}>
                <label htmlFor="email" style={labelStyle}>Email address <span style={requiredStyle}>*</span></label>
                <input type="email" id="email" placeholder="email@website.com" style={inputStyle} required />
              </div>
              <div style={inputGroupStyle}>
                <label htmlFor="phone" style={labelStyle}>Phone number <span style={requiredStyle}>*</span></label>
                <input type="tel" id="phone" placeholder="555-555-5555" style={inputStyle} required />
              </div>
              <div style={inputGroupStyle}>
                <label htmlFor="message" style={labelStyle}>Message</label>
                <textarea id="message" placeholder="Type your message here..." style={textareaStyle} rows="5"></textarea>
              </div>
              <div style={checkboxContainerStyle}>
                <input type="checkbox" id="consent" style={checkboxStyle} required />
                <label htmlFor="consent" style={checkboxLabelStyle}>
                  I allow this website to store my submission so they can respond to my inquiry. <span style={requiredStyle}>*</span>
                </label>
              </div>
              <button type="submit" style={submitButtonStyle}>Submit</button>
            </form>
          </div>
          <div style={infoContainerStyle}>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d169801.51894330498!2d-121.29725704838128!3d37.73978106091031!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sus!4v1728114715489!5m2!1sen!2sus"
              width="100%"
              height="300"
              style={mapStyle}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
            <div style={contactInfoStyle}>
              <h3 style={infoTitleStyle}>Contact Information</h3>
              <p><FaMapMarkerAlt /> 3141 Washington Ave, Tracy, CA 95376</p>
              <p><FaPhone /> (209) 123-4567</p>
              <p><FaEnvelope /> info@business.com</p>
              <p><FaClock /> Mon-Fri: 9:00am - 5:00pm</p>
              <div style={socialIconsStyle}>
                <FaFacebookSquare style={iconStyle} />
                <FaYelp style={iconStyle} />
                <FaGoogle style={iconStyle} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const sectionStyle = {
  backgroundColor: '#000000',
  color: '#ffffff',
  padding: '50px 0',
};

const titleStyle = {
  fontSize: '2.5rem',
  marginBottom: '10px',
  textAlign: 'center',
};

const subtitleStyle = {
  fontSize: '1.2rem',
  marginBottom: '30px',
  textAlign: 'center',
};

const contactContainerStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  flexWrap: 'wrap',
};

const formContainerStyle = {
  flex: '1 1 45%',
  marginRight: '5%',
};

const inputGroupStyle = {
  marginBottom: '20px',
};

const labelStyle = {
  fontSize: '0.875rem',
  fontStyle: 'normal',
  fontFamily: '"Gentium Book Basic", serif',
  fontWeight: 600,
  lineHeight: 1.25,
  letterSpacing: '0px',
  textTransform: 'none',
  display: 'block',
  margin: '0 0 5px',
  color: '#ffffff',
};

const inputStyle = {
  width: '100%',
  padding: '10px',
  backgroundColor: '#000000',
  border: '1px solid #333',
  borderRadius: '4px',
  color: '#cccccc',
};

const textareaStyle = {
  ...inputStyle,
  resize: 'vertical',
};

const checkboxContainerStyle = {
  display: 'flex',
  alignItems: 'center',
  marginBottom: '20px',
};

const checkboxStyle = {
  marginRight: '10px',
};

const checkboxLabelStyle = {
  fontSize: '0.9rem',
  fontFamily: '"Gentium Book Basic", serif',
};

const submitButtonStyle = {
  backgroundColor: '#ff0000',
  color: 'white',
  padding: '10px 20px',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
  fontSize: '1rem',
  fontWeight: 'bold',
};

const infoContainerStyle = {
  flex: '1 1 45%',
};

const mapStyle = {
  border: '0',
  width: '100%',
  height: '300px',
  marginBottom: '20px',
};

const contactInfoStyle = {
  backgroundColor: '#333',
  padding: '20px',
  borderRadius: '4px',
};

const infoTitleStyle = {
  fontSize: '1.5rem',
  marginBottom: '15px',
};

const socialIconsStyle = {
  display: 'flex',
  justifyContent: 'flex-start',
  marginTop: '20px',
};

const iconStyle = {
  fontSize: '24px',
  marginRight: '15px',
  cursor: 'pointer',
};

const requiredStyle = {
  color: '#ff0000',
};

export default ContactSection;