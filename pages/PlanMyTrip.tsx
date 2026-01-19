
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
      <div className="min-h-[70vh] flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl p-12 text-center shadow-2xl max-w-lg border border-slate-100">
           <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-8 text-4xl">
              ✓
           </div>
           <h2 className="text-3xl font-serif font-bold text-slate-900 mb-4">Request Received!</h2>
           <p className="text-slate-600 mb-8 leading-relaxed">
             Our Maldives specialists are now analyzing your preferences. You will receive a personalized itinerary and quote via email within 24 hours.
           </p>
           <button 
             onClick={() => setSubmitted(false)}
             className="bg-sky-600 text-white font-bold px-10 py-4 rounded-xl hover:bg-sky-700 transition-all shadow-lg"
           >
             RETURN TO SITE
           </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-50 min-h-screen py-16 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-serif font-bold text-slate-900 mb-4">Plan Your Serenity Escape</h1>
          <p className="text-slate-500 font-medium italic">Tell us your vision, and we'll handle the rest.</p>
        </div>

        <div className="bg-white rounded-[2rem] shadow-2xl border border-slate-100 overflow-hidden">
          <div className="h-2 bg-slate-100 w-full">
             <div className="h-full bg-sky-600 transition-all duration-500" style={{ width: `${(step / 3) * 100}%` }}></div>
          </div>
          
          <form onSubmit={handleSubmit} className="p-8 md:p-12">
            {step === 1 && (
              <div className="animate-in fade-in slide-in-from-right-4 duration-500">
                <h3 className="text-2xl font-serif font-bold mb-8">1. What kind of trip are you planning?</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {['Honeymoon / Romance', 'Family Holiday', 'Scuba Diving / Adventure', 'Budget & Authenticity'].map(opt => (
                    <button 
                      key={opt}
                      type="button" 
                      onClick={nextStep}
                      className="text-left p-6 rounded-2xl border-2 border-slate-100 hover:border-sky-500 hover:bg-sky-50 transition-all group"
                    >
                      <span className="block font-bold text-slate-900 group-hover:text-sky-700">{opt}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="animate-in fade-in slide-in-from-right-4 duration-500">
                <h3 className="text-2xl font-serif font-bold mb-8">2. Budget & Duration</h3>
                <div className="space-y-6">
                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Estimated Budget per Person (Excl. Flights)</label>
                    <select className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-4 text-sm focus:outline-none">
                      <option>$1,000 - $3,000</option>
                      <option>$3,000 - $7,000</option>
                      <option>$7,000 - $15,000</option>
                      <option>$15,000+</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Approximate Travel Dates</label>
                    <input type="text" placeholder="e.g. Early August 2024" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-4 text-sm focus:outline-none" />
                  </div>
                </div>
                <div className="flex gap-4 mt-12">
                   <button type="button" onClick={prevStep} className="flex-grow bg-slate-100 text-slate-500 font-bold py-4 rounded-xl hover:bg-slate-200 transition-all">BACK</button>
                   <button type="button" onClick={nextStep} className="flex-grow bg-sky-600 text-white font-bold py-4 rounded-xl hover:bg-sky-700 transition-all">CONTINUE</button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="animate-in fade-in slide-in-from-right-4 duration-500">
                <h3 className="text-2xl font-serif font-bold mb-8">3. Almost there! Contact Details</h3>
                <div className="space-y-4">
                  <input type="text" placeholder="Full Name" required className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-4 text-sm focus:outline-none" />
                  <input type="email" placeholder="Email Address" required className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-4 text-sm focus:outline-none" />
                  <input type="tel" placeholder="WhatsApp Number (Optional)" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-4 text-sm focus:outline-none" />
                  <textarea placeholder="Anything else we should know? (e.g. food allergies, preferred airlines)" rows={4} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-4 text-sm focus:outline-none"></textarea>
                </div>
                <div className="flex gap-4 mt-12">
                   <button type="button" onClick={prevStep} className="flex-grow bg-slate-100 text-slate-500 font-bold py-4 rounded-xl">BACK</button>
                   <button type="submit" className="flex-grow bg-sky-600 text-white font-bold py-4 rounded-xl hover:bg-sky-700 transition-all shadow-xl">REQUEST QUOTE</button>
                </div>
              </div>
            )}
          </form>
        </div>
        
        <div className="mt-12 text-center text-slate-400 text-sm">
           <p className="flex items-center justify-center gap-2">
              <span className="text-green-500">🛡️</span> Your data is protected. We never share your details with third parties.
           </p>
        </div>
      </div>
    </div>
  );
};

export default PlanMyTrip;
