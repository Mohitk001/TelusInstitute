import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/splide/dist/css/splide.min.css';
import { reviews } from '../.././components/assets/data/data';
import Quote from '../../blockquote.svg';
import './Testimonials.css';
import { useEffect, useState } from 'react';

const Testimonials = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize(); // Set initial value
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <section className="testimonials">
      <div className="testimonials__header">
        <h2 className="testimonials__title">Testimonial</h2>
        <p className="testimonials__subtitle">What members are saying.</p>
      </div>

      <div className="testimonials__slider-wrapper">
        <Splide
          options={{
            type: 'loop',
            perPage: 1,
            autoplay: true,
            interval: 5000,
            speed: 1000,
            rewind: true,
            arrows: !isMobile,
            pagination: isMobile,
            width: '100%',
            padding: isMobile ? '1rem' : '2rem',
          }}
          aria-label="Customer testimonials"
        >
          {reviews.map((review) => (
            <SplideSlide key={review.id} className="testimonials__slide">
              <div className="testimonials__card">
                <img 
                  className="testimonials__image" 
                  src={review.image} 
                  alt={review.name}
                  loading="lazy"
                />
                <div className="testimonials__content">
                  <img 
                    className="testimonials__quote-top" 
                    src={Quote} 
                    alt="Quote" 
                  />
                  <p className="testimonials__text">{review.text}</p>
                  <div className="testimonials__footer">
                    <div className="testimonials__rating">
                      {[...Array(5)].map((_, i) => (
                        <span 
                          key={i} 
                          className={`testimonials__star ${i < review.rating ? 'filled' : ''}`}
                        >
                          ★
                        </span>
                      ))}
                    </div>
                    <p className="testimonials__name">{review.name}</p>
                  </div>
                </div>
              </div>
            </SplideSlide>
          ))}
        </Splide>
      </div>
    </section>
  );
};

export default Testimonials;