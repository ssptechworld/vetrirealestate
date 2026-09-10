import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { SlidersHorizontal, Heart } from 'lucide-react';
import SearchBar from '../components/SearchBar';
import PropertyFilters from '../components/PropertyFilters';
import PropertyGrid from '../components/PropertyGrid';
import { useFavorites } from '../context/FavoritesContext';
import { getProjects, formatProjectForCarousel } from '../services/projectService';

export default function Properties() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { favorites } = useFavorites();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [allProperties, setAllProperties] = useState([]);

  useEffect(() => {
    let isMounted = true;
    const fetchDatabaseProjects = async () => {
      try {
        setLoading(true);
        setError(null);
        const projects = await getProjects();
        if (isMounted) {
          const formatted = (projects || []).map(formatProjectForCarousel).filter(Boolean);
          setAllProperties(formatted);
        }
      } catch (err) {
        console.error("Failed to fetch database projects in Properties page:", err);
        if (isMounted) {
          setError("Failed to connect to property database. Please verify the backend API server is running.");
          setAllProperties([]);
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    };
    fetchDatabaseProjects();
    return () => { isMounted = false; };
  }, []);

  // Filters State
  const [filters, setFilters] = useState({
    search: searchParams.get('search') || '',
    location: searchParams.get('location') || 'All Locations',
    type: searchParams.get('type') || 'All Types',
    priceRange: searchParams.get('price') || 'all',
    maxPrice: 300000000,
    bedrooms: searchParams.get('bedrooms') || 'all',
    sortBy: 'featured',
    showFavoritesOnly: searchParams.get('favorites') === 'true'
  });

  // Sync query params when filters change from URL
  useEffect(() => {
    const isFav = searchParams.get('favorites') === 'true';
    const locParam = searchParams.get('location');
    const typeParam = searchParams.get('type');
    const priceParam = searchParams.get('price');
    const bedsParam = searchParams.get('bedrooms');

    setFilters((prev) => ({
      ...prev,
      showFavoritesOnly: isFav,
      location: locParam || 'All Locations',
      type: typeParam || 'All Types',
      priceRange: priceParam || 'all',
      bedrooms: bedsParam || 'all'
    }));
  }, [searchParams]);

  const handleFilterChange = (key, value) => {
    setLoading(true);
    setFilters((prev) => ({ ...prev, [key]: value }));
    setTimeout(() => setLoading(false), 200);
  };

  const handleSearchFromBar = ({ location, propertyType, priceRange, bedrooms }) => {
    setLoading(true);
    setFilters((prev) => ({
      ...prev,
      location: location || 'All Locations',
      type: propertyType || 'All Types',
      priceRange: priceRange || 'all',
      bedrooms: bedrooms || 'all'
    }));
    setTimeout(() => setLoading(false), 200);
  };

  const handleReset = () => {
    setLoading(true);
    setFilters({
      search: '',
      location: 'All Locations',
      type: 'All Types',
      priceRange: 'all',
      maxPrice: 300000000,
      bedrooms: 'all',
      sortBy: 'featured',
      showFavoritesOnly: false
    });
    setSearchParams({});
    setTimeout(() => setLoading(false), 200);
  };

  // Filtered Properties Computation
  const filteredProperties = useMemo(() => {
    let result = [...allProperties];

    if (filters.showFavoritesOnly) {
      result = result.filter((p) => favorites.includes(p.id));
    }

    if (filters.search.trim()) {
      const q = filters.search.toLowerCase();
      result = result.filter(
        (p) =>
          (p.title && p.title.toLowerCase().includes(q)) ||
          (p.name && p.name.toLowerCase().includes(q)) ||
          (p.location && p.location.toLowerCase().includes(q)) ||
          (p.propertyType && p.propertyType.toLowerCase().includes(q)) ||
          (p.description && p.description.toLowerCase().includes(q))
      );
    }

    if (filters.location && filters.location !== 'All Locations') {
      const locQ = filters.location.toLowerCase();
      result = result.filter(
        (p) =>
          (p.areaName && p.areaName.toLowerCase().includes(locQ)) ||
          (p.location && p.location.toLowerCase().includes(locQ))
      );
    }

    if (filters.type && filters.type !== 'All Types') {
      const typeQ = filters.type.toLowerCase();
      result = result.filter(
        (p) => p.propertyType && p.propertyType.toLowerCase().includes(typeQ)
      );
    }

    // Price Bracket Filtering
    if (filters.priceRange === 'under-10cr') {
      result = result.filter((p) => p.price < 100000000);
    } else if (filters.priceRange === '10cr-20cr') {
      result = result.filter((p) => p.price >= 100000000 && p.price <= 200000000);
    } else if (filters.priceRange === 'above-20cr') {
      result = result.filter((p) => p.price > 200000000);
    } else {
      if (filters.maxPrice < 300000000) {
        result = result.filter((p) => p.price <= filters.maxPrice || p.price === 0);
      }
    }

    if (filters.bedrooms !== 'all') {
      const minBeds = parseInt(filters.bedrooms, 10);
      result = result.filter((p) => {
        const bedVal = parseInt(String(p.bedrooms).replace(/[^0-9]/g, ''), 10);
        return isNaN(bedVal) ? true : bedVal >= minBeds;
      });
    }

    // Sort logic
    if (filters.sortBy === 'price-asc') {
      result.sort((a, b) => a.price - b.price);
    } else if (filters.sortBy === 'price-desc') {
      result.sort((a, b) => b.price - a.price);
    } else if (filters.sortBy === 'sqft-desc') {
      result.sort((a, b) => b.sqft - a.sqft);
    } else {
      result.sort((a, b) => (b.badge === 'Featured' ? 1 : 0) - (a.badge === 'Featured' ? 1 : 0));
    }

    return result;
  }, [filters, favorites, allProperties]);

  return (
    <div className="min-h-screen bg-[#FAF8F5]/80 backdrop-blur-xs pt-24 pb-20">
      
      {/* Banner Header with Integrated Search & Filter UI */}
      <section className="bg-[#0E1013] text-white py-20 mb-12 border-b border-white/10 relative overflow-hidden">
        <div className="absolute inset-0 opacity-15 bg-[radial-gradient(circle_at_30%_30%,rgba(197,168,128,0.3),transparent_70%)] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6 relative z-10">
          <div>
            <span className="text-xs uppercase tracking-[0.25em] text-[#C5A880] font-bold block mb-2">
              COMPLETED & ONGOING PORTFOLIO
            </span>
            <h1 className="font-serif text-4xl sm:text-5xl font-bold tracking-tight uppercase">
              {filters.showFavoritesOnly ? 'Your Saved Residences' : 'Explore Luxury Residences'}
            </h1>
            <p className="text-stone-300 text-sm max-w-xl mx-auto mt-3 font-light leading-relaxed">
              {filters.showFavoritesOnly
                ? `Reviewing your ${favorites.length} saved shortlisted properties.`
                : 'Browse completed ready-to-move apartments, oceanfront residences, and upcoming flagship developments.'}
            </p>
          </div>

          {/* Property Search / Filter Bar Component */}
          <div className="pt-2">
            <SearchBar
              onSearch={handleSearchFromBar}
              initialValues={{
                location: filters.location,
                propertyType: filters.type,
                priceRange: filters.priceRange,
                bedrooms: filters.bedrooms
              }}
            />
          </div>
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
              className="lg:hidden flex-1 sm:flex-none px-4 py-2.5 bg-[#121417] text-white text-xs uppercase tracking-wider font-bold rounded-xs flex items-center justify-center gap-2"
            >
              <SlidersHorizontal className="w-4 h-4 text-[#C5A880]" />
              <span>More Filters ({filteredProperties.length})</span>
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
              error={error}
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
