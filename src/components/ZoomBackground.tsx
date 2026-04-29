/* eslint-disable @next/next/no-img-element */

'use client';

type Props = {
  className?: string;
  image?: string;
};

export default function ZoomBackground({ className, image = '/img/services_bg.jpg' }: Props) {
  return (
    <div className={`zoom-background ${className ?? ''}`}>
      <img src={image} alt="" />
    </div>
  );
}
