import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Bed, Bath, Maximize2, MapPin, Heart, ArrowUpRight } from 'lucide-react';
import { useFavorites } from '../context/FavoritesContext';
import { fadeUp } from '../utils/animations';

export default function PropertyCard({ property }) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const favorite = isFavorite(property.id);

  return (
    <motion.div
      variants={fadeUp}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1.0] }}
      className="group bg-white rounded-xs overflow-hidden border border-stone-200/80 shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col h-full"
    >
      {/* Image Container */}
      <div className="relative aspect-[4/3] overflow-hidden bg-stone-100">
        <img
          src={property.heroImage}
          alt={property.title}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 opacity-80" />

        {/* Badges */}
        <div className="absolute top-4 left-4 flex flex-wrap gap-2">
          {property.badge && (
            <span className="px-3 py-1 bg-[#121417]/80 backdrop-blur-md text-[#C5A880] text-[11px] font-semibold tracking-wider uppercase rounded-xs border border-[#C5A880]/30">
              {property.badge}
            </span>
          )}
          <span className="px-3 py-1 bg-white/90 backdrop-blur-md text-[#121417] text-[11px] font-medium tracking-wider uppercase rounded-xs">
            {property.propertyType}
          </span>
        </div>

        {/* Favorite Button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleFavorite(property.id);
          }}
          className={`absolute top-4 right-4 p-2.5 rounded-full backdrop-blur-md transition-all duration-300 cursor-pointer ${
            favorite
              ? 'bg-rose-500 text-white'
              : 'bg-black/30 text-white hover:bg-white hover:text-rose-500'
          }`}
          aria-label="Save to favorites"
        >
          <Heart className={`w-4 h-4 ${favorite ? 'fill-current' : ''}`} />
        </button>

        {/* Price overlay on bottom left */}
        <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between text-white">
          <div>
            <span className="text-[10px] uppercase tracking-widest text-zinc-300 block font-medium">Guide Price</span>
            <span className="font-serif text-2xl font-bold tracking-tight text-white">
              {property.formattedPrice}
            </span>
          </div>
        </div>
      </div>

      {/* Content Container */}
      <div className="p-6 flex flex-col flex-grow justify-between bg-white">
        <div>
          {/* Location */}
          <div className="flex items-center gap-1.5 text-zinc-500 text-xs tracking-wider uppercase mb-2">
            <MapPin className="w-3.5 h-3.5 text-[#C5A880] shrink-0" />
            <span className="truncate">{property.location}</span>
          </div>

          {/* Title */}
          <Link to={`/properties/${property.id}`}>
            <h3 className="font-serif text-lg font-bold text-[#121417] group-hover:text-[#C5A880] transition-colors duration-300 line-clamp-1 mb-4">
              {property.title}
            </h3>
          </Link>
        </div>

        <div>
          {/* Specs bar */}
          <div className="grid grid-cols-3 gap-2 py-3 px-3 bg-[#FAF8F5] rounded-xs border border-stone-200/60 mb-5 text-xs text-zinc-600">
            <div className="flex items-center gap-1.5 justify-center">
              <Bed className="w-4 h-4 text-[#C5A880]" />
              <span className="font-medium text-zinc-800">{property.bedrooms}</span>
              <span className="text-[11px] text-zinc-400">Beds</span>
            </div>

            <div className="flex items-center gap-1.5 justify-center border-x border-stone-200">
              <Bath className="w-4 h-4 text-[#C5A880]" />
              <span className="font-medium text-zinc-800">{property.bathrooms}</span>
              <span className="text-[11px] text-zinc-400">Baths</span>
            </div>

            <div className="flex items-center gap-1.5 justify-center">
              <Maximize2 className="w-4 h-4 text-[#C5A880]" />
              <span className="font-medium text-zinc-800">{property.sqft.toLocaleString()}</span>
              <span className="text-[11px] text-zinc-400">sq.ft</span>
            </div>
          </div>

          {/* CTA Link */}
          <Link
            to={`/properties/${property.id}`}
            className="w-full py-2.5 px-4 bg-transparent border border-[#121417]/20 group-hover:border-[#121417] text-[#121417] group-hover:bg-[#121417] group-hover:text-white text-xs tracking-widest font-semibold uppercase rounded-xs transition-all duration-300 flex items-center justify-center gap-2"
          >
            <span>View Details</span>
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
