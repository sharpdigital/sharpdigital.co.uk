'use client';

import { FC, useLayoutEffect, useRef } from 'react';

interface AnimButtonProps {
  inverted?: boolean;
  fullWidth?: boolean;
  open?: boolean;
  children: React.ReactNode;
  className?: string;
  isSubmit?: boolean;
  disabled?: boolean;
}

const AnimButton: FC<AnimButtonProps> = ({
  children,
  fullWidth,
  open,
  className,
  inverted,
  isSubmit,
  disabled,
}) => {
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
      className={`anim-button${open ? ' open' : ''}${className ? ` ${className}` : ''}${inverted ? ' inverted' : ''}${disabled ? ' disabled' : ''}`}
      style={fullWidth ? { width: '100%' } : {}}
      type={isSubmit ? 'submit' : undefined}
    >
      <div className="anim-button-text">{children}</div>
      <div className="anim-button-top"></div>
    </button>
  );
};

export default AnimButton;
