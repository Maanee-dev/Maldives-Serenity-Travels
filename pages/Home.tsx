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
      <section className="pt-64 pb-32 px-4 relative overflow-hidden">
        <div className="max-w-7xl mx-auto text-center reveal">
          <span className="text-[12px] font-bold uppercase tracking-[0.8em] text-amber-500 mb-8 block">Maldivian Sun & Sea</span>
          <h1 className="text-6xl md:text-8xl lg:text-[7.5rem] font-serif font-bold text-slate-900 mb-12 leading-[0.9] tracking-tighter italic">
            Where Nature <br /> Embraces <span className="text-sky-500 not-italic">Luxury</span>
          </h1>
          <div className="flex flex-col items-center mt-24">
            <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-slate-400 mb-8">Begin Your Journey</span>
            <div className="w-1 h-32 bg-sky-500"></div>
            <div className="w-1 h-8 bg-amber-500"></div>
          </div>
        </div>

        {/* Solid Image Grid */}
        <div className="max-w-[1400px] mx-auto mt-48 grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-20 px-6 lg:px-12">
          <div className="md:col-span-4 h-[500px] lg:h-[750px] reveal rounded-[3rem] overflow-hidden shadow-xl border-l-8 border-sky-500">
            <img 
              src="https://images.unsplash.com/photo-1544550581-5f7ceaf7f992?auto=format&fit=crop&q=80&w=1200" 
              className="w-full h-full object-cover transition-transform duration-[2s] hover:scale-105" 
              alt="Luxury Stay" 
            />
          </div>
          <div className="md:col-span-5 h-[600px] lg:h-[850px] md:-mt-32 reveal rounded-[3rem] overflow-hidden shadow-2xl border-b-8 border-amber-500">
            <img 
              src="https://images.unsplash.com/photo-1590523277543-a94d2e4eb00b?auto=format&fit=crop&q=80&w=1200" 
              className="w-full h-full object-cover" 
              alt="Coastal View" 
            />
          </div>
          <div className="md:col-span-3 h-[400px] lg:h-[650px] md:mt-24 reveal rounded-[3rem] overflow-hidden shadow-xl border-r-8 border-sky-500">
            <img 
              src="https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&q=80&w=1200" 
              className="w-full h-full object-cover transition-transform duration-[2s] hover:scale-105" 
              alt="Resort Pool" 
            />
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-48 px-6 max-w-5xl mx-auto text-center reveal">
        <p className="text-3xl md:text-5xl font-serif font-bold text-slate-900 leading-[1.5] mb-8">
          Serenity is a <span className="text-sky-500 underline decoration-sky-500 decoration-4 underline-offset-8">tranquil haven</span>
        </p>
        <p className="text-3xl md:text-5xl font-serif font-bold text-slate-900 leading-[1.5] mb-8">
          nestled amidst the <span className="text-amber-500 italic">golden sun</span> of the 
        </p>
        <p className="text-3xl md:text-5xl font-serif font-bold text-slate-900 leading-[1.5]">
          majestic atolls, offering a harmonious blend of minimalist luxury and nature's deepest blue.
        </p>
      </section>

      {/* Featured Stays */}
      <section className="py-48 bg-white border-t-2 border-slate-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex flex-col md:flex-row justify-between items-end mb-28 gap-12 reveal">
            <div className="max-w-2xl">
              <span className="text-[11px] font-bold uppercase tracking-[0.6em] text-sky-500 mb-6 block">The Collection</span>
              <h2 className="text-5xl md:text-7xl font-serif font-bold text-slate-900 mb-8 tracking-tight">Comfort and Space <br /> Combined</h2>
              <p className="text-slate-400 text-sm font-bold tracking-[0.2em] uppercase leading-loose">Relish the charm of our spacious rooms and separate houses, blending modern elegance with the tranquility of the surrounding natural oasis.</p>
            </div>
            <Link to="/stays" className="btn-atoll px-16 py-6 rounded-full text-[11px] font-bold uppercase tracking-[0.5em] flex items-center gap-6 group">
              View All Stays
              <span className="text-amber-500 group-hover:translate-x-2 transition-transform">→</span>
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
      <section className="py-64 px-4 text-center reveal relative overflow-hidden bg-slate-900 text-white">
         <h2 className="text-5xl md:text-9xl font-serif font-bold mb-20 italic tracking-tight relative z-10">Have a question?</h2>
         <Link to="/plan" className="btn-sun inline-block px-32 py-10 rounded-full font-bold uppercase tracking-[0.6em] text-[12px] shadow-2xl relative z-10 border-2 border-transparent hover:border-white">
            Book My Stay
         </Link>
      </section>
    </div>
  );
};

export default Home;