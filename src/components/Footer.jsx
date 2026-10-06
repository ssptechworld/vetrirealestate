import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Share2, Globe, Compass } from 'lucide-react';

export default function Footer() {
  const [subscribed, setSubscribed] = useState(false);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) return;

    const messageLines = [
      'New Private Journal Subscription',
      '',
      `Name: ${name.trim()}`,
      `Phone Number: ${phone.trim()}`,
      '',
      'I would like to receive private property and off-market estate updates.'
    ];

    const whatsappText = messageLines.join('\n');
    const whatsappUrl = `https://wa.me/919380005934?text=${encodeURIComponent(whatsappText)}`;

    window.open(whatsappUrl, '_blank');

    setName('');
    setPhone('');
    setSubscribed(true);
  };

  return (
    <footer className="bg-[#0E1013] text-zinc-400 border-t border-[#C5A880]/20 rounded-t-[48px] sm:rounded-t-[80px] pt-20 pb-12 shadow-2xl relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-[#C5A880]/10 via-transparent to-transparent pointer-events-none" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 pb-16 border-b border-white/10">

          {/* Col 1: Brand Info */}
          <div className="lg:col-span-2 flex flex-col space-y-6">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-10 h-10 border border-[#C5A880] flex items-center justify-center rounded-full bg-[#0E1013] shadow-md">
                <span className="text-[#C5A880] font-serif font-bold text-sm">V V</span>
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-xl font-bold tracking-[0.2em] text-white uppercase">
                  VETRI VEL
                </span>
                <span className="text-[9px] tracking-[0.25em] text-[#C5A880] uppercase -mt-1 font-semibold">
                  REAL ESTATE
                </span>
              </div>
            </Link>

            <p className="text-zinc-400 text-sm leading-relaxed max-w-sm font-light">
              Representing South India’s most distinctive luxury waterfront estates, urban penthouses, and heritage private sanctuaries. Bespoke curation with absolute discretion.
            </p>

            <div className="flex items-center space-x-4 pt-2">
              <a href="#global" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-zinc-300 hover:text-[#C5A880] hover:border-[#C5A880] transition-colors bg-white/5" title="Global Network">
                <Globe className="w-4 h-4" />
              </a>
              <a href="#explore" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-zinc-300 hover:text-[#C5A880] hover:border-[#C5A880] transition-colors bg-white/5" title="Explore Portfolio">
                <Compass className="w-4 h-4" />
              </a>
              <a href="#share" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-zinc-300 hover:text-[#C5A880] hover:border-[#C5A880] transition-colors bg-white/5" title="Share Estate Journal">
                <Share2 className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 2: Navigation */}
          <div>
            <h4 className="font-serif text-white text-base tracking-wider uppercase mb-5 border-b border-[#C5A880]/30 pb-2 inline-block">
              Navigation
            </h4>
            <ul className="space-y-3 text-sm font-light">
              <li>
                <Link to="/" className="hover:text-[#C5A880] transition-colors">Home Page</Link>
              </li>
              <li>
                <Link to="/properties" className="hover:text-[#C5A880] transition-colors">Exclusive Portfolio</Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-[#C5A880] transition-colors">Our Philosophy</Link>
              </li>
              <li>
                <Link to="/gallery" className="hover:text-[#C5A880] transition-colors">Project Gallery</Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-[#C5A880] transition-colors">Schedule Visit</Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Private Lounge & Newsletter */}
          <div>
            <h4 className="font-serif text-white text-base tracking-wider uppercase mb-5 border-b border-[#C5A880]/30 pb-2 inline-block">
              Private Journal
            </h4>
            <p className="text-xs text-zinc-400 mb-4 leading-relaxed font-light">
              Receive confidential off-market estate releases directly to your inbox.
            </p>

            {subscribed ? (
              <div className="p-4 bg-[#C5A880]/15 border border-[#C5A880] text-[#C5A880] text-xs rounded-2xl font-semibold">
                ✓ Thank you. We will contact you shortly.
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col space-y-3">
                <input
                  type="text"
                  required
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="px-4 py-3 bg-white/5 border border-white/15 rounded-full text-sm text-white focus:outline-none focus:border-[#C5A880] transition-colors"
                />
                <input
                  type="tel"
                  required
                  placeholder="Enter your phone number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="px-4 py-3 bg-white/5 border border-white/15 rounded-full text-sm text-white focus:outline-none focus:border-[#C5A880] transition-colors"
                />
                <button
                  type="submit"
                  className="px-5 py-3 bg-[#C5A880] text-[#0E1013] text-xs font-semibold uppercase tracking-widest rounded-full hover:bg-[#b5966c] transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-md"
                >
                  <span>Submit</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </form>
            )}
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-zinc-500 gap-4 font-light">
          <p>© {new Date().getFullYear()} Vetri Vel Real Estate Private Limited. All Rights Reserved.</p>
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
