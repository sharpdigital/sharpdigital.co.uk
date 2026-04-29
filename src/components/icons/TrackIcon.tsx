import { FC } from 'react';

const TrackIcon: FC = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="32"
      fill="var(--color)"
      viewBox="0 0 256 256"
    >
      <rect width="256" height="256" fill="none" />
      <line
        x1="128"
        y1="128"
        x2="216"
        y2="128"
        fill="none"
        stroke="var(--color)"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="16"
      />
      <line
        x1="128"
        y1="64"
        x2="216"
        y2="64"
        fill="none"
        stroke="var(--color)"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="16"
      />
      <line
        x1="128"
        y1="192"
        x2="216"
        y2="192"
        fill="none"
        stroke="var(--color)"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="16"
      />
      <polyline
        points="40 64 56 80 88 48"
        fill="none"
        stroke="var(--color)"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="16"
      />
      <polyline
        points="40 128 56 144 88 112"
        fill="none"
        stroke="var(--color)"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="16"
      />
      <polyline
        points="40 192 56 208 88 176"
        fill="none"
        stroke="var(--color)"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="16"
      />
    </svg>
  );
};

export default TrackIcon;
