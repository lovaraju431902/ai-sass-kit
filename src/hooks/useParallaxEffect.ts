'use client';

import { useEffect, useRef } from 'react';

export const useParallaxEffect = () => {
  const sceneRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const scene = sceneRef.current;
    if (!scene) return;

    const elements = scene.querySelectorAll<HTMLElement>('.parallax-effect');
    if (elements.length === 0) return;

    const configs = Array.from(elements).map((el) => ({
      element: el,
      depth: parseFloat(el.getAttribute('data-parallax-value') || '1'),
      dirX: parseFloat(el.getAttribute('data-parallax-x') || '1'),
      dirY: parseFloat(el.getAttribute('data-parallax-y') || '1'),
      scale: 20,
    }));

    elements.forEach((el) => {
      el.style.willChange = 'transform';
      el.style.transition = 'transform 0.1s ease-out';
    });

    let isScheduled = false;
    let mouseX = scene.offsetWidth / 2;
    let mouseY = scene.offsetHeight / 2;

    const update = () => {
      const centerX = scene.offsetWidth / 2;
      const centerY = scene.offsetHeight / 2;
      const relX = Math.max(-1, Math.min(1, (mouseX - centerX) / centerX));
      const relY = Math.max(-1, Math.min(1, (mouseY - centerY) / centerY));

      configs.forEach(({ element, depth, dirX, dirY, scale }) => {
        const x = relX * depth * dirX * scale;
        const y = relY * depth * dirY * scale;
        element.style.transform = `translate3d(${x.toFixed(2)}px, ${y.toFixed(2)}px, 0)`;
      });
      isScheduled = false;
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.pageX;
      mouseY = e.pageY;
      if (!isScheduled) {
        requestAnimationFrame(update);
        isScheduled = true;
      }
    };

    scene.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => scene.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return sceneRef;
};
