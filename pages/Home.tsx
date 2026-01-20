import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { RESORTS, OFFERS, BLOG_POSTS } from '../constants';

const Home: React.FC = () => {
  const featuredResorts = RESORTS.slice(0, 3);
  const mainFeatured = featuredResorts[0];
  const sideFeatured = featuredResorts.slice(1, 3);
  const recentOffers = OFFERS.slice(0, 3);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.reveal, .reveal-left').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="bg-[#FCFAF7] overflow-x-hidden">
      {/* Cinematic Hero Section */}
      <section className="min-h-screen pt-32 md:pt-48 pb-20 px-6 relative flex flex-col items-center justify-center">
        {/* Geometric Background Element */}
        <div className="absolute top-0 right-0 w-1/3 h-full bg-slate-100/40 -z-10 hidden lg:block"></div>
        
        <div className="max-w-[1440px] w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
          <div className="lg:col-span-8 reveal">
            <span className="text-[10px] font-bold uppercase tracking-[0.8em] text-amber-500 mb-8 block">A Private Boutique Collection</span>
            <h1 className="text-6xl md:text-8xl lg:text-[9rem] font-serif font-bold text-slate-900 mb-10 leading-[0.85] tracking-tighter italic text-liquid">
              Maldivian <br /> 
              <span className="text-sky-500 not-italic ml-0 lg:ml-20">Stillness.</span>
            </h1>
            <div className="max-w-md lg:ml-20">
              <p className="text-slate-400 text-sm md:text-base font-medium uppercase tracking-[0.25em] leading-loose mb-10">
                Curating the gap between architectural perfection and raw island nature. Bespoke travel for the modern minimalist.
              </p>
              <Link to="/stays" className="btn-luxury">
                Explore The Portfolio
              </Link>
            </div>
          </div>
          
          <div className="lg:col-span-4 relative mt-12 lg:mt-0 reveal delay-500">
            <div className="aspect-[3/4] max-h-[600px] overflow-hidden shadow-[30px_30px_60px_rgba(0,0,0,0.05)] rounded-t-[12rem] rounded-b-[2rem] img-zoom-container relative">
              <img 
                src="https://images.unsplash.com/photo-1544550581-5f7ceaf7f992?auto=format&fit=crop&q=80&w=1200" 
                className="w-full h-full object-cover" 
                alt="Luxury Sanctuary"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/20 to-transparent"></div>
            </div>
            {/* Floating Editorial Card */}
            <div className="absolute -bottom-8 -left-8 w-40 h-40 bg-white p-4 rounded-[3rem] shadow-[0_20px_40px_-10px_rgba(0,0,0,0.1)] hidden lg:flex items-center justify-center text-center reveal delay-1000">
               <div className="w-full h-full border border-slate-50 rounded-[2.8rem] flex flex-col items-center justify-center p-2">
                  <span className="text-[8px] font-bold uppercase tracking-widest text-slate-300 mb-1">Est.</span>
                  <span className="text-xl font-serif italic text-slate-900">2012</span>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy: Architectural Spacing */}
      <section className="py-24 md:py-32 bg-white border-y border-slate-50 relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-6 text-center reveal">
           <p className="text-3xl md:text-6xl font-serif font-bold text-slate-900 leading-[1.2] mb-12 italic tracking-tight">
             "Luxury is not about abundance, but the curated <span className="text-sky-500">absence</span> of noise."
           </p>
           <div className="w-24 h-px bg-amber-500 mx-auto mb-10"></div>
           <p className="text-slate-400 text-[10px] font-bold uppercase tracking-[0.7em] max-w-xl mx-auto leading-[2.2]">
             Every island in our collection is hand-vetted for its spatial intelligence and commitment to absolute tranquility.
           </p>
        </div>
        {/* Large Faded Watermark */}
        <div className="absolute bottom-[-5%] left-[-2%] text-[10rem] md:text-[15rem] font-serif font-bold italic text-slate-50 opacity-40 select-none pointer-events-none">Silence</div>
      </section>

      {/* Featured Sancturary: High-Contrast Layout */}
      <section className="py-20 md:py-32 px-6 bg-[#FCFAF7]">
        <div className="max-w-[1440px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-start">
            
            {/* Left: Dominant Editorial Visual */}
            <div className="lg:col-span-7 reveal">
              <Link to={`/stays/${mainFeatured.slug}`} className="group block relative">
                <div className="aspect-[14/10] max-h-[700px] overflow-hidden rounded-[2rem] lg:rounded-[4rem] mb-12 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] group-hover:shadow-sky-200/50 transition-all duration-1000 img-zoom-container">
                  <img src={mainFeatured.images[0]} className="w-full h-full object-cover" alt={mainFeatured.name} />
                  <div className="absolute top-10 left-10 bg-white/95 backdrop-blur-xl px-8 py-3 rounded-full text-[9px] font-bold uppercase tracking-[0.4em] text-sky-600 shadow-xl">
                    Signature Selection
                  </div>
                </div>
                <div className="lg:pl-12">
                  <h3 className="text-4xl md:text-7xl font-serif font-bold text-slate-900 mb-8 tracking-tighter italic group-hover:translate-x-4 transition-transform duration-1000">
                    {mainFeatured.name}
                  </h3>
                  <p className="text-slate-500 text-lg md:text-2xl leading-relaxed mb-12 max-w-lg font-medium opacity-80">
                    {mainFeatured.shortDescription}
                  </p>
                  <div className="flex items-center gap-10 border-t border-slate-100 pt-8">
                    <span className="text-[10px] font-bold text-amber-500 uppercase tracking-[0.5em]">Request Profile</span>
                    <div className="h-px bg-slate-200 flex-grow origin-left scale-x-50 group-hover:scale-x-100 transition-transform duration-1000"></div>
                  </div>
                </div>
              </Link>
            </div>

            {/* Right: Vertical Compositional Break */}
            <div className="lg:col-span-5 space-y-24 lg:pt-32">
              {sideFeatured.map((resort, idx) => (
                <Link to={`/stays/${resort.slug}`} key={resort.id} className="group block reveal">
                  <div className="flex gap-8 items-center">
                    <div className="w-32 h-32 md:w-48 md:h-48 flex-shrink-0 rounded-[2.5rem] overflow-hidden shadow-xl img-zoom-container">
                      <img src={resort.images[0]} className="w-full h-full object-cover" alt={resort.name} />
                    </div>
                    <div>
                      <span className="text-[8px] font-bold text-slate-300 uppercase tracking-[0.6em] mb-2 block">{resort.atoll}</span>
                      <h4 className="text-2xl md:text-4xl font-serif font-bold text-slate-900 mb-4 group-hover:italic transition-all leading-tight tracking-tight">{resort.name}</h4>
                      <span className="text-[9px] font-bold text-sky-500 uppercase tracking-[0.3em] border-b border-sky-100 pb-1">View Retreat</span>
                    </div>
                  </div>
                </Link>
              ))}
              
              <div className="pt-10 reveal">
                 <Link to="/stays" className="block text-center py-12 bg-slate-950 rounded-[3rem] text-white hover:bg-sky-500 transition-all shadow-[0_20px_40px_-10px_rgba(0,0,0,0.2)] group overflow-hidden relative">
                   <span className="relative z-10 text-[10px] font-bold uppercase tracking-[0.7em]">Full Portfolio Archives</span>
                   <div className="absolute inset-0 bg-sky-400 translate-y-full group-hover:translate-y-0 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"></div>
                 </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Dark Section: Destination Intelligence */}
      <section className="py-24 md:py-40 bg-slate-950 text-white relative overflow-hidden">
        {/* Subtle Architectural Overlay */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
           <div className="absolute top-0 left-0 w-full h-full border-[60px] border-white rounded-[50%] -translate-y-1/2 -translate-x-1/2"></div>
        </div>

        <div className="max-w-[1440px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center relative z-10">
           <div className="reveal">
              <span className="text-[10px] font-bold uppercase tracking-[1em] text-sky-400 mb-10 block">The Intelligence Unit</span>
              <h2 className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold italic mb-10 leading-[0.9] tracking-tighter">Beyond <br/> The Map.</h2>
              <p className="text-slate-400 text-lg md:text-xl leading-relaxed mb-16 max-w-lg font-medium">
                We are a private boutique agency. Every itinerary is crafted by specialists who have spent years living within the atolls they curate.
              </p>
              <Link to="/plan" className="btn-luxury bg-white text-slate-950 hover:bg-sky-400 px-16 py-6 rounded-full">
                Request Private Access
              </Link>
           </div>
           
           <div className="grid grid-cols-2 gap-8 reveal-left delay-500">
              <div className="space-y-8 mt-12">
                 <div className="aspect-square bg-white/5 backdrop-blur-2xl rounded-[3rem] p-10 flex flex-col justify-end border border-white/10 hover:border-sky-500 transition-colors">
                    <span className="text-4xl font-serif italic mb-4">12</span>
                    <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-slate-500">Atolls Mastered</span>
                 </div>
                 <div className="aspect-[4/5] bg-sky-500 rounded-[3rem] p-10 flex flex-col justify-end shadow-2xl">
                    <span className="text-4xl font-serif italic mb-4">Privé</span>
                    <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-white/90">Exclusive Access</span>
                 </div>
              </div>
              <div className="space-y-8">
                 <div className="aspect-[3/4] overflow-hidden rounded-[3rem] shadow-xl img-zoom-container">
                    <img src="https://images.unsplash.com/photo-1510011564758-29df30730163?auto=format&fit=crop&q=80&w=800" className="w-full h-full object-cover" alt="Concierge" />
                 </div>
                 <div className="aspect-square bg-slate-900 rounded-[3rem] p-10 flex flex-col justify-end border border-white/5">
                    <span className="text-4xl font-serif italic mb-4">24/7</span>
                    <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-slate-500">Butler Support</span>
                 </div>
              </div>
           </div>
        </div>
      </section>

      {/* Offers: Staggered Dynamic Grid */}
      <section className="py-20 md:py-32 bg-[#FCFAF7]">
        <div className="max-w-[1440px] mx-auto px-6">
           <div className="flex flex-col md:flex-row justify-between items-baseline mb-20 reveal">
              <h2 className="text-5xl md:text-7xl font-serif font-bold text-slate-900 italic tracking-tighter leading-none">Incentives</h2>
              <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-slate-300 mt-4 md:mt-0">Refined for the season</span>
           </div>
           
           <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              {recentOffers.map((offer, idx) => (
                <Link to="/offers" key={offer.id} className={`group reveal ${idx === 1 ? 'lg:mt-16' : ''} ${idx === 2 ? 'lg:mt-32' : ''}`}>
                   <div className="bg-white p-8 rounded-[4rem] shadow-[0_8px_32px_-12px_rgba(0,0,0,0.05)] hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.08)] transition-all duration-1000">
                      <div className="aspect-[4/5] overflow-hidden rounded-[3rem] mb-8 relative img-zoom-container">
                        <img src={offer.image} className="w-full h-full object-cover" alt={offer.title} />
                        <div className="absolute bottom-10 left-10 bg-slate-950 text-white px-6 py-2 rounded-full text-[9px] font-bold uppercase tracking-[0.3em] shadow-xl">
                           {offer.discount}
                        </div>
                      </div>
                      <div className="px-4">
                        <span className="text-[9px] font-bold text-amber-500 uppercase tracking-[0.5em] mb-4 block">{offer.resortName}</span>
                        <h3 className="text-2xl md:text-3xl font-serif font-bold text-slate-900 mb-8 leading-tight group-hover:italic transition-all">{offer.title}</h3>
                        <div className="flex justify-between items-center text-[9px] font-bold text-slate-300 uppercase tracking-[0.4em] border-t border-slate-50 pt-8">
                           <span>Negotiated Rate</span>
                           <span className="text-sky-500 opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0 transition-all">Request →</span>
                        </div>
                      </div>
                   </div>
                </Link>
              ))}
           </div>
        </div>
      </section>

      {/* Journal: Minimalist Reveal */}
      <section className="py-24 md:py-40 bg-white border-t border-slate-50">
        <div className="max-w-5xl mx-auto px-6">
           <div className="text-center mb-24 reveal">
              <span className="text-[10px] font-bold uppercase tracking-[1em] text-sky-500 mb-8 block">Atoll Insights</span>
              <h2 className="text-5xl md:text-8xl font-serif font-bold italic text-slate-900 tracking-tighter">Journal</h2>
           </div>
           
           <div className="divide-y divide-slate-100">
             {BLOG_POSTS.slice(0, 3).map((post) => (
               <Link to={`/stories/${post.slug}`} key={post.id} className="group block py-12 reveal">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-10 group">
                     <div className="flex-grow">
                        <span className="text-[9px] font-bold text-slate-300 uppercase tracking-[0.5em] mb-4 block">{post.date}</span>
                        <h3 className="text-3xl md:text-6xl font-serif font-bold text-slate-900 italic transition-all duration-700 group-hover:translate-x-8 group-hover:text-sky-500 tracking-tighter">
                          {post.title}
                        </h3>
                     </div>
                     <div className="w-full md:w-64 h-44 rounded-[2.5rem] overflow-hidden opacity-0 group-hover:opacity-100 transition-all duration-1000 translate-x-12 group-hover:translate-x-0 hidden md:block shadow-xl">
                        <img src={post.image} className="w-full h-full object-cover" alt={post.title} />
                     </div>
                  </div>
               </Link>
             ))}
           </div>
           
           <div className="mt-20 text-center reveal">
              <Link to="/stories" className="text-[11px] font-bold uppercase tracking-[0.6em] text-slate-400 hover:text-slate-950 border-b border-transparent hover:border-slate-950 pb-2 transition-all duration-500">
                Access Full Archives
              </Link>
           </div>
        </div>
      </section>

      {/* Signature CTA */}
      <section className="py-24 md:py-40 px-6 text-center reveal relative flex flex-col items-center justify-center">
         <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none select-none">
            <h2 className="text-[10rem] md:text-[20rem] font-serif font-bold italic tracking-tighter">Perspective</h2>
         </div>
         <div className="relative z-10 max-w-4xl mx-auto">
            <h2 className="text-5xl md:text-[8rem] font-serif font-bold text-slate-900 mb-16 italic tracking-tighter leading-[0.85] text-liquid">
              Defined by <br/> <span className="text-sky-500 not-italic">Perspective.</span>
            </h2>
            <Link to="/plan" className="btn-luxury px-16 py-6 rounded-full font-bold uppercase tracking-[0.8em] text-[10px]">
               Request Your Itinerary
            </Link>
         </div>
      </section>
    </div>
  );
};

export default Home;