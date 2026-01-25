
import React, { useState } from 'react';
import { supabase } from '../lib/supabase';
import { RESORTS } from '../constants';

const AdminSync: React.FC = () => {
  const [status, setStatus] = useState<string>('Idle');
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [errorDetails, setErrorDetails] = useState<string | null>(null);

  const syncData = async () => {
    setLoading(true);
    setErrorDetails(null);
    setStatus('Initializing migration...');
    setProgress(0);
    
    try {
      const total = RESORTS.length;
      let count = 0;

      for (const resort of RESORTS) {
        setStatus(`Syncing Property: ${resort.name}...`);
        
        /**
         * Atomic Upsert:
         * We now push rooms and dining as JSONB columns directly into the resorts table.
         * This ensures that if the resort is saved, all its rooms and dining are saved too.
         */
        const { error: resortErr } = await supabase.from('resorts').upsert({
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
          // New nested data columns
          room_types: resort.roomTypes || [],
          dining_venues: resort.diningVenues || []
        }, { onConflict: 'id' });

        if (resortErr) throw new Error(`Sync failed for ${resort.name}: ${resortErr.message}`);

        count++;
        setProgress(Math.round((count / total) * 100));
      }

      setStatus('Success! Portfolio fully synchronized with Room & Dining data.');
    } catch (err: any) {
      console.error("Migration Error:", err);
      setStatus('Migration Failed');
      setErrorDetails(err.message || 'Check browser console for more details.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FCFAF7] flex items-center justify-center p-6">
      <div className="max-w-2xl w-full bg-white rounded-[3.5rem] p-12 md:p-16 shadow-2xl border border-slate-50 text-center">
        <span className="text-[10px] font-bold text-sky-500 uppercase tracking-[1em] mb-12 block">Cloud Systems</span>
        <h1 className="text-4xl md:text-5xl font-serif font-bold italic mb-8">Unified Synchronizer</h1>
        <p className="text-slate-400 text-sm mb-12 uppercase tracking-[0.3em] leading-loose">
          Pushing {RESORTS.length} properties with nested residences and dining.
        </p>
        
        {loading && (
          <div className="w-full bg-slate-50 h-1 rounded-full mb-12 overflow-hidden">
            <div 
              className="bg-sky-500 h-full transition-all duration-700 ease-out" 
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        )}

        <div className={`p-8 rounded-3xl mb-12 transition-all duration-500 ${errorDetails ? 'bg-red-50 border border-red-100' : 'bg-slate-50'}`}>
          <p className={`text-[11px] font-bold uppercase tracking-widest ${errorDetails ? 'text-red-600' : 'text-slate-900'}`}>
            {status}
          </p>
          {errorDetails && (
            <div className="mt-4 text-[10px] text-red-500 font-medium space-y-2 text-left">
              <p className="font-bold underline uppercase tracking-widest">Debug Info:</p>
              <p className="leading-relaxed opacity-80">{errorDetails}</p>
            </div>
          )}
        </div>

        {!loading && (
          <div className="space-y-6">
            <button 
              onClick={syncData}
              className="w-full bg-slate-950 text-white font-bold py-6 rounded-full text-[10px] uppercase tracking-[0.5em] hover:bg-sky-500 transition-all duration-700 shadow-xl active:scale-95"
            >
              Start Migration
            </button>
            <p className="text-[8px] text-slate-300 font-bold uppercase tracking-[0.4em]">
              Note: This will update the 'resorts' table with nested room and dining data.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminSync;
