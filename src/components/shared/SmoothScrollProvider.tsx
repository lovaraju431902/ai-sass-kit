'use client';

import { ReactLenis, useLenis } from 'lenis/react';
import { usePathname, useSearchParams } from 'next/navigation';
import { ReactNode, useEffect, useRef } from 'react';

interface SmoothScrollProviderProps {
  children: ReactNode;
  duration?: number;
}

export const SmoothScrollProvider = ({
  children,
  duration = 1.1,
}: SmoothScrollProviderProps) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const previousPathRef = useRef<string>(pathname);
  const isInitialRender = useRef(true);
  const lenis = useLenis();

  // Reset scroll to top upon Next.js route change
  useEffect(() => {
    if (!isInitialRender.current && previousPathRef.current !== pathname) {
      lenis?.scrollTo(0, { immediate: true });
    }
    previousPathRef.current = pathname;
    isInitialRender.current = false;
  }, [pathname, searchParams, lenis]);

  // Intercept anchor clicks matching .lenis-scroll-to
  useEffect(() => {
    if (!lenis) return;

    const elements = document.querySelectorAll<HTMLAnchorElement>('.lenis-scroll-to');
    const handleClick = (e: MouseEvent) => {
      const target = e.currentTarget as HTMLAnchorElement;
      const href = target.getAttribute('href');
      if (href?.startsWith('#')) {
        e.preventDefault();
        lenis.scrollTo(href, { offset: -100 });
      }
    };

    elements.forEach((el) => el.addEventListener('click', handleClick));
    return () => elements.forEach((el) => el.removeEventListener('click', handleClick));
  }, [lenis, pathname]);

  return (
    <ReactLenis root options={{ duration }}>
      {children}
    </ReactLenis>
  );
};
