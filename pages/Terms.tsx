import React from 'react';
import SEO from '../components/SEO';

const Terms: React.FC = () => {
  return (
    <div className="bg-[#FCFAF7] min-h-screen pb-32">
      <SEO 
        title="Terms & Conditions | The Legal Framework" 
        description="Review the terms of service and booking conditions for Serenity Maldives Travel Agency."
      />
      
      <section className="pt-48 pb-16 px-6 text-center">
        <div className="max-w-4xl mx-auto">
          <span className="text-[10px] font-black text-sky-500 uppercase tracking-[1.2em] mb-12 block">Agreement</span>
          <h1 className="text-4xl md:text-7xl font-serif font-bold text-slate-950 tracking-tighter italic leading-none mb-12">
            Terms of <br /> Service.
          </h1>
          <p className="text-slate-400 text-[9px] font-bold uppercase tracking-[0.5em]">Effective January 2026</p>
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-6 prose prose-slate prose-lg">
        <div className="bg-white rounded-[3rem] p-12 md:p-20 shadow-sm border border-slate-50">
          <h2 className="font-serif italic text-3xl mb-8">1. The Contract</h2>
          <p className="text-slate-600 leading-loose text-sm mb-12">
            By engaging Serenity Maldives (hereinafter "The Agency"), you enter into a binding agreement. Our role is that of a travel curator and intermediary between you and luxury resorts, transfer operators, and service providers across the Maldivian archipelago.
          </p>

          <h2 className="font-serif italic text-3xl mb-8">2. Booking & Confirmation</h2>
          <p className="text-slate-600 leading-loose text-sm mb-12">
            A booking is deemed confirmed only once we have issued a formal digital confirmation and the required deposit has been processed. All prices are quoted in US Dollars (USD) and include applicable Maldivian taxes (GST and Green Tax) unless specified otherwise.
          </p>

          <h2 className="font-serif italic text-3xl mb-8">3. Cancellations & Alterations</h2>
          <p className="text-slate-600 leading-loose text-sm mb-12">
            Luxury resorts in the Maldives operate under strict seasonal cancellation policies. Cancellation fees vary based on the proximity to the arrival date and the specific resort's terms. The Agency will facilitate all cancellation requests but is bound by the primary service provider's refund policies.
          </p>

          <h2 className="font-serif italic text-3xl mb-8">4. Logistics & Transfers</h2>
          <p className="text-slate-600 leading-loose text-sm mb-12">
            Seaplane and domestic flight schedules are managed by third-party operators (e.g., Trans Maldivian Airways). While we provide seamless coordination, we are not liable for delays caused by weather conditions or technical scheduling by these operators.
          </p>

          <h2 className="font-serif italic text-3xl mb-8">5. Governing Law</h2>
          <p className="text-slate-600 leading-loose text-sm">
            This agreement is governed by the laws of the Republic of Maldives. Any disputes shall be subject to the exclusive jurisdiction of the Maldivian courts.
          </p>
        </div>
      </section>
    </div>
  );
};

export default Terms;