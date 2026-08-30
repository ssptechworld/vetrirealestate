import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2, Shield } from 'lucide-react';
import { PROPERTIES_DATA } from '../data/properties';
import { fadeUp } from '../utils/animations';

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    property: PROPERTIES_DATA[0].title,
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const offices = [
    {
      city: "Boat Club Flagship Lounge",
      address: "No. 14 Boat Club Road, RA Puram, Chennai - 600028",
      phone: "+91 44 2435 9000",
      email: "concierge@auraluxuryrealty.com",
      hours: "Mon – Sat: 9:00 AM – 7:00 PM"
    },
    {
      city: "ECR Coastal Lounge",
      address: "Mile 12, East Coast Road, Covelong Bay, Chennai - 603112",
      phone: "+91 44 2747 8800",
      email: "ecr@auraluxuryrealty.com",
      hours: "Mon – Sun: 10:00 AM – 6:00 PM"
    }
  ];

  return (
    <div className="min-h-screen bg-[#FAF8F5] pt-28 pb-24">
      
      {/* Header Banner */}
      <section className="bg-[#121417] text-white py-16 mb-16 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-xs uppercase tracking-widest text-[#C5A880] font-semibold block mb-2">
            Private Consultation
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold tracking-tight">
            Connect With Our Advisory Lounge
          </h1>
          <p className="text-zinc-400 text-sm max-w-xl mx-auto mt-3 font-light">
            Whether inquiring about a specific coastal compound or discussing off-market representation, our private concierge is at your service.
          </p>
        </div>
      </section>

      {/* Main Content Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Form Side (7 Cols) */}
          <div className="lg:col-span-7 bg-white p-8 sm:p-10 rounded-xs border border-stone-200/80 shadow-md">
            
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-16 text-center space-y-4"
              >
                <div className="w-16 h-16 rounded-full bg-[#C5A880]/20 text-[#C5A880] mx-auto flex items-center justify-center border border-[#C5A880]">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="font-serif text-2xl font-bold text-[#121417]">Inquiry Successfully Registered</h3>
                <p className="text-sm text-zinc-600 max-w-md mx-auto leading-relaxed">
                  Thank you, <strong className="text-zinc-900">{formData.name}</strong>. A dedicated senior advisor will reach out to you at <strong className="text-zinc-900">{formData.phone}</strong> within 2 hours.
                </p>
                <div className="pt-4">
                  <button
                    onClick={() => setSubmitted(false)}
                    className="px-6 py-2.5 bg-[#121417] text-white text-xs uppercase tracking-widest font-semibold rounded-xs"
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
                  <h3 className="font-serif text-2xl font-bold text-[#121417] mt-1">Send a Confidential Inquiry</h3>
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
                      className="w-full px-4 py-3 bg-[#FAF8F5] border border-stone-200 rounded-xs text-sm text-[#121417] focus:outline-none focus:border-[#C5A880]"
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
                      className="w-full px-4 py-3 bg-[#FAF8F5] border border-stone-200 rounded-xs text-sm text-[#121417] focus:outline-none focus:border-[#C5A880]"
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
                      className="w-full px-4 py-3 bg-[#FAF8F5] border border-stone-200 rounded-xs text-sm text-[#121417] focus:outline-none focus:border-[#C5A880]"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold uppercase tracking-wider text-zinc-700 block mb-1.5">
                      Property Interested In
                    </label>
                    <select
                      value={formData.property}
                      onChange={(e) => setFormData({ ...formData, property: e.target.value })}
                      className="w-full px-4 py-3 bg-[#FAF8F5] border border-stone-200 rounded-xs text-sm text-[#121417] focus:outline-none focus:border-[#C5A880] cursor-pointer"
                    >
                      {PROPERTIES_DATA.map((p) => (
                        <option key={p.id} value={p.title}>
                          {p.title} ({p.formattedPrice})
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold uppercase tracking-wider text-zinc-700 block mb-1.5">
                    Your Message or Special Requirements
                  </label>
                  <textarea
                    rows="4"
                    required
                    placeholder="Provide details about your preferred move timeline, location preferences, or off-market search criteria..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 bg-[#FAF8F5] border border-stone-200 rounded-xs text-sm text-[#121417] focus:outline-none focus:border-[#C5A880]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 bg-[#121417] text-white text-xs font-semibold uppercase tracking-widest rounded-xs hover:bg-[#C5A880] hover:text-[#121417] transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-lg"
                >
                  <Send className="w-4 h-4" />
                  <span>Submit Confidential Inquiry</span>
                </button>
              </form>
            )}

          </div>

          {/* Office Information Side (5 Cols) */}
          <div className="lg:col-span-5 space-y-8">
            
            {offices.map((office, idx) => (
              <div key={idx} className="bg-[#121417] text-white p-6 sm:p-8 rounded-xs border border-white/10 shadow-lg space-y-4">
                <span className="text-[10px] uppercase tracking-widest text-[#C5A880] font-semibold block">
                  Private Lounge location
                </span>
                <h4 className="font-serif text-xl font-bold">{office.city}</h4>

                <div className="space-y-3 text-xs text-zinc-300 font-light">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-4 h-4 text-[#C5A880] shrink-0 mt-0.5" />
                    <span>{office.address}</span>
                  </div>

                  <div className="flex items-center gap-3">
                    <Phone className="w-4 h-4 text-[#C5A880] shrink-0" />
                    <span>{office.phone}</span>
                  </div>

                  <div className="flex items-center gap-3">
                    <Mail className="w-4 h-4 text-[#C5A880] shrink-0" />
                    <span>{office.email}</span>
                  </div>

                  <div className="flex items-center gap-3 pt-2 border-t border-white/10 text-[#C5A880]">
                    <Clock className="w-4 h-4 shrink-0" />
                    <span>{office.hours}</span>
                  </div>
                </div>
              </div>
            ))}

            {/* Interactive Map Visual Mockup */}
            <div className="bg-white p-6 rounded-xs border border-stone-200/80 shadow-md space-y-3">
              <span className="text-[10px] uppercase tracking-widest text-[#C5A880] font-semibold block">
                Flagship Location Map
              </span>
              <div className="relative aspect-[16/9] bg-stone-900 rounded-xs overflow-hidden border border-stone-300">
                <img
                  src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=800&q=85"
                  alt="City Map Location"
                  className="w-full h-full object-cover opacity-60"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="px-4 py-2 bg-[#121417]/90 text-white text-xs font-serif font-bold rounded-xs border border-[#C5A880] flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-[#C5A880]" />
                    <span>AURA Flagship Lounge, RA Puram</span>
                  </div>
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>

    </div>
  );
}
