import React, { useState } from 'react';
import toast from 'react-hot-toast';
import Sidebar from '../../components/Sidebar';
import Header from '../../components/Header';

export default function Reports() {
  const [trendsRange, setTrendsRange] = useState('Last 6 Months');

  const handleExport = () => {
    toast.success('Compiling operational ledger... Comprehensive report download started!');
  };

  const departmentUptime = [
    { name: 'ENG', pct: 45, height: 'h-[45%]' },
    { name: 'IT', pct: 82, height: 'h-[82%]' },
    { name: 'OPS', pct: 68, height: 'h-[68%]' },
    { name: 'LOG', pct: 40, height: 'h-[40%]' },
    { name: 'LEG', pct: 22, height: 'h-[22%]' },
    { name: 'RES', pct: 75, height: 'h-[75%]' },
  ];

  const mostUsed = [
    { name: 'Conference Room B2', desc: 'Facilities • Building A', count: '34 bookings', icon: 'meeting_room' },
    { name: 'Delivery Van AF-343', desc: 'Logistics • Fleet', count: '21 trips', icon: 'airport_shuttle' },
    { name: 'Projector AF-335', desc: 'IT Hardware • Shared', count: '18 uses', icon: 'cast' },
  ];

  const idleAssets = [
    { name: 'Professional Camera AF-0301', desc: 'Media • Dept Inventory', alert: 'unused 60+ days', color: 'text-red-655', icon: 'photo_camera' },
    { name: 'Office Chair AF-0410', desc: 'Admin • Furniture', alert: 'unused 45 days', color: 'text-slate-500', icon: 'chair' },
    { name: 'Tablet Pro AF-0992', desc: 'IT Hardware • Reserve', alert: 'unused 32 days', color: 'text-slate-500', icon: 'tablet_mac' },
  ];

  const pipelineItems = [
    { tag: 'HIGH PRIORITY', title: 'Forklift AF-0087', desc: 'Hydraulic System Check', badge: 'due in 5 days', color: 'border-red-600 bg-red-50/20 text-red-700', icon: 'warning' },
    { tag: 'SCHEDULED', title: 'Industrial Mixer M-9', desc: 'Motor Torque Inspection', badge: 'in 12 days', color: 'border-[#00352d] bg-[#b3eee0]/20 text-[#00352d]', icon: 'build' },
    { tag: 'REPLACEMENT', title: 'Enterprise Laptop AF-0020', desc: '4 years old lifecycle end', badge: 'nearing retirement', color: 'border-slate-400 bg-slate-100/50 text-slate-600', icon: 'history' },
    { tag: 'COMPLIANCE', title: 'Server Stack S-02', desc: 'Support contract renewal', badge: 'expires Oct 2024', color: 'border-[#bfc9c5] bg-[#f4f4f1]/60 text-[#404946]', icon: 'verified_user' },
  ];

  return (
    <div className="flex min-h-screen bg-[#F9F9F7] font-sans antialiased text-[#1a1c1b]">
      <Sidebar />

      <main className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
        
        {/* Reusable Header */}
        <Header showSearch={false} title="Reports & Analytics" />

        {/* Scrollable Container */}
        <div className="flex-1 overflow-y-auto p-8 text-left pb-24 scrollbar-thin scrollbar-thumb-slate-200">
          <div className="max-w-[1080px] mx-auto space-y-6">
            
            {/* Page Header Row */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-4 border-b border-slate-200/50">
              <div>
                <h1 className="text-xl font-black text-[#00352d] tracking-tight">Reports & Analytics</h1>
                <p className="text-xs text-[#404946]/70 font-semibold mt-1">Real-time operational efficiency metrics and department utilization reports.</p>
              </div>
              <button 
                onClick={handleExport}
                className="bg-[#00352d] hover:bg-[#0d4d43] text-white px-5 py-2.5 rounded-xl text-xs font-bold transition-all active:scale-95 flex items-center gap-1.5 cursor-pointer shadow-sm"
              >
                <span className="material-symbols-outlined text-base">download</span>
                Export Comprehensive Report
              </button>
            </div>
            
            {/* Top Row: Visualization Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              
              {/* Utilization by Department */}
              <div className="bg-white border border-[#bfc9c5]/40 rounded-2xl p-6 shadow-xs space-y-6 group hover:border-[#00352d]/25 transition-all">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-sm font-black text-slate-800 uppercase tracking-wider">Utilization by Department</h3>
                    <p className="text-[10px] text-slate-400 font-semibold mt-0.5">Asset uptime per business unit</p>
                  </div>
                  <div className="flex gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#00352d]"></span>
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-350"></span>
                  </div>
                </div>

                {/* Graph bars */}
                <div className="h-56 flex items-end justify-between gap-4 bg-[#f4f4f1]/40 border border-[#bfc9c5]/25 rounded-2xl p-6 relative">
                  {/* Grid lines */}
                  <div className="absolute left-0 right-0 top-1/4 border-t border-[#bfc9c5]/20 border-dashed" />
                  <div className="absolute left-0 right-0 top-2/4 border-t border-[#bfc9c5]/20 border-dashed" />
                  <div className="absolute left-0 right-0 top-3/4 border-t border-[#bfc9c5]/20 border-dashed" />

                  {departmentUptime.map(bar => (
                    <div key={bar.name} className="flex flex-col items-center gap-2 flex-1 group/bar relative z-10">
                      <div className={`w-full bg-[#00352d]/10 border border-[#00352d]/15 rounded-xl ${bar.height} relative transition-all group-hover/bar:bg-[#00352d]/20 flex items-end h-36 overflow-hidden`}>
                        <div className="w-full bg-[#0d4d43] h-full transition-transform" />
                        <span className="absolute -top-5 left-1/2 -translate-x-1/2 text-[9px] font-bold text-[#00352d] opacity-0 group-hover/bar:opacity-100 transition-opacity">
                          {bar.pct}%
                        </span>
                      </div>
                      <span className="font-mono text-[9px] font-black text-slate-400 uppercase">{bar.name}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Maintenance Trends */}
              <div className="bg-white border border-[#bfc9c5]/40 rounded-2xl p-6 shadow-xs space-y-6 group hover:border-[#00352d]/25 transition-all">
                <div className="flex justify-between items-start flex-wrap gap-4">
                  <div>
                    <h3 className="text-sm font-black text-slate-800 uppercase tracking-wider">Maintenance Trends</h3>
                    <p className="text-[10px] text-slate-400 font-semibold mt-0.5">Monthly service request frequency</p>
                  </div>
                  <select 
                    value={trendsRange}
                    onChange={e => setTrendsRange(e.target.value)}
                    className="border border-[#bfc9c5]/45 bg-white rounded-xl px-3 py-1.5 text-[10px] font-bold text-slate-650 cursor-pointer focus:outline-none"
                  >
                    <option>Last 6 Months</option>
                    <option>Year to Date</option>
                  </select>
                </div>

                <div className="h-56 relative bg-[#f4f4f1]/40 border border-[#bfc9c5]/25 rounded-2xl p-6 overflow-hidden flex flex-col justify-between">
                  <div className="flex-1 relative mt-1 min-h-[120px]">
                    <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 40">
                      <path d="M 0 35 L 20 20 L 40 28 L 60 10 L 80 18 L 100 5" fill="none" stroke="#00352d" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5"></path>
                      <path d="M 0 35 L 20 20 L 40 28 L 60 10 L 80 18 L 100 5 V 40 H 0 Z" fill="url(#gradient-teal)" opacity="0.12"></path>
                      <defs>
                        <linearGradient id="gradient-teal" x1="0" x2="0" y1="0" y2="1">
                          <stop offset="0%" stopColor="#00352d"></stop>
                          <stop offset="100%" stopColor="#ffffff" stopOpacity="0"></stop>
                        </linearGradient>
                      </defs>
                    </svg>
                  </div>
                  <div className="flex justify-between mt-2 font-mono text-[9px] font-black text-slate-400">
                    <span>JAN</span>
                    <span>FEB</span>
                    <span>MAR</span>
                    <span>APR</span>
                    <span>MAY</span>
                    <span>JUN</span>
                  </div>
                </div>
              </div>

            </div>

            {/* Middle Row: Usage Lists */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              
              {/* Most Used Assets */}
              <div className="bg-white border border-[#bfc9c5]/40 rounded-2xl p-6 shadow-xs space-y-4">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 rounded-xl bg-[#b3eee0]/40 flex items-center justify-center text-[#00352d]">
                    <span className="material-symbols-outlined text-base" style={{ fontVariationSettings: "'FILL' 1" }}>trending_up</span>
                  </div>
                  <h3 className="text-xs font-black uppercase text-[#00352d] tracking-wider">Most Used Assets</h3>
                </div>

                <ul className="divide-y divide-[#eeeeec]/60">
                  {mostUsed.map((item, idx) => (
                    <li key={idx} className="py-3.5 flex justify-between items-center group/item hover:bg-[#f4f4f1]/30 rounded-xl px-2 transition-colors">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-[#f4f4f1] border border-slate-200/50 flex items-center justify-center flex-shrink-0">
                          <span className="material-symbols-outlined text-slate-500 text-base">{item.icon}</span>
                        </div>
                        <div>
                          <p className="text-xs font-bold text-slate-800">{item.name}</p>
                          <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wider mt-0.5">{item.desc}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-[#00352d] text-xs font-black">{item.count}</p>
                        <p className="text-[9px] text-slate-400 font-semibold mt-0.5">this month</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Idle Assets */}
              <div className="bg-white border border-[#bfc9c5]/40 rounded-2xl p-6 shadow-xs space-y-4">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 rounded-xl bg-slate-100 flex items-center justify-center text-slate-500">
                    <span className="material-symbols-outlined text-base" style={{ fontVariationSettings: "'FILL' 1" }}>timer_off</span>
                  </div>
                  <h3 className="text-xs font-black uppercase text-slate-800 tracking-wider">Idle Assets</h3>
                </div>

                <ul className="divide-y divide-[#eeeeec]/60">
                  {idleAssets.map((item, idx) => (
                    <li key={idx} className="py-3.5 flex justify-between items-center group/item hover:bg-[#f4f4f1]/30 rounded-xl px-2 transition-colors">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-[#f4f4f1] border border-slate-200/50 flex items-center justify-center flex-shrink-0">
                          <span className="material-symbols-outlined text-slate-500 text-base">{item.icon}</span>
                        </div>
                        <div>
                          <p className="text-xs font-bold text-slate-800">{item.name}</p>
                          <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wider mt-0.5">{item.desc}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-red-600 text-xs font-black">{item.alert}</p>
                        <p className="text-[9px] text-slate-400 font-semibold mt-0.5">Inventory alert</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

            </div>

            {/* Bottom Section: Pipeline */}
            <div className="bg-white border border-[#bfc9c5]/40 rounded-2xl p-6 shadow-xs relative overflow-hidden text-left">
              <div className="flex justify-between items-end mb-6">
                <div>
                  <span className="text-[9px] font-black tracking-wider bg-[#00352d] text-white px-2 py-0.5 rounded-full mb-2 inline-block">CRITICAL FOCUS</span>
                  <h3 className="text-sm font-black text-slate-850 uppercase tracking-wider">Maintenance / Retirement Pipeline</h3>
                  <p className="text-[10px] text-slate-400 font-semibold mt-0.5">Predicted service requirements for Q3 2024</p>
                </div>
                <div className="flex items-center gap-1.5 text-slate-400 text-[10px] font-bold">
                  <span className="material-symbols-outlined text-sm">schedule</span>
                  Updated 2 mins ago
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {pipelineItems.map((item, idx) => (
                  <div key={idx} className={`p-4 border-l-4 rounded-r-xl ${item.color} flex flex-col justify-between min-h-[140px] border border-y-slate-100 border-r-slate-100 shadow-2xs`}>
                    <div>
                      <div className="flex items-center gap-1.5 mb-2">
                        <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>{item.icon}</span>
                        <span className="text-[8px] font-extrabold uppercase tracking-wider">{item.tag}</span>
                      </div>
                      <p className="text-xs font-bold text-slate-850">{item.title}</p>
                      <p className="text-[10px] text-slate-450 mt-1 leading-normal font-semibold">{item.desc}</p>
                    </div>

                    <div className="flex justify-between items-center mt-4">
                      <span className="text-[9px] font-black px-2 py-1 bg-white rounded border border-[#bfc9c5]/35 uppercase tracking-wide">
                        {item.badge}
                      </span>
                      <span 
                        onClick={() => toast.success(`Viewing pipeline routing details for ${item.title}...`)}
                        className="material-symbols-outlined text-slate-400 hover:text-[#00352d] cursor-pointer text-base"
                      >
                        arrow_forward
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </main>

    </div>
  );
}
