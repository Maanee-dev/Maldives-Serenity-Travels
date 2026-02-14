
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
  const [hasKey, setHasKey] = useState<boolean>(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', text: "I am Sara. Describe your Maldivian dream, and I shall manifest it." }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [resorts, setResorts] = useState<Accommodation[]>([]);
  const [quoteDraft, setQuoteDraft] = useState<QuoteDraft | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Tools configuration
  const tools: { functionDeclarations: FunctionDeclaration[] } = {
    functionDeclarations: [
      {
        name: "search_resorts",
        description: "Search the DB for resorts by name, atoll, or features (like surfing or diving).",
        parameters: {
          type: Type.OBJECT,
          properties: {
            query: { type: Type.STRING, description: "Feature or resort name." }
          },
          required: ["query"]
        }
      },
      {
        name: "get_room_options",
        description: "Fetch room categories for a specific resort slug.",
        parameters: {
          type: Type.OBJECT,
          properties: {
            slug: { type: Type.STRING }
          },
          required: ["slug"]
        }
      },
      {
        name: "navigate_to",
        description: "Redirect the browser to a specific URL path.",
        parameters: {
          type: Type.OBJECT,
          properties: {
            path: { type: Type.STRING, description: "/stays, /offers, /plan, or specific resort paths." }
          },
          required: ["path"]
        }
      },
      {
        name: "prepare_quotation",
        description: "Creates a draft quote. Call after choosing resort, dates, and room.",
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
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, isTyping]);

  useEffect(() => {
    const checkAuthStatus = async () => {
      // Check if process.env.API_KEY is already populated
      if (process.env.API_KEY) {
        setHasKey(true);
        return;
      }

      const aiStudio = (window as any).aistudio;
      if (aiStudio) {
        try {
          const selected = await aiStudio.hasSelectedApiKey();
          setHasKey(selected);
        } catch (e) {
          console.error("Auth check failed:", e);
        }
      }
    };
    
    const fetchDB = async () => {
      const { data } = await supabase.from('resorts').select('*');
      if (data) setResorts(data.map(mapResort));
    };

    if (isOpen) {
      checkAuthStatus();
      fetchDB();
    }
  }, [isOpen]);

  const handleSelectKey = async () => {
    const aiStudio = (window as any).aistudio;
    if (aiStudio) {
      try {
        await aiStudio.openSelectKey();
        // RULE: Assume success immediately after trigger to mitigate race conditions
        setHasKey(true);
      } catch (e) {
        console.error("Failed to open key selector:", e);
        alert("Unable to open the key selector. Please ensure your browser isn't blocking popups.");
      }
    } else {
      // Fallback for environments where the key is provided via env but SDK is absent
      if (process.env.API_KEY) {
        setHasKey(true);
      } else {
        alert("The Gemini Authentication suite is currently unavailable in this browser context.");
      }
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
        return { results: found.map(r => ({ name: r.name, slug: r.slug, features: r.features })) };
      
      case 'get_room_options':
        const res = resorts.find(r => r.slug === args.slug);
        return { rooms: res?.roomTypes?.map(rt => rt.name) || [] };

      case 'navigate_to':
        navigate(args.path);
        return { status: `Success: Navigated to ${args.path}` };

      case 'prepare_quotation':
        setQuoteDraft({
          ...args,
          basePrice: args.estimatedPrice,
          adjustedPrice: args.estimatedPrice
        });
        return { status: "Draft ready. Visual editor displayed to user." };

      default:
        return { error: "Unknown tool" };
    }
  };

  const handleSend = async () => {
    if (!input.trim() || isTyping) return;
    
    // Check if key is present in environment before calling
    const apiKey = process.env.API_KEY;
    if (!apiKey) {
      handleSelectKey();
      return;
    }

    const userMessage: Message = { role: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    try {
      // Create new instance right before call as per guidelines
      const ai = new GoogleGenAI({ apiKey });
      
      const systemInstruction = `
        You are Sara, the concise AI concierge for Serenity Maldives.
        IDENTITY: Sophisticated, poetic, and extremely helpful.
        
        RULES:
        1. Short answers only (1-2 sentences).
        2. DATABASE ANALYSIS: Use search_resorts for feature matching.
        3. REDIRECTS: Use navigate_to for discovery.
        4. RESERVATIONS: Suggest, check dates, get room, then prepare_quotation.
        
        SITEMAP:
        - Portfolio: /stays
        - Exclusives: /offers
        - Stories: /stories
        - Planning Form: /plan
      `;

      let currentHistory = [
        ...messages.map(m => ({ role: m.role, parts: [{ text: m.text }] })),
        { role: 'user', parts: [{ text: input }] }
      ];

      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: currentHistory,
        config: { systemInstruction, tools: [tools], temperature: 0.1 }
      });

      if (response.functionCalls) {
        let finalHistory = [...currentHistory];
        
        for (const fc of response.functionCalls) {
          const toolResult = executeTool(fc.name, fc.args);
          finalHistory.push({ role: 'model', parts: [{ functionCall: fc }] } as any);
          finalHistory.push({ 
            role: 'user', 
            parts: [{ 
              functionResponse: { 
                name: fc.name, 
                response: toolResult 
              } 
            }] 
          } as any);
        }

        const secondResponse = await ai.models.generateContent({
          model: 'gemini-3-flash-preview',
          contents: finalHistory,
          config: { systemInstruction, tools: [tools] }
        });

        setMessages(prev => [...prev, { role: 'model', text: secondResponse.text || "I have finalized your request. How else may I assist?" }]);
      } else {
        setMessages(prev => [...prev, { role: 'model', text: response.text || "The archipelago is quiet. Could you rephrase your inquiry?" }]);
      }
    } catch (error: any) {
      console.error("Sara Error:", error);
      
      // Handle key issues by resetting authentication state
      if (error.message?.includes("Requested entity was not found") || error.message?.includes("API key")) {
        setHasKey(false);
        setMessages(prev => [...prev, { role: 'model', text: "Your session has expired. Please click 'Connect' to refresh your credentials." }]);
      } else {
        setMessages(prev => [...prev, { role: 'model', text: "The signal to our atolls is weak. Please try again or reach out via WhatsApp." }]);
      }
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
        notes: `AI Generated Quote. Base: ${quoteDraft.basePrice}. Adjusted: ${quoteDraft.adjustedPrice}.`
      });
      if (error) throw error;
      setMessages(prev => [...prev, { role: 'model', text: `Your bespoke quotation for ${quoteDraft.resortName} at US$ ${quoteDraft.adjustedPrice.toLocaleString()} has been transmitted to our experts.` }]);
      setQuoteDraft(null);
    } catch (e) {
      alert("Database transmission failed.");
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
        <div className="bg-slate-950 p-6 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-sky-500 flex items-center justify-center text-white font-serif italic font-bold">S</div>
            <div>
              <h3 className="font-serif italic text-sm leading-none">Sara</h3>
              <p className="text-[7px] uppercase tracking-widest text-sky-400 font-bold">Intelligence Suite</p>
            </div>
          </div>
          <button onClick={() => setMessages([{ role: 'model', text: "Dialogue reset. How may I guide you?" }])} className="text-[7px] font-black uppercase text-slate-500 hover:text-white transition-colors">Reset</button>
        </div>

        <div ref={scrollRef} className="flex-1 p-6 space-y-4 overflow-y-auto max-h-[400px] no-scrollbar bg-[#FCFAF7]/50">
          {!hasKey && !process.env.API_KEY ? (
            <div className="py-12 text-center space-y-6">
              <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto border border-slate-100">
                <svg className="w-8 h-8 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
              </div>
              <div className="space-y-2">
                <h4 className="text-[11px] font-black uppercase text-slate-900 tracking-widest">Authentication Required</h4>
                <p className="text-[9px] text-slate-400 uppercase tracking-widest leading-relaxed px-8">To enable Sara's intelligence suite, please select your Gemini API Key.</p>
              </div>
              <button 
                onClick={handleSelectKey} 
                className="bg-sky-500 text-white px-8 py-3 rounded-full text-[9px] font-black uppercase tracking-[0.2em] shadow-lg hover:bg-sky-400 transition-all"
              >
                Connect Sara
              </button>
              <p className="text-[7px] text-slate-300 px-10 leading-relaxed uppercase tracking-widest">
                A paid project key is required.<br/>
                <a href="https://ai.google.dev/gemini-api/docs/billing" target="_blank" rel="noreferrer" className="text-sky-400 underline">Billing Docs</a>
              </p>
            </div>
          ) : (
            <>
              {messages.map((m, i) => (
                <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] p-4 rounded-2xl text-[11px] leading-relaxed ${m.role === 'user' ? 'bg-slate-900 text-white rounded-tr-none' : 'bg-white text-slate-700 border border-slate-100 rounded-tl-none font-medium shadow-sm'}`}>
                    {m.text}
                  </div>
                </div>
              ))}

              {quoteDraft && (
                <div className="animate-in fade-in zoom-in-95 duration-500 bg-white border border-sky-100 rounded-[2rem] p-6 shadow-xl space-y-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="text-[9px] font-black uppercase text-sky-500 mb-1">Stay Proposal</h4>
                      <p className="text-[13px] font-serif font-bold text-slate-950 leading-tight">{quoteDraft.resortName}</p>
                      <p className="text-[8px] text-slate-400 uppercase tracking-widest mt-1">{quoteDraft.roomType}</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 bg-slate-50 p-3 rounded-xl border border-slate-100">
                    <div>
                       <p className="text-[7px] font-black text-slate-400 uppercase">Arrival</p>
                       <p className="text-[9px] font-bold text-slate-900">{quoteDraft.checkIn}</p>
                    </div>
                    <div>
                       <p className="text-[7px] font-black text-slate-400 uppercase">Departure</p>
                       <p className="text-[9px] font-bold text-slate-900">{quoteDraft.checkOut}</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between pt-2">
                    <div className="space-y-1">
                       <p className="text-[7px] font-black text-slate-400 uppercase">Proposed Price (USD)</p>
                       <input 
                          type="number" 
                          value={quoteDraft.adjustedPrice} 
                          onChange={(e) => setQuoteDraft({...quoteDraft, adjustedPrice: parseInt(e.target.value) || 0})}
                          className="w-24 bg-slate-50 border-none rounded-lg px-2 py-1.5 text-[11px] font-black text-sky-600 focus:ring-1 focus:ring-sky-500"
                       />
                    </div>
                    <button onClick={finalizeQuote} className="bg-slate-950 text-white px-5 py-2.5 rounded-full text-[9px] font-black uppercase tracking-widest hover:bg-sky-500 transition-all">Transmit Quote</button>
                  </div>
                </div>
              )}
            </>
          )}
          
          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-white border border-slate-100 px-3 py-2 rounded-full flex gap-1 shadow-sm">
                <div className="w-1 h-1 bg-sky-500 rounded-full animate-bounce"></div>
                <div className="w-1 h-1 bg-sky-500 rounded-full animate-bounce delay-100"></div>
                <div className="w-1 h-1 bg-sky-500 rounded-full animate-bounce delay-200"></div>
              </div>
            </div>
          )}
        </div>

        <div className="p-6 border-t border-slate-100 bg-white">
          <div className="relative flex items-center">
            <input
              type="text"
              disabled={(!hasKey && !process.env.API_KEY) || !!quoteDraft}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder={hasKey || process.env.API_KEY ? "Ask about the atolls..." : "Connect Sara to begin"}
              className="w-full bg-slate-50 border border-slate-100 rounded-full px-6 py-4 text-[10px] font-bold uppercase tracking-widest focus:outline-none focus:border-sky-500 focus:bg-white transition-all placeholder:text-slate-300 disabled:opacity-50"
            />
            <button
              onClick={handleSend}
              disabled={isTyping || (!hasKey && !process.env.API_KEY) || !!quoteDraft}
              className="absolute right-2 p-3 bg-slate-900 text-white rounded-full hover:bg-sky-500 transition-all disabled:opacity-50"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
            </button>
          </div>
          <p className="text-[6px] text-center text-slate-300 uppercase tracking-widest mt-4">Perspective Intelligence v3.5</p>
        </div>
      </div>
    </>
  );
};

export default ChatBot;
