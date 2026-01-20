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
      <section className="min-h-screen pt-48 md:pt-64 pb-32 px-6 relative flex flex-col items-center">
        {/* Geometric Background Element */}
        <div className="absolute top-0 right-0 w-1/3 h-screen bg-slate-100/40 -z-10 hidden lg:block"></div>
        
        <div className="max-w-[1440px] w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-center relative z-10">
          <div className="lg:col-span-8 reveal">
            <span className="text-[10px] font-bold uppercase tracking-[0.8em] text-amber-500 mb-12 block">A Private Boutique Collection</span>
            <h1 className="text-6xl md:text-8xl lg:text-[11rem] font-serif font-bold text-slate-900 mb-14 leading-[0.8] tracking-tighter italic text-liquid">
              Maldivian <br /> 
              <span className="text-sky-500 not-italic ml-0 lg:ml-32">Stillness.</span>
            </h1>
            <div className="max-w-md lg:ml-32">
              <p className="text-slate-400 text-sm md:text-base font-medium uppercase tracking-[0.25em] leading-loose mb-14">
                Curating the gap between architectural perfection and raw island nature. Bespoke travel for the modern minimalist.
              </p>
              <Link to="/stays" className="btn-luxury">
                Explore The Portfolio
              </Link>
            </div>
          </div>
          
          <div className="lg:col-span-4 relative mt-12 lg:mt-0 reveal delay-500">
            <div className="aspect-[3/4] overflow-hidden shadow-[60px_60px_100px_rgba(0,0,0,0.08)] rounded-t-[18rem] rounded-b-[3rem] img-zoom-container relative">
              <img 
                src="https://images.unsplash.com/photo-1544550581-5f7ceaf7f992?auto=format&fit=crop&q=80&w=1200" 
                className="w-full h-full object-cover" 
                alt="Luxury Sanctuary"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/20 to-transparent"></div>
            </div>
            {/* Floating Editorial Card */}
            <div className="absolute -bottom-16 -left-16 w-56 h-56 bg-white p-6 rounded-[5rem] shadow-[0_40px_80px_-15px_rgba(0,0,0,0.1)] hidden lg:flex items-center justify-center text-center reveal delay-1000">
               <div className="w-full h-full border border-slate-50 rounded-[4.5rem] flex flex-col items-center justify-center p-4">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-slate-300 mb-3">Est.</span>
                  <span className="text-3xl font-serif italic text-slate-900">2012</span>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy: Architectural Spacing */}
      <section className="py-48 md:py-96 bg-white border-y border-slate-50 relative overflow-hidden">
        <div className="max-w-5xl mx-auto px-6 text-center reveal">
           <p className="text-4xl md:text-7xl font-serif font-bold text-slate-900 leading-[1.2] mb-16 italic tracking-tight">
             "Luxury is not about abundance, but the curated <span className="text-sky-500">absence</span> of noise."
           </p>
           <div className="w-32 h-px bg-amber-500 mx-auto mb-16"></div>
           <p className="text-slate-400 text-[11px] font-bold uppercase tracking-[0.7em] max-w-2xl mx-auto leading-[2.5]">
             Every island in our collection is hand-vetted for its spatial intelligence and commitment to absolute tranquility.
           </p>
        </div>
        {/* Large Faded Watermark */}
        <div className="absolute bottom-[-10%] left-[-5%] text-[20rem] font-serif font-bold italic text-slate-50 opacity-40 select-none pointer-events-none">Silence</div>
      </section>

      {/* Featured Sancturary: High-Contrast Layout */}
      <section className="py-32 md:py-64 px-6 bg-[#FCFAF7]">
        <div className="max-w-[1440px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-40 items-start">
            
            {/* Left: Dominant Editorial Visual */}
            <div className="lg:col-span-7 reveal">
              <Link to={`/stays/${mainFeatured.slug}`} className="group block relative">
                <div className="aspect-[14/10] overflow-hidden rounded-[3rem] lg:rounded-[6rem] mb-20 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.15)] group-hover:shadow-sky-200/50 transition-all duration-1000 img-zoom-container">
                  <img src={mainFeatured.images[0]} className="w-full h-full object-cover" alt={mainFeatured.name} />
                  <div className="absolute top-16 left-16 bg-white/95 backdrop-blur-xl px-10 py-4 rounded-full text-[11px] font-bold uppercase tracking-[0.4em] text-sky-600 shadow-2xl">
                    Signature Selection
                  </div>
                </div>
                <div className="lg:pl-20">
                  <h3 className="text-5xl md:text-[7rem] font-serif font-bold text-slate-900 mb-10 tracking-tighter italic group-hover:translate-x-6 transition-transform duration-1000">
                    {mainFeatured.name}
                  </h3>
                  <p className="text-slate-500 text-xl md:text-3xl leading-relaxed mb-16 max-w-xl font-medium opacity-80">
                    {mainFeatured.shortDescription}
                  </p>
                  <div className="flex items-center gap-16 border-t border-slate-100 pt-12">
                    <span className="text-[11px] font-bold text-amber-500 uppercase tracking-[0.5em]">Request Profile</span>
                    <div className="h-px bg-slate-200 flex-grow origin-left scale-x-50 group-hover:scale-x-100 transition-transform duration-1000"></div>
                  </div>
                </div>
              </Link>
            </div>

            {/* Right: Vertical Compositional Break */}
            <div className="lg:col-span-5 space-y-40 lg:pt-64">
              {sideFeatured.map((resort, idx) => (
                <Link to={`/stays/${resort.slug}`} key={resort.id} className="group block reveal">
                  <div className="flex gap-12 items-center">
                    <div className="w-40 h-40 md:w-64 md:h-64 flex-shrink-0 rounded-[4rem] overflow-hidden shadow-2xl img-zoom-container">
                      <img src={resort.images[0]} className="w-full h-full object-cover" alt={resort.name} />
                    </div>
                    <div>
                      <span className="text-[9px] font-bold text-slate-300 uppercase tracking-[0.6em] mb-4 block">{resort.atoll}</span>
                      <h4 className="text-3xl md:text-5xl font-serif font-bold text-slate-900 mb-6 group-hover:italic transition-all leading-tight tracking-tight">{resort.name}</h4>
                      <span className="text-[10px] font-bold text-sky-500 uppercase tracking-[0.3em] border-b border-sky-100 pb-2">View Retreat</span>
                    </div>
                  </div>
                </Link>
              ))}
              
              <div className="pt-20 reveal">
                 <Link to="/stays" className="block text-center py-16 bg-slate-950 rounded-[4rem] text-white hover:bg-sky-500 transition-all shadow-[0_40px_80px_-15px_rgba(0,0,0,0.3)] group overflow-hidden relative">
                   <span className="relative z-10 text-[11px] font-bold uppercase tracking-[0.7em]">Full Portfolio Archives</span>
                   <div className="absolute inset-0 bg-sky-400 translate-y-full group-hover:translate-y-0 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"></div>
                 </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Dark Section: Destination Intelligence */}
      <section className="py-48 md:py-80 bg-slate-950 text-white relative overflow-hidden">
        {/* Subtle Architectural Overlay */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
           <div className="absolute top-0 left-0 w-full h-full border-[100px] border-white rounded-[50%] -translate-y-1/2 -translate-x-1/2"></div>
        </div>

        <div className="max-w-[1440px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-32 items-center relative z-10">
           <div className="reveal">
              <span className="text-[11px] font-bold uppercase tracking-[1em] text-sky-400 mb-12 block">The Intelligence Unit</span>
              <h2 className="text-6xl md:text-[9rem] font-serif font-bold italic mb-14 leading-[0.85] tracking-tighter">Beyond <br/> The Map.</h2>
              <p className="text-slate-400 text-xl md:text-2xl leading-relaxed mb-20 max-w-xl font-medium">
                We are a private boutique agency. Every itinerary is crafted by specialists who have spent years living within the atolls they curate.
              </p>
              <Link to="/plan" className="btn-luxury bg-white text-slate-950 hover:bg-sky-400 px-20 py-8 rounded-full">
                Request Private Access
              </Link>
           </div>
           
           <div className="grid grid-cols-2 gap-10 reveal-left delay-500">
              <div className="space-y-10 mt-20">
                 <div className="aspect-square bg-white/5 backdrop-blur-2xl rounded-[4rem] p-12 flex flex-col justify-end border border-white/10 hover:border-sky-500 transition-colors">
                    <span className="text-5xl font-serif italic mb-6">12</span>
                    <span className="text-[11px] font-bold uppercase tracking-[0.4em] text-slate-500">Atolls Mastered</span>
                 </div>
                 <div className="aspect-[4/5] bg-sky-500 rounded-[4rem] p-12 flex flex-col justify-end shadow-3xl">
                    <span className="text-5xl font-serif italic mb-6">Privé</span>
                    <span className="text-[11px] font-bold uppercase tracking-[0.4em] text-white/90">Exclusive Access</span>
                 </div>
              </div>
              <div className="space-y-10">
                 <div className="aspect-[3/4] overflow-hidden rounded-[4rem] shadow-2xl img-zoom-container">
                    <img src="https://images.unsplash.com/photo-1510011564758-29df30730163?auto=format&fit=crop&q=80&w=800" className="w-full h-full object-cover" alt="Concierge" />
                 </div>
                 <div className="aspect-square bg-slate-900 rounded-[4rem] p-12 flex flex-col justify-end border border-white/5">
                    <span className="text-5xl font-serif italic mb-6">24/7</span>
                    <span className="text-[11px] font-bold uppercase tracking-[0.4em] text-slate-500">Butler Support</span>
                 </div>
              </div>
           </div>
        </div>
      </section>

      {/* Offers: Staggered Dynamic Grid */}
      <section className="py-32 md:py-64 bg-[#FCFAF7]">
        <div className="max-w-[1440px] mx-auto px-6">
           <div className="flex flex-col md:flex-row justify-between items-baseline mb-32 reveal">
              <h2 className="text-6xl md:text-[8rem] font-serif font-bold text-slate-900 italic tracking-tighter leading-none">Incentives</h2>
              <span className="text-[11px] font-bold uppercase tracking-[0.5em] text-slate-300 mt-6 md:mt-0">Refined for the season</span>
           </div>
           
           <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 lg:gap-24">
              {recentOffers.map((offer, idx) => (
                <Link to="/offers" key={offer.id} className={`group reveal ${idx === 1 ? 'lg:mt-32' : ''} ${idx === 2 ? 'lg:mt-64' : ''}`}>
                   <div className="bg-white p-10 rounded-[5rem] shadow-[0_10px_40px_-15px_rgba(0,0,0,0.05)] hover:shadow-[0_60px_100px_-20px_rgba(0,0,0,0.1)] transition-all duration-1000">
                      <div className="aspect-[4/5] overflow-hidden rounded-[4rem] mb-12 relative img-zoom-container">
                        <img src={offer.image} className="w-full h-full object-cover" alt={offer.title} />
                        <div className="absolute bottom-12 left-12 bg-slate-950 text-white px-8 py-3 rounded-full text-[10px] font-bold uppercase tracking-[0.3em] shadow-2xl">
                           {offer.discount}
                        </div>
                      </div>
                      <div className="px-6">
                        <span className="text-[10px] font-bold text-amber-500 uppercase tracking-[0.5em] mb-6 block">{offer.resortName}</span>
                        <h3 className="text-3xl md:text-4xl font-serif font-bold text-slate-900 mb-10 leading-tight group-hover:italic transition-all">{offer.title}</h3>
                        <div className="flex justify-between items-center text-[10px] font-bold text-slate-300 uppercase tracking-[0.4em] border-t border-slate-50 pt-10">
                           <span>Negotiated Rate</span>
                           <span className="text-sky-500 opacity-0 group-hover:opacity-100 translate-x-4 group-hover:translate-x-0 transition-all">Request →</span>
                        </div>
                      </div>
                   </div>
                </Link>
              ))}
           </div>
        </div>
      </section>

      {/* Journal: Minimalist Reveal */}
      <section className="py-48 md:py-96 bg-white border-t border-slate-50">
        <div className="max-w-6xl mx-auto px-6">
           <div className="text-center mb-40 reveal">
              <span className="text-[11px] font-bold uppercase tracking-[1em] text-sky-500 mb-10 block">Atoll Insights</span>
              <h2 className="text-6xl md:text-[9rem] font-serif font-bold italic text-slate-900 tracking-tighter">Journal</h2>
           </div>
           
           <div className="divide-y divide-slate-100">
             {BLOG_POSTS.slice(0, 3).map((post) => (
               <Link to={`/stories/${post.slug}`} key={post.id} className="group block py-20 reveal">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-16 group">
                     <div className="flex-grow">
                        <span className="text-[10px] font-bold text-slate-300 uppercase tracking-[0.5em] mb-6 block">{post.date}</span>
                        <h3 className="text-4xl md:text-7xl font-serif font-bold text-slate-900 italic transition-all duration-700 group-hover:translate-x-12 group-hover:text-sky-500 tracking-tighter">
                          {post.title}
                        </h3>
                     </div>
                     <div className="w-full md:w-80 h-56 rounded-[3rem] overflow-hidden opacity-0 group-hover:opacity-100 transition-all duration-1000 translate-x-20 group-hover:translate-x-0 hidden md:block shadow-2xl">
                        <img src={post.image} className="w-full h-full object-cover" alt={post.title} />
                     </div>
                  </div>
               </Link>
             ))}
           </div>
           
           <div className="mt-32 text-center reveal">
              <Link to="/stories" className="text-[12px] font-bold uppercase tracking-[0.6em] text-slate-400 hover:text-slate-950 border-b border-transparent hover:border-slate-950 pb-3 transition-all duration-500">
                Access Full Archives
              </Link>
           </div>
        </div>
      </section>

      {/* Signature CTA */}
      <section className="py-48 md:py-96 px-6 text-center reveal relative">
         <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none select-none">
            <h2 className="text-[20rem] md:text-[45rem] font-serif font-bold italic tracking-tighter">Perspective</h2>
         </div>
         <div className="relative z-10 max-w-5xl mx-auto">
            <h2 className="text-6xl md:text-[11rem] font-serif font-bold text-slate-900 mb-20 italic tracking-tighter leading-[0.85] text-liquid">
              Defined by <br/> <span className="text-sky-500 not-italic">Perspective.</span>
            </h2>
            <Link to="/plan" className="btn-luxury px-24 py-10 rounded-full font-bold uppercase tracking-[0.8em] text-[12px]">
               Request Your Itinerary
            </Link>
         </div>
      </section>
    </div>
  );
};

export default Home;