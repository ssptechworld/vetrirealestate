import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { SlidersHorizontal, Grid, LayoutList, Heart, Sparkles } from 'lucide-react';
import PropertyFilters from '../components/PropertyFilters';
import PropertyGrid from '../components/PropertyGrid';
import { PROPERTIES_DATA } from '../data/properties';
import { useFavorites } from '../context/FavoritesContext';
import { fadeUp } from '../utils/animations';

export default function Properties() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { favorites } = useFavorites();

  const [loading, setLoading] = useState(false);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Filters State
  const [filters, setFilters] = useState({
    search: searchParams.get('search') || '',
    location: searchParams.get('location') || 'All Locations',
    type: searchParams.get('type') || 'All Types',
    maxPrice: 300000000,
    bedrooms: searchParams.get('bedrooms') || 'all',
    sortBy: 'featured',
    showFavoritesOnly: searchParams.get('favorites') === 'true'
  });

  // Sync query params when filters change
  useEffect(() => {
    const isFav = searchParams.get('favorites') === 'true';
    const locParam = searchParams.get('location');
    const typeParam = searchParams.get('type');

    if (isFav !== filters.showFavoritesOnly || (locParam && locParam !== filters.location) || (typeParam && typeParam !== filters.type)) {
      setFilters((prev) => ({
        ...prev,
        showFavoritesOnly: isFav,
        location: locParam || prev.location,
        type: typeParam || prev.type
      }));
    }
  }, [searchParams]);

  const handleFilterChange = (key, value) => {
    setLoading(true);
    setFilters((prev) => ({ ...prev, [key]: value }));
    setTimeout(() => setLoading(false), 300);
  };

  const handleReset = () => {
    setLoading(true);
    setFilters({
      search: '',
      location: 'All Locations',
      type: 'All Types',
      maxPrice: 300000000,
      bedrooms: 'all',
      sortBy: 'featured',
      showFavoritesOnly: false
    });
    setSearchParams({});
    setTimeout(() => setLoading(false), 300);
  };

  // Filtered Properties Computation
  const filteredProperties = useMemo(() => {
    let result = [...PROPERTIES_DATA];

    if (filters.showFavoritesOnly) {
      result = result.filter((p) => favorites.includes(p.id));
    }

    if (filters.search.trim()) {
      const q = filters.search.toLowerCase();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.location.toLowerCase().includes(q) ||
          p.propertyType.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q)
      );
    }

    if (filters.location !== 'All Locations') {
      result = result.filter((p) => p.areaName === filters.location || p.location.includes(filters.location));
    }

    if (filters.type !== 'All Types') {
      result = result.filter((p) => p.propertyType === filters.type);
    }

    result = result.filter((p) => p.price <= filters.maxPrice);

    if (filters.bedrooms !== 'all') {
      const minBeds = parseInt(filters.bedrooms, 10);
      result = result.filter((p) => p.bedrooms >= minBeds);
    }

    // Sort logic
    if (filters.sortBy === 'price-asc') {
      result.sort((a, b) => a.price - b.price);
    } else if (filters.sortBy === 'price-desc') {
      result.sort((a, b) => b.price - a.price);
    } else if (filters.sortBy === 'sqft-desc') {
      result.sort((a, b) => b.sqft - a.sqft);
    } else {
      // featured
      result.sort((a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0));
    }

    return result;
  }, [filters, favorites]);

  return (
    <div className="min-h-screen bg-[#FAF8F5] pt-28 pb-20">
      
      {/* Banner Header */}
      <section className="bg-[#121417] text-white py-16 mb-12 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-xs uppercase tracking-widest text-[#C5A880] font-semibold block mb-2">
            Architectural Sanctuaries
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold tracking-tight">
            {filters.showFavoritesOnly ? 'Your Saved Favorites' : 'Exclusive Property Discovery'}
          </h1>
          <p className="text-zinc-400 text-sm max-w-xl mx-auto mt-3 font-light">
            {filters.showFavoritesOnly
              ? `Reviewing your saved ${favorites.length} shortlisted luxury residences.`
              : 'Browse luxury beachfront villas, high-rise penthouses, and heritage private estates.'}
          </p>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Control Bar for Mobile & Count */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8 pb-4 border-b border-stone-200">
          <div className="flex items-center gap-3">
            <span className="text-sm font-serif font-bold text-[#121417]">
              Showing {filteredProperties.length} Luxury Residences
            </span>
            {filters.showFavoritesOnly && (
              <span className="px-2.5 py-0.5 bg-rose-500/10 text-rose-600 text-xs font-semibold rounded-full flex items-center gap-1">
                <Heart className="w-3 h-3 fill-current" />
                <span>Favorites Filter</span>
              </span>
            )}
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
            {/* Mobile Filter Drawer Trigger */}
            <button
              onClick={() => setMobileFilterOpen(true)}
              className="lg:hidden flex-1 sm:flex-none px-4 py-2.5 bg-[#121417] text-white text-xs uppercase tracking-wider font-semibold rounded-xs flex items-center justify-center gap-2"
            >
              <SlidersHorizontal className="w-4 h-4 text-[#C5A880]" />
              <span>Filters ({filteredProperties.length})</span>
            </button>
          </div>
        </div>

        {/* Layout: Sidebar + Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Desktop Filter Sidebar */}
          <div className="hidden lg:block lg:col-span-1">
            <div className="sticky top-28">
              <PropertyFilters
                filters={filters}
                onChange={handleFilterChange}
                onReset={handleReset}
                totalResults={filteredProperties.length}
              />
            </div>
          </div>

          {/* Property Grid Results */}
          <div className="lg:col-span-3">
            <PropertyGrid
              properties={filteredProperties}
              loading={loading}
              onResetFilters={handleReset}
            />
          </div>

        </div>
      </div>

      {/* Mobile Slide-out Filter Drawer */}
      <AnimatePresence>
        {mobileFilterOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm lg:hidden flex justify-end"
          >
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="bg-white w-full max-w-xs sm:max-w-sm h-full overflow-y-auto p-6 shadow-2xl"
            >
              <PropertyFilters
                filters={filters}
                onChange={handleFilterChange}
                onReset={handleReset}
                totalResults={filteredProperties.length}
                isMobileDrawer={true}
                onCloseDrawer={() => setMobileFilterOpen(false)}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
