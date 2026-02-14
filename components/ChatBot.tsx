
import React, { useState, useEffect, useRef } from 'react';
import { GoogleGenAI, FunctionDeclaration, Type } from "@google/genai";
import { useNavigate } from 'react-router-dom';
import { supabase, mapResort } from '../lib/supabase';
import { Accommodation } from '../types';

interface Message {
  role: 'user' | 'model';
  text: string;
}

interface QuoteDraft {
  resortName: string;
  roomType: string;
  checkIn: string;
  checkOut: string;
  basePrice: number;
  adjustedPrice: number;
}

const ChatBot: React.FC = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [hasKey, setHasKey] = useState<boolean>(!!process.env.API_KEY);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', text: "I am Sara. Tell me your vision for the Maldives, and I shall curate it." }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [resorts, setResorts] = useState<Accommodation[]>([]);
  const [quoteDraft, setQuoteDraft] = useState<QuoteDraft | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Tools configuration for Gemini
  const tools: { functionDeclarations: FunctionDeclaration[] } = {
    functionDeclarations: [
      {
        name: "search_resorts",
        description: "Search for resorts based on features (e.g. surfing, spa, butler), atolls, or vibes.",
        parameters: {
          type: Type.OBJECT,
          properties: {
            query: { type: Type.STRING, description: "The feature or name to search for." }
          },
          required: ["query"]
        }
      },
      {
        name: "get_room_options",
        description: "Get specific room types for a chosen resort slug.",
        parameters: {
          type: Type.OBJECT,
          properties: {
            slug: { type: Type.STRING, description: "The resort slug." }
          },
          required: ["slug"]
        }
      },
      {
        name: "navigate_to",
        description: "Redirect the user to a specific path on the website.",
        parameters: {
          type: Type.OBJECT,
          properties: {
            path: { type: Type.STRING, description: "The internal path like /stays or /offers." }
          },
          required: ["path"]
        }
      },
      {
        name: "prepare_quotation",
        description: "Prepares a formal quotation draft for the guest. Call this after resort, dates, and room are chosen.",
        parameters: {
          type: Type.OBJECT,
          properties: {
            resortName: { type: Type.STRING },
            roomType: { type: Type.STRING },
            checkIn: { type: Type.STRING },
            checkOut: { type: Type.STRING },
            estimatedPrice: { type: Type.NUMBER }
          },
          required: ["resortName", "roomType", "checkIn", "checkOut", "estimatedPrice"]
        }
      }
    ]
  };

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  useEffect(() => {
    const init = async () => {
      // Fetch resort manifest for tool assistance
      const { data } = await supabase.from('resorts').select('*');
      if (data) setResorts(data.map(mapResort));

      const aiStudio = (window as any).aistudio;
      if (aiStudio) {
        const selected = await aiStudio.hasSelectedApiKey();
        setHasKey(selected && !!process.env.API_KEY);
      }
    };
    init();
  }, [isOpen]);

  const handleSelectKey = async () => {
    const aiStudio = (window as any).aistudio;
    if (aiStudio) {
      await aiStudio.openSelectKey();
      setHasKey(true);
    }
  };

  const executeTool = (name: string, args: any) => {
    switch (name) {
      case 'search_resorts':
        const found = resorts.filter(r => 
          r.name.toLowerCase().includes(args.query.toLowerCase()) || 
          r.features.some(f => f.toLowerCase().includes(args.query.toLowerCase())) ||
          r.atoll.toLowerCase().includes(args.query.toLowerCase())
        );
        return found.map(r => ({ name: r.name, slug: r.slug, features: r.features }));
      
      case 'get_room_options':
        const res = resorts.find(r => r.slug === args.slug);
        return res?.roomTypes || [];

      case 'navigate_to':
        navigate(args.path);
        return { status: "Redirected to " + args.path };

      case 'prepare_quotation':
        setQuoteDraft({
          ...args,
          basePrice: args.estimatedPrice,
          adjustedPrice: args.estimatedPrice
        });
        return { status: "Quotation draft prepared. Awaiting price confirmation." };

      default:
        return { error: "Tool not found" };
    }
  };

  const handleSend = async () => {
    if (!input.trim() || isTyping || !hasKey) return;

    const userMessage: Message = { role: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    try {
      const apiKey = process.env.API_KEY;
      if (!apiKey) throw new Error("API Key missing");

      const ai = new GoogleGenAI({ apiKey });
      const systemInstruction = `
        You are Sara, the concise AI concierge for Serenity Maldives.
        RULES:
        1. Keep answers to 1-2 short sentences.
        2. Use tools to search resorts if the guest mentions features (e.g. surfing, diving).
        3. If a guest wants a reservation, follow this flow:
           a. Suggest/Confirm a Resort.
           b. Ask for Check-in and Check-out dates.
           c. Fetch room types using get_room_options.
           d. Suggest the best room based on their vibe.
           e. Once dates/room are chosen, call prepare_quotation.
        4. Redirect users to /stays, /offers, or /plan if they ask for lists or broad information.
        5. Tone: Elegant, minimalist, helpful.
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
          tools: [tools],
          temperature: 0.2,
        },
      });

      if (response.functionCalls) {
        for (const fc of response.functionCalls) {
          const result = executeTool(fc.name, fc.args);
          
          // Send tool result back to model
          const toolResponse = await ai.models.generateContent({
            model: 'gemini-3-flash-preview',
            contents: [
              ...messages.map(m => ({ role: m.role, parts: [{ text: m.text }] })),
              { role: 'user', parts: [{ text: input }] },
              { role: 'model', parts: [{ functionCall: fc }] },
              { role: 'user', parts: [{ functionResponse: { name: fc.name, response: result } }] }
            ],
            config: { systemInstruction, tools: [tools] }
          });
          
          setMessages(prev => [...prev, { role: 'model', text: toolResponse.text || "Selection confirmed." }]);
        }
      } else {
        setMessages(prev => [...prev, { role: 'model', text: response.text || "The atolls are quiet. How else may I assist?" }]);
      }
    } catch (error: any) {
      console.error("Sara Error:", error);
      setMessages(prev => [...prev, { role: 'model', text: "My connection to the atolls is fading. Please try again." }]);
    } finally {
      setIsTyping(false);
    }
  };

  const finalizeQuote = async () => {
    if (!quoteDraft) return;
    try {
      const { error } = await supabase.from('inquiries').insert({
        inquiry_type: 'concierge_quote',
        resort_name: quoteDraft.resortName,
        room_type: quoteDraft.roomType,
        check_in: quoteDraft.checkIn,
        check_out: quoteDraft.checkOut,
        budget: quoteDraft.adjustedPrice.toString(),
        notes: "Automated quote via Sara Concierge."
      });
      if (error) throw error;
      setMessages(prev => [...prev, { role: 'model', text: `Perfect. I have dispatched your quotation for ${quoteDraft.resortName} at US$ ${quoteDraft.adjustedPrice.toLocaleString()}. Our team will reach out shortly.` }]);
      setQuoteDraft(null);
    } catch (e) {
      alert("Error saving quotation.");
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
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" /></svg>
                </div>
            )}
        </div>
      </button>

      <div className={`fixed bottom-28 right-8 z-[100] w-[350px] md:w-[400px] bg-white rounded-[2.5rem] shadow-2xl border border-slate-100 overflow-hidden flex flex-col transition-all duration-700 transform ${isOpen ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-10 scale-95 pointer-events-none'}`}>
        <div className="bg-slate-950 p-6 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-sky-500 flex items-center justify-center text-white font-serif italic">S</div>
              <div>
                <h3 className="font-serif italic text-sm leading-none">Sara</h3>
                <p className="text-[7px] uppercase tracking-widest text-sky-400 font-bold">AI Concierge</p>
              </div>
            </div>
            <button onClick={() => setMessages([{ role: 'model', text: "Dialogue reset. How may I guide you?" }])} className="text-[7px] uppercase tracking-widest text-slate-500 hover:text-white transition-colors">Reset</button>
          </div>
        </div>

        <div ref={scrollRef} className="flex-1 p-6 space-y-4 overflow-y-auto max-h-[400px] no-scrollbar bg-[#FCFAF7]/50">
          {messages.map((m, i) => (
            <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[85%] p-4 rounded-2xl text-[11px] leading-relaxed ${m.role === 'user' ? 'bg-slate-900 text-white rounded-tr-none' : 'bg-white text-slate-700 border border-slate-100 rounded-tl-none font-medium italic'}`}>
                {m.text}
              </div>
            </div>
          ))}

          {quoteDraft && (
            <div className="animate-in fade-in zoom-in-95 duration-500 bg-white border border-sky-100 rounded-3xl p-6 shadow-xl space-y-4">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="text-[10px] font-black uppercase tracking-widest text-sky-500">Draft Quotation</h4>
                  <p className="text-[13px] font-serif font-bold text-slate-950 mt-1">{quoteDraft.resortName}</p>
                  <p className="text-[9px] text-slate-400 uppercase tracking-widest mt-0.5">{quoteDraft.roomType}</p>
                </div>
                <div className="text-right">
                  <p className="text-[9px] text-slate-400 uppercase tracking-widest">Dates</p>
                  <p className="text-[10px] font-bold text-slate-700">{quoteDraft.checkIn} - {quoteDraft.checkOut}</p>
                </div>
              </div>
              
              <div className="pt-4 border-t border-slate-50 flex items-center justify-between">
                <div>
                  <label className="text-[8px] font-black uppercase text-slate-400 block mb-1">Adjust Pricing (US$)</label>
                  <input 
                    type="number" 
                    value={quoteDraft.adjustedPrice}
                    onChange={(e) => setQuoteDraft({...quoteDraft, adjustedPrice: parseInt(e.target.value) || 0})}
                    className="w-24 bg-slate-50 border-none rounded-lg px-3 py-2 text-[11px] font-black text-sky-600 focus:ring-1 focus:ring-sky-500"
                  />
                </div>
                <button 
                  onClick={finalizeQuote}
                  className="bg-slate-950 text-white px-6 py-2.5 rounded-full text-[9px] font-black uppercase tracking-widest hover:bg-sky-500 transition-all shadow-lg"
                >
                  Send Quote
                </button>
              </div>
            </div>
          )}

          {!hasKey && (
            <div className="flex flex-col items-center gap-4 py-4 text-center">
              <button 
                onClick={handleSelectKey}
                className="bg-sky-500 text-white px-6 py-3 rounded-full text-[9px] font-black uppercase tracking-widest hover:bg-sky-400 transition-all shadow-md"
              >
                Connect to Atolls
              </button>
            </div>
          )}
          
          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-white border border-slate-100 p-3 rounded-2xl flex gap-1">
                <div className="w-1 h-1 bg-sky-500 rounded-full animate-bounce"></div>
                <div className="w-1 h-1 bg-sky-500 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                <div className="w-1 h-1 bg-sky-500 rounded-full animate-bounce [animation-delay:0.4s]"></div>
              </div>
            </div>
          )}
        </div>

        <div className="p-6 border-t border-slate-100 bg-white">
          <div className="relative flex items-center">
            <input
              type="text"
              disabled={!hasKey || !!quoteDraft}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder={hasKey ? "Tell me your vibe..." : "Awaiting key..."}
              className="w-full bg-slate-50 border border-slate-100 rounded-full px-6 py-4 text-[10px] font-bold uppercase tracking-widest focus:outline-none focus:border-sky-500 focus:bg-white transition-all placeholder:text-slate-300 disabled:opacity-50"
            />
            <button
              onClick={handleSend}
              disabled={isTyping || !hasKey || !!quoteDraft}
              className="absolute right-2 p-3 bg-slate-900 text-white rounded-full hover:bg-sky-500 transition-all disabled:opacity-50"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
            </button>
          </div>
          <p className="text-[6px] text-center text-slate-300 uppercase tracking-widest mt-4">Perspective Intelligence v2.5</p>
        </div>
      </div>
    </>
  );
};

export default ChatBot;
