
import React, { useState } from 'react';
import { supabase } from '../lib/supabase';
import { RESORTS, BLOG_POSTS, OFFERS } from '../constants';

const AdminSync: React.FC = () => {
  const [status, setStatus] = useState<string>('Ready for deployment');
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [log, setLog] = useState<string[]>([]);

  const addLog = (msg: string) => {
    setLog(prev => [msg, ...prev].slice(0, 50));
  };

  const syncAllData = async () => {
    setLoading(true);
    setLog([]);
    setProgress(0);
    setStatus('Syncing Portfolio, Editorial & Offers...');
    
    try {
      const totalSteps = RESORTS.length + BLOG_POSTS.length + OFFERS.length;
      let completed = 0;

      // 1. SYNC RESORTS
      addLog('--- INITIATING RESORT MIGRATION ---');
      for (const resort of RESORTS) {
        addLog(`Pushing Property: ${resort.name}`);
        const { error } = await supabase.from('resorts').upsert({
          id: resort.id,
          name: resort.name,
          slug: resort.slug,
          type: resort.type,
          atoll: resort.atoll,
          price_range: resort.priceRange,
          rating: resort.rating,
          description: resort.description,
          short_description: resort.shortDescription,
          images: resort.images,
          features: resort.features,
          transfers: resort.transfers,
          meal_plans: resort.mealPlans,
          uvp: resort.uvp,
          is_featured: resort.isFeatured || false,
          room_types: resort.roomTypes || [],
          dining_venues: resort.diningVenues || []
        }, { onConflict: 'id' });

        if (error) throw new Error(`Resort ${resort.name}: ${error.message}`);
        completed++;
        setProgress(Math.round((completed / totalSteps) * 100));
      }

      // 2. SYNC STORIES
      addLog('--- INITIATING EDITORIAL MIGRATION ---');
      for (const post of BLOG_POSTS) {
        addLog(`Pushing Dispatch: ${post.title}`);
        const { error } = await supabase.from('stories').upsert({
          id: post.id,
          title: post.title,
          slug: post.slug,
          excerpt: post.excerpt,
          content: post.content,
          image: post.image,
          date: post.date,
          author: post.author,
          category: post.category,
          is_featured: post.is_featured || false
        }, { onConflict: 'id' });

        if (error) throw new Error(`Story ${post.title}: ${error.message}`);
        completed++;
        setProgress(Math.round((completed / totalSteps) * 100));
      }

      // 3. SYNC OFFERS
      addLog('--- INITIATING OFFERS MIGRATION ---');
      for (const offer of OFFERS) {
        addLog(`Pushing Offer: ${offer.title} for ${offer.resortName}`);
        const { error } = await supabase.from('offers').upsert({
          id: offer.id,
          resort_id: offer.resortId,
          title: offer.title,
          discount: offer.discount,
          resort_name: offer.resortName,
          expiry_date: offer.expiryDate,
          image: offer.image,
          category: offer.category
        }, { onConflict: 'id' });

        if (error) throw new Error(`Offer ${offer.title}: ${error.message}`);
        completed++;
        setProgress(Math.round((completed / totalSteps) * 100));
      }

      setStatus('Operational Success. Cloud Archive Updated.');
      addLog('✅ ALL SYSTEMS SYNCHRONIZED');
    } catch (err: any) {
      console.error("Migration Critical Failure:", err);
      setStatus('Operational Failure');
      addLog(`‼️ CRITICAL ERROR: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FCFAF7] flex items-center justify-center p-6">
      <div className="max-w-3xl w-full bg-white rounded-[4rem] p-16 shadow-2xl border border-slate-50 relative overflow-hidden">
        <div className="relative z-10 text-center">
            <span className="text-[10px] font-bold text-sky-500 uppercase tracking-[1.2em] mb-12 block">Cloud Infrastructure</span>
            <h1 className="text-5xl font-serif font-bold italic mb-10 tracking-tight">Master Synchronizer</h1>
            
            <p className="text-slate-400 text-[10px] mb-16 uppercase tracking-[0.4em] leading-loose max-w-lg mx-auto">
              Deployment targeting {RESORTS.length} Properties, {BLOG_POSTS.length} Editorial Dispatches, and {OFFERS.length} Bespoke Offers.
            </p>
            
            <div className="bg-slate-50 p-10 rounded-[2.5rem] mb-12 border border-slate-100">
               <div className="flex justify-between items-center mb-6">
                  <span className={`text-[9px] font-bold uppercase tracking-widest ${loading ? 'animate-pulse text-sky-500' : 'text-slate-900'}`}>
                    {status}
                  </span>
                  <span className="text-[9px] font-bold text-slate-300 uppercase tracking-widest">{progress}%</span>
               </div>
               <div className="w-full bg-slate-200 h-1 rounded-full overflow-hidden">
                  <div 
                    className="bg-sky-500 h-full transition-all duration-1000 ease-out shadow-[0_0_15px_rgba(14,165,233,0.5)]" 
                    style={{ width: `${progress}%` }}
                  ></div>
               </div>
            </div>

            <div className="flex flex-col gap-6">
              <button 
                onClick={syncAllData} 
                disabled={loading}
                className="w-full bg-slate-950 text-white font-bold py-7 rounded-full text-[11px] uppercase tracking-[0.8em] hover:bg-sky-500 transition-all duration-700 shadow-xl disabled:opacity-50"
              >
                {loading ? 'ARCHIVING...' : 'FORCE CLOUD SYNC'}
              </button>
            </div>

            <div className="mt-12 text-left h-48 overflow-y-auto no-scrollbar border-t border-slate-50 pt-8">
              {log.map((entry, i) => (
                <p key={i} className="text-[9px] font-mono text-slate-400 mb-2 uppercase tracking-tighter">{entry}</p>
              ))}
            </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSync;
