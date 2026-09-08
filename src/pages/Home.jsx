import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Compass, Sparkles, ChevronRight } from 'lucide-react';
import PropertyCard from '../components/PropertyCard';
import PropertyCarousel from '../components/PropertyCarousel';
import StatsSection from '../components/StatsSection';
import { PROPERTIES_DATA } from '../data/properties';
import { fadeUp, staggerContainer, EASE_LUXURY } from '../utils/animations';
import homeHeroImg from '../assets/Home.png';
import workVideo from '../assets/work.mp4';
import Medavakkam from '../assets/Medavakkam.png';
import Porur from '../assets/Porur.png';

import { getOngoingProjects, getCompletedProjects, formatProjectForCarousel } from '../services/projectService';

export default function Home({ onOpenInquiryModal }) {
  const navigate = useNavigate();

  const [ongoingProperties, setOngoingProperties] = useState([]);
  const [completedProperties, setCompletedProperties] = useState([]);
  const [loadingOngoing, setLoadingOngoing] = useState(true);
  const [loadingCompleted, setLoadingCompleted] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const fetchOngoing = async () => {
      try {
        setLoadingOngoing(true);
        const data = await getOngoingProjects();
        if (isMounted) {
          const formatted = data.map(formatProjectForCarousel).filter(Boolean);
          setOngoingProperties(formatted);
        }
      } catch (err) {
        console.error('Ongoing projects fetch error:', err);
        if (isMounted) {
          // Fallback to static properties if server is offline or empty
          const fallback = PROPERTIES_DATA.slice(0, 4);
          setOngoingProperties(fallback);
        }
      } finally {
        if (isMounted) setLoadingOngoing(false);
      }
    };

    const fetchCompleted = async () => {
      try {
        setLoadingCompleted(true);
        const data = await getCompletedProjects();
        if (isMounted) {
          const formatted = data.map(formatProjectForCarousel).filter(Boolean);
          setCompletedProperties(formatted);
        }
      } catch (err) {
        console.error('Completed projects fetch error:', err);
        if (isMounted) {
          // Fallback to static properties if server is offline or empty
          const fallback = PROPERTIES_DATA.slice(4);
          setCompletedProperties(fallback);
        }
      } finally {
        if (isMounted) setLoadingCompleted(false);
      }
    };

    fetchOngoing();
    fetchCompleted();

    return () => {
      isMounted = false;
    };
  }, []);

  const neighborhoods = [
    {
      name: "East Coast Road (ECR)",
      subtitle: "Oceanfront Havens & Coastal Estates",
      image: Medavakkam,
      count: "12 Estates"
    },
    {
      name: "Boat Club & Adyar",
      subtitle: "Trophy Enclaves & Neoclassical Mansions",
      image: Porur,
      count: "6 Off-Market Residences"
    },
    {
      name: "Anna Nagar Boulevard",
      subtitle: "High-Rise Sky Villas & Penthouses",
      image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=85",
      count: "9 Penthouses"
    },
    {
      name: "Mahabalipuram Coast",
      subtitle: "Modernist Beach Retreats",
      image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=85",
      count: "8 Villas"
    }
  ];

  return (
    <div className="min-h-screen bg-[#FAF8F5]">

      {/* 1. CINEMATIC HERO SECTION */}
      <section className="relative h-screen min-h-[700px] flex items-center justify-center overflow-hidden">
        {/* Background Image with Slow Parallax Scale */}
        <motion.div
          initial={{ scale: 1.15 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2.5, ease: EASE_LUXURY }}
          className="absolute inset-0 z-0"
        >
          <img
            src={homeHeroImg}
            alt="Luxury Waterfront Villa Hero"
            className="w-full h-full object-cover"
          />
          {/* Subtle Dark Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#121417] via-[#121417]/50 to-[#121417]/30" />
        </motion.div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-20 pb-32">

          {/* Subtle Top Tag */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[#C5A880] text-xs font-semibold tracking-widest uppercase mb-6"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#C5A880]" />
            <span>South India’s Premier Estate Portfolio</span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.4, ease: EASE_LUXURY }}
            className="font-serif text-4xl sm:text-6xl md:text-7xl font-extrabold text-white tracking-tight leading-[1.1] max-w-4xl mx-auto drop-shadow-sm"
          >
            Find a place that feels like home.
          </motion.h1>

          {/* Supporting Text */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-stone-300 text-base sm:text-xl font-light max-w-2xl mx-auto mt-6 leading-relaxed"
          >
            Discover exceptional coastal villas, sky penthouses, and architectural sanctuaries in the locations you love.
          </motion.p>

          {/* Dual CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8"
          >
            <Link
              to="/properties"
              className="w-full sm:w-auto px-8 py-3.5 bg-[#C5A880] hover:bg-[#b5966c] text-[#121417] text-xs font-bold uppercase tracking-widest rounded-xs shadow-xl transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Explore Properties</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <button
              onClick={() => onOpenInquiryModal ? onOpenInquiryModal() : navigate('/contact')}
              className="w-full sm:w-auto px-8 py-3.5 bg-white/10 hover:bg-white/20 text-white border border-white/20 text-xs font-semibold uppercase tracking-widest rounded-xs backdrop-blur-md transition-all duration-300 cursor-pointer"
            >
              Schedule a Visit
            </button>
          </motion.div>

        </div>
      </section>

      {/* 2. FEATURED PROPERTIES */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-12 border-b border-stone-200 pb-6"
        >
          <div>
            <span className="text-xs uppercase tracking-widest text-[#C5A880] font-bold block mb-2">
              OUR ONGOING PROJECTS
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#121417]">
              Featured Luxury Residences
            </h2>
          </div>

          <Link
            to="/properties"
            className="mt-4 md:mt-0 text-xs uppercase tracking-widest text-[#121417] hover:text-[#C5A880] font-bold flex items-center gap-2 transition-colors group"
          >
            <span>View All Residences</span>
            <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </motion.div>
        {/* Properties Carousel */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {loadingOngoing ? (
            <div className="py-12 flex justify-center items-center gap-3 text-[#C5A880]">
              <div className="w-5 h-5 border-2 border-[#C5A880] border-t-transparent rounded-full animate-spin" />
              <span className="uppercase tracking-widest font-medium text-xs text-zinc-600">Loading Ongoing Projects...</span>
            </div>
          ) : ongoingProperties.length > 0 ? (
            <PropertyCarousel properties={ongoingProperties} />
          ) : (
            <div className="py-12 text-center text-zinc-500 bg-white border border-stone-200/60 rounded-xs">
              <p className="text-sm font-medium">No ongoing projects available.</p>
            </div>
          )}
        </motion.div>

      </section>

      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-12 border-b border-stone-200 pb-6"
        >
          <div>
            <span className="text-xs uppercase tracking-widest text-[#C5A880] font-bold block mb-2">
              OUR COMPLETED PROJECTS
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#121417]">
              Featured Luxury Residences
            </h2>
          </div>

          <Link
            to="/properties"
            className="mt-4 md:mt-0 text-xs uppercase tracking-widest text-[#121417] hover:text-[#C5A880] font-bold flex items-center gap-2 transition-colors group"
          >
            <span>View All Residences</span>
            <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </motion.div>

        {/* Properties Carousel */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {loadingCompleted ? (
            <div className="py-12 flex justify-center items-center gap-3 text-[#C5A880]">
              <div className="w-5 h-5 border-2 border-[#C5A880] border-t-transparent rounded-full animate-spin" />
              <span className="uppercase tracking-widest font-medium text-xs text-zinc-600">Loading Completed Projects...</span>
            </div>
          ) : completedProperties.length > 0 ? (
            <PropertyCarousel properties={completedProperties} />
          ) : (
            <div className="py-12 text-center text-zinc-500 bg-white border border-stone-200/60 rounded-xs">
              <p className="text-sm font-medium">No completed projects available.</p>
            </div>
          )}
        </motion.div>

      </section>

      {/* 3. ANIMATED STATS SECTION */}
      <StatsSection dark={true} />

      {/* 4. NEIGHBORHOOD SPOTLIGHT */}
      <section className="py-24 bg-[#FAF8F5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <span className="text-xs uppercase tracking-widest text-[#C5A880] font-bold block mb-2">
              Prime Locations
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#121417]">
              Explore Prime Flats & Plots
            </h2>
            <p className="text-zinc-600 text-sm mt-3">
              From oceanfront coastal corridors along ECR to discrete diplomatic enclaves in Boat Club.
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer(0.12, 0.1)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {neighborhoods.map((n, idx) => (
              <motion.div
                key={idx}
                variants={fadeUp}
                whileHover={{ y: -6 }}
                className="group relative aspect-[3/4] rounded-xs overflow-hidden cursor-pointer shadow-md border border-stone-200 bg-[#121417]"
                onClick={() => navigate(`/properties?location=${encodeURIComponent(n.name)}`)}
              >
                <img
                  src={n.image}
                  alt={n.name}
                  className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#121417] via-[#121417]/30 to-transparent opacity-90 transition-opacity group-hover:opacity-80 pointer-events-none" />

                <div className="absolute bottom-6 left-6 right-6 text-white space-y-1">
                  <span className="text-[11px] uppercase tracking-widest text-[#C5A880] font-bold">
                    {n.count}
                  </span>
                  <h3 className="font-serif text-xl font-bold">{n.name}</h3>
                  <p className="text-xs text-zinc-300 font-light opacity-90">{n.subtitle}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>

        </div>
      </section>

      {/* 5. OUR WORK - CINEMATIC SHOWCASE */}
      <section className="py-12 sm:py-20 md:py-24 bg-[#121417] text-white overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Top Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, ease: EASE_LUXURY }}
            className="text-center mb-6 sm:mb-10"
          >
            <h2 className="font-serif text-xs sm:text-sm font-bold uppercase tracking-[0.3em] text-[#C5A880]">
              BUILT BY US
            </h2>
          </motion.div>

          {/* Cinematic Video Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 20 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.9, ease: EASE_LUXURY }}
            className="relative max-w-4xl mx-auto w-full aspect-video rounded-xs sm:rounded-sm overflow-hidden shadow-2xl border border-white/10"
          >
            <video
              src={workVideo}
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              className="w-full h-full object-cover"
            />
            {/* Subtle Dark Gradient Overlay at Edges */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#121417]/25 via-transparent to-[#121417]/15" />
          </motion.div>

        </div>
      </section>

      {/* 6. CALL TO ACTION BANNER */}
      <section className="py-20 bg-[#FAF8F5] border-t border-stone-200">
        <div className="max-w-5xl mx-auto px-4 text-center space-y-6">
          <span className="text-xs uppercase tracking-widest text-[#C5A880] font-bold block">
            Begin Your Journey
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-[#121417]">
            Ready to find your exclusive sanctuary?
          </h2>
          <p className="text-zinc-600 text-sm max-w-xl mx-auto">
            Speak directly with our private advisory team or schedule a confidential viewing of our coastal and metropolitan portfolio.
          </p>
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => onOpenInquiryModal ? onOpenInquiryModal() : navigate('/contact')}
              className="w-full sm:w-auto px-8 py-3.5 bg-[#121417] text-white text-xs font-bold uppercase tracking-widest rounded-xs hover:bg-[#C5A880] hover:text-[#121417] transition-colors shadow-lg cursor-pointer"
            >
              Book Private Consultation
            </button>
            <Link
              to="/properties"
              className="w-full sm:w-auto px-8 py-3.5 border border-[#121417] text-[#121417] text-xs font-bold uppercase tracking-widest rounded-xs hover:bg-[#121417] hover:text-white transition-colors"
            >
              Browse All Listings
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}

