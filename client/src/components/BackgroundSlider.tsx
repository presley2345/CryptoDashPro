import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

const backgroundImages = [
  'crypto-bg-1',
  'crypto-bg-2', 
  'crypto-bg-3',
  'crypto-bg-4'
];

export function BackgroundSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % backgroundImages.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute inset-0 z-0">
      {backgroundImages.map((bgClass, index) => (
        <div
          key={index}
          className={cn(
            "absolute inset-0 bg-cover bg-center transition-opacity duration-1000",
            bgClass,
            index === currentSlide ? "opacity-100" : "opacity-0"
          )}
        />
      ))}
    </div>
  );
}
