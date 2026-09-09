import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Menu, X, Calendar, ChevronRight, Sparkles } from 'lucide-react';
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
    { name: 'Projects', path: '/properties' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'About Us', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  const navbarBg = scrolled || !isHomePage
    ? 'bg-[#0E1013]/95 backdrop-blur-2xl border border-[#C5A880]/30 shadow-2xl py-3 px-6 rounded-full max-w-6xl mx-auto my-3'
    : 'bg-[#0E1013]/80 backdrop-blur-xl border border-white/15 shadow-2xl py-3.5 px-6 rounded-full max-w-6xl mx-auto my-4';

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 px-4 transition-all duration-500">
        <div className={`transition-all duration-500 flex items-center justify-between ${navbarBg}`}>
          
          {/* Brand Logo */}
          <Link to="/" className="group flex items-center gap-2.5">
            <div className="w-9 h-9 border border-[#C5A880]/80 bg-[#121417] flex items-center justify-center rounded-full transition-all duration-500 group-hover:border-[#C5A880] group-hover:scale-105 shadow-md">
              <span className="text-[#C5A880] font-serif font-bold text-xs tracking-tighter">V V</span>
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-base sm:text-lg font-bold tracking-[0.2em] text-white uppercase leading-none">
                VETRI VEL
              </span>
              <span className="text-[8px] tracking-[0.3em] text-[#C5A880] uppercase mt-0.5 font-semibold">
                REAL ESTATE
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
                  className={`text-xs tracking-[0.2em] uppercase transition-all duration-300 relative py-1 font-semibold ${
                    isActive ? 'text-[#C5A880]' : 'text-stone-300 hover:text-white'
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <motion.div
                      layoutId="activeNavIndicator"
                      className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#C5A880] rounded-full"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right Actions */}
          <div className="hidden lg:flex items-center space-x-4">
            {/* Favorites Counter */}
            <Link
              to="/properties?favorites=true"
              className="relative p-2 text-stone-300 hover:text-[#C5A880] transition-colors"
              title="Saved Properties"
            >
              <Heart className="w-4 h-4" />
              {favorites.length > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#C5A880] text-[#121417] text-[9px] font-bold rounded-full flex items-center justify-center">
                  {favorites.length}
                </span>
              )}
            </Link>

            {/* Book a Site Visit CTA */}
            <button
              onClick={() => onOpenInquiryModal ? onOpenInquiryModal() : navigate('/contact')}
              className="px-4 py-2 bg-[#C5A880] hover:bg-[#b5966c] text-[#121417] text-[11px] uppercase tracking-widest font-bold rounded-full transition-all duration-300 shadow-xl flex items-center gap-1.5 cursor-pointer"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Book a Visit</span>
            </button>
          </div>

          {/* Mobile Right Controls */}
          <div className="flex md:hidden items-center space-x-3">
            <Link
              to="/properties?favorites=true"
              className="relative p-2 text-stone-300 hover:text-[#C5A880]"
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
              className="p-2 text-stone-200 hover:text-white cursor-pointer"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </header>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-[#0E1013]/98 backdrop-blur-2xl flex flex-col pt-28 px-6 pb-8 md:hidden justify-between"
          >
            <div className="flex flex-col space-y-6 text-center">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C5A880]/10 text-[#C5A880] text-[10px] font-bold tracking-widest uppercase mx-auto border border-[#C5A880]/20 mb-2">
                <Sparkles className="w-3 h-3" />
                <span>Luxury Real Estate</span>
              </div>

              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`text-lg tracking-[0.2em] uppercase py-2.5 border-b border-white/10 ${
                    location.pathname === link.path
                      ? 'text-[#C5A880] font-bold'
                      : 'text-stone-300'
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
                  className="w-full py-4 bg-[#C5A880] text-[#121417] text-xs uppercase tracking-widest font-bold rounded-xs shadow-xl flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Book a Site Visit</span>
                </button>
              </div>
            </div>

            <div className="text-center text-[10px] text-stone-500 uppercase tracking-widest pt-8 border-t border-white/10">
              © {new Date().getFullYear()} Vetri Vel Real Estate. Premium Living.
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

