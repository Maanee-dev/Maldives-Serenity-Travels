
import React, { useEffect, useState, useMemo } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { supabase, mapResort, mapOffer, mapExperience, mapStory } from '../lib/supabase';
import { Accommodation, Offer, Experience, BlogPost } from '../types';
import ResortCard from '../components/ResortCard';
import SEO from '../components/SEO';

type SearchCategory = 'All' | 'Stays' | 'Offers' | 'Journal' | 'Experiences';

const Search: React.FC = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const initialQuery = searchParams.get('q') || '';

  const [query, setQuery] = useState(initialQuery);
  const [activeTab, setActiveTab] = useState<SearchCategory>('All');
  const [loading, setLoading] = useState(false);

  const [resorts, setResorts] = useState<Accommodation[]>([]);
  const [offers, setOffers] = useState<Offer[]>([]);
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [stories, setStories] = useState<BlogPost[]>([]);

  const fetchData = async (searchTerm: string) => {
    if (!searchTerm.trim()) return;
    setLoading(true);
    try {
      const ilikeQuery = `%${searchTerm}%`;

      const [resRes, offRes, expRes, stoRes] = await Promise.all([
        supabase.from('resorts').select('*').or(`name.ilike.${ilikeQuery},atoll.ilike.${ilikeQuery},description.ilike.${ilikeQuery}`),
        supabase.from('offers').select('*, resorts(slug)').or(`title.ilike.${ilikeQuery},resort_name.ilike.${ilikeQuery}`),
        supabase.from('experiences').select('*, resorts(name)').or(`title.ilike.${ilikeQuery},description.ilike.${ilikeQuery}`),
        supabase.from('stories').select('*').or(`title.ilike.${ilikeQuery},excerpt.ilike.${ilikeQuery},content.ilike.${ilikeQuery}`)
      ]);

      setResorts((resRes.data || []).map(mapResort));
      setOffers((offRes.data || []).map(mapOffer));
      setExperiences((expRes.data || []).map(mapExperience));
      setStories((stoRes.data || []).map(mapStory));
    } catch (err) {
      console.error("Search failed:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(initialQuery);
  }, [initialQuery]);

  const totalResults = resorts.length + offers.length + experiences.length + stories.length;

  const categories: SearchCategory[] = ['All', 'Stays', 'Offers', 'Journal', 'Experiences'];

  return (
    <div className="bg-[#FCFAF7] min-h-screen pt-40 pb-32 selection:bg-sky-100">
      <SEO title={`Search: ${query} | Serenity Maldives`} description={`Results for ${query} across the Maldivian archipelago.`} />

      <div className="max-w-7xl mx-auto px-6">
        {/* Header Section */}
        <div className="mb-20 reveal active text-center">
          <span className="text-[10px] font-black text-sky-500 uppercase tracking-[1em] mb-8 block">Global Intelligence</span>
          <h1 className="text-4xl md:text-7xl font-serif font-bold italic tracking-tighter mb-12">Search Results.</h1>
          
          <div className="max-w-2xl mx-auto relative group">
            <input 
              type="text" 
              value={query} 
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && fetchData(query)}
              className="w-full bg-white border border-slate-100 rounded-full px-12 py-6 text-xl font-serif italic text-slate-900 shadow-sm focus:shadow-xl transition-all outline-none"
              placeholder="Refine your vision..."
            />
            <button 
              onClick={() => fetchData(query)}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-slate-950 text-white rounded-full flex items-center justify-center hover:bg-sky-500 transition-all"
            >
              &rarr;
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex justify-center gap-4 mb-20 overflow-x-auto no-scrollbar py-4 border-b border-slate-100">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveTab(cat)}
              className={`px-8 py-3 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === cat ? 'bg-slate-950 text-white shadow-xl' : 'text-slate-400 hover:text-slate-900 bg-white/50'}`}
            >
              {cat}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="py-32 text-center">
            <div className="w-10 h-10 border-2 border-slate-100 border-t-sky-500 rounded-full animate-spin mx-auto mb-8"></div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Consulting archives...</p>
          </div>
        ) : totalResults === 0 ? (
          <div className="py-32 text-center max-w-lg mx-auto">
             <h3 className="text-3xl font-serif font-bold italic mb-6">No archives matched.</h3>
             <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.4em] leading-loose">The atolls remain silent for this query. Try different coordinates.</p>
          </div>
        ) : (
          <div className="space-y-32">
            
            {/* Resorts Section */}
            {(activeTab === 'All' || activeTab === 'Stays') && resorts.length > 0 && (
              <section className="reveal active">
                <div className="flex justify-between items-end mb-12 border-b border-slate-100 pb-8">
                  <h2 className="text-2xl font-serif font-bold italic">Signature Stays ({resorts.length})</h2>
                  <Link to="/stays" className="text-[9px] font-black uppercase tracking-widest text-sky-500">Explore Stays</Link>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                  {resorts.map(r => <ResortCard key={r.id} resort={r} />)}
                </div>
              </section>
            )}

            {/* Offers Section */}
            {(activeTab === 'All' || activeTab === 'Offers') && offers.length > 0 && (
              <section className="reveal active">
                <div className="flex justify-between items-end mb-12 border-b border-slate-100 pb-8">
                  <h2 className="text-2xl font-serif font-bold italic">Bespoke Privileges ({offers.length})</h2>
                  <Link to="/offers" className="text-[9px] font-black uppercase tracking-widest text-sky-500">Explore Offers</Link>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                  {offers.map(o => (
                    <Link to={`/stays/${o.resortSlug}`} key={o.id} className="group flex flex-col">
                      <div className="aspect-[3/4] rounded-[2rem] overflow-hidden mb-6 bg-slate-100 relative">
                        <img src={o.image} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" alt="" />
                        <div className="absolute top-4 left-4">
                           <span className="bg-amber-400 text-[9px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full shadow-lg">{o.discount}</span>
                        </div>
                      </div>
                      <h4 className="text-lg font-serif font-bold mb-2 group-hover:text-sky-500 transition-colors">{o.title}</h4>
                      <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{o.resortName}</p>
                    </Link>
                  ))}
                </div>
              </section>
            )}

            {/* Experiences Section */}
            {(activeTab === 'All' || activeTab === 'Experiences') && experiences.length > 0 && (
              <section className="reveal active">
                <div className="flex justify-between items-end mb-12 border-b border-slate-100 pb-8">
                  <h2 className="text-2xl font-serif font-bold italic">Curated Living ({experiences.length})</h2>
                  <Link to="/experiences" className="text-[9px] font-black uppercase tracking-widest text-sky-500">Explore Experiences</Link>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                   {experiences.map(e => (
                     <div key={e.id} className="group p-8 bg-white rounded-[2.5rem] border border-slate-50 shadow-sm hover:shadow-xl transition-all duration-700">
                        <div className="aspect-[16/10] rounded-[2rem] overflow-hidden mb-8">
                           <img src={e.image} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000" alt="" />
                        </div>
                        <span className="text-sky-500 font-black text-[8px] uppercase tracking-widest mb-4 block">{e.category}</span>
                        <h4 className="text-xl font-serif font-bold mb-4 group-hover:italic transition-all">{e.title}</h4>
                        <p className="text-slate-500 text-sm leading-relaxed mb-6 font-medium line-clamp-2">{e.description}</p>
                        <div className="flex justify-between items-center pt-6 border-t border-slate-50">
                           <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{e.resortName || 'Regional Discovery'}</span>
                           <Link to="/plan" className="text-[9px] font-black text-slate-900 uppercase tracking-widest border-b border-slate-900 pb-0.5">Inquire</Link>
                        </div>
                     </div>
                   ))}
                </div>
              </section>
            )}

            {/* Stories Section */}
            {(activeTab === 'All' || activeTab === 'Journal') && stories.length > 0 && (
              <section className="reveal active">
                <div className="flex justify-between items-end mb-12 border-b border-slate-100 pb-8">
                  <h2 className="text-2xl font-serif font-bold italic">The Serenity Journal ({stories.length})</h2>
                  <Link to="/stories" className="text-[9px] font-black uppercase tracking-widest text-sky-500">Explore Stories</Link>
                </div>
                <div className="space-y-8">
                  {stories.map(s => (
                    <Link to={`/stories/${s.slug}`} key={s.id} className="flex gap-8 p-8 bg-white rounded-[3rem] border border-slate-50 group hover:shadow-2xl transition-all duration-700 items-center">
                       <div className="w-32 h-32 md:w-48 md:h-48 rounded-[2rem] overflow-hidden flex-shrink-0 bg-slate-100">
                          <img src={s.image} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" alt="" />
                       </div>
                       <div>
                          <span className="text-sky-500 font-black text-[8px] uppercase tracking-widest mb-4 block">{s.category}</span>
                          <h4 className="text-2xl md:text-3xl font-serif font-bold mb-4 group-hover:italic transition-all leading-tight">{s.title}</h4>
                          <p className="text-slate-500 text-sm md:text-lg line-clamp-2 font-medium italic opacity-80">{s.excerpt}</p>
                       </div>
                    </Link>
                  ))}
                </div>
              </section>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;
