import React, { useState, useEffect } from 'react';
import './gallery.css';

import img1 from './1.png';
import img2 from './2.png';
import img3 from './3.png';
import img4 from './4.png';
import img5 from './5.png';
import img6 from './6.png';

const images = [
  { src: img1, title: 'Innovative Ideas', description: 'Exploring creative approaches to technology.' },
  { src: img2, title: 'Team Collaboration', description: 'Working together to build something amazing.' },
  { src: img3, title: 'Modern Design', description: 'Clean and responsive UI components.' },
  { src: img4, title: 'Learning Environment', description: 'Education meets creativity.' },
  { src: img5, title: 'Focused Development', description: 'Writing better code, every day.' },
  { src: img6, title: 'Celebrating Success', description: 'Achievements and milestones together.' },
];

const Gallery = () => {
  const [activeIndex, setActiveIndex] = useState(3);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="gallery">
      <h2 className="gallery-title">Explore Our Creative Journey</h2>
      {/* <p className="gallery-subtitle">Click an image to learn more about what inspires us.</p> */}
      <section
        className="slider-container"
        style={{
          backgroundImage: `url(${images[activeIndex].src})`,
        }}
      >
        <div className="background-overlay"></div> {/* for grayscale overlay */}
        <div className="slider-images">
          {images.map((image, index) => (
            <div
              key={index}
              className={`slider-img ${activeIndex === index ? 'active' : ''}`}
              onClick={() => setActiveIndex(index)}
            >
              <img src={image.src} alt={`Gallery item ${index + 1}`} loading="lazy" />
              {activeIndex === index && (
                <div className="image-overlay">
                  <h3>{image.title}</h3>
                  <p>{image.description}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Gallery;
