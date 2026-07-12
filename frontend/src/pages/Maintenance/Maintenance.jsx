import React, { useState } from 'react';
import toast from 'react-hot-toast';
import Sidebar from '../../components/Sidebar';

const INITIAL_TICKETS = [
  { id: 'AF-0062', title: 'Projector bulb', desc: 'not turning on', status: 'Pending', type: 'electronics', priority: 'High' },
  { id: 'AF-003', title: 'ac unit', desc: 'noisy compressor', status: 'Approved', type: 'hvac', priority: 'Medium' },
  { id: 'AF-0078', title: 'Forklift', desc: 'tech: R varma', status: 'Technician Assigned', type: 'mechanical', priority: 'High' },
  { id: 'AF-897', title: 'Printer Jam', desc: 'parts ordered', status: 'In Progress', type: 'electronics', priority: 'Low' },
  { id: 'AF-873', title: 'Chair repair', desc: 'resolved 7 Jul', status: 'Resolved', type: 'furniture', priority: 'Low' },
];

const COLUMNS = ['Pending', 'Approved', 'Technician Assigned', 'In Progress', 'Resolved'];

export default function Maintenance() {
  const [tickets, setTickets] = useState(INITIAL_TICKETS);
  const [search, setSearch] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [newAssetId, setNewAssetId] = useState('');
  const [newTitle, setNewTitle] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [newPriority, setNewPriority] = useState('Medium');
  const [newType, setNewType] = useState('mechanical');

  // Move tickets across column states
  const moveTicket = (id, currentStatus) => {
    const currentIndex = COLUMNS.indexOf(currentStatus);
    if (currentIndex === -1 || currentIndex === COLUMNS.length - 1) return;
    
    const nextStatus = COLUMNS[currentIndex + 1];
    setTickets(prev => prev.map(t => {
      if (t.id === id) {
        if (nextStatus === 'Approved') {
          toast.success(`Approved! ${t.id} moved to maintenance queue.`);
        } else if (nextStatus === 'Resolved') {
          toast.success(`Resolved! ${t.id} is now available again.`);
        }
        return { ...t, status: nextStatus };
      }
      return t;
    }));
  };

  const handleAddRequest = (e) => {
    e.preventDefault();
    if (!newAssetId.trim() || !newTitle.trim() || !newDesc.trim()) {
      toast.error('Please fill in all fields');
      return;
    }
    const newTicket = {
      id: newAssetId.toUpperCase(),
      title: newTitle,
      desc: newDesc,
      status: 'Pending',
      type: newType,
      priority: newPriority
    };
    setTickets(prev => [newTicket, ...prev]);
    setShowAddModal(false);
    setNewAssetId('');
    setNewTitle('');
    setNewDesc('');
    toast.success('Maintenance request submitted successfully');
  };

  const filteredTickets = tickets.filter(t => 
    t.title.toLowerCase().includes(search.toLowerCase()) ||
    t.id.toLowerCase().includes(search.toLowerCase()) ||
    t.desc.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex min-h-screen bg-gray-50/50 font-sans">
      <Sidebar />

      <main className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <header className="bg-white border-b border-gray-100 px-8 py-5 sticky top-0 z-40 shadow-sm flex items-center justify-between">
          <div className="pl-10 md:pl-0">
            <h1 className="text-xl font-bold text-gray-900 tracking-tight">Maintenance Management</h1>
            <p className="text-xs text-gray-500 mt-1">Approval workflows, technician scheduling, and Kanban boards</p>
          </div>
          <button 
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-2 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition-all active:scale-95 shadow-sm shadow-indigo-100 cursor-pointer"
          >
            <span className="material-symbols-outlined text-[16px] font-bold">add</span> Request Maintenance
          </button>
        </header>

        <div className="p-8 flex flex-col h-[calc(100vh-80px)] overflow-hidden">
          {/* Filters Area */}
          <div className="flex items-center gap-3 mb-6 flex-shrink-0">
            <div className="relative w-80">
              <input 
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Filter cards..."
                className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-xl text-xs text-gray-800 placeholder-gray-400 focus:outline-none focus:border-indigo-500 transition-all bg-white"
              />
              <span className="material-symbols-outlined absolute left-3 top-2.5 text-gray-400 text-sm pointer-events-none">search</span>
            </div>
          </div>

          {/* Kanban Board Container */}
          <div className="flex-1 overflow-x-auto flex gap-5 pb-4 items-stretch select-none">
            {COLUMNS.map(col => {
              const colTickets = filteredTickets.filter(t => t.status === col);
              return (
                <div 
                  key={col} 
                  className="w-72 bg-gray-100/50 rounded-2xl border border-gray-200/40 p-4 flex flex-col flex-shrink-0"
                >
                  {/* Column Title Header */}
                  <div className="flex items-center justify-between mb-4 flex-shrink-0">
                    <h3 className="text-xs font-bold text-gray-800 tracking-wide uppercase">{col}</h3>
                    <span className="text-[10px] font-bold px-2 py-0.5 bg-gray-200/60 text-gray-600 rounded-full">
                      {colTickets.length}
                    </span>
                  </div>

                  {/* Column Body Cards */}
                  <div className="flex-1 overflow-y-auto space-y-3.5 pr-1.5 scrollbar-thin scrollbar-thumb-gray-200">
                    {colTickets.length === 0 ? (
                      <div className="h-28 border border-dashed border-gray-200 rounded-xl flex items-center justify-center text-xs text-gray-400 font-medium">
                        Empty column
                      </div>
                    ) : (
                      colTickets.map(t => (
                        <div 
                          key={t.id}
                          className={`border rounded-xl p-4.5 text-left transition-all hover:-translate-y-0.5 shadow-sm hover:shadow-md ${
                            t.status === 'Resolved' 
                              ? 'bg-green-50/60 border-green-200 text-green-900 shadow-green-50/20' 
                              : 'bg-white border-gray-100 text-gray-800 shadow-gray-50'
                          }`}
                        >
                          <div className="flex justify-between items-start gap-2 mb-2">
                            <span className="text-[9px] font-bold text-gray-400 font-mono tracking-wider uppercase">
                              {t.id}
                            </span>
                            <span className={`text-[8px] font-extrabold px-1.5 py-0.5 rounded-md uppercase ${
                              t.priority === 'High' 
                                ? 'bg-red-50 text-red-600 border border-red-100' 
                                : t.priority === 'Medium' 
                                  ? 'bg-orange-50 text-orange-600 border border-orange-100'
                                  : 'bg-green-50 text-green-600 border border-green-100'
                            }`}>
                              {t.priority}
                            </span>
                          </div>

                          <h4 className="text-sm font-bold truncate tracking-tight">{t.title}</h4>
                          <p className="text-xs mt-1 text-gray-500 leading-relaxed min-h-[32px]">
                            {t.desc}
                          </p>

                          <div className="mt-4 pt-3 border-t border-gray-100/60 flex items-center justify-between">
                            <span className="text-[10px] font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full capitalize">
                              {t.type}
                            </span>
                            {/* Column action control */}
                            {col !== 'Resolved' && (
                              <button 
                                onClick={() => moveTicket(t.id, col)}
                                className="p-1 rounded-lg bg-gray-50 hover:bg-indigo-50 border border-gray-100 hover:border-indigo-200 text-gray-500 hover:text-indigo-600 transition-all flex items-center justify-center cursor-pointer"
                              >
                                <span className="material-symbols-outlined text-sm font-bold">arrow_forward</span>
                              </button>
                            )}
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Kanban Info Footer note */}
          <div className="mt-3 text-left py-2 border-t border-gray-100 flex-shrink-0">
            <p className="text-[10px] text-gray-400 font-medium italic">
              * Approving a card moves the asset to under maintenance; resolving returns it to available. Click arrow keys on cards to transition states.
            </p>
          </div>
        </div>
      </main>

      {/* Add Request Dialog Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-gray-900/40 backdrop-blur-sm transition-opacity" onClick={() => setShowAddModal(false)} />
          <form 
            onSubmit={handleAddRequest} 
            className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden relative z-10 border border-gray-100 p-6 text-left animate-slide-in"
          >
            <div className="flex justify-between items-center mb-5">
              <h3 className="text-base font-extrabold text-gray-900 tracking-tight">Request Maintenance</h3>
              <button type="button" onClick={() => setShowAddModal(false)} className="text-gray-400 hover:text-gray-600">
                <span className="material-symbols-outlined text-lg">close</span>
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">Asset ID *</label>
                <input 
                  value={newAssetId} 
                  onChange={e => setNewAssetId(e.target.value)} 
                  placeholder="e.g. AF-0062" 
                  autoFocus 
                  required
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-indigo-500 bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">Problem Area *</label>
                <input 
                  value={newTitle} 
                  onChange={e => setNewTitle(e.target.value)} 
                  placeholder="e.g. Projector bulb" 
                  required
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-indigo-500 bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">Description *</label>
                <textarea 
                  value={newDesc} 
                  onChange={e => setNewDesc(e.target.value)} 
                  placeholder="e.g. not turning on after power spike" 
                  required
                  rows={3}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-indigo-500 bg-white resize-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">Category</label>
                  <select 
                    value={newType} 
                    onChange={e => setNewType(e.target.value)}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-indigo-500 bg-white cursor-pointer"
                  >
                    <option value="electronics">Electronics</option>
                    <option value="mechanical">Mechanical</option>
                    <option value="hvac">HVAC</option>
                    <option value="furniture">Furniture</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">Priority</label>
                  <select 
                    value={newPriority} 
                    onChange={e => setNewPriority(e.target.value)}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-indigo-500 bg-white cursor-pointer"
                  >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="flex gap-3 justify-end mt-6">
              <button 
                type="button" 
                onClick={() => setShowAddModal(false)} 
                className="px-4.5 py-2.5 border border-gray-200 rounded-xl text-xs font-bold text-gray-600 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button 
                type="submit" 
                className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition-all active:scale-98 shadow-sm shadow-indigo-100"
              >
                Submit Request
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
