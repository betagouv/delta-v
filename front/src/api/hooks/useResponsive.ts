import { useState, useEffect } from 'react';

import { Responsive } from '@/styles/responsive';

export const useResponsive = (window: any) => {
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined,
  });

  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    window.addEventListener('resize', handleResize);

    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowSize;
};

export function isDesktop(display: any) {
  return display !== Responsive.tablet && display !== Responsive.mobile;
}

export default useResponsive;
