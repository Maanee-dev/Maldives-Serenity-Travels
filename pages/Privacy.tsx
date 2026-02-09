import React from 'react';
import SEO from '../components/SEO';

const Privacy: React.FC = () => {
  return (
    <div className="bg-[#FCFAF7] min-h-screen pb-32">
      <SEO 
        title="Privacy Policy | Digital Sanctity" 
        description="Our commitment to protecting your personal data and maintaining the confidentiality of your travel vision."
      />
      
      <section className="pt-48 pb-16 px-6 text-center">
        <div className="max-w-4xl mx-auto">
          <span className="text-[10px] font-black text-sky-500 uppercase tracking-[1.2em] mb-12 block">Governance</span>
          <h1 className="text-4xl md:text-7xl font-serif font-bold text-slate-950 tracking-tighter italic leading-none mb-12">
            Privacy <br /> Policy.
          </h1>
          <p className="text-slate-400 text-[9px] font-bold uppercase tracking-[0.5em]">Updated January 2026</p>
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-6 prose prose-slate prose-lg">
        <div className="bg-white rounded-[3rem] p-12 md:p-20 shadow-sm border border-slate-50">
          <h2 className="font-serif italic text-3xl mb-8">The Sanctity of Data</h2>
          <p className="text-slate-600 leading-loose text-sm mb-12">
            Your travel vision is personal. At Serenity Maldives, we treat your data with the same level of care we apply to our bespoke itineraries. This policy outlines how we handle the digital footprints you leave with us.
          </p>

          <h2 className="font-serif italic text-3xl mb-8">1. Information We Collect</h2>
          <p className="text-slate-600 leading-loose text-sm mb-12">
            We collect personal identity data (name, email, phone) only when you initiate an inquiry. To facilitate bookings, we may require passport details and dietary preferences. We also collect anonymized behavioral data to refine our digital perspective.
          </p>

          <h2 className="font-serif italic text-3xl mb-8">2. Use of Information</h2>
          <p className="text-slate-600 leading-loose text-sm mb-12">
            We use your data exclusively to curate your Maldivian journey. This includes sharing necessary details with resorts and transfer operators. We do not sell or trade your personal narrative to third-party marketers.
          </p>

          <h2 className="font-serif italic text-3xl mb-8">3. Digital Security</h2>
          <p className="text-slate-600 leading-loose text-sm mb-12">
            Our platform utilizes industry-standard encryption. Financial transactions are processed through secure, PCI-compliant gateways. We maintain rigorous internal protocols to ensure your data remains within our sanctuary.
          </p>

          <h2 className="font-serif italic text-3xl mb-8">4. Your Rights</h2>
          <p className="text-slate-600 leading-loose text-sm">
            You have the right to request a full transcript of the data we hold on you, or to request its immediate erasure from our digital archives. Contact our Data Officer at privacy@maldives-serenitytravels.com for any inquiries.
          </p>
        </div>
      </section>
    </div>
  );
};

export default Privacy;