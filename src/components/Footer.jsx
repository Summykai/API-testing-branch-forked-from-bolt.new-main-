import React from 'react'
import { Link } from 'react-scroll'

const Footer = () => {
  return (
    <footer style={footerStyle}>
      <div className="section-content" style={footerContentStyle}>
        <div>
          <h3 style={headingStyle}>Company Name</h3>
          <p>Your trusted business partner</p>
        </div>
        <div>
          <h3 style={headingStyle}>Quick Links</h3>
          <ul style={quickLinksStyle}>
            <li><Link to="home" smooth={true} duration={500} offset={-100} style={linkStyle}>Home</Link></li>
            <li><Link to="services" smooth={true} duration={500} offset={-100} style={linkStyle}>Services</Link></li>
            <li><Link to="testimonials" smooth={true} duration={500} offset={-100} style={linkStyle}>Testimonials</Link></li>
            <li><Link to="gallery" smooth={true} duration={500} offset={-100} style={linkStyle}>Gallery</Link></li>
            <li><Link to="contact" smooth={true} duration={500} offset={-100} style={linkStyle}>Contact</Link></li>
          </ul>
        </div>
        <div>
          <h3 style={headingStyle}>Contact Information</h3>
          <p>123 Business Street, Tracy, CA 95376</p>
          <p>Phone: (209) 123-4567</p>
          <p>Email: info@business.com</p>
        </div>
      </div>
    </footer>
  )
}

const footerStyle = {
  backgroundColor: 'var(--background-color-light)',
  color: 'var(--text-color-dark)',
  padding: '50px 0',
}

const footerContentStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  gap: '30px',
}

const headingStyle = {
  color: 'var(--text-color-dark)',
}

const quickLinksStyle = {
  listStyle: 'none',
  padding: 0,
}

const linkStyle = {
  color: 'var(--text-color-dark)',
  textDecoration: 'none',
  cursor: 'pointer',
}

export default Footer