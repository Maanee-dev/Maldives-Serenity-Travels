import React, { useState, useEffect } from 'react';

const PlanMyTrip: React.FC = () => {
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('active');
      });
    }, { threshold: 0.1 });
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, [step, submitted]);

  const nextStep = () => setStep(s => s + 1);
  const prevStep = () => setStep(s => s - 1);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6 bg-[#FCFAF7]">
        <div className="text-center max-w-2xl reveal active">
           <span className="text-[10px] font-bold uppercase tracking-[1em] text-sky-500 mb-12 block">Confirmation</span>
           <h2 className="text-6xl md:text-9xl font-serif font-bold text-slate-900 mb-12 italic leading-none">Your journey <br/> begins.</h2>
           <div className="h-px w-24 bg-amber-400 mx-auto mb-16"></div>
           <p className="text-slate-500 uppercase tracking-[0.4em] text-[10px] leading-[2.5] mb-16 font-medium max-w-md mx-auto">
             Our specialists have received your vision. A personalized portfolio of curated sanctuaries will be delivered to your inbox shortly.
           </p>
           <button 
             onClick={() => setSubmitted(false)}
             className="text-[10px] font-bold uppercase tracking-[0.8em] text-slate-950 border-b border-slate-950 pb-3 hover:text-sky-500 hover:border-sky-500 transition-all duration-700"
           >
             Return
           </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#FCFAF7] min-h-screen py-64 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-40 reveal">
          <span className="text-[10px] font-bold text-sky-500 uppercase tracking-[1em] mb-12 block">Travel Concierge</span>
          <h1 className="text-6xl md:text-9xl font-serif font-bold text-slate-900 mb-16 tracking-tighter italic leading-none">Bespoke Planning</h1>
          <div className="h-px w-24 bg-amber-400 mx-auto mb-16"></div>
          <p className="text-slate-500 text-[11px] font-bold uppercase tracking-[0.5em] leading-[2.5] max-w-xl mx-auto opacity-90">
            Define your perspective. We manage the logistics <br className="hidden md:block"/> of your Maldivian sanctuary.
          </p>
        </div>

        <div className="max-w-3xl mx-auto reveal transition-all duration-1000 delay-300">
          {/* Progress Indicator - Minimalist */}
          <div className="flex justify-between items-center mb-32 px-4">
             {[1, 2, 3].map(i => (
               <div key={i} className="flex flex-col items-center gap-6 group">
                  <div className={`w-2 h-2 rounded-full transition-all duration-1000 ${step >= i ? 'bg-slate-950 scale-[2]' : 'bg-slate-200'}`}></div>
                  <span className={`text-[8px] font-bold uppercase tracking-widest transition-all duration-700 ${step === i ? 'text-slate-900 opacity-100' : 'text-slate-500 opacity-0'}`}>Phase {i}</span>
               </div>
             ))}
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-24">
            {step === 1 && (
              <div className="space-y-16 reveal">
                <h3 className="text-4xl font-serif font-bold text-slate-900 mb-16 italic text-center">What is the occasion?</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {['Honeymoon', 'Family Holiday', 'Diving Expedition', 'Pure Relaxation'].map(opt => (
                    <button 
                      key={opt}
                      type="button" 
                      onClick={nextStep}
                      className="text-center p-12 rounded-[3.5rem] bg-white border border-slate-100 hover:border-slate-950 hover:shadow-2xl transition-all duration-700 group relative overflow-hidden"
                    >
                      <div className="absolute inset-0 bg-slate-950 translate-y-full group-hover:translate-y-0 transition-transform duration-700"></div>
                      <span className="relative z-10 block text-[10px] font-bold text-slate-950 group-hover:text-white uppercase tracking-[0.4em] transition-colors">{opt}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-16 reveal">
                <h3 className="text-4xl font-serif font-bold text-slate-900 mb-16 italic text-center">The Logistics</h3>
                <div className="space-y-12">
                  <div className="border-b border-slate-200 py-6 transition-all focus-within:border-slate-950">
                    <label className="block text-[9px] font-bold text-slate-500 uppercase tracking-[0.6em] mb-6">Investment Range</label>
                    <select className="w-full bg-transparent text-slate-950 font-bold uppercase tracking-[0.4em] text-xs md:text-sm focus:outline-none cursor-pointer">
                      <option>$3,000 - $7,000</option>
                      <option>$7,000 - $15,000</option>
                      <option>$15,000 - $30,000</option>
                      <option>$30,000+</option>
                    </select>
                  </div>
                  <div className="border-b border-slate-200 py-6 transition-all focus-within:border-slate-950">
                    <label className="block text-[9px] font-bold text-slate-500 uppercase tracking-[0.6em] mb-6">Travel Window</label>
                    <input type="text" placeholder="E.G. LATE SEPTEMBER" className="w-full bg-transparent text-slate-950 font-bold uppercase tracking-[0.4em] text-xs md:text-sm focus:outline-none placeholder:text-slate-200" />
                  </div>
                </div>
                <div className="flex gap-16 pt-16">
                   <button type="button" onClick={prevStep} className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.5em] hover:text-slate-950 transition-colors">Back</button>
                   <button type="button" onClick={nextStep} className="flex-grow bg-slate-950 text-white font-bold py-6 rounded-full text-[10px] uppercase tracking-[0.5em] hover:bg-sky-500 transition-all duration-700 shadow-xl">Next Phase</button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-16 reveal">
                <h3 className="text-4xl font-serif font-bold text-slate-900 mb-16 italic text-center">Contact Protocol</h3>
                <div className="space-y-12">
                  <div className="border-b border-slate-200 py-6 transition-all focus-within:border-slate-950">
                    <label className="block text-[9px] font-bold text-slate-500 uppercase tracking-[0.6em] mb-6">Full Name</label>
                    <input type="text" placeholder="LEAVE BLANK FOR ANONYMOUS INITIAL INQUIRY" required className="w-full bg-transparent py-2 text-xs md:text-sm font-bold uppercase tracking-[0.4em] focus:outline-none text-slate-950 placeholder:text-slate-200" />
                  </div>
                  <div className="border-b border-slate-200 py-6 transition-all focus-within:border-slate-950">
                    <label className="block text-[9px] font-bold text-slate-500 uppercase tracking-[0.6em] mb-6">Email Signature</label>
                    <input type="email" placeholder="WHERE TO SEND THE PORTFOLIO" required className="w-full bg-transparent py-2 text-xs md:text-sm font-bold uppercase tracking-[0.4em] focus:outline-none text-slate-950 placeholder:text-slate-200" />
                  </div>
                  <div className="border-b border-slate-200 py-6 transition-all focus-within:border-slate-950">
                    <label className="block text-[9px] font-bold text-slate-500 uppercase tracking-[0.6em] mb-6">Manifesto & Notes</label>
                    <textarea placeholder="ANY SPECIFIC ISLANDS OR PREFERENCES" rows={3} className="w-full bg-transparent py-2 text-xs md:text-sm font-bold uppercase tracking-[0.2em] focus:outline-none text-slate-950 placeholder:text-slate-200 leading-loose"></textarea>
                  </div>
                </div>
                <div className="flex gap-16 pt-16">
                   <button type="button" onClick={prevStep} className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.5em] hover:text-slate-950 transition-colors">Back</button>
                   <button type="submit" className="flex-grow bg-slate-950 text-white font-bold py-6 rounded-full text-[10px] uppercase tracking-[0.6em] hover:bg-sky-500 transition-all duration-700 shadow-2xl">Send Vision</button>
                </div>
              </div>
            )}
          </form>
        </div>
        
        <div className="mt-48 text-center opacity-60">
           <p className="text-slate-500 text-[9px] font-bold uppercase tracking-[0.8em]">
              Data Sovereignty Guaranteed. Serenity Boutique Travels.
           </p>
        </div>
      </div>
    </div>
  );
};

export default PlanMyTrip;