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
  Calendar,
  Quote,
  Star,
  BrickWall,
  Package,
  Grid2X2,
  CookingPot,
  DoorOpen,
  ArrowUpDown,
  Bath,
  Zap,
  Car,
  Fingerprint,
  Cctv,
  Sun,
  Building,
  Timer,
  Warehouse,
  Droplets,
  Sprout,
  Gamepad2,
  PlugZap
} from 'lucide-react';
import PropertyCarousel from '../components/PropertyCarousel';
import StatsSection from '../components/StatsSection';
import { PROPERTIES_DATA } from '../data/properties';
import { fadeUp, staggerContainer, EASE_LUXURY } from '../utils/animations';
import homeHeroImg from '../assets/Home.png';
import workVideo from '../assets/work.mp4';
import builtByUsBg from '../assets/built_by_us_bg.jpg';
import Medavakkam from '../assets/Medavakkam.png';
import Porur from '../assets/Porur.png';

// Brand & Material Image Assets
import redBrickImg from '../assets/Redbrick.png';
import dalmiaCementImg from '../assets/Dalmia.png';
import isteelTmtImg from '../assets/Steel.png';
import somanyTilesImg from '../assets/Sowmi.png';
import kitchenCountertopImg from '../assets/Aashirvad.png';
import smartSecurityImg from '../assets/brands/smart-security.jpg';
import powerLightingImg from '../assets/Polycab.png';
import digitalLockImg from '../assets/Goorej.png';
import luxuryElevatorImg from '../assets/Lift.png';
import jaquarBathroomImg from '../assets/Jaquar.png';

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

  const amenities = [
    {
      title: "Covered Car Parking",
      icon: Car
    },
    {
      title: "Biometric Access",
      icon: Fingerprint
    },
    {
      title: "24×7 CCTV Surveillance",
      icon: Cctv
    },
    {
      title: "Solar Power Provision for Common Areas",
      icon: Sun
    },
    {
      title: "Spacious Floor Lobby on Each Level for Comfortable Circulation",
      icon: Building
    },
    {
      title: "Timer Controlled Lighting Throughout All Common Spaces",
      icon: Timer
    },
    {
      title: "Utility Space at Terrace",
      icon: Warehouse
    },
    {
      title: "Online Delivery Drop Box",
      icon: Package
    },
    {
      title: "Automatic Pump Cut-Off for Efficient Water Management",
      icon: Droplets
    },
    {
      title: "Mini-Urban Farm / Edible Garden Beds",
      icon: Sprout
    },
    {
      title: "Interactive Kids' Zone with Sensor Play",
      icon: Gamepad2
    },
    {
      title: "Yoga / Meditation Deck",
      icon: Sparkles
    },
    {
      title: "Lift Till Terrace",
      icon: ArrowUpDown
    },
    {
      title: "EV Charging Provision",
      icon: PlugZap
    },
    {
      title: "Fully Automated Main Gate",
      icon: DoorOpen
    }
  ];

  const constructionMaterials = [
    {
      category: "STRUCTURE",
      brand: "Red Brick",
      title: "Red Brick for All Masonry Works",
      desc: "Red brick for all masonry works.",
      icon: BrickWall,
      image: redBrickImg
    },
    {
      category: "STRUCTURE",
      brand: "Dalmia Cement",
      title: "RCC Framed with iSteel Reinforcement",
      desc: "RCC framed with iSteel reinforcement, Dalmia Cement & foundation for strength.",
      icon: Package,
      image: dalmiaCementImg
    },
    {
      category: "STRUCTURE",
      brand: "iSTEEL XLS",
      title: "Long Life TMT Bars",
      desc: "iSTEEL XLS long life TMT bars for strong and reliable structural construction.",
      icon: Layers,
      image: isteelTmtImg
    },
    {
      category: "FLOORING",
      brand: "Somany",
      title: "Premium Vitrified & Anti-Skid Tiles",
      desc: "Living, dining, bedrooms & kitchen - 4' x 2' premium vitrified tiles. Anti-skid ceramic tiles in toilets. Anti-skid tiles in balconies & white cooling tiles in terrace.",
      icon: Grid2X2,
      image: somanyTilesImg
    },
    {
      category: "KITCHEN",
      brand: "Aashirvad Pipes",
      title: "Granite Countertop & Plumbing Provision",
      desc: "Granite countertop with Aashirvad plumbing and provisions for hob, chimney & purifier.",
      icon: CookingPot,
      image: kitchenCountertopImg
    },
    {
      category: "SMART ACCESS & SECURITY",
      brand: "Hikvision",
      title: "Smart Access & Security",
      desc: "Biometric access at the main lobby and all individual units. 24×7 CCTV surveillance covering all critical areas. Fully automated main gate with remote/app-based operation.",
      icon: ShieldCheck,
      image: smartSecurityImg
    },
    {
      category: "POWER & LIGHTING",
      brand: "Legrand & Orbit",
      title: "Power & Lighting",
      desc: "EV charging provision. Timer-controlled lighting throughout all common spaces.",
      icon: Zap,
      image: powerLightingImg
    },
    {
      category: "DOORS & WINDOWS",
      brand: "Godrej Locks",
      title: "Premium Doors, Windows & Digital Lock",
      desc: "Main door with Yale / Godrej digital lock, uPVC windows & French doors with toughened glass.",
      icon: DoorOpen,
      image: digitalLockImg
    },
    {
      category: "LIFT",
      brand: "Johnson",
      title: "Johnson Elevator",
      desc: "Johnson elevator with terrace access.",
      icon: ArrowUpDown,
      image: luxuryElevatorImg
    },
    {
      category: "BATHROOM",
      brand: "Jaquar",
      title: "Premium Bathroom Fittings",
      desc: "Premium Jaquar fittings crafted for long-lasting comfort, performance, and refined style.",
      icon: Bath,
      image: jaquarBathroomImg
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
    <div className="min-h-screen bg-transparent overflow-hidden">

      {/* 1. ARCHITECTURAL HERO SECTION WITH GRAND ARCH FRAME */}
      <section className="relative pt-32 pb-24 sm:pt-40 sm:pb-36 lg:pb-44 bg-[#0E1013] text-white overflow-hidden">
        {/* Full Section Background Image (Home.png) */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <img
            src={homeHeroImg}
            alt=""
            className="w-full h-full object-cover object-center scale-105"
          />
          {/* Sophisticated Dark Cinematic Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#0E1013]/85 via-[#0E1013]/55 to-[#0E1013]/80" />
        </div>

        {/* Soft Background Radial Light Orbs */}
        <div className="pointer-events-none absolute inset-0 z-[1] overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-[radial-gradient(ellipse_70%_60%_at_50%_0%,rgba(197,168,128,0.22)_0%,transparent_75%)] blur-3xl" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8 pb-10 sm:pb-16">

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

        </div>

        {/* Large Architectural Wave Section Divider */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none z-10 pointer-events-none">
          <svg
            viewBox="0 0 1440 160"
            className="relative block w-full h-[80px] sm:h-[110px] md:h-[140px]"
            preserveAspectRatio="none"
          >
            <path
              d="M0,32 C360,150 1080,150 1440,32 L1440,160 L0,160 Z"
              fill="#FAF8F5"
            />
          </svg>
        </div>

      </section>



      {/* 3. FEATURED SHOWCASE: COMPLETED RESIDENCES */}
      <section className="py-20 bg-white text-[#121417]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

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
              <div className="py-12 text-center text-stone-500 bg-[#FAF8F5] border border-stone-200/80 rounded-3xl">
                <p className="text-sm font-medium">No completed projects currently listed in database.</p>
              </div>
            )}
          </motion.div>

        </div>
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

      {/* 5. QUALITY MATERIALS & TRUST / BUILT WITH TRUSTED BRANDS */}
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
              QUALITY MATERIALS & TRUST
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-bold text-[#121417]">
              Built With Trusted Brands
            </h2>
            <p className="text-stone-600 text-xs sm:text-sm max-w-xl mx-auto font-light">
              We use quality construction materials and trusted brands to ensure durability, safety, comfort, and long-term value for every home.
            </p>
          </motion.div>

          {/* 10 Luxury Material Specification Cards */}
          <motion.div
            variants={staggerContainer(0.08, 0.1)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
          >
            {constructionMaterials.map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={i}
                  variants={fadeUp}
                  whileHover={{ y: -6 }}
                  className="group relative bg-white rounded-[28px] sm:rounded-[32px] border border-stone-200/80 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_16px_36px_rgba(0,0,0,0.08)] transition-all duration-300 overflow-hidden min-h-[260px] p-6 sm:p-7 flex flex-col justify-between"
                >
                  {/* Right Side Material Image with Soft Gradient Fade */}
                  <div className="absolute top-0 right-0 bottom-0 w-[44%] sm:w-[45%] pointer-events-none overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.brand}
                      className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                      loading="lazy"
                    />
                    {/* Left-to-right white gradient mask for seamless natural blend into card */}
                    <div className="absolute inset-0 bg-gradient-to-r from-white via-white/50 to-transparent" />
                  </div>

                  {/* Left Side Content Container */}
                  <div className="relative z-10 max-w-[62%] sm:max-w-[58%] flex flex-col h-full justify-between space-y-4">
                    <div>
                      {/* Small category icon & uppercase label */}
                      <div className="w-8 h-8 rounded-full border border-[#C5A880]/50 bg-[#FAF8F5] text-[#C5A880] flex items-center justify-center mb-2.5 group-hover:bg-[#121417] group-hover:text-white group-hover:border-[#121417] transition-colors duration-300 shrink-0">
                        <Icon className="w-4 h-4" />
                      </div>
                      <span className="text-[10px] font-bold tracking-[0.22em] text-stone-400 uppercase block mb-1">
                        {item.category}
                      </span>

                      {/* Brand Name */}
                      <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#C5A880] leading-tight block mb-1">
                        {item.brand}
                      </h3>

                      {/* Specification Title */}
                      <h4 className="font-serif text-sm sm:text-[15px] font-bold text-[#121417] leading-snug">
                        {item.title}
                      </h4>
                    </div>

                    {/* Short Specification Description */}
                    <p className="text-xs text-stone-600 leading-relaxed font-light">
                      {item.desc}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>

        </div>
      </section>
      {/* AMENITIES SECTION */}
      <section className="py-20 sm:py-28 bg-[#FAF8F5] text-[#121417]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="text-center max-w-3xl mx-auto mb-16 space-y-3"
          >
            <span className="text-xs uppercase tracking-[0.25em] text-[#C5A880] font-bold block">
              CURATED COMFORTS & CONVENIENCE
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-[#121417]">
              AMENITIES
            </h2>
            <p className="text-stone-600 text-xs sm:text-sm font-light max-w-xl mx-auto">
              Thoughtfully planned features and modern conveniences designed to elevate everyday living.
            </p>
          </motion.div>

          {/* 15 Amenities Grid */}
          <motion.div
            variants={staggerContainer(0.06, 0.1)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-5 lg:gap-6"
          >
            {amenities.map((item, idx) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={idx}
                  variants={fadeUp}
                  whileHover={{ y: -6 }}
                  className="group bg-white p-6 rounded-[24px] sm:rounded-[28px] border border-stone-200/80 hover:border-[#C5A880]/60 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col items-center text-center justify-start min-h-[190px] relative overflow-hidden"
                >
                  {/* Subtle Gold Hover Glow */}
                  <div className="absolute -top-10 -right-10 w-20 h-20 bg-[#C5A880]/10 rounded-full blur-xl group-hover:bg-[#C5A880]/25 transition-all duration-500 pointer-events-none" />

                  {/* Circular Icon Area */}
                  <div className="w-13 h-13 rounded-full bg-[#FAF8F5] border border-[#C5A880]/40 text-[#C5A880] flex items-center justify-center group-hover:bg-[#121417] group-hover:text-white group-hover:border-[#121417] transition-all duration-300 mb-3 shrink-0 shadow-xs">
                    <Icon className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" />
                  </div>

                  {/* Amenity Number */}
                  <span className="text-[10px] font-bold tracking-[0.2em] text-[#C5A880] uppercase block mb-1.5">
                    {String(idx + 1).padStart(2, '0')}
                  </span>

                  {/* Amenity Title */}
                  <h3 className="font-serif text-sm sm:text-[15px] font-bold text-[#121417] group-hover:text-[#C5A880] transition-colors leading-snug">
                    {item.title}
                  </h3>
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



