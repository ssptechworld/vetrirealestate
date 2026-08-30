import React from 'react';
import { motion } from 'framer-motion';
import AgentCard from '../components/AgentCard';
import { AGENTS_DATA } from '../data/agents';
import { fadeUp, staggerContainer } from '../utils/animations';

export default function Agents({ onOpenInquiryModal }) {
  return (
    <div className="min-h-screen bg-[#FAF8F5] pt-28 pb-24">
      
      {/* Page Header */}
      <section className="bg-[#121417] text-white py-16 mb-16 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-xs uppercase tracking-widest text-[#C5A880] font-semibold block mb-2">
            Private Representation
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold tracking-tight">
            Our Senior Private Advisors
          </h1>
          <p className="text-zinc-400 text-sm max-w-xl mx-auto mt-3 font-light">
            Seasoned real estate partners with decades of combined representation experience in coastal estates, urban sky penthouses, and off-market confidential transactions.
          </p>
        </div>
      </section>

      {/* Agents Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <motion.div
          variants={staggerContainer(0.15, 0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {AGENTS_DATA.map((agent) => (
            <AgentCard
              key={agent.id}
              agent={agent}
              onContactClick={() => onOpenInquiryModal ? onOpenInquiryModal() : window.location.href = `mailto:${agent.email}`}
            />
          ))}
        </motion.div>

        {/* Private Representation Guarantee Banner */}
        <div className="mt-20 bg-white p-8 rounded-xs border border-stone-200/80 shadow-md text-center max-w-3xl mx-auto space-y-4">
          <span className="text-[11px] uppercase tracking-widest text-[#C5A880] font-bold block">
            Confidential Off-Market Representation
          </span>
          <h3 className="font-serif text-2xl font-bold text-[#121417]">
            Seeking Confidential Non-Public Representation?
          </h3>
          <p className="text-xs text-zinc-600 leading-relaxed max-w-lg mx-auto">
            Over 35% of our represented trophy estates are handled off-market. Contact our Senior Partner for discrete private representation under strict confidentiality agreements.
          </p>
          <div className="pt-2">
            <button
              onClick={() => onOpenInquiryModal ? onOpenInquiryModal() : null}
              className="px-6 py-3 bg-[#121417] text-white text-xs font-semibold uppercase tracking-widest rounded-xs hover:bg-[#C5A880] hover:text-[#121417] transition-colors cursor-pointer"
            >
              Request Off-Market Brief
            </button>
          </div>
        </div>

      </div>

    </div>
  );
}
