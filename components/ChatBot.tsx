import React, { useState, useEffect, useRef } from 'react';
import { GoogleGenAI } from "@google/genai";

/**
 * ChatBot Component: A luxury concierge interface powered by Gemini 3 Flash.
 * Provides real-time assistance for Maldivian travel planning.
 */
const ChatBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: 'user' | 'model'; text: string }[]>([
    { role: 'model', text: 'Welcome to Serenity. How can I assist you with your Maldivian escape today?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    const newMessages = [...messages, { role: 'user', text: userMessage } as const];
    setMessages(newMessages);
    setIsLoading(true);

    try {
      // Create a new GoogleGenAI instance right before making an API call to ensure it uses the current key
      // The API key must be obtained exclusively and directly from process.env.API_KEY
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      
      const history = newMessages.map(m => ({
        role: m.role,
        parts: [{ text: m.text }]
      }));

      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: history,
        config: {
          systemInstruction: "You are a luxury travel concierge for Serenity Maldives. You are elegant, helpful, and knowledgeable about Maldivian atolls, resorts, and private experiences. Keep responses concise and sophisticated. Focus on promoting our curated portfolio of luxury stays and bespoke experiences.",
        }
      });

      // Directly access the .text property from GenerateContentResponse as per SDK guidelines
      const modelText = response.text || "I apologize, I'm having trouble connecting right now. Please reach out to our experts directly.";
      setMessages(prev => [...prev, { role: 'model', text: modelText }]);
    } catch (error) {
      console.error("Concierge Chat Error:", error);
      setMessages(prev => [...prev, { role: 'model', text: "I encountered an error. Please contact our support team at info@maldivesserenity.com." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-8 left-8 z-[100]">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="bg-slate-900 text-white p-5 rounded-full shadow-2xl hover:scale-110 active:scale-95 transition-all group flex items-center gap-3 border border-slate-800"
      >
        <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-500 font-bold text-[10px] uppercase tracking-[0.4em] whitespace-nowrap ml-0 group-hover:ml-2">
          Concierge
        </span>
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute bottom-24 left-0 w-[90vw] md:w-[420px] bg-white rounded-[3rem] shadow-[0_20px_50px_rgba(0,0,0,0.2)] border border-slate-100 overflow-hidden animate-in slide-in-from-bottom-10 duration-500 flex flex-col max-h-[70vh]">
          <div className="bg-slate-900 p-8 text-white flex justify-between items-center">
            <div>
              <h3 className="text-xl font-serif italic font-bold">Serenity Concierge</h3>
              <p className="text-[9px] font-black uppercase tracking-[0.4em] text-sky-400 mt-2">Personal Travel Intelligence</p>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-white/40 hover:text-white transition-colors">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
          </div>
          
          <div ref={scrollRef} className="flex-1 overflow-y-auto p-8 space-y-6 no-scrollbar bg-[#FCFAF7]">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] p-6 rounded-[2rem] text-[13px] leading-relaxed ${m.role === 'user' ? 'bg-slate-900 text-white rounded-tr-none shadow-lg' : 'bg-white text-slate-800 shadow-sm border border-slate-100 rounded-tl-none font-medium'}`}>
                  {m.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white p-5 rounded-[1.5rem] rounded-tl-none shadow-sm border border-slate-100">
                  <div className="flex gap-1.5">
                    <div className="w-1.5 h-1.5 bg-sky-400 rounded-full animate-bounce"></div>
                    <div className="w-1.5 h-1.5 bg-sky-400 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                    <div className="w-1.5 h-1.5 bg-sky-400 rounded-full animate-bounce [animation-delay:0.4s]"></div>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="p-8 bg-white border-t border-slate-50">
            <div className="relative">
              <input 
                type="text" 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="ENQUIRE ABOUT THE ATOLLS..." 
                className="w-full bg-slate-50 border-none rounded-full pl-8 pr-16 py-5 text-[11px] font-bold uppercase tracking-widest outline-none focus:ring-1 focus:ring-sky-500 transition-all"
              />
              <button 
                onClick={handleSend}
                disabled={isLoading}
                className="absolute right-2 top-2 bottom-2 w-12 bg-slate-900 text-white rounded-full flex items-center justify-center hover:bg-sky-500 transition-colors disabled:opacity-20"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatBot;