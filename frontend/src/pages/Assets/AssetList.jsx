import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import toast from 'react-hot-toast';

export default function AssetList() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('All Departments');
  const [statusFilter, setStatusFilter] = useState('Status: All');
  const [healthFilter, setHealthFilter] = useState('Health Score > 50%');
  const [selectedRow, setSelectedRow] = useState(null);

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

  const handleRowDoubleClick = (id) => {
    const formattedId = id.replace('#', '');
    navigate(`/assets/${formattedId}`);
    toast.success(`Redirecting to telemetry logs for ${id}`);
  };

  // Mock initial items
  const [assets, setAssets] = useState([
    { id: '#AS-99210', name: 'Core Switch Nexus-01', category: 'Infrastructure', department: 'Global Logistics', status: 'Active', health: 94, icon: 'dns', lastActivity: '2 mins ago', iconColor: '#b4c5ff', bgIcon: 'rgba(37,99,235,0.1)' },
    { id: '#AS-88124', name: 'Precision Workstation X1', category: 'Hardware', department: 'R&D Engineering', status: 'Maintenance', health: 42, icon: 'laptop_mac', lastActivity: '1 hour ago', iconColor: '#ffb4ab', bgIcon: 'rgba(255,180,171,0.1)' },
    { id: '#AS-77520', name: 'Transaction Hub SQL', category: 'Storage', department: 'Corporate Finance', status: 'Retired', health: 0, icon: 'database', lastActivity: '12 days ago', iconColor: '#bec6e0', bgIcon: 'rgba(190,198,224,0.1)' },
    { id: '#AS-99554', name: 'Edge Gateway Primary', category: 'Networking', department: 'Infrastructure', status: 'Active', health: 88, icon: 'router', lastActivity: 'Just now', iconColor: '#b4c5ff', bgIcon: 'rgba(37,99,235,0.1)' }
  ]);

  // Filter conditions
  const filteredAssets = assets.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.category.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesDept = departmentFilter === 'All Departments' || item.department === departmentFilter;
    
    let matchesStatus = true;
    if (statusFilter === 'Active') matchesStatus = item.status === 'Active';
    else if (statusFilter === 'Maintenance') matchesStatus = item.status === 'Maintenance';
    else if (statusFilter === 'Retired') matchesStatus = item.status === 'Retired';

    let matchesHealth = true;
    if (healthFilter === 'Health Score > 80%') matchesHealth = item.health > 80;
    else if (healthFilter === 'Health Score > 50%') matchesHealth = item.health > 50;
    else if (healthFilter === 'Critical Only') matchesHealth = item.health <= 50;

    return matchesSearch && matchesDept && matchesStatus && matchesHealth;
  });

  return (
    <div 
      className="bg-background text-on-surface font-body-lg overflow-hidden h-screen flex w-full"
      style={{ backgroundColor: '#11131b', color: '#e1e2ed', fontFamily: "'Inter', sans-serif" }}
    >
      <style>{`
        .glass-card {
          backdrop-filter: blur(12px);
          background: rgba(30, 41, 59, 0.5);
          border: 1px solid rgba(255, 255, 255, 0.05);
          box-shadow: inset 0 1px 1px rgba(255, 255, 255, 0.05);
        }
        .glass-input {
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.1);
        }
        .glass-input:focus {
          background: rgba(255, 255, 255, 0.07);
          border-color: #b4c5ff;
          outline: none;
          box-shadow: 0 0 0 2px rgba(180, 197, 255, 0.1);
        }
      `}</style>

      {/* Navigation Drawer (SideNav for Desktop) */}
      <aside className="fixed inset-y-0 left-0 z-[60] h-full w-[280px] bg-surface-container-low/95 backdrop-blur-2xl border-r border-white/5 shadow-xl transition-transform duration-300 ease-in-out hidden md:flex flex-col flex-shrink-0">
        <div className="p-6 flex items-center space-x-3 mb-2">
          <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center text-on-primary" style={{ backgroundColor: '#2563eb' }}>
            <span className="material-symbols-outlined text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>account_balance_wallet</span>
          </div>
          <span className="text-xl font-bold text-primary" style={{ color: '#b4c5ff' }}>AssetFlow</span>
        </div>

        <div className="px-4 mb-6">
          <div className="flex items-center space-x-4 p-4 rounded-xl bg-white/5 border border-white/5">
            <div className="w-12 h-12 rounded-full overflow-hidden bg-surface-container-highest">
              <img 
                className="w-full h-full object-cover" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAIdeE-W61NSNX5FcXNtBWQE-MPhax119IAbc6wdyC_-RWEqMFlGO9PXFKdKV50z54rPRGx_KYXe_293Hu5m5kKB56eziqdhfPiFT2LZQ05Z8BUaOACQOj_35YsRmmEf0RU-CTdz_U01tG1FmcI9RByl58-NPhzV-GYUJ4Fu9RXjFaTAlPEDWzFbJJjXdnLE2pBzKXieuuxpw8M0ootKE1plhMefxANzXBW-hcqwoe-vUnHAU9i1hnz"
                alt="Manager Profile"
              />
            </div>
            <div className="flex flex-col text-left overflow-hidden">
              <span className="text-sm font-bold text-on-surface truncate">Investment Portfolio</span>
              <span className="text-xs text-on-surface-variant" style={{ color: '#c3c6d7' }}>Premium Account</span>
            </div>
          </div>
        </div>

        <nav className="flex-grow px-3 space-y-1 text-left overflow-y-auto">
          <Link 
            to="/" 
            className="flex items-center px-4 py-2.5 text-on-surface-variant hover:bg-white/5 hover:text-on-surface rounded-lg transition-all text-sm font-semibold"
            style={{ color: '#c3c6d7' }}
          >
            <span className="material-symbols-outlined mr-4">dashboard</span>
            Dashboard
          </Link>
          <Link 
            to="/assets" 
            className="flex items-center px-4 py-2.5 text-primary font-bold bg-primary/10 border-l-4 border-primary transition-all text-sm"
            style={{ color: '#b4c5ff' }}
          >
            <span className="material-symbols-outlined mr-4" style={{ fontVariationSettings: "'FILL' 1" }}>account_balance_wallet</span>
            Assets
          </Link>
          <Link 
            to="/booking" 
            className="flex items-center px-4 py-2.5 text-on-surface-variant hover:bg-white/5 hover:text-on-surface rounded-lg transition-all text-sm font-semibold"
            style={{ color: '#c3c6d7' }}
          >
            <span className="material-symbols-outlined mr-4">calendar_month</span>
            Reservations
          </Link>
          <Link 
            to="/assistant" 
            className="flex items-center px-4 py-2.5 text-on-surface-variant hover:bg-white/5 hover:text-on-surface rounded-lg transition-all text-sm font-semibold"
            style={{ color: '#c3c6d7' }}
          >
            <span className="material-symbols-outlined mr-4">smart_toy</span>
            Assistant
          </Link>
          <Link 
            to="/organization/departments" 
            className="flex items-center px-4 py-2.5 text-on-surface-variant hover:bg-white/5 hover:text-on-surface rounded-lg transition-all text-sm font-semibold"
            style={{ color: '#c3c6d7' }}
          >
            <span className="material-symbols-outlined mr-4">corporate_fare</span>
            Organization
          </Link>
          <Link 
            to="/maintenance" 
            className="flex items-center px-4 py-2.5 text-on-surface-variant hover:bg-white/5 hover:text-on-surface rounded-lg transition-all text-sm font-semibold"
            style={{ color: '#c3c6d7' }}
          >
            <span className="material-symbols-outlined mr-4">engineering</span>
            Maintenance
          </Link>
          <Link 
            to="/sustainability" 
            className="flex items-center px-4 py-2.5 text-on-surface-variant hover:bg-white/5 hover:text-on-surface rounded-lg transition-all text-sm font-semibold"
            style={{ color: '#c3c6d7' }}
          >
            <span className="material-symbols-outlined mr-4">eco</span>
            Sustainability
          </Link>
          <Link 
            to="/audit" 
            className="flex items-center px-4 py-2.5 text-on-surface-variant hover:bg-white/5 hover:text-on-surface rounded-lg transition-all text-sm font-semibold"
            style={{ color: '#c3c6d7' }}
          >
            <span className="material-symbols-outlined mr-4">verified_user</span>
            Audit &amp; Compliance
          </Link>
        </nav>

        <div className="p-6 space-y-1 border-t border-white/5 text-left">
          <button 
            onClick={handleLogout}
            className="w-full flex items-center px-4 py-3 text-on-surface-variant hover:bg-white/5 rounded-lg transition-all text-sm font-semibold text-left cursor-pointer"
            style={{ color: '#c3c6d7' }}
          >
            <span className="material-symbols-outlined">logout</span>
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="md:ml-[280px] h-screen flex flex-col relative flex-1">
        {/* Top App Bar */}
        <header className="fixed top-0 md:left-[280px] right-0 z-50 h-16 flex justify-between items-center px-6 bg-surface/50 backdrop-blur-xl border-b border-white/5 shadow-sm">
          <div className="flex items-center gap-3">
            <span className="text-base font-bold text-primary" style={{ color: '#b4c5ff' }}>Inventory Overview</span>
            <span className="text-[10px] font-bold tracking-widest font-mono bg-primary/10 text-primary px-2.5 py-0.5 rounded uppercase" style={{ color: '#b4c5ff' }}>
              Live Data
            </span>
          </div>
          
          <div className="flex items-center gap-6">
            <div className="relative hidden sm:block">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-sm" style={{ color: '#c3c6d7' }}>search</span>
              <input 
                className="glass-input h-9 w-64 rounded-full pl-10 pr-4 text-xs text-on-surface focus:w-80 transition-all duration-300" 
                placeholder="Global search..." 
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
              />
            </div>
            
            <button 
              onClick={() => toast.success('Checking active diagnostic warnings…')}
              className="w-10 h-10 rounded-full flex items-center justify-center text-on-surface-variant hover:bg-white/5 transition-all cursor-pointer"
            >
              <span className="material-symbols-outlined" style={{ color: '#c3c6d7' }}>notifications</span>
            </button>
            <div className="w-8 h-8 rounded-full overflow-hidden bg-primary-container flex items-center justify-center">
              <img 
                className="w-full h-full object-cover" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBwYhsIYc9lkhBtJfZWwgun_bRlzO9TzNoQGnR_4LNNXDyuTMOvb_GKmwS9JCm4BaShKwkhxU2c9eRju7VGCo4a4KSEBnsixv9YOHnIgW7e-kXrtPMvYvrjH9OkbrFCvLPRwUCHoWd51aAB8QG6YJZY-g9dye5uMi0Qc7sNRLnPiNjQ91JIBWAgbGASwkJ65Rk37UsY9y3IKytToiNXVQ065V2GJWhCgNCIqBRDHFSYUeYr6e2WE8au" 
                alt="Avatar"
              />
            </div>
          </div>
        </header>

        {/* Main Content Scrollable Area */}
        <section className="mt-16 p-6 flex-1 overflow-y-auto pb-24 text-left">
          
          {/* Bento Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="glass-card p-5 rounded-xl">
              <div className="flex justify-between items-start mb-2">
                <span className="text-[10px] font-semibold text-on-surface-variant uppercase tracking-wider" style={{ fontFamily: "'Geist', monospace", color: '#c3c6d7' }}>Total Assets</span>
                <span className="material-symbols-outlined text-primary" style={{ color: '#b4c5ff' }}>analytics</span>
              </div>
              <div className="text-3xl font-bold text-primary" style={{ color: '#b4c5ff' }}>1,284</div>
              <div className="flex items-center text-green-400 text-xs mt-1.5 font-semibold">
                <span className="material-symbols-outlined text-sm mr-1">trending_up</span> +12% vs last month
              </div>
            </div>

            <div className="glass-card p-5 rounded-xl">
              <div className="flex justify-between items-start mb-2">
                <span className="text-[10px] font-semibold text-on-surface-variant uppercase tracking-wider" style={{ fontFamily: "'Geist', monospace", color: '#c3c6d7' }}>Active Units</span>
                <span className="material-symbols-outlined text-primary" style={{ color: '#b4c5ff' }}>check_circle</span>
              </div>
              <div className="text-3xl font-bold text-on-surface">1,142</div>
              <div className="text-on-surface-variant text-xs mt-1.5 font-medium" style={{ color: '#c3c6d7' }}>89% Operational Efficiency</div>
            </div>

            <div className="glass-card p-5 rounded-xl">
              <div className="flex justify-between items-start mb-2">
                <span className="text-[10px] font-semibold text-on-surface-variant uppercase tracking-wider" style={{ fontFamily: "'Geist', monospace", color: '#c3c6d7' }}>Under Maintenance</span>
                <span className="material-symbols-outlined text-primary" style={{ color: '#b4c5ff' }}>construction</span>
              </div>
              <div className="text-3xl font-bold text-on-surface">94</div>
              <div className="flex items-center text-amber-400 text-xs mt-1.5 font-semibold">
                <span className="material-symbols-outlined text-sm mr-1">warning</span> 5 Urgent Repairs
              </div>
            </div>

            <div className="glass-card p-5 rounded-xl">
              <div className="flex justify-between items-start mb-2">
                <span className="text-[10px] font-semibold text-on-surface-variant uppercase tracking-wider" style={{ fontFamily: "'Geist', monospace", color: '#c3c6d7' }}>Network Health</span>
                <span className="material-symbols-outlined text-primary" style={{ color: '#b4c5ff' }}>memory</span>
              </div>
              <div className="text-3xl font-bold text-on-surface">98.4%</div>
              <div className="w-full bg-white/5 h-1.5 rounded-full mt-3 overflow-hidden">
                <div className="bg-primary h-full w-[98.4%]" style={{ backgroundColor: '#b4c5ff' }} />
              </div>
            </div>
          </div>

          {/* Filters and Actions */}
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-6">
            <div className="flex flex-wrap items-center gap-2">
              <div className="relative">
                <select 
                  value={departmentFilter}
                  onChange={e => setDepartmentFilter(e.target.value)}
                  className="glass-input h-10 pl-4 pr-10 rounded-lg text-xs text-on-surface appearance-none cursor-pointer bg-[#1d1f27]"
                >
                  <option value="All Departments">All Departments</option>
                  <option value="R&D Engineering">R&D Engineering</option>
                  <option value="Corporate Finance">Corporate Finance</option>
                  <option value="Global Logistics">Global Logistics</option>
                </select>
                <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-on-surface-variant" style={{ color: '#c3c6d7' }}>keyboard_arrow_down</span>
              </div>
              
              <div className="relative">
                <select 
                  value={statusFilter}
                  onChange={e => setStatusFilter(e.target.value)}
                  className="glass-input h-10 pl-4 pr-10 rounded-lg text-xs text-on-surface appearance-none cursor-pointer bg-[#1d1f27]"
                >
                  <option value="Status: All">Status: All</option>
                  <option value="Active">Active</option>
                  <option value="Maintenance">Maintenance</option>
                  <option value="Retired">Retired</option>
                </select>
                <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-on-surface-variant" style={{ color: '#c3c6d7' }}>keyboard_arrow_down</span>
              </div>

              <div className="relative">
                <select 
                  value={healthFilter}
                  onChange={e => setHealthFilter(e.target.value)}
                  className="glass-input h-10 pl-4 pr-10 rounded-lg text-xs text-on-surface appearance-none cursor-pointer bg-[#1d1f27]"
                >
                  <option value="Health Score > 80%">Health Score &gt; 80%</option>
                  <option value="Health Score > 50%">Health Score &gt; 50%</option>
                  <option value="Critical Only">Critical Only</option>
                </select>
                <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-on-surface-variant" style={{ color: '#c3c6d7' }}>keyboard_arrow_down</span>
              </div>

              <button 
                onClick={() => toast.success('More advanced filter decks loaded')}
                className="h-10 px-4 rounded-lg glass-card text-on-surface hover:bg-white/10 flex items-center gap-2 text-xs transition-all active:scale-95 cursor-pointer"
              >
                <span className="material-symbols-outlined text-sm">filter_list</span> More Filters
              </button>
            </div>
            
            <button 
              onClick={() => toast.success('Mock Registration: Directing to QR labeling deck…')}
              className="h-10 px-6 bg-primary text-on-primary font-bold rounded-lg flex items-center gap-2 hover:brightness-110 active:scale-95 transition-all shadow-[0_0_15px_rgba(180,197,255,0.3)] cursor-pointer"
              style={{ backgroundColor: '#b4c5ff', color: '#00174b' }}
            >
              <span className="material-symbols-outlined text-base">add</span> Register New Asset
            </button>
          </div>

          {/* Wide Data Grid */}
          <div className="glass-card rounded-xl overflow-hidden border border-white/5">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-white/5">
                    <th className="px-6 py-4 text-xs font-semibold tracking-wider text-on-surface-variant uppercase" style={{ fontFamily: "'Geist', monospace", color: '#c3c6d7' }}>Asset ID</th>
                    <th className="px-6 py-4 text-xs font-semibold tracking-wider text-on-surface-variant uppercase" style={{ fontFamily: "'Geist', monospace", color: '#c3c6d7' }}>Asset Name</th>
                    <th className="px-6 py-4 text-xs font-semibold tracking-wider text-on-surface-variant uppercase" style={{ fontFamily: "'Geist', monospace", color: '#c3c6d7' }}>Category</th>
                    <th className="px-6 py-4 text-xs font-semibold tracking-wider text-on-surface-variant uppercase" style={{ fontFamily: "'Geist', monospace", color: '#c3c6d7' }}>Department</th>
                    <th className="px-6 py-4 text-xs font-semibold tracking-wider text-on-surface-variant uppercase" style={{ fontFamily: "'Geist', monospace", color: '#c3c6d7' }}>Status</th>
                    <th className="px-6 py-4 text-xs font-semibold tracking-wider text-on-surface-variant uppercase" style={{ fontFamily: "'Geist', monospace", color: '#c3c6d7' }}>Health Score</th>
                    <th className="px-6 py-4 text-xs font-semibold tracking-wider text-on-surface-variant uppercase" style={{ fontFamily: "'Geist', monospace", color: '#c3c6d7' }}>Last Activity</th>
                    <th className="px-6 py-4 text-xs font-semibold tracking-wider text-on-surface-variant uppercase text-right" style={{ fontFamily: "'Geist', monospace", color: '#c3c6d7' }}>Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {filteredAssets.length === 0 ? (
                    <tr>
                      <td colSpan="8" className="px-6 py-12 text-center text-xs text-on-surface-variant">
                        No assets found matching filters.
                      </td>
                    </tr>
                  ) : (
                    filteredAssets.map((item) => (
                      <tr 
                        key={item.id} 
                        onClick={() => setSelectedRow(item.id)}
                        onDoubleClick={() => handleRowDoubleClick(item.id)}
                        className={`hover:bg-white/5 transition-colors cursor-pointer ${selectedRow === item.id ? 'bg-primary/5' : ''}`}
                        title="Double-click to view detailed timeline logs"
                      >
                        <td className="px-6 py-4 text-sm font-semibold" style={{ fontFamily: "'Geist', monospace" }}>{item.id}</td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded flex items-center justify-center" style={{ backgroundColor: item.bgIcon, color: item.iconColor }}>
                              <span className="material-symbols-outlined text-sm">{item.icon}</span>
                            </div>
                            <span className="text-sm font-semibold">{item.name}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-on-surface-variant" style={{ color: '#c3c6d7' }}>{item.category}</td>
                        <td className="px-6 py-4 text-sm text-on-surface-variant" style={{ color: '#c3c6d7' }}>{item.department}</td>
                        <td className="px-6 py-4">
                          <span 
                            className={`px-3 py-0.5 rounded-full text-[10px] font-bold uppercase border flex items-center w-fit gap-1.5 ${
                              item.status === 'Active' 
                                ? 'bg-green-500/10 text-green-400 border-green-500/20' 
                                : item.status === 'Maintenance'
                                ? 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                                : 'bg-white/10 text-on-surface-variant border-white/10'
                            }`}
                          >
                            <span className={`w-1.5 h-1.5 rounded-full ${
                              item.status === 'Active' ? 'bg-green-400' : item.status === 'Maintenance' ? 'bg-amber-400' : 'bg-on-surface-variant'
                            }`} />
                            {item.status}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <div className="flex-1 w-24 bg-white/5 h-1.5 rounded-full overflow-hidden">
                              <div 
                                className={`h-full ${item.health > 80 ? 'bg-green-400' : item.health > 30 ? 'bg-amber-400' : 'bg-red-400'}`} 
                                style={{ width: `${item.health}%` }} 
                              />
                            </div>
                            <span className={`text-xs font-semibold ${item.health > 80 ? 'text-green-400' : item.health > 30 ? 'text-amber-400' : 'text-red-400'}`}>
                              {item.health}%
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-xs text-on-surface-variant" style={{ color: '#c3c6d7' }}>{item.lastActivity}</td>
                        <td className="px-6 py-4 text-right">
                          <button 
                            onClick={(e) => { e.stopPropagation(); handleRowDoubleClick(item.id); }}
                            className="p-2 text-on-surface-variant hover:text-primary transition-colors cursor-pointer text-xs font-semibold"
                          >
                            Inspect details
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
            
            {/* Pagination Controls */}
            <div className="px-6 py-4 bg-white/2 border-t border-white/5 flex justify-between items-center">
              <span className="text-xs text-on-surface-variant" style={{ color: '#c3c6d7' }}>Showing {filteredAssets.length} of {assets.length} assets (Double-click row to view full details)</span>
              <div className="flex items-center gap-2">
                <button className="w-8 h-8 rounded flex items-center justify-center glass-card hover:bg-white/10 text-on-surface-variant cursor-pointer">
                  <span className="material-symbols-outlined text-sm">chevron_left</span>
                </button>
                <button className="w-8 h-8 rounded flex items-center justify-center bg-primary text-on-primary font-bold" style={{ backgroundColor: '#b4c5ff', color: '#00174b' }}>1</button>
                <button className="w-8 h-8 rounded flex items-center justify-center glass-card hover:bg-white/10 text-xs font-semibold">2</button>
                <button className="w-8 h-8 rounded flex items-center justify-center glass-card hover:bg-white/10 text-xs font-semibold">3</button>
                <span className="text-on-surface-variant px-1 text-xs">...</span>
                <button className="w-8 h-8 rounded flex items-center justify-center glass-card hover:bg-white/10 text-xs font-semibold">129</button>
                <button className="w-8 h-8 rounded flex items-center justify-center glass-card hover:bg-white/10 text-on-surface-variant cursor-pointer">
                  <span className="material-symbols-outlined text-sm">chevron_right</span>
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* AI Floating Assistant trigger */}
        <div className="fixed bottom-6 right-6 z-[70]">
          <div className="group relative">
            <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
            <Link 
              to="/assistant" 
              className="relative w-14 h-14 bg-primary text-on-primary rounded-full flex items-center justify-center shadow-lg hover:scale-110 active:scale-95 transition-all"
              style={{ backgroundColor: '#b4c5ff', color: '#00174b' }}
              title="Open AI Assistant"
            >
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>smart_toy</span>
            </Link>
          </div>
        </div>
      </main>

      {/* Mobile Bottom Navigation */}
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
    </div>
  );
}
