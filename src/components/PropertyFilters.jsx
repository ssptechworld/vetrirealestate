import React from 'react';
import { Search, RotateCcw, X, SlidersHorizontal } from 'lucide-react';
import { LOCATIONS, PROPERTY_TYPES } from '../data/properties';

export default function PropertyFilters({
  filters,
  onChange,
  onReset,
  totalResults,
  isMobileDrawer = false,
  onCloseDrawer
}) {
  return (
    <div className={`space-y-6 ${isMobileDrawer ? '' : 'bg-white p-6 rounded-xs border border-stone-200/80 shadow-sm'}`}>
      
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-stone-200">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="w-4 h-4 text-[#C5A880]" />
          <h3 className="font-serif font-bold text-lg text-[#121417]">Filter Estates</h3>
        </div>
        
        {isMobileDrawer ? (
          <button
            onClick={onCloseDrawer}
            className="p-1.5 text-zinc-400 hover:text-zinc-800"
          >
            <X className="w-5 h-5" />
          </button>
        ) : (
          <button
            onClick={onReset}
            className="text-xs text-zinc-500 hover:text-[#C5A880] flex items-center gap-1 cursor-pointer transition-colors"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Reset</span>
          </button>
        )}
      </div>

      {/* 1. Keyword Search */}
      <div className="space-y-2">
        <label className="text-xs font-semibold uppercase tracking-wider text-zinc-600">Search Keywords</label>
        <div className="relative">
          <Search className="w-4 h-4 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Villa, ECR, Penthouse..."
            value={filters.search}
            onChange={(e) => onChange('search', e.target.value)}
            className="w-full pl-9 pr-3 py-2 bg-[#FAF8F5] border border-stone-200 rounded-xs text-sm text-[#121417] focus:outline-none focus:border-[#C5A880]"
          />
        </div>
      </div>

      {/* 2. Location */}
      <div className="space-y-2">
        <label className="text-xs font-semibold uppercase tracking-wider text-zinc-600">Location</label>
        <select
          value={filters.location}
          onChange={(e) => onChange('location', e.target.value)}
          className="w-full px-3 py-2 bg-[#FAF8F5] border border-stone-200 rounded-xs text-sm text-[#121417] focus:outline-none focus:border-[#C5A880] cursor-pointer"
        >
          {LOCATIONS.map((loc) => (
            <option key={loc} value={loc}>{loc}</option>
          ))}
        </select>
      </div>

      {/* 3. Property Type */}
      <div className="space-y-2">
        <label className="text-xs font-semibold uppercase tracking-wider text-zinc-600">Property Type</label>
        <select
          value={filters.type}
          onChange={(e) => onChange('type', e.target.value)}
          className="w-full px-3 py-2 bg-[#FAF8F5] border border-stone-200 rounded-xs text-sm text-[#121417] focus:outline-none focus:border-[#C5A880] cursor-pointer"
        >
          {PROPERTY_TYPES.map((t) => (
            <option key={t} value={t}>{t}</option>
          ))}
        </select>
      </div>

      {/* 4. Price Bracket Slider */}
      <div className="space-y-3">
        <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-zinc-600">
          <span>Max Price</span>
          <span className="text-[#C5A880]">₹{(filters.maxPrice / 10000000).toFixed(1)} Cr</span>
        </div>
        <input
          type="range"
          min="50000000"
          max="300000000"
          step="10000000"
          value={filters.maxPrice}
          onChange={(e) => onChange('maxPrice', Number(e.target.value))}
          className="w-full accent-[#C5A880] cursor-pointer"
        />
        <div className="flex justify-between text-[10px] text-zinc-400">
          <span>₹5 Cr</span>
          <span>₹30 Cr</span>
        </div>
      </div>

      {/* 5. Bedrooms */}
      <div className="space-y-2">
        <label className="text-xs font-semibold uppercase tracking-wider text-zinc-600">Minimum Bedrooms</label>
        <div className="grid grid-cols-5 gap-1.5">
          {['all', '3', '4', '5', '6'].map((b) => (
            <button
              key={b}
              type="button"
              onClick={() => onChange('bedrooms', b)}
              className={`py-2 text-xs font-medium rounded-xs border transition-all cursor-pointer ${
                filters.bedrooms === b
                  ? 'bg-[#121417] text-white border-[#121417]'
                  : 'bg-[#FAF8F5] text-zinc-600 border-stone-200 hover:border-[#C5A880]'
              }`}
            >
              {b === 'all' ? 'Any' : `${b}+`}
            </button>
          ))}
        </div>
      </div>

      {/* 6. Sort By */}
      <div className="space-y-2">
        <label className="text-xs font-semibold uppercase tracking-wider text-zinc-600">Sort By</label>
        <select
          value={filters.sortBy}
          onChange={(e) => onChange('sortBy', e.target.value)}
          className="w-full px-3 py-2 bg-[#FAF8F5] border border-stone-200 rounded-xs text-sm text-[#121417] focus:outline-none focus:border-[#C5A880] cursor-pointer"
        >
          <option value="featured">Featured First</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="sqft-desc">Area: Largest First</option>
        </select>
      </div>

      {/* Mobile Drawer Actions */}
      {isMobileDrawer && (
        <div className="pt-4 flex items-center gap-3 border-t border-stone-200">
          <button
            onClick={onReset}
            className="w-1/3 py-3 border border-stone-300 text-zinc-700 text-xs font-semibold uppercase tracking-wider rounded-xs"
          >
            Reset
          </button>
          <button
            onClick={onCloseDrawer}
            className="w-2/3 py-3 bg-[#C5A880] text-[#121417] text-xs font-semibold uppercase tracking-wider rounded-xs"
          >
            Apply ({totalResults} Results)
          </button>
        </div>
      )}
    </div>
  );
}
