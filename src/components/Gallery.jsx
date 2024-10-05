import React, { useState } from 'react';

const Gallery = () => {
  const images = [
    { src: 'https://via.placeholder.com/300x200?text=Project+1', alt: 'Project 1' },
    { src: 'https://via.placeholder.com/300x200?text=Project+2', alt: 'Project 2' },
    { src: 'https://via.placeholder.com/300x200?text=Project+3', alt: 'Project 3' },
    { src: 'https://via.placeholder.com/300x200?text=Project+4', alt: 'Project 4' },
    { src: 'https://via.placeholder.com/300x200?text=Project+5', alt: 'Project 5' },
    { src: 'https://via.placeholder.com/300x200?text=Project+6', alt: 'Project 6' },
    { src: 'https://via.placeholder.com/300x200?text=Project+7', alt: 'Project 7' },
    { src: 'https://via.placeholder.com/300x200?text=Project+8', alt: 'Project 8' },
    { src: 'https://via.placeholder.com/300x200?text=Project+9', alt: 'Project 9' },
  ];

  const [currentPage, setCurrentPage] = useState(0);
  const imagesPerPage = 3;

  const totalPages = Math.ceil(images.length / imagesPerPage);
  const startIndex = currentPage * imagesPerPage;
  const visibleImages = images.slice(startIndex, startIndex + imagesPerPage);

  const nextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages - 1));
  };

  const prevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 0));
  };

  return (
    <section id="gallery" className="section">
      <div className="section-content">
        <h2 style={titleStyle}>Our Gallery</h2>
        <div className="gallery-grid">
          {visibleImages.map((image, index) => (
            <div key={index} className="gallery-item">
              <img src={image.src} alt={image.alt} />
            </div>
          ))}
        </div>
        <div className="gallery-navigation">
          <button onClick={prevPage} disabled={currentPage === 0}>Previous</button>
          <button onClick={nextPage} disabled={currentPage === totalPages - 1}>Next</button>
        </div>
      </div>
    </section>
  );
};

const titleStyle = {
  fontSize: '2.5rem',
  marginBottom: '30px',
  textAlign: 'center',
  color: 'var(--text-color-dark)',
};

export default Gallery;