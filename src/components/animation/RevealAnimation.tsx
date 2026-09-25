'use client';

import { useGSAP } from '@gsap/react';
import { clsx } from 'clsx';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import React, { cloneElement, ReactElement, Ref, useRef } from 'react';
import { Springer } from '../../lib/springer';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface RevealAnimationProps {
  children: ReactElement<{
    className?: string;
    ref?: Ref<HTMLElement>;
    'data-ns-animate'?: boolean;
  }>;
  duration?: number;
  delay?: number;
  offset?: number;
  instant?: boolean;
  start?: string;
  end?: string;
  direction?: 'up' | 'down' | 'left' | 'right';
  useSpring?: boolean;
  rotation?: number;
  animationType?: 'from' | 'to';
  className?: string;
}

export const RevealAnimation = ({
  children,
  duration = 0.6,
  delay = 0,
  offset = 60,
  instant = false,
  start = 'top 90%',
  end = 'top 50%',
  direction = 'down',
  useSpring = false,
  rotation = 0,
  animationType = 'from',
  className = '',
}: RevealAnimationProps) => {
  const elementRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    const element = elementRef.current;
    if (!element) return;

    const springEase = useSpring ? Springer.default(0.2, 0.8) : null;

    // Reset base DOM styles to visible so GSAP controls initial-to-final
    element.style.opacity = '1';
    element.style.filter = 'blur(0)';

    const isFrom = animationType === 'from';
    const animationProps: gsap.TweenVars = {
      opacity: isFrom ? 0 : 1,
      filter: isFrom ? 'blur(16px)' : 'blur(0px)',
      duration,
      delay,
      ease: useSpring && springEase ? springEase : 'power2.out',
    };

    if (rotation !== 0) animationProps.rotation = rotation;

    if (!instant) {
      animationProps.scrollTrigger = {
        trigger: element,
        start,
        end,
        scrub: false,
      };
    }

    // Directional axis configuration
    switch (direction) {
      case 'left':
        animationProps.x = isFrom ? -offset : 0;
        if (!isFrom) gsap.set(element, { x: -offset });
        break;
      case 'right':
        animationProps.x = isFrom ? offset : 0;
        if (!isFrom) gsap.set(element, { x: offset });
        break;
      case 'down':
        animationProps.y = isFrom ? offset : 0;
        if (!isFrom) gsap.set(element, { y: offset });
        break;
      case 'up':
      default:
        animationProps.y = isFrom ? -offset : 0;
        if (!isFrom) gsap.set(element, { y: -offset });
        break;
    }

    if (isFrom) {
      gsap.from(element, animationProps);
    } else {
      gsap.to(element, animationProps);
    }
  }, [duration, delay, offset, instant, start, end, direction, useSpring, rotation, animationType]);

  if (!children || !React.isValidElement(children)) return null;

  return cloneElement(children, {
    ref: elementRef,
    className: clsx(children.props.className, className),
    'data-ns-animate': true,
  });
};
