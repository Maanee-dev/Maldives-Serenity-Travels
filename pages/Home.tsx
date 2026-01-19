import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { RESORTS, OFFERS, BLOG_POSTS } from '../constants';
import ResortCard from '../components/ResortCard';

const Home: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/resorts?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  const featuredResorts = RESORTS.filter(r => r.isFeatured);

  const testimonials = [
    {
      name: "Elena Richardson",
      location: "London, UK",
      text: "Our honeymoon at Soneva Jani was beyond words. Serenity Travels handled every transfer seamlessly. We didn't have to worry about a thing from the moment we landed in Male.",
      rating: 5,
      avatar: "ER"
    },
    {
      name: "Marco Rossi",
      location: "Milan, Italy",
      text: "I was skeptical about budget travel in the Maldives, but the guest house recommended by the team was fantastic. Authentic food and world-class diving for a fraction of resort prices.",
      rating: 5,
      avatar: "MR"
    },
    {
      name: "Sarah Chen",
      location: "Singapore",
      text: "The best rate I could find online was actually higher than what Serenity offered. Their local connections really do make a difference for luxury bookings.",
      rating: 5,
      avatar: "SC"
    }
  ];

  return (
    <div className="animate-in fade-in duration-700">
      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&q=80&w=2000" 
            alt="Maldives Hero" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-slate-50"></div>
        </div>

        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
          <h1 className="text-5xl md:text-8xl font-serif font-bold text-white mb-8 leading-tight drop-shadow-2xl">
            Maldives <span className="text-sky-300 italic font-normal">Serenity</span>
          </h1>
          <p className="text-xl md:text-2xl text-white/95 mb-12 font-medium max-w-3xl mx-auto drop-shadow-lg leading-relaxed">
            Curated ultra-luxury resorts and authentic local stays. Your gateway to the sunny side of life.
          </p>

          <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-3 bg-white/10 p-3 rounded-3xl backdrop-blur-xl border border-white/20 shadow-2xl max-w-3xl mx-auto">
            <div className="flex-grow flex items-center bg-white rounded-2xl px-6 py-4">
              <span className="text-slate-400 mr-3 text-lg">🔍</span>
              <input 
                type="text" 
                placeholder="Search resort, atoll or experience..." 
                className="w-full focus:outline-none text-slate-800 placeholder:text-slate-400 font-medium"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <button type="submit" className="bg-sky-600 text-white font-bold px-12 py-4 rounded-2xl hover:bg-sky-700 transition-all shadow-lg text-sm tracking-widest uppercase">
              EXPLORE
            </button>
          </form>
          
          <div className="mt-12 flex flex-wrap justify-center gap-6 text-white/80 text-[10px] font-bold tracking-[0.3em] uppercase">
            <span>#PrivateIslands</span>
            <span>#BikiniBeaches</span>
            <span>#SustainableTravel</span>
          </div>
        </div>
      </section>

      {/* Value Proposition */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center p-8 rounded-3xl hover:bg-slate-50 transition-colors group">
              <div className="text-4xl mb-6 grayscale group-hover:grayscale-0 transition-all">🏝️</div>
              <h3 className="text-xl font-serif font-bold text-slate-900 mb-4">Local Expertise</h3>
              <p className="text-slate-500 leading-relaxed text-sm">Our team is based in Male. We visit every resort and guest house we list to ensure they meet our serenity standards.</p>
            </div>
            <div className="text-center p-8 rounded-3xl hover:bg-slate-50 transition-colors group">
              <div className="text-4xl mb-6 grayscale group-hover:grayscale-0 transition-all">💰</div>
              <h3 className="text-xl font-serif font-bold text-slate-900 mb-4">Best Rate Guarantee</h3>
              <p className="text-slate-500 leading-relaxed text-sm">Direct partnerships with island owners allow us to offer rates and perks you won't find on global booking engines.</p>
            </div>
            <div className="text-center p-8 rounded-3xl hover:bg-slate-50 transition-colors group">
              <div className="text-4xl mb-6 grayscale group-hover:grayscale-0 transition-all">🤝</div>
              <h3 className="text-xl font-serif font-bold text-slate-900 mb-4">Seamless Transfers</h3>
              <p className="text-slate-500 leading-relaxed text-sm">We handle the complex logistics of seaplanes and speedboats so you can start relaxing the moment you land.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Stays */}
      <section className="py-32 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-4">
            <div className="max-w-xl">
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-slate-900 mb-6">Signature Stays</h2>
              <p className="text-slate-500 text-lg leading-relaxed italic">Hand-picked properties where architecture meets the azure sea. From luxury private islands to local sanctuaries.</p>
            </div>
            <Link to="/resorts" className="bg-sky-50 text-sky-600 font-bold px-8 py-3 rounded-full hover:bg-sky-100 transition-all text-xs uppercase tracking-[0.2em] shadow-sm">
              View All Resorts
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {featuredResorts.map(resort => (
              <ResortCard key={resort.id} resort={resort} />
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-32 bg-slate-900 relative overflow-hidden text-center">
        <div className="max-w-4xl mx-auto px-4 relative z-10">
          <h2 className="text-4xl md:text-7xl font-serif font-bold text-white mb-8 italic">Your Serenity Awaits.</h2>
          <p className="text-slate-400 mb-12 text-xl leading-relaxed max-w-2xl mx-auto">
            Ready to swap the city lights for starry Maldivian nights? Let our team build your bespoke itinerary.
          </p>
          <Link to="/plan" className="bg-sky-600 text-white px-16 py-6 rounded-2xl text-lg font-bold hover:bg-sky-700 transition-all shadow-2xl uppercase tracking-widest">
            Request a Quote
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;