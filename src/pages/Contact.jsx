import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2, Shield, ExternalLink } from 'lucide-react';
import { getOngoingProjects, formatProjectForCarousel } from '../services/projectService';
import { fadeUp } from '../utils/animations';

// Helper to extract and format project details (Title, BHK, Sq.ft, Rate)
const getProjectDetails = (p) => {
  if (!p) return { name: '', bhk: '', area: '', price: '', label: '' };
  const raw = p.rawProject || p;

  const name = raw.name || p.title || 'Ongoing Project';

  let bhk = raw.bedrooms || p.bedrooms || '';
  if (bhk && !bhk.toLowerCase().includes('bhk')) {
    bhk = `${bhk} BHK`;
  }

  let area = raw.area || (p.sqft ? `${p.sqft} Sq.ft` : '');
  if (area && !area.toLowerCase().includes('sq')) {
    area = `${area} Sq.ft`;
  }

  let price = raw.price || p.formattedPrice || '';
  if (price && !price.startsWith('₹') && !price.toLowerCase().includes('lakh') && !price.toLowerCase().includes('cr')) {
    price = `₹${price}`;
  }

  const parts = [name];
  if (bhk) parts.push(bhk);
  if (area) parts.push(area);
  if (price) parts.push(price);

  const label = parts.join(' — ');

  return { name, bhk, area, price, label };
};

export default function Contact() {
  const [ongoingProjects, setOngoingProjects] = useState([]);
  const [loadingProjects, setLoadingProjects] = useState(true);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    property: '',
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
          if (formatted.length > 0) {
            setFormData((prev) => ({
              ...prev,
              property: prev.property || formatted[0].id
            }));
          }
        }
      } catch (err) {
        console.error('Failed to fetch ongoing projects for contact form:', err);
        if (isMounted) {
          setOngoingProjects([]);
        }
      } finally {
        if (isMounted) {
          setLoadingProjects(false);
        }
      }
    };

    fetchProjects();

    return () => {
      isMounted = false;
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.phone.trim() || !formData.email.trim() || !formData.message.trim()) {
      return;
    }

    // Match selected project from ongoingProjects by id or title
    const selectedProj = ongoingProjects.find(
      (p) => p.id === formData.property || p.title === formData.property
    ) || ongoingProjects[0];

    const details = getProjectDetails(selectedProj);
    const projectName = details.name || formData.property || 'N/A';
    const bhk = details.bhk || 'N/A';
    const area = details.area || 'N/A';
    const rate = details.price || 'Price on Request';

    // Construct WhatsApp message dynamically
    const messageLines = [
      'New Property Enquiry',
      '',
      `Full Name: ${formData.name.trim()}`,
      `Phone Number: ${formData.phone.trim()}`,
      `Email Address: ${formData.email.trim()}`,
      '',
      `Property Interested In: ${projectName}`,
      `BHK: ${bhk}`,
      `Area: ${area}`,
      `Rate: ${rate}`,
      '',
      'Message:',
      formData.message.trim()
    ];

    const whatsappUrl = `https://wa.me/919380005934?text=${encodeURIComponent(messageLines.join('\n'))}`;

    window.open(whatsappUrl, '_blank');
    setSubmitted(true);
  };

  const office = {
    name: "Vetri Vel Real Estate Head Office",
    address: "No. 16, Santro City, Chembarambakkam, Chennai - 600123",
    phone: "+91 93800 05934",
    email: "concierge@vetrivelrealestate.com",
    hours: "Mon – Sat: 9:00 AM – 7:00 PM",
    mapUrl: "https://www.google.com/maps/search/?api=1&query=16,+Santro+City,+Chembarambakkam,+Chennai",
    embedUrl: "https://maps.google.com/maps?q=16,+Santro+City,+Chembarambakkam,+Chennai&t=&z=15&ie=UTF8&iwloc=&output=embed"
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5]/80 backdrop-blur-xs pt-28 pb-24">

      {/* Header Banner */}
      <section className="bg-[#0E1013] text-white pt-16 pb-20 mb-16 border-b border-[#C5A880]/20 rounded-b-[48px] sm:rounded-b-[80px] shadow-2xl relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#C5A880]/15 via-transparent to-transparent pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-3">
          <span className="px-4 py-1.5 rounded-full bg-[#C5A880]/15 border border-[#C5A880]/30 text-[#C5A880] text-xs font-semibold uppercase tracking-widest inline-block">
            Private Consultation
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold tracking-tight text-white">
            Connect With Our Advisory Lounge
          </h1>
          <p className="text-zinc-400 text-sm max-w-xl mx-auto mt-3 font-light leading-relaxed">
            Whether inquiring about a specific coastal compound or discussing off-market representation, our private concierge is at your service.
          </p>
        </div>
      </section>

      {/* Main Content Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

          {/* Form Side (7 Cols) */}
          <div className="lg:col-span-7 bg-white p-8 sm:p-12 rounded-[36px] border border-stone-200/80 shadow-xl">

            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-16 text-center space-y-5"
              >
                <div className="w-20 h-20 rounded-full bg-[#C5A880]/20 text-[#C5A880] mx-auto flex items-center justify-center border border-[#C5A880] shadow-inner">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="font-serif text-3xl font-bold text-[#0E1013]">Inquiry Successfully Registered</h3>
                <p className="text-sm text-zinc-600 max-w-md mx-auto leading-relaxed font-light">
                  Thank you, <strong className="text-zinc-900 font-semibold">{formData.name}</strong>. A dedicated senior advisor will reach out to you at <strong className="text-zinc-900 font-semibold">{formData.phone}</strong> within 2 hours.
                </p>
                <div className="pt-4">
                  <button
                    onClick={() => {
                      setFormData({
                        name: '',
                        email: '',
                        phone: '',
                        property: ongoingProjects[0]?.id || '',
                        message: ''
                      });
                      setSubmitted(false);
                    }}
                    className="px-8 py-3 bg-[#0E1013] text-[#C5A880] border border-[#C5A880]/30 text-xs uppercase tracking-widest font-semibold rounded-full hover:bg-[#C5A880] hover:text-[#0E1013] transition-colors shadow-md"
                  >
                    Submit Another Query
                  </button>
                </div>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <span className="text-[10px] uppercase tracking-widest text-[#C5A880] font-semibold block">
                    Bespoke Advisory Form
                  </span>
                  <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#0E1013] mt-1">Send a Confidential Inquiry</h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold uppercase tracking-wider text-zinc-700 block mb-1.5">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Vikramaditya Rao"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-5 py-3.5 bg-[#FAF8F5] border border-stone-200/90 rounded-2xl text-sm text-[#0E1013] focus:outline-none focus:border-[#C5A880] transition-colors"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold uppercase tracking-wider text-zinc-700 block mb-1.5">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 98400 00000"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-5 py-3.5 bg-[#FAF8F5] border border-stone-200/90 rounded-2xl text-sm text-[#0E1013] focus:outline-none focus:border-[#C5A880] transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold uppercase tracking-wider text-zinc-700 block mb-1.5">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="vikram@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-5 py-3.5 bg-[#FAF8F5] border border-stone-200/90 rounded-2xl text-sm text-[#0E1013] focus:outline-none focus:border-[#C5A880] transition-colors"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold uppercase tracking-wider text-zinc-700 block mb-1.5">
                      Property Interested In
                    </label>
                    <select
                      value={formData.property}
                      onChange={(e) => setFormData({ ...formData, property: e.target.value })}
                      disabled={loadingProjects}
                      className="w-full px-5 py-3.5 bg-[#FAF8F5] border border-stone-200/90 rounded-2xl text-sm text-[#0E1013] focus:outline-none focus:border-[#C5A880] cursor-pointer transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      {loadingProjects ? (
                        <option value="">Loading ongoing projects...</option>
                      ) : ongoingProjects.length === 0 ? (
                        <option value="">No ongoing projects available</option>
                      ) : (
                        ongoingProjects.map((p) => (
                          <option key={p.id} value={p.id}>
                            {getProjectDetails(p).label}
                          </option>
                        ))
                      )}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold uppercase tracking-wider text-zinc-700 block mb-1.5">
                    Any doubt about the flat?
                  </label>
                  <textarea
                    rows="4"
                    required
                    placeholder="Ask anything...."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-5 py-3.5 bg-[#FAF8F5] border border-stone-200/90 rounded-2xl text-sm text-[#0E1013] focus:outline-none focus:border-[#C5A880] transition-colors"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 bg-[#0E1013] text-white text-xs font-semibold uppercase tracking-widest rounded-full hover:bg-[#C5A880] hover:text-[#0E1013] transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-lg border border-[#C5A880]/30"
                >
                  <Send className="w-4 h-4 text-[#C5A880]" />
                  <span>Submit Confidential Inquiry</span>
                </button>
              </form>
            )}

          </div>

          {/* Office Information & Map Side (5 Cols) */}
          <div className="lg:col-span-5 space-y-8">

            {/* Single Luxury Office Card */}
            <div className="bg-[#0E1013] text-white p-8 rounded-[32px] border border-[#C5A880]/30 shadow-xl space-y-5 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-[#C5A880]/15 via-transparent to-transparent pointer-events-none" />
              <span className="text-[10px] uppercase tracking-widest text-[#C5A880] font-semibold block">
                Headquarters & Advisory Lounge
              </span>
              <h4 className="font-serif text-2xl font-bold text-white">{office.name}</h4>

              <div className="space-y-3.5 text-xs text-zinc-300 font-light">
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-[#C5A880] shrink-0 mt-0.5" />
                  <span className="leading-relaxed">{office.address}</span>
                </div>

                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-[#C5A880] shrink-0" />
                  <a
                    href={`tel:${office.phone.replace(/\s+/g, '')}`}
                    className="hover:text-[#C5A880] transition-colors"
                  >
                    {office.phone}
                  </a>
                </div>

                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-[#C5A880] shrink-0" />
                  <a
                    href={`mailto:${office.email}`}
                    className="hover:text-[#C5A880] transition-colors"
                  >
                    {office.email}
                  </a>
                </div>

                <div className="flex items-center gap-3 pt-3 border-t border-white/10 text-[#C5A880] font-medium">
                  <Clock className="w-4 h-4 shrink-0" />
                  <span>{office.hours}</span>
                </div>
              </div>
            </div>

            {/* Real Google Maps Embed */}
            <div className="bg-white p-8 rounded-[32px] border border-stone-200/80 shadow-md space-y-4">
              <div>
                <span className="text-[10px] uppercase tracking-widest text-[#C5A880] font-semibold block">
                  VISIT OUR OFFICE
                </span>
                <h4 className="font-serif text-xl font-bold text-[#0E1013] mt-0.5">
                  Our Office Location
                </h4>
                <p className="text-xs text-zinc-500 font-light mt-1">
                  {office.address}
                </p>
              </div>

              <div className="relative aspect-[16/10] bg-stone-100 rounded-[24px] overflow-hidden border border-stone-200 shadow-inner">
                <iframe
                  title="Vetri Vel Real Estate Office Location"
                  src={office.embedUrl}
                  className="w-full h-full border-0"
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>

              <div className="pt-1 flex items-center justify-between">
                <span className="text-[11px] text-zinc-400 font-light">
                  Chembarambakkam, Chennai
                </span>
                <a
                  href={office.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#C5A880] hover:text-[#b5966c] uppercase tracking-wider transition-colors"
                >
                  <span>Open in Google Maps</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

          </div>

        </div>
      </div>

    </div>
  );
}

