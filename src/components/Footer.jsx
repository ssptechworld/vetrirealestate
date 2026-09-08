import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, ArrowRight, Share2, Globe, Compass } from 'lucide-react';

export default function Footer() {
  const [subscribed, setSubscribed] = useState(false);
  const [email, setEmail] = useState('');

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer className="bg-[#0E1012] text-zinc-400 border-t border-white/10 pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 pb-16 border-b border-white/10">
          
          {/* Col 1: Brand Info */}
          <div className="lg:col-span-2 flex flex-col space-y-6">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-8 h-8 border border-[#C5A880] flex items-center justify-center rounded-sm">
                <span className="text-[#C5A880] font-serif font-bold text-base">V V</span>
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-xl font-bold tracking-[0.2em] text-white uppercase">
                  VETRI VEL
                </span>
                <span className="text-[9px] tracking-[0.25em] text-[#C5A880] uppercase -mt-1 font-medium">
                  REAL ESTATE
                </span>
              </div>
            </Link>

            <p className="text-zinc-400 text-sm leading-relaxed max-w-sm">
              Representing South India’s most distinctive luxury waterfront estates, urban penthouses, and heritage private sanctuaries. Bespoke curation with absolute discretion.
            </p>

            <div className="flex items-center space-x-4 pt-2">
              <a href="#global" className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center text-zinc-300 hover:text-[#C5A880] hover:border-[#C5A880] transition-colors" title="Global Network">
                <Globe className="w-4 h-4" />
              </a>
              <a href="#explore" className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center text-zinc-300 hover:text-[#C5A880] hover:border-[#C5A880] transition-colors" title="Explore Portfolio">
                <Compass className="w-4 h-4" />
              </a>
              <a href="#share" className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center text-zinc-300 hover:text-[#C5A880] hover:border-[#C5A880] transition-colors" title="Share Estate Journal">
                <Share2 className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 2: Navigation */}
          <div>
            <h4 className="font-serif text-white text-base tracking-wider uppercase mb-5 border-b border-[#C5A880]/30 pb-2 inline-block">
              Navigation
            </h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link to="/" className="hover:text-white transition-colors">Home Page</Link>
              </li>
              <li>
                <Link to="/properties" className="hover:text-white transition-colors">Exclusive Portfolio</Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-white transition-colors">Our Philosophy</Link>
              </li>
              <li>
                <Link to="/agents" className="hover:text-white transition-colors">Private Advisors</Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-white transition-colors">Schedule Visit</Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Prime Locations */}
          <div>
            <h4 className="font-serif text-white text-base tracking-wider uppercase mb-5 border-b border-[#C5A880]/30 pb-2 inline-block">
              Prime Sanctuaries
            </h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link to="/properties?location=ECR+Seaside" className="hover:text-white transition-colors">East Coast Road (ECR)</Link>
              </li>
              <li>
                <Link to="/properties?location=Boat+Club+%2F+Adyar" className="hover:text-white transition-colors">Boat Club, Adyar</Link>
              </li>
              <li>
                <Link to="/properties?location=Anna+Nagar" className="hover:text-white transition-colors">Anna Nagar Boulevard</Link>
              </li>
              <li>
                <Link to="/properties?location=Mahabalipuram+Coast" className="hover:text-white transition-colors">Mahabalipuram Coast</Link>
              </li>
              <li>
                <Link to="/properties?location=Poes+Garden" className="hover:text-white transition-colors">Poes Garden Enclave</Link>
              </li>
              <li>
                <Link to="/properties?location=Coimbatore+Central" className="hover:text-white transition-colors">Race Course, Coimbatore</Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Private Lounge & Newsletter */}
          <div>
            <h4 className="font-serif text-white text-base tracking-wider uppercase mb-5 border-b border-[#C5A880]/30 pb-2 inline-block">
              Private Journal
            </h4>
            <p className="text-xs text-zinc-400 mb-4 leading-relaxed">
              Receive confidential off-market estate releases directly to your inbox.
            </p>

            {subscribed ? (
              <div className="p-3 bg-[#C5A880]/10 border border-[#C5A880] text-[#C5A880] text-xs rounded-xs">
                ✓ Thank you. You are subscribed to off-market previews.
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col space-y-3">
                <input
                  type="email"
                  required
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="px-3.5 py-2.5 bg-white/5 border border-white/10 rounded-xs text-sm text-white focus:outline-none focus:border-[#C5A880]"
                />
                <button
                  type="submit"
                  className="px-4 py-2.5 bg-[#C5A880] text-[#121417] text-xs font-semibold uppercase tracking-widest rounded-xs hover:bg-[#b5966c] transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Subscribe</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </form>
            )}
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-zinc-500 gap-4">
          <p>© {new Date().getFullYear()} AURA Luxury Realty Private Limited. All Rights Reserved.</p>
          <div className="flex items-center space-x-6">
            <a href="#privacy" className="hover:text-zinc-300 transition-colors">Privacy Policy</a>
            <a href="#terms" className="hover:text-zinc-300 transition-colors">Terms of Representation</a>
            <a href="#disclaimer" className="hover:text-zinc-300 transition-colors">Disclosures</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
