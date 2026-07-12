import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import toast from 'react-hot-toast';

export default function Departments() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDept, setSelectedDept] = useState('All');
  const [aiQuery, setAiQuery] = useState('');

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
    if (!aiQuery.trim()) return;
    toast.loading('Analyzing organization structure…', { id: 'ai' });
    setTimeout(() => {
      toast.success('Lumina: Directory is synchronized. All 149 active profile mappings are verified.', { id: 'ai', duration: 4000 });
      setAiQuery('');
    }, 1200);
  };

  // Mock employee roster
  const employees = [
    { name: 'Marcus Sterling', email: 'marcus.s@assetflow.com', dept: 'IT & Ops', displayDept: 'IT & Operations', role: 'Senior Systems Architect', status: 'Active', activeStatus: true, assets: 124, img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAReUgBkgb9jbwa3W1fHg7h8gWVR4V2h4BZ-HH_Vqt-T6uViOogKdv8OyXeCBNkXdnawUPWAmvXnvtL0Z0l9Z7ZAmfR5z3AoUSBGtE6siUuuc8WaPUaMUgaH79Uip63QaWJ4ZHYg2X-ynS3aSX0khY_HD75MdRjQsziQhbvzdpEahmoVgGp2r3CITNbww0UrqIFFSfuj3y5axSXqFDAJ_Gk9Ie7xxg-FgOmVl6kxQUPoYbJ1TXKYCSj' },
    { name: 'Elena Rodriguez', email: 'elena.r@assetflow.com', dept: 'Finance', displayDept: 'Finance', role: 'Global Audit Lead', status: 'Active', activeStatus: true, assets: 12, img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAdiGqIDFRVbyWaJl6pwx1SZFpPGFtY1xu8U3tzp-2jNkDWwa4Fu_zdybzPDGhNYCPG52_-CUy4DoKQPJqL68RNqaij3B0_xqvfqkeFMRfRIMDURm1zJsGTo7tO5SRh8U3jQfl0-eAk-S24tV7H2jMwnR5B1MDp6vLkdghSvGzJ4YxH56-fiDYNVQn7TnhEc5AVDfTT9vRmRHRJigRvYfDZrJeCaINsx0K16VqxJfUE0XNIzxQ2t3c2' },
    { name: 'Julian Chen', email: 'j.chen@assetflow.com', dept: 'HR', displayDept: 'Human Resources', role: 'Talent Acquisition', status: 'Out of Office', activeStatus: false, assets: 5, img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCRVXuyaEOODfQF8CqCzxEBObSjA0DW2RQ354qLgI9T6p8cpXGMz7DsIlyHc33KAvJa7Xvt_II--40jh9dbvqk6OYbIl_atcLXzOb66Ee2vVKH8hRo0FVqFSJs0qYz6_RPzDmzktRpzIsfh-LtV0SiSNWvJFEWINd9YTMUtwjvSrHIuoACIJ0Ni4_BveFTY5bmdz86BdfvKzj_kVh3271-iZPybxTViUc0eAvODiqtJp12MuPWi4IBd' },
    { name: 'Sarah Jenkins', email: 'sarah.j@assetflow.com', dept: 'Engineering', displayDept: 'Engineering', role: 'Field Technician', status: 'On-site', activeStatus: true, assets: 428, img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA-_Lxw1Mnfsv8y2Xh7kZSdarQjVMnFQa2d0cJiMM4wldayQW2FPMlGrbi9OHz8a4otTKBAAPjV6BqDgIPtOSSNPc7VNMYpkUZo3Y09xcZHWC7Bs1a6psA98Ke06KSp7PmftlMOXPMjHNmEGDMIt9M4MxBJwmWjvP4Ty6qqXommKIoTJykzQrhXxOQooXTeGWx4nhoa1gwm2XAM0p3xl-Y-wlq6qN8gqYuZsnu25p-pGmF4SY2uVz4-' }
  ];

  // Filtering based on search query and selected department card
  const filteredEmployees = employees.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCard = selectedDept === 'All' || item.displayDept === selectedDept;
    return matchesSearch && matchesCard;
  });

  return (
    <div 
      className="bg-[#0F172A] text-on-surface font-body-sm antialiased overflow-hidden h-screen flex w-full"
      style={{ color: '#e1e2ed', fontFamily: "'Inter', sans-serif" }}
    >
      <style>{`
        .glass-card {
          backdrop-filter: blur(12px);
          background: rgba(30, 41, 59, 0.5);
          border: 1px solid rgba(255, 255, 255, 0.05);
          border-top: 1px solid rgba(255, 255, 255, 0.1);
        }
        .active-glow {
          box-shadow: 0 0 15px rgba(180, 197, 255, 0.1);
        }
      `}</style>

      {/* Sidebar Navigation */}
      <aside className="fixed left-0 top-0 h-full w-[280px] bg-surface-container/50 backdrop-blur-xl border-r border-white/5 shadow-xl flex flex-col py-6 z-50 flex-shrink-0">
        <div className="px-6 mb-10 text-left">
          <div className="text-xl font-bold text-primary" style={{ color: '#b4c5ff' }}>AssetFlow</div>
          <div className="text-xs text-on-surface-variant opacity-60" style={{ color: '#c3c6d7' }}>Enterprise EAM</div>
        </div>

        <nav className="flex-grow px-3 space-y-1 text-left overflow-y-auto">
          <Link 
            to="/" 
            className="flex items-center gap-4 px-4 py-2.5 rounded-lg text-on-surface-variant hover:bg-white/5 transition-colors text-sm font-semibold"
            style={{ color: '#c3c6d7' }}
          >
            <span className="material-symbols-outlined text-lg">dashboard</span>
            Dashboard
          </Link>
          <Link 
            to="/assets" 
            className="flex items-center gap-4 px-4 py-2.5 rounded-lg text-on-surface-variant hover:bg-white/5 transition-colors text-sm font-semibold"
            style={{ color: '#c3c6d7' }}
          >
            <span className="material-symbols-outlined text-lg">inventory_2</span>
            Assets
          </Link>
          <Link 
            to="/booking" 
            className="flex items-center gap-4 px-4 py-2.5 rounded-lg text-on-surface-variant hover:bg-white/5 transition-colors text-sm font-semibold"
            style={{ color: '#c3c6d7' }}
          >
            <span className="material-symbols-outlined text-lg">calendar_month</span>
            Reservations
          </Link>
          <Link 
            to="/assistant" 
            className="flex items-center gap-4 px-4 py-2.5 rounded-lg text-on-surface-variant hover:bg-white/5 transition-colors text-sm font-semibold"
            style={{ color: '#c3c6d7' }}
          >
            <span className="material-symbols-outlined text-lg">smart_toy</span>
            Assistant
          </Link>
          <Link 
            to="/organization/departments" 
            className="flex items-center gap-4 px-4 py-2.5 text-primary bg-primary/10 border-l-4 border-primary transition-all text-sm font-semibold"
            style={{ color: '#b4c5ff' }}
          >
            <span className="material-symbols-outlined text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>corporate_fare</span>
            Organization
          </Link>
          <Link 
            to="/maintenance" 
            className="flex items-center gap-4 px-4 py-2.5 rounded-lg text-on-surface-variant hover:bg-white/5 transition-colors text-sm font-semibold"
            style={{ color: '#c3c6d7' }}
          >
            <span className="material-symbols-outlined text-lg">engineering</span>
            Maintenance
          </Link>
          <Link 
            to="/sustainability" 
            className="flex items-center gap-4 px-4 py-2.5 rounded-lg text-on-surface-variant hover:bg-white/5 transition-colors text-sm font-semibold"
            style={{ color: '#c3c6d7' }}
          >
            <span className="material-symbols-outlined text-lg">eco</span>
            Sustainability
          </Link>
          <Link 
            to="/audit" 
            className="flex items-center gap-4 px-4 py-2.5 rounded-lg text-on-surface-variant hover:bg-white/5 transition-colors text-sm font-semibold"
            style={{ color: '#c3c6d7' }}
          >
            <span className="material-symbols-outlined text-lg">verified_user</span>
            Audit &amp; Compliance
          </Link>
        </nav>

        <div className="mt-auto px-3 pt-6 border-t border-white/5 space-y-1 text-left">
          <button 
            onClick={() => toast.success('Enterprise configuration profiles')}
            className="w-full flex items-center gap-4 px-4 py-2.5 text-on-surface-variant hover:bg-white/5 transition-colors text-sm font-semibold text-left cursor-pointer"
            style={{ color: '#c3c6d7' }}
          >
            <span className="material-symbols-outlined text-lg">settings</span>
            Settings
          </button>
          <button 
            onClick={handleLogout}
            className="w-full flex items-center gap-4 px-4 py-2.5 text-on-surface-variant hover:bg-white/5 transition-colors text-sm font-semibold text-left cursor-pointer"
            style={{ color: '#c3c6d7' }}
          >
            <span className="material-symbols-outlined text-lg">logout</span>
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content Shell */}
      <main className="ml-[280px] min-h-screen relative overflow-y-auto h-screen flex-1 w-full">
        {/* Top App Bar */}
        <header className="fixed top-0 right-0 w-[calc(100%-280px)] h-16 bg-surface/30 backdrop-blur-md border-b border-white/5 flex justify-between items-center px-6 z-40">
          <div className="flex items-center gap-6 flex-1 text-left">
            <div className="relative w-full max-w-md">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-sm" style={{ color: '#c3c6d7' }}>search</span>
              <input 
                className="w-full bg-surface-container-high/50 border-none rounded-lg pl-10 pr-4 py-1.5 text-xs focus:ring-1 focus:ring-primary/50 text-on-surface bg-[#1d1f27]" 
                placeholder="Search roster directory..." 
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <button className="material-symbols-outlined text-on-surface-variant hover:text-on-surface transition-colors" style={{ color: '#c3c6d7' }}>notifications</button>
            <button className="material-symbols-outlined text-on-surface-variant hover:text-on-surface transition-colors" style={{ color: '#c3c6d7' }}>history</button>
            <button className="material-symbols-outlined text-on-surface-variant hover:text-on-surface transition-colors" style={{ color: '#c3c6d7' }}>chat_bubble</button>
            <div className="w-px h-6 bg-white/10 mx-1" />
            <div className="flex items-center gap-2 cursor-pointer active:opacity-80">
              <img 
                className="w-8 h-8 rounded-full border border-white/10 object-cover" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAvieihBX9x5o3OQj7-TR-Ly-ps3xoY0Txru6xanX7b8Zv28Oy6YunbFXwy5fFY0ZZjW2wv4-fJccZ-RWCa3iKrymVoo3yfcBSc7iLV6W95Ep_VM2dbsBs6H4UTp46Ce-4bhq_JM95_RGBrv4lT-PEDUbDiYSWUseVAmEOuLUzzBD2AhHW4KO8yPgE7jJPkboOYuXVvxMXGTfJnfLz4S-svyIZnB7vq2B4G1uInq3QpzZdxLbXvvon6"
                alt="Executive User"
              />
            </div>
          </div>
        </header>

        {/* Content Area */}
        <div className="pt-24 pb-24 px-6 space-y-6 max-w-[1440px] mx-auto text-left">
          
          {/* Page Header */}
          <div className="flex justify-between items-end border-b border-white/5 pb-4">
            <div>
              <h1 className="text-2xl font-bold text-on-surface">Organization Directory</h1>
              <p className="text-on-surface-variant text-xs mt-1" style={{ color: '#c3c6d7' }}>Manage enterprise structure, departments, and personnel mapping.</p>
            </div>
            
            <button 
              onClick={() => toast.success('Mock action: Adding new personnel profile tag…')}
              className="bg-primary text-on-primary px-5 py-2.5 rounded-lg text-xs font-bold flex items-center gap-1.5 hover:opacity-90 active:scale-95 transition-all cursor-pointer"
              style={{ backgroundColor: '#b4c5ff', color: '#00174b' }}
            >
              <span className="material-symbols-outlined text-base">person_add</span>
              New Profile
            </button>
          </div>

          {/* Department Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* HR Card */}
            <div 
              onClick={() => setSelectedDept(selectedDept === 'Human Resources' ? 'All' : 'Human Resources')}
              className={`glass-card p-5 rounded-xl flex flex-col justify-between group hover:border-primary/20 transition-all cursor-pointer ${selectedDept === 'Human Resources' ? 'border-primary/40 active-glow bg-primary/5' : ''}`}
            >
              <div className="flex justify-between items-start mb-4">
                <div className="p-2 bg-secondary-container rounded-lg" style={{ backgroundColor: '#3f465c' }}>
                  <span className="material-symbols-outlined text-primary text-lg" style={{ color: '#b4c5ff' }}>groups</span>
                </div>
                <span className="text-xs font-bold text-primary font-mono" style={{ color: '#b4c5ff' }}>+12%</span>
              </div>
              <div>
                <h3 className="text-base font-bold mb-1">Human Resources</h3>
                <div className="flex gap-2 text-on-surface-variant text-xs" style={{ color: '#c3c6d7' }}>
                  <span>42 Employees</span>
                  <span className="opacity-20">•</span>
                  <span>156 Assets</span>
                </div>
              </div>
            </div>

            {/* IT Card */}
            <div 
              onClick={() => setSelectedDept(selectedDept === 'IT & Operations' ? 'All' : 'IT & Operations')}
              className={`glass-card p-5 rounded-xl flex flex-col justify-between group hover:border-primary/20 transition-all cursor-pointer ${selectedDept === 'IT & Operations' ? 'border-primary/40 active-glow bg-primary/5' : ''}`}
            >
              <div className="flex justify-between items-start mb-4">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <span className="material-symbols-outlined text-primary text-lg" style={{ color: '#b4c5ff' }}>terminal</span>
                </div>
                <span className="text-xs font-bold text-primary font-mono" style={{ color: '#b4c5ff' }}>+8%</span>
              </div>
              <div>
                <h3 className="text-base font-bold mb-1">IT &amp; Operations</h3>
                <div className="flex gap-2 text-on-surface-variant text-xs" style={{ color: '#c3c6d7' }}>
                  <span>28 Employees</span>
                  <span className="opacity-20">•</span>
                  <span>1,420 Assets</span>
                </div>
              </div>
            </div>

            {/* Finance Card */}
            <div 
              onClick={() => setSelectedDept(selectedDept === 'Finance' ? 'All' : 'Finance')}
              className={`glass-card p-5 rounded-xl flex flex-col justify-between group hover:border-primary/20 transition-all cursor-pointer ${selectedDept === 'Finance' ? 'border-primary/40 active-glow bg-primary/5' : ''}`}
            >
              <div className="flex justify-between items-start mb-4">
                <div className="p-2 bg-secondary-container rounded-lg" style={{ backgroundColor: '#3f465c' }}>
                  <span className="material-symbols-outlined text-primary text-lg" style={{ color: '#b4c5ff' }}>account_balance</span>
                </div>
                <span className="text-xs font-bold text-on-surface-variant font-mono" style={{ color: '#c3c6d7' }}>0%</span>
              </div>
              <div>
                <h3 className="text-base font-bold mb-1">Finance</h3>
                <div className="flex gap-2 text-on-surface-variant text-xs" style={{ color: '#c3c6d7' }}>
                  <span>15 Employees</span>
                  <span className="opacity-20">•</span>
                  <span>89 Assets</span>
                </div>
              </div>
            </div>

            {/* Engineering Card */}
            <div 
              onClick={() => setSelectedDept(selectedDept === 'Engineering' ? 'All' : 'Engineering')}
              className={`glass-card p-5 rounded-xl flex flex-col justify-between group hover:border-primary/20 transition-all cursor-pointer ${selectedDept === 'Engineering' ? 'border-primary/40 active-glow bg-primary/5' : ''}`}
            >
              <div className="flex justify-between items-start mb-4">
                <div className="p-2 bg-secondary-container rounded-lg" style={{ backgroundColor: '#3f465c' }}>
                  <span className="material-symbols-outlined text-primary text-lg" style={{ color: '#b4c5ff' }}>precision_manufacturing</span>
                </div>
                <span className="text-xs font-bold text-primary font-mono" style={{ color: '#b4c5ff' }}>+5%</span>
              </div>
              <div>
                <h3 className="text-base font-bold mb-1">Engineering</h3>
                <div className="flex gap-2 text-on-surface-variant text-xs" style={{ color: '#c3c6d7' }}>
                  <span>64 Employees</span>
                  <span className="opacity-20">•</span>
                  <span>842 Assets</span>
                </div>
              </div>
            </div>
          </div>

          {/* Employee Roster Table */}
          <div className="glass-card rounded-xl overflow-hidden">
            <div className="p-5 border-b border-white/5 flex justify-between items-center bg-white/2">
              <h2 className="text-base font-bold">Employee Roster {selectedDept !== 'All' ? `(${selectedDept} only)` : ''}</h2>
              <div className="flex gap-2">
                <button 
                  onClick={() => toast.success('Filter configurations loaded')}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-[#1d1f27] rounded-lg text-xs border border-white/5 hover:bg-surface-variant transition-colors cursor-pointer"
                >
                  <span className="material-symbols-outlined text-xs">filter_list</span>
                  Filter
                </button>
                <button 
                  onClick={() => toast.success('Downloading directory ledger CSV…')}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-[#1d1f27] rounded-lg text-xs border border-white/5 hover:bg-surface-variant transition-colors cursor-pointer"
                >
                  <span className="material-symbols-outlined text-xs">download</span>
                  Export
                </button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-white/2 border-b border-white/5">
                    <th className="px-6 py-3 text-xs tracking-wider uppercase font-semibold text-on-surface-variant" style={{ fontFamily: "'Geist', monospace", color: '#c3c6d7' }}>Employee</th>
                    <th className="px-6 py-3 text-xs tracking-wider uppercase font-semibold text-on-surface-variant" style={{ fontFamily: "'Geist', monospace", color: '#c3c6d7' }}>Department</th>
                    <th className="px-6 py-3 text-xs tracking-wider uppercase font-semibold text-on-surface-variant" style={{ fontFamily: "'Geist', monospace", color: '#c3c6d7' }}>Role</th>
                    <th className="px-6 py-3 text-xs tracking-wider uppercase font-semibold text-on-surface-variant" style={{ fontFamily: "'Geist', monospace", color: '#c3c6d7' }}>Status</th>
                    <th className="px-6 py-3 text-xs tracking-wider uppercase font-semibold text-on-surface-variant text-right" style={{ fontFamily: "'Geist', monospace", color: '#c3c6d7' }}>Managed Assets</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {filteredEmployees.length === 0 ? (
                    <tr>
                      <td colSpan="5" className="px-6 py-10 text-center text-xs text-on-surface-variant">
                        No employees found matching query.
                      </td>
                    </tr>
                  ) : (
                    filteredEmployees.map((emp, index) => (
                      <tr 
                        key={index} 
                        onClick={() => toast.success(`Viewing logs for ${emp.name}`)}
                        className="hover:bg-white/2 transition-colors cursor-pointer group"
                      >
                        <td className="px-6 py-3.5">
                          <div className="flex items-center gap-3">
                            <img className="w-10 h-10 rounded-lg object-cover bg-surface-container border border-white/5" src={emp.img} alt={emp.name} />
                            <div className="text-left">
                              <div className="text-sm font-semibold text-on-surface">{emp.name}</div>
                              <div className="text-xs text-on-surface-variant" style={{ color: '#c3c6d7' }}>{emp.email}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-3.5">
                          <span className="px-2 py-0.5 bg-primary/10 text-primary rounded text-xs font-semibold" style={{ color: '#b4c5ff' }}>{emp.dept}</span>
                        </td>
                        <td className="px-6 py-3.5 text-sm text-on-surface-variant" style={{ color: '#c3c6d7' }}>{emp.role}</td>
                        <td className="px-6 py-3.5">
                          <div className={`flex items-center gap-1.5 text-xs ${emp.activeStatus ? 'text-primary' : 'text-on-surface-variant'}`} style={{ color: emp.activeStatus ? '#b4c5ff' : '#c3c6d7' }}>
                            <span className={`w-1.5 h-1.5 rounded-full ${emp.activeStatus ? 'bg-primary animate-pulse' : 'bg-outline'}`} style={{ backgroundColor: emp.activeStatus ? '#b4c5ff' : '#8d90a0' }} />
                            {emp.status}
                          </div>
                        </td>
                        <td className="px-6 py-3.5 text-right font-mono text-sm text-on-surface">{emp.assets}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="p-5 border-t border-white/5 flex justify-between items-center bg-white/2">
              <div className="text-xs text-on-surface-variant" style={{ color: '#c3c6d7' }}>
                Showing {filteredEmployees.length} of 149 employees (Click summary cards to filter list)
              </div>
              <div className="flex gap-1">
                <button className="w-8 h-8 flex items-center justify-center rounded border border-white/5 hover:bg-white/5 text-xs cursor-pointer"><span className="material-symbols-outlined text-sm">chevron_left</span></button>
                <button className="w-8 h-8 flex items-center justify-center rounded border border-primary bg-primary/10 text-primary font-bold text-xs" style={{ color: '#b4c5ff', borderColor: '#b4c5ff' }}>1</button>
                <button className="w-8 h-8 flex items-center justify-center rounded border border-white/5 hover:bg-white/5 text-xs">2</button>
                <button className="w-8 h-8 flex items-center justify-center rounded border border-white/5 hover:bg-white/5 text-xs">3</button>
                <button className="w-8 h-8 flex items-center justify-center rounded border border-white/5 hover:bg-white/5 text-xs cursor-pointer"><span className="material-symbols-outlined text-sm">chevron_right</span></button>
              </div>
            </div>
          </div>
        </div>

        {/* AI Assistant Floating Input */}
        <div className="fixed bottom-6 right-6 w-80 glass-card rounded-xl p-4 shadow-2xl z-50 border-primary/20 bg-[#1e2029]">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center" style={{ backgroundColor: '#b4c5ff', color: '#00174b' }}>
              <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>smart_toy</span>
            </div>
            <div className="text-xs font-bold">Assistant</div>
            <div className="ml-auto w-2.5 h-2.5 rounded-full bg-primary animate-ping" style={{ backgroundColor: '#b4c5ff' }} />
          </div>
          
          <form onSubmit={handleAiSend} className="relative">
            <input 
              className="w-full bg-surface-container-highest/50 border-none rounded-lg pr-10 pl-3 py-2 text-xs focus:ring-1 focus:ring-primary/50 text-on-surface bg-[#1d1f27] outline-none" 
              placeholder="Ask about the directory..." 
              type="text"
              value={aiQuery}
              onChange={e => setAiQuery(e.target.value)}
            />
            <button type="submit" className="material-symbols-outlined absolute right-2 top-1/2 -translate-y-1/2 text-primary cursor-pointer" style={{ color: '#b4c5ff' }}>
              send
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}
