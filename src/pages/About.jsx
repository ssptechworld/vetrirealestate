import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Compass, Eye, Award, Sparkles, Building2 } from 'lucide-react';
import StatsSection from '../components/StatsSection';
import Timeline from '../components/Timeline';
import { fadeUp, staggerContainer } from '../utils/animations';

export default function About() {
  const values = [
    {
      icon: ShieldCheck,
      title: "Absolute Discretion",
      description: "Representing diplomatic missions, founders, and family offices with non-disclosure representation."
    },
    {
      icon: Compass,
      title: "Architectural Curation",
      description: "We represent only structurally sound, aesthetically supreme residences designed by premier architects."
    },
    {
      icon: Eye,
      title: "Uncompromised Vision",
      description: "Curating spaces that preserve heritage teak craftsmanship while incorporating state-of-the-art solar energy."
    },
    {
      icon: Award,
      title: "Bespoke Concierge",
      description: "End-to-end legal title verification, architectural audit, and confidential transaction structuring."
    }
  ];

  return (
    <div className="min-h-screen bg-[#FAF8F5]/80 backdrop-blur-xs pt-28 pb-24">
      
      {/* 1. HERO BANNER */}
      <section className="bg-[#0E1013] text-white pt-20 pb-24 border-b border-[#C5A880]/20 relative overflow-hidden rounded-b-[48px] sm:rounded-b-[80px] shadow-2xl">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#C5A880]/15 via-transparent to-transparent pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-4">
          <span className="px-4 py-1.5 rounded-full bg-[#C5A880]/15 border border-[#C5A880]/30 text-[#C5A880] text-xs font-semibold uppercase tracking-widest inline-block">
            Our Legacy & Story
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl font-bold tracking-tight max-w-4xl mx-auto text-white leading-tight">
            Architectural Excellence & Discrete Luxury
          </h1>
          <p className="text-stone-300 text-sm sm:text-base max-w-2xl mx-auto mt-4 leading-relaxed font-light">
            Founded on the principles of architectural integrity, uncompromised privacy, and bespoke advisory for South India’s finest estates.
          </p>
        </div>
      </section>

      {/* 2. COMPANY INTRODUCTION & STORY */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="space-y-6"
          >
            <span className="text-xs uppercase tracking-widest text-[#C5A880] font-semibold">
              The Vetri Vel Philosophy
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#0E1013]">
              Crafting Sanctuaries for Generations to Come
            </h2>
            
            <p className="text-zinc-700 text-sm sm:text-base leading-relaxed font-light">
              Since 2008, Vetri Vel Real Estate has served as South India’s premier construction & estate development brand. We believe that true real estate excellence lies in structural integrity, Vastu alignment, and timeless craftsmanship.
            </p>

            <p className="text-zinc-700 text-sm leading-relaxed font-light">
              Our curated portfolio spans pristine beachfront compounds along East Coast Road, private heritage teak estates in Coimbatore, and high-security penthouses in Poes Garden and Boat Club.
            </p>

            {/* Mission & Vision grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-6 border-t border-stone-200">
              <div className="bg-white p-6 rounded-[24px] border border-stone-200/80 shadow-sm space-y-2">
                <h4 className="font-serif font-bold text-[#0E1013] text-base">Our Mission</h4>
                <p className="text-xs text-zinc-500 leading-relaxed font-light">
                  To seamlessly connect discerning buyers with trophy architectural assets through transparent, highly confidential advisory.
                </p>
              </div>

              <div className="bg-white p-6 rounded-[24px] border border-stone-200/80 shadow-sm space-y-2">
                <h4 className="font-serif font-bold text-[#0E1013] text-base">Our Vision</h4>
                <p className="text-xs text-zinc-500 leading-relaxed font-light">
                  To remain South India’s benchmark for luxury real estate curation, setting the standard in tropical modernist living.
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="relative"
          >
            <div className="aspect-[4/5] sm:aspect-[4/3] rounded-t-[140px] sm:rounded-t-[220px] rounded-b-[36px] overflow-hidden border border-[#C5A880]/30 shadow-2xl relative group">
              <img
                src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=85"
                alt="Luxury Estate Architecture"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0E1013]/60 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-[#0E1013]/80 backdrop-blur-md border border-[#C5A880]/30 text-white text-xs">
                <span className="text-[#C5A880] font-semibold block uppercase tracking-widest text-[10px]">Architectural Blueprint</span>
                Vetri Vel Estate Flagship Residence
              </div>
            </div>
          </motion.div>

        </div>
      </section>

      {/* 3. ANIMATED STATISTICS COUNTER */}
      <StatsSection dark={true} />

      {/* 4. COMPANY CORE VALUES */}
      <section className="py-24 bg-[#FAF8F5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="text-center max-w-2xl mx-auto mb-16 space-y-3"
          >
            <span className="text-xs uppercase tracking-widest text-[#C5A880] font-semibold block">
              Our Core Pillars
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#0E1013]">
              Guided by Integrity & Mastery
            </h2>
          </motion.div>

          <motion.div
            variants={staggerContainer(0.12, 0.1)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {values.map((v, i) => {
              const Icon = v.icon;
              return (
                <motion.div
                  key={i}
                  variants={fadeUp}
                  className="bg-white p-8 rounded-[32px] border border-stone-200/80 shadow-md space-y-5 hover:shadow-xl transition-all hover:-translate-y-1.5"
                >
                  <div className="w-14 h-14 rounded-full bg-[#0E1013] border border-[#C5A880]/40 text-[#C5A880] flex items-center justify-center shadow-md">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-serif text-xl font-bold text-[#0E1013]">{v.title}</h3>
                  <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed font-light">{v.description}</p>
                </motion.div>
              );
            })}
          </motion.div>

        </div>
      </section>

      {/* 5. ANIMATED COMPANY MILESTONES TIMELINE */}
      <section className="py-24 bg-[#0E1013] text-white relative overflow-hidden rounded-t-[48px] sm:rounded-t-[80px] border-t border-[#C5A880]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="text-center max-w-2xl mx-auto mb-16 space-y-3"
          >
            <span className="text-xs uppercase tracking-widest text-[#C5A880] font-semibold block">
              18+ Years Journey
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white">
              Our Journey of Milestones
            </h2>
            <p className="text-zinc-400 text-sm font-light">
              Key moments that shaped Vetri Vel into South India's premier real estate & development brand.
            </p>
          </motion.div>

          <Timeline />

        </div>
      </section>

    </div>
  );
}

