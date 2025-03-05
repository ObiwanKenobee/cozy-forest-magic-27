
import React, { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import { Menu, X } from 'lucide-react';

interface NavbarProps {
  className?: string;
}

const Navbar: React.FC<NavbarProps> = ({ className }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initialize state

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    if (!isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  };

  const navLinks = [
    { href: '#hero', label: 'Home' },
    { href: '#products', label: 'Products' },
    { href: '#features', label: 'Features' },
    { href: '#about', label: 'About' },
  ];

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-expo-out',
        isScrolled ? 'glass py-4' : 'py-6 bg-transparent',
        className
      )}
    >
      <div className="container-wide flex items-center justify-between">
        <a
          href="#"
          className="text-xl font-medium tracking-tight flex items-center space-x-2"
        >
          <span className="w-2 h-2 bg-primary rounded-full"></span>
          <span>Essence</span>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium animated-underline text-foreground/80 hover:text-foreground transition-colors duration-300"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            className="btn-primary text-sm"
          >
            Contact
          </a>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 focus:outline-none"
          onClick={toggleMenu}
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
        >
          {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Navigation Overlay */}
      <div
        className={cn(
          'fixed inset-0 bg-background/95 backdrop-blur-sm z-40 transition-all duration-500 ease-expo-out md:hidden',
          isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        )}
      >
        <div className="flex flex-col items-center justify-center h-full space-y-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={cn(
                'text-2xl font-medium',
                isMenuOpen ? 'animate-fade-in-up' : ''
              )}
              style={{ animationDelay: '0.1s' }}
              onClick={toggleMenu}
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            className={cn(
              'btn-primary text-lg mt-4',
              isMenuOpen ? 'animate-fade-in-up' : ''
            )}
            style={{ animationDelay: '0.3s' }}
            onClick={toggleMenu}
          >
            Contact
          </a>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
