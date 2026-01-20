import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { RESORTS, OFFERS, BLOG_POSTS } from '../constants';
import ResortCard from '../components/ResortCard';

const Home: React.FC = () => {
  const featuredResorts = RESORTS.slice(0, 3);
  const recentOffers = OFFERS.slice(0, 3);
  const featuredStories = BLOG_POSTS.slice(0, 2);

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
      <section className="pt-48 md:pt-56 pb-24 md:pb-32 px-4 relative overflow-hidden">
        <div className="absolute top-20 right-[-10%] w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-sky-400/5 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-40 left-[-10%] w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-amber-400/5 blur-[120px] rounded-full"></div>

        <div className="max-w-7xl mx-auto text-center reveal">
          <span className="text-[10px] font-bold uppercase tracking-[0.6em] text-amber-500 mb-8 block px-4">Bespoke Maldivian Agency</span>
          <h1 className="text-5xl md:text-8xl lg:text-[7.5rem] font-serif font-bold text-slate-900 mb-12 leading-[1] md:leading-[0.95] tracking-tighter italic px-4">
            The Art of <br /> Maldivian <span className="text-sky-500 not-italic">Stillness</span>
          </h1>
          <div className="flex flex-col items-center mt-12 md:mt-20">
            <Link to="/stays" className="btn-luxury px-12 py-5 rounded-full text-[10px] font-bold uppercase tracking-[0.5em] mb-12">
              View The Collection
            </Link>
            <div className="w-px h-16 md:h-24 bg-gradient-to-b from-slate-900 to-transparent"></div>
          </div>
        </div>

        {/* Asymmetric Image Grid - Responsive */}
        <div className="max-w-[1400px] mx-auto mt-24 md:mt-40 grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-12 px-6 lg:px-12">
          <div className="md:col-span-4 h-[400px] md:h-[750px] reveal overflow-hidden shadow-2xl">
            <img 
              src="https://images.unsplash.com/photo-1544550581-5f7ceaf7f992?auto=format&fit=crop&q=80&w=1200" 
              className="w-full h-full object-cover transition-all duration-[3s] hover:scale-110" 
              alt="Luxury Sanctuary" 
            />
          </div>
          <div className="md:col-span-5 h-[450px] md:h-[850px] md:-mt-20 reveal overflow-hidden shadow-2xl">
            <img 
              src="https://images.unsplash.com/photo-1590523277543-a94d2e4eb00b?auto=format&fit=crop&q=80&w=1200" 
              className="w-full h-full object-cover transition-all duration-[3s] hover:scale-110" 
              alt="Turquoise Lagoon" 
            />
          </div>
          <div className="hidden md:block md:col-span-3 h-[650px] md:mt-24 reveal overflow-hidden shadow-2xl">
            <img 
              src="https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&q=80&w=1200" 
              className="w-full h-full object-cover transition-all duration-[3s] hover:scale-110" 
              alt="Tropical Paradise" 
            />
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-24 md:py-48 px-6 max-w-5xl mx-auto text-center reveal">
        <p className="text-2xl md:text-5xl font-serif font-bold text-slate-900 leading-[1.4] mb-8">
          A bespoke boutique agency <br className="hidden md:block" /> crafting <span className="text-sky-500 italic">unrivaled journeys</span>
        </p>
        <p className="text-lg md:text-xl font-medium text-slate-400 leading-relaxed max-w-3xl mx-auto uppercase tracking-widest opacity-80">
          Hand-picked sanctuaries across the majestic atolls, blending minimalist luxury with deep destination intelligence.
        </p>
      </section>

      {/* Featured Sanctuaries */}
      <section className="py-24 md:py-40 bg-white border-t border-slate-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 md:mb-24 gap-8 reveal">
            <div className="max-w-2xl">
              <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-sky-500 mb-6 block">The Curated Portfolio</span>
              <h2 className="text-4xl md:text-7xl font-serif font-bold text-slate-900 mb-8 tracking-tight italic">Exquisite Sanctuaries</h2>
              <p className="text-slate-400 text-sm font-bold tracking-widest uppercase leading-loose">Vetted to ensure every villa meets our standard of absolute tranquility and design excellence.</p>
            </div>
            <Link to="/stays" className="text-[10px] font-bold uppercase tracking-[0.4em] text-slate-950 border-b-2 border-slate-950 pb-2 hover:opacity-50 transition-all">
              All Properties
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            {featuredResorts.map(resort => (
              <ResortCard key={resort.id} resort={resort} />
            ))}
          </div>
        </div>
      </section>

      {/* Private Incentives */}
      <section className="py-24 md:py-40 bg-[#FCFAF7]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
           <div className="text-center mb-16 md:mb-24 reveal">
              <span className="text-[10px] font-bold uppercase tracking-[0.6em] text-amber-500 mb-6 block">Direct Negotiations</span>
              <h2 className="text-4xl md:text-7xl font-serif font-bold text-slate-900 italic tracking-tight">Private Incentives</h2>
           </div>
           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {recentOffers.map(offer => (
                <Link to="/offers" key={offer.id} className="group bg-white rounded-[3rem] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-700 reveal">
                   <div className="h-64 overflow-hidden relative">
                      <img src={offer.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[2s]" alt={offer.title} />
                      <div className="absolute top-6 left-6 bg-slate-950 text-white px-5 py-2 rounded-full text-[9px] font-bold uppercase tracking-widest">{offer.discount}</div>
                   </div>
                   <div className="p-10">
                      <span className="text-[9px] font-bold text-slate-300 uppercase tracking-widest mb-4 block">{offer.resortName}</span>
                      <h3 className="text-2xl font-serif font-bold text-slate-900 leading-tight group-hover:italic">{offer.title}</h3>
                   </div>
                </Link>
              ))}
           </div>
        </div>
      </section>

      {/* Atoll Insights */}
      <section className="py-24 md:py-40 bg-white border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 md:mb-24 gap-8 reveal">
             <div>
                <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-sky-500 mb-6 block">Intelligence</span>
                <h2 className="text-4xl md:text-7xl font-serif font-bold text-slate-900 italic tracking-tight">Atoll Insights</h2>
             </div>
             <Link to="/stories" className="text-[10px] font-bold uppercase tracking-[0.4em] text-slate-400 hover:text-slate-900 transition-colors">
                Visit The Journal
             </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20">
             {featuredStories.map(post => (
               <Link to={`/stories/${post.slug}`} key={post.id} className="group flex flex-col md:flex-row gap-8 items-center reveal">
                  <div className="w-full md:w-1/2 h-64 md:h-80 rounded-[3rem] overflow-hidden shadow-xl">
                     <img src={post.image} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" alt={post.title} />
                  </div>
                  <div className="w-full md:w-1/2">
                     <span className="text-[9px] font-bold text-slate-300 uppercase tracking-widest mb-4 block">{post.date}</span>
                     <h3 className="text-2xl md:text-3xl font-serif font-bold text-slate-900 leading-tight mb-4 group-hover:italic">{post.title}</h3>
                     <p className="text-slate-500 text-sm leading-relaxed line-clamp-2">{post.excerpt}</p>
                  </div>
               </Link>
             ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-40 md:py-64 px-6 text-center reveal relative overflow-hidden">
         <div className="absolute inset-0 flex items-center justify-center opacity-[0.02] pointer-events-none">
            <h2 className="text-[10rem] md:text-[25rem] font-serif font-bold italic tracking-tighter">Serenity</h2>
         </div>
         <div className="relative z-10">
            <h2 className="text-4xl md:text-8xl font-serif font-bold text-slate-900 mb-12 italic tracking-tight leading-tight">Consult with our <br className="hidden md:block" /> destination specialists</h2>
            <Link to="/plan" className="btn-luxury inline-block px-16 md:px-24 py-6 md:py-8 rounded-full font-bold uppercase tracking-[0.5em] text-[10px] shadow-2xl">
               Begin Your Itinerary
            </Link>
         </div>
      </section>
    </div>
  );
};

export default Home;