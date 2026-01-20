
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
      <section className="pt-48 pb-32 px-4">
        <div className="max-w-7xl mx-auto text-center reveal">
          <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-amber-500 mb-8 block">Discover a Serene Escape</span>
          <h1 className="text-5xl md:text-8xl lg:text-[7rem] font-serif font-bold text-slate-900 mb-12 leading-[1.1] tracking-tight">
            Where Nature <br /> Embraces Luxury
          </h1>
          <div className="flex flex-col items-center mt-16">
            <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-slate-900 mb-6">Select Your Stay</span>
            <div className="w-px h-16 bg-gradient-to-b from-slate-900 to-amber-400/50"></div>
          </div>
        </div>

        {/* Asymmetric Image Grid */}
        <div className="max-w-[1400px] mx-auto mt-32 grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 px-6 lg:px-12">
          <div className="md:col-span-4 h-[500px] lg:h-[700px] reveal transition-all duration-1000">
            <img 
              src="https://images.unsplash.com/photo-1544550581-5f7ceaf7f992?auto=format&fit=crop&q=80&w=1200" 
              className="w-full h-full object-cover" 
              alt="Soneva Jani Overwater" 
            />
          </div>
          <div className="md:col-span-5 h-[600px] lg:h-[800px] md:-mt-12 reveal transition-all duration-1000 delay-200">
            <img 
              src="https://images.unsplash.com/photo-1590523277543-a94d2e4eb00b?auto=format&fit=crop&q=80&w=1200" 
              className="w-full h-full object-cover" 
              alt="Coastal Mountain View" 
            />
          </div>
          <div className="md:col-span-3 h-[400px] lg:h-[600px] md:mt-24 reveal transition-all duration-1000 delay-500">
            <img 
              src="https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&q=80&w=1200" 
              className="w-full h-full object-cover" 
              alt="Resort Poolside" 
            />
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-40 px-6 max-w-4xl mx-auto text-center reveal">
        <p className="text-2xl md:text-4xl font-serif font-bold text-slate-900 leading-[1.5] mb-4">
          Serenity is a <span className="text-sky-500">tranquil hotel</span>
        </p>
        <p className="text-2xl md:text-4xl font-serif font-bold text-slate-900 leading-[1.5] mb-4">
          nestled amidst the Maldives' <span className="text-amber-500/80 italic">majestic</span>
        </p>
        <p className="text-2xl md:text-4xl font-serif font-bold text-slate-900 leading-[1.5]">
          atolls, offering a harmonious blend of minimalist luxury and the pristine beauty of nature's oasis.
        </p>
      </section>

      {/* Immerse Yourself Section */}
      <section className="py-32 px-6 lg:px-12 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
          <div className="reveal">
            <h2 className="text-5xl md:text-6xl font-serif font-bold text-slate-900 mb-16 leading-tight">
              Immerse Yourself <br /> in the <span className="text-sky-600/20">Embrace</span> of Nature
            </h2>
            <div className="flex gap-4">
              <div className="flex-1 h-[400px] lg:h-[600px]">
                <img src="https://images.unsplash.com/photo-1573843225233-9fca73af994d?auto=format&fit=crop&q=80&w=800" className="w-full h-full object-cover" alt="Villa Lagoon" />
              </div>
              <div className="w-1/3 h-[300px] lg:h-[450px] mt-24">
                <img src="https://images.unsplash.com/photo-1590523741831-ab7e8b8f9c7f?auto=format&fit=crop&q=80&w=800" className="w-full h-full object-cover" alt="Interior Detail" />
              </div>
            </div>
          </div>
          <div className="lg:pl-32 lg:pt-48 reveal">
            <p className="text-slate-500 text-sm leading-relaxed mb-12 max-w-sm">
              At Serenity, we believe in the power of simplicity. Our curated collection is thoughtfully designed to provide you with a peaceful getaway from the hustle and bustle of daily life. Experience the Maldives in its purest form.
            </p>
            <Link to="/stories" className="group flex items-center gap-6">
              <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-slate-900">About Us</span>
              <div className="relative flex items-center">
                <div className="w-12 h-px bg-slate-900 group-hover:w-16 transition-all duration-700"></div>
                <div className="w-10 h-10 rounded-full border border-slate-900 flex items-center justify-center -ml-5 group-hover:ml-0 transition-all bg-[#FCFAF7]">
                   <svg className="w-3 h-3 text-slate-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                   </svg>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Stays */}
      <section className="py-40 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-12 reveal">
            <div className="max-w-2xl">
              <h2 className="text-5xl md:text-6xl font-serif font-bold text-slate-900 mb-6 leading-tight">Comfort and Space <br /> Combined</h2>
              <p className="text-slate-400 text-sm font-medium tracking-wide">Relish the charm of our spacious rooms and separate houses, blending modern elegance with the tranquility of the surrounding natural oasis.</p>
            </div>
            <Link to="/stays" className="group flex items-center gap-6 pb-2 border-b border-slate-900 hover:border-amber-400 transition-colors">
              <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-slate-900">Select Accommodation</span>
              <div className="w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center group-hover:bg-amber-500 transition-all">
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

      {/* Final CTA */}
      <section className="py-60 px-4 text-center reveal">
         <h2 className="text-5xl md:text-8xl font-serif font-bold text-slate-900 mb-16 italic">Have a question <br /> or need assistance?</h2>
         <Link to="/plan" className="btn-maldive inline-block bg-slate-950 text-white px-20 py-7 rounded-full font-bold uppercase tracking-[0.4em] text-[10px] hover:bg-amber-500 transition-all shadow-2xl">
            Book My Stay
         </Link>
      </section>
    </div>
  );
};

export default Home;
