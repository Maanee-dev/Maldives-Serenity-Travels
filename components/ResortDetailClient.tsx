
'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { Accommodation, TransferType, MealPlan, Offer } from '@/types';
import ResortCard from './ResortCard';
import { supabase } from '@/lib/supabase';

interface ResortDetailClientProps {
  resort: Accommodation;
  allResorts: Accommodation[];
  resortOffers: Offer[];
}

const COUNTRIES = [
  { name: 'United Kingdom', code: '+44' },
  { name: 'United States', code: '+1' },
  { name: 'United Arab Emirates', code: '+971' },
  { name: 'Germany', code: '+49' },
  { name: 'Maldives', code: '+960' }
].sort((a, b) => a.name.localeCompare(b.name));

const ResortDetailClient: React.FC<ResortDetailClientProps> = ({ resort, allResorts, resortOffers }) => {
  const [formStep, setFormStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [quoteData, setQuoteData] = useState({
    checkIn: '',
    checkOut: '',
    roomType: '',
    mealPlan: '',
    customerName: '',
    customerEmail: '',
    country: 'United Kingdom',
    countryCode: '+44',
    customerPhone: '',
    notes: ''
  });

  const [currentMonth, setCurrentMonth] = useState(new Date());

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('active');
      });
    }, { threshold: 0.1 });
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, [resort]);

  const similarStays = useMemo(() => {
    return allResorts
      .filter(r => r.slug !== resort.slug && (r.atoll === resort.atoll || r.type === resort.type))
      .slice(0, 6);
  }, [resort, allResorts]);

  const handleQuoteSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const { error } = await supabase.from('inquiries').insert({
        resort_id: resort.id,
        resort_name: resort.name,
        check_in: quoteData.checkIn,
        check_out: quoteData.checkOut,
        customer_name: quoteData.customerName,
        customer_email: quoteData.customerEmail,
        customer_phone: `${quoteData.countryCode} ${quoteData.customerPhone}`,
        notes: quoteData.notes
      });
      if (error) throw error;
      setIsSubmitted(true);
    } catch (err) {
      alert('Error submitting inquiry. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDateClick = (date: Date) => {
    const dStr = date.toISOString().split('T')[0];
    if (!quoteData.checkIn || (quoteData.checkIn && quoteData.checkOut)) {
      setQuoteData({ ...quoteData, checkIn: dStr, checkOut: '' });
    } else if (dStr < quoteData.checkIn) {
      setQuoteData({ ...quoteData, checkIn: dStr, checkOut: quoteData.checkIn });
    } else {
      setQuoteData({ ...quoteData, checkOut: dStr });
    }
  };

  const generateCalendarDays = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const days = [];
    for (let i = 0; i < firstDay; i++) days.push(null);
    for (let i = 1; i <= daysInMonth; i++) days.push(new Date(year, month, i));
    return days;
  };

  return (
    <div className="bg-[#FCFAF7] min-h-screen pb-20">
      <section className="relative w-full pt-20 md:pt-32 px-4 md:px-12 reveal active">
        <div className="relative aspect-[4/5] md:aspect-[21/9] w-full rounded-[2.5rem] md:rounded-[4.5rem] overflow-hidden shadow-2xl bg-slate-200">
          <img src={resort.images[0]} alt={resort.name} className="w-full h-full object-cover transition-transform duration-[15s] hover:scale-110" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent"></div>
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6">
             <span className="text-[11px] font-black text-sky-400 uppercase tracking-[0.8em] mb-4 block reveal">{resort.atoll}</span>
             <h1 className="text-4xl md:text-8xl font-serif font-bold text-white tracking-tighter italic leading-none drop-shadow-2xl reveal active delay-300">{resort.name}</h1>
          </div>
        </div>
      </section>

      <section className="py-24 md:py-48 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-20 lg:gap-32 items-start">
          <div className="lg:col-span-7 reveal">
            <div className="flex items-center gap-6 mb-12">
              <div className="w-10 h-px bg-sky-500"></div>
              <span className="text-[11px] font-black text-sky-600 uppercase tracking-[0.8em] block">The Manifesto</span>
            </div>
            <p className="text-3xl md:text-6xl font-serif font-bold italic text-slate-900 leading-[1.2] mb-16 tracking-tight">"{resort.uvp}"</p>
            <div className="text-slate-800 text-lg md:text-xl leading-[2.2] font-semibold space-y-8 max-w-3xl">
              <p>{resort.description}</p>
            </div>
          </div>
          
          <div className="lg:col-span-5 reveal active delay-500">
            <div className="bg-white rounded-[2.5rem] p-12 shadow-sm border border-slate-100">
              <h3 className="text-[11px] font-black uppercase tracking-[0.4em] text-slate-950 mb-12 border-b border-slate-50 pb-6">Amenities</h3>
              <ul className="space-y-6">
                {resort.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center gap-4 group">
                    <div className="w-1.5 h-1.5 rounded-full bg-amber-500 group-hover:scale-[1.5] transition-transform"></div>
                    <span className="text-[11px] font-black text-slate-900 uppercase tracking-[0.2em]">{feature}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-16 pt-12 border-t border-slate-50 grid grid-cols-2 gap-8">
                <div>
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 block">Arrival</span>
                  <p className="text-[11px] font-black text-slate-900 uppercase tracking-widest leading-relaxed">
                    {resort.transfers.map(t => t.replace(/_/g, ' ')).join(' • ')}
                  </p>
                </div>
                <div>
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 block">Meal Plan</span>
                  <p className="text-[11px] font-black text-slate-900 uppercase tracking-widest leading-relaxed">
                    {resort.mealPlans.map(m => m.replace(/_/g, ' ')).join(' • ')}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Inquiry Form */}
      <section id="inquiry-form" className="py-24 md:py-48 bg-slate-950 text-white relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-6 text-center reveal">
           <span className="text-[11px] font-black text-sky-400 uppercase tracking-[1em] mb-12 block">Secure Your Stay</span>
           <h3 className="text-4xl md:text-8xl font-serif font-bold italic mb-12 tracking-tighter">Initiate Inquiry.</h3>
           
           <div className="bg-white/5 backdrop-blur-3xl p-8 md:p-16 rounded-[4rem] border border-white/10 shadow-2xl text-left max-w-2xl mx-auto">
             {isSubmitted ? (
               <div className="text-center py-12">
                 <h4 className="text-4xl font-serif italic mb-6">Dispatch Sent.</h4>
                 <p className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400">Our travel experts will contact you within 24 hours.</p>
               </div>
             ) : (
               <form onSubmit={handleQuoteSubmit} className="space-y-8">
                 <div className="space-y-4">
                   <label className="text-[9px] font-black uppercase tracking-widest text-white/40">Full Name</label>
                   <input required type="text" value={quoteData.customerName} onChange={e => setQuoteData({...quoteData, customerName: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-full px-8 py-5 text-[10px] font-bold uppercase tracking-widest outline-none focus:bg-white/10" placeholder="IDENTITY" />
                 </div>
                 <div className="space-y-4">
                   <label className="text-[9px] font-black uppercase tracking-widest text-white/40">Email Address</label>
                   <input required type="email" value={quoteData.customerEmail} onChange={e => setQuoteData({...quoteData, customerEmail: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-full px-8 py-5 text-[10px] font-bold uppercase tracking-widest outline-none focus:bg-white/10" placeholder="DIGITAL CONTACT" />
                 </div>
                 <button type="submit" disabled={isSubmitting} className="w-full bg-white text-slate-950 font-black py-7 rounded-full text-[11px] uppercase tracking-[0.8em] hover:bg-sky-400 hover:text-white transition-all duration-700 shadow-2xl">
                   {isSubmitting ? 'DISPATCHING...' : 'SEND INQUIRY'}
                 </button>
               </form>
             )}
           </div>
        </div>
      </section>

      {/* Similar Stays */}
      <section className="py-24 md:py-48 bg-[#FCFAF7] border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="mb-24 reveal">
            <span className="text-[11px] font-black text-slate-400 uppercase tracking-[0.8em] mb-4 block">Refined Selection</span>
            <h3 className="text-4xl md:text-6xl font-serif font-bold italic text-slate-950 tracking-tighter">Similar Sanctuaries.</h3>
          </div>
          <div className="flex gap-8 overflow-x-auto no-scrollbar pb-12 snap-x snap-mandatory">
            {similarStays.map(s => (
              <div key={s.id} className="flex-shrink-0 w-[85vw] md:w-[450px] snap-start">
                <ResortCard resort={s} />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ResortDetailClient;
