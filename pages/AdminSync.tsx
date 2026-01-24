
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
    setStatus('Initializing connection...');
    
    try {
      const total = RESORTS.length;
      let count = 0;

      for (const resort of RESORTS) {
        setStatus(`Syncing: ${resort.name}...`);
        
        // 1. Insert/Update Resort
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
          is_featured: resort.isFeatured || false
        });

        if (resortErr) {
          console.error("Resort Sync Error:", resortErr);
          throw new Error(`Failed to sync resort ${resort.name}: ${resortErr.message}`);
        }

        // 2. Sync Rooms (Delete old, Insert new for this resort)
        if (resort.roomTypes && resort.roomTypes.length > 0) {
          const { error: delRoomErr } = await supabase.from('rooms').delete().eq('resort_id', resort.id);
          if (delRoomErr) console.warn("Old room deletion failed:", delRoomErr);

          const roomsData = resort.roomTypes.map(room => ({
            resort_id: resort.id,
            name: room.name,
            description: room.description,
            highlights: room.highlights,
            image: room.image,
            size: room.size,
            capacity: room.capacity
          }));
          
          const { error: roomErr } = await supabase.from('rooms').insert(roomsData);
          if (roomErr) throw new Error(`Room sync failed for ${resort.name}: ${roomErr.message}`);
        }

        // 3. Sync Dining (Delete old, Insert new for this resort)
        if (resort.diningVenues && resort.diningVenues.length > 0) {
          const { error: delDiningErr } = await supabase.from('dining').delete().eq('resort_id', resort.id);
          if (delDiningErr) console.warn("Old dining deletion failed:", delDiningErr);

          const diningData = resort.diningVenues.map(venue => ({
            resort_id: resort.id,
            name: venue.name,
            cuisine: venue.cuisine,
            description: venue.description,
            highlights: venue.highlights,
            image: venue.image,
            vibe: venue.vibe
          }));
          
          const { error: diningErr } = await supabase.from('dining').insert(diningData);
          if (diningErr) throw new Error(`Dining sync failed for ${resort.name}: ${diningErr.message}`);
        }

        count++;
        setProgress(Math.round((count / total) * 100));
      }

      setStatus('Sync Complete! Your Maldivian portfolio is now live in the cloud.');
    } catch (err: any) {
      console.error("Migration Fatal Error:", err);
      setStatus('Migration Failed');
      setErrorDetails(err.message || 'An unknown error occurred during sync.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FCFAF7] flex items-center justify-center p-6">
      <div className="max-w-2xl w-full bg-white rounded-[3.5rem] p-12 md:p-16 shadow-2xl border border-slate-50 text-center">
        <span className="text-[10px] font-bold text-sky-500 uppercase tracking-[1em] mb-12 block">Cloud Synchronization</span>
        <h1 className="text-4xl md:text-5xl font-serif font-bold italic mb-8">Database Migration</h1>
        <p className="text-slate-400 text-sm mb-12 uppercase tracking-[0.3em] leading-loose">
          Pushing {RESORTS.length} local resort profiles to your Supabase instance.
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
            <p className="mt-4 text-[10px] text-red-400 font-medium leading-relaxed">
              {errorDetails}
            </p>
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
            <p className="text-[9px] text-slate-300 font-bold uppercase tracking-widest">
              Note: This will overwrite existing cloud data with local constants.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminSync;
