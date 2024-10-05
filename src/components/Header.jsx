import React, { useState, useEffect } from 'react'
import { Link } from 'react-scroll'
import companyLogo from '../assets/companylogo.webp'
import './Header.css'

const Header = () => {
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.pageYOffset);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleHomeClick = (e) => {
    if (scrollPosition === 0) {
      e.preventDefault();
    }
  };

  return (
    <header style={headerStyle}>
      <div className="section-content" style={headerContentStyle}>
        <img 
          src={companyLogo}
          alt="Company Logo" 
          style={logoStyle}
        />
        <nav>
          <ul style={navListStyle}>
            <li>
              <Link 
                to="home" 
                smooth={true} 
                duration={500} 
                offset={0}
                spy={true}
                className="nav-link"
                activeClass="active"
                onClick={handleHomeClick}
              >
                Home
              </Link>
            </li>
            <li><Link to="services" smooth={true} duration={500} offset={-100} spy={true} className="nav-link" activeClass="active">Services</Link></li>
            <li><Link to="testimonials" smooth={true} duration={500} offset={-100} spy={true} className="nav-link" activeClass="active">Testimonials</Link></li>
            <li><Link to="gallery" smooth={true} duration={500} offset={-100} spy={true} className="nav-link" activeClass="active">Gallery</Link></li>
            <li><Link to="contact" smooth={true} duration={500} offset={-100} spy={true} className="contact-button">Contact</Link></li>
          </ul>
        </nav>
      </div>
    </header>
  )
}

const headerStyle = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  zIndex: 1000,
  height: 'var(--header-height)',
  backgroundColor: '#000000',
}

const headerContentStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  height: '100%',
  padding: '0 20px',
}

const logoStyle = {
  height: '80px',
  width: 'auto',
}

const navListStyle = {
  display: 'flex',
  listStyle: 'none',
  margin: 0,
  padding: 0,
}

export default Header