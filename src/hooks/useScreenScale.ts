import { useEffect, useRef, useState } from 'react';

const DESIGN_WIDTH = 1920;
const DESIGN_HEIGHT = 1080;

export function useScreenScale() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const updateScale = () => {
      const w = window.innerWidth / DESIGN_WIDTH;
      const h = window.innerHeight / DESIGN_HEIGHT;
      setScale(Math.min(w, h));
    };

    updateScale();
    window.addEventListener('resize', updateScale);
    return () => window.removeEventListener('resize', updateScale);
  }, []);

  return { containerRef, scale };
}
