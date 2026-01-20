import React, { useState } from 'react';

const PlanMyTrip: React.FC = () => {
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);

  const nextStep = () => setStep(s => s + 1);
  const prevStep = () => setStep(s => s - 1);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6 bg-[#FCFAF7]">
        <div className="text-center max-w-lg reveal active">
           <div className="w-32 h-32 bg-sky-500 rounded-full flex items-center justify-center mx-auto mb-16 shadow-2xl border-4 border-white">
              <svg className="w-16 h-16 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
           </div>
           <h2 className="text-5xl md:text-7xl font-serif font-bold text-slate-900 mb-8 italic">Your journey begins.</h2>
           <p className="text-slate-500 uppercase tracking-[0.2em] text-xs leading-loose mb-12 font-bold">
             Our specialists have received your inquiry. A personalized portfolio will be delivered shortly.
           </p>
           <button 
             onClick={() => setSubmitted(false)}
             className="text-[12px] font-bold uppercase tracking-[0.6em] bg-amber-500 text-white px-12 py-5 rounded-full hover:bg-slate-900 transition-all"
           >
             Return to Serenity
           </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#FCFAF7] min-h-screen py-48 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-24 reveal active">
          <span className="text-[12px] font-bold text-amber-500 uppercase tracking-[0.6em] mb-6 block">Travel Concierge</span>
          <h1 className="text-6xl md:text-[6rem] font-serif font-bold text-slate-900 mb-8 italic tracking-tighter">Bespoke Planning</h1>
          <p className="text-slate-400 text-[11px] font-bold uppercase tracking-[0.4em]">Define your vision. We handle the rest.</p>
        </div>

        <div className="max-w-2xl mx-auto reveal active">
          {/* Solid Progress Bar */}
          <div className="flex gap-4 mb-20">
             {[1, 2, 3].map(i => (
               <div key={i} className={`h-2 rounded-full flex-grow transition-all duration-500 ${step === i ? 'bg-amber-500' : step > i ? 'bg-sky-500' : 'bg-slate-100'}`}></div>
             ))}
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-16">
            {step === 1 && (
              <div className="space-y-16 animate-in fade-in duration-700">
                <h3 className="text-4xl font-serif font-bold text-slate-900 mb-12 italic text-center">What is the occasion?</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {['Honeymoon', 'Family Holiday', 'Diving Expedition', 'Pure Relaxation'].map(opt => (
                    <button 
                      key={opt}
                      type="button" 
                      onClick={nextStep}
                      className="text-center p-10 rounded-[2.5rem] bg-white border-2 border-slate-100 hover:border-sky-500 hover:shadow-2xl transition-all group"
                    >
                      <span className="block text-[11px] font-bold text-slate-900 uppercase tracking-[0.4em] group-hover:text-sky-500">{opt}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-16 animate-in fade-in duration-700">
                <h3 className="text-4xl font-serif font-bold text-slate-900 mb-12 italic text-center">Logistics</h3>
                <div className="space-y-10">
                  <div className="border-b-4 border-slate-50 py-6">
                    <label className="block text-[11px] font-bold text-slate-300 uppercase tracking-widest mb-6">Estimated Budget</label>
                    <select className="w-full bg-transparent text-sky-500 font-bold uppercase tracking-widest text-lg focus:outline-none cursor-pointer">
                      <option>$3,000 - $7,000</option>
                      <option>$7,000 - $15,000</option>
                      <option>$15,000+</option>
                    </select>
                  </div>
                  <div className="border-b-4 border-slate-50 py-6">
                    <label className="block text-[11px] font-bold text-slate-300 uppercase tracking-widest mb-6">Travel Window</label>
                    <input type="text" placeholder="E.G. LATE OCTOBER" className="w-full bg-transparent text-amber-500 font-bold uppercase tracking-widest text-lg focus:outline-none" />
                  </div>
                </div>
                <div className="flex gap-10 pt-10">
                   <button type="button" onClick={prevStep} className="text-[12px] font-bold text-slate-400 uppercase tracking-widest hover:text-slate-900 transition-colors">Back</button>
                   <button type="button" onClick={nextStep} className="flex-grow btn-atoll py-8 rounded-full text-[12px] font-bold uppercase tracking-[0.5em]">Continue</button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-16 animate-in fade-in duration-700">
                <h3 className="text-4xl font-serif font-bold text-slate-900 mb-12 italic text-center">Contact Details</h3>
                <div className="space-y-10">
                  <input type="text" placeholder="FULL NAME" required className="w-full bg-transparent border-b-4 border-slate-50 py-6 text-lg font-bold uppercase tracking-widest focus:outline-none focus:border-sky-500" />
                  <input type="email" placeholder="EMAIL ADDRESS" required className="w-full bg-transparent border-b-4 border-slate-50 py-6 text-lg font-bold uppercase tracking-widest focus:outline-none focus:border-amber-500" />
                </div>
                <div className="flex gap-10 pt-10">
                   <button type="button" onClick={prevStep} className="text-[12px] font-bold text-slate-400 uppercase tracking-widest hover:text-slate-900 transition-colors">Back</button>
                   <button type="submit" className="flex-grow btn-atoll py-8 rounded-full text-[12px] font-bold uppercase tracking-[0.5em] shadow-2xl">Send Request</button>
                </div>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default PlanMyTrip;