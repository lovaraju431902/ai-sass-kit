'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';

interface NumberAnimationProps {
  number: number;
  speed?: number;
  interval?: number;
  rooms?: number;
  heightSpaceRatio?: number;
  className?: string;
  symbol?: boolean;
}

export const NumberAnimation: React.FC<NumberAnimationProps> = ({
  number,
  speed = 800,
  interval = 150,
  rooms = 2,
  heightSpaceRatio = 2.2,
  className = '',
  symbol = false,
}) => {
  const elementRef = useRef<HTMLSpanElement>(null);
  const [isAnimated, setIsAnimated] = useState(false);

  const animate = (element: HTMLElement, targetTop: number, duration: number) => {
    const startTime = performance.now();
    const startTop = parseFloat(getComputedStyle(element).top) || 0;

    const frame = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const ease = 1 - Math.pow(1 - progress, 3);
      element.style.top = `${startTop + (targetTop - startTop) * ease}px`;

      if (progress < 1) {
        requestAnimationFrame(frame);
      }
    };
    requestAnimationFrame(frame);
  };

  const initAnimation = useCallback(() => {
    const el = elementRef.current;
    if (!el || isAnimated) return;

    el.style.display = 'inline-flex';
    el.style.alignItems = 'center';
    el.textContent = number.toString();
    const h = el.offsetHeight || 24;
    const space = h / heightSpaceRatio;
    el.innerHTML = '';

    // Generate reel of digits 0 through 9
    let strip = '';
    for (let i = 0; i < 10; i++) {
      strip += `<span style="display:block;width:${space}px;height:${h}px;line-height:${h}px;text-align:center;">${i}</span>`;
    }
    const singleReelHtml = `<div class="_number" style="width:${space}px;height:${h}px;display:flex;"><div style="position:relative;width:${space}px;height:${h}px;overflow:hidden;"><div style="position:absolute;width:100%;top:0;">${strip}</div></div></div>`;

    const digits = String(number).split('');
    while (digits.length < rooms) digits.unshift('0');

    el.innerHTML = singleReelHtml.repeat(digits.length);
    const reels = el.querySelectorAll('._number');

    reels.forEach((reel, i) => {
      const targetDigit = Number(digits[i]);
      setTimeout(() => {
        const track = reel.children[0].children[0] as HTMLElement;
        animate(track, -h * targetDigit, speed);
      }, interval * (reels.length - i));
    });

    setIsAnimated(true);
  }, [isAnimated, number, speed, interval, rooms, heightSpaceRatio]);

  useEffect(() => {
    const el = elementRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isAnimated) initAnimation();
      },
      { threshold: 0.5 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [isAnimated, initAnimation]);

  return <span ref={elementRef} className={className}>{number}</span>;
};
