import React, { useState } from 'react';
import toast from 'react-hot-toast';
import Sidebar from '../../components/Sidebar';
import Header from '../../components/Header';

const INITIAL_TICKETS = [
  { id: 'AF-0062', title: 'Projector bulb not turning on', desc: 'Main briefing hall projector bulb fails to ignite. Spare bulb in supply cabinet.', status: 'Pending', priority: 'High', time: 'Reported 2h ago', assignee: '' },
  { id: 'AF-0031', title: 'AC unit noisy compressor', desc: 'Server room intake HVAC is experiencing heavy vibrations. Inspection approved.', status: 'Approved', priority: 'Medium', time: 'Approved by M. Chen', assignee: '' },
  { id: 'AF-0078', title: 'Forklift Steering Calibration', desc: 'Hydraulic leak checked. Needs mechanical realignment.', status: 'Assigned', priority: 'High', time: 'Assigned 4h ago', assignee: 'R. Varma' },
  { id: 'AF-0897', title: 'IT Printer Jam', desc: 'Department network printer needs roller replacement.', status: 'In Progress', priority: 'Low', time: 'Parts ordered', progress: 60, assignee: 'Tech Team' },
  { id: 'AF-0873', title: 'Chair repair', desc: 'Conference chair hydraulic cylinder replaced.', status: 'Resolved', priority: 'Routine', time: 'resolved 7 Jul', assignee: 'S. Gupta' },
  { id: 'AF-0112', title: 'Desk 12 Leg Stabilization', desc: 'Standing desk height locking pins realigned.', status: 'Resolved', priority: 'Routine', time: 'resolved 5 Jul', assignee: 'J. Wilson' },
];

export default function Maintenance() {
  const [tickets, setTickets] = useState(INITIAL_TICKETS);
  const [searchQuery, setSearchQuery] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('All');
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ title: '', id: '', desc: '', status: 'Pending', priority: 'High', assignee: '' });
  const [aiQuery, setAiQuery] = useState('');

  const handleAiSend = (e) => {
    e.preventDefault();
    if (!aiQuery.trim()) return;
    toast.loading('Analyzing maintenance logs baseline…', { id: 'ai' });
    setTimeout(() => {
      toast.success('Lumina AI: Maintenance resolution is at 94% optimal levels.', { id: 'ai', duration: 4000 });
      setAiQuery('');
    }, 1200);
  };

  const handleCreate = (e) => {
    e.preventDefault();
    if (!form.title || !form.id) {
      toast.error('Title and Asset ID are required');
      return;
    }
    setTickets(prev => [...prev, {
      ...form,
      time: 'Reported just now'
    }]);
    toast.success(`Service ticket raised for ${form.id}!`);
    setForm({ title: '', id: '', desc: '', status: 'Pending', priority: 'High', assignee: '' });
    setShowModal(false);
  };

  const filtered = tickets.filter(t => {
    const matchesSearch = t.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          t.id.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          (t.desc && t.desc.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesPriority = priorityFilter === 'All' || t.priority === priorityFilter;
    return matchesSearch && matchesPriority;
  });

  const getColCount = (status) => filtered.filter(t => t.status === status).length;

  return (
    <div className="flex min-h-screen bg-[#F9F9F7] font-sans antialiased text-[#1a1c1b]">
      <Sidebar />

      <main className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
               {/* Reusable Header */}
        <Header showSearch={true} searchQuery={searchQuery} setSearchQuery={setSearchQuery} placeholder="Search maintenance tickets, assets, or technicians..." />

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-8 text-left pb-24 scrollbar-thin scrollbar-thumb-slate-200">
          
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
            <div>
              <nav className="flex items-center gap-1.5 text-xs text-[#404946] mb-2 font-semibold">
                <span>Main</span>
                <span className="material-symbols-outlined text-[12px]">chevron_right</span>
                <span className="text-[#00352d] font-bold">Maintenance Management</span>
              </nav>
              <h2 className="text-2xl font-black text-[#00352d] leading-tight">Maintenance Workflow</h2>
              <p className="text-xs text-slate-400 font-semibold mt-1">Track and manage asset health and service lifecycles across the organization.</p>
            </div>
            
            <div className="flex gap-2 shrink-0">
              <button 
                onClick={() => setPriorityFilter('All')}
                className="flex items-center gap-1 px-4 py-2.5 bg-white border border-[#bfc9c5]/40 hover:bg-slate-50 text-slate-700 rounded-xl text-xs font-bold transition-all shadow-xs cursor-pointer"
              >
                <span className="material-symbols-outlined text-base">filter_list</span>
                Priority: {priorityFilter}
              </button>
              <button 
                onClick={() => setShowModal(true)}
                className="flex items-center gap-1.5 bg-[#00352d] hover:bg-[#0d4d43] text-white px-5 py-3 rounded-xl text-xs font-bold shadow-sm transition-all cursor-pointer"
              >
                <span className="material-symbols-outlined text-base">add</span>
                Raise Ticket
              </button>
            </div>
          </div>

          {/* Quick Filters */}
          <div className="mb-8 flex flex-wrap gap-2">
            {['All', 'Low', 'Medium', 'High', 'Urgent'].map(p => (
              <button 
                key={p}
                onClick={() => setPriorityFilter(p)}
                className={`px-4 py-1.5 text-[10px] font-bold uppercase tracking-wider rounded-full border transition-all cursor-pointer ${
                  priorityFilter === p 
                    ? 'bg-[#0d4d43] border-[#0d4d43] text-white' 
                    : 'bg-white border-[#bfc9c5]/40 text-slate-600 hover:bg-slate-50'
                }`}
              >
                {p}
              </button>
            ))}
          </div>

          {/* Kanban Board Layout */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6 items-start">
            
            {/* Column: Pending */}
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between px-2">
                <h3 className="text-xs font-black uppercase tracking-wider text-slate-800 flex items-center gap-2">
                  Pending 
                  <span className="text-[10px] bg-[#eeeeec] px-2 py-0.5 rounded-full text-slate-500 font-bold">{getColCount('Pending')}</span>
                </h3>
              </div>
              <div className="flex flex-col gap-3 p-3 bg-white/40 border border-[#bfc9c5]/30 rounded-2xl min-h-[350px]">
                {filtered.filter(t => t.status === 'Pending').map(t => (
                  <div key={t.id} className="bg-white border border-[#bfc9c5]/40 p-4 rounded-xl shadow-xs hover:border-[#00352d]/45 transition-all cursor-pointer group">
                    <div className="flex justify-between items-start mb-3">
                      <span className="text-[9px] font-black text-[#00352d] bg-[#b3eee0]/40 px-2 py-0.5 rounded">{t.id}</span>
                      {t.priority === 'High' && <span className="material-symbols-outlined text-[#ba1a1a] text-lg font-bold">priority_high</span>}
                    </div>
                    <h4 className="text-xs font-bold text-slate-800 group-hover:text-[#00352d] transition-colors">{t.title}</h4>
                    <p className="text-[10px] text-slate-400 font-semibold mt-3 flex items-center gap-1">
                      <span className="material-symbols-outlined text-xs">schedule</span> {t.time}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Column: Approved */}
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between px-2">
                <h3 className="text-xs font-black uppercase tracking-wider text-slate-800 flex items-center gap-2">
                  Approved 
                  <span className="text-[10px] bg-[#eeeeec] px-2 py-0.5 rounded-full text-slate-500 font-bold">{getColCount('Approved')}</span>
                </h3>
              </div>
              <div className="flex flex-col gap-3 p-3 bg-white/40 border border-[#bfc9c5]/30 rounded-2xl min-h-[350px]">
                {filtered.filter(t => t.status === 'Approved').map(t => (
                  <div key={t.id} className="bg-white border border-[#bfc9c5]/40 p-4 rounded-xl shadow-xs hover:border-[#00352d]/45 transition-all cursor-pointer group">
                    <div className="flex justify-between items-start mb-3">
                      <span className="text-[9px] font-black text-[#00352d] bg-[#b3eee0]/40 px-2 py-0.5 rounded">{t.id}</span>
                      <span className="material-symbols-outlined text-slate-400 text-base">info</span>
                    </div>
                    <h4 className="text-xs font-bold text-slate-800 group-hover:text-[#00352d] transition-colors">{t.title}</h4>
                    <p className="text-[10px] text-slate-400 font-semibold mt-3 flex items-center gap-1">
                      <span className="material-symbols-outlined text-xs">person</span> Approved by M. Chen
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Column: Assigned */}
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between px-2">
                <h3 className="text-xs font-black uppercase tracking-wider text-slate-800 flex items-center gap-2">
                  Assigned 
                  <span className="text-[10px] bg-[#eeeeec] px-2 py-0.5 rounded-full text-slate-500 font-bold">{getColCount('Assigned')}</span>
                </h3>
              </div>
              <div className="flex flex-col gap-3 p-3 bg-white/40 border border-[#bfc9c5]/30 rounded-2xl min-h-[350px]">
                {filtered.filter(t => t.status === 'Assigned').map(t => (
                  <div key={t.id} className="bg-white border border-[#bfc9c5]/40 p-4 rounded-xl shadow-xs hover:border-[#00352d]/45 transition-all cursor-pointer group">
                    <div className="flex justify-between items-start mb-3">
                      <span className="text-[9px] font-black text-[#00352d] bg-[#b3eee0]/40 px-2 py-0.5 rounded">{t.id}</span>
                    </div>
                    <h4 className="text-xs font-bold text-slate-800 group-hover:text-[#00352d] transition-colors">{t.title}</h4>
                    <div className="mt-4 flex items-center gap-2 p-2 bg-[#f4f4f1] rounded-xl border border-[#bfc9c5]/30">
                      <div className="w-5.5 h-5.5 rounded-full bg-[#0d4d43] text-white text-[8px] flex items-center justify-center font-bold">
                        {t.assignee[0]}
                      </div>
                      <span className="text-[10px] text-slate-600 font-bold">Tech: {t.assignee}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Column: In Progress */}
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between px-2">
                <h3 className="text-xs font-black uppercase tracking-wider text-slate-800 flex items-center gap-2">
                  In Progress 
                  <span className="text-[10px] bg-[#eeeeec] px-2 py-0.5 rounded-full text-slate-500 font-bold">{getColCount('In Progress')}</span>
                </h3>
              </div>
              <div className="flex flex-col gap-3 p-3 bg-white/40 border border-[#bfc9c5]/30 rounded-2xl min-h-[350px]">
                {filtered.filter(t => t.status === 'In Progress').map(t => (
                  <div key={t.id} className="bg-white border border-[#bfc9c5]/40 p-4 rounded-xl shadow-xs hover:border-[#00352d]/45 transition-all cursor-pointer group">
                    <div className="flex justify-between items-start mb-3">
                      <span className="text-[9px] font-black text-[#00352d] bg-[#b3eee0]/40 px-2 py-0.5 rounded">{t.id}</span>
                    </div>
                    <h4 className="text-xs font-bold text-slate-800 group-hover:text-[#00352d] transition-colors">{t.title}</h4>
                    <div className="mt-3.5 space-y-1">
                      <div className="flex justify-between text-[9px] font-bold text-slate-400">
                        <span className="italic">{t.time}</span>
                        <span>{t.progress}%</span>
                      </div>
                      <div className="h-1 bg-[#f4f4f1] rounded-full overflow-hidden border border-slate-200/50">
                        <div className="h-full bg-[#00352d]" style={{ width: `${t.progress}%` }} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Column: Resolved */}
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between px-2">
                <h3 className="text-xs font-black uppercase tracking-wider text-slate-800 flex items-center gap-2">
                  Resolved 
                  <span className="text-[10px] bg-[#eeeeec] px-2 py-0.5 rounded-full text-slate-500 font-bold">{getColCount('Resolved')}</span>
                </h3>
              </div>
              <div className="flex flex-col gap-3 p-3 bg-white/40 border border-[#bfc9c5]/30 rounded-2xl min-h-[350px]">
                {filtered.filter(t => t.status === 'Resolved').map(t => {
                  const isChair = t.title === 'Chair repair';
                  return (
                    <div 
                      key={t.id} 
                      className={`p-4 rounded-xl shadow-xs transition-all cursor-pointer border ${
                        isChair 
                          ? 'bg-[#0d4d43] border-[#0d4d43] text-white hover:brightness-105' 
                          : 'bg-white border-[#bfc9c5]/35 opacity-65 grayscale hover:grayscale-0 hover:opacity-100'
                      }`}
                    >
                      <div className="flex justify-between items-start mb-3">
                        <span className={`text-[9px] font-black px-2 py-0.5 rounded ${isChair ? 'bg-white/10 text-white' : 'bg-[#b3eee0]/40 text-[#00352d]'}`}>{t.id}</span>
                        <span className={`material-symbols-outlined text-base ${isChair ? 'text-[#83bdb0]' : 'text-slate-400'}`} style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                      </div>
                      <h4 className={`text-xs font-bold ${isChair ? 'text-white' : 'text-slate-800'}`}>{t.title}</h4>
                      <p className={`text-[9px] font-semibold mt-3 ${isChair ? 'text-[#83bdb0]' : 'text-slate-400'}`}>{t.time}</p>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>

          {/* Centered Pill Info Footer */}
          <footer className="mt-12 flex items-center justify-center">
            <div className="flex items-center gap-2 px-6 py-3 bg-[#f4f4f1] rounded-full border border-[#bfc9c5]/40 text-xs text-slate-500 font-semibold shadow-xs">
              <span className="material-symbols-outlined text-[#00352d] text-base">info</span>
              <span>Approving a card moves the asset to under maintenance, resolving returns it to available.</span>
            </div>
          </footer>

        </div>

        {/* AI chat assistant prompt */}
        <div className="fixed bottom-6 right-6 z-50 w-80 md:w-96">
          <form 
            onSubmit={handleAiSend}
            className="bg-white border border-[#bfc9c5]/50 p-2 rounded-2xl flex items-center gap-3 shadow-xl transition-all duration-300"
          >
            <div className="w-8.5 h-8.5 rounded-xl bg-[#00352d] text-white flex items-center justify-center flex-shrink-0">
              <span className="material-symbols-outlined text-sm">smart_toy</span>
            </div>
            <input 
              className="bg-transparent border-none outline-none focus:ring-0 text-xs text-slate-800 placeholder-slate-400 flex-1 px-1 py-1" 
              placeholder="Ask AI about maintenance tasks..." 
              type="text"
              value={aiQuery}
              onChange={e => setAiQuery(e.target.value)}
            />
            <button type="submit" className="p-1.5 hover:bg-slate-50 text-[#00352d] rounded-xl cursor-pointer flex shrink-0">
              <span className="material-symbols-outlined text-base">send</span>
            </button>
          </form>
        </div>

      </main>

      {/* Raise Ticket Modal Dialog */}
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
              <h3 className="text-base font-black text-slate-900 tracking-tight">Raise Service Ticket</h3>
              <p className="text-xs text-slate-400 font-semibold mt-1">Submit maintenance request to engineering pool</p>
            </div>

            <form onSubmit={handleCreate} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[9px] font-bold text-slate-400 uppercase mb-1">Asset ID Tag *</label>
                  <input 
                    type="text" 
                    required
                    placeholder="e.g. AF-0062"
                    value={form.id}
                    onChange={e => setForm(p => ({ ...p, id: e.target.value }))}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:outline-none bg-slate-50/30"
                  />
                </div>
                <div>
                  <label className="block text-[9px] font-bold text-slate-400 uppercase mb-1">Issue Title *</label>
                  <input 
                    type="text" 
                    required
                    placeholder="e.g. Broken AC Compressor"
                    value={form.title}
                    onChange={e => setForm(p => ({ ...p, title: e.target.value }))}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:outline-none bg-slate-50/30"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[9px] font-bold text-slate-400 uppercase mb-1">Description</label>
                <textarea 
                  rows={3}
                  placeholder="Provide precise details of the anomaly..."
                  value={form.desc}
                  onChange={e => setForm(p => ({ ...p, desc: e.target.value }))}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:outline-none bg-slate-50/30 resize-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[9px] font-bold text-slate-400 uppercase mb-1">Priority Level</label>
                  <select 
                    value={form.priority}
                    onChange={e => setForm(p => ({ ...p, priority: e.target.value }))}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none bg-white cursor-pointer"
                  >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                    <option value="Urgent">Urgent</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[9px] font-bold text-slate-400 uppercase mb-1">Assignee Technician</label>
                  <input 
                    type="text" 
                    placeholder="e.g. R. Varma"
                    value={form.assignee}
                    onChange={e => setForm(p => ({ ...p, assignee: e.target.value }))}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:outline-none bg-slate-50/30"
                  />
                </div>
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
                  className="px-4 py-2 bg-[#00352d] hover:bg-[#0d4d43] text-white rounded-xl text-xs font-bold shadow-sm transition-colors cursor-pointer"
                >
                  Submit Ticket
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
