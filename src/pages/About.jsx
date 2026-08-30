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
    <div className="min-h-screen bg-[#FAF8F5] pt-28 pb-24">
      
      {/* 1. HERO BANNER */}
      <section className="bg-[#121417] text-white py-20 border-b border-white/10 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <span className="text-xs uppercase tracking-widest text-[#C5A880] font-semibold block mb-3">
            Our Legacy & Story
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl font-bold tracking-tight max-w-4xl mx-auto">
            Architectural Excellence & Discrete Luxury
          </h1>
          <p className="text-stone-300 text-sm sm:text-base max-w-2xl mx-auto mt-6 leading-relaxed font-light">
            Founded on the principles of architectural integrity, uncompromised privacy, and bespoke advisory for South India’s finest estates.
          </p>
        </div>
      </section>

      {/* 2. COMPANY INTRODUCTION & STORY */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="space-y-6"
          >
            <span className="text-xs uppercase tracking-widest text-[#C5A880] font-semibold">
              The AURA Philosophy
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#121417]">
              Crafting Sanctuaries for Generations to Come
            </h2>
            
            <p className="text-zinc-700 text-sm leading-relaxed font-light">
              Since 2008, AURA Luxury Realty has served as South India’s premier estate advisory firm. We believe that true luxury real estate transcends square footage—it lies in the harmony between natural oceanfront topography, architectural light, and timeless materials.
            </p>

            <p className="text-zinc-700 text-sm leading-relaxed font-light">
              Our curated portfolio spans pristine beachfront compounds along East Coast Road, private heritage teak estates in Coimbatore, and high-security penthouses in Poes Garden and Boat Club.
            </p>

            {/* Mission & Vision grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-stone-200">
              <div>
                <h4 className="font-serif font-bold text-[#121417] text-base mb-1">Our Mission</h4>
                <p className="text-xs text-zinc-500 leading-relaxed">
                  To seamlessly connect discerning buyers with trophy architectural assets through transparent, highly confidential advisory.
                </p>
              </div>

              <div>
                <h4 className="font-serif font-bold text-[#121417] text-base mb-1">Our Vision</h4>
                <p className="text-xs text-zinc-500 leading-relaxed">
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
            <div className="aspect-[4/3] rounded-xs overflow-hidden border border-stone-300 shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=85"
                alt="Luxury Estate Architecture"
                className="w-full h-full object-cover"
              />
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
            className="text-center max-w-2xl mx-auto mb-16"
          >
            <span className="text-xs uppercase tracking-widest text-[#C5A880] font-semibold block mb-2">
              Our Core Pillars
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#121417]">
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
                  className="bg-white p-6 rounded-xs border border-stone-200/80 shadow-sm space-y-4 hover:shadow-lg transition-shadow"
                >
                  <div className="w-12 h-12 rounded-xs bg-[#FAF8F5] border border-[#C5A880]/30 text-[#C5A880] flex items-center justify-center">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-serif text-lg font-bold text-[#121417]">{v.title}</h3>
                  <p className="text-xs text-zinc-600 leading-relaxed">{v.description}</p>
                </motion.div>
              );
            })}
          </motion.div>

        </div>
      </section>

      {/* 5. ANIMATED COMPANY MILESTONES TIMELINE */}
      <section className="py-24 bg-[#121417] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="text-center max-w-2xl mx-auto mb-16"
          >
            <span className="text-xs uppercase tracking-widest text-[#C5A880] font-semibold block mb-2">
              18+ Years Journey
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold">
              Our Journey of Milestones
            </h2>
            <p className="text-zinc-400 text-sm mt-3 font-light">
              Key moments that shaped AURA into South India's premier luxury estate advisory.
            </p>
          </motion.div>

          <Timeline />

        </div>
      </section>

    </div>
  );
}
