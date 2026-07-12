import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';

const notifications = [
  { id: 1, title: '3 assets overdue for return', desc: 'Laptop AF-0114, Monitor AF-0088, Scanner AF-0031 are past due date — flagged for follow-up.', time: '5 min ago', type: 'urgent', icon: 'warning', read: false },
  { id: 2, title: 'Booking confirmed — Room B2', desc: 'Room B2 booking confirmed for 2:00 PM to 3:00 PM by Priya Shah.', time: '18 min ago', type: 'info', icon: 'event_available', read: false },
  { id: 3, title: 'Maintenance resolved — Projector AF-0062', desc: 'Scheduled maintenance for Projector AF-0062 has been marked resolved by technician Alex Chen.', time: '1 hr ago', type: 'success', icon: 'build_circle', read: true },
  { id: 4, title: 'New asset registered', desc: 'iPad Pro AF-0199 has been registered and added to the IT Department asset pool.', time: '2 hr ago', type: 'info', icon: 'add_circle', read: true },
  { id: 5, title: 'Pending transfer approval needed', desc: 'Transfer TRF-004 (Scanner AF-0031) from Audit Team to Operations requires your approval.', time: '3 hr ago', type: 'warning', icon: 'pending_actions', read: false },
  { id: 6, title: 'Audit scheduled — Finance Dept', desc: 'Quarterly audit for Finance Department assets scheduled for Jul 15, 2026 at 10:00 AM.', time: '5 hr ago', type: 'info', icon: 'calendar_today', read: true },
];

export default function Notifications() {
  const [items, setItems] = useState(notifications);

  const markAll = () => {
    setItems(prev => prev.map(n => ({ ...n, read: true })));
    toast.success('All notifications marked as read');
  };

  const markRead = (id) => {
    setItems(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const typeColor = (type) => {
    if (type === 'urgent') return { bg: 'rgba(255,180,171,0.1)', border: 'rgba(255,180,171,0.2)', icon: '#ffb4ab' };
    if (type === 'warning') return { bg: 'rgba(251,191,36,0.1)', border: 'rgba(251,191,36,0.2)', icon: '#fbbf24' };
    if (type === 'success') return { bg: 'rgba(110,231,183,0.1)', border: 'rgba(110,231,183,0.2)', icon: '#6ee7b7' };
    return { bg: 'rgba(180,197,255,0.08)', border: 'rgba(180,197,255,0.15)', icon: '#b4c5ff' };
  };

  const unread = items.filter(n => !n.read).length;

  return (
    <div className="bg-background text-on-surface min-h-screen flex" style={{ backgroundColor: '#11131b', color: '#e1e2ed', fontFamily: "'Inter', sans-serif" }}>
      <style>{`
        .glass-panel { backdrop-filter: blur(12px); background: rgba(29,31,39,0.7); border: 1px solid rgba(255,255,255,0.05); }
      `}</style>

      {/* Sidebar */}
      <aside className="hidden md:flex flex-col w-[240px] border-r border-white/5 min-h-screen flex-shrink-0" style={{ backgroundColor: '#1d1f27' }}>
        <div className="px-6 py-8">
          <h1 className="text-xl font-bold" style={{ color: '#b4c5ff' }}>AssetFlow</h1>
        </div>
        <nav className="flex-1 px-3 space-y-1">
          <Link to="/" className="flex items-center gap-3 px-4 py-2.5 rounded-lg hover:bg-white/5 text-sm font-medium" style={{ color: '#c3c6d7' }}>
            <span className="material-symbols-outlined text-[20px]">dashboard</span> Dashboard
          </Link>
          <Link to="/organization/departments" className="flex items-center gap-3 px-4 py-2.5 rounded-lg hover:bg-white/5 text-sm font-medium" style={{ color: '#c3c6d7' }}>
            <span className="material-symbols-outlined text-[20px]">corporate_fare</span> Organization Setup
          </Link>
          <Link to="/assets" className="flex items-center gap-3 px-4 py-2.5 rounded-lg hover:bg-white/5 text-sm font-medium" style={{ color: '#c3c6d7' }}>
            <span className="material-symbols-outlined text-[20px]">inventory_2</span> Assets
          </Link>
          <Link to="/allocation" className="flex items-center gap-3 px-4 py-2.5 rounded-lg hover:bg-white/5 text-sm font-medium" style={{ color: '#c3c6d7' }}>
            <span className="material-symbols-outlined text-[20px]">swap_horiz</span> Allocation & Transfer
          </Link>
          <Link to="/booking" className="flex items-center gap-3 px-4 py-2.5 rounded-lg hover:bg-white/5 text-sm font-medium" style={{ color: '#c3c6d7' }}>
            <span className="material-symbols-outlined text-[20px]">calendar_month</span> Resource Booking
          </Link>
          <Link to="/maintenance" className="flex items-center gap-3 px-4 py-2.5 rounded-lg hover:bg-white/5 text-sm font-medium" style={{ color: '#c3c6d7' }}>
            <span className="material-symbols-outlined text-[20px]">engineering</span> Maintenance
          </Link>
          <Link to="/audit" className="flex items-center gap-3 px-4 py-2.5 rounded-lg hover:bg-white/5 text-sm font-medium" style={{ color: '#c3c6d7' }}>
            <span className="material-symbols-outlined text-[20px]">verified_user</span> Audit
          </Link>
          <Link to="/reports" className="flex items-center gap-3 px-4 py-2.5 rounded-lg hover:bg-white/5 text-sm font-medium" style={{ color: '#c3c6d7' }}>
            <span className="material-symbols-outlined text-[20px]">bar_chart</span> Reports
          </Link>
          <Link to="/notifications" className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-bold border-l-4 relative" style={{ color: '#b4c5ff', borderColor: '#b4c5ff', backgroundColor: 'rgba(180,197,255,0.05)' }}>
            <span className="material-symbols-outlined text-[20px]">notifications</span> Notifications
            {unread > 0 && <span className="ml-auto text-[10px] font-bold px-1.5 py-0.5 rounded-full" style={{ backgroundColor: '#ffb4ab', color: '#11131b' }}>{unread}</span>}
          </Link>
        </nav>
      </aside>

      {/* Main */}
      <main className="flex-1 flex flex-col">
        <header className="h-16 border-b border-white/5 flex items-center justify-between px-6" style={{ backgroundColor: 'rgba(17,19,27,0.8)', backdropFilter: 'blur(12px)' }}>
          <div className="flex items-center gap-3">
            <h2 className="text-base font-bold" style={{ color: '#b4c5ff' }}>Notifications</h2>
            {unread > 0 && (
              <span className="text-[11px] font-bold px-2 py-0.5 rounded-full" style={{ backgroundColor: 'rgba(255,180,171,0.15)', color: '#ffb4ab', border: '1px solid rgba(255,180,171,0.2)' }}>
                {unread} unread
              </span>
            )}
          </div>
          <button onClick={markAll} className="text-xs font-semibold hover:underline" style={{ color: '#b4c5ff' }}>
            Mark all as read
          </button>
        </header>

        <div className="p-6 space-y-3 max-w-3xl">
          {items.map(n => {
            const colors = typeColor(n.type);
            return (
              <div
                key={n.id}
                onClick={() => markRead(n.id)}
                className="rounded-2xl p-5 flex items-start gap-4 cursor-pointer transition-all hover:bg-white/[0.03]"
                style={{
                  backgroundColor: n.read ? 'rgba(29,31,39,0.4)' : colors.bg,
                  border: `1px solid ${n.read ? 'rgba(255,255,255,0.05)' : colors.border}`,
                  opacity: n.read ? 0.7 : 1,
                }}
              >
                <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: n.read ? 'rgba(255,255,255,0.05)' : colors.bg }}>
                  <span className="material-symbols-outlined text-[20px]" style={{ color: n.read ? '#c3c6d7' : colors.icon }}>{n.icon}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-sm font-semibold">{n.title}</span>
                    <span className="text-[11px] flex-shrink-0" style={{ color: '#c3c6d7' }}>{n.time}</span>
                  </div>
                  <p className="text-xs mt-1 leading-relaxed" style={{ color: '#c3c6d7' }}>{n.desc}</p>
                </div>
                {!n.read && (
                  <div className="w-2 h-2 rounded-full flex-shrink-0 mt-1" style={{ backgroundColor: colors.icon }} />
                )}
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
}
