'use client';

import React, { FC, useEffect, useState } from 'react';
import Link from 'next/link';
import './carousel.css';
import AnimButton from '../ui/AnimButton';

export type CarouselSetup = {
  title: string;
  title2: string;
  subtitle: string;
  description: string;
  imageUrl: string;
  buttonText: string;
  buttonUrl: string;
};

type Props = {
  setup: CarouselSetup[];
  interval?: number; // ms
  hasMouse?: boolean;
};

const carouselTextDelay = 0.2;

const Carousel: FC<Props> = ({ setup, interval = 6000, hasMouse }: Props) => {
  const [index, setIndex] = useState(0);
  const [startIndex, setStartIndex] = useState(-1);
  const [mounted, setMounted] = useState(false);
  const [firstRound, setFirstRound] = useState(true);
  const [blockInterval, setBlockInterval] = useState(false);
  const [baseDelay, setBaseDelay] = useState(0);

  useEffect(() => {
    setStartIndex(index);
    setMounted(true);
    const timer = setInterval(() => {
      setStartIndex(-1);
      setTimeout(() => {
        setBaseDelay(0.6);
        setFirstRound(false);
      }, 40);
    }, 40);
    return () => clearInterval(timer);
  }, [index]);

  useEffect(() => {
    if (!setup || setup.length <= 1) return;
    const timer = setInterval(() => {
      if (!blockInterval) {
        setIndex((prev) => (prev + 1) % setup.length);
      }
    }, interval);
    return () => clearInterval(timer);
  }, [setup, interval, blockInterval]);

  if (!setup || setup.length === 0) {
    return null;
  }

  return (
    <div className="carousel">
      {/* Background layers (one per slide), active one fades in on top */}
      {setup.map((stage, i) => (
        <div
          key={`bg-${i}`}
          className={`carousel-slide${i === index ? ' active' : ''}${i === startIndex || !mounted ? ' start' : ''}${i === startIndex && firstRound ? ' init' : ''}`}
          style={{ backgroundImage: `url(${stage.imageUrl})` }}
        />
      ))}

      {/* Text layers (one per slide). The wrapper with all text gets "active". */}
      <div className="carousel-text-wrapper relative z-index-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="carousel-text-container">
          {setup.map((stage, i) => (
            <div
              key={`txt-${i}`}
              className={`carousel-text-layer${i === index ? ' active' : ''}${i === startIndex || !mounted ? ' start' : ''}`}
            >
              <div className="carousel-copy">
                {/* New title2 field (strapline). Using .carousel-texttitle for shared styling */}
                <div
                  className="carousel-field carousel-title-wrap title-font"
                  style={{ ['--delay']: `${baseDelay}s` } as React.CSSProperties}
                >
                  <div className="carousel-title">{stage.title}</div>
                </div>
                <div
                  className="carousel-field carousel-title-wrap title-font"
                  style={{ ['--delay']: `${baseDelay}s` } as React.CSSProperties}
                >
                  <div className="carousel-texttitle">{stage.title2}</div>
                </div>
                {/* <div className="carousel-field carousel-subtitle-wrap">
                  <div className="carousel-subtitle">{stage.subtitle}</div>
                </div> */}

                {/* <div className="carousel-field carousel-description-wrap">
                  <div className="carousel-description">{stage.description}</div>
                </div> */}

                <Link
                  href={stage.buttonUrl}
                  className="carousel-cta-button"
                  style={
                    {
                      ['--delay']: `${carouselTextDelay * 2 + baseDelay}s`,
                    } as React.CSSProperties
                  }
                >
                  <AnimButton className="carousel-button-wrap">
                    <div className="carousel-button">{stage.description}</div>
                  </AnimButton>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Indicators */}
      <div className="carousel-indicators" role="tablist" aria-label="Carousel indicators">
        {!!hasMouse && (
          <div className="carousel-mouse">
            <div className="carousel-mouse-scroll"></div>
          </div>
        )}
        {setup.map((_, i) => (
          <button
            key={`ind-${i}`}
            type="button"
            role="tab"
            aria-selected={i === index}
            aria-label={`Go to slide ${i + 1}`}
            className={`carousel-indicator ${i === index ? 'active' : ''}`}
            onClick={() => {
              setIndex(i);
              setBlockInterval(true);
              setTimeout(() => setBlockInterval(false), interval);
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;
