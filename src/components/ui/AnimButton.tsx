'use client';

import { FC, useLayoutEffect, useRef } from 'react';
import './ui.css';

interface AnimButtonProps {
  invert?: boolean;
  fullWidth?: boolean;
  open?: boolean;
  children: React.ReactNode;
}

const AnimButton: FC<AnimButtonProps> = ({ children, fullWidth, open }) => {
  const btnRef = useRef<HTMLButtonElement | null>(null);

  useLayoutEffect(() => {
    const el = btnRef.current;
    if (!el) return;

    const setCoverSize = () => {
      const w = el.offsetWidth;
      const h = el.offsetHeight;
      const L = Math.max(w, h);
      const side = (L / Math.SQRT2) * 1.3;
      el.style.setProperty('--width', `${side}px`);
      el.style.setProperty('--height', `${side}px`);
    };

    const ro = new ResizeObserver(setCoverSize);
    ro.observe(el);
    setCoverSize();

    return () => ro.disconnect();
  }, []);

  return (
    <button
      ref={btnRef}
      className={`anim-button${open ? ' open' : ''}`}
      style={fullWidth ? { width: '100%' } : {}}
    >
      <div className="anim-button-text">{children}</div>
      <div className="anim-button-top"></div>
    </button>
  );
};

export default AnimButton;
