import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, Heart, Share2, Calendar, Phone, MessageSquare, ArrowLeft, CheckCircle2, ShieldCheck, ChevronRight } from 'lucide-react';
import PropertyGallery from '../components/PropertyGallery';
import PropertySpecs from '../components/PropertySpecs';
import AmenitiesList from '../components/AmenitiesList';
import PropertyCard from '../components/PropertyCard';
import { PROPERTIES_DATA } from '../data/properties';
import { AGENTS_DATA } from '../data/agents';
import { useFavorites } from '../context/FavoritesContext';
import { fadeUp } from '../utils/animations';
import { getProjectById, formatProjectForCarousel } from '../services/projectService';

export default function PropertyDetails({ onOpenInquiryModal }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isFavorite, toggleFavorite } = useFavorites();

  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    const fetchPropertyDetails = async () => {
      setLoading(true);
      // 1. Search in static data
      const staticProp = PROPERTIES_DATA.find((p) => p.id === id);
      if (staticProp) {
        if (isMounted) {
          setProperty(staticProp);
          setLoading(false);
        }
        return;
      }

      // 2. Fetch from MongoDB API
      try {
        const apiProj = await getProjectById(id);
        if (isMounted && apiProj) {
          const formatted = formatProjectForCarousel(apiProj);
          setProperty(formatted);
        }
      } catch (err) {
        console.error('Error fetching project from API:', err);
        if (isMounted) {
          setProperty(PROPERTIES_DATA[0]);
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchPropertyDetails();
    return () => { isMounted = false; };
  }, [id]);

  if (loading || !property) {
    return (
      <div className="min-h-screen bg-[#FAF8F5] pt-32 pb-24 flex justify-center items-center">
        <div className="flex items-center gap-3 text-[#C5A880]">
          <div className="w-6 h-6 border-2 border-[#C5A880] border-t-transparent rounded-full animate-spin" />
          <span className="uppercase tracking-widest font-semibold text-xs text-zinc-600">Loading Property Details...</span>
        </div>
      </div>
    );
  }

  const agent = AGENTS_DATA.find((a) => a.id === property.agentId) || AGENTS_DATA[0];
  const favorite = isFavorite(property.id);

  const similarProperties = PROPERTIES_DATA.filter(
    (p) => p.id !== property.id && (p.propertyType === property.propertyType || p.areaName === property.areaName)
  ).slice(0, 3);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const whatsappUrl = `https://wa.me/${agent.whatsapp}?text=${encodeURIComponent(
    `Hello ${agent.name}, I am inquiring about "${property.title}" listed at ${property.formattedPrice} on Vetri Vel Real Estate.`
  )}`;

  return (
    <div className="min-h-screen bg-[#FAF8F5]/80 backdrop-blur-xs pt-28 pb-24">
      
      {/* Breadcrumb & Navigation Back Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
        <div className="flex items-center justify-between">
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-white/80 border border-stone-200 text-xs font-semibold uppercase tracking-wider text-zinc-600 hover:text-[#0E1013] hover:border-[#C5A880] transition-colors cursor-pointer shadow-sm"
          >
            <ArrowLeft className="w-4 h-4 text-[#C5A880]" />
            <span>Back to Listings</span>
          </button>

          <div className="flex items-center space-x-3">
            <button
              onClick={handleShare}
              className="p-3 bg-white border border-stone-200 rounded-full text-zinc-600 hover:text-[#0E1013] hover:border-[#C5A880] transition-colors cursor-pointer shadow-sm relative"
              title="Share listing link"
            >
              <Share2 className="w-4 h-4" />
              {copied && (
                <span className="absolute -bottom-10 right-0 bg-[#0E1013] text-[#C5A880] text-[10px] py-1.5 px-3 rounded-full shadow-lg whitespace-nowrap border border-[#C5A880]/30 font-semibold uppercase tracking-widest">
                  Link Copied!
                </span>
              )}
            </button>

            <button
              onClick={() => toggleFavorite(property.id)}
              className={`p-3 rounded-full border transition-colors cursor-pointer shadow-sm ${
                favorite
                  ? 'bg-rose-500 text-white border-rose-500'
                  : 'bg-white text-zinc-600 border-stone-200 hover:text-rose-500'
              }`}
              title="Save to favorites"
            >
              <Heart className={`w-4 h-4 ${favorite ? 'fill-current' : ''}`} />
            </button>
          </div>
        </div>
      </div>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* 1. PROPERTY GALLERY SHOWCASE */}
        <div className="mb-10">
          <PropertyGallery gallery={property.gallery && property.gallery.length > 0 ? property.gallery : [property.heroImage]} title={property.title} />
        </div>

        {/* 2. TITLE & PRICE HEADER */}
        <div className="flex flex-col md:flex-row md:items-end justify-between bg-white p-8 sm:p-10 rounded-[36px] border border-stone-200/80 shadow-md mb-10 gap-6 relative overflow-hidden">
          <div className="space-y-4">
            <div className="flex flex-wrap items-center gap-3">
              <span className="px-4 py-1.5 bg-[#0E1013] text-[#C5A880] text-xs font-semibold uppercase tracking-widest rounded-full border border-[#C5A880]/30">
                {property.propertyType}
              </span>
              {property.isExclusive && (
                <span className="px-4 py-1.5 bg-[#C5A880]/15 text-[#8B6B3E] border border-[#C5A880]/40 text-xs font-semibold uppercase tracking-widest rounded-full">
                  Exclusive Listing
                </span>
              )}
            </div>

            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#0E1013] tracking-tight">
              {property.title}
            </h1>

            <div className="flex items-center gap-2 text-zinc-500 text-sm">
              <MapPin className="w-4 h-4 text-[#C5A880]" />
              <span className="font-medium">{property.location}</span>
            </div>
          </div>

          {/* Price Block */}
          <div className="bg-[#0E1013] p-6 rounded-[28px] border border-[#C5A880]/30 shadow-xl text-left md:text-right shrink-0">
            <span className="text-[10px] uppercase tracking-widest text-[#C5A880] font-semibold block mb-1">
              Guide Listing Price
            </span>
            <span className="font-serif text-3xl sm:text-4xl font-bold text-white">
              {property.formattedPrice}
            </span>
          </div>
        </div>

        {/* 3. TWO-COLUMN LAYOUT: CONTENT + STICKY ENQUIRY PANEL */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          
          {/* Main Details Col (2 Columns) */}
          <div className="lg:col-span-2 space-y-10">
            
            {/* Specs Grid */}
            <PropertySpecs property={property} />

            {/* Overview & Description */}
            <div className="bg-white p-8 sm:p-10 rounded-[36px] border border-stone-200/80 shadow-md space-y-5">
              <h3 className="font-serif text-2xl font-bold text-[#0E1013] border-b border-stone-100 pb-4">
                Architectural Overview
              </h3>
              <p className="text-zinc-700 text-sm sm:text-base leading-relaxed whitespace-pre-line font-light">
                {property.description}
              </p>

              {/* Highlights Bullet List */}
              {property.highlights && (
                <div className="pt-6 border-t border-stone-100 space-y-4">
                  <h4 className="font-serif font-bold text-[#0E1013] text-base">Key Residence Highlights</h4>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm text-zinc-600">
                    {property.highlights.map((h, i) => (
                      <li key={i} className="flex items-start gap-2.5 bg-[#FAF8F5] p-3 rounded-2xl border border-stone-100">
                        <CheckCircle2 className="w-4 h-4 text-[#C5A880] shrink-0 mt-0.5" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Amenities List */}
            <AmenitiesList amenities={property.amenities} />

            {/* Assigned Advisor Section */}
            <div className="bg-[#0E1013] text-white p-8 sm:p-10 rounded-[36px] border border-[#C5A880]/30 shadow-2xl space-y-8 relative overflow-hidden">
              <div className="flex items-center gap-2.5 text-[#C5A880]">
                <ShieldCheck className="w-5 h-5" />
                <span className="text-xs uppercase tracking-widest font-semibold">Assigned Private Advisory Partner</span>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-6">
                <img
                  src={agent.image}
                  alt={agent.name}
                  className="w-24 h-24 rounded-full object-cover border-2 border-[#C5A880] shadow-xl"
                />
                <div className="space-y-1.5 text-center sm:text-left">
                  <h4 className="font-serif text-2xl font-bold text-white">{agent.name}</h4>
                  <p className="text-xs text-[#C5A880] uppercase tracking-widest font-semibold">{agent.title}</p>
                  <p className="text-xs text-zinc-400 max-w-md pt-1 leading-relaxed">{agent.bio}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6 border-t border-white/10">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-3.5 bg-[#25D366] text-white text-xs font-semibold uppercase tracking-widest rounded-full hover:bg-[#20ba59] transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-lg"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>WhatsApp Agent</span>
                </a>

                <button
                  onClick={() => onOpenInquiryModal ? onOpenInquiryModal(property.title) : navigate('/contact')}
                  className="py-3.5 bg-[#C5A880] text-[#0E1013] text-xs font-semibold uppercase tracking-widest rounded-full hover:bg-[#b5966c] transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-lg"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Book Private Tour</span>
                </button>
              </div>
            </div>

          </div>

          {/* Sticky Desktop Enquiry Panel (1 Column) */}
          <div className="hidden lg:block lg:col-span-1">
            <div className="sticky top-28 bg-white p-8 rounded-[36px] border border-stone-200/80 shadow-xl space-y-6">
              
              <div>
                <span className="text-[10px] uppercase tracking-widest text-[#C5A880] font-semibold block">
                  Private Representation
                </span>
                <h3 className="font-serif text-xl font-bold text-[#0E1013] mt-1">Inquire About This Estate</h3>
                <p className="text-xs text-zinc-500 mt-1 font-light leading-relaxed">
                  Schedule a private walk-through or request structural floor plans.
                </p>
              </div>

              <div className="p-5 bg-[#FAF8F5] rounded-[24px] border border-stone-200/80 text-xs space-y-3">
                <div className="flex justify-between text-zinc-600">
                  <span>Listing ID:</span>
                  <strong className="text-zinc-900 font-mono">{property.id.toUpperCase()}</strong>
                </div>
                <div className="flex justify-between text-zinc-600">
                  <span>Location:</span>
                  <strong className="text-zinc-900">{property.areaName}</strong>
                </div>
                <div className="flex justify-between text-zinc-600 border-t border-stone-200/60 pt-2">
                  <span>Guide Price:</span>
                  <strong className="text-[#C5A880] font-serif font-bold text-sm">{property.formattedPrice}</strong>
                </div>
              </div>

              {/* CTAs */}
              <div className="space-y-3">
                <button
                  onClick={() => onOpenInquiryModal ? onOpenInquiryModal(property.title) : navigate('/contact')}
                  className="w-full py-4 bg-[#0E1013] text-white text-xs font-semibold uppercase tracking-widest rounded-full hover:bg-[#C5A880] hover:text-[#0E1013] transition-colors shadow-lg flex items-center justify-center gap-2 cursor-pointer border border-[#C5A880]/30"
                >
                  <Calendar className="w-4 h-4 text-[#C5A880]" />
                  <span>Schedule Private Visit</span>
                </button>

                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 bg-[#25D366]/10 border border-[#25D366]/30 text-[#128C7E] hover:bg-[#25D366] hover:text-white text-xs font-semibold uppercase tracking-widest rounded-full transition-colors flex items-center justify-center gap-2"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>WhatsApp Advisor</span>
                </a>
              </div>

              <div className="pt-4 border-t border-stone-100 text-[11px] text-zinc-400 text-center leading-relaxed">
                Discrete acquisition representation guaranteed under strict Non-Disclosure Protocols.
              </div>

            </div>
          </div>

        </div>

        {/* 4. SIMILAR FEATURED PROPERTIES */}
        {similarProperties.length > 0 && (
          <div className="mt-24 pt-12 border-t border-stone-200/80 space-y-8">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs uppercase tracking-widest text-[#C5A880] font-semibold block">
                  Recommended Estates
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#0E1013]">
                  Similar Luxury Residences
                </h3>
              </div>

              <Link
                to="/properties"
                className="px-5 py-2.5 rounded-full border border-stone-200 text-xs font-semibold uppercase tracking-wider text-[#0E1013] hover:border-[#C5A880] flex items-center gap-1.5 transition-colors"
              >
                <span>Browse All</span>
                <ChevronRight className="w-4 h-4 text-[#C5A880]" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {similarProperties.map((p) => (
                <PropertyCard key={p.id} property={p} />
              ))}
            </div>
          </div>
        )}

      </div>

      {/* Floating Mobile Bottom Action Bar */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#0E1013]/95 backdrop-blur-md border-t border-[#C5A880]/30 p-3.5 flex items-center justify-between shadow-2xl">
        <div>
          <span className="text-[10px] uppercase text-zinc-400 block tracking-wider">Listing Price</span>
          <span className="font-serif font-bold text-white text-lg">{property.formattedPrice}</span>
        </div>

        <div className="flex items-center gap-2">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 bg-[#25D366] text-white rounded-full"
          >
            <MessageSquare className="w-4 h-4" />
          </a>

          <button
            onClick={() => onOpenInquiryModal ? onOpenInquiryModal(property.title) : navigate('/contact')}
            className="px-5 py-3 bg-[#C5A880] text-[#0E1013] text-xs font-semibold uppercase tracking-wider rounded-full shadow-lg"
          >
            Schedule Tour
          </button>
        </div>
      </div>

    </div>
  );
}
