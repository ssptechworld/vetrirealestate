import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Menu, X, PhoneCall, ChevronRight } from 'lucide-react';
import { useFavorites } from '../context/FavoritesContext';

export default function Navbar({ onOpenInquiryModal }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { favorites } = useFavorites();

  const isHomePage = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Properties', path: '/properties' },
    { name: 'About Us', path: '/about' },
    { name: 'Agents', path: '/agents' },
    { name: 'Contact', path: '/contact' },
  ];

  const navbarBg = scrolled || !isHomePage
    ? 'bg-[#121417]/90 backdrop-blur-md border-b border-white/10 shadow-lg py-4'
    : 'bg-gradient-to-b from-black/60 via-black/20 to-transparent py-6';

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${navbarBg}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          
          {/* Logo */}
          <Link to="/" className="group flex items-center gap-2">
            <div className="w-9 h-9 border border-[#C5A880] flex items-center justify-center rounded-sm transition-transform duration-500 group-hover:rotate-45">
              <span className="text-[#C5A880] font-serif font-bold text-lg">A</span>
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-xl font-bold tracking-[0.2em] text-white uppercase">
                A U R A
              </span>
              <span className="text-[10px] tracking-[0.25em] text-[#C5A880] uppercase -mt-1 font-medium">
                Luxury Realty
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`text-sm tracking-widest uppercase transition-all duration-300 relative py-1 ${
                    isActive ? 'text-[#C5A880] font-semibold' : 'text-zinc-300 hover:text-white'
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <motion.div
                      layoutId="activeNavIndicator"
                      className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#C5A880]"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Actions: Favorites & CTA */}
          <div className="hidden lg:flex items-center space-x-5">
            {/* Favorites Icon */}
            <Link
              to="/properties?favorites=true"
              className="relative p-2 text-zinc-300 hover:text-[#C5A880] transition-colors"
              title="Saved Properties"
            >
              <Heart className="w-5 h-5" />
              {favorites.length > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#C5A880] text-[#121417] text-[10px] font-bold rounded-full flex items-center justify-center">
                  {favorites.length}
                </span>
              )}
            </Link>

            {/* Schedule Consultation CTA */}
            <button
              onClick={() => onOpenInquiryModal ? onOpenInquiryModal() : navigate('/contact')}
              className="px-5 py-2.5 bg-[#C5A880] hover:bg-[#b5966c] text-[#121417] text-xs uppercase tracking-widest font-semibold rounded-xs transition-all duration-300 shadow-md hover:shadow-lg flex items-center gap-2 cursor-pointer"
            >
              <span>Schedule Visit</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Mobile Right Controls */}
          <div className="flex md:hidden items-center space-x-3">
            <Link
              to="/properties?favorites=true"
              className="relative p-2 text-zinc-300 hover:text-[#C5A880]"
            >
              <Heart className="w-5 h-5" />
              {favorites.length > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#C5A880] text-[#121417] text-[10px] font-bold rounded-full flex items-center justify-center">
                  {favorites.length}
                </span>
              )}
            </Link>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-zinc-200 hover:text-white cursor-pointer"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </header>

      {/* Mobile Animated Menu Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-[#121417]/98 backdrop-blur-xl flex flex-col pt-24 px-6 pb-8 md:hidden"
          >
            <div className="flex flex-col space-y-6 text-center">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`text-lg tracking-widest uppercase py-2 border-b border-white/10 ${
                    location.pathname === link.path
                      ? 'text-[#C5A880] font-bold'
                      : 'text-zinc-300'
                  }`}
                >
                  {link.name}
                </Link>
              ))}

              <div className="pt-6 flex flex-col items-center gap-4">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenInquiryModal ? onOpenInquiryModal() : navigate('/contact');
                  }}
                  className="w-full py-3.5 bg-[#C5A880] text-[#121417] text-sm uppercase tracking-widest font-semibold rounded-xs shadow-lg flex items-center justify-center gap-2 cursor-pointer"
                >
                  <PhoneCall className="w-4 h-4" />
                  <span>Schedule Consultation</span>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
