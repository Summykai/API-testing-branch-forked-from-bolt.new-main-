import React, { useState, useEffect } from 'react';

const TestimonialsSection = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch('/api/reviews'); // Fetch reviews from your backend API
        const data = await response.json();
        setReviews(data);
      } catch (error) {
        console.error('Error fetching reviews:', error);
      }
    };

    fetchReviews();
  }, []);

  return (
    <section id="testimonials" className="section">
      <div className="section-content">
        <h2 style={titleStyle}>What Our Clients Say</h2>
        <div style={testimonialsContainerStyle}>
          {reviews.map((testimonial, index) => (
            <div key={index} style={testimonialCardStyle}>
              <img src={testimonial.photo} alt={testimonial.name} style={photoStyle} />
              <h3 style={nameStyle}>{testimonial.name}</h3>
              <div style={ratingStyle}>
                {[...Array(5)].map((_, i) => (
                  <span key={i} style={{ color: i < testimonial.rating ? "#ffc107" : "#e4e5e9" }}>★</span>
                ))}
              </div>
              <p style={dateStyle}>{testimonial.date}</p>
              <p style={reviewTextStyle}>"{testimonial.text}"</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const titleStyle = {
  fontSize: '2.5rem',
  marginBottom: '30px',
  textAlign: 'center',
};

const testimonialsContainerStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  flexWrap: 'wrap',
  gap: '30px',
};

const testimonialCardStyle = {
  flex: '1 1 300px',
  maxWidth: '350px',
  padding: '20px',
  border: '1px solid #ddd',
  borderRadius: '10px',
  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  textAlign: 'center',
};

const photoStyle = {
  width: '100px',
  height: '100px',
  borderRadius: '50%',
  objectFit: 'cover',
  marginBottom: '15px',
};

const nameStyle = {
  fontSize: '1.2rem',
  fontWeight: 'bold',
  marginBottom: '5px',
};

const ratingStyle = {
  marginBottom: '10px',
  fontSize: '1.2rem',
};

const dateStyle = {
  fontSize: '0.9rem',
  color: '#666',
  marginBottom: '15px',
};

const reviewTextStyle = {
  fontSize: '1rem',
  lineHeight: '1.5',
  flex: 1,
};

export default TestimonialsSection;
