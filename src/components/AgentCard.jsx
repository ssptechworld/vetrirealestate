import React from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, MessageSquare, Award, Building2 } from 'lucide-react';
import { fadeUp } from '../utils/animations';

export default function AgentCard({ agent, onContactClick }) {
  const whatsappUrl = `https://wa.me/${agent.whatsapp}?text=${encodeURIComponent(
    `Hello ${agent.name}, I am interested in inquiring about exclusive luxury properties with AURA Realty.`
  )}`;

  return (
    <motion.div
      variants={fadeUp}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.4 }}
      className="bg-white rounded-xs border border-stone-200/80 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col group"
    >
      {/* Agent Photo */}
      <div className="relative aspect-[4/3] overflow-hidden bg-stone-100">
        <img
          src={agent.image}
          alt={agent.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />

        <div className="absolute bottom-4 left-4 right-4 text-white">
          <span className="text-[10px] uppercase tracking-widest text-[#C5A880] font-semibold block">
            {agent.specialization}
          </span>
          <h3 className="font-serif text-xl font-bold">{agent.name}</h3>
        </div>
      </div>

      {/* Body Info */}
      <div className="p-6 flex flex-col flex-grow justify-between space-y-6">
        <div className="space-y-4">
          <p className="text-xs text-zinc-500 font-medium tracking-wider uppercase">
            {agent.title}
          </p>

          <p className="text-xs text-zinc-600 leading-relaxed">
            {agent.bio}
          </p>

          {/* Stats Bar */}
          <div className="grid grid-cols-2 gap-2 pt-2 text-xs border-t border-stone-100">
            <div className="flex items-center gap-2">
              <Award className="w-4 h-4 text-[#C5A880]" />
              <span className="text-zinc-700 font-semibold">{agent.experience}</span>
            </div>
            <div className="flex items-center gap-2">
              <Building2 className="w-4 h-4 text-[#C5A880]" />
              <span className="text-zinc-700 font-semibold">{agent.propertiesHandled}</span>
            </div>
          </div>
        </div>

        {/* Contact Action Buttons */}
        <div className="grid grid-cols-2 gap-3 pt-2">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="py-2.5 px-3 bg-[#25D366]/10 border border-[#25D366]/30 text-[#128C7E] hover:bg-[#25D366] hover:text-white text-xs font-semibold uppercase tracking-wider rounded-xs transition-colors flex items-center justify-center gap-1.5"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>WhatsApp</span>
          </a>

          <button
            onClick={() => onContactClick ? onContactClick(agent) : window.location.href = `mailto:${agent.email}`}
            className="py-2.5 px-3 bg-[#121417] text-white hover:bg-[#C5A880] hover:text-[#121417] text-xs font-semibold uppercase tracking-wider rounded-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <Mail className="w-3.5 h-3.5" />
            <span>Contact Agent</span>
          </button>
        </div>

      </div>
    </motion.div>
  );
}
