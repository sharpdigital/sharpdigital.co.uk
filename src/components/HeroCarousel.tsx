'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

interface Slide {
  title: string;
  subtitle: string;
  description: string;
  color: string;
  gradientFrom: string;
  gradientTo: string;
  icon: React.ReactNode;
}

const HeroCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides: Slide[] = [
    {
      title: "Transforming Customer Experience",
      subtitle: "Seamlessly",
      description: "Optimize every touchpoint for exceptional customer journeys",
      color: "text-orange-sharp",
      gradientFrom: "from-orange-sharp",
      gradientTo: "to-yellow-sharp",
      icon: (
        <svg className="w-32 h-32 text-white" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
        </svg>
      )
    },
    {
      title: "Transforming business operations",
      subtitle: "Smoothly",
      description: "Streamline processes through intelligent automation",
      color: "text-sky-sharp",
      gradientFrom: "from-sky-sharp",
      gradientTo: "to-blue-sharp",
      icon: (
        <svg className="w-32 h-32 text-white" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
        </svg>
      )
    },
    {
      title: "Leverage sharp insights with",
      subtitle: "Unmatched data & analytics",
      description: "Transform data into actionable business intelligence",
      color: "text-purple-sharp",
      gradientFrom: "from-purple-sharp",
      gradientTo: "to-magenta-sharp",
      icon: (
        <svg className="w-32 h-32 text-white" fill="currentColor" viewBox="0 0 24 24">
          <path d="M3 3v18h18v-2H5V3H3z"/>
          <path d="M7 12l4-4 4 4 4-4v3l-4 4-4-4-4 4V12z"/>
        </svg>
      )
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  // Auto-advance slides every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <section className="relative bg-gradient-to-br from-charcoal via-gray-950 to-charcoal py-20 lg:py-32" aria-label="Hero section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative">
          {/* Carousel Container */}
          <div className="carousel-container relative overflow-hidden rounded-lg bg-white shadow-xl">
            {/* Carousel Slides */}
            <div
              className="carousel-slides flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {slides.map((slide, index) => (
                <div key={index} className="carousel-slide w-full flex-none">
                  <div className="flex flex-col lg:flex-row items-center justify-between p-8 lg:p-16">
                    <div className="lg:w-1/2 text-center lg:text-left mb-8 lg:mb-0">
                      <h1 className="text-3xl md:text-4xl lg:text-5xl font-heading leading-tight text-charcoal mb-6">
                        {slide.title}
                        <span className="text-primary block">AI-Powered Digital Solutions</span>
                      </h1>
                      <div className="mb-6">
                        <h2 className={`text-xl md:text-2xl font-heading ${slide.color} mb-4`}>
                          {slide.subtitle}
                        </h2>
                        <p className="text-lg text-charcoal font-body leading-relaxed">
                          {slide.description}
                        </p>
                      </div>
                      <Link href="/services">
                        <Button className="inline-flex items-center bg-primary text-white font-heading text-base px-8 py-4 rounded-md hover:bg-primary-hover active:bg-primary-active transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2">
                          Learn More
                          <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                          </svg>
                        </Button>
                      </Link>
                    </div>
                    <div className="lg:w-1/2 flex justify-center">
                      <div className={`w-64 h-64 bg-gradient-to-br ${slide.gradientFrom} ${slide.gradientTo} rounded-full flex items-center justify-center`}>
                        {slide.icon}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Carousel Navigation */}
            <button
              onClick={prevSlide}
              className="carousel-prev absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full p-3 shadow-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
              aria-label="Previous slide"
            >
              <svg className="w-6 h-6 text-charcoal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={nextSlide}
              className="carousel-next absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full p-3 shadow-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
              aria-label="Next slide"
            >
              <svg className="w-6 h-6 text-charcoal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
              </svg>
            </button>

            {/* Carousel Indicators */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${
                    index === currentSlide
                      ? 'bg-primary bg-opacity-100'
                      : 'bg-white bg-opacity-60 hover:bg-opacity-100'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroCarousel;