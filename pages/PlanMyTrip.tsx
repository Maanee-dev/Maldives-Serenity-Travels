import React, { useState, useEffect, useMemo } from 'react';
import { RESORTS } from '../constants';
import { Link } from 'react-router-dom';

const PlanMyTrip: React.FC = () => {
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  
  // State for selections
  const [purpose, setPurpose] = useState('');
  const [selectedExperiences, setSelectedExperiences] = useState<string[]>([]);
  const [preferences, setPreferences] = useState({
    islandSize: '', // 'Small' | 'Large'
    priceLevel: '', // 'Luxury' | 'Affordable'
    villaType: '',  // 'Beach' | 'Water'
    pool: ''        // 'Pool' | 'No Pool'
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
    mealPlan: 'All Inclusive',
    budget: '',
    budgetType: 'Total'
  });

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [step]);

  // Logic Helpers
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
    if (!resortSearch) return [];
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
  };

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6 bg-[#FCFAF7]">
        <div className="text-center max-w-2xl reveal active">
           <span className="text-[10px] font-bold uppercase tracking-[1em] text-sky-500 mb-12 block">Inquiry Received</span>
           <h2 className="text-6xl md:text-8xl font-serif font-bold text-slate-900 mb-12 italic leading-none">Perspective <br/> Awaits.</h2>
           <div className="h-px w-24 bg-amber-400 mx-auto mb-16"></div>
           <p className="text-slate-500 uppercase tracking-[0.4em] text-[10px] leading-[2.5] mb-16 font-medium max-w-md mx-auto">
             Our specialists are curating your custom Maldivian portfolio. Expect a dispatch in your inbox shortly.
           </p>
           <Link 
             to="/"
             className="text-[10px] font-bold uppercase tracking-[0.8em] text-slate-950 border-b border-slate-950 pb-3 hover:text-sky-500 hover:border-sky-500 transition-all duration-700"
           >
             Return Home
           </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#FCFAF7] min-h-screen pt-32 pb-32 px-6">
      <div className="max-w-4xl mx-auto">
        
        <div className="text-center mb-16">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-[0.6em] block mb-4">REQUEST HOLIDAY QUOTES</span>
          <div className="flex justify-center items-center gap-2">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-bold transition-all ${step === 1 ? 'bg-slate-900 text-white shadow-xl scale-110' : 'bg-slate-100 text-slate-400'}`}>1</div>
            <div className="w-4 h-px bg-slate-200"></div>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-bold transition-all ${step === 2 ? 'bg-slate-900 text-white shadow-xl scale-110' : 'bg-slate-100 text-slate-400'}`}>2</div>
            <div className="w-4 h-px bg-slate-200"></div>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-bold transition-all ${step === 3 ? 'bg-slate-900 text-white shadow-xl scale-110' : 'bg-slate-100 text-slate-400'}`}>3</div>
            <div className="w-4 h-px bg-slate-200"></div>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-bold transition-all ${step === 4 ? 'bg-slate-900 text-white shadow-xl scale-110' : 'bg-slate-100 text-slate-400'}`}>4</div>
            <div className="w-4 h-px bg-slate-200"></div>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-bold transition-all ${step === 5 ? 'bg-slate-900 text-white shadow-xl scale-110' : 'bg-slate-100 text-slate-400'}`}>5</div>
          </div>
        </div>

        <div className="bg-white rounded-[4rem] p-8 md:p-20 shadow-2xl border border-slate-100 min-h-[700px] flex flex-col justify-center">
          
          {/* STEP 1: WHY ARE YOU COMING */}
          {step === 1 && (
            <div className="space-y-16 animate-in fade-in slide-in-from-bottom-6 duration-700">
              <div className="text-center">
                <div className="w-12 h-12 rounded-full bg-slate-950 text-white flex items-center justify-center font-bold mx-auto mb-8 text-sm">1</div>
                <h3 className="text-3xl md:text-5xl font-serif font-bold text-slate-900">Why are you coming to the Maldives?</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto">
                {[
                  { label: 'Honeymoon', key: 'A' },
                  { label: 'Wedding Anniversary', key: 'B' },
                  { label: 'Couples Holiday', key: 'C' },
                  { label: 'Family Holiday', key: 'D' },
                  { label: 'Solo Travel', key: 'E' },
                  { label: 'Group Holiday', key: 'F' }
                ].map((opt) => (
                  <button
                    key={opt.label}
                    onClick={() => { setPurpose(opt.label); nextStep(); }}
                    className={`group flex items-center gap-6 p-6 rounded-3xl border transition-all duration-500 text-left ${purpose === opt.label ? 'border-slate-900 bg-slate-900 text-white shadow-2xl scale-[1.02]' : 'border-slate-50 bg-slate-50/50 hover:border-sky-300'}`}
                  >
                    <span className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-[11px] transition-colors ${purpose === opt.label ? 'bg-white/10 text-white' : 'bg-white text-slate-300 shadow-sm'}`}>{opt.key}</span>
                    <span className="text-[11px] font-bold uppercase tracking-[0.2em]">{opt.label}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* STEP 2: EXPERIENCES */}
          {step === 2 && (
            <div className="space-y-16 animate-in fade-in slide-in-from-bottom-6 duration-700">
              <div className="text-center">
                <span className="text-[10px] font-bold text-sky-500 uppercase tracking-[1em] mb-6 block">EXPERIENCES</span>
                <h3 className="text-3xl md:text-5xl font-serif font-bold text-slate-900 leading-tight">What experiences are you most looking forward to?</h3>
                <p className="text-slate-400 text-[10px] uppercase tracking-[0.4em] mt-8 max-w-md mx-auto">Please choose up to three experiences or skip by clicking "No Preferences".</p>
              </div>
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-6 max-w-3xl mx-auto">
                {['Snorkelling', 'Scuba Diving', 'Surfing', 'Spa', 'Food', 'History & Culture'].map((exp) => (
                  <button
                    key={exp}
                    onClick={() => toggleExperience(exp)}
                    className={`p-10 rounded-[3rem] border transition-all duration-700 flex flex-col items-center justify-center gap-4 text-center ${selectedExperiences.includes(exp) ? 'border-slate-950 bg-slate-950 text-white shadow-2xl scale-[1.05]' : 'border-slate-50 bg-slate-50/50 hover:border-sky-200'}`}
                  >
                    <span className="text-[10px] font-bold uppercase tracking-[0.3em]">{exp}</span>
                    {selectedExperiences.includes(exp) && <div className="w-2 h-2 rounded-full bg-sky-400 shadow-[0_0_10px_rgba(56,189,248,0.5)]" />}
                  </button>
                ))}
              </div>
              <div className="flex flex-col items-center gap-8">
                <button 
                  onClick={nextStep}
                  className="bg-slate-950 text-white font-bold px-16 py-7 rounded-full text-[11px] uppercase tracking-[0.5em] hover:bg-sky-500 transition-all shadow-2xl"
                >
                  {selectedExperiences.length > 0 ? `Continue (${selectedExperiences.length}/3)` : 'No Preferences'}
                </button>
                <button onClick={prevStep} className="text-slate-300 font-bold uppercase tracking-widest text-[9px] hover:text-slate-950 transition-colors">← Back</button>
              </div>
            </div>
          )}

          {/* STEP 3: ISLAND PREFERENCES */}
          {step === 3 && (
            <div className="space-y-16 animate-in fade-in slide-in-from-bottom-6 duration-700">
              <div className="text-center">
                <span className="text-[10px] font-bold text-sky-500 uppercase tracking-[1em] mb-6 block">ISLANDS</span>
                <h3 className="text-3xl md:text-5xl font-serif font-bold text-slate-900">What do you prefer?</h3>
                <p className="text-slate-400 text-[10px] uppercase tracking-[0.4em] mt-8">Click the "No Preferences" button below if you would like to skip this step.</p>
              </div>

              <div className="space-y-12 max-w-2xl mx-auto">
                {[
                  { key: 'islandSize', opt1: 'Small Island', opt2: 'Large Island', letter: 'A' },
                  { key: 'priceLevel', opt1: 'Luxury Resort', opt2: 'Affordable Resort', letter: 'B' },
                  { key: 'villaType', opt1: 'Beach Villa', opt2: 'Water Villa', letter: 'C' },
                  { key: 'pool', opt1: 'A Villa with a Pool', opt2: 'No Pool', letter: 'D' }
                ].map((row) => (
                  <div key={row.key} className="flex flex-col gap-6">
                    <div className="flex items-center gap-4">
                       <span className="w-8 h-8 bg-slate-950 text-white text-[10px] font-bold flex items-center justify-center rounded-xl shadow-lg">{row.letter}</span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] items-center gap-4">
                      <button
                        onClick={() => setPreferences(prev => ({ ...prev, [row.key]: row.opt1 }))}
                        className={`py-5 rounded-2xl text-[10px] font-bold uppercase tracking-[0.3em] transition-all duration-500 border ${preferences[row.key as keyof typeof preferences] === row.opt1 ? 'bg-slate-950 text-white border-slate-950 shadow-xl scale-[1.02]' : 'bg-slate-50 text-slate-400 border-transparent hover:border-sky-200'}`}
                      >
                        {row.opt1}
                      </button>
                      <span className="text-[10px] font-serif italic text-slate-300 text-center">or</span>
                      <button
                        onClick={() => setPreferences(prev => ({ ...prev, [row.key]: row.opt2 }))}
                        className={`py-5 rounded-2xl text-[10px] font-bold uppercase tracking-[0.3em] transition-all duration-500 border ${preferences[row.key as keyof typeof preferences] === row.opt2 ? 'bg-slate-950 text-white border-slate-950 shadow-xl scale-[1.02]' : 'bg-slate-50 text-slate-400 border-transparent hover:border-sky-200'}`}
                      >
                        {row.opt2}
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex flex-col items-center gap-8 pt-8">
                <button 
                  onClick={nextStep}
                  className="bg-slate-950 text-white font-bold px-16 py-7 rounded-full text-[11px] uppercase tracking-[0.5em] hover:bg-sky-500 transition-all shadow-2xl"
                >
                  Continue
                </button>
                <button onClick={prevStep} className="text-slate-300 font-bold uppercase tracking-widest text-[9px] hover:text-slate-950 transition-colors">← Back</button>
              </div>
            </div>
          )}

          {/* STEP 4: RESORT SELECTION */}
          {step === 4 && (
            <div className="space-y-16 animate-in fade-in slide-in-from-bottom-6 duration-700">
              <div className="text-center">
                <span className="text-[10px] font-bold text-sky-500 uppercase tracking-[1em] mb-6 block">RESORTS</span>
                <h3 className="text-3xl md:text-5xl font-serif font-bold text-slate-900 italic">Preferred Resorts</h3>
                <p className="text-slate-400 text-[10px] uppercase tracking-[0.4em] mt-8">Search and pick between 3 resorts to refine our recommendations.</p>
              </div>

              <div className="max-w-xl mx-auto space-y-12">
                <div className="relative">
                  <input 
                    type="text"
                    value={resortSearch}
                    onChange={(e) => setResortSearch(e.target.value)}
                    placeholder="SEARCH PROPERTY NAME..."
                    className="w-full bg-slate-50 border border-slate-100 rounded-[2rem] px-10 py-6 text-[11px] font-bold uppercase tracking-[0.4em] outline-none focus:bg-white focus:border-sky-300 transition-all shadow-sm placeholder:text-slate-200"
                  />
                  {filteredResortList.length > 0 && (
                    <div className="absolute top-full left-0 right-0 mt-4 bg-white rounded-[2.5rem] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] border border-slate-50 overflow-hidden z-[100] p-4 space-y-2">
                      {filteredResortList.map(resort => (
                        <button
                          key={resort.id}
                          onClick={() => selectResort(resort.name)}
                          className="w-full flex items-center gap-6 p-5 hover:bg-slate-50 transition-all rounded-[1.5rem] text-left group"
                        >
                          <div className="w-14 h-14 rounded-full overflow-hidden bg-slate-100 flex-shrink-0 border-2 border-slate-50 group-hover:border-sky-400 transition-all">
                            <img src={resort.images[0]} className="w-full h-full object-cover" alt="" />
                          </div>
                          <div className="flex flex-col">
                             <span className="text-[11px] font-bold text-slate-900 uppercase tracking-widest group-hover:text-sky-500 transition-colors">{resort.name}</span>
                             <span className="text-[9px] font-bold text-slate-300 uppercase tracking-widest">{resort.atoll}</span>
                          </div>
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Selected Resorts List */}
                <div className="space-y-4">
                   {selectedResorts.map(name => {
                     const r = RESORTS.find(res => res.name === name);
                     return (
                       <div key={name} className="flex items-center justify-between p-6 bg-slate-950 rounded-[2rem] text-white shadow-2xl animate-in zoom-in-95 duration-500">
                          <div className="flex items-center gap-6">
                            <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white/10">
                               <img src={r?.images[0]} className="w-full h-full object-cover" alt="" />
                            </div>
                            <div className="flex flex-col">
                               <span className="text-[10px] font-bold uppercase tracking-widest">{name}</span>
                               <span className="text-[8px] text-white/40 uppercase tracking-widest">{r?.atoll}</span>
                            </div>
                          </div>
                          <button onClick={() => removeResort(name)} className="text-white/20 hover:text-white transition-colors w-8 h-8 flex items-center justify-center rounded-full border border-white/5 hover:bg-white/5">&times;</button>
                       </div>
                     )
                   })}
                   {selectedResorts.length === 0 && (
                     <p className="text-center text-slate-300 text-[10px] font-bold uppercase tracking-[0.4em] italic py-12 border-2 border-dashed border-slate-100 rounded-[2.5rem]">No resorts selected yet</p>
                   )}
                </div>
              </div>

              <div className="flex flex-col items-center gap-8 pt-12">
                <button 
                  onClick={nextStep}
                  className="bg-slate-950 text-white font-bold px-16 py-7 rounded-full text-[11px] uppercase tracking-[0.5em] hover:bg-sky-500 transition-all shadow-2xl"
                >
                  Continue to Final Step
                </button>
                <button onClick={prevStep} className="text-slate-300 font-bold uppercase tracking-widest text-[9px] hover:text-slate-950 transition-colors">← Back</button>
              </div>
            </div>
          )}

          {/* STEP 5: FINAL DETAILS */}
          {step === 5 && (
            <div className="space-y-16 animate-in fade-in slide-in-from-bottom-6 duration-700">
              <div className="text-center">
                <span className="text-[10px] font-bold text-sky-500 uppercase tracking-[1em] mb-6 block">FINAL DISPATCH</span>
                <h3 className="text-3xl md:text-6xl font-serif font-bold text-slate-900 tracking-tighter italic">Last step. We are almost there!</h3>
              </div>

              <form onSubmit={handleSubmit} className="space-y-10 max-w-4xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
                  {/* A: Full Name */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      <span className="w-6 h-6 bg-slate-950 text-white text-[9px] font-bold flex items-center justify-center rounded-lg">A</span>
                      <label className="text-[9px] font-bold uppercase tracking-widest text-slate-400">Full Name</label>
                    </div>
                    <input 
                      type="text" 
                      required
                      value={finalDetails.fullName}
                      onChange={e => setFinalDetails(prev => ({...prev, fullName: e.target.value}))}
                      className="w-full bg-slate-50 border-b border-slate-100 rounded-2xl px-8 py-5 text-[12px] font-bold uppercase tracking-widest focus:bg-white outline-none focus:border-sky-300 transition-all" 
                      placeholder="IDENTITY"
                    />
                  </div>
                  
                  {/* B: Phone */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      <span className="w-6 h-6 bg-slate-950 text-white text-[9px] font-bold flex items-center justify-center rounded-lg">B</span>
                      <label className="text-[9px] font-bold uppercase tracking-widest text-slate-400">Contact Number</label>
                    </div>
                    <div className="flex gap-4">
                      <select 
                        value={finalDetails.phoneCode}
                        onChange={e => setFinalDetails(prev => ({...prev, phoneCode: e.target.value}))}
                        className="bg-slate-50 border-b border-slate-100 rounded-2xl px-6 py-5 text-[11px] font-bold outline-none"
                      >
                        <option>+44</option>
                        <option>+1</option>
                        <option>+960</option>
                        <option>+971</option>
                        <option>+61</option>
                        <option>+33</option>
                      </select>
                      <input 
                        type="tel" 
                        required
                        value={finalDetails.phone}
                        onChange={e => setFinalDetails(prev => ({...prev, phone: e.target.value}))}
                        className="flex-grow bg-slate-50 border-b border-slate-100 rounded-2xl px-8 py-5 text-[12px] font-bold uppercase tracking-widest focus:bg-white outline-none focus:border-sky-300 transition-all" 
                        placeholder="07700 900000"
                      />
                    </div>
                  </div>

                  {/* C: Email */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      <span className="w-6 h-6 bg-slate-950 text-white text-[9px] font-bold flex items-center justify-center rounded-lg">C</span>
                      <label className="text-[9px] font-bold uppercase tracking-widest text-slate-400">Email Address</label>
                    </div>
                    <input 
                      type="email" 
                      required
                      value={finalDetails.email}
                      onChange={e => setFinalDetails(prev => ({...prev, email: e.target.value}))}
                      className="w-full bg-slate-50 border-b border-slate-100 rounded-2xl px-8 py-5 text-[12px] font-bold uppercase tracking-widest focus:bg-white outline-none focus:border-sky-300 transition-all" 
                      placeholder="DIGITAL SIGNATURE"
                    />
                  </div>

                  {/* D: Dates */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      <span className="w-6 h-6 bg-slate-950 text-white text-[9px] font-bold flex items-center justify-center rounded-lg">D</span>
                      <label className="text-[9px] font-bold uppercase tracking-widest text-slate-400">Travel Dates</label>
                    </div>
                    <input 
                      type="text" 
                      value={finalDetails.dates}
                      onChange={e => setFinalDetails(prev => ({...prev, dates: e.target.value}))}
                      className="w-full bg-slate-50 border-b border-slate-100 rounded-2xl px-8 py-5 text-[12px] font-bold uppercase tracking-widest focus:bg-white outline-none focus:border-sky-300 transition-all" 
                      placeholder="E.G. OCTOBER 2024"
                    />
                  </div>

                  {/* E: Guests */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      <span className="w-6 h-6 bg-slate-950 text-white text-[9px] font-bold flex items-center justify-center rounded-lg">E</span>
                      <label className="text-[9px] font-bold uppercase tracking-widest text-slate-400">Number of Guests</label>
                    </div>
                    <input 
                      type="number" 
                      min="1"
                      value={finalDetails.guests}
                      onChange={e => setFinalDetails(prev => ({...prev, guests: e.target.value}))}
                      className="w-full bg-slate-50 border-b border-slate-100 rounded-2xl px-8 py-5 text-[12px] font-bold uppercase tracking-widest focus:bg-white outline-none focus:border-sky-300 transition-all" 
                    />
                  </div>

                  {/* F: Meal Plan */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      <span className="w-6 h-6 bg-slate-950 text-white text-[9px] font-bold flex items-center justify-center rounded-lg">F</span>
                      <label className="text-[9px] font-bold uppercase tracking-widest text-slate-400">Meal Plan</label>
                    </div>
                    <select 
                      value={finalDetails.mealPlan}
                      onChange={e => setFinalDetails(prev => ({...prev, mealPlan: e.target.value}))}
                      className="w-full bg-slate-50 border-b border-slate-100 rounded-2xl px-8 py-5 text-[12px] font-bold uppercase tracking-widest focus:bg-white outline-none focus:border-sky-300 transition-all appearance-none"
                    >
                      <option>BED & BREAKFAST</option>
                      <option>HALF BOARD</option>
                      <option>FULL BOARD</option>
                      <option>ALL INCLUSIVE</option>
                    </select>
                  </div>

                  {/* G: Budget (USD) */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      <span className="w-6 h-6 bg-slate-950 text-white text-[9px] font-bold flex items-center justify-center rounded-lg">G</span>
                      <label className="text-[9px] font-bold uppercase tracking-widest text-slate-400">Budget (USD)</label>
                    </div>
                    <input 
                      type="text" 
                      value={finalDetails.budget}
                      onChange={e => setFinalDetails(prev => ({...prev, budget: e.target.value}))}
                      className="w-full bg-slate-50 border-b border-slate-100 rounded-2xl px-8 py-5 text-[12px] font-bold uppercase tracking-widest focus:bg-white outline-none focus:border-sky-300 transition-all" 
                      placeholder="AMOUNT"
                    />
                  </div>

                  {/* H: Budget Type */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      <span className="w-6 h-6 bg-slate-950 text-white text-[9px] font-bold flex items-center justify-center rounded-lg">H</span>
                      <label className="text-[9px] font-bold uppercase tracking-widest text-slate-400">Budget Scope</label>
                    </div>
                    <select 
                      value={finalDetails.budgetType}
                      onChange={e => setFinalDetails(prev => ({...prev, budgetType: e.target.value}))}
                      className="w-full bg-slate-50 border-b border-slate-100 rounded-2xl px-8 py-5 text-[12px] font-bold uppercase tracking-widest focus:bg-white outline-none focus:border-sky-300 transition-all appearance-none"
                    >
                      <option value="Total">Total Portfolio</option>
                      <option value="Per Night">Per Night Rate</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-8 pt-12 border-t border-slate-100">
                  <label className="flex items-start gap-6 cursor-pointer group">
                    <div className="relative flex items-center h-6">
                      <input type="checkbox" className="w-5 h-5 rounded border-slate-200 text-sky-500 focus:ring-sky-400 transition-all cursor-pointer" />
                    </div>
                    <span className="text-[11px] text-slate-500 font-bold uppercase tracking-widest leading-relaxed group-hover:text-slate-950 transition-colors">
                      Yes, I'd love to receive special offers and stay updated with the latest news from Maldives Experts
                    </span>
                  </label>
                  <p className="text-[9px] text-slate-300 font-bold uppercase tracking-[0.4em] leading-loose max-w-2xl italic">
                    Disclaimer: We will only use your phone number to communicate with you about the offers and quotations you request from us.
                  </p>
                </div>

                <div className="flex flex-col items-center gap-10 pt-16">
                   <button 
                    type="submit"
                    className="w-full bg-slate-950 text-white font-bold py-8 rounded-full text-[12px] uppercase tracking-[0.8em] hover:bg-sky-500 transition-all shadow-[0_40px_80px_-15px_rgba(0,0,0,0.3)] active:scale-[0.98] focus:ring-4 focus:ring-sky-200"
                   >
                    Request My Custom Quote
                   </button>
                   <button type="button" onClick={prevStep} className="text-slate-300 font-bold uppercase tracking-widest text-[9px] hover:text-slate-950 transition-colors">← Back to Portfolio</button>
                </div>
              </form>
            </div>
          )}

        </div>

        <div className="mt-20 text-center opacity-40">
           <p className="text-slate-500 text-[10px] font-bold uppercase tracking-[1em]">
              Defined by Perspective. Serenity Maldives Concierge.
           </p>
        </div>
      </div>
    </div>
  );
};

export default PlanMyTrip;