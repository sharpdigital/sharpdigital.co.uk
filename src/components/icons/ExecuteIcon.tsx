import { FC } from 'react';

const ExecuteIcon: FC = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="32"
      fill="var(--color)"
      viewBox="0 0 256 256"
    >
      <rect width="256" height="256" fill="none" />
      <polyline
        points="224 208 32 208 32 48"
        fill="none"
        stroke="var(--color)"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="16"
      />
      <polyline
        points="200 72 128 144 96 112 32 176"
        fill="none"
        stroke="var(--color)"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="16"
      />
      <polyline
        points="200 112 200 72 160 72"
        fill="none"
        stroke="var(--color)"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="16"
      />
    </svg>
  );
};

export default ExecuteIcon;
