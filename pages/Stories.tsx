
import React, { useEffect, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { BlogPost, StoryCategory } from '../types';
import { BLOG_POSTS } from '../constants';

const Stories: React.FC = () => {
  const [stories, setStories] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState<StoryCategory | 'All'>('All');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchStories = async () => {
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from('stories')
          .select('*')
          .order('date', { ascending: false });
        
        if (data && data.length > 0) {
          setStories(data);
        } else {
          // Fallback to constants if DB is empty
          setStories(BLOG_POSTS as BlogPost[]);
        }
      } catch (err) {
        console.error('Fetch error:', err);
        setStories(BLOG_POSTS as BlogPost[]);
      } finally {
        setLoading(false);
      }
    };
    fetchStories();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('active');
      });
    }, { threshold: 0.1 });
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, [stories, activeCategory, searchQuery]);

  const categories: (StoryCategory | 'All')[] = ['All', 'Dispatch', 'Guide', 'Update', 'Tip'];

  const filteredStories = useMemo(() => {
    return stories.filter(post => {
      const matchesCategory = activeCategory === 'All' || post.category === activeCategory;
      const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [stories, activeCategory, searchQuery]);

  const featuredPost = useMemo(() => {
    return filteredStories.find(p => p.is_featured) || filteredStories[0];
  }, [filteredStories]);

  return (
    <div className="bg-[#FCFAF7] min-h-screen">
      <div className="max-w-7xl mx-auto px-6 py-48 md:py-64 lg:px-12">
        
        <div className="text-center mb-32 md:mb-56 reveal">
          <span className="text-[10px] font-bold text-sky-500 mb-12 block tracking-[1em] uppercase">The Journal</span>
          <h1 className="text-6xl md:text-9xl font-serif font-bold text-slate-900 tracking-tighter italic leading-none">Perspective.</h1>
          <div className="h-px w-24 bg-amber-400 mx-auto mt-16 mb-16"></div>
          <p className="text-slate-400 text-[11px] font-bold max-w-xl mx-auto uppercase tracking-[0.5em] leading-[2.5] opacity-80">
            A dynamic editorial archive of Maldivian heritage, <br className="hidden md:block"/> luxury insights, and travel intelligence.
          </p>
        </div>

        {/* Filter & Search Bar */}
        <div className="mb-24 flex flex-col md:flex-row justify-between items-center gap-12 border-b border-slate-100 pb-12 reveal">
          <div className="flex flex-wrap justify-center gap-8">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`text-[10px] font-bold uppercase tracking-[0.4em] transition-all pb-2 border-b-2 ${activeCategory === cat ? 'border-sky-500 text-slate-900' : 'border-transparent text-slate-300 hover:text-slate-500'}`}
              >
                {cat}s
              </button>
            ))}
          </div>
          <div className="relative w-full md:w-80">
            <input 
              type="text"
              placeholder="SEARCH ARCHIVES..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-transparent border-b border-slate-200 py-2 text-[10px] font-bold uppercase tracking-widest outline-none focus:border-slate-950 placeholder:text-slate-100"
            />
          </div>
        </div>

        {loading ? (
          <div className="py-40 text-center reveal active">
             <div className="w-10 h-10 border-2 border-slate-100 border-t-sky-500 rounded-full animate-spin mx-auto mb-8"></div>
             <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Accessing records...</p>
          </div>
        ) : filteredStories.length > 0 ? (
          <>
            {/* Featured Hero Post */}
            {featuredPost && activeCategory === 'All' && !searchQuery && (
              <div className="mb-48">
                <Link to={`/stories/${featuredPost.slug}`} className="group flex flex-col reveal active">
                  <div className="relative overflow-hidden rounded-[3rem] md:rounded-[5rem] shadow-sm group-hover:shadow-2xl transition-all duration-1000 aspect-[21/9] mb-16 bg-slate-100">
                     <img src={featuredPost.image} alt={featuredPost.title} className="w-full h-full object-cover transition-transform duration-[4s] ease-out group-hover:scale-105" />
                     <div className="absolute inset-0 bg-slate-950/10 group-hover:bg-transparent transition-colors duration-1000"></div>
                     <div className="absolute top-10 left-10">
                        <span className="bg-white/90 backdrop-blur px-6 py-2 rounded-full text-[9px] font-bold text-slate-900 uppercase tracking-[0.4em] shadow-sm">
                           Featured {featuredPost.category}
                        </span>
                     </div>
                  </div>
                  <div className="max-w-4xl mx-auto text-center">
                    <span className="text-slate-300 font-bold text-[9px] uppercase tracking-[0.6em] mb-6 block">
                      {new Date(featuredPost.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                    </span>
                    <h2 className="text-4xl md:text-7xl font-serif font-bold text-slate-900 mb-8 group-hover:italic transition-all duration-700 leading-[1.1]">
                      {featuredPost.title}
                    </h2>
                    <p className="text-slate-500 leading-relaxed font-medium opacity-80 mb-10 text-lg md:text-xl">
                      {featuredPost.excerpt}
                    </p>
                  </div>
                </Link>
              </div>
            )}

            {/* Stories Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16 lg:gap-24">
              {filteredStories.filter(p => p.id !== (activeCategory === 'All' && !searchQuery ? featuredPost?.id : null)).map((post, idx) => (
                <Link 
                  key={post.id} 
                  to={`/stories/${post.slug}`} 
                  className="group flex flex-col reveal"
                  style={{ transitionDelay: `${idx * 100}ms` }}
                >
                  <div className="relative overflow-hidden rounded-[2.5rem] md:rounded-[3.5rem] shadow-sm group-hover:shadow-xl transition-all duration-1000 aspect-[4/5] mb-10 bg-slate-100">
                     <img src={post.image} alt={post.title} className="w-full h-full object-cover transition-transform duration-[4s] ease-out group-hover:scale-110" />
                     <div className="absolute top-6 left-6">
                        <span className="bg-white/90 backdrop-blur px-4 py-1.5 rounded-full text-[8px] font-bold text-slate-900 uppercase tracking-widest shadow-sm">
                           {post.category}
                        </span>
                     </div>
                  </div>
                  <div>
                    <span className="text-slate-300 font-bold text-[8px] uppercase tracking-[0.4em] mb-4 block">
                      {new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </span>
                    <h2 className="text-2xl font-serif font-bold text-slate-900 mb-4 group-hover:italic transition-all duration-500 leading-tight">
                      {post.title}
                    </h2>
                    <p className="text-slate-500 text-sm leading-relaxed font-medium opacity-80 line-clamp-2">
                      {post.excerpt}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </>
        ) : (
          <div className="py-40 text-center reveal active">
             <h3 className="text-3xl font-serif font-bold italic text-slate-900 mb-6">No archives found.</h3>
             <button onClick={() => {setActiveCategory('All'); setSearchQuery('');}} className="text-sky-500 font-bold uppercase tracking-widest text-[10px] border-b border-sky-200">Reset Filters</button>
          </div>
        )}
      </div>

      <section className="py-48 bg-white border-t border-slate-50">
         <div className="max-w-4xl mx-auto px-6 text-center reveal">
            <h2 className="text-4xl md:text-6xl font-serif font-bold text-slate-950 italic mb-12">The Archives</h2>
            <p className="text-slate-400 text-[10px] font-bold uppercase tracking-[0.5em] mb-20 leading-loose">
               Access our full collection of Maldivian dispatches <br className="hidden md:block"/> and photographic journals.
            </p>
            <div className="flex flex-wrap justify-center gap-10">
               {['Aesthetics', 'Heritage', 'Sustainability', 'Cuisine'].map(tag => (
                 <button key={tag} className="text-[9px] font-bold text-slate-300 uppercase tracking-[0.4em] hover:text-slate-950 transition-colors border-b border-transparent hover:border-slate-950 pb-2">
                   {tag}
                 </button>
               ))}
            </div>
         </div>
      </section>
    </div>
  );
};

export default Stories;
