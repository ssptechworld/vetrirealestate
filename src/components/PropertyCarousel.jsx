import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import PropertyCard from './PropertyCard';

export default function PropertyCarousel({ properties = [] }) {
  const totalItems = properties ? properties.length : 0;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const timerRef = useRef(null);

  useEffect(() => {
    if (totalItems <= 1) return;
    timerRef.current = setInterval(() => {
      setIsTransitioning(true);
      setCurrentIndex((prev) => prev + 1);
    }, 5000);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [totalItems]);

  if (!properties || properties.length === 0) return null;

  // Triplicate properties array to create a seamless infinite loop in both directions
  const displayItems = [...properties, ...properties, ...properties];

  // Active dot index mapped to 0..totalItems-1
  const activeDot = ((currentIndex % totalItems) + totalItems) % totalItems;

  const handleNext = () => {
    setIsTransitioning(true);
    setCurrentIndex((prev) => prev + 1);
  };

  const handlePrev = () => {
    if (currentIndex === 0) {
      setIsTransitioning(false);
      setCurrentIndex(totalItems);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setIsTransitioning(true);
          setCurrentIndex(totalItems - 1);
        });
      });
    } else {
      setIsTransitioning(true);
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const handleDotClick = (targetIndex) => {
    setIsTransitioning(true);
    const currentBase = Math.floor(currentIndex / totalItems);
    setCurrentIndex(currentBase * totalItems + targetIndex);
  };

  const handleManualAction = (action) => {
    action();
    startAutoplay();
  };

  const handleTransitionEnd = (e) => {
    if (e.target !== e.currentTarget) return;

    if (currentIndex >= totalItems * 2) {
      setIsTransitioning(false);
      setCurrentIndex((prev) => prev % totalItems);
    }
  };

  return (
    <div className="relative w-full">
      {/* Carousel Track Container */}
      <div className="overflow-hidden w-full py-4 -my-4 px-1 -mx-1">
        <div
          className={`flex gap-8 [--cols:1] md:[--cols:2] lg:[--cols:3] ${
            isTransitioning ? '' : 'transition-none'
          }`}
          style={{
            transitionProperty: isTransitioning ? 'transform' : 'none',
            transitionDuration: isTransitioning ? '1000ms' : '0ms',
            transitionTimingFunction: 'cubic-bezier(0.25, 1, 0.5, 1)',
            transform: `translateX(calc(-${currentIndex} * (100% + 2rem) / var(--cols)))`,
          }}
          onTransitionEnd={handleTransitionEnd}
        >
          {displayItems.map((property, idx) => (
            <div
              key={`${property.id}-${idx}`}
              className="w-full md:w-[calc((100%-2rem)/2)] lg:w-[calc((100%-4rem)/3)] shrink-0"
            >
              <PropertyCard property={property} />
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Controls: Arrows */}
      {totalItems > 1 && (
        <>
          <button
            onClick={() => handleManualAction(handlePrev)}
            className="absolute -left-3 sm:-left-5 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white/95 backdrop-blur-md border border-stone-200 shadow-lg text-[#121417] hover:bg-[#121417] hover:text-[#C5A880] hover:border-[#121417] transition-all duration-300 flex items-center justify-center cursor-pointer group"
            aria-label="Previous Property"
          >
            <ChevronLeft className="w-5 h-5 transition-transform group-hover:-translate-x-0.5" />
          </button>

          <button
            onClick={() => handleManualAction(handleNext)}
            className="absolute -right-3 sm:-right-5 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white/95 backdrop-blur-md border border-stone-200 shadow-lg text-[#121417] hover:bg-[#121417] hover:text-[#C5A880] hover:border-[#121417] transition-all duration-300 flex items-center justify-center cursor-pointer group"
            aria-label="Next Property"
          >
            <ChevronRight className="w-5 h-5 transition-transform group-hover:translate-x-0.5" />
          </button>
        </>
      )}

      {/* Navigation Controls: Pagination Dots */}
      {totalItems > 1 && (
        <div className="flex items-center justify-center gap-2 mt-8">
          {properties.map((_, idx) => {
            const isActive = idx === activeDot;
            return (
              <button
                key={idx}
                onClick={() => handleManualAction(() => handleDotClick(idx))}
                className={`transition-all duration-500 rounded-full cursor-pointer ${
                  isActive
                    ? 'w-7 h-2 bg-[#C5A880] shadow-sm'
                    : 'w-2 h-2 bg-stone-300 hover:bg-[#C5A880]/60'
                }`}
                aria-label={`Go to property ${idx + 1}`}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}
