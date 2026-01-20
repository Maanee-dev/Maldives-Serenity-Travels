
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
           <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-slate-300 mb-12 block">Confirmation</span>
           <h2 className="text-5xl md:text-7xl font-serif font-bold text-slate-900 mb-8 italic">Your journey begins.</h2>
           <p className="text-slate-400 uppercase tracking-[0.2em] text-xs leading-loose mb-12 font-medium">
             Our specialists have received your inquiry. A personalized portfolio of options will be delivered to your inbox shortly.
           </p>
           <button 
             onClick={() => setSubmitted(false)}
             className="text-[10px] font-bold uppercase tracking-[0.4em] text-slate-900 border-b border-slate-900 pb-1"
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
          <span className="text-[10px] font-bold text-slate-300 uppercase tracking-[0.5em] mb-6 block">Travel Concierge</span>
          <h1 className="text-5xl md:text-8xl font-serif font-bold text-slate-900 mb-8 italic">Bespoke Planning</h1>
          <p className="text-slate-400 text-xs font-bold uppercase tracking-[0.3em]">Define your vision. We handle the rest.</p>
        </div>

        <div className="max-w-2xl mx-auto reveal active">
          {/* Progress Bar - Minimal */}
          <div className="flex justify-between items-center mb-16 px-2">
             {[1, 2, 3].map(i => (
               <div key={i} className={`h-1.5 rounded-full transition-all duration-700 ${step >= i ? 'bg-slate-900 w-1/3' : 'bg-slate-100 w-8'}`}></div>
             ))}
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-12">
            {step === 1 && (
              <div className="space-y-12">
                <h3 className="text-3xl font-serif font-bold text-slate-900 mb-12 italic text-center">What is the occasion?</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {['Honeymoon', 'Family Holiday', 'Diving Expedition', 'Pure Relaxation'].map(opt => (
                    <button 
                      key={opt}
                      type="button" 
                      onClick={nextStep}
                      className="text-center p-8 rounded-[2.5rem] bg-white border border-slate-100 hover:border-slate-900 hover:shadow-xl transition-all group"
                    >
                      <span className="block text-[10px] font-bold text-slate-900 uppercase tracking-[0.3em]">{opt}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-12">
                <h3 className="text-3xl font-serif font-bold text-slate-900 mb-12 italic text-center">Logistics</h3>
                <div className="space-y-8">
                  <div className="border-b border-slate-100 py-4">
                    <label className="block text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-4">Estimated Budget</label>
                    <select className="w-full bg-transparent text-slate-900 font-bold uppercase tracking-widest text-sm focus:outline-none cursor-pointer">
                      <option>$3,000 - $7,000</option>
                      <option>$7,000 - $15,000</option>
                      <option>$15,000+</option>
                    </select>
                  </div>
                  <div className="border-b border-slate-100 py-4">
                    <label className="block text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-4">Travel Window</label>
                    <input type="text" placeholder="E.G. LATE AUGUST" className="w-full bg-transparent text-slate-900 font-bold uppercase tracking-widest text-sm focus:outline-none" />
                  </div>
                </div>
                <div className="flex gap-12 pt-8">
                   <button type="button" onClick={prevStep} className="text-[10px] font-bold text-slate-300 uppercase tracking-widest">Back</button>
                   <button type="button" onClick={nextStep} className="flex-grow bg-slate-950 text-white font-bold py-5 rounded-full text-[10px] uppercase tracking-[0.4em] hover:bg-sky-500 transition-all">Next</button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-12">
                <h3 className="text-3xl font-serif font-bold text-slate-900 mb-12 italic text-center">Contact Details</h3>
                <div className="space-y-8">
                  <input type="text" placeholder="FULL NAME" required className="w-full bg-transparent border-b border-slate-100 py-4 text-sm font-bold uppercase tracking-widest focus:outline-none focus:border-slate-900" />
                  <input type="email" placeholder="EMAIL ADDRESS" required className="w-full bg-transparent border-b border-slate-100 py-4 text-sm font-bold uppercase tracking-widest focus:outline-none focus:border-slate-900" />
                  <textarea placeholder="ADDITIONAL NOTES" rows={3} className="w-full bg-transparent border-b border-slate-100 py-4 text-sm font-bold uppercase tracking-widest focus:outline-none focus:border-slate-900"></textarea>
                </div>
                <div className="flex gap-12 pt-8">
                   <button type="button" onClick={prevStep} className="text-[10px] font-bold text-slate-300 uppercase tracking-widest">Back</button>
                   <button type="submit" className="flex-grow bg-slate-950 text-white font-bold py-5 rounded-full text-[10px] uppercase tracking-[0.4em] hover:bg-sky-500 transition-all shadow-2xl">Send Request</button>
                </div>
              </div>
            )}
          </form>
        </div>
        
        <div className="mt-24 text-center">
           <p className="text-slate-300 text-[8px] font-bold uppercase tracking-[0.5em]">
              Your privacy is our priority. Serenity Concierge Management.
           </p>
        </div>
      </div>
    </div>
  );
};

export default PlanMyTrip;
