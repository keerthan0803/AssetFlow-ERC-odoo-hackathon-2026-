import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import Sidebar from '../../components/Sidebar';

const INITIAL_ASSETS = [
  { tag: 'AF-0012', name: 'Dell Latitude 5420', category: 'Electronics', status: 'Allocated', location: 'Bengaluru, KA', dept: 'Engineering', health: 88 },
  { tag: 'AF-0062', name: 'Sony 4K Projector', category: 'Electronics', status: 'Maintenance', location: 'HQ Floor 2', dept: 'Facilities', health: 42 },
  { tag: 'AF-0201', name: 'Herman Miller Aeron', category: 'Furniture', status: 'Available', location: 'Warehouse A', dept: 'HR', health: 100 },
  { tag: 'AF-0914', name: 'iPad Pro 12.9"', category: 'Electronics', status: 'Allocated', location: 'Engineering Lab', dept: 'Engineering', health: 92 },
  { tag: 'AF-0088', name: 'UltraSharp 27" Monitor', category: 'Electronics', status: 'Available', location: 'Warehouse A', dept: 'IT', health: 95 },
  { tag: 'AF-0031', name: 'Industrial Scanner', category: 'Electronics', status: 'Allocated', location: 'Shipping Dock', dept: 'Operations', health: 84 },
];

export default function AssetList() {
  const navigate = useNavigate();
  const [assets, setAssets] = useState(INITIAL_ASSETS);
  
  const [search, setSearch] = useState('');
  const [catFilter, setCatFilter] = useState('All Categories');
  const [statusFilter, setStatusFilter] = useState('Any Status');
  const [deptFilter, setDeptFilter] = useState('Global');

  const [selectedRows, setSelectedRows] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ tag: '', name: '', category: 'Electronics', status: 'Available', location: '', dept: '', health: 100 });

  // Filter options
  const cats = ['All Categories', ...new Set(assets.map(a => a.category))];
  const statuses = ['Any Status', 'Available', 'Allocated', 'Maintenance'];
  const depts = ['Global', ...new Set(assets.map(a => a.dept))];

  const filtered = assets.filter(a => {
    const q = search.toLowerCase();
    return (!search || a.tag.toLowerCase().includes(q) || a.name.toLowerCase().includes(q) || a.location.toLowerCase().includes(q))
      && (catFilter === 'All Categories' || a.category === catFilter)
      && (statusFilter === 'Any Status' || a.status === statusFilter)
      && (deptFilter === 'Global' || a.dept === deptFilter);
  });

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedRows(filtered.map(item => item.tag));
    } else {
      setSelectedRows([]);
    }
  };

  const handleSelectRow = (tag) => {
    setSelectedRows(prev => 
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  };

  const handleRegister = (e) => {
    e.preventDefault();
    if (!form.tag || !form.name) { 
      toast.error('Tag and Name are required.'); 
      return; 
    }
    setAssets(prev => [form, ...prev]);
    toast.success(`Asset ${form.tag} successfully registered!`);
    setForm({ tag: '', name: '', category: 'Electronics', status: 'Available', location: '', dept: '', health: 100 });
    setShowModal(false);
  };

  // Sparkline Health Bars
  const renderSparkline = (health, status) => {
    const isMaintenance = status === 'Maintenance';
    const barColor = isMaintenance ? 'bg-red-500' : 'bg-indigo-600';
    return (
      <div className="flex items-end gap-0.5 h-4 w-fit">
        <div className={`w-1 rounded-xs ${barColor} ${health >= 20 ? 'h-2' : 'h-1'}`} />
        <div className={`w-1 rounded-xs ${barColor} ${health >= 40 ? 'h-3.5' : 'h-1'}`} />
        <div className={`w-1 rounded-xs ${barColor} ${health >= 65 ? 'h-4' : 'h-1.5'}`} />
        <div className={`w-1 rounded-xs ${barColor} ${health >= 80 ? 'h-2.5' : 'h-1'}`} />
        <div className={`w-1 rounded-xs ${barColor} ${health >= 95 ? 'h-4' : 'h-2'}`} />
      </div>
    );
  };

  return (
    <div className="flex min-h-screen bg-[#F9F9F7] font-sans antialiased text-[#1a1c1b]">
      <Sidebar />

      <main className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
        
        {/* Top Header */}
        <header className="sticky top-0 z-40 h-16 flex justify-between items-center px-8 w-full backdrop-blur-md border-b border-[#bfc9c5]/30 bg-[#F9F9F7]/30">
          <div className="flex items-center gap-4 flex-1">
            <div className="relative max-w-md w-full">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">search</span>
              <input 
                type="text" 
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search by tag, serial, or QR code..." 
                className="w-full bg-white border border-[#bfc9c5]/50 rounded-lg pl-10 pr-4 py-2 text-xs focus:ring-2 focus:ring-[#00352d]/10 focus:border-[#00352d] transition-all outline-none text-[#1a1c1b]"
              />
            </div>
          </div>

          <div className="flex items-center gap-6">
            <button className="relative text-[#404946] hover:bg-white/10 p-2 rounded-full transition-all">
              <span className="material-symbols-outlined text-lg">notifications</span>
              <span className="absolute top-2 right-2 w-1.5 h-1.5 bg-[#ba1a1a] rounded-full border border-white"></span>
            </button>
            <button className="text-[#404946] hover:bg-white/10 p-2 rounded-full transition-all">
              <span className="material-symbols-outlined text-lg">settings</span>
            </button>
            <div className="h-6 w-[1px] bg-[#bfc9c5]/60 mx-1"></div>
            <div className="flex items-center gap-3">
              <div className="text-right hidden sm:block">
                <p className="text-xs text-slate-800 font-bold leading-none">Marcus Thorne</p>
                <p className="text-[9px] text-[#404946] leading-none mt-1">Admin Principal</p>
              </div>
              <div className="w-9 h-9 rounded-full border-2 border-[#00352d]/25 p-0.5 overflow-hidden flex-shrink-0">
                <img 
                  className="w-full h-full object-cover rounded-full" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuC63sWcaTdnoQpxB5zDNKNEfHxkgLIhD3EKz6VqOdbw-1WygCSHYjya9pNLFo7Du1-DX8DK2Y2qNQjJh48o0ScksAhm-0H4bsRqH8WNZjp6lGMuUkL6PDWX326zzZr6srCaxo_jFc6TjQUL3F_I50kVNmnAwTEQll-37afIE63kcWt4O-AKiBx-hDFLYKmJBy_NwiQnEr0cccHqeBRX8ABqfWgAhvVLIuUV7IjXNMlmSBAsygPqqY0u" 
                  alt="Marcus Thorne Profile" 
                />
              </div>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-8 text-left pb-24 scrollbar-thin scrollbar-thumb-slate-200">
          
          {/* Header Section */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <h2 className="text-2xl font-black text-[#00352d] tracking-tight">Asset Inventory</h2>
              <p className="text-xs text-[#404946]/70 font-semibold mt-1">Manage and track your global enterprise resources.</p>
            </div>
            <button 
              onClick={() => setShowModal(true)}
              className="flex items-center gap-1.5 bg-[#0d4d43] hover:bg-[#00352d] text-white px-5 py-3 rounded-xl text-xs font-bold transition-all active:scale-95 cursor-pointer shadow-sm w-fit"
            >
              <span className="material-symbols-outlined text-sm">add</span>
              Register Asset
            </button>
          </div>

          {/* KPI Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            
            {/* Card 1: Total */}
            <div className="bg-white border border-[#bfc9c5]/40 p-6 rounded-2xl flex items-center justify-between shadow-xs">
              <div>
                <p className="text-[10px] font-bold text-[#404946]/70 uppercase tracking-wider mb-2">Total Assets</p>
                <h3 className="text-2xl font-black text-[#00352d] leading-none">4,281</h3>
                <p className="text-[10px] text-slate-400 font-bold mt-2.5 flex items-center gap-0.5">
                  <span className="material-symbols-outlined text-[#10b981] text-xs">trending_up</span>
                  <span className="text-[#10b981] font-black">+12%</span> vs last month
                </p>
              </div>
              <div className="w-12 h-12 bg-[#b3eee0]/40 rounded-full flex items-center justify-center text-[#0d4d43] border border-[#0d4d43]/5 flex-shrink-0">
                <span className="material-symbols-outlined text-lg">inventory</span>
              </div>
            </div>

            {/* Card 2: Maintenance */}
            <div className="bg-white border border-[#bfc9c5]/40 p-6 rounded-2xl flex items-center justify-between shadow-xs">
              <div>
                <p className="text-[10px] font-bold text-[#404946]/70 uppercase tracking-wider mb-2">Under Maintenance</p>
                <h3 className="text-2xl font-black text-[#00352d] leading-none">84</h3>
                <p className="text-[10px] text-slate-400 font-bold mt-2.5 flex items-center gap-0.5">
                  <span className="material-symbols-outlined text-amber-500 text-xs">warning</span>
                  <span className="text-amber-600 font-black">14 critical</span> items
                </p>
              </div>
              <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center text-slate-650 border border-slate-200 flex-shrink-0">
                <span className="material-symbols-outlined text-lg">construction</span>
              </div>
            </div>

            {/* Card 3: Utilization */}
            <div className="bg-white border border-[#bfc9c5]/40 p-6 rounded-2xl flex items-center justify-between shadow-xs relative overflow-hidden">
              <div className="z-10 flex-grow pr-4">
                <p className="text-[10px] font-bold text-[#404946]/70 uppercase tracking-wider mb-2">Utilization Rate</p>
                <h3 className="text-2xl font-black text-[#00352d] leading-none">92.4%</h3>
                <div className="w-32 bg-slate-100 h-1.5 rounded-full mt-4 overflow-hidden border border-slate-200/50">
                  <div className="bg-[#00352d] h-full rounded-full" style={{ width: '92.4%' }}></div>
                </div>
              </div>
              <div className="w-12 h-12 bg-[#e1e3e2]/40 rounded-full flex items-center justify-center text-[#2b2f2e] border border-[#2b2f2e]/5 flex-shrink-0">
                <span className="material-symbols-outlined text-lg">data_exploration</span>
              </div>
            </div>

          </div>

          {/* Filters Bar */}
          <div className="flex flex-wrap items-center gap-4 mb-6">
            <div className="flex items-center gap-2 bg-white px-3.5 py-1.5 rounded-full border border-[#bfc9c5]/40 text-xs shadow-xs">
              <span className="text-[10px] font-bold text-[#404946] uppercase">Category:</span>
              <select 
                value={catFilter}
                onChange={e => setCatFilter(e.target.value)}
                className="bg-transparent border-none text-xs font-bold focus:ring-0 py-0 pr-8 cursor-pointer text-[#1a1c1b] outline-none"
              >
                {cats.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>

            <div className="flex items-center gap-2 bg-white px-3.5 py-1.5 rounded-full border border-[#bfc9c5]/40 text-xs shadow-xs">
              <span className="text-[10px] font-bold text-[#404946] uppercase">Status:</span>
              <select 
                value={statusFilter}
                onChange={e => setStatusFilter(e.target.value)}
                className="bg-transparent border-none text-xs font-bold focus:ring-0 py-0 pr-8 cursor-pointer text-[#1a1c1b] outline-none"
              >
                {statuses.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>

            <div className="flex items-center gap-2 bg-white px-3.5 py-1.5 rounded-full border border-[#bfc9c5]/40 text-xs shadow-xs">
              <span className="text-[10px] font-bold text-[#404946] uppercase">Department:</span>
              <select 
                value={deptFilter}
                onChange={e => setDeptFilter(e.target.value)}
                className="bg-transparent border-none text-xs font-bold focus:ring-0 py-0 pr-8 cursor-pointer text-[#1a1c1b] outline-none"
              >
                {depts.map(d => <option key={d} value={d}>{d}</option>)}
              </select>
            </div>

            <button 
              onClick={() => toast.success('Advanced filter drawer is nominal')}
              className="ml-auto text-[#00352d] flex items-center gap-1.5 font-bold hover:underline text-xs cursor-pointer"
            >
              <span className="material-symbols-outlined text-base">filter_list</span>
              Advanced Filters
            </button>
          </div>

          {/* Table Container Card */}
          <div className="bg-white border border-[#bfc9c5]/40 rounded-2xl overflow-hidden shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-[#eeeeec]/50 text-[#404946] border-b border-[#bfc9c5]/35 text-[10px] font-bold uppercase tracking-wider">
                    <th className="py-4 px-6 w-12 text-center">
                      <input 
                        type="checkbox" 
                        checked={selectedRows.length === filtered.length && filtered.length > 0}
                        onChange={handleSelectAll}
                        className="rounded border-[#bfc9c5] text-[#00352d] focus:ring-[#00352d] cursor-pointer"
                      />
                    </th>
                    <th className="px-6 py-4">Tag</th>
                    <th className="px-6 py-4">Name</th>
                    <th className="px-6 py-4">Category</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4">Health</th>
                    <th className="px-6 py-4">Location</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#bfc9c5]/30">
                  {filtered.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="px-6 py-10 text-center text-xs text-slate-400 font-semibold">
                        No asset items currently in index matching selection filters.
                      </td>
                    </tr>
                  ) : (
                    filtered.map((a, i) => {
                      const isRowChecked = selectedRows.includes(a.tag);
                      return (
                        <tr 
                          key={i} 
                          onDoubleClick={() => navigate(`/assets/${a.tag}`)}
                          className={`hover:bg-slate-50 transition-colors group cursor-pointer ${
                            isRowChecked ? 'bg-indigo-50/10' : ''
                          }`}
                        >
                          <td className="px-6 py-4 text-center" onClick={e => e.stopPropagation()}>
                            <input 
                              type="checkbox"
                              checked={isRowChecked}
                              onChange={() => handleSelectRow(a.tag)}
                              className="rounded border-[#bfc9c5] text-[#00352d] focus:ring-[#00352d] cursor-pointer"
                            />
                          </td>
                          <td className="px-6 py-4 font-mono text-xs text-[#00352d] font-bold">
                            {a.tag}
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded bg-[#f4f4f1] flex items-center justify-center text-[#0d4d43] flex-shrink-0">
                                <span className="material-symbols-outlined text-base">
                                  {a.category === 'Furniture' ? 'chair' : a.category === 'Vehicles' ? 'local_shipping' : 'laptop_mac'}
                                </span>
                              </div>
                              <span className="text-xs font-bold text-slate-800">{a.name}</span>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <span className="px-2.5 py-0.5 bg-[#dbe1e0]/60 border border-[#dbe1e0] text-slate-650 text-[9px] font-extrabold uppercase rounded-full tracking-wider">
                              {a.category}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <span className="flex items-center gap-1.5 text-xs font-bold">
                              <span className={`w-1.5 h-1.5 rounded-full ${
                                a.status === 'Available' ? 'bg-[#10b981]' : a.status === 'Allocated' ? 'bg-indigo-650' : 'bg-amber-500'
                              }`} />
                              {a.status}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            {renderSparkline(a.health, a.status)}
                          </td>
                          <td className="px-6 py-4 text-xs text-slate-500 font-semibold">
                            {a.location}
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination footer */}
            <div className="px-6 py-4 bg-[#eeeeec]/20 border-t border-[#bfc9c5]/35 flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="text-xs text-slate-400 font-semibold">
                Showing 1 to {filtered.length} of 4,281 assets
              </p>
              
              <div className="flex items-center gap-1">
                <button disabled className="w-8 h-8 flex items-center justify-center rounded-lg border border-[#bfc9c5]/40 hover:bg-slate-50 transition-all disabled:opacity-50 cursor-pointer">
                  <span className="material-symbols-outlined text-sm font-bold">chevron_left</span>
                </button>
                <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-[#00352d] text-white font-bold text-xs">1</button>
                <button onClick={() => toast.success('Browsing page 2')} className="w-8 h-8 flex items-center justify-center rounded-lg border border-[#bfc9c5]/40 hover:bg-slate-50 transition-all text-xs font-bold text-slate-600 cursor-pointer">2</button>
                <button onClick={() => toast.success('Browsing page 3')} className="w-8 h-8 flex items-center justify-center rounded-lg border border-[#bfc9c5]/40 hover:bg-slate-50 transition-all text-xs font-bold text-slate-600 cursor-pointer">3</button>
                <span className="px-1.5 text-slate-400 font-semibold">...</span>
                <button onClick={() => toast.success('Browsing final page')} className="w-8 h-8 flex items-center justify-center rounded-lg border border-[#bfc9c5]/40 hover:bg-slate-50 transition-all text-xs font-bold text-slate-600 cursor-pointer">107</button>
                <button onClick={() => toast.success('Browsing next page')} className="w-8 h-8 flex items-center justify-center rounded-lg border border-[#bfc9c5]/40 hover:bg-slate-50 transition-all cursor-pointer">
                  <span className="material-symbols-outlined text-sm font-bold">chevron_right</span>
                </button>
              </div>
            </div>
          </div>

        </div>
      </main>

      {/* Floating Action Toolbar */}
      <div 
        className={`fixed bottom-8 left-1/2 -translate-x-1/2 bg-[#00352d] text-white px-8 py-4.5 rounded-full flex items-center gap-8 shadow-2xl transition-all duration-300 z-50 ${
          selectedRows.length > 0 ? 'translate-y-0 opacity-100' : 'translate-y-24 opacity-0 pointer-events-none'
        }`}
      >
        <p className="font-bold border-r border-white/20 pr-8 text-xs">{selectedRows.length} items selected</p>
        <div className="flex items-center gap-6">
          <button 
            onClick={() => {
              toast.success(`Redirecting bulk allocation transfer requests for ${selectedRows.join(', ')}`);
              setSelectedRows([]);
            }}
            className="flex items-center gap-1.5 text-xs font-bold hover:text-[#b3eee0] transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-base">transfer_within_a_station</span>
            Transfer
          </button>
          <button 
            onClick={() => {
              toast.success(`Generating audit trail compliance maps for ${selectedRows.join(', ')}`);
              setSelectedRows([]);
            }}
            className="flex items-center gap-1.5 text-xs font-bold hover:text-[#b3eee0] transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-base">history</span>
            Audit Log
          </button>
          <button 
            onClick={() => {
              toast.success(`Flagged ${selectedRows.join(', ')} for lifecycle deprecation and decommissioning.`);
              setSelectedRows([]);
            }}
            className="flex items-center gap-1.5 text-xs font-bold hover:text-red-300 transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-base">delete</span>
            Retire
          </button>
        </div>
        <button 
          onClick={() => setSelectedRows([])}
          className="ml-4 p-1 hover:bg-white/10 rounded-full flex cursor-pointer"
        >
          <span className="material-symbols-outlined text-sm font-bold">close</span>
        </button>
      </div>

      {/* Register Asset Modal */}
      {showModal && (
        <div 
          className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fade-in"
          onClick={() => setShowModal(false)}
        >
          <div 
            className="bg-white border border-slate-100 rounded-2xl shadow-xl w-full max-w-md p-6 space-y-6 text-left animate-slide-up"
            onClick={e => e.stopPropagation()}
          >
            <div>
              <h3 className="text-base font-black text-slate-900 tracking-tight">Register New Asset</h3>
              <p className="text-xs text-slate-400 font-semibold mt-1">Log physical hardware to corporate index</p>
            </div>

            <form onSubmit={handleRegister} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[9px] font-bold text-slate-400 uppercase mb-1">Asset Tag *</label>
                  <input 
                    type="text" 
                    placeholder="e.g. AF-0300"
                    required
                    value={form.tag}
                    onChange={e => setForm(p => ({ ...p, tag: e.target.value }))}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:outline-none bg-slate-50/30"
                  />
                </div>
                <div>
                  <label className="block text-[9px] font-bold text-slate-400 uppercase mb-1">Name *</label>
                  <input 
                    type="text" 
                    placeholder="e.g. Dell Laptop"
                    required
                    value={form.name}
                    onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:outline-none bg-slate-50/30"
                  />
                </div>
                <div>
                  <label className="block text-[9px] font-bold text-slate-400 uppercase mb-1">Location</label>
                  <input 
                    type="text" 
                    placeholder="e.g. IT Lab"
                    value={form.location}
                    onChange={e => setForm(p => ({ ...p, location: e.target.value }))}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:outline-none bg-slate-50/30"
                  />
                </div>
                <div>
                  <label className="block text-[9px] font-bold text-slate-400 uppercase mb-1">Department</label>
                  <input 
                    type="text" 
                    placeholder="e.g. Engineering"
                    value={form.dept}
                    onChange={e => setForm(p => ({ ...p, dept: e.target.value }))}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:outline-none bg-slate-50/30"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[9px] font-bold text-slate-400 uppercase mb-1">Category</label>
                  <select 
                    value={form.category}
                    onChange={e => setForm(p => ({ ...p, category: e.target.value }))}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none bg-white cursor-pointer"
                  >
                    {['Electronics', 'Furniture', 'Infrastructure', 'Vehicles'].map(o => <option key={o} value={o}>{o}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-[9px] font-bold text-slate-400 uppercase mb-1">Status</label>
                  <select 
                    value={form.status}
                    onChange={e => setForm(p => ({ ...p, status: e.target.value }))}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none bg-white cursor-pointer"
                  >
                    {['Available', 'Allocated', 'Maintenance'].map(o => <option key={o} value={o}>{o}</option>)}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[9px] font-bold text-slate-400 uppercase mb-1">Health Score ({form.health}%)</label>
                <input 
                  type="range" 
                  min="0" 
                  max="100"
                  value={form.health}
                  onChange={e => setForm(p => ({ ...p, health: parseInt(e.target.value) }))}
                  className="w-full accent-black cursor-pointer bg-slate-100 h-1 rounded-full"
                />
              </div>

              <div className="flex justify-end gap-2.5 pt-2">
                <button 
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-xl text-xs font-semibold cursor-pointer transition-colors"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="px-4 py-2 bg-black hover:bg-slate-800 text-white rounded-xl text-xs font-bold shadow-sm transition-colors cursor-pointer"
                >
                  Register
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
