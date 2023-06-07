import React, { useState } from 'react';
import { SliderData } from './SliderData';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

const ImageSlider = ({ slides }) => {
  const [current, setCurrent] = useState(0);
  const length = slides.length;

  const nextSlide = () => {
    setCurrent(current === length - 1 ? 0 : current + 1);
  };

  const prevSlide = () => {
    setCurrent(current === 0 ? length - 1 : current - 1);
  };

  if (!Array.isArray(slides) || slides.length === 0) {
    return null;
  }

  return (
    <div className="slider">
      <button className="prev-btn" onClick={prevSlide}>
        <FiChevronLeft />
      </button>

      {slides.map((slide, index) => (
        <div
          className={index === current ? 'slide active' : 'slide'}
          key={index}
        >
          {index === current && (
            <img src={slide.image} alt='travel image' className='image' />
          )}
        </div>
      ))}

      <button className="next-btn" onClick={nextSlide}>
        <FiChevronRight />
      </button>
    </div>
  );
};

export default ImageSlider;