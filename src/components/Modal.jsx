import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, CheckCircle, Send } from 'lucide-react';
import { getOngoingProjects, formatProjectForCarousel } from '../services/projectService';

// Helper to extract and format project details (Title, BHK, Sq.ft, Price)
const getProjectDetails = (p) => {
  if (!p) return { title: '', bhk: '', area: '', price: '', label: '' };
  const raw = p.rawProject || {};

  const title = p.title || raw.name || 'Ongoing Project';

  let bhk = raw.bedrooms || p.bedrooms || '';
  if (bhk && !bhk.toLowerCase().includes('bhk')) {
    bhk = `${bhk} BHK`;
  }

  let area = raw.area || (p.sqft ? `${p.sqft} Sq.ft` : '');
  if (area && !area.toLowerCase().includes('sq')) {
    area = `${area} Sq.ft`;
  }

  const price = raw.price ? (p.formattedPrice || raw.price) : (p.formattedPrice || '');

  const parts = [title];
  if (bhk) parts.push(bhk);
  if (area) parts.push(area);
  const baseLabel = parts.join(' - ');
  const label = price && price !== 'Price on Request'
    ? `${baseLabel} (${price})`
    : baseLabel;

  return { title, bhk, area, price, label };
};

export default function Modal({ isOpen, onClose, defaultPropertyTitle = "" }) {
  const [ongoingProjects, setOngoingProjects] = useState([]);
  const [loadingProjects, setLoadingProjects] = useState(true);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    property: defaultPropertyTitle || '',
    date: '',
    message: ''
  });

  useEffect(() => {
    let isMounted = true;

    const fetchProjects = async () => {
      try {
        setLoadingProjects(true);
        const data = await getOngoingProjects();
        if (isMounted) {
          const formatted = (Array.isArray(data) ? data : [])
            .map(formatProjectForCarousel)
            .filter(Boolean);
          setOngoingProjects(formatted);

          setFormData((prev) => {
            if (defaultPropertyTitle) {
              return { ...prev, property: defaultPropertyTitle };
            }
            if (!prev.property && formatted.length > 0) {
              return { ...prev, property: formatted[0].title };
            }
            return prev;
          });
        }
      } catch (err) {
        console.error('Failed to fetch ongoing projects for modal:', err);
        if (isMounted) {
          setOngoingProjects([]);
        }
      } finally {
        if (isMounted) setLoadingProjects(false);
      }
    };

    if (isOpen) {
      fetchProjects();
    }

    return () => {
      isMounted = false;
    };
  }, [isOpen, defaultPropertyTitle]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();

    // Match selected project from ongoingProjects
    const selectedProj = ongoingProjects.find(
      (p) => p.title === formData.property || p.id === formData.property
    ) || ongoingProjects[0];

    const details = getProjectDetails(selectedProj);
    const selectedTitle = details.title || formData.property || 'N/A';
    const selectedBhk = details.bhk || 'N/A';
    const selectedArea = details.area || 'N/A';
    const selectedPrice = details.price || 'Price on Request';

    // Construct WhatsApp message with complete details
    const messageLines = [
      'New Property Visit Enquiry',
      '',
      `Full Name: ${formData.name}`,
      `Phone Number: ${formData.phone}`,
      `Email Address: ${formData.email}`,
      `Preferred Date: ${formData.date || 'Flexible'}`,
      `Property of Interest: ${selectedTitle}`,
      `BHK: ${selectedBhk}`,
      `Area: ${selectedArea}`,
      `Price: ${selectedPrice}`,
      'Question:',
      formData.message?.trim() || 'None'
    ];

    const whatsappText = messageLines.join('\n');
    const whatsappUrl = `https://wa.me/919361018536?text=${encodeURIComponent(whatsappText)}`;

    // Open WhatsApp in a new tab/window
    window.open(whatsappUrl, '_blank');

    setSubmitted(true);
    setTimeout(() => {
      // Auto close after 3 seconds
      setSubmitted(false);
      onClose();
    }, 3000);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/80 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3 }}
          className="relative bg-[#121417] text-white w-full max-w-xl p-6 sm:p-8 rounded-xs border border-white/15 shadow-2xl z-10"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-zinc-400 hover:text-white rounded-full bg-white/5 hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          {submitted ? (
            <div className="py-12 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-[#C5A880]/20 text-[#C5A880] mx-auto flex items-center justify-center border border-[#C5A880]">
                <CheckCircle className="w-8 h-8" />
              </div>
              <h3 className="font-serif text-2xl font-bold">Consultation Requested</h3>
              <p className="text-sm text-zinc-300 max-w-md mx-auto leading-relaxed">
                Thank you, <strong className="text-white">{formData.name}</strong>. Our senior private advisor will reach out to you within 2 business hours to confirm your private viewing.
              </p>
            </div>
          ) : (
            <div>
              <div className="mb-6">

                <h3 className="text-[30px] uppercase tracking-widest text-[#C5A880] font-semibold block">Schedule a site visit</h3>
                <p className="text-xs text-zinc-400 mt-1">
                  We invite you to visit our flat for an better experience.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[11px] font-semibold uppercase tracking-wider text-zinc-300 block mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Anand Varma"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-white/5 border border-white/15 rounded-xs text-sm text-white focus:outline-none focus:border-[#C5A880]"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-semibold uppercase tracking-wider text-zinc-300 block mb-1">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 98400 00000"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-white/5 border border-white/15 rounded-xs text-sm text-white focus:outline-none focus:border-[#C5A880]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[11px] font-semibold uppercase tracking-wider text-zinc-300 block mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="anand@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-white/5 border border-white/15 rounded-xs text-sm text-white focus:outline-none focus:border-[#C5A880]"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-semibold uppercase tracking-wider text-zinc-300 block mb-1">
                      Preferred Date
                    </label>
                    <input
                      type="date"
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-white/5 border border-white/15 rounded-xs text-sm text-white focus:outline-none focus:border-[#C5A880]"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[11px] font-semibold uppercase tracking-wider text-zinc-300 block mb-1">
                    Property of Interest
                  </label>
                  <select
                    value={formData.property}
                    onChange={(e) => setFormData({ ...formData, property: e.target.value })}
                    disabled={loadingProjects}
                    className="w-full px-3.5 py-2.5 bg-white/5 border border-white/15 rounded-xs text-sm text-white focus:outline-none focus:border-[#C5A880] cursor-pointer disabled:opacity-60"
                  >
                    {loadingProjects ? (
                      <option value="" className="bg-[#121417] text-white">
                        Loading ongoing projects...
                      </option>
                    ) : ongoingProjects.length === 0 ? (
                      <option value="" className="bg-[#121417] text-white">
                        No ongoing projects available
                      </option>
                    ) : (
                      ongoingProjects.map((p) => {
                        const { title, label } = getProjectDetails(p);
                        return (
                          <option key={p.id} value={title} className="bg-[#121417] text-white">
                            {label}
                          </option>
                        );
                      })
                    )}
                  </select>
                </div>

                <div>
                  <label className="text-[11px] font-semibold uppercase tracking-wider text-zinc-300 block mb-1">
                    Any doubt or question about this flat?
                  </label>
                  <textarea
                    rows="3"
                    placeholder="Ask anything..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-white/5 border border-white/15 rounded-xs text-sm text-white focus:outline-none focus:border-[#C5A880]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 bg-[#C5A880] hover:bg-[#b5966c] text-[#121417] text-xs font-semibold uppercase tracking-widest rounded-xs transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-lg mt-2"
                >
                  <Send className="w-4 h-4" />
                  <span>Book visit</span>
                </button>
              </form>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
