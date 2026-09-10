import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Bed, Bath, Maximize2, MapPin, Heart, ArrowUpRight } from 'lucide-react';
import { useFavorites } from '../context/FavoritesContext';
import { fadeUp } from '../utils/animations';

export default function PropertyCard({ property }) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const favorite = isFavorite(property.id);

  const isCompleted = property.status === 'Completed' || property.badge === 'Ready to Move' || property.badge === 'Completed';

  return (
    <motion.div
      variants={fadeUp}
      whileHover={{ y: -8 }}
      transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1.0] }}
      className="group bg-white rounded-[32px] sm:rounded-[38px] overflow-hidden border border-stone-200/90 hover:border-[#C5A880]/70 shadow-md hover:shadow-2xl transition-all duration-500 flex flex-col h-full relative"
    >
      {/* Image Container with Architectural Arch Masking */}
      <div className="relative aspect-[4/3] overflow-hidden bg-[#0E1013] rounded-t-[32px] sm:rounded-t-[38px] rounded-bl-[40px] sm:rounded-bl-[52px]">
        {property.heroImage ? (
          <img
            src={property.heroImage}
            alt={property.title}
            loading="lazy"
            decoding="async"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=85';
            }}
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center bg-[#0E1013] text-stone-400 text-xs font-medium uppercase tracking-widest p-4 text-center">
            <span>No Architectural Image</span>
          </div>
        )}

        {/* Gradient Overlay for Contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0E1013] via-[#0E1013]/30 to-transparent opacity-85 group-hover:opacity-75 transition-opacity" />

        {/* Floating Curved Badges */}
        <div className="absolute top-4 left-4 flex flex-wrap gap-2 z-10">
          <span className={`px-3.5 py-1 text-[10px] font-bold tracking-widest uppercase rounded-full border backdrop-blur-md ${isCompleted
              ? 'bg-[#121417]/90 text-[#C5A880] border-[#C5A880]/40'
              : 'bg-[#C5A880] text-[#121417] border-[#C5A880]'
            }`}>
            {property.badge || (isCompleted ? 'Ready to Move' : 'Premium Residence')}
          </span>

          {property.propertyType && (
            <span className="px-3.5 py-1 bg-white/90 backdrop-blur-md text-[#121417] text-[10px] font-bold tracking-widest uppercase rounded-full border border-white/40">
              {property.propertyType}
            </span>
          )}
        </div>

        {/* Favorite Heart Trigger */}
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleFavorite(property.id);
          }}
          className={`absolute top-4 right-4 z-10 p-2.5 rounded-full backdrop-blur-md transition-all duration-300 cursor-pointer shadow-lg ${favorite
              ? 'bg-rose-600 text-white'
              : 'bg-black/40 text-white hover:bg-white hover:text-rose-600 border border-white/20'
            }`}
          aria-label="Save to favorites"
        >
          <Heart className={`w-4 h-4 ${favorite ? 'fill-current' : ''}`} />
        </button>

        {/* Price Tag Overlay */}
        <div className="absolute bottom-4 left-5 right-5 flex items-end justify-between text-white z-10">
          <div>
            <span className="text-[9px] uppercase tracking-[0.2em] text-[#C5A880] font-bold block">
              Guide Price
            </span>
            <span className="font-serif text-2xl font-bold tracking-tight text-white drop-shadow-md">
              {property.formattedPrice}
            </span>
          </div>

          <span className="text-[10px] font-semibold tracking-wider uppercase px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-stone-200 border border-white/15 hidden sm:inline-block">
            Verified Handover
          </span>
        </div>
      </div>

      {/* Content Container */}
      <div className="p-6 sm:p-7 flex flex-col flex-grow justify-between bg-white space-y-4">
        <div>
          {/* Location */}
          <div className="flex items-center gap-1.5 text-stone-500 text-xs tracking-wider uppercase mb-2">
            <MapPin className="w-3.5 h-3.5 text-[#C5A880] shrink-0" />
            <span className="truncate font-semibold">{property.location}</span>
          </div>

          {/* Title */}
          <Link to={`/properties/${property.id}`}>
            <h3 className="font-serif text-lg sm:text-xl font-bold text-[#121417] group-hover:text-[#C5A880] transition-colors duration-300 line-clamp-1 mb-2">
              {property.title}
            </h3>
          </Link>

          {/* Highlights snippet */}
          {property.highlights && property.highlights.length > 0 && (
            <p className="text-xs text-stone-500 font-light line-clamp-1 mb-3">
              {property.highlights[0]}
            </p>
          )}
        </div>

        <div>
          {/* Curved Pill Specs Bar */}
          <div className="grid grid-cols-3 gap-2 py-2.5 px-3 bg-[#FAF8F5] rounded-full border border-stone-200/80 mb-5 text-xs text-stone-700">
            <div className="flex items-center gap-1.5 justify-center">
              <Bed className="w-3.5 h-3.5 text-[#C5A880]" />
              <span className="font-bold text-[#121417]">{property.bedrooms}</span>
              <span className="text-[10px] text-stone-400 font-medium">Beds</span>
            </div>

            <div className="flex items-center gap-1.5 justify-center border-x border-stone-200">
              <Bath className="w-3.5 h-3.5 text-[#C5A880]" />
              <span className="font-bold text-[#121417]">{property.bathrooms}</span>
              <span className="text-[10px] text-stone-400 font-medium">Baths</span>
            </div>

            <div className="flex items-center gap-1.5 justify-center">
              <Maximize2 className="w-3.5 h-3.5 text-[#C5A880]" />
              <span className="font-bold text-[#121417]">{property.sqft.toLocaleString()}</span>
              <span className="text-[10px] text-stone-400 font-medium">sq.ft</span>
            </div>
          </div>

          {/* View Details Rounded Button */}
          <Link
            to={`/properties/${property.id}`}
            className="w-full py-3 px-5 bg-transparent border border-[#121417]/25 group-hover:border-[#121417] text-[#121417] group-hover:bg-[#121417] group-hover:text-white text-xs tracking-widest font-bold uppercase rounded-full transition-all duration-300 flex items-center justify-center gap-2"
          >
            <span>Explore Residence</span>
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
}



