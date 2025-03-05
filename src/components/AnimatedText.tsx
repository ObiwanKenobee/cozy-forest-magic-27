
import React, { useEffect, useRef } from 'react';
import { cn } from "@/lib/utils";

interface AnimatedTextProps {
  text: string;
  className?: string;
  once?: boolean;
  delay?: number;
  as?: React.ElementType;
  animation?: 'fade-in' | 'fade-in-up' | 'slide-in-right' | 'text-reveal';
}

const AnimatedText: React.FC<AnimatedTextProps> = ({
  text,
  className,
  once = true,
  delay = 0,
  as: Component = 'div',
  animation = 'text-reveal'
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              if (containerRef.current) {
                const elements = containerRef.current.querySelectorAll('.text-reveal-item');
                elements.forEach((el, index) => {
                  (el as HTMLElement).style.animation = `${animation} 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards ${index * 0.05 + delay}s`;
                });
              }
            }, 100);
            
            if (once) {
              observer.unobserve(entry.target);
            }
          } else if (!once) {
            // Reset animation when out of view
            if (containerRef.current) {
              const elements = containerRef.current.querySelectorAll('.text-reveal-item');
              elements.forEach((el) => {
                (el as HTMLElement).style.animation = 'none';
              });
            }
          }
        });
      },
      { threshold: 0.2 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, [animation, delay, once]);

  return (
    <Component
      className={cn("text-reveal-container", className)}
      ref={containerRef}
      aria-label={text}
    >
      {text.split(' ').map((word, wordIndex) => (
        <React.Fragment key={`word-${wordIndex}`}>
          {wordIndex > 0 && ' '}
          <span className="inline-block">
            {word.split('').map((char, charIndex) => (
              <span
                key={`char-${charIndex}`}
                className="text-reveal-item"
                style={{ animationDelay: `${charIndex * 0.03 + wordIndex * 0.03}s` }}
                aria-hidden="true"
              >
                {char}
              </span>
            ))}
          </span>
        </React.Fragment>
      ))}
    </Component>
  );
};

export default AnimatedText;
