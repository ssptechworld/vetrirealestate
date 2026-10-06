import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Maximize2, X, Image as ImageIcon } from 'lucide-react';

export default function PropertyGallery({ gallery = [], title = "Property Gallery" }) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  const images = gallery.length > 0 ? gallery : ["https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1200&q=85"];

  const handlePrev = (e) => {
    e?.stopPropagation();
    setSelectedIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = (e) => {
    e?.stopPropagation();
    setSelectedIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const hasMultipleImages = images.length > 1;

  return (
    <div className="space-y-4">
      {/* Main Image Showcase */}
      <div
        onClick={() => setIsLightboxOpen(true)}
        className="relative aspect-[16/9] md:aspect-[21/9] rounded-2xl overflow-hidden bg-stone-900 group cursor-pointer border border-stone-200/80 shadow-md"
      >
        <AnimatePresence mode="wait">
          <motion.img
            key={selectedIndex}
            src={images[selectedIndex]}
            alt={`${title} - Photo ${selectedIndex + 1}`}
            initial={{ opacity: 0.3, scale: 0.99 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0.3 }}
            transition={{ duration: 0.35, ease: 'easeInOut' }}
            className="w-full h-full object-cover"
          />
        </AnimatePresence>

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20 pointer-events-none" />

        {/* Navigation Controls (Shown when multiple images exist) */}
        {hasMultipleImages && (
          <div className="absolute inset-x-4 top-1/2 -translate-y-1/2 flex items-center justify-between pointer-events-none">
            <button
              onClick={handlePrev}
              className="p-3 rounded-full bg-black/60 text-white hover:bg-[#C5A880] hover:text-[#121417] backdrop-blur-md transition-all cursor-pointer pointer-events-auto border border-white/10 shadow-lg"
              aria-label="Previous photo"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <button
              onClick={handleNext}
              className="p-3 rounded-full bg-black/60 text-white hover:bg-[#C5A880] hover:text-[#121417] backdrop-blur-md transition-all cursor-pointer pointer-events-auto border border-white/10 shadow-lg"
              aria-label="Next photo"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        )}

        {/* Image Counter Badge: 1 / 6 */}
        {hasMultipleImages && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-1.5 bg-black/75 backdrop-blur-md text-white text-xs font-mono font-semibold rounded-full border border-white/15 shadow-md flex items-center gap-1.5">
            <span>{selectedIndex + 1}</span>
            <span className="text-zinc-400">/</span>
            <span>{images.length}</span>
          </div>
        )}

        {/* Lightbox Trigger Badge */}
        <div className="absolute bottom-4 right-4 px-3 py-1.5 bg-black/75 backdrop-blur-md text-white text-xs font-medium rounded-full flex items-center gap-2 border border-white/10 shadow-md">
          <Maximize2 className="w-3.5 h-3.5 text-[#C5A880]" />
          <span>Fullscreen</span>
        </div>
      </div>

      {/* Thumbnails Row (Shown when multiple images exist) */}
      {hasMultipleImages && (
        <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-none">
          {images.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedIndex(idx)}
              className={`relative flex-shrink-0 w-24 h-16 rounded-xl overflow-hidden border-2 transition-all cursor-pointer ${
                selectedIndex === idx
                  ? 'border-[#C5A880] opacity-100 scale-105 shadow-md'
                  : 'border-transparent opacity-60 hover:opacity-100'
              }`}
            >
              <img src={img} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      )}

      {/* Fullscreen Lightbox Modal */}
      <AnimatePresence>
        {isLightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-2xl flex flex-col justify-between p-4 md:p-8"
          >
            {/* Header */}
            <div className="flex items-center justify-between text-white border-b border-white/10 pb-4">
              <div>
                <h4 className="font-serif text-lg font-bold">{title}</h4>
                <p className="text-xs text-zinc-400">Photo {selectedIndex + 1} of {images.length}</p>
              </div>
              <button
                onClick={() => setIsLightboxOpen(false)}
                className="p-2 text-zinc-400 hover:text-white rounded-full bg-white/10 hover:bg-white/20 cursor-pointer"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Main Lightbox Image View */}
            <div className="relative flex-grow flex items-center justify-center py-4">
              <button
                onClick={handlePrev}
                className="absolute left-2 md:left-8 z-10 p-3 rounded-full bg-white/10 hover:bg-[#C5A880] text-white hover:text-[#121417] backdrop-blur-md transition-all cursor-pointer"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              <motion.img
                key={selectedIndex}
                src={images[selectedIndex]}
                alt={`${title} - Lightbox`}
                initial={{ scale: 0.95, opacity: 0.6 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0.6 }}
                transition={{ duration: 0.3 }}
                className="max-h-[80vh] max-w-full object-contain rounded-xs shadow-2xl"
              />

              <button
                onClick={handleNext}
                className="absolute right-2 md:right-8 z-10 p-3 rounded-full bg-white/10 hover:bg-[#C5A880] text-white hover:text-[#121417] backdrop-blur-md transition-all cursor-pointer"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>

            {/* Lightbox Footer Thumbnails */}
            <div className="flex justify-center gap-2 overflow-x-auto pt-4 border-t border-white/10">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedIndex(idx)}
                  className={`w-16 h-12 rounded-xs overflow-hidden border-2 transition-all cursor-pointer ${
                    selectedIndex === idx ? 'border-[#C5A880] scale-110' : 'border-transparent opacity-40'
                  }`}
                >
                  <img src={img} alt={`Thumb ${idx}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
