import React, { useState, useEffect } from 'react'
import Header from './components/Header'
import HeroSection from './components/HeroSection'
import ServicesSection from './components/ServicesSection'
import TestimonialsSection from './components/TestimonialsSection'
import Gallery from './components/Gallery'
import ContactSection from './components/ContactSection'
import Footer from './components/Footer'

function App() {
  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0 && !hasScrolled) {
        setHasScrolled(true);
      } else if (window.scrollY === 0 && hasScrolled) {
        setHasScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [hasScrolled]);

  return (
    <div className="App">
      <Header />
      <HeroSection />
      <div style={{ display: hasScrolled ? 'block' : 'none' }}>
        <ServicesSection />
        <TestimonialsSection />
        <Gallery />
        <ContactSection />
      </div>
      <Footer />
    </div>
  )
}

export default App