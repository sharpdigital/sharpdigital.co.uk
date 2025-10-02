'use client';

import { FC } from 'react';
import './ui.css';

interface AnimButtonProps {
  invert?: boolean;
  children: React.ReactNode;
}

const AnimButton: FC<AnimButtonProps> = ({ children }) => {
  return (
    <button className="anim-button">
      <div className="anim-button-top">
        <div className="anim-button-top-slider">{children}</div>
      </div>
      <div className="anim-button-bottom">{children}</div>
    </button>
  );
};

export default AnimButton;
