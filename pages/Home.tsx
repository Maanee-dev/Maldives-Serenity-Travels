import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { RESORTS } from '../constants';
import ResortCard from '../components/ResortCard';

const Home: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/resorts?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  const featuredResorts = RESORTS.filter(r => r.isFeatured);

  return (
    <div className="animate-in fade-in duration-700">
      {/* Hero Section */}
      <section className="relative h-[95vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&q=80&w=2000" 
            alt="Maldives Hero" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/20 to-slate-50"></div>
        </div>

        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
          <span className="text-white/80 font-bold text-[10px] uppercase tracking-[0.5em] mb-6 inline-block drop-shadow-md">Since 2012 — Expert Curated Journeys</span>
          <h1 className="text-6xl md:text-9xl font-serif font-bold text-white mb-8 leading-tight drop-shadow-2xl">
            Pure <span className="text-sky-300 italic font-normal">Serenity</span>
          </h1>
          <p className="text-xl md:text-2xl text-white/95 mb-14 font-medium max-w-2xl mx-auto drop-shadow-lg leading-relaxed">
            From ultra-luxury private islands to authentic local sanctuaries. Your Maldivian dream, perfectly planned.
          </p>

          <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-3 bg-white/10 p-3 rounded-[2.5rem] backdrop-blur-2xl border border-white/20 shadow-2xl max-w-3xl mx-auto group focus-within:bg-white/20 transition-all">
            <div className="flex-grow flex items-center bg-white rounded-[2rem] px-8 py-5">
              <span className="text-slate-400 mr-4 text-xl">🏝️</span>
              <input 
                type="text" 
                placeholder="Find a resort, atoll or experience..." 
                className="w-full focus:outline-none text-slate-800 placeholder:text-slate-400 font-semibold"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <button type="submit" className="bg-sky-600 text-white font-bold px-12 py-5 rounded-[2rem] hover:bg-sky-700 transition-all shadow-xl text-xs tracking-[0.2em] uppercase">
              DISCOVER
            </button>
          </form>
          
          <div className="mt-16 flex justify-center">
             <a href="#expertise" className="animate-bounce text-white/60 hover:text-white transition-colors">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
             </a>
          </div>
        </div>
      </section>

      {/* Value Proposition */}
      <section id="expertise" className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
             <h2 className="text-xs font-bold text-sky-600 uppercase tracking-[0.4em] mb-4">The Serenity Standard</h2>
             <h3 className="text-4xl md:text-5xl font-serif font-bold text-slate-900 italic">Why discerning travelers choose us</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
            <div className="text-center p-4">
              <div className="text-5xl mb-8">🛩️</div>
              <h3 className="text-2xl font-serif font-bold text-slate-900 mb-4 italic">Bespoke Logistics</h3>
              <p className="text-slate-500 leading-relaxed font-medium">Seaplanes, speedboats, and domestic connections—we handle the complexity so your holiday starts at the airport.</p>
            </div>
            <div className="text-center p-4">
              <div className="text-5xl mb-8">💎</div>
              <h3 className="text-2xl font-serif font-bold text-slate-900 mb-4 italic">Exclusive Perks</h3>
              <p className="text-slate-500 leading-relaxed font-medium">Direct island partnerships mean our guests often receive room upgrades, spa credits, and complimentary dinners.</p>
            </div>
            <div className="text-center p-4">
              <div className="text-5xl mb-8">🐚</div>
              <h3 className="text-2xl font-serif font-bold text-slate-900 mb-4 italic">Local Heart</h3>
              <p className="text-slate-500 leading-relaxed font-medium">We are based in Malé. We don't just sell the Maldives; we live here. Experience the archipelago like an insider.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Stays */}
      <section id="featured" className="py-32 bg-slate-50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
            <div className="max-w-2xl">
              <span className="text-sky-600 font-bold text-[10px] uppercase tracking-[0.3em] mb-4 block">Seasonal Selection</span>
              <h2 className="text-5xl md:text-6xl font-serif font-bold text-slate-900 mb-6 italic">Signature Escapes</h2>
              <p className="text-slate-500 text-xl leading-relaxed font-medium max-w-xl">A hand-picked collection of properties that define Maldivian luxury and authentic hospitality.</p>
            </div>
            <Link to="/resorts" className="bg-sky-600 text-white font-bold px-10 py-4 rounded-2xl hover:bg-sky-700 transition-all text-xs uppercase tracking-[0.2em] shadow-xl">
              Browse All Stays
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {featuredResorts.map(resort => (
              <ResortCard key={resort.id} resort={resort} />
            ))}
          </div>
        </div>
      </section>

      {/* Experience Teaser */}
      <section className="relative h-[80vh] flex items-center">
         <div className="absolute inset-0">
            <img src="https://images.unsplash.com/photo-1590523741831-ab7e8b8f9c7f?auto=format&fit=crop&q=80&w=2000" className="w-full h-full object-cover" alt="Adventure" />
            <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-[2px]"></div>
         </div>
         <div className="relative z-10 max-w-7xl mx-auto px-4 w-full text-center md:text-left">
            <div className="max-w-xl bg-white/10 backdrop-blur-xl p-12 rounded-[3rem] border border-white/20 shadow-2xl">
               <span className="text-sky-300 font-bold text-[10px] uppercase tracking-[0.5em] mb-6 block">Beyond the Villa</span>
               <h3 className="text-4xl md:text-6xl font-serif font-bold text-white mb-8 italic">Into the Deep Blue.</h3>
               <p className="text-white/80 text-lg mb-10 leading-relaxed font-medium">
                  Swim with Whale Sharks, dine under the ocean, or find your own private sandbank. The Maldives is an adventure waiting to be written.
               </p>
               <Link to="/experiences" className="inline-block bg-white text-slate-900 font-bold px-10 py-4 rounded-2xl hover:bg-sky-400 hover:text-white transition-all text-xs uppercase tracking-[0.2em]">
                  View Experiences
               </Link>
            </div>
         </div>
      </section>

      {/* Final CTA */}
      <section id="cta" className="py-40 bg-slate-900 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-sky-500"></div>
        <div className="max-w-4xl mx-auto px-4 relative z-10 text-center">
          <h2 className="text-5xl md:text-8xl font-serif font-bold text-white mb-10 italic">Your Serenity Awaits.</h2>
          <p className="text-slate-400 mb-14 text-xl md:text-2xl leading-relaxed max-w-2xl mx-auto font-medium">
            No bots. No algorithms. Just local experts crafting your perfect Maldivian escape.
          </p>
          <div className="flex flex-col md:flex-row justify-center gap-6">
            <Link to="/plan" className="bg-sky-600 text-white px-16 py-6 rounded-[2rem] text-sm font-bold hover:bg-sky-700 transition-all shadow-2xl uppercase tracking-[0.3em]">
              Request a Bespoke Quote
            </Link>
            <a href="https://wa.me/9607771234" className="bg-white/5 backdrop-blur-md text-white border border-white/20 px-16 py-6 rounded-[2rem] text-sm font-bold hover:bg-white/10 transition-all uppercase tracking-[0.3em]">
               WhatsApp Us
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;