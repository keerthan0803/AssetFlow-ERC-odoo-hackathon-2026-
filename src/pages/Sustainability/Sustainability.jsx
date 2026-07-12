import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import Sidebar from '../../components/Sidebar';

export default function Sustainability() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [aiText, setAiText] = useState('');

  // Authentication check
  useEffect(() => {
    const user = localStorage.getItem('af_logged_in_user');
    if (!user) {
      navigate('/login');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('af_logged_in_user');
    toast.success('Successfully logged out.');
    navigate('/login');
  };

  const handleAiSend = (e) => {
    e.preventDefault();
    if (!aiText.trim()) return;
    toast.loading('Analyzing ESG performance benchmarks…', { id: 'ai' });
    setTimeout(() => {
      toast.success('Lumina: Current offsets predict net-zero baseline convergence in Q4.', { id: 'ai', duration: 4000 });
      setAiText('');
    }, 1300);
  };

  // Mock optimization logs
  const logs = [
    { id: 1, cluster: 'Data Center - Zone 4', sub: 'Cooling Optimization', type: 'AI Automation', offset: 124.5, efficiency: '98.2%', icon: 'dns' },
    { id: 2, cluster: 'Automotive Assembly', sub: 'Motor Retrofitting', type: 'Manual Retrofit', offset: 82.1, efficiency: '89.4%', icon: 'precision_manufacturing' },
    { id: 3, cluster: 'Logistics Hub West', sub: 'VFD Installation', type: 'Predictive Maint.', offset: 45.8, efficiency: '92.1%', icon: 'conveyor_belt' }
  ];

  const filteredLogs = logs.filter(item => 
    item.cluster.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.sub.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div 
      className="bg-[#0F172A] text-[#E1E2ED] font-body-sm selection:bg-primary/30 min-h-screen overflow-hidden flex w-full"
      style={{ fontFamily: "'Inter', sans-serif" }}
    >
      <style>{`
        .glass-card {
          backdrop-filter: blur(12px);
          background: rgba(30, 41, 59, 0.5);
          border: 1px solid rgba(255, 255, 255, 0.05);
          border-top: 1px solid rgba(255, 255, 255, 0.1);
        }
        .primary-glow {
          box-shadow: 0 0 20px 2px rgba(180, 197, 255, 0.08);
        }
        .active-glow {
          box-shadow: 0 0 15px 0px rgba(180, 197, 255, 0.15);
        }
      `}</style>

      <Sidebar />

      {/* Main Content Shell */}
      <main className="min-h-screen relative overflow-hidden flex-1 w-full overflow-y-auto">
        {/* Canvas Area */}
        <div className="pt-8 pb-24 px-6 max-w-full mx-auto space-y-6 text-left">

          {/* Hero Bento Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            
            {/* Environmental Impact Hero */}
            <div className="lg:col-span-8 glass-card rounded-xl p-6 relative overflow-hidden flex flex-col justify-between primary-glow min-h-[360px]">
              <div className="absolute right-10 bottom-6 opacity-10 pointer-events-none">
                <span className="material-symbols-outlined text-[160px]" style={{ fontVariationSettings: "'wght' 100" }}>eco</span>
              </div>
              
              <div>
                <div className="flex items-center gap-2 mb-6 flex-wrap">
                  <span className="px-3 py-1 rounded-full bg-primary/10 text-primary font-mono text-[9px] uppercase tracking-wider" style={{ color: '#b4c5ff' }}>
                    Environmental Performance
                  </span>
                  <span className="text-on-surface-variant text-xs" style={{ color: '#c3c6d7' }}>• FY2024 Global Report</span>
                </div>
                <h2 className="text-3xl font-bold max-w-xl mb-3 leading-tight">Driving Net-Zero Through Precision EAM.</h2>
                <p className="text-on-surface-variant text-sm max-w-lg leading-relaxed" style={{ color: '#c3c6d7' }}>
                  AssetFlow has optimized over 12,400 enterprise assets this quarter, leading to a significant reduction in unnecessary energy consumption and extended hardware lifecycles.
                </p>
              </div>

              <div className="grid grid-cols-3 gap-6 pt-6 border-t border-white/5 mt-6">
                <div>
                  <p className="text-on-surface-variant font-mono text-[9px] mb-1.5" style={{ color: '#c3c6d7' }}>TOTAL CARBON OFFSET</p>
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-bold text-primary" style={{ color: '#b4c5ff' }}>2,842</span>
                    <span className="text-on-surface-variant text-xs font-semibold" style={{ color: '#c3c6d7' }}>MT</span>
                  </div>
                  <p className="text-primary text-[10px] flex items-center gap-1 mt-1 font-semibold" style={{ color: '#b4c5ff' }}>
                    <span className="material-symbols-outlined text-xs">trending_up</span> +14.2% YoY
                  </p>
                </div>
                
                <div>
                  <p className="text-on-surface-variant font-mono text-[9px] mb-1.5" style={{ color: '#c3c6d7' }}>E-WASTE DIVERTED</p>
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-bold">18.5</span>
                    <span className="text-on-surface-variant text-xs font-semibold" style={{ color: '#c3c6d7' }}>TONS</span>
                  </div>
                  <p className="text-primary text-[10px] flex items-center gap-1 mt-1 font-semibold" style={{ color: '#b4c5ff' }}>
                    <span className="material-symbols-outlined text-xs">trending_up</span> +8.4% YoY
                  </p>
                </div>

                <div>
                  <p className="text-on-surface-variant font-mono text-[9px] mb-1.5" style={{ color: '#c3c6d7' }}>ENERGY EFFICIENCY</p>
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-bold">94.2</span>
                    <span className="text-on-surface-variant text-xs font-semibold" style={{ color: '#c3c6d7' }}>%</span>
                  </div>
                  <p className="text-primary text-[10px] flex items-center gap-1 mt-1 font-semibold" style={{ color: '#b4c5ff' }}>
                    <span className="material-symbols-outlined text-xs">trending_up</span> +2.1% YoY
                  </p>
                </div>
              </div>
            </div>

            {/* Lifecycle Extension Card */}
            <div className="lg:col-span-4 glass-card rounded-xl p-6 flex flex-col justify-between">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-base font-bold">Lifecycle Extension</h3>
                  <p className="text-[10px] text-on-surface-variant mt-0.5" style={{ color: '#c3c6d7' }}>Asset longevity impact</p>
                </div>
                <span className="material-symbols-outlined text-primary text-xl" style={{ color: '#b4c5ff' }}>cycle</span>
              </div>

              <div className="flex-1 flex flex-col justify-center gap-4 my-4">
                <div className="space-y-1.5">
                  <div className="flex justify-between text-[10px] font-mono font-semibold">
                    <span className="text-on-surface-variant" style={{ color: '#c3c6d7' }}>SERVERS & STORAGE</span>
                    <span className="text-primary" style={{ color: '#b4c5ff' }}>+2.4 Years Avg.</span>
                  </div>
                  <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full bg-primary w-4/5 rounded-full" style={{ backgroundColor: '#2563eb' }} />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <div className="flex justify-between text-[10px] font-mono font-semibold">
                    <span className="text-on-surface-variant" style={{ color: '#c3c6d7' }}>INDUSTRIAL ROBOTICS</span>
                    <span className="text-primary" style={{ color: '#b4c5ff' }}>+1.8 Years Avg.</span>
                  </div>
                  <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full bg-primary w-3/5 rounded-full" style={{ backgroundColor: '#2563eb' }} />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <div className="flex justify-between text-[10px] font-mono font-semibold">
                    <span className="text-on-surface-variant" style={{ color: '#c3c6d7' }}>FLEET ASSETS</span>
                    <span className="text-primary" style={{ color: '#b4c5ff' }}>+3.1 Years Avg.</span>
                  </div>
                  <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full bg-primary w-[92%] rounded-full" style={{ backgroundColor: '#2563eb' }} />
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-white/5 flex items-center justify-between mt-2">
                <span className="text-xs text-on-surface-variant" style={{ color: '#c3c6d7' }}>Estimated Cost Savings</span>
                <span className="font-bold text-lg text-on-surface">$1.2M</span>
              </div>
            </div>
          </div>

          {/* Analytical Charts Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Draw efficiency chart */}
            <div className="glass-card rounded-xl p-6 h-80 flex flex-col justify-between">
              <div className="flex justify-between items-center mb-3">
                <h4 className="text-sm font-bold text-on-surface">Energy Draw Efficiency</h4>
                <span className="material-symbols-outlined text-primary/60 text-base" style={{ color: '#b4c5ff' }}>bolt</span>
              </div>
              <div className="flex-grow w-full relative min-h-[160px]">
                <div className="absolute inset-0 flex items-end gap-1 px-1">
                  <div className="flex-1 bg-primary/20 h-[30%] rounded-t-sm" style={{ backgroundColor: 'rgba(180,197,255,0.2)' }} />
                  <div className="flex-1 bg-primary/20 h-[45%] rounded-t-sm" style={{ backgroundColor: 'rgba(180,197,255,0.2)' }} />
                  <div className="flex-1 bg-primary/20 h-[40%] rounded-t-sm" style={{ backgroundColor: 'rgba(180,197,255,0.2)' }} />
                  <div className="flex-1 bg-primary/20 h-[65%] rounded-t-sm" style={{ backgroundColor: 'rgba(180,197,255,0.2)' }} />
                  <div className="flex-1 bg-primary/20 h-[55%] rounded-t-sm" style={{ backgroundColor: 'rgba(180,197,255,0.2)' }} />
                  <div className="flex-1 bg-primary/20 h-[80%] rounded-t-sm" style={{ backgroundColor: 'rgba(180,197,255,0.2)' }} />
                  <div className="flex-1 bg-primary h-[95%] rounded-t-sm relative" style={{ backgroundColor: '#b4c5ff' }}>
                    <div className="absolute -top-7 left-1/2 -translate-x-1/2 glass-card px-2 py-0.5 text-[8px] font-bold rounded">94.2%</div>
                  </div>
                  <div className="flex-1 bg-primary/20 h-[75%] rounded-t-sm" style={{ backgroundColor: 'rgba(180,197,255,0.2)' }} />
                  <div className="flex-1 bg-primary/20 h-[60%] rounded-t-sm" style={{ backgroundColor: 'rgba(180,197,255,0.2)' }} />
                  <div className="flex-1 bg-primary/20 h-[50%] rounded-t-sm" style={{ backgroundColor: 'rgba(180,197,255,0.2)' }} />
                </div>
              </div>
              <div className="mt-3 flex justify-between font-mono text-[9px] text-on-surface-variant" style={{ color: '#8d90a0' }}>
                <span>JAN</span>
                <span>MAR</span>
                <span>JUN</span>
                <span>SEP</span>
                <span>DEC</span>
              </div>
            </div>

            {/* Donut Recycling */}
            <div className="glass-card rounded-xl p-6 h-80 flex flex-col justify-between">
              <div className="flex justify-between items-center mb-3">
                <h4 className="text-sm font-bold text-on-surface">Resource Recycling</h4>
                <span className="material-symbols-outlined text-primary/60 text-base" style={{ color: '#b4c5ff' }}>recycling</span>
              </div>
              <div className="flex-grow flex items-center justify-center relative min-h-[160px]">
                <div className="relative w-36 h-36 rounded-full border-[10px] border-primary/10 flex items-center justify-center" style={{ borderColor: 'rgba(180,197,255,0.1)' }}>
                  <div className="absolute inset-0 rounded-full border-[10px] border-primary border-r-transparent border-b-transparent -rotate-45" style={{ borderColor: '#2563eb', borderRightColor: 'transparent', borderBottomColor: 'transparent' }} />
                  <div className="text-center">
                    <p className="text-2xl font-bold leading-none">78%</p>
                    <p className="text-[9px] text-on-surface-variant uppercase tracking-widest font-mono mt-1" style={{ color: '#c3c6d7' }}>Diverted</p>
                  </div>
                </div>
                <div className="absolute right-0 space-y-1">
                  <div className="flex items-center gap-1.5">
                    <div className="w-2 h-2 rounded-full bg-primary" style={{ backgroundColor: '#2563eb' }} />
                    <span className="text-[10px] font-semibold text-on-surface-variant" style={{ color: '#c3c6d7' }}>Metals</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="w-2 h-2 rounded-full bg-primary/40" style={{ backgroundColor: 'rgba(37,99,235,0.4)' }} />
                    <span className="text-[10px] font-semibold text-on-surface-variant" style={{ color: '#c3c6d7' }}>Silicon</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="w-2 h-2 rounded-full bg-primary/20" style={{ backgroundColor: 'rgba(37,99,235,0.2)' }} />
                    <span className="text-[10px] font-semibold text-on-surface-variant" style={{ color: '#c3c6d7' }}>Plastics</span>
                  </div>
                </div>
              </div>
            </div>

            {/* AI predicted */}
            <div className="glass-card rounded-xl p-6 h-80 flex flex-col justify-between overflow-hidden">
              <div className="flex justify-between items-center mb-3">
                <div className="flex items-center gap-1.5">
                  <h4 className="text-sm font-bold text-on-surface">Predictive Savings</h4>
                  <span className="px-1.5 py-0.5 rounded text-[8px] bg-primary/20 text-primary font-bold" style={{ backgroundColor: 'rgba(180,197,255,0.2)', color: '#b4c5ff' }}>AI</span>
                </div>
                <span className="material-symbols-outlined text-primary/60 text-base" style={{ color: '#b4c5ff' }}>auto_graph</span>
              </div>
              
              <div className="flex-grow relative flex flex-col justify-end min-h-[160px]">
                <svg className="w-full" viewBox="0 0 400 150">
                  <path d="M0,120 Q50,110 100,90 T200,60 T300,40 T400,10" fill="none" stroke="rgba(180, 197, 255, 0.4)" strokeDasharray="5,5" strokeWidth="2" />
                  <path d="M0,140 Q50,130 100,110 T200,80 T300,50 T400,20" fill="none" stroke="#2563eb" strokeWidth="3" />
                  <circle cx="400" cy="20" fill="#2563eb" r="4" />
                </svg>
                <div className="mt-3 p-3 bg-primary/5 rounded-lg border border-primary/10" style={{ borderColor: 'rgba(180,197,255,0.1)' }}>
                  <p className="text-[11px] text-on-surface-variant leading-relaxed" style={{ color: '#c3c6d7' }}>
                    AI predicts a <span className="text-primary font-bold" style={{ color: '#b4c5ff' }}>12.5% increase</span> in efficiency next quarter by optimizing idling assets.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Table & Map Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pb-20">
            
            {/* Global Nodes map */}
            <div className="lg:col-span-4 glass-card rounded-xl overflow-hidden relative group min-h-[300px] flex flex-col justify-between p-6">
              <div>
                <h4 className="text-sm font-bold text-on-surface">Global Nodes</h4>
                <p className="text-[10px] text-on-surface-variant mt-0.5" style={{ color: '#c3c6d7' }}>Energy-dense regions</p>
              </div>
              
              <div className="absolute inset-0 bg-slate-900 overflow-hidden z-0">
                <div 
                  className="w-full h-full grayscale contrast-125 opacity-30 mix-blend-screen bg-cover bg-center" 
                  style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCsfEplNL8ZL7WFHKsZ4wM88n5u_QDKrjViXEoOTFbitFEcSeyBpUZGuEHkn2XK3hNdk4eLfL-Hbs0vzp_rbvu0eTUCZP3iRuiGP5AQZBnF2qErEthZ-pELMY0N2wjjTz8VHJ6OCXcJYZjci98tGi4fnZli5yNP31rysqfVPFVYyzzR8KOr2eV-wlTuR46J26W_KxS8Sz-7TTBDd8_k-IlcsycY8N7TbPy4uhTRLLD0Mkb1fo-B01QK')" }}
                />
                
                {/* Simulated Pins */}
                <div className="absolute top-1/3 left-1/4 animate-pulse">
                  <div className="w-2.5 h-2.5 bg-primary rounded-full" style={{ backgroundColor: '#2563eb' }} />
                  <div className="absolute inset-0 w-2.5 h-2.5 bg-primary rounded-full animate-ping" style={{ backgroundColor: '#2563eb' }} />
                </div>
                <div className="absolute top-1/2 left-1/2 animate-pulse [animation-delay:1s]">
                  <div className="w-2.5 h-2.5 bg-primary rounded-full" style={{ backgroundColor: '#2563eb' }} />
                  <div className="absolute inset-0 w-2.5 h-2.5 bg-primary rounded-full animate-ping" style={{ backgroundColor: '#2563eb' }} />
                </div>
                <div className="absolute bottom-1/4 right-1/3 animate-pulse [animation-delay:0.5s]">
                  <div className="w-2.5 h-2.5 bg-primary rounded-full" style={{ backgroundColor: '#2563eb' }} />
                  <div className="absolute inset-0 w-2.5 h-2.5 bg-primary rounded-full animate-ping" style={{ backgroundColor: '#2563eb' }} />
                </div>
              </div>
            </div>

            {/* Optimization log table */}
            <div className="lg:col-span-8 glass-card rounded-xl p-6 overflow-hidden">
              <div className="flex justify-between items-center mb-6">
                <h4 className="text-sm font-bold text-on-surface">Optimization Log</h4>
                <button onClick={() => toast.success('Detailed global optimization ledger is nominal')} className="text-xs font-bold text-primary flex items-center gap-1 cursor-pointer" style={{ color: '#b4c5ff' }}>
                  VIEW ALL <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </button>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="text-on-surface-variant border-b border-white/5 font-mono text-[9px] uppercase tracking-widest" style={{ color: '#8d90a0' }}>
                      <th className="pb-3 font-semibold">Asset Cluster</th>
                      <th className="pb-3 font-semibold">Modality</th>
                      <th className="pb-3 font-semibold text-right">Offset (MT)</th>
                      <th className="pb-3 font-semibold text-right">Efficiency</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredLogs.length === 0 ? (
                      <tr>
                        <td colSpan="4" className="py-6 text-center text-xs text-on-surface-variant">
                          No matching optimization logs.
                        </td>
                      </tr>
                    ) : (
                      filteredLogs.map(item => (
                        <tr key={item.id} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors group">
                          <td className="py-3 flex items-center gap-3">
                            <div className="w-8 h-8 rounded bg-primary/10 flex items-center justify-center text-primary" style={{ backgroundColor: 'rgba(37,99,235,0.1)', color: '#b4c5ff' }}>
                              <span className="material-symbols-outlined text-sm">{item.icon}</span>
                            </div>
                            <div className="text-left">
                              <p className="font-bold text-sm">{item.cluster}</p>
                              <p className="text-[10px] text-on-surface-variant" style={{ color: '#c3c6d7' }}>{item.sub}</p>
                            </div>
                          </td>
                          <td className="py-3">
                            <span className="px-2 py-0.5 rounded-full border border-primary/20 text-[9px] text-primary font-bold" style={{ color: '#b4c5ff', borderColor: 'rgba(180,197,255,0.2)' }}>
                              {item.type}
                            </span>
                          </td>
                          <td className="py-3 text-right font-mono text-xs text-primary font-bold" style={{ color: '#b4c5ff' }}>+{item.offset}</td>
                          <td className="py-3 text-right font-mono text-xs text-on-surface">{item.efficiency}</td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        {/* AI Assistant Floating Input */}
        <div className="fixed bottom-6 right-6 w-full max-w-md z-50 px-6 lg:px-0">
          <form onSubmit={handleAiSend} className="glass-card rounded-full p-2 flex items-center gap-3 active-glow bg-[#1e2029]">
            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-on-primary flex-shrink-0 animate-pulse" style={{ backgroundColor: '#2563eb' }}>
              <span className="material-symbols-outlined text-lg">smart_toy</span>
            </div>
            <input 
              className="flex-1 bg-transparent border-none outline-none focus:ring-0 text-xs text-on-surface placeholder:text-on-surface-variant/40" 
              placeholder="Ask AI about impact trends..." 
              type="text"
              value={aiText}
              onChange={e => setAiText(e.target.value)}
            />
            <button type="submit" className="p-2 text-primary hover:bg-primary/10 rounded-full transition-colors cursor-pointer" style={{ color: '#b4c5ff' }}>
              <span className="material-symbols-outlined text-base">send</span>
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}
