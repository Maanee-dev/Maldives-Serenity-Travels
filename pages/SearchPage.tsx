import React, { useEffect, useState, useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { supabase, mapResort, mapOffer } from '../lib/supabase';
import { RESORTS, OFFERS, EXPERIENCES, BLOG_POSTS } from '../constants';
import { Accommodation, Offer, Experience, BlogPost } from '../types';
import ResortCard from '../components/ResortCard';
import SEO from '../components/SEO';

/**
 * Advanced Fuzzy Match Engine
 * Calculated character distance with token sensitivity.
 */
const isFuzzyMatch = (query: string, target: string): boolean => {
  if (!target) return false;
  const q = query.toLowerCase().trim();
  const t = target.toLowerCase().trim();
  
  // 1. Literal match or containment (Fast track)
  if (t.includes(q)) return true;

  const qTokens = q.split(/\s+/).filter(tk => tk.length > 2);
  const tTokens = t.split(/[\s,.-]+/).filter(tk => tk.length > 2);

  // 2. Cross-token distance checking
  return qTokens.some(qTk => {
    return tTokens.some(tTk => {
      const distance = levenshteinDistance(qTk, tTk);
      // Dynamic threshold based on length (allow 1 typo for 3-5 chars, 2 for 6+)
      const threshold = qTk.length > 5 ? 2 : 1;
      return distance <= threshold;
    });
  });
};

const levenshteinDistance = (a: string, b: string): number => {
  const tmp = [];
  let i, j, res;
  const alen = a.length;
  const blen = b.length;
  if (alen === 0) return blen;
  if (blen === 0) return alen;
  for (i = 0; i <= alen; i++) tmp[i] = [i];
  for (j = 0; j <= blen; j++) tmp[0][j] = j;
  for (i = 1; i <= alen; i++) {
    for (j = 1; j <= blen; j++) {
      res = a[i - 1] === b[j - 1] ? 0 : 1;
      tmp[i][j] = Math.min(tmp[i - 1][j] + 1, tmp[i][j - 1] + 1, tmp[i - 1][j - 1] + res);
    }
  }
  return tmp[alen][blen];
};

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
        const { data: resortsData } = await supabase.from('resorts').select('*');
        const stays = resortsData ? resortsData.map(mapResort) : RESORTS;
        
        const { data: offersData } = await supabase.from('offers').select('*, resorts(slug)');
        const dealList = offersData ? offersData.map(mapOffer) : OFFERS;
        
        const { data: expData } = await supabase.from('experiences').select('*, resorts(id, name, slug)');
        const expList = expData ? expData.map(item => ({
          ...item,
          resortName: item.resorts?.name,
          resortSlug: item.resorts?.slug,
          resortId: item.resorts?.id
        })) as Experience[] : EXPERIENCES;

        const { data: storiesData } = await supabase.from('stories').select('*');
        const blogList = storiesData ? (storiesData as BlogPost[]) : (BLOG_POSTS as BlogPost[]);

        setResorts(stays);
        setOffers(dealList);
        setExperiences(expList);
        setStories(blogList);
      } catch (err) {
        console.error("Search engine synchronization error:", err);
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
    if (!query) return { stays: [], offers: [], experiences: [], stories: [] };

    return {
      stays: resorts.filter(r => 
        isFuzzyMatch(query, r.name) || 
        isFuzzyMatch(query, r.atoll) || 
        r.features.some(f => isFuzzyMatch(query, f))
      ),
      offers: offers.filter(o => 
        isFuzzyMatch(query, o.title) || 
        isFuzzyMatch(query, o.resortName) ||
        isFuzzyMatch(query, o.category)
      ),
      experiences: experiences.filter(e => 
        isFuzzyMatch(query, e.title) || 
        isFuzzyMatch(query, e.category) || 
        (e.resortName && isFuzzyMatch(query, e.resortName)) || // Requirement: Detect experiences via resort name
        isFuzzyMatch(query, e.description)
      ),
      stories: stories.filter(s => 
        isFuzzyMatch(query, s.title) || 
        isFuzzyMatch(query, s.excerpt) || 
        isFuzzyMatch(query, s.category)
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
        description={`Unified archive lookup for ${query} across Maldivian resorts, exclusive seasonal offers, curated journeys, and editorial journal stories.`}
      />

      {/* Cinematic Header */}
      <section className="relative h-[45vh] md:h-[60vh] flex items-center justify-center overflow-hidden bg-slate-950">
        <div className="absolute inset-0 z-0 opacity-50">
          <img 
            src="https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&q=80&w=1920" 
            className="w-full h-full object-cover transition-transform duration-[30s] scale-110" 
            alt="Search Archipelago"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/20 to-slate-950" />
        </div>
        <div className="relative z-10 text-center px-6 reveal active">
          <span className="text-[10px] font-black text-sky-400 uppercase tracking-[1.2em] mb-12 block">Digital Sanctuary Archive</span>
          <h1 className="text-4xl md:text-8xl font-serif font-bold text-white tracking-tighter italic leading-none">
            Exploring: <span className="text-sky-500 not-italic">"</span>{query}<span className="text-sky-500 not-italic">"</span>
          </h1>
          <div className="h-px w-24 bg-amber-400 mx-auto mt-12 mb-12"></div>
          <p className="text-white text-[11px] font-bold uppercase tracking-[0.5em] opacity-80">
            {loading ? 'Consulting atoll records...' : `${totalResults} Results Found.`}
          </p>
        </div>
      </section>

      {loading ? (
        <div className="py-64 flex flex-col items-center justify-center">
          <div className="w-10 h-10 border-[1px] border-slate-200 border-t-sky-500 rounded-full animate-spin mb-10"></div>
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em]">Accessing Intelligence Archive...</p>
        </div>
      ) : totalResults > 0 ? (
        <main className="max-w-[1440px] mx-auto px-6 lg:px-12 py-24 md:py-32 space-y-48">
          
          {/* Section 1: STAYS */}
          {filtered.stays.length > 0 && (
            <section className="reveal">
              <div className="flex flex-col md:flex-row justify-between items-end gap-10 mb-20 border-b border-slate-100 pb-16">
                <div className="max-w-2xl">
                  <span className="text-[10px] font-black text-sky-500 uppercase tracking-[1em] mb-8 block">The Collection</span>
                  <h2 className="text-4xl md:text-7xl font-serif font-bold italic text-slate-900 tracking-tighter">Iconic Stays.</h2>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">{filtered.stays.length} Matches</span>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-24">
                {filtered.stays.map(stay => (
                  <ResortCard key={stay.id} resort={stay} />
                ))}
              </div>
            </section>
          )}

          {/* Section 2: OFFERS */}
          {filtered.offers.length > 0 && (
            <section className="reveal">
              <div className="flex flex-col md:flex-row justify-between items-end gap-10 mb-20 border-b border-slate-100 pb-16">
                <div className="max-w-2xl">
                  <span className="text-[10px] font-black text-amber-500 uppercase tracking-[1em] mb-8 block">Privileges</span>
                  <h2 className="text-4xl md:text-7xl font-serif font-bold italic text-slate-900 tracking-tighter">Bespoke Offers.</h2>
                </div>
                <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">{filtered.offers.length} Matches</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
                {filtered.offers.map(offer => (
                  <Link key={offer.id} to={`/stays/${offer.resortSlug}`} className="group flex flex-col h-full bg-white rounded-[3rem] p-8 shadow-sm border border-slate-50 hover:shadow-2xl transition-all duration-1000">
                    <div className="aspect-[4/5] rounded-[2.5rem] overflow-hidden mb-8 bg-slate-100 relative">
                      <img src={offer.image} className="w-full h-full object-cover transition-all duration-[6s] group-hover:scale-110" alt={offer.title} />
                      <div className="absolute top-6 right-6 bg-amber-400 text-slate-950 px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest shadow-lg">
                        {offer.discount}
                      </div>
                    </div>
                    <StarRating count={offer.rating} />
                    <p className="text-[8px] font-black text-slate-400 uppercase tracking-[0.3em] mb-4">{offer.resortName}</p>
                    <h3 className="text-2xl font-serif font-bold text-slate-950 mb-8 leading-tight group-hover:text-sky-600 transition-colors line-clamp-2">{offer.title}</h3>
                    <div className="mt-auto pt-8 border-t border-slate-50">
                      <span className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-900 group-hover:text-sky-500 transition-colors">Details & Inquiry →</span>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )}

          {/* Section 3: EXPERIENCES */}
          {filtered.experiences.length > 0 && (
            <section className="reveal">
              <div className="flex flex-col md:flex-row justify-between items-end gap-10 mb-20 border-b border-slate-100 pb-16">
                <div className="max-w-2xl">
                  <span className="text-[10px] font-black text-sky-500 uppercase tracking-[1em] mb-8 block">Activities & Movement</span>
                  <h2 className="text-4xl md:text-7xl font-serif font-bold italic text-slate-900 tracking-tighter">Journeys.</h2>
                  <p className="mt-8 text-slate-400 text-[10px] font-bold uppercase tracking-[0.4em] leading-loose">
                    Experiences within your search context, cross-indexed by their host sanctuaries.
                  </p>
                </div>
                <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">{filtered.experiences.length} Matches</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16">
                {filtered.experiences.map(exp => (
                  <div key={exp.id} className="group flex flex-col">
                    <div className="relative aspect-[16/10] rounded-[3.5rem] overflow-hidden mb-10 shadow-sm group-hover:shadow-2xl transition-all duration-1000">
                      <img src={exp.image} className="w-full h-full object-cover transition-transform duration-[8s] group-hover:scale-110" alt={exp.title} />
                      {exp.resortName && (
                        <div className="absolute top-8 left-8">
                           <div className="bg-white/95 backdrop-blur px-5 py-2 rounded-full text-[8px] font-black uppercase tracking-widest text-slate-900 shadow-sm border border-white/20">
                              VENUE: {exp.resortName}
                           </div>
                        </div>
                      )}
                    </div>
                    <div className="px-6">
                      <span className="text-[9px] font-black text-sky-500 uppercase tracking-[0.4em] block mb-6">{exp.category}</span>
                      <h3 className="text-3xl font-serif font-bold text-slate-950 mb-6 group-hover:italic group-hover:text-sky-600 transition-all leading-tight">{exp.title}</h3>
                      <p className="text-slate-500 text-[13px] leading-relaxed line-clamp-3 mb-10 font-medium">{exp.description}</p>
                      <div className="flex justify-between items-center pt-8 border-t border-slate-50">
                        <Link to="/plan" className="text-[9px] font-black text-slate-950 uppercase tracking-[0.5em] border-b border-slate-950 pb-1 hover:text-sky-500 hover:border-sky-500 transition-all">Request Quote</Link>
                        {exp.resortSlug && (
                          <Link to={`/stays/${exp.resortSlug}`} className="text-[8px] font-bold text-slate-300 hover:text-slate-900 uppercase tracking-widest transition-colors">Sanctuary Details →</Link>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Section 4: STORIES */}
          {filtered.stories.length > 0 && (
            <section className="reveal">
              <div className="flex flex-col md:flex-row justify-between items-end gap-10 mb-20 border-b border-slate-100 pb-16">
                <div className="max-w-2xl">
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-[1em] mb-8 block">Editorial Journal</span>
                  <h2 className="text-4xl md:text-7xl font-serif font-bold italic text-slate-900 tracking-tighter">Insights.</h2>
                </div>
                <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">{filtered.stories.length} Matches</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-16 lg:gap-24">
                {filtered.stories.map(post => (
                  <Link key={post.id} to={`/stories/${post.slug}`} className="group flex flex-col md:flex-row gap-12 items-center">
                    <div className="w-full md:w-[40%] aspect-[4/5] rounded-[3rem] overflow-hidden flex-shrink-0 bg-slate-100 shadow-sm transition-all duration-1000 group-hover:shadow-2xl">
                      <img src={post.image} className="w-full h-full object-cover transition-transform duration-[5s] group-hover:scale-105" alt={post.title} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-4 mb-6">
                        <span className="text-[9px] font-black text-sky-500 uppercase tracking-[0.4em]">{post.category}</span>
                        <div className="w-1 h-1 rounded-full bg-slate-200"></div>
                        <span className="text-[9px] font-bold text-slate-400 uppercase tracking-[0.2em]">{new Date(post.date).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</span>
                      </div>
                      <h3 className="text-3xl font-serif font-bold text-slate-950 mb-6 leading-tight group-hover:italic group-hover:text-sky-600 transition-all">{post.title}</h3>
                      <p className="text-slate-500 text-[14px] leading-relaxed line-clamp-3 mb-10 font-medium">{post.excerpt}</p>
                      <span className="text-[10px] font-black text-slate-900 uppercase tracking-[0.6em] border-b-[2px] border-slate-100 group-hover:border-sky-500 transition-all pb-2">Access Archive Dispatch</span>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )}

        </main>
      ) : (
        <div className="py-64 text-center px-6 reveal active">
          <h2 className="text-4xl md:text-7xl font-serif font-bold text-slate-900 italic tracking-tighter mb-10">Archive Inconclusive.</h2>
          <p className="text-slate-400 text-[11px] font-bold uppercase tracking-[0.4em] mb-16 leading-[2.5] max-w-xl mx-auto">
            Your inquiry for "{query}" did not reveal records in our digital sanctuary. <br /> Our concierge specialists can manually curate a bespoke itinerary based on your vision.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-10">
            <Link to="/" className="bg-slate-950 text-white font-black px-16 py-7 rounded-full text-[10px] uppercase tracking-[0.6em] hover:bg-sky-500 transition-all shadow-2xl">Return to Home</Link>
            <Link to="/plan" className="text-[10px] font-black text-slate-950 uppercase tracking-[0.6em] border-b-[2px] border-slate-950 pb-3 hover:text-sky-600 hover:border-sky-600 transition-all">Consult An Expert</Link>
          </div>
        </div>
      )}

      {/* Discovery Footer */}
      <section className="py-32 md:py-64 bg-white border-t border-slate-50 text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.02] flex items-center justify-center pointer-events-none">
           <h2 className="text-[40vw] font-serif italic whitespace-nowrap">Archives</h2>
        </div>
        <div className="max-w-4xl mx-auto px-6 relative z-10 reveal">
          <span className="text-[10px] font-black text-slate-400 uppercase tracking-[1.5em] mb-12 block">Your Maldivian Perspective</span>
          <h3 className="text-5xl md:text-9xl font-serif font-bold italic mb-20 text-slate-950 tracking-tighter leading-tight">Beyond Search.</h3>
          <Link to="/plan" className="inline-block bg-slate-950 text-white font-black px-16 py-7 rounded-full hover:bg-sky-500 transition-all duration-700 shadow-2xl uppercase tracking-[0.8em] text-[10px]">
             Request Custom Discovery
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