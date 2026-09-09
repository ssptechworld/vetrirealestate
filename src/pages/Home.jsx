import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  Sparkles,
  ChevronRight,
  Award,
  ShieldCheck,
  Layers,
  Volume2,
  VolumeX,
  Building2,
  Compass,
  KeyRound,
  HeartHandshake,
  MapPin,
  Calendar,
  Quote,
  Star
} from 'lucide-react';
import PropertyCard from '../components/PropertyCard';
import PropertyCarousel from '../components/PropertyCarousel';
import StatsSection from '../components/StatsSection';
import { PROPERTIES_DATA } from '../data/properties';
import { fadeUp, staggerContainer, EASE_LUXURY } from '../utils/animations';
import homeHeroImg from '../assets/Home.png';
import workVideo from '../assets/work.mp4';
import builtByUsBg from '../assets/built_by_us_bg.jpg';
import Medavakkam from '../assets/Medavakkam.png';
import Porur from '../assets/Porur.png';

import { getOngoingProjects, getCompletedProjects, formatProjectForCarousel } from '../services/projectService';

export default function Home({ onOpenInquiryModal }) {
  const navigate = useNavigate();

  const [ongoingProperties, setOngoingProperties] = useState([]);
  const [completedProperties, setCompletedProperties] = useState([]);
  const [loadingOngoing, setLoadingOngoing] = useState(true);
  const [loadingCompleted, setLoadingCompleted] = useState(true);
  const [isVideoMuted, setIsVideoMuted] = useState(true);

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

  const storySteps = [
    {
      step: "01",
      title: "VISION",
      subtitle: "Thoughtful Master Plan",
      desc: "Conceptualized for modern family living with maximum spatial efficiency, Vastu alignment, and natural daylighting."
    },
    {
      step: "02",
      title: "DESIGN",
      subtitle: "Architectural Precision",
      desc: "Engineered by leading structural architects with climate-responsive facades and luxury ventilation corridors."
    },
    {
      step: "03",
      title: "CONSTRUCTION",
      subtitle: "Uncompromised Integrity",
      desc: "Built using seismic RCC foundations, certified grade steel, premium teak joinery, and imported stone finishes."
    },
    {
      step: "04",
      title: "COMPLETION",
      subtitle: "Flawless Handover",
      desc: "Rigorous 100-point structural inspection and full statutory clearances before keys are delivered."
    },
    {
      step: "05",
      title: "YOUR HOME",
      subtitle: "Ready For Modern Living",
      desc: "Step directly into a completed apartment with complete legal titles, zero waiting, and immediate peace of mind."
    }
  ];

  const trustPillars = [
    {
      num: "01",
      icon: Building2,
      title: "QUALITY CONSTRUCTION",
      desc: "Seismic-resistant RCC structural framing, premium teak doors, and grade-A certified materials in every building."
    },
    {
      num: "02",
      icon: MapPin,
      title: "PREMIUM LOCATIONS",
      desc: "Strategic sites along East Coast Road, Boat Club, Adyar, and key metropolitan corridors with high appreciation."
    },
    {
      num: "03",
      icon: Compass,
      title: "THOUGHTFUL DESIGN",
      desc: "Optimum floor planning with 100% Vastu compliance, cross-ventilation, and generous natural daylighting."
    },
    {
      num: "04",
      icon: ShieldCheck,
      title: "TRANSPARENT PROCESS",
      desc: "Clean legal documentation, clear approvals, and absolute clarity with zero hidden costs at handover."
    },
    {
      num: "05",
      icon: KeyRound,
      title: "READY-TO-MOVE HOMES",
      desc: "Skip long waiting periods. Explore fully completed residences ready for immediate occupancy today."
    },
    {
      num: "06",
      icon: HeartHandshake,
      title: "CUSTOMER TRUST",
      desc: "Over 500+ happy families residing in Vetri Vel developments across Tamil Nadu with ongoing support."
    }
  ];

  const neighborhoods = [
    {
      name: "East Coast Road (ECR)",
      subtitle: "Coastal Havens & Oceanfront Estates",
      image: Medavakkam,
      count: "Completed & Ready Flats"
    },
    {
      name: "Boat Club & Adyar",
      subtitle: "Trophy Enclaves & Luxury Residences",
      image: Porur,
      count: "Exclusive Apartments"
    },
    {
      name: "Anna Nagar Corridor",
      subtitle: "Modern High-Rise Residences",
      image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=85",
      count: "Ready To Move"
    },
    {
      name: "Mahabalipuram Belt",
      subtitle: "Serene Architectural Retreats",
      image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=85",
      count: "Luxury Projects"
    }
  ];

  const testimonials = [
    {
      quote: "Moving into our Vetri Vel completed apartment was seamless. The structural quality, ventilation, and finish exceeded all our expectations.",
      author: "Rajesh & Priya Sundaram",
      project: "Vetri Vel Coastal Enclave",
      rating: 5
    },
    {
      quote: "Clear documentation, on-time handover, and absolute transparency. Vetri Vel delivered exactly what they promised.",
      author: "K. Venkatesh",
      project: "Vetri Vel Skyline Residences",
      rating: 5
    },
    {
      quote: "The attention to detail in room layouts and teak joinery shows their commitment to real quality. Highly recommended!",
      author: "Dr. Ananya Murthy",
      project: "Vetri Vel Gardenia",
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen bg-[#FAF8F5] overflow-hidden">

      {/* 1. ARCHITECTURAL HERO SECTION WITH GRAND ARCH FRAME */}
      <section className="relative pt-32 pb-20 sm:pt-40 sm:pb-28 bg-[#0E1013] text-white">
        {/* Soft Background Radial Light Orbs */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-[radial-gradient(ellipse_70%_60%_at_50%_0%,rgba(197,168,128,0.22)_0%,transparent_75%)] blur-3xl" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">

          {/* Curved Pill Status Badge */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[#C5A880] text-[11px] font-bold tracking-[0.25em] uppercase shadow-2xl mx-auto"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#C5A880]" />
            <span>Ready-To-Move Completed Residences</span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.3, ease: EASE_LUXURY }}
            className="font-serif text-4xl sm:text-6xl md:text-7xl font-bold tracking-[0.04em] leading-[1.12] max-w-5xl mx-auto text-white uppercase drop-shadow-2xl"
          >
            <span>YOUR HOME. </span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFF6EA] via-[#E5C9A4] to-[#C5A880] italic font-semibold">
              READY WHEN YOU ARE.
            </span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-stone-300 text-base sm:text-xl font-light max-w-2xl mx-auto leading-relaxed"
          >
            Discover thoughtfully designed completed residences created for modern living with uncompromised structural quality.
          </motion.p>

          {/* Rounded CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2"
          >
            <Link
              to="/properties"
              className="w-full sm:w-auto px-9 py-4 bg-[#C5A880] hover:bg-[#B5966C] text-[#121417] text-xs font-bold uppercase tracking-[0.2em] rounded-full shadow-2xl transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer hover:scale-105"
            >
              <span>Explore Our Homes</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <button
              onClick={() => onOpenInquiryModal ? onOpenInquiryModal() : navigate('/contact')}
              className="w-full sm:w-auto px-9 py-4 bg-white/10 hover:bg-white/20 text-white border border-white/25 text-xs font-bold uppercase tracking-[0.2em] rounded-full backdrop-blur-md transition-all duration-300 cursor-pointer shadow-xl flex items-center justify-center gap-2 hover:scale-105"
            >
              <Calendar className="w-4 h-4 text-[#C5A880]" />
              <span>Book a Site Visit</span>
            </button>
          </motion.div>

          {/* Grand Architectural Arch Frame Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1.1, delay: 0.8, ease: EASE_LUXURY }}
            className="relative max-w-5xl mx-auto pt-6"
          >
            <div className="relative aspect-[16/9] sm:aspect-[21/9] overflow-hidden rounded-t-[140px] sm:rounded-t-[260px] rounded-b-[36px] sm:rounded-b-[48px] border-2 border-white/20 shadow-2xl group">
              <img
                src={homeHeroImg}
                alt="Architectural Masterpiece Completed Residence"
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-1000 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0E1013] via-transparent to-[#0E1013]/30" />

              {/* Floating Architectural Badge */}
              <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between z-10 text-white">
                <div className="bg-[#0E1013]/85 backdrop-blur-md px-5 py-3 rounded-full border border-white/20 flex items-center gap-3">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#C5A880] animate-pulse" />
                  <span className="text-xs font-bold tracking-widest uppercase text-stone-200">
                    Grand Completed Sanctuary Handover
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

        </div>

        {/* Concave SVG Section Curve Divider */}
        <div className="w-full overflow-hidden leading-none mt-16">
          <svg viewBox="0 0 1440 100" className="w-full h-12 sm:h-20 text-[#FAF8F5] fill-current" preserveAspectRatio="none">
            <path d="M0,0 C480,100 960,100 1440,0 L1440,100 L0,100 Z"></path>
          </svg>
        </div>
      </section>

      {/* 2. PROJECT STORYTELLING: VISION TO YOUR HOME WITH CURVED CARDS */}
      <section className="py-16 sm:py-24 bg-[#FAF8F5] text-[#121417]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="text-center max-w-3xl mx-auto mb-16 space-y-3"
          >
            <span className="text-xs uppercase tracking-[0.25em] text-[#C5A880] font-bold block">
              Architectural Storytelling
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-[#121417]">
              From Vision to Your Ready Home
            </h2>
            <p className="text-stone-600 text-xs sm:text-sm font-light max-w-xl mx-auto">
              Every completed Vetri Vel residence follows a disciplined journey of design integrity, seismic construction, and timely handover.
            </p>
          </motion.div>

          {/* Curved Pill Cards Story Grid */}
          <motion.div
            variants={staggerContainer(0.12, 0.1)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6"
          >
            {storySteps.map((step, idx) => (
              <motion.div
                key={idx}
                variants={fadeUp}
                whileHover={{ y: -8 }}
                className="bg-white p-7 rounded-[36px] border border-stone-200/90 hover:border-[#C5A880]/70 shadow-md hover:shadow-2xl transition-all duration-300 flex flex-col justify-between space-y-5 group relative"
              >
                <div className="space-y-3">
                  <span className="text-3xl font-serif font-bold text-[#C5A880]">
                    {step.step}
                  </span>
                  <div>
                    <h3 className="font-serif text-lg font-bold text-[#121417] group-hover:text-[#C5A880] transition-colors">
                      {step.title}
                    </h3>
                    <p className="text-[10px] font-bold text-stone-400 tracking-widest uppercase mt-0.5">
                      {step.subtitle}
                    </p>
                  </div>
                  <p className="text-xs text-stone-600 font-light leading-relaxed">
                    {step.desc}
                  </p>
                </div>

                <div className="pt-3 border-t border-stone-100 flex items-center justify-between text-[10px] text-[#C5A880] uppercase tracking-widest font-bold">
                  <span>Step {idx + 1}</span>
                  <ChevronRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </div>
              </motion.div>
            ))}
          </motion.div>

        </div>
      </section>

      {/* 3. FEATURED SHOWCASE: COMPLETED RESIDENCES */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-12 border-b border-stone-200 pb-6"
        >
          <div>
            <span className="text-xs uppercase tracking-[0.2em] text-[#C5A880] font-bold block mb-2">
              READY FOR OCCUPANCY
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#121417]">
              Completed Residences Showcase
            </h2>
            <p className="text-xs text-stone-500 mt-1 font-light">
              Explore completed apartments with verified handovers and ready key access.
            </p>
          </div>

          <Link
            to="/properties"
            className="mt-4 md:mt-0 text-xs uppercase tracking-[0.2em] text-[#121417] hover:text-[#C5A880] font-bold flex items-center gap-2 transition-colors group"
          >
            <span>Explore All Projects</span>
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
            <div className="py-16 flex justify-center items-center gap-3 text-[#C5A880]">
              <div className="w-5 h-5 border-2 border-[#C5A880] border-t-transparent rounded-full animate-spin" />
              <span className="uppercase tracking-widest font-bold text-xs text-stone-600">Loading Completed Residences...</span>
            </div>
          ) : completedProperties.length > 0 ? (
            <PropertyCarousel properties={completedProperties} />
          ) : (
            <div className="py-12 text-center text-stone-500 bg-white border border-stone-200/80 rounded-3xl">
              <p className="text-sm font-medium">No completed projects currently listed in database.</p>
            </div>
          )}
        </motion.div>

      </section>

      {/* 4. ONGOING PROJECTS SECTION */}
      <section className="py-20 bg-[#F5F2EC] border-y border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Section Header */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="flex flex-col md:flex-row md:items-end justify-between mb-12 border-b border-stone-300 pb-6"
          >
            <div>
              <span className="text-xs uppercase tracking-[0.2em] text-[#C5A880] font-bold block mb-2">
                UNDER ACTIVE DEVELOPMENT
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#121417]">
                Ongoing Flagship Projects
              </h2>
            </div>

            <Link
              to="/properties"
              className="mt-4 md:mt-0 text-xs uppercase tracking-[0.2em] text-[#121417] hover:text-[#C5A880] font-bold flex items-center gap-2 transition-colors group"
            >
              <span>View All Listings</span>
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
              <div className="py-16 flex justify-center items-center gap-3 text-[#C5A880]">
                <div className="w-5 h-5 border-2 border-[#C5A880] border-t-transparent rounded-full animate-spin" />
                <span className="uppercase tracking-widest font-bold text-xs text-stone-600">Loading Ongoing Developments...</span>
              </div>
            ) : ongoingProperties.length > 0 ? (
              <PropertyCarousel properties={ongoingProperties} />
            ) : (
              <div className="py-12 text-center text-stone-500 bg-white border border-stone-200/80 rounded-3xl">
                <p className="text-sm font-medium">No ongoing developments listed.</p>
              </div>
            )}
          </motion.div>

        </div>
      </section>

      {/* 5. "WHY CHOOSE US" / TRUST PILLARS SECTION WITH FLOATING CARDS */}
      <section className="py-24 bg-[#FAF8F5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="text-center max-w-3xl mx-auto mb-16 space-y-3"
          >
            <span className="text-xs uppercase tracking-[0.25em] text-[#C5A880] font-bold block">
              REAL VALUE & TRUST
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-bold text-[#121417]">
              Why Choose Vetri Vel Real Estate
            </h2>
            <p className="text-stone-600 text-xs sm:text-sm max-w-xl mx-auto font-light">
              Built on uncompromising engineering standards, clear legal titles, and authentic customer relationships.
            </p>
          </motion.div>

          {/* 6 Curved Floating Cards */}
          <motion.div
            variants={staggerContainer(0.1, 0.1)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {trustPillars.map((p, i) => {
              const Icon = p.icon;
              return (
                <motion.div
                  key={i}
                  variants={fadeUp}
                  whileHover={{ y: -8 }}
                  className="bg-white p-8 rounded-[36px] border border-stone-200/90 shadow-md hover:shadow-2xl transition-all duration-300 space-y-4 relative group"
                >
                  <div className="flex items-center justify-between">
                    <div className="w-13 h-13 rounded-full bg-[#FAF8F5] border border-[#C5A880]/40 text-[#C5A880] flex items-center justify-center group-hover:bg-[#121417] group-hover:text-white transition-colors duration-300">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-2xl font-serif font-bold text-[#C5A880]">
                      {p.num}
                    </span>
                  </div>

                  <h3 className="font-serif text-lg font-bold text-[#121417] group-hover:text-[#C5A880] transition-colors">
                    {p.title}
                  </h3>

                  <p className="text-xs text-stone-600 leading-relaxed font-light">
                    {p.desc}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>

        </div>
      </section>

      {/* 6. CINEMATIC VIDEO SHOWCASE WITH ARCH VIDEO MASK */}
      <section className="group relative py-24 bg-[#0E1013] text-white overflow-hidden">
        {/* Background Architectural Glow */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <img
            src={builtByUsBg}
            alt=""
            className="w-full h-full object-cover opacity-20 group-hover:scale-105 transition-transform duration-1000 ease-out"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0E1013]/90 via-[#0E1013]/70 to-[#0E1013]/95" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[radial-gradient(circle,rgba(197,168,128,0.18)_0%,transparent_70%)] blur-3xl pointer-events-none" />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, ease: EASE_LUXURY }}
            className="text-center max-w-3xl mx-auto mb-14 space-y-4"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#C5A880]/10 border border-[#C5A880]/30 text-[#C5A880] text-[11px] font-bold tracking-[0.25em] uppercase">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Cinematic Showroom</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-white leading-tight">
              Masterpieces Built By Us. <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#E5D2B8] to-[#C5A880]">
                Crafted for Generations.
              </span>
            </h2>

            <p className="text-stone-400 text-xs sm:text-sm font-light leading-relaxed max-w-xl mx-auto">
              Step inside our luxury developments — engineered with structural perfection, luxury craftsmanship, and timeless aesthetics.
            </p>
          </motion.div>

          {/* Curved Video Frame */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 20 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.9, ease: EASE_LUXURY }}
            className="relative max-w-4xl mx-auto my-6"
          >
            <div className="absolute -inset-1 rounded-[40px] bg-gradient-to-r from-[#C5A880]/30 via-white/10 to-[#C5A880]/30 blur-md opacity-70 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

            <div className="relative aspect-video rounded-[36px] overflow-hidden shadow-2xl border border-white/20 bg-black">
              <video
                src={workVideo}
                autoPlay
                muted={isVideoMuted}
                loop
                playsInline
                preload="metadata"
                className="w-full h-full object-cover"
              />

              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0E1013]/60 via-transparent to-[#0E1013]/30" />

              <button
                onClick={() => setIsVideoMuted(!isVideoMuted)}
                className="absolute bottom-4 right-4 z-20 px-3.5 py-2 rounded-full bg-black/60 hover:bg-black/90 text-white border border-white/20 backdrop-blur-md transition-all duration-300 shadow-xl cursor-pointer flex items-center gap-2 text-xs"
                title={isVideoMuted ? "Unmute Audio" : "Mute Audio"}
              >
                {isVideoMuted ? (
                  <>
                    <VolumeX className="w-4 h-4 text-[#C5A880]" />
                    <span className="hidden sm:inline text-[11px] font-semibold tracking-wider uppercase text-stone-300">Sound Off</span>
                  </>
                ) : (
                  <>
                    <Volume2 className="w-4 h-4 text-[#C5A880]" />
                    <span className="hidden sm:inline text-[11px] font-semibold tracking-wider uppercase text-stone-300">Sound On</span>
                  </>
                )}
              </button>

              <div className="hidden sm:flex items-center gap-2.5 absolute top-4 left-4 z-20 px-4 py-1.5 rounded-full bg-[#0E1013]/85 backdrop-blur-md border border-white/20 text-white text-[11px] font-medium tracking-wide shadow-lg">
                <Award className="w-3.5 h-3.5 text-[#C5A880]" />
                <span>100% Certified Structural Excellence</span>
              </div>
            </div>
          </motion.div>

        </div>
      </section>

      {/* 7. ANIMATED ACHIEVEMENTS COUNTER */}
      <StatsSection dark={true} />

      {/* 8. CUSTOMER TESTIMONIALS WITH ROUNDED CARDS */}
      <section className="py-24 bg-[#F5F2EC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="text-center max-w-2xl mx-auto mb-16 space-y-3"
          >
            <span className="text-xs uppercase tracking-[0.2em] text-[#C5A880] font-bold block">
              RESIDENT TESTIMONIALS
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#121417]">
              Words from Our Homeowners
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((item, idx) => (
              <motion.div
                key={idx}
                variants={fadeUp}
                whileHover={{ y: -6 }}
                className="bg-white p-8 rounded-[36px] border border-stone-200/90 shadow-md flex flex-col justify-between space-y-6"
              >
                <div className="space-y-4">
                  <div className="flex items-center gap-1 text-[#C5A880]">
                    {[...Array(item.rating)].map((_, rIdx) => (
                      <Star key={rIdx} className="w-4 h-4 fill-current" />
                    ))}
                  </div>

                  <Quote className="w-8 h-8 text-[#C5A880]/30" />

                  <p className="text-xs sm:text-sm text-stone-700 font-light leading-relaxed italic">
                    "{item.quote}"
                  </p>
                </div>

                <div className="pt-4 border-t border-stone-100">
                  <h4 className="font-serif font-bold text-[#121417] text-sm">{item.author}</h4>
                  <p className="text-[11px] text-[#C5A880] font-semibold">{item.project}</p>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* 9. ARCH LOCATION DISCOVERY GRID */}
      <section className="py-24 bg-[#FAF8F5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <span className="text-xs uppercase tracking-[0.25em] text-[#C5A880] font-bold block mb-2">
              Prime Locations
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#121417]">
              Explore Completed Projects by Area
            </h2>
            <p className="text-stone-600 text-xs sm:text-sm mt-2 font-light">
              From oceanfront coastal corridors along ECR to discrete enclaves in Adyar and Anna Nagar.
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
                whileHover={{ y: -8 }}
                className="group relative aspect-[3/4] rounded-t-[120px] rounded-b-[32px] overflow-hidden cursor-pointer shadow-md hover:shadow-2xl border border-stone-200 bg-[#121417]"
                onClick={() => navigate(`/properties?location=${encodeURIComponent(n.name)}`)}
              >
                <img
                  src={n.image}
                  alt={n.name}
                  className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0E1013] via-[#0E1013]/30 to-transparent opacity-90 transition-opacity group-hover:opacity-80 pointer-events-none" />

                <div className="absolute bottom-6 left-6 right-6 text-white space-y-1">
                  <span className="text-[11px] uppercase tracking-widest text-[#C5A880] font-bold">
                    {n.count}
                  </span>
                  <h3 className="font-serif text-xl font-bold">{n.name}</h3>
                  <p className="text-xs text-stone-300 font-light opacity-90">{n.subtitle}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>

        </div>
      </section>

      {/* 10. GRAND ARCHITECTURAL ENTRANCE CTA */}
      <section className="py-20 bg-[#FAF8F5] relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-4">
          <div className="bg-[#0E1013] text-white rounded-t-[140px] sm:rounded-t-[220px] rounded-b-[48px] p-10 sm:p-20 text-center relative overflow-hidden border border-[#C5A880]/30 shadow-2xl">
            {/* Background Ambient Glow */}
            <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_50%_40%,rgba(197,168,128,0.4),transparent_75%)] pointer-events-none" />

            <div className="relative z-10 max-w-3xl mx-auto space-y-7">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#C5A880]/10 border border-[#C5A880]/30 text-[#C5A880] text-[11px] font-bold tracking-[0.25em] uppercase mx-auto">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Completed Living</span>
              </div>

              <h2 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-white uppercase leading-tight">
                READY TO FIND YOUR NEXT HOME?
              </h2>

              <p className="text-stone-300 text-sm sm:text-base font-light leading-relaxed max-w-xl mx-auto">
                Explore our completed residences and discover a place that feels like yours. Book a private walk-through or speak with our sales advisory team today.
              </p>

              <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  to="/properties"
                  className="w-full sm:w-auto px-9 py-4 bg-[#C5A880] hover:bg-[#B5966C] text-[#121417] text-xs font-bold uppercase tracking-[0.2em] rounded-full transition-all duration-300 shadow-2xl flex items-center justify-center gap-2 cursor-pointer hover:scale-105"
                >
                  <span>Explore Our Homes</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <button
                  onClick={() => onOpenInquiryModal ? onOpenInquiryModal() : navigate('/contact')}
                  className="w-full sm:w-auto px-9 py-4 bg-white/10 border border-white/25 text-white hover:bg-white/20 text-xs font-bold uppercase tracking-[0.2em] rounded-full transition-all duration-300 shadow-xl flex items-center justify-center gap-2 cursor-pointer hover:scale-105"
                >
                  <Calendar className="w-4 h-4 text-[#C5A880]" />
                  <span>Book a Site Visit</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}



