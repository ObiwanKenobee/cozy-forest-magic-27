
import React, { useEffect, useRef, useState } from 'react';
import { cn } from "@/lib/utils";

interface ParallaxSectionProps {
  children: React.ReactNode;
  className?: string;
  speed?: number;
  direction?: 'up' | 'down';
}

const ParallaxSection: React.FC<ParallaxSectionProps> = ({
  children,
  className,
  speed = 0.2,
  direction = 'up'
}) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;

      const { top, height } = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // Calculate scroll percentage through section
      const scrollPercentage = (windowHeight - top) / (windowHeight + height);
      
      // Only apply effect when section is in view (between 0 and 1)
      if (scrollPercentage > 0 && scrollPercentage < 1) {
        const newOffset = (scrollPercentage - 0.5) * speed * 100;
        setOffset(direction === 'down' ? -newOffset : newOffset);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initialize position

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [speed, direction]);

  return (
    <div 
      ref={sectionRef}
      className={cn("overflow-hidden relative", className)}
    >
      <div 
        style={{ 
          transform: `translateY(${offset}px)`,
          transition: 'transform 0.05s cubic-bezier(0.16, 1, 0.3, 1)'
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default ParallaxSection;
