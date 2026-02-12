
import React, { useEffect, useState, useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { supabase, mapResort, mapOffer } from '../lib/supabase';
import { RESORTS, OFFERS, EXPERIENCES, BLOG_POSTS } from '../constants';
import { Accommodation, Offer, Experience, BlogPost } from '../types';
import ResortCard from '../components/ResortCard';
import SEO from '../components/SEO';

const SearchPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  
  const [loading, setLoading] = useState(true);
  const [resorts, setResorts] = useState<Accommodation[]>([]);
  const [offers, setOffers] = useState<Offer[]>([]);
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [stories, setStories] = useState<BlogPost[]>([]);

  useEffect(() => {
    const fetchAllData = async () => {
      setLoading(true);
      try {
        // Fetch Stays
        const { data: resortsData } = await supabase.from('resorts').select('*');
        const stays = resortsData ? resortsData.map(mapResort) : RESORTS;
        
        // Fetch Offers
        const { data: offersData } = await supabase.from('offers').select('*, resorts(slug)');
        const dealList = offersData ? offersData.map(mapOffer) : OFFERS;
        
        // Fetch Experiences
        const { data: expData } = await supabase.from('experiences').select('*, resorts(id, name, slug)');
        const expList = expData ? expData.map(item => ({
          ...item,
          resortName: item.resorts?.name,
          resortSlug: item.resorts?.slug,
          resortId: item.resorts?.id
        })) as Experience[] : EXPERIENCES;

        // Fetch Stories
        const { data: storiesData } = await supabase.from('stories').select('*');
        const blogList = storiesData ? (storiesData as BlogPost[]) : (BLOG_POSTS as BlogPost[]);

        setResorts(stays);
        setOffers(dealList);
        setExperiences(expList);
        setStories(blogList);
      } catch (err) {
        console.error("Search fetch error:", err);
        setResorts(RESORTS);
        setOffers(OFFERS);
        setExperiences(EXPERIENCES);
        setStories(BLOG_POSTS as BlogPost[]);
      } finally {
        setLoading(false);
      }
    };

    fetchAllData();
  }, []);

  const filtered = useMemo(() => {
    const q = query.toLowerCase();
    return {
      stays: resorts.filter(r => 
        r.name.toLowerCase().includes(q) || 
        r.atoll.toLowerCase().includes(q) || 
        r.features.some(f => f.toLowerCase().includes(q))
      ),
      offers: offers.filter(o => 
        o.title.toLowerCase().includes(q) || 
        o.resortName.toLowerCase().includes(q)
      ),
      experiences: experiences.filter(e => 
        e.title.toLowerCase().includes(q) || 
        e.category.toLowerCase().includes(q) || 
        e.description.toLowerCase().includes(q)
      ),
      stories: stories.filter(s => 
        s.title.toLowerCase().includes(q) || 
        s.excerpt.toLowerCase().includes(q) || 
        s.category.toLowerCase().includes(q)
      )
    };
  }, [query, resorts, offers, experiences, stories]);

  const totalResults = filtered.stays.length + filtered.offers.length + filtered.experiences.length + filtered.stories.length;

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('active');
      });
    }, { threshold: 0.1 });
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, [loading, filtered]);

  return (
    <div className="bg-[#FCFAF7] min-h-screen selection:bg-sky-100 selection:text-sky-900 pb-32 overflow-x-hidden">
      <SEO 
        title={`Search results for "${query}" | Serenity Discovery`} 
        description={`Unified discovery results for ${query} across Maldivian resorts, offers, experiences, and editorial stories.`}
      />

      {/* Cinematic Header */}
      <section className="relative h-[40vh] md:h-[50vh] flex items-center justify-center overflow-hidden bg-slate-900">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&q=90&w=1920" 
            className="w-full h-full object-cover opacity-40 scale-105" 
            alt="Maldives Search"
          />
        </div>
        <div className="relative z-10 text-center px-6 reveal active">
          <span className="text-[10px] font-black text-sky-400 uppercase tracking-[1em] mb-8 block">Universal Search</span>
          <h1 className="text-4xl md:text-7xl font-serif font-bold text-white tracking-tighter italic leading-none">
            Exploring: "{query}"
          </h1>
          <div className="h-px w-20 bg-amber-400 mx-auto mt-10 mb-10"></div>
          <p className="text-white text-[10px] font-bold uppercase tracking-[0.5em] opacity-80">
            {loading ? 'Consulting the Atolls...' : `${totalResults} Results found in the Archive.`}
          </p>
        </div>
      </section>

      {loading ? (
        <div className="py-48 flex flex-col items-center justify-center">
          <div className="w-10 h-10 border-2 border-slate-100 border-t-sky-500 rounded-full animate-spin mb-8"></div>
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Accessing Digital Records...</p>
        </div>
      ) : totalResults > 0 ? (
        <main className="max-w-[1440px] mx-auto px-6 lg:px-12 py-24 space-y-32">
          
          {/* Section: STAYS */}
          {filtered.stays.length > 0 && (
            <section className="reveal">
              <div className="flex flex-col md:flex-row justify-between items-end gap-10 mb-16 border-b border-slate-100 pb-12">
                <div className="max-w-xl">
                  <span className="text-[10px] font-black text-sky-500 uppercase tracking-[0.8em] mb-4 block">Portfolio</span>
                  <h2 className="text-4xl md:text-6xl font-serif font-bold italic text-slate-900 tracking-tighter">Iconic Stays.</h2>
                </div>
                <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">{filtered.stays.length} Matches</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-20">
                {filtered.stays.map(stay => (
                  <ResortCard key={stay.id} resort={stay} />
                ))}
              </div>
            </section>
          )}

          {/* Section: OFFERS */}
          {filtered.offers.length > 0 && (
            <section className="reveal">
              <div className="flex flex-col md:flex-row justify-between items-end gap-10 mb-16 border-b border-slate-100 pb-12">
                <div className="max-w-xl">
                  <span className="text-[10px] font-black text-amber-500 uppercase tracking-[0.8em] mb-4 block">Privileges</span>
                  <h2 className="text-4xl md:text-6xl font-serif font-bold italic text-slate-900 tracking-tighter">Seasonal Offers.</h2>
                </div>
                <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">{filtered.offers.length} Matches</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {filtered.offers.map(offer => (
                  <Link key={offer.id} to={`/stays/${offer.resortSlug}`} className="group flex flex-col h-full bg-white rounded-[2.5rem] p-6 shadow-sm border border-slate-50 hover:shadow-2xl transition-all duration-700">
                    <div className="aspect-square rounded-[2rem] overflow-hidden mb-6 bg-slate-100">
                      <img src={offer.image} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-[4s]" alt={offer.title} />
                    </div>
                    <StarRating count={offer.rating} />
                    <h3 className="text-xl font-serif font-bold text-slate-950 mb-4 leading-tight group-hover:text-sky-600 transition-colors line-clamp-2">{offer.title}</h3>
                    <div className="mt-auto pt-6 border-t border-slate-50 flex justify-between items-center">
                      <span className="text-[9px] font-black uppercase tracking-widest text-amber-600">{offer.discount}</span>
                      <span className="text-[9px] font-black uppercase tracking-widest text-slate-400">Refine discovery →</span>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )}

          {/* Section: EXPERIENCES */}
          {filtered.experiences.length > 0 && (
            <section className="reveal">
              <div className="flex flex-col md:flex-row justify-between items-end gap-10 mb-16 border-b border-slate-100 pb-12">
                <div className="max-w-xl">
                  <span className="text-[10px] font-black text-sky-500 uppercase tracking-[0.8em] mb-4 block">Activities</span>
                  <h2 className="text-4xl md:text-6xl font-serif font-bold italic text-slate-900 tracking-tighter">Journeys & Discovery.</h2>
                </div>
                <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">{filtered.experiences.length} Matches</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                {filtered.experiences.map(exp => (
                  <div key={exp.id} className="group flex flex-col">
                    <div className="aspect-[4/3] rounded-[3rem] overflow-hidden mb-8 shadow-sm group-hover:shadow-xl transition-all duration-700">
                      <img src={exp.image} className="w-full h-full object-cover transition-transform duration-[6s] group-hover:scale-110" alt={exp.title} />
                    </div>
                    <div className="px-2">
                      <span className="text-[8px] font-black text-sky-500 uppercase tracking-widest block mb-4">{exp.category}</span>
                      <h3 className="text-2xl font-serif font-bold text-slate-950 mb-6 group-hover:italic transition-all leading-tight">{exp.title}</h3>
                      <p className="text-slate-500 text-[12px] leading-relaxed line-clamp-2 mb-8">{exp.description}</p>
                      <Link to="/plan" className="text-[9px] font-black text-slate-950 uppercase tracking-[0.4em] border-b border-slate-950 pb-1">Request Journey</Link>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Section: STORIES */}
          {filtered.stories.length > 0 && (
            <section className="reveal">
              <div className="flex flex-col md:flex-row justify-between items-end gap-10 mb-16 border-b border-slate-100 pb-12">
                <div className="max-w-xl">
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.8em] mb-4 block">Editorial</span>
                  <h2 className="text-4xl md:text-6xl font-serif font-bold italic text-slate-900 tracking-tighter">The Journal Archive.</h2>
                </div>
                <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">{filtered.stories.length} Matches</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                {filtered.stories.map(post => (
                  <Link key={post.id} to={`/stories/${post.slug}`} className="group flex flex-col md:flex-row gap-8 items-center">
                    <div className="w-full md:w-1/3 aspect-square rounded-[2rem] overflow-hidden flex-shrink-0 bg-slate-100 shadow-sm transition-all group-hover:shadow-2xl">
                      <img src={post.image} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-[3s]" alt={post.title} />
                    </div>
                    <div className="flex-1">
                      <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest block mb-4">{post.category} • {new Date(post.date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}</span>
                      <h3 className="text-2xl md:text-3xl font-serif font-bold text-slate-950 mb-4 leading-tight group-hover:italic transition-all">{post.title}</h3>
                      <p className="text-slate-500 text-[12px] leading-relaxed line-clamp-2 mb-6">{post.excerpt}</p>
                      <span className="text-[9px] font-black text-slate-900 uppercase tracking-[0.5em] border-b border-transparent group-hover:border-slate-900 pb-1 transition-all">Read Story →</span>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )}

        </main>
      ) : (
        <div className="py-48 text-center px-6 reveal active">
          <h2 className="text-3xl md:text-6xl font-serif font-bold text-slate-900 italic tracking-tighter mb-8">Quiet in the Archives.</h2>
          <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.4em] mb-12 leading-loose max-w-lg mx-auto">
            Your inquiry for "{query}" did not reveal any records in our digital sanctuary. Try a more general term or consult our specialists.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Link to="/" className="bg-slate-950 text-white font-black px-12 py-6 rounded-full text-[10px] uppercase tracking-[0.5em] hover:bg-sky-500 transition-all shadow-xl">Return Home</Link>
            <Link to="/plan" className="text-[10px] font-black text-slate-900 uppercase tracking-[0.5em] border-b border-slate-950 pb-2">Consult an Expert</Link>
          </div>
        </div>
      )}

      {/* Final CTA Footer */}
      <section className="py-24 bg-white border-t border-slate-100 text-center">
        <div className="max-w-4xl mx-auto px-6 reveal">
          <span className="text-[10px] font-black text-slate-400 uppercase tracking-[1em] mb-12 block">Defining Your Perspective</span>
          <h3 className="text-4xl md:text-7xl font-serif font-bold italic mb-12 text-slate-950 tracking-tighter leading-tight">Beyond Search.</h3>
          <Link to="/plan" className="inline-block bg-slate-950 text-white font-black px-16 py-7 rounded-full hover:bg-sky-500 transition-all duration-700 shadow-2xl uppercase tracking-[0.8em] text-[10px]">
             Request Custom Portfolio
          </Link>
        </div>
      </section>
    </div>
  );
};

const StarRating = ({ count }: { count: number }) => (
  <div className="flex gap-0.5 mb-3">
    {Array.from({ length: 5 }).map((_, i) => (
      <svg 
        key={i} 
        className={`w-3 h-3 ${i < count ? 'text-amber-400 fill-current' : 'text-slate-200 fill-current'}`} 
        viewBox="0 0 24 24"
      >
        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
      </svg>
    ))}
  </div>
);

export default SearchPage;
