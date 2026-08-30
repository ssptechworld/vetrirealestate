import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Compass, ShieldCheck, Award, Sparkles, ChevronRight } from 'lucide-react';
import SearchBar from '../components/SearchBar';
import PropertyCard from '../components/PropertyCard';
import StatsSection from '../components/StatsSection';
import { PROPERTIES_DATA } from '../data/properties';
import { fadeUp, staggerContainer, EASE_LUXURY } from '../utils/animations';

export default function Home({ onOpenInquiryModal }) {
  const navigate = useNavigate();
  const featuredProperties = PROPERTIES_DATA.filter((p) => p.isFeatured).slice(0, 3);

  const neighborhoods = [
    {
      name: "East Coast Road (ECR)",
      subtitle: "Oceanfront Havens & Coastal Estates",
      image: "https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=800&q=85",
      count: "12 Estates"
    },
    {
      name: "Boat Club & Adyar",
      subtitle: "Trophy Enclaves & Neoclassical Mansions",
      image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=85",
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
            src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=2000&q=90"
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
            <Sparkles className="w-3.5 h-3.5" />
            <span>South India’s Premier Estate Portfolio</span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.4, ease: EASE_LUXURY }}
            className="font-serif text-4xl sm:text-6xl md:text-7xl font-extrabold text-white tracking-tight leading-[1.1] max-w-4xl mx-auto"
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
              className="w-full sm:w-auto px-8 py-3.5 bg-[#C5A880] hover:bg-[#b5966c] text-[#121417] text-xs font-semibold uppercase tracking-widest rounded-xs shadow-xl transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
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

        {/* Hero Floating Search Bar (Appears slightly after hero text) */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.0, delay: 1.1, ease: EASE_LUXURY }}
          className="absolute bottom-6 left-4 right-4 z-20 hidden md:block"
        >
          <SearchBar />
        </motion.div>
      </section>

      {/* Mobile Search Bar Section */}
      <section className="block md:hidden px-4 py-8 bg-[#121417]">
        <SearchBar />
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
            <span className="text-xs uppercase tracking-widest text-[#C5A880] font-semibold block mb-2">
              Curated Selection
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#121417]">
              Featured Luxury Residences
            </h2>
          </div>

          <Link
            to="/properties"
            className="mt-4 md:mt-0 text-xs uppercase tracking-widest text-[#121417] hover:text-[#C5A880] font-semibold flex items-center gap-2 transition-colors group"
          >
            <span>View All Residences</span>
            <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </motion.div>

        {/* Properties Grid */}
        <motion.div
          variants={staggerContainer(0.15, 0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {featuredProperties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
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
            <span className="text-xs uppercase tracking-widest text-[#C5A880] font-semibold block mb-2">
              Prime Locations
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#121417]">
              Explore Prime Enclaves & Sanctuaries
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
                className="group relative aspect-[3/4] rounded-xs overflow-hidden cursor-pointer shadow-md border border-stone-200"
                onClick={() => navigate(`/properties?location=${encodeURIComponent(n.name)}`)}
              >
                <img
                  src={n.image}
                  alt={n.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#121417] via-[#121417]/40 to-transparent opacity-90 transition-opacity group-hover:opacity-80" />

                <div className="absolute bottom-6 left-6 right-6 text-white space-y-1">
                  <span className="text-[11px] uppercase tracking-widest text-[#C5A880] font-semibold">
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

      {/* 5. BRAND PHILOSOPHY & WHY AURA */}
      <section className="py-24 bg-[#121417] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              className="space-y-6"
            >
              <span className="text-xs uppercase tracking-widest text-[#C5A880] font-semibold">
                The AURA Distinction
              </span>

              <h2 className="font-serif text-3xl sm:text-5xl font-bold leading-tight">
                Architectural Mastery & Confidential Advisory
              </h2>

              <p className="text-zinc-300 text-sm leading-relaxed font-light">
                At AURA, we treat luxury real estate not as mere transactions, but as the art of curating life’s most significant spaces. Every villa, penthouse, and beachfront residence in our portfolio undergoes rigorous architectural evaluation.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-[#C5A880]">
                    <ShieldCheck className="w-5 h-5" />
                    <h4 className="font-serif text-base font-bold text-white">Confidential Off-Market</h4>
                  </div>
                  <p className="text-xs text-zinc-400 leading-relaxed">
                    Exclusive access to unlisted trophy properties reserved for high-net-worth buyers.
                  </p>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-[#C5A880]">
                    <Award className="w-5 h-5" />
                    <h4 className="font-serif text-base font-bold text-white">Vetted Architecture</h4>
                  </div>
                  <p className="text-xs text-zinc-400 leading-relaxed">
                    Selected for structural integrity, world-class finishes, and pristine locations.
                  </p>
                </div>
              </div>

              <div className="pt-4">
                <Link
                  to="/about"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-[#C5A880] text-[#121417] text-xs font-semibold uppercase tracking-widest rounded-xs hover:bg-[#b5966c] transition-colors"
                >
                  <span>Learn Our Philosophy</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </motion.div>

            {/* Side Image Collage */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              className="relative"
            >
              <div className="relative aspect-[4/3] rounded-xs overflow-hidden border border-white/10 shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=85"
                  alt="Architectural Luxury Interior"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Floating Quote Box */}
              <div className="absolute -bottom-8 -left-8 bg-[#1A1D22] border border-[#C5A880]/30 p-6 rounded-xs shadow-2xl max-w-xs hidden sm:block">
                <p className="font-serif italic text-xs text-zinc-300 leading-relaxed">
                  "AURA represented us in acquiring our ECR coastal sanctuary with absolute privacy and finesse."
                </p>
                <span className="text-[11px] uppercase tracking-widest text-[#C5A880] font-bold block mt-3">
                  — Industrialist Family Office
                </span>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* 6. CALL TO ACTION BANNER */}
      <section className="py-20 bg-[#FAF8F5] border-t border-stone-200">
        <div className="max-w-5xl mx-auto px-4 text-center space-y-6">
          <span className="text-xs uppercase tracking-widest text-[#C5A880] font-semibold block">
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
              className="w-full sm:w-auto px-8 py-3.5 bg-[#121417] text-white text-xs font-semibold uppercase tracking-widest rounded-xs hover:bg-[#C5A880] hover:text-[#121417] transition-colors shadow-lg cursor-pointer"
            >
              Book Private Consultation
            </button>
            <Link
              to="/properties"
              className="w-full sm:w-auto px-8 py-3.5 border border-[#121417] text-[#121417] text-xs font-semibold uppercase tracking-widest rounded-xs hover:bg-[#121417] hover:text-white transition-colors"
            >
              Browse All Listings
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
