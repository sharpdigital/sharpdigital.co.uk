/* eslint-disable @next/next/no-img-element */

'use client';

import { useEffect, useState } from 'react';

type Props = {
  className?: string;
  image?: string;
};

export default function ZoomBackground({ className, image = '/img/services_bg.jpg' }: Props) {
  const [allowToZoom, setAllowToZoom] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setAllowToZoom(true);
    }, 40);
  }, []);
  return (
    <div className={`zoom-background ${allowToZoom ? 'zoom' : ''} ${className ?? ''}`}>
      <img src={image} alt="" />
    </div>
  );
}
