import { FC } from 'react';

const DesignIcon: FC = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="32"
      fill="var(--color)"
      viewBox="0 0 256 256"
    >
      <rect width="256" height="256" fill="none" />
      <path
        d="M24,176V64A24,24,0,0,1,48,40H64V152H48a24,24,0,0,0,0,48H232V64H64"
        fill="none"
        stroke="var(--color)"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="16"
      />
      <line
        x1="128"
        y1="96"
        x2="128"
        y2="160"
        fill="none"
        stroke="var(--color)"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="16"
      />
      <line
        x1="168"
        y1="96"
        x2="168"
        y2="160"
        fill="none"
        stroke="var(--color)"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="16"
      />
      <line
        x1="104"
        y1="112"
        x2="192"
        y2="112"
        fill="none"
        stroke="var(--color)"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="16"
      />
      <line
        x1="104"
        y1="144"
        x2="192"
        y2="144"
        fill="none"
        stroke="var(--color)"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="16"
      />
    </svg>
  );
};

export default DesignIcon;
