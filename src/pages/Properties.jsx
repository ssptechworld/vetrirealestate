import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { SlidersHorizontal, Heart } from 'lucide-react';
import SearchBar from '../components/SearchBar';
import PropertyFilters from '../components/PropertyFilters';
import PropertyGrid from '../components/PropertyGrid';
import { useFavorites } from '../context/FavoritesContext';
import { getOngoingProjects, formatProjectForCarousel, formatPriceShort } from '../services/projectService';

export default function Properties() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { favorites } = useFavorites();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [ongoingProperties, setOngoingProperties] = useState([]);

  // 1. Fetch ONLY ongoing projects from the backend database
  useEffect(() => {
    let isMounted = true;
    const fetchDatabaseOngoingProjects = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch from ongoing endpoint
        const projects = await getOngoingProjects();
        if (isMounted) {
          const raw = Array.isArray(projects) ? projects : [];

          // STRICT FILTER: Ongoing status only. Completed projects must NEVER be loaded
          const ongoingOnly = raw
            .filter((p) => p.status?.toLowerCase() === 'ongoing')
            .map(formatProjectForCarousel)
            .filter(Boolean);

          setOngoingProperties(ongoingOnly);
        }
      } catch (err) {
        console.error("Failed to fetch ongoing projects in Properties page:", err);
        if (isMounted) {
          setOngoingProperties([]);
          setError("Unable to load properties. Please try again later.");
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchDatabaseOngoingProjects();
    return () => { isMounted = false; };
  }, []);

  // 2. DYNAMIC LOCATION OPTIONS (Generated ONLY from ongoing database projects)
  const availableLocations = useMemo(() => {
    const locSet = new Set();
    ongoingProperties.forEach((p) => {
      if (p.location && typeof p.location === 'string' && p.location.trim()) {
        locSet.add(p.location.trim());
      }
    });
    return ['All Locations', ...Array.from(locSet).sort()];
  }, [ongoingProperties]);

  // 3. DYNAMIC PROPERTY TYPE OPTIONS (Generated ONLY from ongoing database projects)
  const availableTypes = useMemo(() => {
    const typeSet = new Set();
    ongoingProperties.forEach((p) => {
      if (p.propertyType && typeof p.propertyType === 'string' && p.propertyType.trim()) {
        typeSet.add(p.propertyType.trim());
      }
    });
    return ['All Types', ...Array.from(typeSet).sort()];
  }, [ongoingProperties]);

  // 4. DYNAMIC BEDROOM OPTIONS (Generated ONLY from ongoing database projects)
  const availableBedrooms = useMemo(() => {
    const bedSet = new Set();
    ongoingProperties.forEach((p) => {
      if (p.bedrooms) {
        const match = String(p.bedrooms).match(/\d+/);
        if (match) {
          bedSet.add(match[0]);
        } else if (typeof p.bedrooms === 'string' && p.bedrooms.trim()) {
          bedSet.add(p.bedrooms.trim());
        }
      }
    });
    const sorted = Array.from(bedSet).sort((a, b) => Number(a) - Number(b));
    return ['all', ...sorted];
  }, [ongoingProperties]);

  // 5. DYNAMIC PRICE RANGE (Calculated ONLY from ongoing database projects)
  const { minPrice, maxPrice } = useMemo(() => {
    const prices = ongoingProperties
      .map((p) => p.price)
      .filter((p) => typeof p === 'number' && p > 0);

    if (prices.length === 0) {
      return { minPrice: 0, maxPrice: 100000000 };
    }

    const min = Math.min(...prices);
    const max = Math.max(...prices);

    return {
      minPrice: min,
      maxPrice: max === min ? max + 10000000 : max
    };
  }, [ongoingProperties]);

  // Dynamic price brackets for search bar
  const priceOptions = useMemo(() => {
    const prices = ongoingProperties
      .map((p) => p.price)
      .filter((p) => typeof p === 'number' && p > 0)
      .sort((a, b) => a - b);

    if (prices.length <= 1) {
      return [];
    }

    const median = prices[Math.floor(prices.length / 2)];
    return [
      { value: `under-${median}`, label: `Under ${formatPriceShort(median)}` },
      { value: `above-${median}`, label: `Above ${formatPriceShort(median)}` }
    ];
  }, [ongoingProperties]);

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

  // Keep maxPrice in sync once projects load if not manually adjusted
  useEffect(() => {
    if (maxPrice > 0 && filters.maxPrice === 300000000) {
      setFilters((prev) => ({ ...prev, maxPrice }));
    }
  }, [maxPrice]);

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
      maxPrice,
      bedrooms: 'all',
      sortBy: 'featured',
      showFavoritesOnly: false
    });
    setSearchParams({});
    setTimeout(() => setLoading(false), 200);
  };

  // 6. FILTER ONGOING DATASET
  const filteredProperties = useMemo(() => {
    let result = [...ongoingProperties];

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

    // Dynamic price filtering
    if (filters.priceRange && filters.priceRange !== 'all') {
      if (filters.priceRange.startsWith('under-')) {
        const threshold = Number(filters.priceRange.replace('under-', ''));
        if (!isNaN(threshold)) {
          result = result.filter((p) => p.price <= threshold);
        }
      } else if (filters.priceRange.startsWith('above-')) {
        const threshold = Number(filters.priceRange.replace('above-', ''));
        if (!isNaN(threshold)) {
          result = result.filter((p) => p.price >= threshold);
        }
      }
    } else if (filters.maxPrice) {
      result = result.filter((p) => p.price <= filters.maxPrice || p.price === 0);
    }

    // Dynamic bedroom filtering
    if (filters.bedrooms !== 'all') {
      const targetBeds = String(filters.bedrooms);
      result = result.filter((p) => {
        const bedVal = String(p.bedrooms).match(/\d+/);
        return bedVal ? bedVal[0] === targetBeds || Number(bedVal[0]) >= Number(targetBeds) : true;
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
  }, [filters, favorites, ongoingProperties]);

  // 7. COMPLETED PROJECTS FINAL SAFETY CHECK
  // Even if any non-ongoing project somehow passed, strictly exclude it here
  const visibleProperties = useMemo(() => {
    return filteredProperties.filter(
      (project) => project.status?.toLowerCase() === 'ongoing'
    );
  }, [filteredProperties]);

  return (
    <div className="min-h-screen bg-[#FAF8F5]/80 backdrop-blur-xs pt-24 pb-20">
      
      {/* Banner Header with Integrated Search & Filter UI */}
      <section className="bg-[#0E1013] text-white py-20 mb-12 border-b border-white/10 relative overflow-hidden">
        <div className="absolute inset-0 opacity-15 bg-[radial-gradient(circle_at_30%_30%,rgba(197,168,128,0.3),transparent_70%)] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6 relative z-10">
          <div>
            <span className="text-xs uppercase tracking-[0.25em] text-[#C5A880] font-bold block mb-2">
              ONGOING DEVELOPMENTS PORTFOLIO
            </span>
            <h1 className="font-serif text-4xl sm:text-5xl font-bold tracking-tight uppercase">
              {filters.showFavoritesOnly ? 'Your Saved Residences' : 'Ongoing Luxury Developments'}
            </h1>
            <p className="text-stone-300 text-sm max-w-xl mx-auto mt-3 font-light leading-relaxed">
              {filters.showFavoritesOnly
                ? `Reviewing your ${favorites.length} saved shortlisted properties.`
                : 'Browse our latest ongoing residential projects currently under active development.'}
            </p>
          </div>

          {/* Property Search / Filter Bar Component */}
          <div className="pt-2">
            <SearchBar
              onSearch={handleSearchFromBar}
              locations={availableLocations}
              propertyTypes={availableTypes}
              bedroomOptions={availableBedrooms}
              priceOptions={priceOptions}
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
              Showing {visibleProperties.length} Ongoing Development{visibleProperties.length !== 1 ? 's' : ''}
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
              <span>More Filters ({visibleProperties.length})</span>
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
                totalResults={visibleProperties.length}
                locations={availableLocations}
                propertyTypes={availableTypes}
                bedroomOptions={availableBedrooms}
                minPrice={minPrice}
                maxPrice={maxPrice}
              />
            </div>
          </div>

          {/* Property Grid Results */}
          <div className="lg:col-span-3">
            <PropertyGrid
              properties={visibleProperties}
              loading={loading}
              error={error}
              totalOngoingCount={ongoingProperties.length}
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
                totalResults={visibleProperties.length}
                locations={availableLocations}
                propertyTypes={availableTypes}
                bedroomOptions={availableBedrooms}
                minPrice={minPrice}
                maxPrice={maxPrice}
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
