import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import Sidebar from '../../components/Sidebar';
import Header from '../../components/Header';

export default function AssetDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const assetId = id || 'AF-9088-QX';

  const [aiText, setAiText] = useState('');
  const [activityTiles, setActivityTiles] = useState([]);
  const [isAiGlow, setIsAiGlow] = useState(false);

  // Generate GitHub style heatmap logs
  useEffect(() => {
    const tiles = [];
    const intensities = [
      'bg-slate-100 hover:bg-slate-200', 
      'bg-indigo-100 hover:bg-indigo-200', 
      'bg-indigo-300 hover:bg-indigo-400', 
      'bg-indigo-500 hover:bg-indigo-600', 
      'bg-indigo-700 hover:bg-indigo-800'
    ];
    for (let i = 0; i < 364; i++) {
      const intensity = Math.floor(Math.random() * 5);
      tiles.push({ id: i, className: intensities[intensity] });
    }
    setActivityTiles(tiles);
  }, []);

  const handleAiSend = (e) => {
    e.preventDefault();
    if (!aiText.trim()) return;
    toast.loading(`Querying Lumina database for telemetry data…`, { id: 'ai' });
    setTimeout(() => {
      toast.success(`Lumina AI: Telemetry for ${assetId} matches the active baseline. No immediate intervention required.`, { id: 'ai', duration: 4000 });
      setAiText('');
    }, 1500);
  };

  return (
    <div className="flex min-h-screen bg-[#FBFBFC] font-sans antialiased text-slate-800">
      <Sidebar />
      <main className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        {/* Reusable Header */}
        <Header showSearch={false} title={`Asset Details: ${assetId}`} />

        {/* Page Content */}
        <div className="px-8 py-6 max-w-7xl w-full mx-auto space-y-6">
          
          {/* Top Title & Actions Row */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-200/50 pb-5">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[#0d4d43] font-mono uppercase tracking-wider text-[10px] font-bold">
                  Asset ID: {assetId}
                </span>
                <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-[9px] text-emerald-700 font-bold border border-emerald-100 uppercase">
                  Operational
                </span>
              </div>
              <h1 className="text-xl font-black text-[#00352d] tracking-tight mt-1">Precision Core Facility A1</h1>
            </div>
            
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <button 
                onClick={() => toast.success('Exporting telemetry ledger to local storage…')}
                className="px-4 py-2 border border-[#bfc9c5] bg-white hover:bg-slate-50 text-slate-700 rounded-xl text-xs font-bold shadow-sm transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
              >
                <span className="material-symbols-outlined text-sm">download</span>
                Export Report
              </button>
              <button 
                onClick={() => toast.success('Opening system calibration console…')}
                className="px-4 py-2 bg-[#00352d] hover:bg-[#0d4d43] text-white rounded-xl text-xs font-bold shadow-sm transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
              >
                <span className="material-symbols-outlined text-sm">settings</span>
                Manage Configuration
              </button>
            </div>
          </div>
          
          {/* Main Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start pb-20">
            
            {/* Left Pane: Visual telemetry */}
            <div className="lg:col-span-5 flex flex-col gap-6">
              
              {/* Asset Cover Card */}
              <div className="bg-white border border-slate-100 rounded-2xl overflow-hidden shadow-sm relative group h-[340px]">
                <img 
                  className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-700" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBPtr8hGWy1JWe4acsawgn8tUn3z2AbvAwhRBFpmcvvqUfESEjg9IBBzamjAunV3kaV5p5BkGMIRGYDsxN-PjJLJ4tSZDzx38EAjqqqN1QIBlkfuMJMU9XyXS6HLNLNmS4-i_yIfOgWZ_zGFU3qqCqrCPHoPCJChwDby_q1Ja-itU67KbrZi9ti-VcNCWxTYTOLwJpsXj3V_YVAvpo2VA7KpYmyd-lfuHExX8jRjLGQlBdkt_y303i3"
                  alt="Precision core server facility"
                />
                
                {/* Visual telemetry overlay */}
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950 via-slate-900/40 to-transparent p-5 text-left flex flex-col justify-end text-white">
                  <span className="text-[9px] text-indigo-300 font-extrabold uppercase tracking-widest mb-2 font-mono">Real-time Telemetry</span>
                  <div className="flex justify-between items-end">
                    <div className="flex gap-4">
                      <div>
                        <p className="text-xl font-black text-white leading-none">32.4°C</p>
                        <p className="text-[9px] text-slate-300 font-bold uppercase tracking-wider mt-1">Thermal</p>
                      </div>
                      <div className="w-px h-8 bg-white/10" />
                      <div>
                        <p className="text-xl font-black text-white leading-none">98.2%</p>
                        <p className="text-[9px] text-slate-300 font-bold uppercase tracking-wider mt-1">Efficiency</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-xl font-black text-indigo-300 leading-none">12,482h</p>
                      <p className="text-[9px] text-slate-300 font-bold uppercase tracking-wider mt-1">Uptime</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Integrity & Value gauges */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Structural integrity */}
                <div className="bg-white border border-slate-100 p-4.5 rounded-2xl shadow-sm text-left">
                  <div className="flex justify-between items-start mb-3">
                    <span className="text-[9px] font-bold text-slate-400 tracking-wider uppercase">Structural Integrity</span>
                    <span className="material-symbols-outlined text-emerald-500 text-sm">monitor_heart</span>
                  </div>
                  <div className="flex items-center gap-3.5">
                    <div className="relative w-12 h-12 flex-shrink-0">
                      <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                        <circle className="stroke-slate-100" cx="18" cy="18" fill="none" r="16" strokeWidth="3" />
                        <circle className="stroke-emerald-500" cx="18" cy="18" fill="none" r="16" strokeDasharray="100" strokeDashoffset="5" strokeWidth="3" />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-xs font-bold text-slate-800">95%</span>
                      </div>
                    </div>
                    <div>
                      <p className="text-xs font-bold text-emerald-600">OPTIMAL</p>
                      <p className="text-[9px] text-slate-400 font-semibold mt-0.5">Last checked 2h ago</p>
                    </div>
                  </div>
                </div>

                {/* Residual value */}
                <div className="bg-white border border-slate-100 p-4.5 rounded-2xl shadow-sm text-left">
                  <div className="flex justify-between items-start mb-3">
                    <span className="text-[9px] font-bold text-slate-400 tracking-wider uppercase">Residual Value</span>
                    <span className="material-symbols-outlined text-indigo-500 text-sm">payments</span>
                  </div>
                  <div className="flex items-center gap-3.5">
                    <div className="relative w-12 h-12 flex-shrink-0">
                      <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                        <circle className="stroke-slate-100" cx="18" cy="18" fill="none" r="16" strokeWidth="3" />
                        <circle className="stroke-indigo-600" cx="18" cy="18" fill="none" r="16" strokeDasharray="100" strokeDashoffset="35" strokeWidth="3" />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-xs font-bold text-slate-800">65%</span>
                      </div>
                    </div>
                    <div>
                      <p className="text-xs font-bold text-indigo-600">$1.2M USD</p>
                      <p className="text-[9px] text-slate-400 font-semibold mt-0.5">Depreciation: Linear</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Sub-system lists */}
              <div className="bg-white border border-slate-100 p-5 rounded-2xl shadow-sm text-left">
                <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-4">Sub-System Status</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-100/50">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-sm" />
                      <span className="text-xs font-bold text-slate-700">Power Distribution Unit</span>
                    </div>
                    <span className="text-[9px] font-bold text-emerald-600 uppercase">Nominal</span>
                  </div>
                  <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-100/50">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-sm" />
                      <span className="text-xs font-bold text-slate-700">Environmental Controls</span>
                    </div>
                    <span className="text-[9px] font-bold text-emerald-600 uppercase">Nominal</span>
                  </div>
                  <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-100/50">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-amber-500 shadow-sm" />
                      <span className="text-xs font-bold text-slate-700">Auxiliary Data Bus</span>
                    </div>
                    <span className="text-[9px] font-bold text-amber-600 uppercase">Service Req.</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Pane: Logs & timeline */}
            <div className="lg:col-span-7 flex flex-col gap-6">
              
              {/* Heatmap Grid */}
              <div className="bg-white border border-slate-100 p-6 rounded-2xl shadow-sm text-left">
                <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
                  <div>
                    <h2 className="text-sm font-bold text-slate-900">Asset Activity Log</h2>
                    <p className="text-[10px] text-slate-400 font-semibold mt-0.5">Visualization of telemetry scans over 12 months</p>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Less</span>
                    <div className="w-2.5 h-2.5 bg-slate-100 rounded-xs" />
                    <div className="w-2.5 h-2.5 bg-indigo-100 rounded-xs" />
                    <div className="w-2.5 h-2.5 bg-indigo-300 rounded-xs" />
                    <div className="w-2.5 h-2.5 bg-indigo-500 rounded-xs" />
                    <div className="w-2.5 h-2.5 bg-indigo-700 rounded-xs" />
                    <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">More</span>
                  </div>
                </div>

                <div className="overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-slate-200">
                  <div className="grid grid-flow-col grid-rows-7 gap-1 min-w-max">
                    {activityTiles.map((tile) => (
                      <div 
                        key={tile.id} 
                        className={`w-2.5 h-2.5 rounded-xs transition-all duration-200 hover:scale-120 ${tile.className}`} 
                      />
                    ))}
                  </div>
                </div>
                
                <div className="flex justify-between mt-2 text-[9px] font-mono font-bold text-slate-400">
                  {['JAN', 'MAR', 'MAY', 'JUL', 'SEP', 'NOV'].map(m => <span key={m}>{m}</span>)}
                </div>
              </div>

              {/* Event Timeline logs */}
              <div className="bg-white border border-slate-100 p-6 rounded-2xl shadow-sm flex-1 flex flex-col justify-between text-left">
                <div className="mb-6">
                  <h3 className="text-sm font-bold text-slate-900">Lifecycle Events</h3>
                  <p className="text-[10px] text-slate-400 font-semibold mt-0.5">Historical telemetry anomalies and service intervals</p>
                </div>

                <div className="flex-1 space-y-6 relative border-l border-slate-100 pl-6 ml-3">
                  
                  {/* Event 1 */}
                  <div className="relative">
                    <div className="absolute -left-[35px] top-0 w-6 h-6 rounded-full border border-slate-200 bg-white flex items-center justify-center z-10 shadow-sm">
                      <span className="material-symbols-outlined text-[12px] text-slate-600 font-bold">build</span>
                    </div>
                    <div className="flex justify-between items-start mb-2 flex-wrap gap-2">
                      <div>
                        <h4 className="font-bold text-slate-800 text-xs">Scheduled Maintenance: Q3 Calibration</h4>
                        <p className="text-[10px] text-slate-400 font-semibold font-mono mt-0.5">Oct 12, 2023 • Service Order #7721</p>
                      </div>
                      <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 text-[9px] font-bold border border-emerald-100 uppercase">
                        Completed
                      </span>
                    </div>
                    <div className="bg-slate-50 border border-slate-100 p-3.5 rounded-xl border-l-4 border-l-emerald-500">
                      <p className="text-xs text-slate-500 leading-relaxed font-medium">
                        Precision realignment of optical sensors and thermal buffer flushing. No significant wear detected in core components.
                      </p>
                      <div className="mt-3.5 flex gap-4 text-[9px] font-mono font-bold text-slate-400">
                        <span className="flex items-center gap-0.5"><span className="material-symbols-outlined text-xs">person</span> J. Rodriguez</span>
                        <span className="flex items-center gap-0.5"><span className="material-symbols-outlined text-xs">timer</span> 4.5h Duration</span>
                      </div>
                    </div>
                  </div>

                  {/* Event 2 */}
                  <div className="relative">
                    <div className="absolute -left-[35px] top-0 w-6 h-6 rounded-full border border-slate-200 bg-white flex items-center justify-center z-10 shadow-sm">
                      <span className="material-symbols-outlined text-[12px] text-slate-600">swap_horiz</span>
                    </div>
                    <div className="flex justify-between items-start mb-2 flex-wrap gap-2">
                      <div>
                        <h4 className="font-bold text-slate-800 text-xs">Asset Allocation Update</h4>
                        <p className="text-[10px] text-slate-400 font-semibold font-mono mt-0.5">Aug 05, 2023 • Request ID: REQ-091</p>
                      </div>
                      <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-500 text-[9px] font-bold uppercase">
                        System
                      </span>
                    </div>
                    <div className="bg-slate-50 border border-slate-100 p-3.5 rounded-xl">
                      <p className="text-xs text-slate-500 leading-relaxed font-medium">
                        Transferred from <span className="text-indigo-600 font-bold">Backup-Cluster B</span> to <span className="text-indigo-600 font-bold">Production Alpha</span> to meet surging computational demands.
                      </p>
                    </div>
                  </div>

                  {/* Event 3 */}
                  <div className="relative">
                    <div className="absolute -left-[35px] top-0 w-6 h-6 rounded-full border border-red-200 bg-white flex items-center justify-center z-10 shadow-sm">
                      <span className="material-symbols-outlined text-[12px] text-red-500 font-bold">warning</span>
                    </div>
                    <div className="flex justify-between items-start mb-2 flex-wrap gap-2">
                      <div>
                        <h4 className="font-bold text-slate-800 text-xs">Critical Temperature Spike</h4>
                        <p className="text-[10px] text-slate-400 font-semibold font-mono mt-0.5">June 21, 2023 • Event ID: ERR-104</p>
                      </div>
                      <span className="px-2 py-0.5 rounded bg-red-50 text-red-700 text-[9px] font-bold border border-red-100 uppercase">
                        Critical
                      </span>
                    </div>
                    <div className="bg-slate-50 border border-slate-100 p-3.5 rounded-xl border-l-4 border-l-red-500">
                      <p className="text-xs text-slate-500 leading-relaxed font-medium">
                        Core temperature reached 55°C. Automated cooling override engaged. System throttled to 50% capacity for 12 minutes.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>

        </div>
      </main>

      {/* Floating AI assistant prompt */}
      <div className="fixed bottom-6 right-6 z-50 w-80 md:w-96">
        <form 
          onSubmit={handleAiSend}
          onFocus={() => setIsAiGlow(true)}
          onBlur={() => setIsAiGlow(false)}
          className="bg-white border border-slate-200 p-2 rounded-2xl flex items-center gap-3 shadow-2xl transition-all duration-300"
        >
          <div 
            className={`w-9 h-9 rounded-xl bg-black text-white flex items-center justify-center flex-shrink-0 transition-transform ${isAiGlow ? 'scale-105' : ''}`}
          >
            <span className="material-symbols-outlined text-base">smart_toy</span>
          </div>
          <input 
            type="text"
            placeholder="Ask Lumina AI about this asset..."
            value={aiText}
            onChange={e => setAiText(e.target.value)}
            className="bg-transparent border-none outline-none focus:ring-0 text-xs text-slate-800 placeholder-slate-400 flex-1 px-1 py-1"
          />
          <button 
            type="submit"
            className="p-1.5 hover:bg-slate-50 text-slate-600 rounded-xl cursor-pointer"
          >
            <span className="material-symbols-outlined text-base">send</span>
          </button>
        </form>
      </div>
    </div>
  );
}
