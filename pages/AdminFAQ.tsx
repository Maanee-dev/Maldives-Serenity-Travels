
import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { GoogleGenAI, Type } from "@google/genai";
import { supabase } from '../lib/supabase';

// Removed conflicting local declare global for window.aistudio to resolve TS errors.
// We will access window.aistudio using type casting to bypass conflicting declarations.

interface FAQResult {
  resort_id: string;
  resort_name: string;
  status: 'success' | 'failure';
  inserted: number;
  faqs: any[];
  error: string | null;
}

const AdminFAQ: React.FC = () => {
  const [resorts, setResorts] = useState<any[]>([]);
  const [serviceRoleKey, setServiceRoleKey] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [hasApiKey, setHasApiKey] = useState<boolean | null>(null);
  const [results, setResults] = useState<FAQResult[]>([]);
  const [logs, setLogs] = useState<string[]>([]);
  const [progress, setProgress] = useState(0);

  const addLog = (msg: string) => {
    setLogs(prev => [`[${new Date().toLocaleTimeString()}] ${msg}`, ...prev].slice(0, 100));
  };

  useEffect(() => {
    const checkKey = async () => {
      // Cast window to any to access the aistudio helper without type conflicts.
      const selected = await (window as any).aistudio.hasSelectedApiKey();
      setHasApiKey(selected);
    };
    checkKey();

    const fetchResorts = async () => {
      const { data } = await supabase.from('resorts').select('id, name, description, features').order('name');
      if (data) setResorts(data);
    };
    fetchResorts();
  }, []);

  const handleSelectKey = async () => {
    // Cast window to any to access the aistudio helper without type conflicts.
    await (window as any).aistudio.openSelectKey();
    setHasApiKey(true); // Assume success as per instructions to avoid race conditions
  };

  const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

  /**
   * Generates FAQs using the Gemini API directly in the browser
   */
  const generateFaqsWithGemini = async (resort: any) => {
    // Create instance immediately before call to ensure we use the latest injected process.env.API_KEY
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    const prompt = `
      Generate 6-8 comprehensive, luxury-toned FAQs for the following Maldives resort:
      Resort Name: ${resort.name}
      Description: ${resort.description}
      Features: ${Array.isArray(resort.features) ? resort.features.join(', ') : resort.features}
      
      Requirements:
      1. Tone: Sophisticated, poetic, yet helpful.
      2. Categories: Must be one of 'Arrival', 'Dining', 'Experience', 'Wellness', or 'General'.
      3. Content: Focus on specific features mentioned above.
    `;

    try {
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                question: { type: Type.STRING },
                answer: { type: Type.STRING },
                category: { type: Type.STRING },
                is_ai_generated: { type: Type.BOOLEAN }
              },
              required: ["question", "answer", "category", "is_ai_generated"]
            }
          }
        }
      });

      const jsonStr = response.text;
      if (!jsonStr) throw new Error("Gemini returned empty content.");
      
      const parsedFaqs = JSON.parse(jsonStr);
      return parsedFaqs.map((f: any) => ({ ...f, resort_id: resort.id }));
    } catch (err: any) {
      if (err.message?.includes("Requested entity was not found")) {
        setHasApiKey(false);
        throw new Error("API Key session expired or invalid. Please re-select your key.");
      }
      throw err;
    }
  };

  /**
   * Persists FAQs to Supabase using the admin client
   */
  const saveToDatabase = async (faqs: any[], adminKey: string) => {
    const adminClient = createClient('https://zocncwchaakjtsvlscmd.supabase.co', adminKey);
    const { data, error } = await adminClient
      .from('resort_faqs')
      .upsert(faqs, { onConflict: 'resort_id,question' }) 
      .select();
    
    if (error) throw error;
    return data || [];
  };

  const runAutomation = async () => {
    if (!hasApiKey) {
      addLog("❌ Error: Gemini API Key not selected.");
      await handleSelectKey();
      return;
    }

    if (!serviceRoleKey) {
      alert("Supabase Service Role Key is required to save data to the database.");
      return;
    }

    if (!confirm(`Using Gemini API to generate FAQs for ${resorts.length} resorts. Proceed?`)) {
      return;
    }

    setIsProcessing(true);
    setResults([]);
    setLogs([]);
    setProgress(0);
    addLog(`🚀 Initializing Serenity Intelligence for ${resorts.length} properties...`);

    const tempResults: FAQResult[] = [];

    for (let i = 0; i < resorts.length; i++) {
      const resort = resorts[i];
      addLog(`Analyzing: ${resort.name}`);
      
      const result: FAQResult = {
        resort_id: resort.id,
        resort_name: resort.name,
        status: 'failure',
        inserted: 0,
        faqs: [],
        error: null
      };

      try {
        addLog(`🧠 Calling Gemini for ${resort.name}...`);
        const generatedFaqs = await generateFaqsWithGemini(resort);
        
        addLog(`💾 Committing ${generatedFaqs.length} rows to database...`);
        const savedRows = await saveToDatabase(generatedFaqs, serviceRoleKey);
        
        result.faqs = savedRows;
        result.inserted = savedRows.length;
        result.status = 'success';
        addLog(`✅ Successfully updated ${resort.name}`);

      } catch (err: any) {
        result.error = err.message;
        addLog(`❌ Failure at ${resort.name}: ${err.message}`);
        if (err.message.includes("API Key session expired")) {
          setIsProcessing(false);
          return;
        }
      }

      tempResults.push(result);
      setResults([...tempResults]);
      setProgress(Math.round(((i + 1) / resorts.length) * 100));
      
      await sleep(500);
    }

    setIsProcessing(false);
    addLog(`🏁 Orchestration Complete.`);
  };

  const downloadResults = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(results, null, 2));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", `serenity_faq_report_${new Date().toISOString().split('T')[0]}.json`);
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 pt-40 pb-20 px-6 font-main">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row justify-between items-start gap-12">
          
          {/* Left: Configuration */}
          <div className="lg:w-1/3 space-y-8">
            <div className="reveal active">
              <span className="text-[10px] font-black text-sky-400 uppercase tracking-[1em] mb-4 block">Gemini Hybrid Suite</span>
              <h1 className="text-4xl md:text-5xl font-serif font-bold italic text-white leading-tight mb-8">AI FAQ <br/> Engine.</h1>
              
              <div className="bg-white/5 border border-white/10 p-8 rounded-[2.5rem] backdrop-blur-xl space-y-6">
                
                {/* Gemini API Key Status */}
                <div className="space-y-4">
                  <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest block">Gemini Intelligence Auth</label>
                  {!hasApiKey ? (
                    <div className="space-y-4">
                      <button 
                        onClick={handleSelectKey}
                        className="w-full bg-sky-500 text-white py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-sky-400 transition-all"
                      >
                        Select Gemini API Key
                      </button>
                      <p className="text-[8px] text-slate-500 leading-relaxed">
                        A paid GCP project key is required for batch operations. 
                        See <a href="https://ai.google.dev/gemini-api/docs/billing" target="_blank" rel="noreferrer" className="text-sky-400 underline">Billing Documentation</a>.
                      </p>
                    </div>
                  ) : (
                    <div className="flex items-center gap-3 bg-emerald-500/10 border border-emerald-500/20 px-6 py-4 rounded-2xl">
                      <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                      <span className="text-[9px] font-bold text-emerald-500 uppercase tracking-widest">Key Active & Injected</span>
                    </div>
                  )}
                </div>

                <div>
                  <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-3 block">Supabase Service Key (Write Auth)</label>
                  <input 
                    type="password" 
                    value={serviceRoleKey}
                    onChange={(e) => setServiceRoleKey(e.target.value)}
                    placeholder="Database Write Token..."
                    className="w-full bg-black/40 border border-white/5 rounded-2xl px-6 py-4 text-xs font-mono text-sky-300 focus:outline-none focus:border-sky-500 transition-all placeholder:text-slate-800"
                  />
                  <p className="text-[8px] text-slate-600 mt-3 leading-relaxed">
                    Database operations require your Supabase Service Role key to bypass RLS.
                  </p>
                </div>

                <div className="pt-4">
                  <button 
                    onClick={runAutomation}
                    disabled={isProcessing || !serviceRoleKey || !hasApiKey}
                    className={`w-full py-6 rounded-full font-black text-[10px] uppercase tracking-[0.4em] transition-all shadow-2xl ${isProcessing || !serviceRoleKey || !hasApiKey ? 'bg-slate-800 text-slate-600 cursor-not-allowed opacity-50' : 'bg-white text-slate-950 hover:bg-sky-400 hover:text-white active:scale-95'}`}
                  >
                    {isProcessing ? 'Thinking...' : 'Start Intelligence Sync'}
                  </button>
                </div>

                {results.length > 0 && !isProcessing && (
                  <button 
                    onClick={downloadResults}
                    className="w-full py-4 border border-white/10 rounded-full font-bold text-[9px] uppercase tracking-widest text-slate-400 hover:text-white hover:border-white transition-all"
                  >
                    Export Batch JSON
                  </button>
                )}
              </div>
            </div>

            <div className="bg-sky-500/5 border border-sky-500/10 p-8 rounded-[2.5rem] space-y-4">
              <h4 className="text-[10px] font-black text-sky-400 uppercase tracking-widest">Logic Flow</h4>
              <ul className="text-[9px] text-slate-500 space-y-3 leading-relaxed">
                <li className="flex gap-3"><span className="text-sky-500">01</span> Validate Gemini Session via AI Studio.</li>
                <li className="flex gap-3"><span className="text-sky-500">02</span> Generate structured JSON via Gemini 3 Flash.</li>
                <li className="flex gap-3"><span className="text-sky-500">03</span> Upsert rows via Service Role client.</li>
                <li className="flex gap-3"><span className="text-sky-500">04</span> Verify and log response integrity.</li>
              </ul>
            </div>
          </div>

          {/* Right: Console */}
          <div className="lg:w-2/3 w-full space-y-6">
            
            {/* Real-time Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white/5 border border-white/10 p-6 rounded-3xl flex flex-col gap-2">
                <span className="text-[9px] font-black uppercase text-slate-500">Intelligence Progress</span>
                <div className="flex items-end gap-3">
                  <span className="text-3xl font-serif italic text-white leading-none">{progress}%</span>
                  <div className="flex-1 h-1 bg-white/5 rounded-full overflow-hidden mb-1">
                    <div className="h-full bg-sky-50 transition-all duration-500" style={{ width: `${progress}%` }}></div>
                  </div>
                </div>
              </div>
              <div className="bg-white/5 border border-white/10 p-6 rounded-3xl flex flex-col gap-2">
                <span className="text-[9px] font-black uppercase text-slate-500">Successful Syncs</span>
                <span className="text-3xl font-serif italic text-emerald-400 leading-none">
                  {results.filter(r => r.status === 'success').length} <span className="text-sm text-slate-600 not-italic">/ {resorts.length}</span>
                </span>
              </div>
              <div className="bg-white/5 border border-white/10 p-6 rounded-3xl flex flex-col gap-2">
                <span className="text-[9px] font-black uppercase text-slate-500">System Warnings</span>
                <span className="text-3xl font-serif italic text-red-500 leading-none">
                  {results.filter(r => r.status === 'failure').length}
                </span>
              </div>
            </div>

            {/* Live Terminal */}
            <div className="bg-black border border-white/5 rounded-[2.5rem] overflow-hidden shadow-2xl">
              <div className="bg-white/5 px-8 py-4 border-b border-white/5 flex items-center justify-between">
                <span className="text-[8px] font-bold uppercase tracking-widest text-slate-500 flex items-center gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-sky-500 animate-pulse"></div>
                  Intelligence Log
                </span>
                <div className="flex gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-white/5"></div>
                  <div className="w-2 h-2 rounded-full bg-white/5"></div>
                </div>
              </div>
              <div className="h-72 overflow-y-auto p-8 font-mono text-[10px] space-y-2 no-scrollbar bg-black/60">
                {logs.length === 0 && <p className="text-slate-800 italic">Waiting for execution signal...</p>}
                {logs.map((log, i) => (
                  <p key={i} className={`${log.includes('✅') ? 'text-emerald-500' : log.includes('❌') ? 'text-red-500' : log.includes('🧠') ? 'text-sky-400' : 'text-slate-500'}`}>
                    {log}
                  </p>
                ))}
              </div>
            </div>

            {/* Grid Preview */}
            {results.length > 0 && (
              <div className="bg-white/5 border border-white/10 rounded-[2.5rem] overflow-hidden reveal active">
                <div className="px-8 py-6 border-b border-white/5">
                  <h3 className="text-xs font-black uppercase tracking-[0.2em] text-white">Registry Status</h3>
                </div>
                <div className="max-h-[400px] overflow-y-auto no-scrollbar">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-white/[0.02] border-b border-white/5">
                        <th className="px-8 py-4 text-[9px] font-black uppercase text-slate-500 tracking-widest">Property</th>
                        <th className="px-8 py-4 text-[9px] font-black uppercase text-slate-500 tracking-widest">Status</th>
                        <th className="px-8 py-4 text-[9px] font-black uppercase text-slate-500 tracking-widest">Generated</th>
                        <th className="px-8 py-4 text-[9px] font-black uppercase text-slate-500 tracking-widest">Error</th>
                      </tr>
                    </thead>
                    <tbody className="text-[11px]">
                      {results.map((r, idx) => (
                        <tr key={idx} className="border-b border-white/5 hover:bg-white/[0.01] transition-colors">
                          <td className="px-8 py-4 font-serif italic text-slate-300">{r.resort_name}</td>
                          <td className="px-8 py-4">
                            <span className={`px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-tighter ${r.status === 'success' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-red-500/10 text-red-500'}`}>
                              {r.status}
                            </span>
                          </td>
                          <td className="px-8 py-4 font-mono text-sky-400">{r.inserted} rows</td>
                          <td className="px-8 py-4 text-[9px] text-slate-600 truncate max-w-[150px]">
                            {r.error || '—'}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminFAQ;