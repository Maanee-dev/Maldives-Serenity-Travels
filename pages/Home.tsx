import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { RESORTS, OFFERS, BLOG_POSTS } from '../constants';

const Home: React.FC = () => {
  const featuredResorts = RESORTS.slice(0, 3);
  const mainFeatured = featuredResorts[0];
  const sideFeatured = featuredResorts.slice(1, 3);
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
      {/* Hero Section: Architectural Asymmetry */}
      <section className="min-h-screen pt-48 md:pt-64 pb-32 px-6 relative flex flex-col items-center overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-1/3 h-screen bg-slate-100/50 -z-10 hidden lg:block"></div>
        
        <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-center reveal">
          <div className="lg:col-span-8 z-10">
            <span className="text-[10px] font-bold uppercase tracking-[0.8em] text-amber-500 mb-10 block">The Art of Arrival</span>
            <h1 className="text-6xl md:text-8xl lg:text-[10rem] font-serif font-bold text-slate-900 mb-12 leading-[0.8] tracking-tighter italic">
              Maldivian <br /> 
              <span className="text-sky-500 not-italic ml-0 lg:ml-24">Stillness.</span>
            </h1>
            <div className="max-w-md lg:ml-24">
              <p className="text-slate-400 text-sm md:text-base font-medium uppercase tracking-[0.2em] leading-loose mb-12">
                Bespoke travel curation for the modern minimalist. We bridge the gap between architectural excellence and raw island nature.
              </p>
              <Link to="/stays" className="btn-luxury px-16 py-6 rounded-full text-[10px] font-bold uppercase tracking-[0.5em] inline-block shadow-2xl">
                Explore The Portfolio
              </Link>
            </div>
          </div>
          
          <div className="lg:col-span-4 relative mt-12 lg:mt-0">
            <div className="aspect-[3/4] overflow-hidden shadow-[40px_40px_80px_rgba(0,0,0,0.1)] rounded-t-[10rem] rounded-b-[2rem]">
              <img 
                src="https://images.unsplash.com/photo-1544550581-5f7ceaf7f992?auto=format&fit=crop&q=80&w=1200" 
                className="w-full h-full object-cover transition-transform duration-[5s] hover:scale-110" 
                alt="Luxury Sanctuary"
              />
            </div>
            {/* Floating Detail */}
            <div className="absolute -bottom-12 -right-12 w-48 h-48 bg-white p-4 rounded-[4rem] shadow-2xl hidden lg:flex items-center justify-center text-center reveal delay-700">
               <div className="w-full h-full border border-slate-50 rounded-[3.5rem] flex flex-col items-center justify-center p-4">
                  <span className="text-[9px] font-bold uppercase tracking-widest text-slate-300 mb-2">Since</span>
                  <span className="text-xl font-serif italic text-slate-900">2012</span>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy: Generous White Space */}
      <section className="py-40 md:py-80 bg-white border-y border-slate-50 relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-6 text-center reveal">
           <p className="text-3xl md:text-6xl font-serif font-bold text-slate-900 leading-[1.3] mb-12 italic tracking-tight">
             "Luxury is not about abundance, but the curated absence of noise."
           </p>
           <div className="w-24 h-px bg-amber-500 mx-auto mb-12"></div>
           <p className="text-slate-400 text-xs font-bold uppercase tracking-[0.6em] max-w-xl mx-auto leading-loose">
             Every island in our collection is hand-vetted for its spatial intelligence and commitment to tranquility.
           </p>
        </div>
      </section>

      {/* Featured Sanctuary: Editorial Split */}
      <section className="py-32 md:py-64 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-32 items-start">
            
            {/* Main Editorial Feature */}
            <div className="lg:col-span-7 reveal">
              <Link to={`/stays/${mainFeatured.slug}`} className="group block relative">
                <div className="aspect-[16/10] overflow-hidden rounded-[2rem] lg:rounded-[5rem] mb-16 shadow-2xl transition-all duration-700 group-hover:shadow-sky-200">
                  <img src={mainFeatured.images[0]} className="w-full h-full object-cover transition-transform duration-[3s] group-hover:scale-105" alt={mainFeatured.name} />
                  <div className="absolute top-12 left-12 bg-white/90 backdrop-blur-md px-8 py-3 rounded-full text-[10px] font-bold uppercase tracking-[0.3em] text-sky-500 shadow-lg">
                    Editor's Selection
                  </div>
                </div>
                <div className="lg:pl-12">
                  <h3 className="text-5xl md:text-7xl font-serif font-bold text-slate-900 mb-8 tracking-tighter italic group-hover:translate-x-4 transition-transform duration-700">
                    {mainFeatured.name}
                  </h3>
                  <p className="text-slate-500 text-lg md:text-xl leading-relaxed mb-12 max-w-xl">
                    {mainFeatured.shortDescription} {mainFeatured.description.slice(0, 100)}...
                  </p>
                  <div className="flex items-center gap-12 border-t border-slate-100 pt-10">
                    <span className="text-[10px] font-bold text-amber-500 uppercase tracking-[0.4em]">View Profile</span>
                    <div className="h-px bg-slate-200 flex-grow"></div>
                  </div>
                </div>
              </Link>
            </div>

            {/* Side Column: The Supporting Cast */}
            <div className="lg:col-span-5 space-y-32 lg:pt-48">
              {sideFeatured.map((resort, idx) => (
                <Link to={`/stays/${resort.slug}`} key={resort.id} className="group block reveal">
                  <div className="flex gap-10 items-center">
                    <div className="w-32 h-32 md:w-48 md:h-48 flex-shrink-0 rounded-[2.5rem] overflow-hidden shadow-xl">
                      <img src={resort.images[0]} className="w-full h-full object-cover group-hover:scale-110 transition-all duration-700" alt={resort.name} />
                    </div>
                    <div>
                      <span className="text-[8px] font-bold text-slate-300 uppercase tracking-[0.5em] mb-3 block">{resort.atoll}</span>
                      <h4 className="text-2xl md:text-3xl font-serif font-bold text-slate-900 mb-4 group-hover:italic transition-all">{resort.name}</h4>
                      <span className="text-[9px] font-bold text-sky-500 uppercase tracking-widest border-b border-sky-100 pb-1">Read More</span>
                    </div>
                  </div>
                </Link>
              ))}
              
              <div className="pt-12 reveal">
                 <Link to="/stays" className="block text-center p-12 bg-slate-900 rounded-[3.5rem] text-white hover:bg-sky-500 transition-all shadow-2xl">
                   <span className="text-[10px] font-bold uppercase tracking-[0.6em]">View The Full Collection</span>
                 </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Dark Mode Break: The Specialists */}
      <section className="py-40 md:py-64 bg-slate-950 text-white relative overflow-hidden">
        {/* Subtle texture or graphic */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-[-20%] left-[-10%] w-[80%] h-[140%] border border-white/20 rounded-[50%] rotate-12"></div>
        </div>

        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-32 items-center relative z-10">
           <div className="reveal">
              <span className="text-[10px] font-bold uppercase tracking-[0.8em] text-sky-400 mb-10 block">Destination Intelligence</span>
              <h2 className="text-5xl md:text-8xl font-serif font-bold italic mb-12 leading-[0.9] tracking-tighter">Beyond the <br/> Booking.</h2>
              <p className="text-slate-400 text-lg md:text-xl leading-relaxed mb-16 max-w-lg font-medium">
                We are a private boutique agency. Every itinerary is crafted by specialists who have personal relationships with every resort GM and island council in our portfolio.
              </p>
              <Link to="/plan" className="btn-luxury bg-white text-slate-950 hover:bg-sky-400 px-16 py-6 rounded-full inline-block">
                Request Concierge Access
              </Link>
           </div>
           
           <div className="grid grid-cols-2 gap-8 reveal delay-500">
              <div className="space-y-8 mt-12">
                 <div className="aspect-square bg-white/5 backdrop-blur-3xl rounded-[3rem] p-10 flex flex-col justify-end border border-white/10 hover:border-sky-500 transition-colors">
                    <span className="text-4xl font-serif italic mb-4">12</span>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Atolls Covered</span>
                 </div>
                 <div className="aspect-[4/5] bg-sky-500 rounded-[3rem] p-10 flex flex-col justify-end shadow-2xl">
                    <span className="text-4xl font-serif italic mb-4">Privé</span>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-white/80">Sandbank Access</span>
                 </div>
              </div>
              <div className="space-y-8">
                 <div className="aspect-[3/4] overflow-hidden rounded-[3rem] shadow-2xl">
                    <img src="https://images.unsplash.com/photo-1510011564758-29df30730163?auto=format&fit=crop&q=80&w=800" className="w-full h-full object-cover" alt="Concierge" />
                 </div>
                 <div className="aspect-square bg-slate-900 rounded-[3rem] p-10 flex flex-col justify-end border border-white/5">
                    <span className="text-4xl font-serif italic mb-4">24/7</span>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">WhatsApp Butler</span>
                 </div>
              </div>
           </div>
        </div>
      </section>

      {/* Offers: Staggered Visual Rhythm */}
      <section className="py-32 md:py-64 bg-[#FCFAF7] overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
           <div className="flex flex-col md:flex-row justify-between items-baseline mb-24 reveal">
              <h2 className="text-5xl md:text-8xl font-serif font-bold text-slate-900 italic tracking-tighter">Private Incentives</h2>
              <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-slate-300 mt-4 md:mt-0">Refined for the season</span>
           </div>
           
           <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-20">
              {recentOffers.map((offer, idx) => (
                <Link to="/offers" key={offer.id} className={`group reveal ${idx === 1 ? 'lg:mt-24' : ''} ${idx === 2 ? 'lg:mt-48' : ''}`}>
                   <div className="bg-white p-8 rounded-[4rem] shadow-sm hover:shadow-2xl transition-all duration-700">
                      <div className="aspect-[4/5] overflow-hidden rounded-[3rem] mb-10 relative">
                        <img src={offer.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[3s]" alt={offer.title} />
                        <div className="absolute bottom-10 left-10 bg-slate-950 text-white px-6 py-3 rounded-full text-[10px] font-bold uppercase tracking-widest shadow-2xl">
                           {offer.discount}
                        </div>
                      </div>
                      <div className="px-4">
                        <span className="text-[9px] font-bold text-amber-500 uppercase tracking-[0.5em] mb-4 block">{offer.resortName}</span>
                        <h3 className="text-3xl font-serif font-bold text-slate-900 mb-8 leading-tight group-hover:italic">{offer.title}</h3>
                        <div className="flex justify-between items-center text-[10px] font-bold text-slate-300 uppercase tracking-widest border-t border-slate-50 pt-8">
                           <span>Negotiated Rate</span>
                           <span className="text-slate-900 opacity-0 group-hover:opacity-100 transition-opacity">Request →</span>
                        </div>
                      </div>
                   </div>
                </Link>
              ))}
           </div>
        </div>
      </section>

      {/* Stories: Minimalist List Reveal */}
      <section className="py-40 md:py-80 bg-white border-t border-slate-50">
        <div className="max-w-5xl mx-auto px-6">
           <div className="text-center mb-32 reveal">
              <span className="text-[10px] font-bold uppercase tracking-[0.8em] text-sky-500 mb-8 block">Atoll Insights</span>
              <h2 className="text-5xl md:text-8xl font-serif font-bold italic text-slate-900 tracking-tighter">The Journal</h2>
           </div>
           
           <div className="divide-y divide-slate-100">
             {BLOG_POSTS.slice(0, 3).map((post, idx) => (
               <Link to={`/stories/${post.slug}`} key={post.id} className="group block py-16 reveal">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-12 group">
                     <div className="flex-grow">
                        <span className="text-[9px] font-bold text-slate-300 uppercase tracking-[0.4em] mb-4 block">{post.date}</span>
                        <h3 className="text-4xl md:text-6xl font-serif font-bold text-slate-900 italic transition-all duration-500 group-hover:translate-x-8 group-hover:text-sky-500">
                          {post.title}
                        </h3>
                     </div>
                     <div className="w-full md:w-64 h-40 rounded-[2rem] overflow-hidden opacity-0 group-hover:opacity-100 transition-all duration-700 translate-x-12 group-hover:translate-x-0 hidden md:block">
                        <img src={post.image} className="w-full h-full object-cover" alt={post.title} />
                     </div>
                  </div>
               </Link>
             ))}
           </div>
           
           <div className="mt-24 text-center reveal">
              <Link to="/stories" className="text-[11px] font-bold uppercase tracking-[0.5em] text-slate-400 hover:text-slate-900 border-b border-transparent hover:border-slate-900 pb-2 transition-all">
                Access All Archives
              </Link>
           </div>
        </div>
      </section>

      {/* Final Signature CTA */}
      <section className="py-40 md:py-80 px-6 text-center reveal relative">
         <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none">
            <h2 className="text-[15rem] md:text-[35rem] font-serif font-bold italic tracking-tighter select-none">Bespoke</h2>
         </div>
         <div className="relative z-10 max-w-4xl mx-auto">
            <h2 className="text-5xl md:text-9xl font-serif font-bold text-slate-900 mb-16 italic tracking-tighter leading-[0.85]">
              Defined by <br/> <span className="text-sky-500 not-italic">Perspective.</span>
            </h2>
            <Link to="/plan" className="btn-luxury px-20 py-8 rounded-full font-bold uppercase tracking-[0.6em] text-[11px] shadow-[0_30px_60px_-15px_rgba(14,165,233,0.4)]">
               Plan Your Journey
            </Link>
         </div>
      </section>
    </div>
  );
};

export default Home;
