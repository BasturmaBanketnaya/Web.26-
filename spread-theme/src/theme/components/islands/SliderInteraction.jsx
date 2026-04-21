import React, { useCallback, useEffect, useRef, useState } from 'react';
import './SliderInteraction.css';

export default function SliderInteraction({ children }) {
  const trackRef = useRef(null);
  const [offset, setOffset] = useState(0);
  const [maxOffset, setMaxOffset] = useState(0);

  const measure = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    const scrollWidth = track.scrollWidth;
    const viewWidth = track.parentElement?.clientWidth || track.clientWidth;
    setMaxOffset(Math.max(0, scrollWidth - viewWidth));
  }, []);

  useEffect(() => {
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, [measure]);

  const slideBy = useCallback(
    (direction) => {
      const step = 400;
      setOffset((prev) => {
        let next = prev + direction * step;
        if (next > maxOffset) next = 0;
        if (next < 0) next = maxOffset;
        return next;
      });
    },
    [maxOffset]
  );

  useEffect(() => {
    const prevBtn = document.querySelector('.stories-slider__nav-btn--prev');
    const nextBtn = document.querySelector('.stories-slider__nav-btn--next');
    const handlePrev = () => slideBy(-1);
    const handleNext = () => slideBy(1);

    prevBtn?.addEventListener('click', handlePrev);
    nextBtn?.addEventListener('click', handleNext);

    return () => {
      prevBtn?.removeEventListener('click', handlePrev);
      nextBtn?.removeEventListener('click', handleNext);
    };
  }, [slideBy]);

  return (
    <div className="slider-interaction">
      <div
        className="slider-interaction__track-wrapper"
        ref={trackRef}
        style={{ transform: `translateX(-${offset}px)` }}
      >
        {children}
      </div>
    </div>
  );
}
