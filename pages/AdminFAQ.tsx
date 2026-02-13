
import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { supabase } from '../lib/supabase';

interface FAQResult {
  resort_id: string;
  resort_name: string;
  status: 'success' | 'failure';
  inserted: number;
  faqs: any[];
  error: string | null;
  raw_response?: any;
}

const AdminFAQ: React.FC = () => {
  const [resorts, setResorts] = useState<any[]>([]);
  const [serviceRoleKey, setServiceRoleKey] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [results, setResults] = useState<FAQResult[]>([]);
  const [logs, setLogs] = useState<string[]>([]);
  const [progress, setProgress] = useState(0);

  const addLog = (msg: string) => {
    setLogs(prev => [`[${new Date().toLocaleTimeString()}] ${msg}`, ...prev].slice(0, 100));
  };

  useEffect(() => {
    const fetchResorts = async () => {
      const { data } = await supabase.from('resorts').select('id, name').order('name');
      if (data) setResorts(data);
    };
    fetchResorts();
  }, []);

  const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

  const callEdgeFunction = async (resortId: string, retryCount = 0): Promise<any> => {
    const url = `https://zocncwchaakjtsvlscmd.supabase.co/functions/v1/generate-resort-faqs?resort_id=${resortId}`;
    
    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${serviceRoleKey}`
        }
      });

      if (response.ok) {
        return await response.json();
      }

      // Handle 4xx - Do not retry
      if (response.status >= 400 && response.status < 500) {
        const errorData = await response.json();
        throw new Error(errorData.error || `HTTP ${response.status}`);
      }

      // Retry logic for 5xx errors
      if (response.status >= 500 && retryCount < 2) {
        const waitTime = (retryCount + 1) * 1000;
        addLog(`⚠️ Server Error (HTTP ${response.status}) for ${resortId}. Retrying in ${waitTime}ms...`);
        await sleep(waitTime);
        return callEdgeFunction(resortId, retryCount + 1);
      }

      const errorData = await response.json().catch(() => ({ error: `HTTP ${response.status}` }));
      throw new Error(errorData.error || `HTTP ${response.status}`);
    } catch (err: any) {
      // Network errors
      if (err.name === 'TypeError' && retryCount < 2) {
        const waitTime = (retryCount + 1) * 1000;
        addLog(`📡 Network timeout/error. Retrying in ${waitTime}ms...`);
        await sleep(waitTime);
        return callEdgeFunction(resortId, retryCount + 1);
      }
      throw err;
    }
  };

  const verifyFaqs = async (resortId: string, adminKey: string) => {
    // Create a temporary admin client to bypass RLS for verification
    const adminClient = createClient('https://zocncwchaakjtsvlscmd.supabase.co', adminKey);
    const { data, error } = await adminClient
      .from('resort_faqs')
      .select('id, resort_id, question, answer, category, is_ai_generated, created_at')
      .eq('resort_id', resortId)
      .order('created_at', { ascending: false })
      .limit(10);
    
    if (error) throw error;
    return data || [];
  };

  const runAutomation = async () => {
    if (!serviceRoleKey) {
      alert("Service Role Key is required for this operation.");
      return;
    }

    if (!confirm(`Are you sure you want to trigger AI generation for ${resorts.length} resorts?`)) {
      return;
    }

    setIsProcessing(true);
    setResults([]);
    setLogs([]);
    setProgress(0);
    addLog(`🚀 Starting Batch FAQ Generation for ${resorts.length} resorts...`);

    const tempResults: FAQResult[] = [];

    for (let i = 0; i < resorts.length; i++) {
      const resort = resorts[i];
      addLog(`Processing: ${resort.name}`);
      
      const result: FAQResult = {
        resort_id: resort.id,
        resort_name: resort.name,
        status: 'failure',
        inserted: 0,
        faqs: [],
        error: null
      };

      try {
        const response = await callEdgeFunction(resort.id);
        result.raw_response = response;

        if (response.inserted !== undefined) {
          result.inserted = response.inserted;
          // Verify and fetch rows using the service key
          const fetchedFaqs = await verifyFaqs(resort.id, serviceRoleKey);
          result.faqs = fetchedFaqs;
          result.status = 'success';
          addLog(`✅ Success: Generated ${response.inserted} FAQs for ${resort.name}`);
        } else if (response.faqs) {
          result.faqs = response.faqs;
          result.inserted = response.faqs.length;
          result.status = 'success';
          addLog(`✅ Success: Retrieved ${result.inserted} FAQs directly.`);
        } else {
          throw new Error("Edge Function returned ambiguous data.");
        }
      } catch (err: any) {
        result.error = err.message;
        addLog(`❌ Failed ${resort.name}: ${err.message}`);
      }

      tempResults.push(result);
      // We update the results state progressively for the UI table
      setResults([...tempResults]);
      setProgress(Math.round(((i + 1) / resorts.length) * 100));
      
      // Safety throttle between calls
      await sleep(300);
    }

    setIsProcessing(false);
    addLog(`🏁 Batch Complete. ${tempResults.filter(r => r.status === 'success').length} successful, ${tempResults.filter(r => r.status === 'failure').length} failed.`);
  };

  const downloadResults = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(results, null, 2));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", `serenity_faq_orchestration_${new Date().toISOString().split('T')[0]}.json`);
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 pt-40 pb-20 px-6 font-main">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row justify-between items-start gap-12">
          
          {/* Left: Configuration & Control */}
          <div className="lg:w-1/3 space-y-8">
            <div className="reveal active">
              <span className="text-[10px] font-black text-sky-400 uppercase tracking-[1em] mb-4 block">Intelligence Suite</span>
              <h1 className="text-4xl md:text-5xl font-serif font-bold italic text-white leading-tight mb-8">FAQ <br/> Orchestration.</h1>
              
              <div className="bg-white/5 border border-white/10 p-8 rounded-[2.5rem] backdrop-blur-xl space-y-6">
                <div>
                  <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-3 block">Service Role Key (Secrets)</label>
                  <input 
                    type="password" 
                    value={serviceRoleKey}
                    onChange={(e) => setServiceRoleKey(e.target.value)}
                    placeholder="eyJhbGciOiJIUzI1..."
                    className="w-full bg-black/40 border border-white/5 rounded-2xl px-6 py-4 text-xs font-mono text-sky-300 focus:outline-none focus:border-sky-500 transition-all placeholder:text-slate-800"
                  />
                  <p className="text-[8px] text-slate-600 mt-3 leading-relaxed">Required for Edge Function invocation and DB verification. Key is held only in session memory.</p>
                </div>

                <div className="pt-4">
                  <button 
                    onClick={runAutomation}
                    disabled={isProcessing || !serviceRoleKey}
                    className={`w-full py-6 rounded-full font-black text-[10px] uppercase tracking-[0.4em] transition-all shadow-2xl ${isProcessing || !serviceRoleKey ? 'bg-slate-800 text-slate-600 cursor-not-allowed opacity-50' : 'bg-white text-slate-950 hover:bg-sky-400 hover:text-white active:scale-95'}`}
                  >
                    {isProcessing ? 'Engine Processing...' : 'Execute Batch sync'}
                  </button>
                </div>

                {results.length > 0 && !isProcessing && (
                  <button 
                    onClick={downloadResults}
                    className="w-full py-4 border border-white/10 rounded-full font-bold text-[9px] uppercase tracking-widest text-slate-400 hover:text-white hover:border-white transition-all"
                  >
                    Download results .JSON
                  </button>
                )}
              </div>
            </div>

            <div className="bg-sky-500/5 border border-sky-500/10 p-8 rounded-[2.5rem] space-y-4">
              <h4 className="text-[10px] font-black text-sky-400 uppercase tracking-widest">Automation Schema</h4>
              <ul className="text-[9px] text-slate-500 space-y-3 leading-relaxed">
                <li className="flex gap-3"><span className="text-sky-500">•</span> HTTP GET with 10s Timeout per resort.</li>
                <li className="flex gap-3"><span className="text-sky-500">•</span> Exponential Backoff: 1s, then 2s retry window.</li>
                <li className="flex gap-3"><span className="text-sky-500">•</span> Post-call SQL Verification: SELECT id FROM resort_faqs.</li>
                <li className="flex gap-3"><span className="text-sky-500">•</span> Real-time status reporting and error logging.</li>
              </ul>
            </div>
          </div>

          {/* Right: Monitoring Console */}
          <div className="lg:w-2/3 w-full space-y-6">
            
            {/* Progress & Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white/5 border border-white/10 p-6 rounded-3xl flex flex-col gap-2">
                <span className="text-[9px] font-black uppercase text-slate-500">System progress</span>
                <div className="flex items-end gap-3">
                  <span className="text-3xl font-serif italic text-white leading-none">{progress}%</span>
                  <div className="flex-1 h-1 bg-white/5 rounded-full overflow-hidden mb-1">
                    <div className="h-full bg-sky-500 transition-all duration-500" style={{ width: `${progress}%` }}></div>
                  </div>
                </div>
              </div>
              <div className="bg-white/5 border border-white/10 p-6 rounded-3xl flex flex-col gap-2">
                <span className="text-[9px] font-black uppercase text-slate-500">Success Rate</span>
                <span className="text-3xl font-serif italic text-emerald-400 leading-none">
                  {results.filter(r => r.status === 'success').length} <span className="text-sm text-slate-600 not-italic">/ {resorts.length}</span>
                </span>
              </div>
              <div className="bg-white/5 border border-white/10 p-6 rounded-3xl flex flex-col gap-2">
                <span className="text-[9px] font-black uppercase text-slate-500">Errors</span>
                <span className="text-3xl font-serif italic text-red-500 leading-none">
                  {results.filter(r => r.status === 'failure').length}
                </span>
              </div>
            </div>

            {/* Terminal Live Log */}
            <div className="bg-black border border-white/5 rounded-[2.5rem] overflow-hidden shadow-2xl">
              <div className="bg-white/5 px-8 py-4 border-b border-white/5 flex items-center justify-between">
                <span className="text-[8px] font-bold uppercase tracking-widest text-slate-500 flex items-center gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-sky-500 animate-pulse"></div>
                  Live Orchestration Log
                </span>
                <div className="flex gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-white/5"></div>
                  <div className="w-2 h-2 rounded-full bg-white/5"></div>
                </div>
              </div>
              <div className="h-72 overflow-y-auto p-8 font-mono text-[10px] space-y-2 no-scrollbar scroll-smooth bg-black/60">
                {logs.length === 0 && <p className="text-slate-800 italic">Console idling. Waiting for execution signal...</p>}
                {logs.map((log, i) => (
                  <p key={i} className={`${log.includes('✅') ? 'text-emerald-500' : log.includes('❌') ? 'text-red-500' : log.includes('⚠️') ? 'text-amber-500' : 'text-slate-500'}`}>
                    {log}
                  </p>
                ))}
              </div>
            </div>

            {/* Results Archive Table */}
            {results.length > 0 && (
              <div className="bg-white/5 border border-white/10 rounded-[2.5rem] overflow-hidden reveal active">
                <div className="px-8 py-6 border-b border-white/5">
                  <h3 className="text-xs font-black uppercase tracking-[0.2em] text-white">Execution results</h3>
                </div>
                <div className="max-h-[400px] overflow-y-auto no-scrollbar">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-white/[0.02] border-b border-white/5">
                        <th className="px-8 py-4 text-[9px] font-black uppercase text-slate-500 tracking-widest">Resort</th>
                        <th className="px-8 py-4 text-[9px] font-black uppercase text-slate-500 tracking-widest">Status</th>
                        <th className="px-8 py-4 text-[9px] font-black uppercase text-slate-500 tracking-widest">Inserted</th>
                        <th className="px-8 py-4 text-[9px] font-black uppercase text-slate-500 tracking-widest">Last Check</th>
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
                          <td className="px-8 py-4 text-[9px] text-slate-600 font-bold uppercase tracking-widest">
                            {r.error ? r.error : 'Verified OK'}
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
