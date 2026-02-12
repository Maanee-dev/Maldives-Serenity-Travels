import React, { useState, useEffect, useRef } from 'react';
import { GoogleGenAI } from "@google/genai";

interface Message {
  role: 'user' | 'model';
  text: string;
}

const ChatBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', text: "Welcome to Serenity. I am Sara, your AI concierge. How may I assist with your Maldivian journey today?" }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = async () => {
    if (!input.trim() || isTyping) return;

    const userMessage: Message = { role: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      
      const systemInstruction = `
        You are Sara, the elegant AI concierge for Serenity Maldives, a boutique travel agency.
        Your tone is sophisticated, poetic, and highly personalized.
        
        Agency Details:
        - Location: Faith, S.feydhoo, Addu City, Maldives.
        - Philosophy: "Defined by Perspective", we curate silence and luxury.
        - Specialization: Bespoke travel, VIP seaplane arrivals, private atolls.
        
        Knowledge Base:
        - Resorts: Adaaran Prestige Vadoo (Intimate, Butler), Adaaran Prestige Water Villas (Wooden, Raa Atoll), Adaaran Select Hudhuran Fushi (Surfing), Adaaran Select Meedhupparu (Mature, Family).
        - Atolls: Noonu (Untouched), Baa (UNESCO Biosphere), North Male (Epicenter), Ari (Whale Sharks).
        - Vibes: Silence, Adventure, Family, Romance.
        
        Instructions:
        1. When users ask for recommendations, suggest specific resorts based on their "vibe".
        2. If they ask about booking, invite them to share their vision for a "Bespoke Curation" and suggest using the 'Plan Trip' form.
        3. Keep responses concise but visually evocative. Use words like "turquoise", "sanctuary", "archipelago", and "atoll".
      `;

      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: [
          ...messages.map(m => ({
            role: m.role,
            parts: [{ text: m.text }]
          })),
          { role: 'user', parts: [{ text: input }] }
        ],
        config: {
          systemInstruction,
          temperature: 0.8,
        },
      });

      const aiText = response.text || "I apologize, the atolls are calling me away briefly. Please contact our human concierge at +960 725 9060.";
      setMessages(prev => [...prev, { role: 'model', text: aiText }]);
    } catch (error) {
      console.error("Sara Error:", error);
      setMessages(prev => [...prev, { role: 'model', text: "I'm having trouble connecting to the atolls. Please try again or reach out on WhatsApp." }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-8 right-8 z-[100] bg-slate-900 text-white p-5 rounded-full shadow-2xl hover:scale-110 active:scale-95 transition-all group flex items-center justify-center border border-white/10"
      >
        <div className="relative">
            {isOpen ? (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            ) : (
                <div className="flex items-center gap-3">
                    <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-500 font-bold text-[10px] uppercase tracking-widest whitespace-nowrap">
                        Ask Sara
                    </span>
                    <svg className="w-6 h-6 text-[#f15d22]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" /></svg>
                </div>
            )}
        </div>
      </button>

      <div className={`fixed bottom-28 right-8 z-[100] w-[350px] md:w-[400px] bg-white rounded-[2.5rem] shadow-2xl border border-slate-100 overflow-hidden flex flex-col transition-all duration-700 transform ${isOpen ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-10 scale-95 pointer-events-none'}`}>
        <div className="bg-slate-950 p-8 text-white">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-[#f15d22] flex items-center justify-center text-white font-serif italic text-xl">S</div>
            <div>
              <h3 className="font-serif italic text-lg leading-none mb-1">Sara</h3>
              <p className="text-[8px] uppercase tracking-widest text-orange-400 font-bold">AI Concierge • Serenity Maldives</p>
            </div>
          </div>
        </div>

        <div ref={scrollRef} className="flex-1 p-6 space-y-4 overflow-y-auto max-h-[400px] no-scrollbar bg-[#FCFAF7]/50">
          {messages.map((m, i) => (
            <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[85%] p-4 rounded-3xl text-[12px] leading-relaxed ${m.role === 'user' ? 'bg-slate-900 text-white rounded-tr-none shadow-sm' : 'bg-white text-slate-700 border border-slate-100 rounded-tl-none shadow-sm font-medium italic'}`}>
                {m.text}
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-white border border-slate-100 p-4 rounded-3xl rounded-tl-none flex gap-1">
                <div className="w-1.5 h-1.5 bg-[#f15d22] rounded-full animate-bounce"></div>
                <div className="w-1.5 h-1.5 bg-[#f15d22] rounded-full animate-bounce [animation-delay:0.2s]"></div>
                <div className="w-1.5 h-1.5 bg-[#f15d22] rounded-full animate-bounce [animation-delay:0.4s]"></div>
              </div>
            </div>
          )}
        </div>

        <div className="p-6 border-t border-slate-100 bg-white">
          <div className="relative flex items-center">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Inquire about the atolls..."
              className="w-full bg-slate-50 border border-slate-100 rounded-full px-6 py-4 text-[10px] font-bold uppercase tracking-widest focus:outline-none focus:border-[#f15d22] focus:bg-white transition-all placeholder:text-slate-300"
            />
            <button
              onClick={handleSend}
              disabled={isTyping}
              className="absolute right-2 p-3 bg-slate-950 text-white rounded-full hover:bg-[#f15d22] transition-all disabled:opacity-50"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
            </button>
          </div>
          <p className="text-[7px] text-center text-slate-300 uppercase tracking-widest mt-4">Powered by Serenity Intelligence</p>
        </div>
      </div>
    </>
  );
};

export default ChatBot;