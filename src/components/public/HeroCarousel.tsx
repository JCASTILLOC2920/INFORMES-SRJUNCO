'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';

const images = [
  '/images/hero/5.jpg',
  '/images/hero/1.jpg',
  '/images/hero/2.jpg',
  '/images/hero/4.jpg'
];

export default function HeroCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  }, []);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [isPaused, nextSlide]);

  return (
    <div 
      className="relative w-full h-full overflow-hidden rounded-[2.2rem] group"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {images.map((src, index) => (
        <div
          key={src}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === currentIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'
          }`}
        >
          <Image
            src={src}
            alt={`Carrusel de Patología - Imagen ${index + 1}`}
            fill
            className="object-cover transition-transform duration-[10s] ease-linear scale-100 group-hover:scale-110"
            sizes="(max-width: 768px) 100vw, 50vw"
            priority={index === 0}
          />
        </div>
      ))}

      {/* Progress Indicators */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-3 z-20">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`h-1.5 transition-all duration-500 rounded-full ${
              index === currentIndex 
                ? 'w-10 bg-[var(--secondary)] shadow-[0_0_10px_rgba(var(--secondary-rgb),0.5)]' 
                : 'w-4 bg-white/40 hover:bg-white/60'
            }`}
            aria-label={`Ver imagen ${index + 1}`}
          />
        ))}
      </div>

      {/* Decorative Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none z-10" />
    </div>
  );
}
