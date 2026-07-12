import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import Sidebar from '../../components/Sidebar';

export default function Audit() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeQueueTab, setActiveQueueTab] = useState('Pending');
  const [isScanning, setIsScanning] = useState(false);
  const [activeStep, setActiveStep] = useState(1);
  const [aiActive, setAiActive] = useState(false);

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

  const handleStartScanner = () => {
    setIsScanning(true);
    toast.loading('Starting proximity sensor scan…', { id: 'scan' });
    setTimeout(() => {
      setIsScanning(false);
      setActiveStep(2);
      toast.success('Proximity check complete: Quantum Server R-1 detected!', { id: 'scan', duration: 4000 });
    }, 1800);
  };

  const handleStepSubmit = () => {
    if (activeStep === 2) {
      setActiveStep(3);
      toast.success('Functional parameters logged successfully.');
    } else if (activeStep === 3) {
      setActiveStep(1);
      toast.success('Audit compliance pack submitted to manager review.');
    }
  };

  // Mock queue items
  const queueItems = [
    { id: '#AX-2093', name: 'Quantum Server R-1', location: 'London DC-01', value: '$1.2M', status: 'In Progress', statusColor: 'text-tertiary', statusDot: 'bg-tertiary', category: 'dns', tab: 'Pending' },
    { id: '#AX-5512', name: 'Backup Power Gen 04', location: 'Frankfurt Hub', value: '$450K', status: 'Queued', statusColor: 'text-outline', statusDot: 'bg-outline', category: 'bolt', tab: 'Pending' },
    { id: '#AX-0081', name: 'Edge Node Cluster B', location: 'Tokyo North', value: '$892K', status: 'Discrepancy', statusColor: 'text-error animate-pulse', statusDot: 'bg-error', category: 'router', tab: 'Pending' },
    { id: '#AX-3301', name: 'Storage Array S-4', location: 'NYC East', value: '$2.1M', status: 'Queued', statusColor: 'text-outline', statusDot: 'bg-outline', category: 'storage', tab: 'Pending' },
    { id: '#AX-7892', name: 'Cooling Unit C1', location: 'Tokyo North', value: '$120K', status: 'Approved', statusColor: 'text-green-400', statusDot: 'bg-green-400', category: 'ac_unit', tab: 'Completed' },
    { id: '#AX-8890', name: 'Main Power Grid P3', location: 'London DC-01', value: '$4.2M', status: 'Approved', statusColor: 'text-green-400', statusDot: 'bg-green-400', category: 'bolt', tab: 'Completed' }
  ];

  const filteredItems = queueItems.filter(item => 
    item.tab === activeQueueTab &&
    (item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
     item.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
     item.location.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div 
      className="bg-background text-on-surface font-body-lg min-h-screen selection:bg-primary/30 w-full flex h-screen overflow-hidden"
      style={{ backgroundColor: '#11131b', color: '#e1e2ed', fontFamily: "'Inter', sans-serif" }}
    >
      <style>{`
        .glass-panel {
          backdrop-filter: blur(12px);
          background: rgba(29, 31, 39, 0.7);
          border: 1px solid rgba(255, 255, 255, 0.05);
        }
        .glass-panel-heavy {
          backdrop-filter: blur(20px);
          background: rgba(25, 27, 35, 0.9);
          border: 1px solid rgba(255, 255, 255, 0.08);
        }
        .primary-glow {
          box-shadow: 0 0 20px 2px rgba(37, 99, 235, 0.15);
        }
        .no-scroll::-webkit-scrollbar {
          display: none;
        }
      `}</style>

      <Sidebar />

      {/* Main Content Shell */}
      <main className="min-h-screen flex flex-col flex-1 w-full overflow-y-auto">
        {/* Canvas Area */}
        <div className="p-6 max-w-full mx-auto w-full space-y-6 text-left pb-24">
        {/* Page Header */}
          <div className="flex justify-between items-end border-b border-white/5 pb-4 flex-wrap gap-4">
            <div>
              <h2 className="text-2xl font-bold text-on-surface tracking-tight">Audit &amp; Compliance</h2>
              <p className="text-on-surface-variant text-xs mt-1" style={{ color: '#c3c6d7' }}>Real-time governance overview and high-value asset validation workflow.</p>
            </div>
            
            <div className="flex gap-3">
              <button onClick={() => toast.success('Exporting compliance reports…')} className="flex items-center gap-1.5 px-4 py-2.5 bg-surface-container-high border border-white/10 rounded-lg text-xs font-semibold hover:bg-surface-container-highest transition-all active:scale-95 cursor-pointer">
                <span className="material-symbols-outlined text-base">file_download</span>
                Report
              </button>
              <button onClick={() => toast.success('Scheduling new audit loop…')} className="flex items-center gap-1.5 px-4 py-2.5 bg-primary-container text-on-primary-container rounded-lg font-bold hover:brightness-110 transition-all active:scale-95 primary-glow text-xs cursor-pointer" style={{ backgroundColor: '#2563eb', color: '#fff' }}>
                <span className="material-symbols-outlined text-base">add_circle</span>
                New Audit
              </button>
            </div>
          </div>

          {/* Audit Overview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Compliance score card */}
            <div className="glass-panel p-5 rounded-xl flex flex-col justify-between min-h-[140px]">
              <div>
                <p className="font-mono text-[9px] text-on-surface-variant tracking-[0.1em] uppercase mb-1.5" style={{ color: '#c3c6d7' }}>Compliance Score</p>
                <h3 className="text-4xl font-bold text-primary leading-none" style={{ color: '#b4c5ff' }}>98.4<span className="text-lg font-medium opacity-70">%</span></h3>
              </div>
              <div className="mt-4">
                <div className="flex justify-between text-[11px] font-semibold mb-2">
                  <span className="text-on-surface-variant" style={{ color: '#c3c6d7' }}>Annual Target</span>
                  <span className="text-green-400">99.5%</span>
                </div>
                <div className="w-full h-1.5 bg-surface-variant/30 rounded-full overflow-hidden">
                  <div className="w-[98.4%] h-full bg-primary rounded-full" style={{ backgroundColor: '#2563eb' }} />
                </div>
              </div>
            </div>

            {/* Total audits card */}
            <div className="glass-panel p-5 rounded-xl flex flex-col justify-between min-h-[140px]">
              <div>
                <p className="font-mono text-[9px] text-on-surface-variant tracking-[0.1em] uppercase mb-1.5" style={{ color: '#c3c6d7' }}>Total Audits</p>
                <h3 className="text-3xl font-bold text-on-surface">142</h3>
              </div>
              <div className="flex items-center gap-2 mt-4">
                <span className="px-2 py-0.5 bg-secondary/10 text-secondary text-[9px] font-bold rounded" style={{ backgroundColor: 'rgba(190,198,224,0.1)', color: '#bec6e0' }}>FY24 Q3</span>
                <span className="text-on-surface-variant text-[11px] font-medium" style={{ color: '#c3c6d7' }}>+12 new</span>
              </div>
            </div>

            {/* Pending card */}
            <div className="glass-panel p-5 rounded-xl flex flex-col justify-between min-h-[140px]">
              <div>
                <p className="font-mono text-[9px] text-on-surface-variant tracking-[0.1em] uppercase mb-1.5" style={{ color: '#c3c6d7' }}>Pending Verification</p>
                <h3 className="text-3xl font-bold text-on-surface">38</h3>
              </div>
              <div className="flex items-center gap-2 mt-4 flex-wrap">
                <div className="flex -space-x-2">
                  <div className="w-6 h-6 rounded-full bg-tertiary-container border-2 border-[#11131b] flex items-center justify-center text-[7px] font-bold" style={{ backgroundColor: '#606e84' }}>LDN</div>
                  <div className="w-6 h-6 rounded-full bg-primary-container border-2 border-[#11131b] flex items-center justify-center text-[7px] font-bold" style={{ backgroundColor: '#2563eb' }}>TKY</div>
                  <div className="w-6 h-6 rounded-full bg-secondary-container border-2 border-[#11131b] flex items-center justify-center text-[7px] font-bold" style={{ backgroundColor: '#3f465c' }}>+5</div>
                </div>
                <span className="text-on-surface-variant text-[11px] font-medium" style={{ color: '#c3c6d7' }}>Assets across 8 sites</span>
              </div>
            </div>

            {/* Discrepancy card */}
            <div className="glass-panel p-5 rounded-xl border-l-4 border-error/50 flex flex-col justify-between min-h-[140px]" style={{ borderLeftColor: 'rgba(255,180,171,0.5)' }}>
              <div>
                <p className="font-mono text-[9px] text-on-surface-variant tracking-[0.1em] uppercase mb-1.5" style={{ color: '#c3c6d7' }}>Active Discrepancies</p>
                <h3 className="text-3xl font-bold text-error" style={{ color: '#ffb4ab' }}>03</h3>
              </div>
              <div className="flex items-center gap-1.5 mt-4 text-error text-[11px] font-bold" style={{ color: '#ffb4ab' }}>
                <span className="material-symbols-outlined text-sm">warning</span>
                High Priority
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            
            {/* Left Box - Queue List */}
            <div className="col-span-12 lg:col-span-8 glass-panel rounded-xl overflow-hidden flex flex-col">
              <div className="px-6 py-4 border-b border-white/5 flex justify-between items-center bg-white/[0.02]">
                <h4 className="text-sm font-bold tracking-tight">Active Audit Queue</h4>
                <div className="flex gap-2">
                  <div className="flex bg-[#1d1f27] p-0.5 rounded-lg border border-white/5">
                    <button 
                      onClick={() => setActiveQueueTab('Pending')}
                      className={`px-3 py-1 text-xs font-bold rounded-md transition-all ${
                        activeQueueTab === 'Pending' ? 'bg-[#2563eb] text-white' : 'text-on-surface-variant'
                      }`}
                    >
                      Pending
                    </button>
                    <button 
                      onClick={() => setActiveQueueTab('Completed')}
                      className={`px-3 py-1 text-xs font-bold rounded-md transition-all ${
                        activeQueueTab === 'Completed' ? 'bg-[#2563eb] text-white' : 'text-on-surface-variant'
                      }`}
                    >
                      Completed
                    </button>
                  </div>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b border-white/5 bg-surface-container-low/30">
                      <th className="px-6 py-3.5 font-mono text-[9px] text-on-surface-variant uppercase tracking-wider" style={{ color: '#c3c6d7' }}>Asset ID &amp; Name</th>
                      <th className="px-6 py-3.5 font-mono text-[9px] text-on-surface-variant uppercase tracking-wider" style={{ color: '#c3c6d7' }}>Location</th>
                      <th className="px-6 py-3.5 font-mono text-[9px] text-on-surface-variant uppercase tracking-wider" style={{ color: '#c3c6d7' }}>Value</th>
                      <th className="px-6 py-3.5 font-mono text-[9px] text-on-surface-variant uppercase tracking-wider" style={{ color: '#c3c6d7' }}>Status</th>
                      <th className="px-6 py-3.5 font-mono text-[9px] text-on-surface-variant uppercase tracking-wider text-right" style={{ color: '#c3c6d7' }}>Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {filteredItems.length === 0 ? (
                      <tr>
                        <td colSpan="5" className="px-6 py-10 text-center text-xs text-on-surface-variant">
                          No audit items currently in queue.
                        </td>
                      </tr>
                    ) : (
                      filteredItems.map(item => (
                        <tr key={item.id} className="hover:bg-white/[0.03] transition-colors cursor-pointer group">
                          <td className="px-6 py-3.5">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded bg-primary/10 flex items-center justify-center" style={{ backgroundColor: 'rgba(180,197,255,0.1)' }}>
                                <span className="material-symbols-outlined text-primary text-lg" style={{ color: '#b4c5ff' }}>{item.category}</span>
                              </div>
                              <div className="text-left">
                                <p className="font-bold text-sm group-hover:text-primary transition-colors">{item.name}</p>
                                <p className="text-[10px] font-mono text-on-surface-variant mt-0.5" style={{ color: '#c3c6d7' }}>{item.id}</p>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-3.5 text-xs text-on-surface-variant" style={{ color: '#c3c6d7' }}>{item.location}</td>
                          <td className="px-6 py-3.5 text-xs font-mono text-on-surface">{item.value}</td>
                          <td className="px-6 py-3.5">
                            <span className={`flex items-center gap-1.5 text-[11px] font-bold ${item.statusColor}`}>
                              <span className={`w-1.5 h-1.5 rounded-full ${item.statusDot}`} />
                              {item.status}
                            </span>
                          </td>
                          <td className="px-6 py-3.5 text-right">
                            <button 
                              onClick={() => {
                                toast.success(`Selected ${item.name} for proximity verification.`);
                                setActiveStep(1);
                              }}
                              className="px-4 py-1.5 bg-[#2563eb] text-white rounded-md text-[10px] font-bold active:scale-95 transition-all hover:brightness-110 cursor-pointer"
                            >
                              VERIFY
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>

              <div className="p-4 bg-white/[0.01] border-t border-white/5 flex justify-center">
                <button onClick={() => toast.success('Loaded next 10 audit entries')} className="text-[10px] font-bold text-primary hover:underline uppercase tracking-widest" style={{ color: '#b4c5ff' }}>
                  Load More Audit Items
                </button>
              </div>
            </div>

            {/* Right Box - Steps and Assigned */}
            <div className="col-span-12 lg:col-span-4 space-y-6">
              
              {/* Proximity verification step flow */}
              <div className="glass-panel rounded-xl overflow-hidden text-left">
                <div className="px-6 py-4 border-b border-white/5 bg-white/[0.02]">
                  <h4 className="text-sm font-bold tracking-tight">Active Verification</h4>
                </div>
                
                <div className="p-6">
                  <div className="space-y-6">
                    
                    {/* Step 1 */}
                    <div className="flex gap-4">
                      <div className="flex flex-col items-center">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs ${
                          activeStep >= 1 ? 'bg-[#2563eb] text-white ring-4 ring-[#2563eb]/20' : 'bg-surface-container-highest text-on-surface-variant'
                        }`}>
                          1
                        </div>
                        <div className="w-[2px] h-14 bg-white/10 mt-2" />
                      </div>
                      
                      <div className="pt-1 flex-1">
                        <p className="font-bold text-xs">Scan QR / RFID Tag</p>
                        <p className="text-[10px] text-on-surface-variant mt-1 leading-relaxed" style={{ color: '#c3c6d7' }}>
                          Initiate proximity check and confirm physical asset presence via encrypted tag.
                        </p>
                        
                        {activeStep === 1 && (
                          <div 
                            onClick={handleStartScanner}
                            className="mt-3 p-4 rounded-lg bg-[#1d1f27] border border-[#2563eb]/30 flex items-center justify-center group cursor-pointer hover:border-[#2563eb] transition-all"
                          >
                            <div className="text-center">
                              <span className="material-symbols-outlined text-primary text-2xl mb-1.5 animate-pulse" style={{ color: '#b4c5ff' }}>qr_code_2</span>
                              <p className="text-[9px] font-bold text-primary uppercase" style={{ color: '#b4c5ff' }}>
                                {isScanning ? 'Scanning Proximity…' : 'Click to Start Scanner'}
                              </p>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Step 2 */}
                    <div className={`flex gap-4 ${activeStep < 2 ? 'opacity-40' : ''}`}>
                      <div className="flex flex-col items-center">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs ${
                          activeStep >= 2 ? 'bg-[#2563eb] text-white ring-4 ring-[#2563eb]/20' : 'bg-surface-container-highest text-on-surface-variant'
                        }`}>
                          2
                        </div>
                        <div className="w-[2px] h-14 bg-white/10 mt-2" />
                      </div>
                      
                      <div className="pt-1 flex-1">
                        <p className="font-bold text-xs">Document Condition</p>
                        <p className="text-[10px] text-on-surface-variant mt-1 leading-relaxed" style={{ color: '#c3c6d7' }}>
                          Capture high-res photos and log functional state parameters.
                        </p>
                        
                        {activeStep === 2 && (
                          <button 
                            onClick={handleStepSubmit}
                            className="w-full mt-3 py-1.5 text-[10px] bg-[#2563eb] text-white font-bold rounded-lg hover:brightness-110 transition-all cursor-pointer"
                          >
                            Confirm Condition Logged
                          </button>
                        )}
                      </div>
                    </div>

                    {/* Step 3 */}
                    <div className={`flex gap-4 ${activeStep < 3 ? 'opacity-40' : ''}`}>
                      <div className="flex flex-col items-center">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs ${
                          activeStep >= 3 ? 'bg-[#2563eb] text-white ring-4 ring-[#2563eb]/20' : 'bg-[#191b23]/30 text-on-surface-variant'
                        }`}>
                          3
                        </div>
                      </div>
                      
                      <div className="pt-1 flex-1">
                        <p className="font-bold text-xs">Submit for Review</p>
                        <p className="text-[10px] text-on-surface-variant mt-1 leading-relaxed" style={{ color: '#c3c6d7' }}>
                          Finalize validation packet for compliance manager signature.
                        </p>
                        
                        {activeStep === 3 && (
                          <button 
                            onClick={handleStepSubmit}
                            className="w-full mt-3 py-1.5 text-[10px] bg-primary text-on-primary-fixed font-bold rounded-lg hover:opacity-90 transition-all cursor-pointer"
                            style={{ backgroundColor: '#b4c5ff', color: '#00174b' }}
                          >
                            Submit Packet
                          </button>
                        )}
                      </div>
                    </div>

                  </div>
                </div>
              </div>

              {/* Assigned Team */}
              <div className="glass-panel rounded-xl overflow-hidden text-left">
                <div className="px-6 py-4 border-b border-white/5 bg-white/[0.02]">
                  <h4 className="text-sm font-bold tracking-tight">Assigned Team</h4>
                </div>
                
                <div className="p-5 space-y-4">
                  <div className="flex items-center justify-between group cursor-pointer p-2 hover:bg-white/5 rounded-lg transition-all">
                    <div className="flex items-center gap-3">
                      <img alt="Sarah Chen" className="w-9 h-9 rounded-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuApGXOeBf_hULL6JkjgTIujC_buCibODDLoeki9isbasrVhsQn-31UDloV5LNzEdWqpq_xeJ-EdNoAmJ1Wi27xSKQ3rXCPsa8i1mQ6pUbpkk9ZtfGdHvtYdmusGSlZuT9wCRBIyxjnjR48nilqVt4uW431acDhg5wg1OwxlHG3FHWXTPRTksbxqutgThtexacnQXjeyUG_-nk8RKoEGurczQwrqW3c3e8Vt4tu3s-R783lgJkh9ZjBL" />
                      <div>
                        <p className="font-semibold text-on-surface text-sm">Sarah Chen</p>
                        <p className="text-[10px] text-on-surface-variant font-medium mt-0.5" style={{ color: '#c3c6d7' }}>Lead Cyber Auditor</p>
                      </div>
                    </div>
                    <span onClick={(e) => { e.stopPropagation(); toast.success('Sarah Chen: Proximity scanner active on site DC-01.'); }} className="material-symbols-outlined text-on-surface-variant text-base hover:text-primary transition-colors cursor-pointer" style={{ color: '#c3c6d7' }}>chat</span>
                  </div>

                  <div className="flex items-center justify-between group cursor-pointer p-2 hover:bg-white/5 rounded-lg transition-all">
                    <div className="flex items-center gap-3">
                      <img alt="Marcus Thorne" className="w-9 h-9 rounded-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCsN6HawCnIxEd-QkfaFho9vPkxjCFXW2EOrb3U9FAg70YhB-UKVIs7qob7W4zyQEEClmPxxhdm0VCtqwi-DVJJkyjltf1RhNQ9pmzzQyuUUd_M4C1OSJpr38vybUVBi0y9V7OgOGqAvT8gA7rBYxHxZ6y44enxac1bRFTVsDuRI0znWnCkMN9wchGBXZgASRlnR2BvD9D9D4GoPRL5mQ4x4b6vmtUoa5KYSb-87Q2kIFgiIeiQ2eQ-" />
                      <div>
                        <p className="font-semibold text-on-surface text-sm">Marcus Thorne</p>
                        <p className="text-[10px] text-on-surface-variant font-medium mt-0.5" style={{ color: '#c3c6d7' }}>Asset Specialist</p>
                      </div>
                    </div>
                    <span onClick={(e) => { e.stopPropagation(); toast.success('Marcus Thorne: Asset tagging calibration ready.'); }} className="material-symbols-outlined text-on-surface-variant text-base hover:text-primary transition-colors cursor-pointer" style={{ color: '#c3c6d7' }}>chat</span>
                  </div>

                  <button onClick={() => toast.success('Auditor list compiled for dispatch')} className="w-full mt-2 py-2 border border-dashed border-white/20 rounded-lg text-[10px] font-bold text-on-surface-variant hover:border-primary/50 hover:text-primary transition-all flex items-center justify-center gap-2 cursor-pointer">
                    <span className="material-symbols-outlined text-sm">person_add</span>
                    Assign Auditor
                  </button>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* Floating AI Assistant Trigger */}
        <div className="fixed bottom-6 right-6 z-50">
          <button 
            onClick={() => {
              setAiActive(prev => !prev);
              if (!aiActive) toast.success('Audit copilot active: Suggesting regulatory check steps.');
            }}
            className="w-14 h-14 bg-primary text-on-primary rounded-full shadow-2xl flex items-center justify-center transition-all hover:scale-110 active:scale-95 primary-glow group cursor-pointer" 
            id="ai-trigger"
            style={{ backgroundColor: '#b4c5ff', color: '#00174b' }}
          >
            <span className="material-symbols-outlined text-3xl group-hover:rotate-12 transition-transform">smart_toy</span>
          </button>
          <div className={`absolute inset-0 rounded-full bg-primary/40 -z-10 animate-ping ${aiActive ? '' : 'hidden'}`} id="ai-pulse" style={{ backgroundColor: 'rgba(180,197,255,0.4)' }} />
        </div>
      </main>
    </div>
  );
}
