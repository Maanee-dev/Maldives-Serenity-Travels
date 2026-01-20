import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { RESORTS } from '../constants';
import ResortCard from '../components/ResortCard';

const Home: React.FC = () => {
  const featuredResorts = RESORTS.slice(0, 3);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="bg-[#FCFAF7]">
      {/* Hero Section */}
      <section className="pt-56 pb-32 px-4 relative overflow-hidden">
        {/* Subtle background light leaks */}
        <div className="absolute top-20 right-[-10%] w-[500px] h-[500px] bg-sky-400/5 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-40 left-[-10%] w-[500px] h-[500px] bg-amber-400/5 blur-[120px] rounded-full"></div>

        <div className="max-w-7xl mx-auto text-center reveal">
          <span className="text-[10px] font-bold uppercase tracking-[0.6em] text-amber-500 mb-8 block">Maldivian Sun & Sea</span>
          <h1 className="text-6xl md:text-8xl lg:text-[7.5rem] font-serif font-bold text-slate-900 mb-12 leading-[0.95] tracking-tighter italic">
            Where Nature <br /> Embraces <span className="text-sky-500 not-italic">Luxury</span>
          </h1>
          <div className="flex flex-col items-center mt-20">
            <span className="text-[9px] font-bold uppercase tracking-[0.4em] text-slate-400 mb-8">Scroll to Begin</span>
            <div className="w-px h-24 bg-gradient-to-b from-slate-900 via-sky-500 to-amber-500"></div>
          </div>
        </div>

        {/* Asymmetric Image Grid */}
        <div className="max-w-[1400px] mx-auto mt-40 grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-16 px-6 lg:px-12">
          <div className="md:col-span-4 h-[500px] lg:h-[750px] reveal rounded-[4rem] overflow-hidden shadow-2xl">
            <img 
              src="https://images.unsplash.com/photo-1544550581-5f7ceaf7f992?auto=format&fit=crop&q=80&w=1200" 
              className="w-full h-full object-cover grayscale-[0.2] hover:grayscale-0 transition-all duration-[2s]" 
              alt="Luxury" 
            />
          </div>
          <div className="md:col-span-5 h-[600px] lg:h-[850px] md:-mt-20 reveal rounded-[4rem] overflow-hidden shadow-2xl">
            <img 
              src="https://images.unsplash.com/photo-1590523277543-a94d2e4eb00b?auto=format&fit=crop&q=80&w=1200" 
              className="w-full h-full object-cover" 
              alt="Coastal" 
            />
          </div>
          <div className="md:col-span-3 h-[400px] lg:h-[650px] md:mt-24 reveal rounded-[4rem] overflow-hidden shadow-2xl">
            <img 
              src="https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&q=80&w=1200" 
              className="w-full h-full object-cover grayscale-[0.2] hover:grayscale-0 transition-all duration-[2s]" 
              alt="Resort" 
            />
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-48 px-6 max-w-5xl mx-auto text-center reveal">
        <p className="text-3xl md:text-5xl font-serif font-bold text-slate-900 leading-[1.4] mb-8">
          Serenity is a <span className="text-sky-500">tranquil haven</span>
        </p>
        <p className="text-3xl md:text-5xl font-serif font-bold text-slate-900 leading-[1.4] mb-8">
          nestled amidst the <span className="text-amber-500/90 italic">golden sun</span> of the 
        </p>
        <p className="text-3xl md:text-5xl font-serif font-bold text-slate-900 leading-[1.4]">
          majestic atolls, offering a harmonious blend of minimalist luxury and nature's deepest blue.
        </p>
      </section>

      {/* Featured Stays */}
      <section className="py-40 bg-white border-t border-slate-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-12 reveal">
            <div className="max-w-2xl">
              <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-sky-500 mb-6 block">The Collection</span>
              <h2 className="text-5xl md:text-7xl font-serif font-bold text-slate-900 mb-8 tracking-tight">Comfort and Space <br /> Combined</h2>
              <p className="text-slate-400 text-sm font-medium tracking-widest uppercase leading-loose opacity-60">Relish the charm of our spacious rooms and separate houses, blending modern elegance with the tranquility of the surrounding natural oasis.</p>
            </div>
            <Link to="/stays" className="btn-luxury px-12 py-5 rounded-full text-[10px] font-bold uppercase tracking-[0.4em] flex items-center gap-4 group">
              View All Stays
              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {featuredResorts.map(resort => (
              <ResortCard key={resort.id} resort={resort} />
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-64 px-4 text-center reveal relative">
         <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none">
            <h2 className="text-[20rem] font-serif font-bold italic tracking-tighter">Serenity</h2>
         </div>
         <h2 className="text-5xl md:text-8xl font-serif font-bold text-slate-900 mb-16 italic tracking-tight relative z-10">Have a question <br /> or need assistance?</h2>
         <Link to="/plan" className="btn-luxury inline-block px-24 py-8 rounded-full font-bold uppercase tracking-[0.5em] text-[10px] shadow-2xl relative z-10 border border-slate-900 hover:border-sky-500">
            Book My Stay
         </Link>
      </section>
    </div>
  );
};

export default Home;