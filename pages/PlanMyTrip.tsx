import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { supabase, mapResort } from '../lib/supabase';
import { Accommodation } from '../types';
import SEO from '../components/SEO';

const STORAGE_KEY = 'serenity_planning_draft';

const PlanMyTrip: React.FC = () => {
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [dbResorts, setDbResorts] = useState<Accommodation[]>([]);
  
  const [purpose, setPurpose] = useState('');
  const [selectedExperiences, setSelectedExperiences] = useState<string[]>([]);
  const [preferences, setPreferences] = useState({
    islandSize: '',
    priceLevel: '',
    villaType: '',
    pool: ''
  });
  const [resortSearch, setResortSearch] = useState('');
  const [selectedResorts, setSelectedResorts] = useState<string[]>([]);
  const [finalDetails, setFinalDetails] = useState({
    fullName: '',
    phoneCode: '+44',
    phone: '',
    email: '',
    dates: '',
    guests: '2',
    mealPlan: 'ALL INCLUSIVE',
    budget: '',
    budgetType: 'Total'
  });

  useEffect(() => {
    const fetchResorts = async () => {
      const { data } = await supabase.from('resorts').select('*').order('name', { ascending: true });
      if (data) setDbResorts(data.map(mapResort));
    };
    fetchResorts();

    const savedData = localStorage.getItem(STORAGE_KEY);
    if (savedData) {
      try {
        const parsed = JSON.parse(savedData);
        if (parsed.step) setStep(parsed.step);
        if (parsed.purpose) setPurpose(parsed.purpose);
        if (parsed.selectedExperiences) setSelectedExperiences(parsed.selectedExperiences || []);
        if (parsed.preferences) setPreferences(parsed.preferences);
        if (parsed.selectedResorts) setSelectedResorts(parsed.selectedResorts || []);
        if (parsed.finalDetails) setFinalDetails(parsed.finalDetails);
      } catch (e) { console.error(e); }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ step, purpose, selectedExperiences, preferences, selectedResorts, finalDetails }));
  }, [step, purpose, selectedExperiences, preferences, selectedResorts, finalDetails]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [step]);

  const nextStep = () => setStep(s => s + 1);
  const prevStep = () => setStep(s => s - 1);

  const toggleExperience = (exp: string) => {
    if (selectedExperiences.includes(exp)) {
      setSelectedExperiences(prev => prev.filter(e => e !== exp));
    } else if (selectedExperiences.length < 3) {
      setSelectedExperiences(prev => [...prev, exp]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const { error } = await supabase.from('inquiries').insert({
        inquiry_type: 'general_plan',
        customer_name: finalDetails.fullName,
        customer_email: finalDetails.email,
        customer_phone: `${finalDetails.phoneCode} ${finalDetails.phone}`,
        purpose,
        experiences: selectedExperiences,
        preferences,
        preferred_resorts: selectedResorts,
        travel_dates_text: finalDetails.dates,
        guests: parseInt(finalDetails.guests),
        meal_plan: finalDetails.mealPlan,
        budget: finalDetails.budget,
        budget_type: finalDetails.budgetType
      });
      if (error) throw error;
      setSubmitted(true);
      localStorage.removeItem(STORAGE_KEY);
    } catch (err) {
      alert("Error processing your request.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6 bg-[#FCFAF7] dark:bg-slate-950 transition-colors">
        <div className="text-center max-w-2xl reveal active">
           <span className="text-[10px] font-bold uppercase tracking-[1em] text-sky-500 mb-12 block">Dispatch Received</span>
           <h2 className="text-5xl md:text-7xl font-serif font-bold text-slate-900 dark:text-white mb-12 italic leading-none">Perspective <br/> Awaits.</h2>
           <p className="text-slate-500 dark:text-slate-400 uppercase tracking-[0.4em] text-[10px] leading-[2.5] mb-16 max-w-md mx-auto">
             Our specialists are curating your portfolio. Expect a dispatch within 24 hours.
           </p>
           <Link to="/" className="text-[10px] font-bold uppercase tracking-[0.8em] text-slate-950 dark:text-white border-b border-slate-950 dark:border-white pb-3 hover:text-sky-500 transition-all">Return Home</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#FCFAF7] dark:bg-slate-950 min-h-screen pt-40 pb-32 px-6 transition-colors">
      <SEO title="Bespoke Holiday Planning" description="Initiate your bespoke planning journey." />
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-[11px] font-bold text-slate-400 dark:text-slate-600 uppercase tracking-[0.6em] block mb-4">PLANNING JOURNEY</span>
          <div className="flex justify-center items-center gap-2">
            {[1, 2, 3, 4, 5].map(i => (
              <React.Fragment key={i}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-bold transition-all ${step === i ? 'bg-slate-950 dark:bg-white text-white dark:text-slate-950 shadow-xl scale-110' : step > i ? 'bg-slate-950 dark:bg-slate-800 text-white dark:text-sky-400' : 'bg-slate-100 dark:bg-slate-900 text-slate-400 dark:text-slate-700'}`}>{i}</div>
                {i < 5 && <div className="w-4 h-px bg-slate-200 dark:bg-slate-800"></div>}
              </React.Fragment>
            ))}
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900/50 backdrop-blur-xl rounded-[4rem] p-8 md:p-20 shadow-2xl border border-slate-100 dark:border-white/5 min-h-[600px] flex flex-col justify-center transition-all">
          {step === 1 && (
            <div className="space-y-16 animate-in fade-in slide-in-from-bottom-6 duration-700">
              <h3 className="text-3xl md:text-5xl font-serif font-bold text-slate-900 dark:text-white leading-tight text-center italic">The Occasion</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto">
                {['Honeymoon', 'Anniversary', 'Couples', 'Family', 'Solo', 'Group'].map((opt) => (
                  <button
                    key={opt}
                    onClick={() => { setPurpose(opt); nextStep(); }}
                    className={`group flex items-center gap-6 p-6 rounded-3xl border transition-all ${purpose === opt ? 'border-slate-950 dark:border-sky-500 bg-slate-950 dark:bg-sky-500 text-white shadow-xl' : 'border-slate-50 dark:border-white/5 bg-slate-50/50 dark:bg-white/5 dark:text-white hover:border-sky-300'}`}
                  >
                    <span className="text-[11px] font-bold uppercase tracking-[0.2em]">{opt} Holiday</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-16 animate-in fade-in slide-in-from-bottom-6 duration-700">
              <div className="text-center">
                <span className="text-sky-500 font-bold uppercase tracking-[1em] text-[10px] mb-6 block">EXPERIENCES</span>
                <h3 className="text-3xl md:text-5xl font-serif font-bold text-slate-900 dark:text-white italic">Atoll Discovery</h3>
              </div>
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-6 max-w-3xl mx-auto">
                {['Snorkelling', 'Diving', 'Surfing', 'Spa', 'Food', 'Culture'].map((exp) => (
                  <button
                    key={exp}
                    onClick={() => toggleExperience(exp)}
                    className={`p-10 rounded-[3rem] border transition-all flex flex-col items-center justify-center gap-4 text-center ${selectedExperiences.includes(exp) ? 'border-slate-950 dark:border-sky-500 bg-slate-950 dark:bg-sky-500 text-white shadow-xl scale-[1.05]' : 'border-slate-50 dark:border-white/5 bg-slate-50/50 dark:bg-white/5 dark:text-white hover:border-sky-200'}`}
                  >
                    <span className="text-[10px] font-bold uppercase tracking-[0.3em]">{exp}</span>
                  </button>
                ))}
              </div>
              <div className="flex flex-col items-center gap-8">
                <button onClick={nextStep} className="bg-slate-950 dark:bg-white text-white dark:text-slate-950 font-bold px-16 py-7 rounded-full text-[11px] uppercase tracking-[0.5em] hover:bg-sky-500 dark:hover:bg-sky-400 transition-all shadow-xl">
                   {selectedExperiences.length > 0 ? `Continue (${selectedExperiences.length}/3)` : 'No Preferences'}
                </button>
                <button onClick={prevStep} className="text-slate-300 dark:text-slate-600 font-bold uppercase tracking-widest text-[9px] hover:text-slate-900 dark:hover:text-white transition-colors">← Back</button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-16 animate-in fade-in slide-in-from-bottom-6 duration-700">
              <div className="text-center">
                <h3 className="text-3xl md:text-5xl font-serif font-bold text-slate-900 dark:text-white italic">The Preferences</h3>
              </div>
              <div className="space-y-12 max-w-2xl mx-auto">
                {[
                  { key: 'villaType', opt1: 'Beach Villa', opt2: 'Water Villa' },
                  { key: 'pool', opt1: 'Private Pool', opt2: 'No Pool' }
                ].map((row) => (
                  <div key={row.key} className="flex flex-col gap-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {[row.opt1, row.opt2].map(o => (
                        <button
                          key={o}
                          onClick={() => setPreferences(prev => ({ ...prev, [row.key]: o }))}
                          className={`py-5 rounded-2xl text-[10px] font-bold uppercase tracking-[0.3em] transition-all border ${preferences[row.key as keyof typeof preferences] === o ? 'bg-slate-950 dark:bg-white text-white dark:text-slate-950 border-slate-950 dark:border-white shadow-xl' : 'bg-slate-50 dark:bg-white/5 text-slate-400 dark:text-slate-600 border-transparent hover:border-sky-200'}`}
                        >
                          {o}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex flex-col items-center gap-8">
                <button onClick={nextStep} className="bg-slate-950 dark:bg-white text-white dark:text-slate-950 font-bold px-16 py-7 rounded-full text-[11px] uppercase tracking-[0.5em] hover:bg-sky-500 dark:hover:bg-sky-400 transition-all shadow-xl">Confirm Logic</button>
                <button onClick={prevStep} className="text-slate-300 dark:text-slate-600 font-bold uppercase tracking-widest text-[9px] hover:text-slate-900 dark:hover:text-white transition-colors">← Back</button>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-16 animate-in fade-in slide-in-from-bottom-6 duration-700">
              <div className="text-center">
                <h3 className="text-3xl md:text-5xl font-serif font-bold text-slate-900 dark:text-white italic">Digital Dispatch</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
                 <input 
                  type="text" placeholder="FULL NAME" required
                  className="w-full bg-slate-50 dark:bg-white/5 border border-transparent dark:border-white/10 rounded-full px-8 py-5 text-[10px] font-bold text-slate-900 dark:text-white uppercase tracking-widest outline-none focus:border-sky-500 transition-all"
                  value={finalDetails.fullName} onChange={e => setFinalDetails({...finalDetails, fullName: e.target.value})}
                 />
                 <input 
                  type="email" placeholder="EMAIL ADDRESS" required
                  className="w-full bg-slate-50 dark:bg-white/5 border border-transparent dark:border-white/10 rounded-full px-8 py-5 text-[10px] font-bold text-slate-900 dark:text-white uppercase tracking-widest outline-none focus:border-sky-500 transition-all"
                  value={finalDetails.email} onChange={e => setFinalDetails({...finalDetails, email: e.target.value})}
                 />
                 <input 
                  type="text" placeholder="TRAVEL DATES (EX: MAY 2026)" required
                  className="w-full bg-slate-50 dark:bg-white/5 border border-transparent dark:border-white/10 rounded-full px-8 py-5 text-[10px] font-bold text-slate-900 dark:text-white uppercase tracking-widest outline-none focus:border-sky-500 transition-all"
                  value={finalDetails.dates} onChange={e => setFinalDetails({...finalDetails, dates: e.target.value})}
                 />
                 <input 
                  type="text" placeholder="APPROX BUDGET" required
                  className="w-full bg-slate-50 dark:bg-white/5 border border-transparent dark:border-white/10 rounded-full px-8 py-5 text-[10px] font-bold text-slate-900 dark:text-white uppercase tracking-widest outline-none focus:border-sky-500 transition-all"
                  value={finalDetails.budget} onChange={e => setFinalDetails({...finalDetails, budget: e.target.value})}
                 />
              </div>
              <div className="flex flex-col items-center gap-8">
                <button onClick={handleSubmit} disabled={isSubmitting} className="bg-slate-950 dark:bg-white text-white dark:text-slate-950 font-bold px-16 py-7 rounded-full text-[11px] uppercase tracking-[0.5em] hover:bg-sky-500 dark:hover:bg-sky-400 transition-all shadow-xl disabled:opacity-50">
                  {isSubmitting ? 'DISPATCHING...' : 'INITIATE PLANNING'}
                </button>
                <button onClick={prevStep} className="text-slate-300 dark:text-slate-600 font-bold uppercase tracking-widest text-[9px] hover:text-slate-900 dark:hover:text-white transition-colors">← Back</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PlanMyTrip;