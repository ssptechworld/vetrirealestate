import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Building, 
  MapPin, 
  Calendar, 
  Play, 
  X, 
  Maximize2, 
  Sparkles, 
  Image as ImageIcon, 
  Film, 
  ChevronLeft, 
  ChevronRight,
  RefreshCw,
  FolderOpen
} from 'lucide-react';
import { getGalleryItems, getMediaUrl } from '../services/galleryService';
import { fadeUp, staggerContainer, EASE_LUXURY } from '../utils/animations';

export default function Gallery() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeFilter, setActiveFilter] = useState('all'); // 'all', 'images', 'videos'

  // Lightbox Modal state
  const [selectedMedia, setSelectedMedia] = useState(null); // { mediaUrl, mediaType, projectName, location, index, projectMediaList }

  const fetchGallery = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getGalleryItems(true); // Grouped by project
      setProjects(data);
    } catch (err) {
      console.error('Error loading gallery:', err);
      setError('Could not connect to backend server. Make sure node server is running.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGallery();
  }, []);

  const openLightbox = (mediaItem, projectMediaList, index) => {
    setSelectedMedia({
      ...mediaItem,
      projectMediaList,
      index
    });
  };

  const closeLightbox = () => {
    setSelectedMedia(null);
  };

  const handlePrevMedia = () => {
    if (!selectedMedia || !selectedMedia.projectMediaList) return;
    const list = selectedMedia.projectMediaList;
    const prevIdx = (selectedMedia.index - 1 + list.length) % list.length;
    setSelectedMedia({
      ...list[prevIdx],
      projectMediaList: list,
      index: prevIdx
    });
  };

  const handleNextMedia = () => {
    if (!selectedMedia || !selectedMedia.projectMediaList) return;
    const list = selectedMedia.projectMediaList;
    const nextIdx = (selectedMedia.index + 1) % list.length;
    setSelectedMedia({
      ...list[nextIdx],
      projectMediaList: list,
      index: nextIdx
    });
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5]/80 backdrop-blur-xs pt-24 pb-24 text-[#121417]">
      
      {/* Dark Architectural Hero Banner */}
      <section className="relative py-16 sm:py-28 bg-[#0E1013] text-white overflow-hidden mb-10 sm:mb-16 border-b border-white/10">
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_30%_30%,rgba(197,168,128,0.35),transparent_70%)] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-[#C5A880] text-[11px] sm:text-xs font-bold tracking-[0.15em] sm:tracking-[0.2em] uppercase mb-1 sm:mb-2 shadow-lg"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#C5A880]" />
            <span>Architecture & Media Portfolio</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.2, ease: EASE_LUXURY }}
            className="font-serif text-2xl sm:text-4xl md:text-6xl font-bold tracking-tight text-white uppercase leading-tight"
          >
            COMPLETED PROJECT GALLERY
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-stone-300 text-xs sm:text-base font-light max-w-2xl mx-auto leading-relaxed"
          >
            Explore our curated showcase of completed residences, architectural joinery, structural engineering, and cinematic walk-throughs.
          </motion.p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Portfolio Filter Toolbar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-200 pb-6 mb-8 sm:mb-12">
          <div className="flex flex-wrap items-center gap-2 sm:gap-2.5">
            <button
              onClick={() => setActiveFilter('all')}
              className={`px-3.5 sm:px-5 py-2 sm:py-2.5 text-[11px] sm:text-xs font-bold uppercase tracking-wider sm:tracking-widest rounded-full sm:rounded-xs transition-all cursor-pointer ${
                activeFilter === 'all'
                  ? 'bg-[#121417] text-[#C5A880] shadow-xl border border-[#C5A880]/30'
                  : 'bg-white text-stone-600 hover:bg-stone-100 border border-stone-200'
              }`}
            >
              All Media
            </button>
            <button
              onClick={() => setActiveFilter('images')}
              className={`px-3.5 sm:px-5 py-2 sm:py-2.5 text-[11px] sm:text-xs font-bold uppercase tracking-wider sm:tracking-widest rounded-full sm:rounded-xs transition-all flex items-center gap-1.5 sm:gap-2 cursor-pointer ${
                activeFilter === 'images'
                  ? 'bg-[#121417] text-[#C5A880] shadow-xl border border-[#C5A880]/30'
                  : 'bg-white text-stone-600 hover:bg-stone-100 border border-stone-200'
              }`}
            >
              <ImageIcon className="w-3.5 h-3.5 text-[#C5A880]" />
              <span>Photos</span>
            </button>
            <button
              onClick={() => setActiveFilter('videos')}
              className={`px-3.5 sm:px-5 py-2 sm:py-2.5 text-[11px] sm:text-xs font-bold uppercase tracking-wider sm:tracking-widest rounded-full sm:rounded-xs transition-all flex items-center gap-1.5 sm:gap-2 cursor-pointer ${
                activeFilter === 'videos'
                  ? 'bg-[#121417] text-[#C5A880] shadow-xl border border-[#C5A880]/30'
                  : 'bg-white text-stone-600 hover:bg-stone-100 border border-stone-200'
              }`}
            >
              <Film className="w-3.5 h-3.5 text-[#C5A880]" />
              <span>Videos</span>
            </button>
          </div>

          <div className="text-xs text-stone-500 font-medium">
            Displaying <span className="font-bold text-[#121417]">{projects.length}</span> Project(s)
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="py-24 flex flex-col items-center justify-center gap-3 text-[#C5A880]">
            <div className="w-8 h-8 border-3 border-[#C5A880] border-t-transparent rounded-full animate-spin" />
            <span className="text-xs font-bold uppercase tracking-widest text-stone-500">Loading Completed Portfolio...</span>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="py-16 text-center bg-red-50 border border-red-200 rounded-xs max-w-xl mx-auto p-6 space-y-4">
            <p className="text-sm font-semibold text-red-700">{error}</p>
            <button
              onClick={fetchGallery}
              className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-xs font-bold uppercase tracking-wider rounded-xs transition-all flex items-center gap-2 mx-auto cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Retry Fetch</span>
            </button>
          </div >
        )}

        {/* Empty State */}
        {!loading && !error && projects.length === 0 && (
          <div className="py-16 sm:py-24 text-center bg-white border border-stone-200 rounded-2xl sm:rounded-xs max-w-lg mx-auto p-6 sm:p-12 space-y-4">
            <div className="w-16 h-16 bg-[#FAF8F5] rounded-full flex items-center justify-center mx-auto text-[#C5A880] border border-[#C5A880]/30">
              <FolderOpen className="w-8 h-8 opacity-60" />
            </div>
            <h3 className="font-serif text-xl font-bold text-[#121417]">No Gallery Media Uploaded</h3>
            <p className="text-xs text-stone-500 leading-relaxed">
              No completed project media items are available at the moment. Add items via admin dashboard.
            </p>
          </div>
        )}

        {/* Project Group Sections */}
        {!loading && !error && projects.length > 0 && (
          <motion.div
            variants={staggerContainer(0.15, 0.1)}
            initial="hidden"
            animate="visible"
            className="space-y-16 sm:space-y-24"
          >
            {projects.map((project, pIdx) => {
              // Filter media based on selected active tab
              const filteredMedia = (project.media || []).filter((item) => {
                if (activeFilter === 'images') return item.mediaType === 'image';
                if (activeFilter === 'videos') return item.mediaType === 'video';
                return true;
              });

              if (filteredMedia.length === 0) return null;

              return (
                <motion.section
                  key={pIdx}
                  variants={fadeUp}
                  className="space-y-6 sm:space-y-8"
                >
                  {/* Project Group Header */}
                  <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 sm:gap-4 border-b border-stone-200 pb-4 sm:pb-5">
                    <div className="space-y-1">
                      <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                        <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.2em] text-[#C5A880]">
                          PROJECT {String(pIdx + 1).padStart(2, '0')}
                        </span>
                        {project.completionYear && (
                          <span className="inline-flex items-center gap-1 text-[10px] sm:text-[11px] font-bold text-stone-600 bg-stone-100 px-2.5 py-0.5 rounded-xs border border-stone-200">
                            <Calendar className="w-3 h-3 text-[#C5A880]" />
                            <span>Handover {project.completionYear}</span>
                          </span>
                        )}
                      </div>
                      
                      <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#121417]">
                        {project.projectName}
                      </h2>
                    </div>

                    {project.location && (
                      <div className="flex items-center gap-1.5 text-xs text-stone-600 font-semibold tracking-wider uppercase">
                        <MapPin className="w-3.5 h-3.5 text-[#C5A880]" />
                        <span>{project.location}</span>
                      </div>
                    )}
                  </div>

                  {/* Description */}
                  {project.description && (
                    <p className="text-xs sm:text-sm text-stone-600 font-light max-w-3xl leading-relaxed">
                      {project.description}
                    </p>
                  )}

                  {/* Architectural Media Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-7 pt-2">
                    {filteredMedia.map((media, mIdx) => {
                      const fullMediaUrl = getMediaUrl(media.mediaUrl);
                      const isVideo = media.mediaType === 'video';

                      return (
                        <motion.div
                          key={media._id || mIdx}
                          whileHover={{ y: -8 }}
                          onClick={() => openLightbox(media, filteredMedia, mIdx)}
                          className="group relative aspect-[4/3] rounded-xl sm:rounded-xs overflow-hidden cursor-pointer bg-[#0E1013] shadow-md hover:shadow-2xl border border-stone-200/90 transition-all duration-500"
                        >
                          {isVideo ? (
                            <div className="relative w-full h-full bg-[#0E1013] flex items-center justify-center">
                              <video
                                src={fullMediaUrl}
                                preload="metadata"
                                className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-108 transition-all duration-700 pointer-events-none"
                              />
                              {/* Play Button Badge Overlay */}
                              <div className="absolute inset-0 flex items-center justify-center bg-black/40 group-hover:bg-black/20 transition-colors">
                                <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-[#C5A880] text-[#121417] flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform duration-300">
                                  <Play className="w-5 h-5 sm:w-7 sm:h-7 fill-current translate-x-0.5" />
                                </div>
                              </div>
                            </div>
                          ) : (
                            <img
                              src={fullMediaUrl}
                              alt={`${project.projectName} - ${mIdx + 1}`}
                              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-108"
                              loading="lazy"
                            />
                          )}

                          {/* Hover Overlay */}
                          <div className="absolute inset-0 bg-gradient-to-t from-[#0E1013]/90 via-[#0E1013]/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-4 sm:p-6 flex flex-col justify-between pointer-events-none">
                            <div className="self-end bg-black/60 p-2 sm:p-2.5 rounded-xs border border-white/20 text-white backdrop-blur-md">
                              <Maximize2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#C5A880]" />
                            </div>

                            <div className="text-white space-y-1">
                              <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.2em] text-[#C5A880] font-bold block">
                                {isVideo ? 'Cinematic Video' : 'Architectural View'}
                              </span>
                              <h4 className="font-serif text-sm sm:text-base font-bold truncate">{project.projectName}</h4>
                            </div>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </motion.section>
              );
            })}
          </motion.div>
        )}
      </div>

      {/* Fullscreen Lightbox Modal */}
      <AnimatePresence>
        {selectedMedia && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-2xl flex items-center justify-center p-3 sm:p-8"
            onClick={closeLightbox}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ ease: EASE_LUXURY }}
              className="relative max-w-5xl w-full max-h-[90vh] flex flex-col items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={closeLightbox}
                className="absolute top-2 right-2 sm:-top-12 sm:right-0 z-30 text-stone-300 hover:text-white transition-colors p-2 bg-black/60 sm:bg-transparent rounded-full sm:rounded-none backdrop-blur-md sm:backdrop-blur-none cursor-pointer flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest"
              >
                <span className="hidden sm:inline">Close</span>
                <X className="w-5 h-5 text-white" />
              </button>

              {/* Prev/Next Controls */}
              {selectedMedia.projectMediaList && selectedMedia.projectMediaList.length > 1 && (
                <>
                  <button
                    onClick={handlePrevMedia}
                    className="absolute left-1 sm:-left-14 top-1/2 -translate-y-1/2 p-2.5 sm:p-3.5 bg-black/60 sm:bg-white/10 hover:bg-white/20 text-white border border-white/20 rounded-full backdrop-blur-md transition-all cursor-pointer z-30 shadow-2xl"
                    title="Previous Media"
                  >
                    <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
                  </button>
                  <button
                    onClick={handleNextMedia}
                    className="absolute right-1 sm:-right-14 top-1/2 -translate-y-1/2 p-2.5 sm:p-3.5 bg-black/60 sm:bg-white/10 hover:bg-white/20 text-white border border-white/20 rounded-full backdrop-blur-md transition-all cursor-pointer z-30 shadow-2xl"
                    title="Next Media"
                  >
                    <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
                  </button>
                </>
              )}

              {/* Media Container */}
              <div className="w-full h-full max-h-[75vh] flex items-center justify-center overflow-hidden rounded-xl sm:rounded-xs border border-white/15 bg-black shadow-2xl">
                {selectedMedia.mediaType === 'video' ? (
                  <video
                    src={getMediaUrl(selectedMedia.mediaUrl)}
                    controls
                    autoPlay
                    className="max-w-full max-h-[75vh] object-contain"
                  />
                ) : (
                  <img
                    src={getMediaUrl(selectedMedia.mediaUrl)}
                    alt={selectedMedia.projectName}
                    className="max-w-full max-h-[75vh] object-contain"
                  />
                )}
              </div>

              {/* Lightbox Footer Captions */}
              <div className="w-full pt-3 sm:pt-4 flex flex-col sm:flex-row items-start sm:items-center justify-between text-white gap-1.5 sm:gap-2 border-t border-white/15 mt-3 sm:mt-4">
                <div>
                  <h3 className="font-serif text-base sm:text-lg font-bold">{selectedMedia.projectName}</h3>
                  {selectedMedia.location && (
                    <p className="text-xs text-stone-400 flex items-center gap-1.5 mt-0.5">
                      <MapPin className="w-3.5 h-3.5 text-[#C5A880]" />
                      <span>{selectedMedia.location}</span>
                    </p>
                  )}
                </div>

                {selectedMedia.projectMediaList && (
                  <span className="text-xs text-[#C5A880] font-mono tracking-widest">
                    {selectedMedia.index + 1} / {selectedMedia.projectMediaList.length}
                  </span>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}

