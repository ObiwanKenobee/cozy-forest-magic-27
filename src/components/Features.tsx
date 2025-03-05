
import React from 'react';
import { cn } from '@/lib/utils';
import AnimatedText from './AnimatedText';
import ParallaxSection from './ParallaxSection';
import { Check, Sparkles, Heart, Zap, Shield, Gem } from 'lucide-react';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  index: number;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description, index }) => {
  return (
    <div 
      className="p-6 rounded-xl border border-border/40 bg-secondary/10 hover:bg-secondary/20 transition-colors duration-500 opacity-0 animate-fade-in-up"
      style={{ animationDelay: `${index * 0.1 + 0.2}s`, animationFillMode: 'forwards' }}
    >
      <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-primary/10 text-primary mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-medium mb-2">{title}</h3>
      <p className="text-sm text-foreground/70">{description}</p>
    </div>
  );
};

interface FeaturesProps {
  className?: string;
}

const Features: React.FC<FeaturesProps> = ({ className }) => {
  const features = [
    {
      icon: <Sparkles size={22} />,
      title: "Thoughtful Design",
      description: "Every product is carefully designed with intention and purpose, focusing on both aesthetics and functionality."
    },
    {
      icon: <Shield size={22} />,
      title: "Quality Materials",
      description: "We source only the finest materials to ensure longevity, sustainability, and a premium feel in every product."
    },
    {
      icon: <Zap size={22} />,
      title: "Seamless Experience",
      description: "Our products are intuitive and effortless to use, creating a seamless experience from unboxing to everyday use."
    },
    {
      icon: <Heart size={22} />,
      title: "Customer Focused",
      description: "We design with our customers in mind, addressing real needs with elegant, practical solutions."
    },
    {
      icon: <Check size={22} />,
      title: "Sustainable Approach",
      description: "Environmental responsibility is integrated into our product lifecycle, from production to packaging."
    },
    {
      icon: <Gem size={22} />,
      title: "Timeless Appeal",
      description: "Our designs transcend trends, offering enduring style and functionality that stands the test of time."
    }
  ];

  return (
    <section
      id="features"
      className={cn("section-spacing bg-secondary/5", className)}
    >
      <ParallaxSection>
        <div className="container-wide">
          <div className="max-w-2xl mx-auto text-center mb-16">
            <span className="inline-block py-1 px-3 rounded-full text-xs font-medium tracking-wider border border-primary/20 bg-primary/5 mb-4">
              Why Choose Us
            </span>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">
              <AnimatedText text="The Quality is in the Details" />
            </h2>
            <p className="text-foreground/70">
              We believe that exceptional products come from an unwavering commitment to quality, 
              design, and attention to the smallest details.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <FeatureCard key={index} {...feature} index={index} />
            ))}
          </div>
        </div>
      </ParallaxSection>
    </section>
  );
};

export default Features;
