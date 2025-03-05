
import React, { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';
import AnimatedText from './AnimatedText';
import { ChevronDown } from 'lucide-react';

interface HeroProps {
  className?: string;
}

const Hero: React.FC<HeroProps> = ({ className }) => {
  const heroRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!heroRef.current) return;
      
      const { left, top, width, height } = heroRef.current.getBoundingClientRect();
      const x = (e.clientX - left) / width - 0.5;
      const y = (e.clientY - top) / height - 0.5;
      
      setMousePosition({ x, y });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <section
      id="hero"
      ref={heroRef}
      className={cn(
        'relative min-h-screen flex items-center justify-center overflow-hidden',
        className
      )}
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background to-background/40 z-10"></div>
      
      {/* Background shape */}
      <div 
        className="absolute w-[800px] h-[800px] rounded-full bg-secondary/30 blur-3xl z-0"
        style={{ 
          transform: `translate(${mousePosition.x * -30}px, ${mousePosition.y * -30}px)`,
          transition: 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)'
        }}
      ></div>
      
      <div className="container-wide relative z-20">
        <div className="max-w-3xl mx-auto text-center">
          <div 
            className="mb-6 opacity-0 animate-fade-in" 
            style={{ animationDelay: '0.2s', animationFillMode: 'forwards' }}
          >
            <span className="inline-block py-1 px-3 rounded-full text-xs font-medium tracking-wider border border-primary/20 bg-primary/5">
              Simply Elegant
            </span>
          </div>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 leading-tight">
            <AnimatedText
              text="Minimalist design for maximum impact"
              as="span"
              delay={0.4}
              className="block"
            />
          </h1>
          
          <p 
            className="text-lg md:text-xl text-foreground/70 mb-10 opacity-0 animate-fade-in"
            style={{ animationDelay: '0.8s', animationFillMode: 'forwards' }}
          >
            Discover the beauty of simplicity with our thoughtfully crafted products
            that blend form and function in perfect harmony.
          </p>
          
          <div 
            className="flex flex-col sm:flex-row items-center justify-center gap-4 opacity-0 animate-fade-in"
            style={{ animationDelay: '1s', animationFillMode: 'forwards' }}
          >
            <a href="#products" className="btn-primary">
              Explore Products
            </a>
            <a href="#features" className="btn-outline">
              Learn More
            </a>
          </div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20 animate-fade-in" style={{ animationDelay: '1.5s' }}>
        <a 
          href="#products" 
          className="flex flex-col items-center text-sm text-foreground/60 hover:text-foreground transition-colors duration-300"
        >
          <span className="mb-2">Scroll to explore</span>
          <ChevronDown className="animate-bounce" />
        </a>
      </div>
    </section>
  );
};

export default Hero;
