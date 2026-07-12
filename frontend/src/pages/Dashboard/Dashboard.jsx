import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import toast from 'react-hot-toast';

export default function Dashboard() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [assistantText, setAssistantText] = useState('');
  const [greeting, setGreeting] = useState('Welcome back, Director');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Time-based greeting
  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting('Good morning, Director');
    else if (hour < 18) setGreeting('Good afternoon, Director');
    else setGreeting('Good evening, Director');
  }, []);

  // Check login authentication
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

  const handleExecuteActions = () => {
    toast.success('AI suggestions executed! Reallocating crypto assets to mitigate risk…');
  };

  const handleAssistantSend = (e) => {
    e.preventDefault();
    if (!assistantText.trim()) return;
    
    const query = assistantText;
    setAssistantText('');
    toast.loading('Analyzing risk profiles…', { id: 'ai' });

    setTimeout(() => {
      toast.success(`AI Response: Portfolio risk analyzed. Benchmark is optimized!`, { id: 'ai', duration: 4000 });
    }, 1500);
  };

  // Mock audits list
  const initialAudits = [
    { name: 'Data Center Alpha', location: 'Zurich, CH', date: 'Oct 24, 2023', status: 'Critical' },
    { name: 'Logistics Fleet B', location: 'Singapore, SG', date: 'Oct 29, 2023', status: 'Scheduled' },
    { name: 'Cloud Reserve Cluster', location: 'N. Virginia, US', date: 'Nov 02, 2023', status: 'Scheduled' },
    { name: 'Rare Earth Inventory', location: 'Perth, AU', date: 'Nov 15, 2023', status: 'Imminent' }
  ];

  const filteredAudits = initialAudits.filter(item => 
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.status.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div 
      className="bg-background text-on-surface min-h-screen flex overflow-hidden w-full"
      style={{ backgroundColor: '#11131b', color: '#e1e2ed', fontFamily: "'Inter', sans-serif" }}
    >
      <style>{`
        .glass-panel {
          backdrop-filter: blur(12px);
          background: rgba(30, 41, 59, 0.5);
          border: 1px solid rgba(255, 255, 255, 0.05);
        }
        .glass-panel-heavy {
          backdrop-filter: blur(20px);
          background: rgba(30, 41, 59, 0.8);
          border: 1px solid rgba(255, 255, 255, 0.1);
        }
        .card-top-highlight {
          border-top: 1px solid rgba(255, 255, 255, 0.12);
        }
        .active-glow {
          box-shadow: 0 0 20px rgba(180, 197, 255, 0.1);
        }
      `}</style>

      {/* Navigation Drawer (SideNav) */}
      <aside 
        className={`fixed inset-y-0 left-0 transform ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 transition-transform duration-300 ease-in-out md:static flex flex-col h-full w-[280px] bg-surface-container-low/95 backdrop-blur-2xl border-r border-white/5 z-[60] flex-shrink-0`}
        style={{ minHeight: '100vh' }}
      >
        <div className="px-6 py-10 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-primary tracking-tight" style={{ color: '#b4c5ff' }}>AssetFlow</h1>
          <button 
            className="md:hidden material-symbols-outlined text-on-surface"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            close
          </button>
        </div>
        
        <nav className="flex-1 px-3 space-y-1 overflow-y-auto text-left">
          <Link 
            to="/"
            className="w-full flex items-center gap-4 px-4 py-2.5 rounded-lg text-primary font-bold bg-primary/5 border-l-4 border-primary transition-all duration-200"
            style={{ color: '#b4c5ff' }}
          >
            <span className="material-symbols-outlined">dashboard</span>
            <span className="text-sm">Dashboard</span>
          </Link>
          
          <Link 
            to="/assets"
            className="w-full flex items-center gap-4 px-4 py-2.5 rounded-lg text-on-surface-variant hover:bg-white/5 hover:text-on-surface transition-all duration-200"
            style={{ color: '#c3c6d7' }}
          >
            <span className="material-symbols-outlined">inventory_2</span>
            <span className="text-sm">Assets</span>
          </Link>

          <Link 
            to="/booking"
            className="w-full flex items-center gap-4 px-4 py-2.5 rounded-lg text-on-surface-variant hover:bg-white/5 hover:text-on-surface transition-all duration-200"
            style={{ color: '#c3c6d7' }}
          >
            <span className="material-symbols-outlined">calendar_month</span>
            <span className="text-sm">Reservations</span>
          </Link>

          <Link 
            to="/assistant"
            className="w-full flex items-center gap-4 px-4 py-2.5 rounded-lg text-on-surface-variant hover:bg-white/5 hover:text-on-surface transition-all duration-200"
            style={{ color: '#c3c6d7' }}
          >
            <span className="material-symbols-outlined">smart_toy</span>
            <span className="text-sm">Assistant</span>
          </Link>

          <Link 
            to="/organization/departments"
            className="w-full flex items-center gap-4 px-4 py-2.5 rounded-lg text-on-surface-variant hover:bg-white/5 hover:text-on-surface transition-all duration-200"
            style={{ color: '#c3c6d7' }}
          >
            <span className="material-symbols-outlined">corporate_fare</span>
            <span className="text-sm">Organization</span>
          </Link>

          <Link 
            to="/maintenance"
            className="w-full flex items-center gap-4 px-4 py-2.5 rounded-lg text-on-surface-variant hover:bg-white/5 hover:text-on-surface transition-all duration-200"
            style={{ color: '#c3c6d7' }}
          >
            <span className="material-symbols-outlined">engineering</span>
            <span className="text-sm">Maintenance</span>
          </Link>

          <Link 
            to="/sustainability"
            className="w-full flex items-center gap-4 px-4 py-2.5 rounded-lg text-on-surface-variant hover:bg-white/5 hover:text-on-surface transition-all duration-200"
            style={{ color: '#c3c6d7' }}
          >
            <span className="material-symbols-outlined">eco</span>
            <span className="text-sm">Sustainability</span>
          </Link>
        </nav>

        {/* Profile Card Footer */}
        <div className="p-6 mt-auto glass-panel-heavy m-3 rounded-xl border-white/10">
          <div className="flex items-center gap-4 mb-3">
            <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center border border-primary/30">
              <span className="material-symbols-outlined text-primary" style={{ color: '#b4c5ff' }}>person</span>
            </div>
            <div className="flex flex-col text-left">
              <span className="text-sm font-bold text-on-surface">Director Portfolio</span>
              <span className="text-[10px] text-primary/80 uppercase tracking-widest font-medium" style={{ fontFamily: "'Geist', monospace", color: '#b4c5ff' }}>
                Premium Account
              </span>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-[10px] font-medium px-2.5 py-0.5 bg-primary/10 text-primary rounded-full border border-primary/20" style={{ color: '#b4c5ff', borderColor: 'rgba(180,197,255,0.2)' }}>
              Active
            </span>
            <button 
              onClick={handleLogout}
              className="material-symbols-outlined text-on-surface-variant hover:text-primary transition-colors cursor-pointer"
              title="Logout Account"
            >
              logout
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col relative h-screen overflow-y-auto w-full">
        {/* TopAppBar */}
        <header className="fixed top-0 right-0 left-0 md:left-[280px] h-16 bg-surface/50 backdrop-blur-xl border-b border-white/5 flex justify-between items-center px-6 z-50">
          <div className="flex items-center gap-4">
            <button 
              className="md:hidden material-symbols-outlined text-on-surface"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              menu
            </button>
            <span className="text-lg font-bold text-primary hidden md:block" style={{ color: '#b4c5ff' }}>
              Portfolio Command Center
            </span>
            <span className="text-lg font-bold text-primary md:hidden" style={{ color: '#b4c5ff' }}>
              AssetFlow
            </span>
          </div>

          <div className="flex items-center gap-6">
            {/* Global search */}
            <div className="hidden sm:flex items-center glass-panel px-4 py-1.5 rounded-full border border-white/5">
              <span className="material-symbols-outlined text-on-surface-variant text-lg" style={{ color: '#c3c6d7' }}>search</span>
              <input 
                className="bg-transparent border-none outline-none focus:ring-0 text-xs text-on-surface w-48 px-2" 
                placeholder="Search upcoming audits..." 
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
              />
            </div>
            
            <div className="flex items-center gap-4">
              <button 
                onClick={() => toast.success('No new warnings logged in command center.')}
                className="material-symbols-outlined text-on-surface-variant hover:bg-white/5 p-2 rounded-full transition-all active:scale-95"
              >
                notifications
              </button>
              <div className="w-8 h-8 rounded-full overflow-hidden border border-primary/50" style={{ borderColor: '#b4c5ff' }}>
                <img 
                  alt="Profile Avatar" 
                  className="w-full h-full object-cover" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuD2ZgfvOJWT141SJhyUKxULwU_F5aGixqgnqu8COtGx5-OwodIbwZkTC2TUJeqQjfksV-4UP0MkEs70RZQswbiG1en7JRjL226qXLsy51yZMUsO0AXW9kX19wr37jeCQqRkjp1fWiSK0smmaiAS7mFBYn887sndPjhzavYTP_pLTmoHUhnZLWG4uEfbGGWDf838kDTVgx5TysXPrsMx1MdJ_KvjUxWBUy0n_x-TJAsZh0TGQ-KkD8w0"
                />
              </div>
            </div>
          </div>
        </header>

        {/* Content body */}
        <div className="pt-24 px-6 pb-24 space-y-6 max-w-[1440px] mx-auto w-full text-left">
          
          {/* Hero Row */}
          <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Welcome banner */}
            <div className="lg:col-span-2 glass-panel p-6 rounded-2xl relative overflow-hidden card-top-highlight active-glow flex flex-col justify-between min-h-[220px]">
              <div className="relative z-10">
                <span className="text-xs font-semibold text-primary/80 uppercase tracking-widest block" style={{ fontFamily: "'Geist', monospace", color: '#b4c5ff' }}>
                  System Overview
                </span>
                <h2 className="text-3xl font-bold mt-2 mb-3 text-on-surface">{greeting}</h2>
                <p className="text-sm text-on-surface-variant max-w-xl leading-relaxed" style={{ color: '#c3c6d7' }}>
                  Your portfolio is currently performing <span class="text-primary font-bold" style={{ color: '#b4c5ff' }}>+12.4%</span> above the quarterly benchmark. AI Assistant has identified 3 risk-mitigation opportunities in your crypto assets.
                </p>
              </div>
              <div className="flex gap-4 mt-6 relative z-10">
                <button 
                  onClick={handleExecuteActions}
                  className="bg-primary text-on-primary-fixed font-bold text-sm px-5 py-3 rounded-xl hover:opacity-90 transition-all active:scale-95 flex items-center gap-2 cursor-pointer"
                  style={{ backgroundColor: '#b4c5ff', color: '#00174b' }}
                >
                  <span className="material-symbols-outlined text-lg">bolt</span>
                  Execute Actions
                </button>
                <button 
                  onClick={() => toast.success('Detailed quarterly risk breakdown loaded.')}
                  className="bg-white/5 border border-white/10 text-on-surface font-bold text-sm px-5 py-3 rounded-xl hover:bg-white/10 transition-all active:scale-95 cursor-pointer"
                >
                  View Details
                </button>
              </div>
            </div>

            {/* Network Latency Widget */}
            <div className="glass-panel p-6 rounded-2xl card-top-highlight flex flex-col justify-between">
              <div className="flex justify-between items-center">
                <span className="text-xs font-semibold text-on-surface-variant uppercase tracking-wider" style={{ fontFamily: "'Geist', monospace", color: '#c3c6d7' }}>
                  Network Latency
                </span>
                <span className="w-2.5 h-2.5 rounded-full bg-primary animate-pulse" style={{ backgroundColor: '#b4c5ff' }} />
              </div>
              <div className="my-auto py-4">
                <div className="text-5xl font-bold text-primary leading-none" style={{ fontFamily: "'Geist', monospace", color: '#b4c5ff' }}>
                  14.2ms
                </div>
                <div className="text-xs text-on-surface-variant mt-2 font-medium" style={{ color: '#c3c6d7' }}>
                  Nodes synchronizing across 8 regions
                </div>
              </div>
              <div className="pt-4 border-t border-white/5">
                <div className="flex justify-between text-xs mb-1.5 font-medium">
                  <span className="text-on-surface-variant" style={{ color: '#c3c6d7' }}>Uptime</span>
                  <span className="text-on-surface">99.998%</span>
                </div>
                <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full bg-primary w-[99.9%]" style={{ backgroundColor: '#b4c5ff', boxShadow: '0 0 8px #b4c5ff' }} />
                </div>
              </div>
            </div>
          </section>

          {/* Bento grid metric cards */}
          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Metric 1 */}
            <div className="glass-panel p-5 rounded-2xl card-top-highlight hover:bg-white/[0.07] transition-all">
              <div className="flex items-center gap-2 mb-3">
                <span className="material-symbols-outlined text-primary text-lg" style={{ color: '#b4c5ff' }}>account_balance</span>
                <span className="text-xs font-semibold text-on-surface-variant" style={{ fontFamily: "'Geist', monospace", color: '#c3c6d7' }}>
                  Available Liquid
                </span>
              </div>
              <div className="text-2xl font-bold text-on-surface">$2,482,900</div>
              <div className="mt-2 flex items-center text-primary gap-1" style={{ color: '#b4c5ff' }}>
                <span className="material-symbols-outlined text-sm">arrow_drop_up</span>
                <span className="text-xs font-bold font-mono">+2.5%</span>
              </div>
            </div>

            {/* Metric 2 */}
            <div className="glass-panel p-5 rounded-2xl card-top-highlight hover:bg-white/[0.07] transition-all">
              <div className="flex items-center gap-2 mb-3">
                <span className="material-symbols-outlined text-secondary text-lg" style={{ color: '#bec6e0' }}>lock</span>
                <span className="text-xs font-semibold text-on-surface-variant" style={{ fontFamily: "'Geist', monospace", color: '#c3c6d7' }}>
                  Allocated Assets
                </span>
              </div>
              <div className="text-2xl font-bold text-on-surface">$12,840,000</div>
              <div className="mt-2 flex items-center text-primary gap-1" style={{ color: '#b4c5ff' }}>
                <span className="material-symbols-outlined text-sm">arrow_drop_up</span>
                <span className="text-xs font-bold font-mono">+0.8%</span>
              </div>
            </div>

            {/* Metric 3 */}
            <div className="glass-panel p-5 rounded-2xl card-top-highlight hover:bg-white/[0.07] transition-all">
              <div className="flex items-center gap-2 mb-3">
                <span className="material-symbols-outlined text-error text-lg" style={{ color: '#ffb4ab' }}>qr_code_2</span>
                <span className="text-xs font-semibold text-on-surface-variant" style={{ fontFamily: "'Geist', monospace", color: '#c3c6d7' }}>
                  Pending Scans
                </span>
              </div>
              <div className="text-2xl font-bold text-on-surface">18 Items</div>
              <div className="mt-2 flex items-center text-error gap-1" style={{ color: '#ffb4ab' }}>
                <span className="material-symbols-outlined text-sm">priority_high</span>
                <span className="text-xs font-bold font-mono">Action required</span>
              </div>
            </div>

            {/* Metric 4 */}
            <div className="glass-panel p-5 rounded-2xl card-top-highlight hover:bg-white/[0.07] transition-all">
              <div className="flex items-center gap-2 mb-3">
                <span className="material-symbols-outlined text-primary text-lg" style={{ color: '#b4c5ff' }}>smart_toy</span>
                <span className="text-xs font-semibold text-on-surface-variant" style={{ fontFamily: "'Geist', monospace", color: '#c3c6d7' }}>
                  Assistant Pulse
                </span>
              </div>
              <div className="text-2xl font-bold text-on-surface">98.2% Accuracy</div>
              <div className="mt-3 flex items-center gap-1">
                <div className="flex gap-1">
                  <div className="w-1.5 h-3.5 bg-primary rounded-full animate-pulse" style={{ backgroundColor: '#b4c5ff' }} />
                  <div className="w-1.5 h-3.5 bg-primary/40 rounded-full animate-pulse [animation-delay:0.2s]" style={{ backgroundColor: 'rgba(180,197,255,0.4)' }} />
                  <div className="w-1.5 h-3.5 bg-primary rounded-full animate-pulse [animation-delay:0.4s]" style={{ backgroundColor: '#b4c5ff' }} />
                </div>
              </div>
            </div>
          </section>

          {/* Table & Chart Row */}
          <section className="grid grid-cols-1 lg:grid-cols-5 gap-6">
            
            {/* Upcoming Audits Table */}
            <div className="lg:col-span-3 glass-panel rounded-2xl overflow-hidden card-top-highlight">
              <div className="px-6 py-4 border-b border-white/5 flex justify-between items-center">
                <h3 className="text-base font-bold text-on-surface">Upcoming Audits</h3>
                <Link 
                  to="/assets"
                  className="text-primary text-xs tracking-wider font-semibold uppercase hover:underline"
                  style={{ color: '#b4c5ff', fontFamily: "'Geist', monospace" }}
                >
                  View All
                </Link>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b border-white/5 bg-white/[0.02]">
                      <th className="px-6 py-3 text-xs tracking-wider uppercase font-semibold text-on-surface-variant" style={{ fontFamily: "'Geist', monospace", color: '#c3c6d7' }}>Asset Name</th>
                      <th className="px-6 py-3 text-xs tracking-wider uppercase font-semibold text-on-surface-variant" style={{ fontFamily: "'Geist', monospace", color: '#c3c6d7' }}>Location</th>
                      <th className="px-6 py-3 text-xs tracking-wider uppercase font-semibold text-on-surface-variant" style={{ fontFamily: "'Geist', monospace", color: '#c3c6d7' }}>Audit Date</th>
                      <th className="px-6 py-3 text-xs tracking-wider uppercase font-semibold text-on-surface-variant" style={{ fontFamily: "'Geist', monospace", color: '#c3c6d7' }}>Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {filteredAudits.length === 0 ? (
                      <tr>
                        <td colSpan="4" className="px-6 py-10 text-center text-xs text-on-surface-variant">
                          No matching audits found.
                        </td>
                      </tr>
                    ) : (
                      filteredAudits.map((item, index) => (
                        <tr 
                          key={index} 
                          className="hover:bg-white/[0.02] transition-colors cursor-pointer"
                          onClick={() => navigate('/assets/AF-9088-QX')}
                        >
                          <td className="px-6 py-3.5 text-sm font-semibold text-on-surface">{item.name}</td>
                          <td className="px-6 py-3.5 text-sm text-on-surface-variant" style={{ color: '#c3c6d7' }}>{item.location}</td>
                          <td className="px-6 py-3.5 text-sm text-on-surface">{item.date}</td>
                          <td className="px-6 py-3.5">
                            <span 
                              className={`px-3 py-0.5 rounded-full text-[10px] font-bold uppercase border ${
                                item.status === 'Critical' 
                                  ? 'bg-red-500/10 text-red-400 border-red-500/20' 
                                  : item.status === 'Imminent'
                                  ? 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                                  : 'bg-white/5 text-on-surface-variant border-white/10'
                              }`}
                            >
                              {item.status}
                            </span>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Allocation Trend mock chart */}
            <div className="lg:col-span-2 glass-panel rounded-2xl p-6 card-top-highlight flex flex-col justify-between">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-base font-bold text-on-surface">Allocation Trends</h3>
                <div className="flex gap-2">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: '#b4c5ff' }} />
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: '#bec6e0' }} />
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: '#b9c7e0' }} />
                </div>
              </div>
              
              <div className="flex-grow min-h-[200px] relative mt-4">
                <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 px-2">
                  <div className="w-full bg-primary/20 rounded-t-lg h-[40%]" style={{ backgroundColor: 'rgba(180,197,255,0.2)', boxShadow: '0 -4px 12px rgba(180, 197, 255, 0.1)' }} />
                  <div className="w-full bg-primary/40 rounded-t-lg h-[65%]" style={{ backgroundColor: 'rgba(180,197,255,0.4)', boxShadow: '0 -4px 12px rgba(180, 197, 255, 0.2)' }} />
                  <div className="w-full bg-primary/20 rounded-t-lg h-[45%]" style={{ backgroundColor: 'rgba(180,197,255,0.2)', boxShadow: '0 -4px 12px rgba(180, 197, 255, 0.1)' }} />
                  <div className="w-full bg-primary/60 rounded-t-lg h-[85%]" style={{ backgroundColor: 'rgba(180,197,255,0.6)', boxShadow: '0 -4px 12px rgba(180, 197, 255, 0.3)' }} />
                  <div className="w-full bg-primary/40 rounded-t-lg h-[55%]" style={{ backgroundColor: 'rgba(180,197,255,0.4)', boxShadow: '0 -4px 12px rgba(180, 197, 255, 0.2)' }} />
                  <div className="w-full bg-primary/80 rounded-t-lg h-[95%]" style={{ backgroundColor: 'rgba(180,197,255,0.8)', boxShadow: '0 -4px 12px rgba(180, 197, 255, 0.4)' }} />
                </div>
                <div className="absolute inset-0 border-b border-l border-white/10" />
              </div>

              <div className="grid grid-cols-3 gap-4 mt-6 pt-4 border-t border-white/5">
                <div className="text-center">
                  <div className="text-[10px] font-bold text-on-surface-variant tracking-wider" style={{ fontFamily: "'Geist', monospace", color: '#c3c6d7' }}>EQUITIES</div>
                  <div className="text-base font-bold text-on-surface mt-1">42%</div>
                </div>
                <div className="text-center">
                  <div className="text-[10px] font-bold text-on-surface-variant tracking-wider" style={{ fontFamily: "'Geist', monospace", color: '#c3c6d7' }}>CRYPTO</div>
                  <div className="text-base font-bold text-on-surface mt-1">28%</div>
                </div>
                <div className="text-center">
                  <div className="text-[10px] font-bold text-on-surface-variant tracking-wider" style={{ fontFamily: "'Geist', monospace", color: '#c3c6d7' }}>REALTY</div>
                  <div className="text-base font-bold text-on-surface mt-1">30%</div>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Floating Quick Action FAB */}
        <button 
          onClick={() => toast.success('Quick action trigger: Adding new inventory tag…')}
          className="fixed bottom-6 right-6 w-14 h-14 bg-primary text-on-primary-fixed rounded-full shadow-2xl flex items-center justify-center hover:scale-105 active:scale-95 transition-all z-50 md:mb-0 mb-20 group cursor-pointer"
          style={{ backgroundColor: '#b4c5ff', color: '#00174b' }}
        >
          <span className="material-symbols-outlined text-[28px] group-hover:rotate-90 transition-transform duration-300">add</span>
        </button>

        {/* Assistant Floating Chat bar */}
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 w-full max-w-lg px-4 z-50 md:left-[calc(50%+140px)] mb-20 md:mb-0">
          <form 
            onSubmit={handleAssistantSend}
            className="glass-panel-heavy rounded-2xl p-2 flex items-center gap-3 border border-primary/20 shadow-2xl"
            style={{ borderColor: 'rgba(180,197,255,0.2)' }}
          >
            <div 
              className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center shadow-lg flex-shrink-0"
              style={{ backgroundColor: '#b4c5ff', color: '#00174b' }}
            >
              <span className="material-symbols-outlined text-lg">smart_toy</span>
            </div>
            <input 
              className="flex-1 bg-transparent border-none outline-none focus:ring-0 text-xs text-on-surface px-1 placeholder:text-on-surface-variant/40" 
              placeholder="Ask Assistant about portfolio risks..." 
              type="text"
              value={assistantText}
              onChange={e => setAssistantText(e.target.value)}
            />
            <button 
              type="submit"
              className="material-symbols-outlined text-primary hover:text-white p-2 cursor-pointer transition-colors"
              style={{ color: '#b4c5ff' }}
            >
              send
            </button>
          </form>
        </div>

        {/* Mobile Navigation Bar */}
        <nav 
          className="md:hidden fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-4 pb-4 pt-2 bg-surface/80 backdrop-blur-2xl border-t border-white/10"
          style={{ backgroundColor: 'rgba(17,19,27,0.8)' }}
        >
          <Link 
            to="/"
            className="flex flex-col items-center justify-center px-3 py-1 rounded-xl transition-colors text-primary bg-primary/10"
            style={{ color: '#b4c5ff' }}
          >
            <span className="material-symbols-outlined text-xl">dashboard</span>
            <span className="text-[10px] font-semibold" style={{ fontFamily: "'Geist', monospace" }}>Dashboard</span>
          </Link>
          
          <Link 
            to="/assets"
            className="flex flex-col items-center justify-center px-3 py-1 rounded-xl transition-colors text-on-surface-variant hover:text-primary"
          >
            <span className="material-symbols-outlined text-xl">account_balance_wallet</span>
            <span className="text-[10px] font-semibold" style={{ fontFamily: "'Geist', monospace" }}>Assets</span>
          </Link>
          
          <Link 
            to="/booking"
            className="flex flex-col items-center justify-center px-3 py-1 rounded-xl transition-colors text-on-surface-variant hover:text-primary"
          >
            <span className="material-symbols-outlined text-xl">calendar_month</span>
            <span className="text-[10px] font-semibold" style={{ fontFamily: "'Geist', monospace" }}>Scan</span>
          </Link>

          <Link 
            to="/assistant"
            className="flex flex-col items-center justify-center px-3 py-1 rounded-xl transition-colors text-on-surface-variant hover:text-primary"
          >
            <span className="material-symbols-outlined text-xl">smart_toy</span>
            <span className="text-[10px] font-semibold" style={{ fontFamily: "'Geist', monospace" }}>Assistant</span>
          </Link>
        </nav>
      </main>
    </div>
  );
}
