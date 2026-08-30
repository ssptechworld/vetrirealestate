import React from 'react';
import { motion } from 'framer-motion';
import PropertyCard from './PropertyCard';
import { staggerContainer } from '../utils/animations';
import { SearchX, RefreshCw } from 'lucide-react';

export default function PropertyGrid({ properties, loading, onResetFilters }) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[1, 2, 3, 4, 5, 6].map((idx) => (
          <div key={idx} className="bg-white rounded-xs border border-stone-200 p-4 space-y-4 animate-pulse">
            <div className="w-full aspect-[4/3] bg-stone-200 rounded-xs" />
            <div className="h-4 bg-stone-200 rounded w-1/3" />
            <div className="h-6 bg-stone-200 rounded w-3/4" />
            <div className="h-10 bg-stone-200 rounded w-full" />
            <div className="h-8 bg-stone-200 rounded w-full" />
          </div>
        ))}
      </div>
    );
  }

  if (!properties || properties.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white border border-stone-200/80 rounded-xs p-12 text-center flex flex-col items-center justify-center space-y-4 my-8"
      >
        <div className="w-16 h-16 rounded-full bg-[#FAF8F5] border border-[#C5A880]/30 flex items-center justify-center text-[#C5A880]">
          <SearchX className="w-8 h-8" />
        </div>
        <h3 className="font-serif text-2xl font-bold text-[#121417]">No Matching Estates Found</h3>
        <p className="text-zinc-500 text-sm max-w-md">
          We could not find any luxury properties matching your exact criteria. Try adjusting your filters or price range.
        </p>
        {onResetFilters && (
          <button
            onClick={onResetFilters}
            className="mt-4 px-6 py-2.5 bg-[#121417] text-white text-xs tracking-widest uppercase font-semibold rounded-xs hover:bg-[#C5A880] hover:text-[#121417] transition-all duration-300 flex items-center gap-2 cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Reset All Filters</span>
          </button>
        )}
      </motion.div>
    );
  }

  return (
    <motion.div
      variants={staggerContainer(0.1, 0.05)}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
    >
      {properties.map((property) => (
        <PropertyCard key={property.id} property={property} />
      ))}
    </motion.div>
  );
}
