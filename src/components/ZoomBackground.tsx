'use client';

import Image from 'next/image';

type Props = {
  className?: string;
  image?: string;
};

export default function ZoomBackground({ className, image = '/img/services_bg.jpg' }: Props) {
  return (
    <div className={`zoom-background ${className ?? ''}`}>
      <Image src={image} alt="" fill sizes="100vw" />
    </div>
  );
}
