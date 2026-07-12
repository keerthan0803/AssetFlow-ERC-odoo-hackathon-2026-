import React, { useState } from 'react';
import toast from 'react-hot-toast';
import Sidebar from '../../components/Sidebar';

const INITIAL_NOTIFICATIONS = [
  { id: 1, title: '3 assets overdue for return', desc: 'Laptop AF-0114, Monitor AF-0088, Scanner AF-0031 are past due date — flagged for follow-up.', time: '5 min ago', type: 'urgent', icon: 'warning', read: false },
  { id: 2, title: 'Booking confirmed — Room B2', desc: 'Room B2 booking confirmed for 2:00 PM to 3:00 PM by Priya Shah.', time: '18 min ago', type: 'info', icon: 'event_available', read: false },
  { id: 3, title: 'Maintenance resolved — Projector AF-0062', desc: 'Scheduled maintenance for Projector AF-0062 has been marked resolved by technician Alex Chen.', time: '1 hr ago', type: 'success', icon: 'build_circle', read: true },
  { id: 4, title: 'New asset registered', desc: 'iPad Pro AF-0199 has been registered and added to the IT Department asset pool.', time: '2 hr ago', type: 'info', icon: 'add_circle', read: true },
  { id: 5, title: 'Pending transfer approval needed', desc: 'Transfer TRF-004 (Scanner AF-0031) from Audit Team to Operations requires your approval.', time: '3 hr ago', type: 'warning', icon: 'pending_actions', read: false },
  { id: 6, title: 'Audit scheduled — Finance Dept', desc: 'Quarterly audit for Finance Department assets scheduled for Jul 15, 2026 at 10:00 AM.', time: '5 hr ago', type: 'info', icon: 'calendar_today', read: true },
];

export default function Notifications() {
  const [items, setItems] = useState(INITIAL_NOTIFICATIONS);

  const markAll = () => {
    setItems(prev => prev.map(n => ({ ...n, read: true })));
    toast.success('All notifications marked as read');
  };

  const markRead = (id) => {
    setItems(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const typeConfig = (type) => {
    if (type === 'urgent') return { bg: 'bg-red-50/50', border: 'border-red-100', text: 'text-red-700', icon: 'error', iconClass: 'text-red-600 bg-red-100' };
    if (type === 'warning') return { bg: 'bg-amber-50/50', border: 'border-amber-100', text: 'text-amber-700', icon: 'warning', iconClass: 'text-amber-600 bg-amber-100' };
    if (type === 'success') return { bg: 'bg-green-50/50', border: 'border-green-100', text: 'text-green-700', icon: 'check_circle', iconClass: 'text-green-600 bg-green-100' };
    return { bg: 'bg-indigo-50/40', border: 'border-indigo-100', text: 'text-indigo-700', icon: 'info', iconClass: 'text-indigo-600 bg-indigo-100' };
  };

  const unread = items.filter(n => !n.read).length;

  return (
    <div className="flex min-h-screen bg-gray-50/50 font-sans">
      <Sidebar />

      <main className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <header className="bg-white border-b border-gray-100 px-8 py-5 sticky top-0 z-40 shadow-sm flex items-center justify-between">
          <div className="pl-10 md:pl-0 flex items-center gap-3">
            <h1 className="text-xl font-bold text-gray-900 tracking-tight">Notifications</h1>
            {unread > 0 && (
              <span className="text-[10px] font-bold px-2 py-0.5 bg-indigo-50 text-indigo-700 rounded-full border border-indigo-200/40">
                {unread} Unread
              </span>
            )}
          </div>
          {unread > 0 && (
            <button 
              onClick={markAll} 
              className="text-xs font-bold text-indigo-600 hover:text-indigo-800 hover:underline cursor-pointer"
            >
              Mark all as read
            </button>
          )}
        </header>

        {/* Content Container */}
        <div className="p-8 max-w-3xl w-full mx-auto space-y-4 text-left">
          {items.map(n => {
            const config = typeConfig(n.type);
            return (
              <div
                key={n.id}
                onClick={() => markRead(n.id)}
                className={`rounded-2xl p-5 border flex gap-4 transition-all duration-200 cursor-pointer ${
                  n.read 
                    ? 'bg-white border-gray-100 hover:bg-gray-50/40 opacity-70' 
                    : `${config.bg} ${config.border} hover:shadow-sm`
                }`}
              >
                {/* Icon wrapper */}
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm ${
                  n.read ? 'bg-gray-100 text-gray-400' : config.iconClass
                }`}>
                  <span className="material-symbols-outlined text-lg">
                    {n.read ? 'notifications' : config.icon}
                  </span>
                </div>

                {/* Content body */}
                <div className="flex-1 min-w-0 text-left">
                  <div className="flex items-center justify-between gap-3">
                    <span className={`text-sm font-bold truncate ${n.read ? 'text-gray-700' : 'text-gray-900'}`}>
                      {n.title}
                    </span>
                    <span className="text-[10px] text-gray-400 font-bold tracking-wider flex-shrink-0">
                      {n.time}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                    {n.desc}
                  </p>
                </div>

                {/* Unread circle dot */}
                {!n.read && (
                  <div className="flex items-center flex-shrink-0">
                    <div className={`w-2.5 h-2.5 rounded-full ${
                      n.type === 'urgent' ? 'bg-red-500' : n.type === 'warning' ? 'bg-amber-500' : n.type === 'success' ? 'bg-green-500' : 'bg-indigo-500'
                    }`} />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
}
