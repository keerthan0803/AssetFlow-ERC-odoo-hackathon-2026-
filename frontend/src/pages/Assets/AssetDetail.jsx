import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import toast from 'react-hot-toast';

export default function AssetDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const assetId = id || 'AF-9088-QX';

  const [aiText, setAiText] = useState('');
  const [activityTiles, setActivityTiles] = useState([]);
  const [isAiGlow, setIsAiGlow] = useState(false);

  // Authentication check
  useEffect(() => {
    const user = localStorage.getItem('af_logged_in_user');
    if (!user) {
      navigate('/login');
    }
  }, [navigate]);

  // Generate GitHub style heatmap logs
  useEffect(() => {
    const tiles = [];
    const intensities = ['bg-white/5', 'bg-primary/20', 'bg-primary/40', 'bg-primary/70', 'bg-primary'];
    for (let i = 0; i < 364; i++) {
      const intensity = Math.floor(Math.random() * 5);
      tiles.push({ id: i, className: intensities[intensity] });
    }
    setActivityTiles(tiles);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('af_logged_in_user');
    toast.success('Successfully logged out.');
    navigate('/login');
  };

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
    <div 
      className="bg-background text-on-surface font-body-lg min-h-screen selection:bg-primary selection:text-on-primary w-full"
      style={{ backgroundColor: '#11131b', color: '#e1e2ed', fontFamily: "'Inter', sans-serif" }}
    >
      <style>{`
        .glass-panel {
          backdrop-filter: blur(12px);
          background: rgba(30, 41, 59, 0.5);
          border: 1px solid rgba(255, 255, 255, 0.05);
          box-shadow: inset 0 1px 0 0 rgba(255, 255, 255, 0.05);
        }
        .github-style-tile {
          aspect-ratio: 1/1;
          transition: all 0.2s ease;
        }
        .github-style-tile:hover {
          transform: scale(1.15);
          z-index: 10;
        }
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
          height: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.02);
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 2px;
        }
        .scanline {
          background: linear-gradient(to bottom, transparent 50%, rgba(180, 197, 255, 0.05) 50%);
          background-size: 100% 4px;
        }
      `}</style>

      {/* Top Navigation Bar */}
      <header className="fixed top-0 w-full z-50 flex justify-between items-center px-6 h-16 bg-surface/50 backdrop-blur-xl border-b border-white/5 shadow-sm">
        <div className="flex items-center gap-2">
          <span className="text-xl font-bold text-primary" style={{ color: '#b4c5ff' }}>AssetFlow</span>
        </div>
        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-6 mr-6">
            <Link to="/" className="text-sm font-semibold text-on-surface-variant hover:text-primary transition-colors" style={{ color: '#c3c6d7' }}>Dashboard</Link>
            <Link to="/assets" className="text-sm font-semibold text-primary transition-colors" style={{ color: '#b4c5ff' }}>Assets</Link>
            <Link to="/booking" className="text-sm font-semibold text-on-surface-variant hover:text-primary transition-colors" style={{ color: '#c3c6d7' }}>Reservations</Link>
            <Link to="/assistant" className="text-sm font-semibold text-on-surface-variant hover:text-primary transition-colors" style={{ color: '#c3c6d7' }}>Assistant</Link>
            <Link to="/organization/departments" className="text-sm font-semibold text-on-surface-variant hover:text-primary transition-colors" style={{ color: '#c3c6d7' }}>Organization</Link>
            <Link to="/maintenance" className="text-sm font-semibold text-on-surface-variant hover:text-primary transition-colors" style={{ color: '#c3c6d7' }}>Maintenance</Link>
            <Link to="/sustainability" className="text-sm font-semibold text-on-surface-variant hover:text-primary transition-colors" style={{ color: '#c3c6d7' }}>Sustainability</Link>
            <Link to="/audit" className="text-sm font-semibold text-on-surface-variant hover:text-primary transition-colors" style={{ color: '#c3c6d7' }}>Audit</Link>
          </div>
          <button 
            onClick={() => toast.success('Diagnostics feed is nominal.')}
            className="p-2 rounded-full hover:bg-white/5 transition-all text-on-surface-variant cursor-pointer"
          >
            <span className="material-symbols-outlined text-lg" style={{ color: '#c3c6d7' }}>notifications</span>
          </button>
          <div className="w-8 h-8 rounded-full bg-primary-container flex items-center justify-center border border-white/10 overflow-hidden">
            <img 
              className="w-full h-full object-cover" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBK5B8tw4DVOcY-BWu1BEQp4T48sfyWVM32pGUKdKtCdsvRK-HMO1xE1LSa0tjq2lveO5wqUrWG9D0L88tmNiBYZk5AWnEcsiLXOEyBXx1J_KGKLMSz64-5Z21g8iIV-LJLB8qA-EjubSlXJOcj_lwcuSSD8oY8gmA0bO--kd9WA6JcqwMf-2bw-ug-GpqGkT3CAbSWBlR6wXAi8w0wkiZk9oSmu7Da9A3uTm6db-WZi4-A4lH1hSz7"
              alt="Profile avatar"
            />
          </div>
        </div>
      </header>

      {/* Sidebar Navigation */}
      <aside className="fixed inset-y-0 left-0 z-[45] hidden md:flex flex-col w-[280px] bg-surface-container-low/95 backdrop-blur-2xl border-r border-white/5 pt-20">
        <div className="px-4 mb-6">
          <div className="flex items-center gap-4 p-4 glass-panel rounded-xl text-left">
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center border border-primary/20" style={{ borderColor: 'rgba(180,197,255,0.2)' }}>
              <span className="material-symbols-outlined text-primary text-xl" style={{ color: '#b4c5ff' }}>account_balance_wallet</span>
            </div>
            <div>
              <p className="text-sm font-bold text-on-surface">Investment Portfolio</p>
              <p className="text-[10px] text-on-surface-variant font-mono uppercase tracking-wider" style={{ color: '#c3c6d7' }}>Premium Account</p>
            </div>
          </div>
        </div>
        
        <nav className="flex-1 space-y-1 px-3 text-left overflow-y-auto">
          <Link 
            to="/" 
            className="flex items-center gap-4 p-2.5 rounded-lg text-on-surface-variant hover:bg-white/5 hover:text-on-surface transition-all text-sm font-semibold"
            style={{ color: '#c3c6d7' }}
          >
            <span className="material-symbols-outlined">dashboard</span>
            Dashboard
          </Link>
          <Link 
            to="/assets" 
            className="flex items-center gap-4 p-2.5 rounded-lg text-primary font-bold bg-primary/10 border-l-4 border-primary transition-all text-sm"
            style={{ color: '#b4c5ff' }}
          >
            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>account_balance_wallet</span>
            Assets
          </Link>
          <Link 
            to="/booking" 
            className="flex items-center gap-4 p-2.5 rounded-lg text-on-surface-variant hover:bg-white/5 hover:text-on-surface transition-all text-sm font-semibold"
            style={{ color: '#c3c6d7' }}
          >
            <span className="material-symbols-outlined">calendar_month</span>
            Reservations
          </Link>
          <Link 
            to="/assistant" 
            className="flex items-center gap-4 p-2.5 rounded-lg text-on-surface-variant hover:bg-white/5 hover:text-on-surface transition-all text-sm font-semibold"
            style={{ color: '#c3c6d7' }}
          >
            <span className="material-symbols-outlined">smart_toy</span>
            Assistant
          </Link>
          <Link 
            to="/organization/departments" 
            className="flex items-center gap-4 p-2.5 rounded-lg text-on-surface-variant hover:bg-white/5 hover:text-on-surface transition-all text-sm font-semibold"
            style={{ color: '#c3c6d7' }}
          >
            <span className="material-symbols-outlined">corporate_fare</span>
            Organization
          </Link>
          <Link 
            to="/maintenance" 
            className="flex items-center gap-4 p-2.5 rounded-lg text-on-surface-variant hover:bg-white/5 hover:text-on-surface transition-all text-sm font-semibold"
            style={{ color: '#c3c6d7' }}
          >
            <span className="material-symbols-outlined">engineering</span>
            Maintenance
          </Link>
          <Link 
            to="/sustainability" 
            className="flex items-center gap-4 p-2.5 rounded-lg text-on-surface-variant hover:bg-white/5 hover:text-on-surface transition-all text-sm font-semibold"
            style={{ color: '#c3c6d7' }}
          >
            <span className="material-symbols-outlined">eco</span>
            Sustainability
          </Link>
          <Link 
            to="/audit" 
            className="flex items-center gap-4 p-2.5 rounded-lg text-on-surface-variant hover:bg-white/5 hover:text-on-surface transition-all text-sm font-semibold"
            style={{ color: '#c3c6d7' }}
          >
            <span className="material-symbols-outlined">verified_user</span>
            Audit &amp; Compliance
          </Link>
        </nav>

        <div className="p-6 border-t border-white/5 text-left">
          <button 
            onClick={handleLogout}
            className="w-full flex items-center gap-4 p-3 text-on-surface-variant hover:bg-white/5 rounded-lg transition-all text-sm font-semibold text-left cursor-pointer"
            style={{ color: '#c3c6d7' }}
          >
            <span className="material-symbols-outlined">logout</span>
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content Canvas */}
      <main className="md:pl-[280px] pt-16 min-h-screen bg-background relative flex-1">
        
        {/* Scrollable Container */}
        <div className="relative z-10 p-6 max-w-7xl mx-auto flex flex-col gap-6 text-left">
          
          {/* Page Header Area */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/5 pb-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-primary font-mono uppercase tracking-widest text-[10px]" style={{ color: '#b4c5ff' }}>
                  Asset ID: {assetId}
                </span>
                <div className="px-2.5 py-0.5 rounded-full bg-primary/10 border border-primary/20 text-[10px] text-primary font-bold" style={{ color: '#b4c5ff', borderColor: 'rgba(180,197,255,0.2)' }}>
                  OPERATIONAL
                </div>
              </div>
              <h1 className="text-2xl font-bold text-on-surface">Precision Core Facility A1</h1>
            </div>
            
            <div className="flex items-center gap-2">
              <button 
                onClick={() => toast.success('Exporting telemetry ledger to local storage…')}
                className="px-4 h-10 glass-panel rounded-lg text-xs font-semibold hover:bg-white/10 transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <span className="material-symbols-outlined text-sm">download</span> Export Report
              </button>
              <button 
                onClick={() => toast.success('Opening system calibration console…')}
                className="px-4 h-10 bg-primary text-on-primary rounded-lg text-xs font-bold shadow-lg hover:brightness-110 active:scale-95 transition-all flex items-center gap-1.5 cursor-pointer"
                style={{ backgroundColor: '#b4c5ff', color: '#00174b' }}
              >
                <span className="material-symbols-outlined text-sm">settings</span> Manage Configuration
              </button>
            </div>
          </div>

          {/* Multi-Pane Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start pb-20">
            
            {/* Left Pane: Visualization & Health */}
            <div className="lg:col-span-5 flex flex-col gap-6">
              
              {/* 3D Style Asset View Image */}
              <div className="glass-panel rounded-xl overflow-hidden relative group h-[380px]">
                <div className="absolute inset-0 bg-gradient-to-t from-surface to-transparent opacity-60 z-10" />
                <div className="absolute top-4 right-4 z-20">
                  <button 
                    onClick={() => toast.success('Viewing high-res schematic view')}
                    className="p-2 glass-panel rounded-lg hover:bg-white/10 transition-all cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-white text-base">fullscreen</span>
                  </button>
                </div>
                
                <div className="w-full h-full relative">
                  <img 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuBPtr8hGWy1JWe4acsawgn8tUn3z2AbvAwhRBFpmcvvqUfESEjg9IBBzamjAunV3kaV5p5BkGMIRGYDsxN-PjJLJ4tSZDzx38EAjqqqN1QIBlkfuMJMU9XyXS6HLNLNmS4-i_yIfOgWZ_zGFU3qqCqrCPHoPCJChwDby_q1Ja-itU67KbrZi9ti-VcNCWxTYTOLwJpsXj3V_YVAvpo2VA7KpYmyd-lfuHExX8jRjLGQlBdkt_y303i3"
                    alt="Precision core server facility"
                  />
                  <div className="scanline absolute inset-0 pointer-events-none opacity-30" />
                </div>

                {/* Overlays */}
                <div className="absolute bottom-6 left-6 right-6 z-20 flex flex-col gap-2">
                  <div className="flex justify-between items-end">
                    <div>
                      <p className="text-[10px] text-on-surface-variant font-mono mb-1" style={{ color: '#c3c6d7' }}>REAL-TIME TELEMETRY</p>
                      <div className="flex gap-4">
                        <div className="flex flex-col">
                          <span className="text-lg font-bold text-white">32.4°C</span>
                          <span className="text-[9px] text-on-surface-variant uppercase font-semibold" style={{ color: '#c3c6d7' }}>Thermal</span>
                        </div>
                        <div className="w-px h-8 bg-white/10" />
                        <div className="flex flex-col">
                          <span className="text-lg font-bold text-white">98.2%</span>
                          <span className="text-[9px] text-on-surface-variant uppercase font-semibold" style={{ color: '#c3c6d7' }}>Efficiency</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-[10px] text-on-surface-variant font-mono mb-1" style={{ color: '#c3c6d7' }}>UPTIME</p>
                      <span className="text-lg font-bold text-primary" style={{ color: '#b4c5ff' }}>12,482h</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Circular Health Gauges */}
              <div className="grid grid-cols-2 gap-4">
                
                {/* Structural integrity */}
                <div className="glass-panel p-4 rounded-xl">
                  <div className="flex justify-between items-start mb-3">
                    <span className="text-[9px] font-semibold text-on-surface-variant tracking-wider" style={{ fontFamily: "'Geist', monospace", color: '#c3c6d7' }}>
                      STRUCTURAL INTEGRITY
                    </span>
                    <span className="text-primary material-symbols-outlined text-sm" style={{ color: '#b4c5ff' }}>monitor_heart</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="relative w-12 h-12">
                      <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                        <circle className="stroke-white/5" cx="18" cy="18" fill="none" r="16" strokeWidth="3" />
                        <circle className="stroke-primary" cx="18" cy="18" fill="none" r="16" strokeDasharray="100" strokeDashoffset="5" strokeWidth="3" style={{ stroke: '#2563eb' }} />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-xs font-bold">95%</span>
                      </div>
                    </div>
                    <div className="text-left">
                      <p className="text-xs font-bold text-primary" style={{ color: '#b4c5ff' }}>OPTIMAL</p>
                      <p className="text-[9px] text-on-surface-variant mt-0.5" style={{ color: '#c3c6d7' }}>Last checked 2h ago</p>
                    </div>
                  </div>
                </div>

                {/* Residual value */}
                <div className="glass-panel p-4 rounded-xl">
                  <div className="flex justify-between items-start mb-3">
                    <span className="text-[9px] font-semibold text-on-surface-variant tracking-wider" style={{ fontFamily: "'Geist', monospace", color: '#c3c6d7' }}>
                      RESIDUAL VALUE
                    </span>
                    <span className="text-tertiary material-symbols-outlined text-sm" style={{ color: '#b9c7e0' }}>payments</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="relative w-12 h-12">
                      <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                        <circle className="stroke-white/5" cx="18" cy="18" fill="none" r="16" strokeWidth="3" />
                        <circle className="stroke-tertiary" cx="18" cy="18" fill="none" r="16" stroke-dasharray="100" stroke-dashoffset="35" stroke-width="3" style={{ stroke: '#b9c7e0' }} />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-xs font-bold">65%</span>
                      </div>
                    </div>
                    <div className="text-left">
                      <p className="text-xs font-bold text-tertiary" style={{ color: '#b9c7e0' }}>$1.2M USD</p>
                      <p className="text-[9px] text-on-surface-variant mt-0.5" style={{ color: '#c3c6d7' }}>Depreciation: Linear</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Sub-system Status List */}
              <div className="glass-panel p-4 rounded-xl flex flex-col gap-3">
                <h3 className="text-[10px] font-semibold text-on-surface-variant uppercase tracking-wider" style={{ fontFamily: "'Geist', monospace", color: '#c3c6d7' }}>
                  Sub-System Status
                </h3>
                <div className="flex flex-col gap-2">
                  <div className="flex items-center justify-between p-2 px-3 rounded-lg bg-white/2">
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary" style={{ backgroundColor: '#2563eb', boxShadow: '0 0 6px #2563eb' }} />
                      <span className="text-xs font-semibold">Power Distribution Unit</span>
                    </div>
                    <span className="text-[9px] font-mono text-on-surface-variant font-bold uppercase" style={{ color: '#c3c6d7' }}>NOMINAL</span>
                  </div>

                  <div className="flex items-center justify-between p-2 px-3 rounded-lg bg-white/2">
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary" style={{ backgroundColor: '#2563eb', boxShadow: '0 0 6px #2563eb' }} />
                      <span className="text-xs font-semibold">Environmental Controls</span>
                    </div>
                    <span className="text-[9px] font-mono text-on-surface-variant font-bold uppercase" style={{ color: '#c3c6d7' }}>NOMINAL</span>
                  </div>

                  <div className="flex items-center justify-between p-2 px-3 rounded-lg bg-white/2">
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-tertiary" style={{ backgroundColor: '#b9c7e0', boxShadow: '0 0 6px #b9c7e0' }} />
                      <span className="text-xs font-semibold">Auxiliary Data Bus</span>
                    </div>
                    <span className="text-[9px] font-mono text-tertiary font-bold uppercase" style={{ color: '#b9c7e0' }}>MAINTENANCE REQ.</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Pane: Lifecycle Timeline */}
            <div className="lg:col-span-7 flex flex-col gap-6">
              
              {/* GitHub Style Heatmap Grid */}
              <div className="glass-panel p-6 rounded-xl overflow-hidden">
                <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
                  <div>
                    <h2 className="text-base font-bold text-on-surface">Asset Activity Log</h2>
                    <p className="text-xs text-on-surface-variant mt-0.5" style={{ color: '#c3c6d7' }}>Visualization of operational health over the last 12 months.</p>
                  </div>
                  
                  <div className="flex items-center gap-1.5">
                    <span className="text-[9px] font-semibold text-on-surface-variant uppercase tracking-wider" style={{ fontFamily: "'Geist', monospace", color: '#c3c6d7' }}>Less</span>
                    <div className="w-3 h-3 bg-white/5 rounded-sm" />
                    <div className="w-3 h-3 bg-primary/20 rounded-sm" style={{ backgroundColor: 'rgba(180,197,255,0.2)' }} />
                    <div className="w-3 h-3 bg-primary/40 rounded-sm" style={{ backgroundColor: 'rgba(180,197,255,0.4)' }} />
                    <div className="w-3 h-3 bg-primary/70 rounded-sm" style={{ backgroundColor: 'rgba(180,197,255,0.7)' }} />
                    <div className="w-3 h-3 bg-primary rounded-sm" style={{ backgroundColor: '#b4c5ff' }} />
                    <span className="text-[9px] font-semibold text-on-surface-variant uppercase tracking-wider" style={{ fontFamily: "'Geist', monospace", color: '#c3c6d7' }}>More</span>
                  </div>
                </div>

                {/* Heatmap render */}
                <div className="overflow-x-auto custom-scrollbar pb-3">
                  <div className="grid grid-flow-col grid-rows-7 gap-1 min-w-max">
                    {activityTiles.map((tile) => (
                      <div 
                        key={tile.id} 
                        className={`w-[11px] h-[11px] rounded-sm github-style-tile ${tile.className}`} 
                      />
                    ))}
                  </div>
                </div>
                
                <div className="flex justify-between mt-2 px-1">
                  {['JAN', 'MAR', 'MAY', 'JUL', 'SEP', 'NOV'].map(m => (
                    <span key={m} className="text-[9px] font-mono font-bold text-on-surface-variant" style={{ color: '#8d90a0' }}>{m}</span>
                  ))}
                </div>
              </div>

              {/* Event Lifecycle logs Timeline */}
              <div className="glass-panel p-6 rounded-xl flex-1 flex flex-col justify-between">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-base font-bold text-on-surface">Lifecycle Events</h3>
                  <div className="flex gap-2">
                    <button 
                      onClick={() => toast.success('Filtering events timeline')}
                      className="p-1.5 rounded-lg border border-white/5 hover:bg-white/5 transition-colors cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-sm" style={{ color: '#c3c6d7' }}>filter_list</span>
                    </button>
                    <button 
                      onClick={() => toast.success('Searching logs database')}
                      className="p-1.5 rounded-lg border border-white/5 hover:bg-white/5 transition-colors cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-sm" style={{ color: '#c3c6d7' }}>search</span>
                    </button>
                  </div>
                </div>

                <div className="flex-1 space-y-6 relative border-l border-white/5 pl-6 ml-3 text-left">
                  
                  {/* Event 1 */}
                  <div className="relative">
                    <div 
                      className="absolute -left-[35px] top-0 w-6 h-6 rounded-full glass-panel flex items-center justify-center z-10 border border-primary/45 bg-[#11131b]"
                      style={{ borderColor: 'rgba(180,197,255,0.45)' }}
                    >
                      <span className="material-symbols-outlined text-[12px] text-primary" style={{ color: '#b4c5ff' }}>build</span>
                    </div>
                    <div className="flex justify-between items-start mb-2 flex-wrap gap-2">
                      <div>
                        <h4 className="font-bold text-on-surface text-sm">Scheduled Maintenance: Q3 Calibration</h4>
                        <p className="text-[10px] font-mono font-bold text-on-surface-variant mt-0.5" style={{ color: '#c3c6d7' }}>
                          Oct 12, 2023 • Service Order #7721
                        </p>
                      </div>
                      <span className="px-2 py-0.5 rounded bg-primary/10 text-primary text-[9px] font-bold uppercase border border-primary/20" style={{ color: '#b4c5ff', borderColor: 'rgba(180,197,255,0.2)' }}>
                        COMPLETED
                      </span>
                    </div>
                    <div className="glass-panel p-4 rounded-lg border-l-4 border-primary" style={{ borderLeftColor: '#2563eb' }}>
                      <p className="text-xs text-on-surface-variant leading-relaxed" style={{ color: '#c3c6d7' }}>
                        Precision realignment of optical sensors and thermal buffer flushing. No significant wear detected in core components.
                      </p>
                      <div className="mt-4 flex gap-4 items-center text-[9px] font-mono font-bold text-on-surface-variant" style={{ color: '#8d90a0' }}>
                        <div className="flex items-center gap-1">
                          <span className="material-symbols-outlined text-xs">person</span> J. Rodriguez
                        </div>
                        <div className="flex items-center gap-1">
                          <span className="material-symbols-outlined text-xs">timer</span> 4.5h Duration
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Event 2 */}
                  <div className="relative">
                    <div className="absolute -left-[35px] top-0 w-6 h-6 rounded-full glass-panel flex items-center justify-center z-10 border border-white/20 bg-[#11131b]">
                      <span className="material-symbols-outlined text-[12px] text-on-surface">swap_horiz</span>
                    </div>
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h4 className="font-bold text-on-surface text-sm">Asset Allocation Update</h4>
                        <p className="text-[10px] font-mono font-bold text-on-surface-variant mt-0.5" style={{ color: '#c3c6d7' }}>
                          Aug 05, 2023 • Request ID: REQ-091
                        </p>
                      </div>
                      <span className="px-2 py-0.5 rounded bg-white/5 text-on-surface-variant text-[9px] font-bold uppercase border border-white/10" style={{ color: '#c3c6d7' }}>
                        SYSTEM
                      </span>
                    </div>
                    <div className="glass-panel p-4 rounded-lg">
                      <p className="text-xs text-on-surface-variant leading-relaxed" style={{ color: '#c3c6d7' }}>
                        Transferred from <span className="text-primary font-bold" style={{ color: '#b4c5ff' }}>Backup-Cluster B</span> to <span className="text-primary font-bold" style={{ color: '#b4c5ff' }}>Production Alpha</span> to meet surging computational demands.
                      </p>
                    </div>
                  </div>

                  {/* Event 3 */}
                  <div className="relative">
                    <div className="absolute -left-[35px] top-0 w-6 h-6 rounded-full glass-panel flex items-center justify-center z-10 border border-error/50 bg-[#11131b]" style={{ borderColor: 'rgba(255,180,171,0.5)' }}>
                      <span className="material-symbols-outlined text-[12px] text-error" style={{ color: '#ffb4ab' }}>warning</span>
                    </div>
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h4 className="font-bold text-on-surface text-sm">Critical Temperature Spike</h4>
                        <p className="text-[10px] font-mono font-bold text-on-surface-variant mt-0.5" style={{ color: '#c3c6d7' }}>
                          June 21, 2023 • Event ID: ERR-104
                        </p>
                      </div>
                      <span className="px-2 py-0.5 rounded bg-error-container/30 text-error text-[9px] font-bold uppercase border border-error-container/40" style={{ color: '#ffb4ab' }}>
                        CRITICAL
                      </span>
                    </div>
                    <div className="glass-panel p-4 rounded-lg border-l-4 border-error" style={{ borderLeftColor: '#ffb4ab' }}>
                      <p className="text-xs text-on-surface-variant leading-relaxed" style={{ color: '#c3c6d7' }}>
                        Core temperature reached 55°C. Automated cooling override engaged. System throttled to 50% capacity for 12 minutes.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* AI Assistant Floating Input Container */}
        <div className="fixed bottom-6 right-6 z-50 w-80 md:w-96">
          <form 
            onSubmit={handleAiSend}
            onFocus={() => setIsAiGlow(true)}
            onBlur={() => setIsAiGlow(false)}
            className="glass-panel p-2 rounded-2xl flex items-center gap-3 shadow-2xl border-white/10 bg-[#1e2029]"
          >
            <div 
              className={`w-10 h-10 rounded-xl bg-primary flex items-center justify-center flex-shrink-0 relative overflow-hidden transition-all duration-300 ${isAiGlow ? 'scale-110' : ''}`}
              style={{ 
                backgroundColor: '#b4c5ff', 
                color: '#00174b', 
                boxShadow: isAiGlow ? '0 0 20px rgba(180, 197, 255, 0.4)' : 'none' 
              }}
            >
              <span className="material-symbols-outlined text-lg">smart_toy</span>
              <div className="absolute inset-0 bg-white/20 animate-pulse" />
            </div>
            
            <input 
              className="bg-transparent border-none outline-none focus:ring-0 text-xs text-on-surface placeholder:text-on-surface-variant flex-1 px-0" 
              placeholder="Ask AI about this asset's health..." 
              type="text"
              value={aiText}
              onChange={e => setAiText(e.target.value)}
            />
            
            <button 
              type="submit"
              className="p-2 text-primary hover:bg-primary/10 rounded-xl transition-colors cursor-pointer"
              style={{ color: '#b4c5ff' }}
            >
              <span className="material-symbols-outlined text-base">send</span>
            </button>
          </form>
        </div>

        {/* Mobile Navigation overlay */}
        <nav 
          className="md:hidden fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-4 pb-4 pt-2"
          style={{ backgroundColor: 'rgba(17,19,27,0.8)', borderTop: '1px solid rgba(255,255,255,0.1)' }}
        >
          <Link 
            to="/"
            className="flex flex-col items-center justify-center px-3 py-1 rounded-xl transition-colors text-on-surface-variant"
          >
            <span className="material-symbols-outlined text-xl">dashboard</span>
            <span className="text-[10px] font-semibold" style={{ fontFamily: "'Geist', monospace" }}>Dashboard</span>
          </Link>
          <Link 
            to="/assets"
            className="flex flex-col items-center justify-center px-3 py-1 rounded-xl transition-colors text-primary bg-primary/10"
            style={{ color: '#b4c5ff' }}
          >
            <span className="material-symbols-outlined text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>account_balance_wallet</span>
            <span className="text-[10px] font-semibold" style={{ fontFamily: "'Geist', monospace" }}>Assets</span>
          </Link>
          <button 
            onClick={() => { toast.success('QR tag scan initialized'); }}
            className="flex flex-col items-center justify-center px-3 py-1 rounded-xl transition-colors text-on-surface-variant cursor-pointer"
          >
            <span className="material-symbols-outlined text-xl">qr_code_scanner</span>
            <span className="text-[10px] font-semibold" style={{ fontFamily: "'Geist', monospace" }}>Scan</span>
          </button>
          <Link 
            to="/assistant"
            className="flex flex-col items-center justify-center px-3 py-1 rounded-xl transition-colors text-on-surface-variant"
          >
            <span className="material-symbols-outlined text-xl">smart_toy</span>
            <span className="text-[10px] font-semibold" style={{ fontFamily: "'Geist', monospace" }}>Assistant</span>
          </Link>
        </nav>
      </main>
    </div>
  );
}
