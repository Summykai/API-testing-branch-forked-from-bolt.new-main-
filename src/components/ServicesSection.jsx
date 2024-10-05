import React from 'react'

const services = [
  { title: 'Service 1', description: 'Description of service 1. This service provides excellent value to our customers.', image: 'https://via.placeholder.com/300x200' },
  { title: 'Service 2', description: 'Description of service 2. Our team of experts ensures top-quality results.', image: 'https://via.placeholder.com/300x200' },
  { title: 'Service 3', description: 'Description of service 3. We use cutting-edge technology for optimal outcomes.', image: 'https://via.placeholder.com/300x200' },
]

const ServicesSection = () => {
  return (
    <section id="services" className="section">
      <div className="section-content">
        <h2 style={titleStyle}>Our Services</h2>
        <div style={servicesContainerStyle}>
          {services.map((service, index) => (
            <div key={index} style={serviceCardStyle}>
              <img src={service.image} alt={service.title} style={imageStyle} />
              <h3 style={serviceTitleStyle}>{service.title}</h3>
              <p style={descriptionStyle}>{service.description}</p>
              <a href="#" className="btn" style={buttonStyle}>Learn More</a>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

const titleStyle = {
  fontSize: '2.5rem',
  marginBottom: '30px',
  textAlign: 'center',
  color: 'var(--text-color-dark)',
}

const servicesContainerStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  gap: '20px',
  maxWidth: '1200px',
  margin: '0 auto',
}

const serviceCardStyle = {
  flex: '1 1 calc(33.333% - 20px)',
  maxWidth: 'calc(33.333% - 20px)',
  padding: '20px',
  border: '1px solid var(--text-color-dark)',
  borderRadius: '5px',
  textAlign: 'center',
  backgroundColor: 'rgba(255, 255, 255, 0.1)',
  color: 'var(--text-color-dark)',
  display: 'flex',
  flexDirection: 'column',
}

const imageStyle = {
  width: '100%',
  height: '200px',
  objectFit: 'cover',
  borderRadius: '5px',
  marginBottom: '15px',
}

const serviceTitleStyle = {
  fontSize: '1.5rem',
  marginBottom: '10px',
}

const descriptionStyle = {
  flex: '1',
  marginBottom: '15px',
}

const buttonStyle = {
  display: 'inline-block',
  padding: '10px 20px',
  backgroundColor: 'var(--primary-color)',
  color: 'white',
  textDecoration: 'none',
  borderRadius: '5px',
  alignSelf: 'center',
}

export default ServicesSection