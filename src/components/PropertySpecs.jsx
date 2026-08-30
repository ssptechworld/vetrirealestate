import React from 'react';
import { Bed, Bath, Maximize2, Car, Calendar, Home, CheckCircle2 } from 'lucide-react';

export default function PropertySpecs({ property }) {
  const specs = [
    { label: 'Bedrooms', value: `${property.bedrooms} Master Suites`, icon: Bed },
    { label: 'Bathrooms', value: `${property.bathrooms} Designer Baths`, icon: Bath },
    { label: 'Total Area', value: `${property.sqft.toLocaleString()} sq.ft`, icon: Maximize2 },
    { label: 'Parking Spaces', value: `${property.parking} Garage Bays`, icon: Car },
    { label: 'Year Built', value: property.yearBuilt, icon: Calendar },
    { label: 'Property Type', value: property.propertyType, icon: Home },
  ];

  return (
    <div className="bg-white p-6 rounded-xs border border-stone-200/80 shadow-sm space-y-6">
      <h3 className="font-serif text-xl font-bold text-[#121417] border-b border-stone-200 pb-3">
        Property Specifications
      </h3>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
        {specs.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div key={idx} className="flex items-start gap-3">
              <div className="p-2.5 bg-[#FAF8F5] border border-stone-200/80 rounded-xs text-[#C5A880] shrink-0">
                <Icon className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[11px] font-semibold tracking-wider text-zinc-400 uppercase block">
                  {item.label}
                </span>
                <span className="text-sm font-semibold text-[#121417] mt-0.5 block">
                  {item.value}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {property.furnishing && (
        <div className="pt-4 border-t border-stone-100 flex items-center gap-2 text-xs text-zinc-600">
          <CheckCircle2 className="w-4 h-4 text-[#C5A880]" />
          <span><strong className="text-zinc-800">Furnishing:</strong> {property.furnishing}</span>
        </div>
      )}
    </div>
  );
}
