import React from 'react';
import { Check } from 'lucide-react';

export default function AmenitiesList({ amenities = [] }) {
  if (amenities.length === 0) return null;

  return (
    <div className="bg-white p-6 rounded-xs border border-stone-200/80 shadow-sm space-y-6">
      <h3 className="font-serif text-xl font-bold text-[#121417] border-b border-stone-200 pb-3">
        Features & Bespoke Amenities
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {amenities.map((item, idx) => (
          <div key={idx} className="flex items-center gap-3 p-3 bg-[#FAF8F5] border border-stone-200/60 rounded-xs">
            <div className="w-5 h-5 rounded-full bg-[#C5A880]/20 text-[#C5A880] flex items-center justify-center shrink-0">
              <Check className="w-3.5 h-3.5 stroke-[3]" />
            </div>
            <span className="text-xs font-semibold text-zinc-800">{item}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
