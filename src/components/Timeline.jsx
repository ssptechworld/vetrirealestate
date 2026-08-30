import React from 'react';
import { motion } from 'framer-motion';
import { TIMELINE_DATA } from '../data/timeline';
import { fadeUp, staggerContainer } from '../utils/animations';

export default function Timeline() {
  return (
    <div className="relative max-w-4xl mx-auto py-8">
      {/* Central Line */}
      <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-[#C5A880]/30 -translate-x-1/2 hidden md:block" />

      <motion.div
        variants={staggerContainer(0.2, 0.1)}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        className="space-y-12"
      >
        {TIMELINE_DATA.map((item, idx) => {
          const isEven = idx % 2 === 0;
          return (
            <motion.div
              key={item.year}
              variants={fadeUp}
              className={`relative flex flex-col md:flex-row items-center ${
                isEven ? 'md:flex-row-reverse' : ''
              }`}
            >
              {/* Timeline Center Dot */}
              <div className="absolute left-4 md:left-1/2 w-4 h-4 rounded-full bg-[#C5A880] border-4 border-[#FAF8F5] shadow-md -translate-x-1/2 z-10 hidden md:block" />

              {/* Content Box */}
              <div className={`w-full md:w-1/2 ${isEven ? 'md:pl-12' : 'md:pr-12'}`}>
                <div className="bg-white p-6 rounded-xs border border-stone-200/80 shadow-sm hover:shadow-md transition-shadow">
                  <span className="inline-block px-3 py-1 bg-[#121417] text-[#C5A880] text-xs font-serif font-bold tracking-widest uppercase mb-3 rounded-xs">
                    {item.year}
                  </span>
                  <h4 className="font-serif text-lg font-bold text-[#121417] mb-2">
                    {item.title}
                  </h4>
                  <p className="text-xs text-zinc-600 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>

            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
}
