
import React, { useRef, useState } from 'react';
import { cn } from '@/lib/utils';
import AnimatedText from './AnimatedText';
import ParallaxSection from './ParallaxSection';

interface ProductProps {
  image: string;
  title: string;
  description: string;
  index: number;
}

const ProductCard: React.FC<ProductProps> = ({ image, title, description, index }) => {
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={cardRef}
      className={cn(
        "rounded-2xl overflow-hidden bg-white/5 border border-border/40 relative group transition-all duration-500",
        "opacity-0 animate-fade-in-up"
      )}
      style={{ animationDelay: `${index * 0.1 + 0.2}s`, animationFillMode: 'forwards' }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="aspect-[4/3] overflow-hidden">
        <img
          src={image}
          alt={title}
          className={cn(
            "w-full h-full object-cover transition-transform duration-700",
            isHovered ? "scale-105" : "scale-100"
          )}
          loading="lazy"
        />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-medium mb-2">{title}</h3>
        <p className="text-sm text-foreground/70">{description}</p>
      </div>
      <div
        className={cn(
          "absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 transition-opacity duration-500",
          isHovered ? "opacity-40" : "opacity-0"
        )}
      ></div>
    </div>
  );
};

interface ProductsProps {
  className?: string;
}

const Products: React.FC<ProductsProps> = ({ className }) => {
  const products = [
    {
      image: "https://images.unsplash.com/photo-1511385348-a52b4a160dc2?q=80&w=2942&auto=format&fit=crop",
      title: "Minimalist Speaker",
      description: "Premium sound quality with elegant, understated design.",
    },
    {
      image: "https://images.unsplash.com/photo-1560769629-975ec94e6a86?q=80&w=2864&auto=format&fit=crop",
      title: "Essence Watch",
      description: "Timeless design with cutting-edge technology.",
    },
    {
      image: "https://images.unsplash.com/photo-1561154464-82e9adf32764?q=80&w=2874&auto=format&fit=crop",
      title: "Ceramic Series",
      description: "Handcrafted ceramics with clean, modern lines.",
    },
    {
      image: "https://images.unsplash.com/photo-1503602642458-232111445657?q=80&w=2787&auto=format&fit=crop",
      title: "Essential Stool",
      description: "Elegant simplicity meets functional comfort.",
    },
    {
      image: "https://images.unsplash.com/photo-1542728928-1413d1894ed1?q=80&w=2787&auto=format&fit=crop",
      title: "Minimal Desk Lamp",
      description: "Perfect illumination with a sculptural presence.",
    },
    {
      image: "https://images.unsplash.com/photo-1600003263720-95b45a4035d5?q=80&w=2787&auto=format&fit=crop",
      title: "Signature Vase",
      description: "Artful design that enhances any interior space.",
    },
  ];

  return (
    <section
      id="products"
      className={cn("section-spacing", className)}
    >
      <ParallaxSection>
        <div className="container-wide">
          <div className="max-w-2xl mx-auto text-center mb-16">
            <span className="inline-block py-1 px-3 rounded-full text-xs font-medium tracking-wider border border-primary/20 bg-primary/5 mb-4">
              Our Collection
            </span>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">
              <AnimatedText text="Beautifully Crafted Products" />
            </h2>
            <p className="text-foreground/70">
              Each piece in our collection embodies our commitment to exceptional design, 
              quality materials, and thoughtful functionality.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product, index) => (
              <ProductCard key={index} {...product} index={index} />
            ))}
          </div>
        </div>
      </ParallaxSection>
    </section>
  );
};

export default Products;
