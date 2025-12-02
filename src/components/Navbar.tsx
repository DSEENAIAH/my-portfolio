import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { twMerge } from 'tailwind-merge';

interface NavbarProps {
  activeSection: string;
}

const Navbar: React.FC<NavbarProps> = ({ activeSection }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'skills', label: 'Skills' },
    { id: 'projects', label: 'Projects' },
    { id: 'contact', label: 'Contact' },
  ];

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 80,
        behavior: 'smooth',
      });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className={twMerge(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-4 py-4',
          isScrolled ? 'py-2' : 'py-4'
        )}
      >
        <div className={twMerge(
          'max-w-5xl mx-auto rounded-full transition-all duration-300 border border-transparent',
          isScrolled ? 'glass bg-dark-200/80 border-white/10 shadow-lg backdrop-blur-md' : ''
        )}>
          <div className="flex items-center justify-between px-6 h-14">
            {/* Logo */}
            <a
              href="#home"
              className="text-xl font-bold font-display tracking-wider text-white hover:text-primary transition-colors"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('home');
              }}
            >
              DS<span className="text-primary">.</span>
            </a>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-1">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollToSection(link.id)}
                  className={twMerge(
                    'relative px-4 py-2 text-sm font-medium transition-colors rounded-full',
                    activeSection === link.id ? 'text-white' : 'text-slate-400 hover:text-white'
                  )}
                >
                  {activeSection === link.id && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute inset-0 bg-white/10 rounded-full"
                      transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  {link.label}
                </button>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-slate-300 hover:text-white"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Navigation Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-x-4 top-20 z-40 md:hidden"
          >
            <div className="glass bg-dark-200/95 rounded-2xl p-4 border border-white/10 shadow-xl">
              <div className="flex flex-col space-y-2">
                {navLinks.map((link) => (
                  <button
                    key={link.id}
                    onClick={() => scrollToSection(link.id)}
                    className={twMerge(
                      'w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-colors',
                      activeSection === link.id
                        ? 'bg-primary/10 text-primary'
                        : 'text-slate-400 hover:bg-white/5 hover:text-white'
                    )}
                  >
                    {link.label}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;