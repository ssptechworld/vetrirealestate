import React, { useState } from 'react';
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

export default function PropertyDetails({ onOpenInquiryModal }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isFavorite, toggleFavorite } = useFavorites();

  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');

  const property = PROPERTIES_DATA.find((p) => p.id === id) || PROPERTIES_DATA[0];
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
    `Hello ${agent.name}, I am inquiring about "${property.title}" listed at ${property.formattedPrice} on AURA Realty.`
  )}`;

  return (
    <div className="min-h-screen bg-[#FAF8F5] pt-28 pb-24">
      
      {/* Breadcrumb & Navigation Back Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
        <div className="flex items-center justify-between">
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-zinc-500 hover:text-[#121417] transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Listings</span>
          </button>

          <div className="flex items-center space-x-3">
            <button
              onClick={handleShare}
              className="p-2.5 bg-white border border-stone-200 rounded-full text-zinc-600 hover:text-[#121417] hover:border-[#C5A880] transition-colors cursor-pointer shadow-sm relative"
              title="Share listing link"
            >
              <Share2 className="w-4 h-4" />
              {copied && (
                <span className="absolute -bottom-8 right-0 bg-[#121417] text-white text-[10px] py-1 px-2.5 rounded shadow-lg whitespace-nowrap">
                  Link Copied!
                </span>
              )}
            </button>

            <button
              onClick={() => toggleFavorite(property.id)}
              className={`p-2.5 rounded-full border transition-colors cursor-pointer shadow-sm ${
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
          <PropertyGallery gallery={property.gallery} title={property.title} />
        </div>

        {/* 2. TITLE & PRICE HEADER */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-stone-200 pb-8 mb-10 gap-6">
          <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-3">
              <span className="px-3 py-1 bg-[#121417] text-[#C5A880] text-xs font-semibold uppercase tracking-wider rounded-xs">
                {property.propertyType}
              </span>
              {property.isExclusive && (
                <span className="px-3 py-1 bg-[#C5A880]/20 text-[#8B6B3E] border border-[#C5A880]/40 text-xs font-semibold uppercase tracking-wider rounded-xs">
                  Exclusive Listing
                </span>
              )}
            </div>

            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#121417]">
              {property.title}
            </h1>

            <div className="flex items-center gap-2 text-zinc-500 text-sm">
              <MapPin className="w-4 h-4 text-[#C5A880]" />
              <span>{property.location}</span>
            </div>
          </div>

          {/* Price Block */}
          <div className="bg-white p-6 rounded-xs border border-stone-200/80 shadow-sm text-right md:text-right">
            <span className="text-xs uppercase tracking-widest text-zinc-400 font-medium block mb-1">
              Guide Listing Price
            </span>
            <span className="font-serif text-3xl sm:text-4xl font-bold text-[#121417]">
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
            <div className="bg-white p-6 sm:p-8 rounded-xs border border-stone-200/80 shadow-sm space-y-4">
              <h3 className="font-serif text-2xl font-bold text-[#121417] border-b border-stone-200 pb-3">
                Architectural Overview
              </h3>
              <p className="text-zinc-700 text-sm leading-relaxed whitespace-pre-line font-light">
                {property.description}
              </p>

              {/* Highlights Bullet List */}
              {property.highlights && (
                <div className="pt-6 border-t border-stone-100 space-y-3">
                  <h4 className="font-serif font-bold text-[#121417] text-base">Key Residence Highlights</h4>
                  <ul className="space-y-2 text-xs text-zinc-600">
                    {property.highlights.map((h, i) => (
                      <li key={i} className="flex items-start gap-2">
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
            <div className="bg-[#121417] text-white p-6 sm:p-8 rounded-xs shadow-xl space-y-6">
              <div className="flex items-center gap-2 text-[#C5A880]">
                <ShieldCheck className="w-5 h-5" />
                <span className="text-xs uppercase tracking-widest font-semibold">Assigned Private Advisory Partner</span>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-6">
                <img
                  src={agent.image}
                  alt={agent.name}
                  className="w-24 h-24 rounded-full object-cover border-2 border-[#C5A880]"
                />
                <div className="space-y-1 text-center sm:text-left">
                  <h4 className="font-serif text-xl font-bold text-white">{agent.name}</h4>
                  <p className="text-xs text-[#C5A880]">{agent.title}</p>
                  <p className="text-xs text-zinc-400 max-w-md pt-1">{agent.bio}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4 border-t border-white/10">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-3 bg-[#25D366] text-white text-xs font-semibold uppercase tracking-wider rounded-xs hover:bg-[#20ba59] transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>WhatsApp Agent</span>
                </a>

                <button
                  onClick={() => onOpenInquiryModal ? onOpenInquiryModal(property.title) : navigate('/contact')}
                  className="py-3 bg-[#C5A880] text-[#121417] text-xs font-semibold uppercase tracking-wider rounded-xs hover:bg-[#b5966c] transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Book Private Tour</span>
                </button>
              </div>
            </div>

          </div>

          {/* Sticky Desktop Enquiry Panel (1 Column) */}
          <div className="hidden lg:block lg:col-span-1">
            <div className="sticky top-28 bg-white p-6 rounded-xs border border-stone-200/80 shadow-xl space-y-6">
              
              <div>
                <span className="text-[10px] uppercase tracking-widest text-[#C5A880] font-semibold block">
                  Private Representation
                </span>
                <h3 className="font-serif text-xl font-bold text-[#121417] mt-1">Inquire About This Estate</h3>
                <p className="text-xs text-zinc-500 mt-1">
                  Schedule a private walk-through or request structural floor plans.
                </p>
              </div>

              <div className="p-4 bg-[#FAF8F5] rounded-xs border border-stone-200 text-xs space-y-2">
                <div className="flex justify-between text-zinc-600">
                  <span>Listing ID:</span>
                  <strong className="text-zinc-900">{property.id.toUpperCase()}</strong>
                </div>
                <div className="flex justify-between text-zinc-600">
                  <span>Location:</span>
                  <strong className="text-zinc-900">{property.areaName}</strong>
                </div>
                <div className="flex justify-between text-zinc-600">
                  <span>Guide Price:</span>
                  <strong className="text-[#C5A880] font-serif font-bold text-sm">{property.formattedPrice}</strong>
                </div>
              </div>

              {/* CTAs */}
              <div className="space-y-3">
                <button
                  onClick={() => onOpenInquiryModal ? onOpenInquiryModal(property.title) : navigate('/contact')}
                  className="w-full py-3.5 bg-[#121417] text-white text-xs font-semibold uppercase tracking-widest rounded-xs hover:bg-[#C5A880] hover:text-[#121417] transition-colors shadow-md flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Schedule Private Visit</span>
                </button>

                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 bg-[#25D366]/10 border border-[#25D366]/30 text-[#128C7E] hover:bg-[#25D366] hover:text-white text-xs font-semibold uppercase tracking-widest rounded-xs transition-colors flex items-center justify-center gap-2"
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
          <div className="mt-24 pt-12 border-t border-stone-200 space-y-8">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs uppercase tracking-widest text-[#C5A880] font-semibold block">
                  Recommended Estates
                </span>
                <h3 className="font-serif text-2xl font-bold text-[#121417]">
                  Similar Luxury Residences
                </h3>
              </div>

              <Link
                to="/properties"
                className="text-xs font-semibold uppercase tracking-widest text-[#121417] hover:text-[#C5A880] flex items-center gap-1"
              >
                <span>Browse All</span>
                <ChevronRight className="w-4 h-4" />
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
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#121417] border-t border-white/10 p-3 flex items-center justify-between shadow-2xl">
        <div>
          <span className="text-[10px] uppercase text-zinc-400 block">Listing Price</span>
          <span className="font-serif font-bold text-white text-base">{property.formattedPrice}</span>
        </div>

        <div className="flex items-center gap-2">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 bg-[#25D366] text-white rounded-xs"
          >
            <MessageSquare className="w-4 h-4" />
          </a>

          <button
            onClick={() => onOpenInquiryModal ? onOpenInquiryModal(property.title) : navigate('/contact')}
            className="px-4 py-2.5 bg-[#C5A880] text-[#121417] text-xs font-semibold uppercase tracking-wider rounded-xs"
          >
            Schedule Tour
          </button>
        </div>
      </div>

    </div>
  );
}
