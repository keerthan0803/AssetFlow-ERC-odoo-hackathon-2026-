import React, { useState } from 'react';
import toast from 'react-hot-toast';
import Sidebar from '../../components/Sidebar';
import Header from '../../components/Header';

export default function Audit() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('All');
  const [isCycleClosed, setIsCycleClosed] = useState(false);

  const initialAssets = [
    { tag: 'AF-003', name: 'AF-003 Dell laptop', serial: 'S/N: 928374-E', location: 'Desk E12', status: 'Verified', color: 'bg-[#b3eee0] text-[#00201b] border-[#00201b]/10', icon: 'check_circle' },
    { tag: 'AF-9921', name: 'AF-9921 Office chair', serial: 'S/N: 110293-C', location: 'Desk E14', status: 'Missing', color: 'bg-[#ffdad6] text-[#93000a] border-[#ba1a1a]/20', icon: 'error' },
    { tag: 'AF-9838', name: 'AF-9838 Monitor', serial: 'S/N: 883721-M', location: 'Desk E15', status: 'Damaged', color: 'bg-[#dbe1e0] text-[#5d6463] border-[#bfc9c5]/50', icon: 'warning' },
  ];

  const handleCloseCycle = () => {
    setIsCycleClosed(true);
    toast.success('Q3 Engineering Audit Cycle finalized and archived successfully.');
  };

  const filteredAssets = initialAssets.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.tag.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterType === 'All' || item.status === filterType;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="flex min-h-screen bg-[#F9F9F7] font-sans antialiased text-[#1a1c1b]">
      <Sidebar />

      <main className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
        
        {/* Reusable Header */}
        <Header showSearch={true} searchQuery={searchQuery} setSearchQuery={setSearchQuery} placeholder="Search audit logs, assets..." />

        {/* Scrollable Container */}
        <div className="flex-1 overflow-y-auto p-8 text-left pb-24 scrollbar-thin scrollbar-thumb-slate-200">
          <div className="max-w-[1080px] mx-auto space-y-6">
            
            {/* Page Header */}
            <div>
              <nav className="flex items-center gap-1.5 text-xs text-[#404946] mb-2 font-semibold">
                <span>Governance</span>
                <span className="material-symbols-outlined text-[12px]">chevron_right</span>
                <span className="text-[#00352d] font-bold">Audit & Compliance</span>
              </nav>
              <h1 className="text-2xl font-black text-[#00352d] tracking-tight">Audit & Compliance</h1>
              <p className="text-xs text-[#404946]/70 font-semibold mt-1">Real-time governance overview and high-value asset validation.</p>
            </div>

            {/* Audit Cycle Info Box */}
            <div className="bg-white border border-[#bfc9c5]/40 rounded-2xl p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 transition-all hover:border-[#00352d]/25 shadow-xs">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="material-symbols-outlined text-[#00352d] text-base" style={{ fontVariationSettings: "'FILL' 1" }}>calendar_today</span>
                  <span className="text-[10px] font-black uppercase text-[#00352d] tracking-wider">Active Cycle</span>
                </div>
                <h2 className="text-sm font-black text-slate-800">Q3 audit: Engineering dept - 1-15 jul</h2>
                <p className="text-[11px] text-slate-400 font-semibold mt-1 flex items-center gap-1">
                  <span className="material-symbols-outlined text-sm">groups</span>
                  Auditors: A. Rao, S. Iqbal
                </p>
              </div>

              <div className="flex flex-col items-start md:items-end w-full md:w-auto">
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-1.5">Cycle Completion</span>
                <div className="w-full md:w-48 h-2 bg-[#f4f4f1] rounded-full overflow-hidden border border-slate-200/50">
                  <div className="w-2/3 h-full bg-[#00352d] rounded-full"></div>
                </div>
                <span className="text-[10px] font-extrabold text-[#00352d] mt-2">68% Verified</span>
              </div>
            </div>

            {/* Asset Verification Table Container */}
            <div className="bg-white rounded-2xl border border-[#bfc9c5]/40 overflow-hidden shadow-xs">
              <div className="px-6 py-4.5 border-b border-[#eeeeec] flex justify-between items-center flex-wrap gap-4 bg-slate-50/20">
                <h3 className="text-xs font-black uppercase text-[#00352d] tracking-wider">Asset Verification List</h3>
                <div className="flex gap-2">
                  {['All', 'Verified', 'Missing', 'Damaged'].map(type => (
                    <button 
                      key={type}
                      onClick={() => setFilterType(type)}
                      className={`px-3 py-1.5 rounded-lg text-[10px] font-extrabold uppercase tracking-wider transition-all cursor-pointer border ${
                        filterType === type 
                          ? 'bg-[#00352d] border-[#00352d] text-white' 
                          : 'bg-white border-[#bfc9c5]/50 text-slate-650 hover:bg-slate-50'
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50/20 text-[10px] font-bold uppercase text-[#404946] tracking-wider border-b border-[#eeeeec]">
                      <th className="px-6 py-3.5">Asset</th>
                      <th className="px-6 py-3.5">Expected location</th>
                      <th className="px-6 py-3.5">Verification</th>
                      <th className="px-6 py-3.5 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#eeeeec]/60">
                    {filteredAssets.length === 0 ? (
                      <tr>
                        <td colSpan="4" className="px-6 py-10 text-center text-xs text-slate-400 font-semibold">
                          No matching assets in this audit run.
                        </td>
                      </tr>
                    ) : (
                      filteredAssets.map(item => (
                        <tr key={item.tag} className="hover:bg-slate-50 transition-colors group">
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-xl bg-[#f4f4f1] border border-slate-200/50 flex items-center justify-center flex-shrink-0">
                                <span className="material-symbols-outlined text-slate-500 text-base">
                                  {item.tag.includes('chair') ? 'chair_alt' : item.tag.includes('Monitor') || item.name.includes('Monitor') ? 'monitor' : 'laptop_mac'}
                                </span>
                              </div>
                              <div>
                                <div className="text-xs font-bold text-slate-800">{item.name}</div>
                                <div className="text-[10px] font-mono text-slate-400 font-bold mt-0.5">{item.serial}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-xs font-semibold text-slate-500">{item.location}</td>
                          <td className="px-6 py-4">
                            <span className={`inline-flex items-center px-3 py-1 rounded-full text-[10px] font-bold border ${item.color}`}>
                              <span className="material-symbols-outlined text-xs mr-1" style={{ fontVariationSettings: "'FILL' 1" }}>{item.icon}</span>
                              {item.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-right">
                            <button 
                              onClick={() => toast.success(`Viewing logs details for ${item.tag}`)}
                              className="p-1.5 text-slate-450 hover:text-[#00352d] rounded-lg transition-colors cursor-pointer"
                            >
                              <span className="material-symbols-outlined text-base">more_vert</span>
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Automated Reporting Alert */}
            <div className="bg-[#b3eee0]/10 border border-[#00352d]/10 rounded-2xl p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-[#b3eee0]/40 rounded-xl text-[#0d4d43] flex-shrink-0">
                  <span className="material-symbols-outlined text-base" style={{ fontVariationSettings: "'FILL' 1" }}>insights</span>
                </div>
                <div>
                  <h4 className="text-xs font-bold text-[#00201b]">Automated Reporting Alert</h4>
                  <p className="text-[11px] text-[#404946]/85 font-semibold mt-1">2 assets flagged - discrepancy report generated automatically. This report has been queued for review by the finance department.</p>
                </div>
              </div>
              <button 
                onClick={() => toast.success('Displaying discrepancies compliance layout review…')}
                className="text-xs font-bold text-[#00352d] hover:underline cursor-pointer flex-shrink-0"
              >
                View Report
              </button>
            </div>

            {/* Split row: Complete action & reference sketch */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
              
              {/* Left action card */}
              <div className="lg:col-span-8 bg-white border border-[#bfc9c5]/40 rounded-2xl p-8 flex flex-col justify-center items-center text-center shadow-xs">
                <div className="w-14 h-14 bg-[#f4f4f1] rounded-full flex items-center justify-center mb-5 text-[#00352d] border border-slate-200/50">
                  <span className="material-symbols-outlined text-2xl">task_alt</span>
                </div>
                <h3 className="text-sm font-black text-slate-800 uppercase tracking-wider mb-2">Complete Audit Session</h3>
                <p className="text-xs text-slate-400 font-semibold max-w-md leading-relaxed mb-6">
                  Ready to finalize the Q3 Engineering cycle? This will lock all current verification statuses and send final notifications to stakeholders.
                </p>
                <button 
                  onClick={handleCloseCycle}
                  disabled={isCycleClosed}
                  className={`w-full max-w-xs py-3.5 rounded-xl text-xs font-bold transition-all active:scale-95 shadow-sm cursor-pointer ${
                    isCycleClosed 
                      ? 'bg-[#b3eee0] border border-[#00352d]/15 text-[#00201b]' 
                      : 'bg-[#00352d] hover:bg-[#0d4d43] text-white hover:shadow-md'
                  }`}
                >
                  {isCycleClosed ? 'Audit Session Closed' : 'Close audit cycle'}
                </button>
              </div>

              {/* Right sketch card */}
              <div className="lg:col-span-4 bg-white border border-[#bfc9c5]/40 rounded-2xl p-4 flex flex-col justify-between shadow-xs">
                <div>
                  <div className="mb-3.5 flex justify-between items-center">
                    <span className="text-[9px] font-black text-slate-400 uppercase tracking-wider">Audit Reference Sketch</span>
                    <span className="material-symbols-outlined text-slate-400 text-sm">image</span>
                  </div>
                  <img 
                    alt="Audit Reference Layout" 
                    className="w-full h-36 object-cover rounded-xl filter grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition-all duration-500 border border-slate-100" 
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuBsWcSq-Kar6cckwflIb8_1XSJzwIId3IVtjdRIWNGSusBBodJCLBxJPNHFqEHnb7zrqBrd_5jwYgQCrtZ6e2K1Akf_HFD11Ccm5kpTxIeOhWQDwoA-lF4rK2l4i6T6ETgB4E7XjKjggsz3Qn7Y2_Hugz41xdN02qU0MYTcHY266vVpO7uBYO5JmofcYUA6BQHl7mAICsqg6TBDowvpQH9peTfsieQVWCpzMCt2LW9Z1cB6IawAVRWNlYZJTZ66LmGCVQ"
                  />
                </div>
                <p className="mt-3.5 text-[9px] text-slate-450 leading-relaxed font-semibold italic text-left">
                  Reference internal layout protocol for regional compliance audits.
                </p>
              </div>

            </div>

          </div>
        </div>
      </main>

    </div>
  );
}
