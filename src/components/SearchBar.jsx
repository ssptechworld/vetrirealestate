import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, MapPin, Home, DollarSign, Bed, SlidersHorizontal } from 'lucide-react';
import { LOCATIONS, PROPERTY_TYPES } from '../data/properties';

export default function SearchBar({ onSearch, initialValues = {} }) {
  const navigate = useNavigate();
  const [location, setLocation] = useState(initialValues.location || 'All Locations');
  const [propertyType, setPropertyType] = useState(initialValues.propertyType || 'All Types');
  const [priceRange, setPriceRange] = useState(initialValues.priceRange || 'all');
  const [bedrooms, setBedrooms] = useState(initialValues.bedrooms || 'all');

  const handleSubmit = (e) => {
    e.preventDefault();
    const queryParams = new URLSearchParams();
    if (location && location !== 'All Locations') queryParams.set('location', location);
    if (propertyType && propertyType !== 'All Types') queryParams.set('type', propertyType);
    if (priceRange && priceRange !== 'all') queryParams.set('price', priceRange);
    if (bedrooms && bedrooms !== 'all') queryParams.set('bedrooms', bedrooms);

    if (onSearch) {
      onSearch({ location, propertyType, priceRange, bedrooms });
    } else {
      navigate(`/properties?${queryParams.toString()}`);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-[#121417]/85 backdrop-blur-xl border border-white/15 p-4 sm:p-6 rounded-xs shadow-2xl w-full max-w-5xl mx-auto text-white"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Location Dropdown */}
        <div className="flex flex-col space-y-1.5">
          <label className="text-[11px] uppercase tracking-widest text-[#C5A880] font-semibold flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5" />
            <span>Location</span>
          </label>
          <select
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full bg-white/5 border border-white/15 rounded-xs px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#C5A880] transition-colors cursor-pointer appearance-none"
          >
            {LOCATIONS.map((loc) => (
              <option key={loc} value={loc} className="bg-[#121417] text-white">
                {loc}
              </option>
            ))}
          </select>
        </div>

        {/* Property Type Dropdown */}
        <div className="flex flex-col space-y-1.5">
          <label className="text-[11px] uppercase tracking-widest text-[#C5A880] font-semibold flex items-center gap-1.5">
            <Home className="w-3.5 h-3.5" />
            <span>Property Type</span>
          </label>
          <select
            value={propertyType}
            onChange={(e) => setPropertyType(e.target.value)}
            className="w-full bg-white/5 border border-white/15 rounded-xs px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#C5A880] transition-colors cursor-pointer appearance-none"
          >
            {PROPERTY_TYPES.map((type) => (
              <option key={type} value={type} className="bg-[#121417] text-white">
                {type}
              </option>
            ))}
          </select>
        </div>

        {/* Price Range Dropdown */}
        <div className="flex flex-col space-y-1.5">
          <label className="text-[11px] uppercase tracking-widest text-[#C5A880] font-semibold flex items-center gap-1.5">
            <DollarSign className="w-3.5 h-3.5" />
            <span>Price Bracket</span>
          </label>
          <select
            value={priceRange}
            onChange={(e) => setPriceRange(e.target.value)}
            className="w-full bg-white/5 border border-white/15 rounded-xs px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#C5A880] transition-colors cursor-pointer appearance-none"
          >
            <option value="all" className="bg-[#121417] text-white">All Price Ranges</option>
            <option value="under-10cr" className="bg-[#121417] text-white">Under ₹10 Cr</option>
            <option value="10cr-20cr" className="bg-[#121417] text-white">₹10 Cr – ₹20 Cr</option>
            <option value="above-20cr" className="bg-[#121417] text-white">Above ₹20 Cr</option>
          </select>
        </div>

        {/* Bedrooms Dropdown */}
        <div className="flex flex-col space-y-1.5">
          <label className="text-[11px] uppercase tracking-widest text-[#C5A880] font-semibold flex items-center gap-1.5">
            <Bed className="w-3.5 h-3.5" />
            <span>Bedrooms</span>
          </label>
          <select
            value={bedrooms}
            onChange={(e) => setBedrooms(e.target.value)}
            className="w-full bg-white/5 border border-white/15 rounded-xs px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#C5A880] transition-colors cursor-pointer appearance-none"
          >
            <option value="all" className="bg-[#121417] text-white">Any Bedrooms</option>
            <option value="3" className="bg-[#121417] text-white">3+ Bedrooms</option>
            <option value="4" className="bg-[#121417] text-white">4+ Bedrooms</option>
            <option value="5" className="bg-[#121417] text-white">5+ Bedrooms</option>
            <option value="6" className="bg-[#121417] text-white">6+ Bedrooms</option>
          </select>
        </div>

      </div>

      {/* Submit Button */}
      <div className="mt-5 pt-4 border-t border-white/10 flex items-center justify-between">
        <span className="text-xs text-zinc-400 hidden sm:inline-block">
          Discover exclusive off-market coastal & metropolitan residences
        </span>
        <button
          type="submit"
          className="w-full sm:w-auto px-8 py-3 bg-[#C5A880] hover:bg-[#b5966c] text-[#121417] text-xs font-semibold tracking-widest uppercase rounded-xs transition-all duration-300 shadow-lg flex items-center justify-center gap-2 cursor-pointer"
        >
          <Search className="w-4 h-4" />
          <span>Explore Properties</span>
        </button>
      </div>
    </form>
  );
}
