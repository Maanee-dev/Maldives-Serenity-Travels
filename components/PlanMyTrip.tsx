'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { RESORTS } from '@/constants';
import Link from 'next/link';

const STORAGE_KEY = 'serenity_planning_draft';

const PlanMyTrip: React.FC = () => {
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  
  // Selection States
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

  // Load state from localStorage on mount
  useEffect(() => {
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
      } catch (e) {
        console.error("Failed to load draft:", e);
      }
    }
  }, []);

  // Save state to localStorage
  useEffect(() => {
    const dataToSave = {
      step,
      purpose,
      selectedExperiences,
      preferences,
      selectedResorts,
      finalDetails
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(dataToSave));
  }, [step, purpose, selectedExperiences, preferences, selectedResorts, finalDetails]);

  const nextStep = () => setStep(s => s + 1);
  const prevStep = () => setStep(s => s - 1);

  const toggleExperience = (exp: string) => {
    if (selectedExperiences.includes(exp)) {
      setSelectedExperiences(prev => prev.filter(e => e !== exp));
    } else if (selectedExperiences.length < 3) {
      setSelectedExperiences(prev => [...prev, exp]);
    }
  };

  const filteredResortList = useMemo(() => {
    if (!resortSearch || resortSearch.length < 2) return [];
    return RESORTS.filter(r => 
      r.name.toLowerCase().includes(resortSearch.toLowerCase()) && 
      !selectedResorts.includes(r.name)
    ).slice(0, 5);
  }, [resortSearch, selectedResorts]);

  const selectResort = (name: string) => {
    if (selectedResorts.length < 3) {
      setSelectedResorts(prev => [...prev, name]);
      setResortSearch('');
    }
  };

  const removeResort = (name: string) => {
    setSelectedResorts(prev => prev.filter(r => r !== name));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    localStorage.removeItem(STORAGE_KEY);
  };

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6 bg-[#FCFAF7]">
        <div className="text-center max-w-2xl animate-in fade-in duration-1000">
           <span className="text-[10px] font-bold uppercase tracking-[1em] text-sky-500 mb-12 block">Dispatch Received</span>
           <h2 className="text-6xl md:text-8xl font-serif font-bold text-slate-900 mb-12 italic leading-none">Perspective <br/> Awaits.</h2>
           <div className="h-px w-24 bg-amber-400 mx-auto mb-16"></div>
           <p className="text-slate-500 uppercase tracking-[0.4em] text-[10px] leading-[2.5] mb-16 font-medium max-w-md mx-auto">
             Our specialists are curating your custom Maldivian portfolio. Expect a digital dispatch in your inbox within 24 hours.
           </p>
           <Link href="/" className="text-[10px] font-bold uppercase tracking-[0.8em] text-slate-950 border-b border-slate-950 pb-3 hover:text-sky-500 hover:border-sky-500 transition-all duration-700">Return Home</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#FCFAF7] min-h-screen pt-40 pb-32 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-[0.6em] block mb-4">REQUEST HOLIDAY QUOTES</span>
          <div className="flex justify-center items-center gap-2">
            {[1, 2, 3, 4, 5].map(i => (
              <React.Fragment key={i}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-bold transition-all ${step === i ? 'bg-slate-950 text-white shadow-xl scale-110' : step > i ? 'bg-slate-950 text-white' : 'bg-slate-100 text-slate-400'}`}>{i}</div>
                {i < 5 && <div className="w-4 h-px bg-slate-200"></div>}
              </React.Fragment>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-[4rem] p-8 md:p-20 shadow-2xl border border-slate-100 min-h-[600px] flex flex-col justify-center">
          {step === 1 && (
            <div className="space-y-16 animate-in slide-in-from-bottom-6 duration-700">
              <div className="text-center">
                <div className="w-12 h-12 rounded-full bg-slate-950 text-white flex items-center justify-center font-bold mx-auto mb-8 text-sm">1</div>
                <h3 className="text-3xl md:text-5xl font-serif font-bold text-slate-900 leading-tight">Why are you coming to the Maldives?</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto">
                {['Honeymoon', 'Wedding Anniversary', 'Couples Holiday', 'Family Holiday', 'Solo Travel', 'Group Holiday'].map((label) => (
                  <button
                    key={label}
                    onClick={() => { setPurpose(label); nextStep(); }}
                    className={`group flex items-center gap-6 p-6 rounded-3xl border transition-all duration-500 text-left ${purpose === label ? 'border-slate-900 bg-slate-900 text-white shadow-2xl scale-[1.02]' : 'border-slate-50 bg-slate-50/50 hover:border-sky-300'}`}
                  >
                    <span className="text-[11px] font-bold uppercase tracking-[0.2em]">{label}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-16 animate-in slide-in-from-bottom-6 duration-700">
              <div className="text-center">
                <h3 className="text-3xl md:text-5xl font-serif font-bold text-slate-900 leading-tight">Desired Experiences</h3>
                <p className="text-slate-400 text-[10px] uppercase tracking-[0.4em] mt-8 max-w-md mx-auto">Pick up to three favorites.</p>
              </div>
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-6 max-w-3xl mx-auto">
                {['Snorkelling', 'Scuba Diving', 'Surfing', 'Spa', 'Food', 'History & Culture'].map((exp) => (
                  <button
                    key={exp}
                    onClick={() => toggleExperience(exp)}
                    className={`p-10 rounded-[3rem] border transition-all duration-700 flex flex-col items-center justify-center gap-4 text-center ${selectedExperiences.includes(exp) ? 'border-slate-950 bg-slate-950 text-white shadow-2xl scale-[1.05]' : 'border-slate-50 bg-slate-50/50 hover:border-sky-200'}`}
                  >
                    <span className="text-[10px] font-bold uppercase tracking-[0.3em]">{exp}</span>
                  </button>
                ))}
              </div>
              <div className="flex flex-col items-center gap-8 pt-8">
                <button onClick={nextStep} className="bg-slate-950 text-white font-bold px-16 py-7 rounded-full text-[11px] uppercase tracking-[0.5em] hover:bg-sky-500 transition-all shadow-2xl">
                  {selectedExperiences.length > 0 ? `Continue (${selectedExperiences.length}/3)` : 'No Preferences'}
                </button>
                <button onClick={prevStep} className="text-slate-300 font-bold uppercase tracking-widest text-[9px] hover:text-slate-950 transition-colors">← Back</button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-16 animate-in slide-in-from-bottom-6 duration-700">
               <h3 className="text-3xl md:text-5xl font-serif font-bold text-slate-900 text-center">Island Preferences</h3>
               <div className="space-y-12 max-w-2xl mx-auto">
                {[
                  { key: 'islandSize', opt1: 'Small Island', opt2: 'Large Island' },
                  { key: 'priceLevel', opt1: 'Luxury Resort', opt2: 'Affordable Resort' },
                  { key: 'villaType', opt1: 'Beach Villa', opt2: 'Water Villa' }
                ].map((row) => (
                  <div key={row.key} className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] items-center gap-4">
                    <button
                      onClick={() => setPreferences(prev => ({ ...prev, [row.key]: row.opt1 }))}
                      className={`py-5 rounded-2xl text-[10px] font-bold uppercase tracking-[0.3em] transition-all duration-500 border ${preferences[row.key as keyof typeof preferences] === row.opt1 ? 'bg-slate-950 text-white border-slate-950 shadow-xl' : 'bg-slate-50 text-slate-400 border-transparent hover:border-sky-200'}`}
                    >
                      {row.opt1}
                    </button>
                    <span className="text-[10px] font-serif italic text-slate-300 text-center">or</span>
                    <button
                      onClick={() => setPreferences(prev => ({ ...prev, [row.key]: row.opt2 }))}
                      className={`py-5 rounded-2xl text-[10px] font-bold uppercase tracking-[0.3em] transition-all duration-500 border ${preferences[row.key as keyof typeof preferences] === row.opt2 ? 'bg-slate-950 text-white border-slate-950 shadow-xl' : 'bg-slate-50 text-slate-400 border-transparent hover:border-sky-200'}`}
                    >
                      {row.opt2}
                    </button>
                  </div>
                ))}
              </div>
              <div className="flex flex-col items-center gap-8 pt-8">
                <button onClick={nextStep} className="bg-slate-950 text-white font-bold px-16 py-7 rounded-full text-[11px] uppercase tracking-[0.5em] hover:bg-sky-500 transition-all shadow-2xl">Continue</button>
                <button onClick={prevStep} className="text-slate-300 font-bold uppercase tracking-widest text-[9px] hover:text-slate-950 transition-colors">← Back</button>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-16 animate-in slide-in-from-bottom-6 duration-700">
               <h3 className="text-3xl md:text-5xl font-serif font-bold text-slate-900 italic text-center">Select Preferred Resorts</h3>
               <div className="max-w-xl mx-auto space-y-12">
                <input 
                  type="text"
                  value={resortSearch}
                  onChange={(e) => setResortSearch(e.target.value)}
                  placeholder="SEARCH PROPERTY NAME..."
                  className="w-full bg-slate-50 border-b border-slate-100 rounded-[2rem] px-10 py-6 text-[11px] font-bold uppercase tracking-[0.4em] outline-none focus:bg-white focus:border-sky-300 transition-all shadow-sm"
                />
                {filteredResortList.length > 0 && (
                  <div className="absolute bg-white rounded-[2rem] shadow-2xl border p-4 z-50">
                    {filteredResortList.map(r => (
                      <button key={r.id} onClick={() => selectResort(r.name)} className="w-full p-4 hover:bg-slate-50 text-left text-[11px] font-bold uppercase">
                        {r.name}
                      </button>
                    ))}
                  </div>
                )}
                <div className="space-y-4">
                  {selectedResorts.map(name => (
                    <div key={name} className="flex items-center justify-between p-6 bg-slate-950 rounded-[2rem] text-white">
                      <span className="text-[10px] font-bold uppercase">{name}</span>
                      <button onClick={() => removeResort(name)} className="text-white/40 hover:text-white">&times;</button>
                    </div>
                  ))}
                </div>
               </div>
               <div className="flex flex-col items-center gap-8 pt-12">
                <button onClick={nextStep} className="bg-slate-950 text-white font-bold px-16 py-7 rounded-full text-[11px] uppercase tracking-[0.5em] hover:bg-sky-500 transition-all shadow-2xl">Final Step</button>
                <button onClick={prevStep} className="text-slate-300 font-bold uppercase tracking-widest text-[9px] hover:text-slate-950 transition-colors">← Back</button>
              </div>
            </div>
          )}

          {step === 5 && (
            <form onSubmit={handleSubmit} className="space-y-10 animate-in slide-in-from-bottom-6 duration-700">
              <h3 className="text-3xl md:text-5xl font-serif font-bold text-slate-900 italic text-center">Your Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10 max-w-4xl mx-auto">
                  <input required value={finalDetails.fullName} onChange={e => setFinalDetails({...finalDetails, fullName: e.target.value})} className="w-full bg-slate-50 rounded-2xl px-8 py-5 text-[12px] font-bold uppercase outline-none focus:border-sky-300 border-b border-slate-100" placeholder="FULL NAME" />
                  <input required value={finalDetails.email} onChange={e => setFinalDetails({...finalDetails, email: e.target.value})} className="w-full bg-slate-50 rounded-2xl px-8 py-5 text-[12px] font-bold uppercase outline-none focus:border-sky-300 border-b border-slate-100" placeholder="EMAIL ADDRESS" />
                  <input required value={finalDetails.phone} onChange={e => setFinalDetails({...finalDetails, phone: e.target.value})} className="w-full bg-slate-50 rounded-2xl px-8 py-5 text-[12px] font-bold uppercase outline-none focus:border-sky-300 border-b border-slate-100" placeholder="PHONE NUMBER" />
                  <input value={finalDetails.dates} onChange={e => setFinalDetails({...finalDetails, dates: e.target.value})} className="w-full bg-slate-50 rounded-2xl px-8 py-5 text-[12px] font-bold uppercase outline-none focus:border-sky-300 border-b border-slate-100" placeholder="TRAVEL DATES" />
              </div>
              <div className="pt-12 flex flex-col items-center gap-8">
                <button type="submit" className="w-full max-w-xl bg-slate-950 text-white font-bold py-7 rounded-full text-[11px] uppercase tracking-[0.8em] hover:bg-sky-500 transition-all duration-700 shadow-2xl">
                  Submit Inquiry
                </button>
                <button type="button" onClick={prevStep} className="text-slate-300 font-bold uppercase tracking-widest text-[9px] hover:text-slate-950 transition-colors">← Back</button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default PlanMyTrip;
