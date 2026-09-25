'use client';

import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { useCallback, useRef, useState } from 'react';

export const useModalAnimation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const modalRef = useRef<HTMLDialogElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const isAnimating = useRef(false);

  const { contextSafe } = useGSAP();

  const openModal = contextSafe(() => {
    if (isOpen || isAnimating.current || !contentRef.current) return;
    isAnimating.current = true;
    setIsOpen(true);
    document.body.style.overflow = 'hidden';

    gsap.set(contentRef.current, { opacity: 0, y: -50 });
    gsap.to(contentRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.3,
      ease: 'power2.out',
      onComplete: () => {
        isAnimating.current = false;
      },
    });
  });

  const closeModal = contextSafe(async () => {
    if (!isOpen || isAnimating.current || !contentRef.current) return;
    isAnimating.current = true;
    document.body.style.overflow = 'auto';

    await gsap.to(contentRef.current, {
      opacity: 0,
      y: -50,
      duration: 0.2,
      ease: 'power2.in',
      onComplete: () => {
        setIsOpen(false);
        isAnimating.current = false;
      },
    });
  });

  return { isOpen, openModal, closeModal, modalRef, contentRef };
};
