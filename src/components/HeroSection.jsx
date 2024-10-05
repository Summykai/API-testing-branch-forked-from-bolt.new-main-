import React from 'react'
import { Link } from 'react-scroll'
import heroBackground from '../assets/Hero-Background.webp'

const HeroSection = () => {
  return (
    <section id="home" className="section hero-section" style={heroStyle}>
      <div className="section-content" style={contentStyle}>
        <h1 style={titleStyle}>Welcome to Our Business</h1>
        <p style={subtitleStyle}>We provide top-notch services for your needs</p>
        <div style={buttonContainerStyle}>
          <Link 
            to="services" 
            smooth={true} 
            duration={500} 
            offset={-100} 
            className="btn" 
            style={buttonStyle}
          >
            Our Services
          </Link>
          <Link 
            to="contact" 
            smooth={true} 
            duration={500} 
            offset={-100} 
            className="btn" 
            style={buttonStyle}
          >
            Get in Touch
          </Link>
        </div>
      </div>
    </section>
  )
}

const heroStyle = {
  backgroundImage: `url(${heroBackground})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
  height: 'calc(100vh - 100px)', // Subtract header height
  marginTop: '100px', // Add margin to account for header
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  position: 'relative',
}

const contentStyle = {
  textAlign: 'center',
  color: 'white',
  zIndex: 2,
  transform: 'translateY(-15%)', // Move content up slightly
}

const titleStyle = {
  fontSize: '3.5rem',
  marginBottom: '20px',
  textShadow: '2px 2px 4px rgba(0,0,0,0.5)', // Add text shadow for better visibility
}

const subtitleStyle = {
  fontSize: '1.4rem',
  marginBottom: '30px',
  fontWeight: 'bold', // Make subtitle text bold
  textShadow: '1px 1px 2px rgba(0,0,0,0.5)', // Add text shadow for better visibility
}

const buttonContainerStyle = {
  display: 'flex',
  justifyContent: 'center',
  gap: '20px', // Add space between buttons
}

const buttonStyle = {
  backgroundColor: 'red',
  color: 'white',
  padding: '12px 24px',
  borderRadius: '5px',
  textDecoration: 'none',
  fontWeight: 'bold',
  fontSize: '1.1rem',
  transition: 'background-color 0.3s ease',
  ':hover': {
    backgroundColor: 'darkred',
  },
}

export default HeroSection