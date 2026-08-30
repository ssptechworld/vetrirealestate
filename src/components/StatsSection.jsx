import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView, animate } from 'framer-motion';
import { STATS_DATA } from '../data/stats';
import { fadeUp, staggerContainer } from '../utils/animations';

function CounterNumber({ targetValue, suffix = "" }) {
  const [currentValue, setCurrentValue] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (isInView) {
      const controls = animate(0, targetValue, {
        duration: 2.2,
        ease: [0.25, 0.1, 0.25, 1.0],
        onUpdate: (latest) => {
          setCurrentValue(Math.floor(latest));
        }
      });
      return () => controls.stop();
    }
  }, [isInView, targetValue]);

  return (
    <span ref={ref} className="font-serif font-bold text-3xl sm:text-4xl lg:text-5xl text-[#C5A880]">
      {currentValue.toLocaleString()}{suffix}
    </span>
  );
}

export default function StatsSection({ dark = true }) {
  return (
    <section className={`py-16 sm:py-24 border-y border-white/10 ${dark ? 'bg-[#121417] text-white' : 'bg-white text-[#121417]'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <motion.div
          variants={staggerContainer(0.15, 0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12"
        >
          {STATS_DATA.map((stat) => (
            <motion.div
              key={stat.id}
              variants={fadeUp}
              className="flex flex-col space-y-2 border-l-2 border-[#C5A880]/40 pl-6"
            >
              <CounterNumber targetValue={stat.numericValue} suffix={stat.suffix} />
              
              <h4 className={`font-serif text-base font-semibold ${dark ? 'text-zinc-200' : 'text-zinc-800'}`}>
                {stat.label}
              </h4>
              
              <p className={`text-xs ${dark ? 'text-zinc-400' : 'text-zinc-500'}`}>
                {stat.subtext}
              </p>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
