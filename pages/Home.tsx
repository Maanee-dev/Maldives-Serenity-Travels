import React from 'react';
import { Link } from 'react-router-dom';
import { RESORTS } from '../constants';
import ResortCard from '../components/ResortCard';

const Home: React.FC = () => {
  const featuredResorts = RESORTS.slice(0, 3);

  return (
    <div className="bg-[#FCFAF7]">
      {/* Hero Section - Qelli Style */}
      <section className="pt-40 pb-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-slate-400 mb-6 block">Discover a Serene Escape</span>
          <h1 className="text-5xl md:text-8xl font-serif font-bold text-slate-900 mb-8 leading-tight max-w-5xl mx-auto">
            Where Nature <br /> Embraces Luxury
          </h1>
          <div className="flex flex-col items-center mt-12">
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-slate-900 mb-4">Select Your Stay</span>
            <div className="w-px h-16 bg-slate-900"></div>
          </div>
        </div>

        {/* Asymmetric Image Grid */}
        <div className="max-w-[1400px] mx-auto mt-20 grid grid-cols-1 md:grid-cols-12 gap-4 lg:gap-8 px-4 lg:px-12">
          <div className="md:col-span-4 h-[500px] lg:h-[700px]">
            <img src="https://images.unsplash.com/photo-1544550581-5f7ceaf7f992?auto=format&fit=crop&q=80&w=800" className="w-full h-full object-cover" alt="Luxury Villa" />
          </div>
          <div className="md:col-span-5 h-[500px] lg:h-[700px] md:mt-12">
            <img src="https://images.unsplash.com/photo-1590523277543-a94d2e4eb00b?auto=format&fit=crop&q=80&w=800" className="w-full h-full object-cover" alt="Mountain View" />
          </div>
          <div className="md:col-span-3 h-[400px] lg:h-[600px] md:mt-24">
            <img src="https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&q=80&w=800" className="w-full h-full object-cover" alt="Infinity Pool" />
          </div>
        </div>
      </section>

      {/* Intro Description */}
      <section className="py-32 px-4 max-w-4xl mx-auto text-center border-b border-slate-100">
        <p className="text-2xl md:text-4xl font-serif font-bold text-slate-900 leading-snug italic">
          "Serenity is a curated sanctuary nestled amidst the Indian Ocean's turquoise waters, offering a harmonious blend of minimalist luxury and the pristine beauty of nature's oasis."
        </p>
      </section>

      {/* Immerse Yourself Section */}
      <section className="py-32 px-6 lg:px-12 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div>
            <h2 className="text-4xl md:text-6xl font-serif font-bold text-slate-900 mb-8 max-w-md">
              Immerse Yourself in the Embrace of Nature
            </h2>
            <div className="flex gap-4 mb-12">
              <div className="w-64 h-80 lg:h-96">
                <img src="https://images.unsplash.com/photo-1573843225233-9fca73af994d?auto=format&fit=crop&q=80&w=600" className="w-full h-full object-cover" alt="Pool" />
              </div>
              <div className="w-48 h-64 lg:h-80 mt-12">
                <img src="https://images.unsplash.com/photo-1590523741831-ab7e8b8f9c7f?auto=format&fit=crop&q=80&w=600" className="w-full h-full object-cover" alt="Lounge" />
              </div>
            </div>
          </div>
          <div className="lg:pl-20">
            <p className="text-slate-500 text-sm leading-relaxed mb-8 max-w-sm">
              At Serenity, we believe in the power of simplicity. Our curated collection is thoughtfully designed to provide you with a peaceful getaway from the hustle and bustle of daily life.
            </p>
            <Link to="/stories" className="group flex items-center gap-6">
              <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-slate-900">About Us</span>
              <div className="relative flex items-center">
                <div className="w-12 h-px bg-slate-900 group-hover:w-20 transition-all duration-500"></div>
                <div className="w-8 h-8 rounded-full border border-slate-900 flex items-center justify-center -ml-4 group-hover:ml-0 transition-all">
                   <svg className="w-3 h-3 text-slate-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                   </svg>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Stays - Armonia Style */}
      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
            <div className="max-w-2xl">
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-slate-900 mb-4">Comfort and Space Combined</h2>
              <p className="text-slate-500 text-sm font-medium">Relish the charm of our spacious rooms and separate villas, blending modern elegance with tranquility.</p>
            </div>
            <Link to="/stays" className="group flex items-center gap-4">
              <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-slate-900">Select Accommodation</span>
              <div className="w-10 h-10 rounded-full border border-slate-900 flex items-center justify-center group-hover:bg-slate-900 group-hover:text-white transition-all">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7-7 7" />
                </svg>
              </div>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredResorts.map(resort => (
              <ResortCard key={resort.id} resort={resort} />
            ))}
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-40 px-4 text-center">
         <h2 className="text-4xl md:text-7xl font-serif font-bold text-slate-900 mb-12 italic">Have a question <br /> or need assistance?</h2>
         <Link to="/plan" className="inline-block bg-slate-950 text-white px-16 py-6 rounded-full font-bold uppercase tracking-[0.4em] text-[10px] hover:bg-slate-800 transition-all shadow-2xl">
            Book Now
         </Link>
      </section>
    </div>
  );
};

export default Home;