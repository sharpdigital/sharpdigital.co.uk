'use client';

import { FC, useEffect, useRef, useState } from 'react';
import { AccordionIconGraphics } from './AccordionIconGraphics';
import './accordion.css';
import { sanitize } from '@/lib/utils';

const MOBILE_SAFE_RESIZE = 'mobile-safe-resize';

export type AccordionItem = {
  title: string;
  column: { title: string; details: string };
  icon?: React.ReactNode;
};

interface AccordionPanelProps {
  title: string;
  startOpen?: boolean;
  children: React.ReactNode;
  icon?: React.ReactNode;
  iconBackground?: boolean;
}

const AccordionPanel: FC<AccordionPanelProps> = ({ title, startOpen, icon, children }) => {
  const [_, setRender] = useState(0);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const headerRef = useRef<HTMLDivElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);

  const open = useRef(!!startOpen);
  const mounted = useRef(false);

  const onOpenToggle = () => {
    open.current = !open.current;
    setHeight(true);
    setRender((x) => x + 1);
  };

  const setHeightOnFrame = () => {
    setHeight();
  };

  const setHeight = (animated?: boolean) => {
    if (containerRef.current) {
      if (animated) {
        containerRef.current.style.transition = 'height 0.66s cubic-bezier(.24,0,0,1)';
      } else {
        containerRef.current.style.transition = '';
      }
      if (headerRef.current && contentRef.current && containerRef.current) {
        const headerBounds = headerRef.current.getBoundingClientRect();
        if (open.current) {
          const contentBounds = contentRef.current.getBoundingClientRect();
          containerRef.current.style.height = `${headerBounds.height + contentBounds.height}px`;
        } else {
          containerRef.current.style.height = `${headerBounds.height}px`;
        }
      }
    }
  };

  const onResize = () => {
    requestAnimationFrame(setHeightOnFrame);
  };

  useEffect(() => {
    window.addEventListener(MOBILE_SAFE_RESIZE, onResize);
    setHeight();
    return () => {
      window.removeEventListener(MOBILE_SAFE_RESIZE, onResize);
    };
  }, []);

  if (!mounted.current) {
    mounted.current = true;
  }

  return (
    <div className="accordion-panel" ref={containerRef}>
      <div className="accordion-panel-header" onClick={onOpenToggle} ref={headerRef}>
        {icon ? <div className="accordion-icon">{icon}</div> : null}
        <div
          className="accordion-panel-title font-heading"
          dangerouslySetInnerHTML={{
            __html: sanitize(title),
          }}
        ></div>
        <AccordionIconGraphics className={open.current ? 'open' : undefined} />
      </div>

      <div className="accordion-panel-content" ref={contentRef}>
        {children}
      </div>
    </div>
  );
};

export default AccordionPanel;
