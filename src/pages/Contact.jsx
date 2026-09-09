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
      email: "concierge@vetrivelrealestate.com",
      hours: "Mon – Sat: 9:00 AM – 7:00 PM"
    },
    {
      city: "ECR Coastal Lounge",
      address: "Mile 12, East Coast Road, Covelong Bay, Chennai - 603112",
      phone: "+91 44 2747 8800",
      email: "ecr@vetrivelrealestate.com",
      hours: "Mon – Sun: 10:00 AM – 6:00 PM"
    }
  ];

  return (
    <div className="min-h-screen bg-[#FAF8F5] pt-28 pb-24">
      
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
                    onClick={() => setSubmitted(false)}
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
                      className="w-full px-5 py-3.5 bg-[#FAF8F5] border border-stone-200/90 rounded-2xl text-sm text-[#0E1013] focus:outline-none focus:border-[#C5A880] cursor-pointer transition-colors"
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

          {/* Office Information Side (5 Cols) */}
          <div className="lg:col-span-5 space-y-8">
            
            {offices.map((office, idx) => (
              <div key={idx} className="bg-[#0E1013] text-white p-8 rounded-[32px] border border-[#C5A880]/30 shadow-xl space-y-5 relative overflow-hidden">
                <span className="text-[10px] uppercase tracking-widest text-[#C5A880] font-semibold block">
                  Private Lounge location
                </span>
                <h4 className="font-serif text-2xl font-bold text-white">{office.city}</h4>

                <div className="space-y-3.5 text-xs text-zinc-300 font-light">
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

                  <div className="flex items-center gap-3 pt-3 border-t border-white/10 text-[#C5A880] font-medium">
                    <Clock className="w-4 h-4 shrink-0" />
                    <span>{office.hours}</span>
                  </div>
                </div>
              </div>
            ))}

            {/* Interactive Map Visual Mockup */}
            <div className="bg-white p-8 rounded-[32px] border border-stone-200/80 shadow-md space-y-4">
              <span className="text-[10px] uppercase tracking-widest text-[#C5A880] font-semibold block">
                Flagship Location Map
              </span>
              <div className="relative aspect-[16/9] bg-stone-900 rounded-[24px] overflow-hidden border border-stone-300 shadow-inner">
                <img
                  src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=800&q=85"
                  alt="City Map Location"
                  className="w-full h-full object-cover opacity-60"
                />
                <div className="absolute inset-0 flex items-center justify-center p-4">
                  <div className="px-5 py-3 bg-[#0E1013]/90 text-white text-xs font-serif font-bold rounded-full border border-[#C5A880] flex items-center gap-2 shadow-2xl backdrop-blur-sm">
                    <MapPin className="w-4 h-4 text-[#C5A880]" />
                    <span>Vetri Vel Flagship Lounge, RA Puram</span>
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

