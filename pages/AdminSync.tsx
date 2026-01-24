
import React, { useState } from 'react';
import { supabase } from '../lib/supabase';
import { RESORTS } from '../constants';

const AdminSync: React.FC = () => {
  const [status, setStatus] = useState<string>('Idle');
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  const syncData = async () => {
    setLoading(true);
    setStatus('Clearing existing data...');
    
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

        if (resortErr) throw resortErr;

        // 2. Insert Rooms
        if (resort.roomTypes && resort.roomTypes.length > 0) {
          // Clear old rooms for this resort first to avoid duplicates
          await supabase.from('rooms').delete().eq('resort_id', resort.id);

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
          if (roomErr) console.warn(`Room sync err for ${resort.name}:`, roomErr);
        }

        // 3. Insert Dining
        if (resort.diningVenues && resort.diningVenues.length > 0) {
          // Clear old dining for this resort first
          await supabase.from('dining').delete().eq('resort_id', resort.id);

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
          if (diningErr) console.warn(`Dining sync err for ${resort.name}:`, diningErr);
        }

        count++;
        setProgress(Math.round((count / total) * 100));
      }

      setStatus('Sync Complete! All resorts, rooms, and dining venues are now in Supabase.');
    } catch (err: any) {
      console.error(err);
      setStatus(`Error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FCFAF7] flex items-center justify-center p-6">
      <div className="max-w-xl w-full bg-white rounded-[3rem] p-12 shadow-2xl border border-slate-100 text-center">
        <span className="text-[10px] font-bold text-sky-500 uppercase tracking-[1em] mb-12 block">System Utility</span>
        <h1 className="text-4xl font-serif font-bold italic mb-8">Database Migration</h1>
        <p className="text-slate-400 text-sm mb-12 uppercase tracking-widest leading-loose">
          Pushing the curated collection of {RESORTS.length} resorts, room types, and dining options to Supabase.
        </p>
        
        {loading && (
          <div className="w-full bg-slate-100 h-1 rounded-full mb-12 overflow-hidden">
            <div 
              className="bg-sky-500 h-full transition-all duration-500" 
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        )}

        <div className="bg-slate-50 p-6 rounded-2xl mb-12">
          <p className="text-[10px] font-bold text-slate-900 uppercase tracking-widest">{status}</p>
        </div>

        {!loading && (
          <button 
            onClick={syncData}
            className="w-full bg-slate-950 text-white font-bold py-6 rounded-full text-[10px] uppercase tracking-[0.5em] hover:bg-sky-500 transition-all duration-700 shadow-xl"
          >
            Start Migration
          </button>
        )}
      </div>
    </div>
  );
};

export default AdminSync;
