import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';

const reports = [
  { title: 'Monthly Asset Utilization', type: 'Utilization', date: 'Jul 01, 2026', size: '2.4 MB', status: 'Ready' },
  { title: 'Maintenance Cost Analysis Q2', type: 'Maintenance', date: 'Jun 30, 2026', size: '1.8 MB', status: 'Ready' },
  { title: 'Booking Efficiency Report', type: 'Booking', date: 'Jun 28, 2026', size: '980 KB', status: 'Ready' },
  { title: 'Overdue Asset Summary', type: 'Compliance', date: 'Jun 25, 2026', size: '540 KB', status: 'Processing' },
  { title: 'Department Allocation Report', type: 'Allocation', date: 'Jun 20, 2026', size: '3.1 MB', status: 'Ready' },
  { title: 'Audit Trail - June 2026', type: 'Audit', date: 'Jun 01, 2026', size: '5.6 MB', status: 'Ready' },
];

export default function Reports() {
  const [search, setSearch] = useState('');
  const filtered = reports.filter(r => r.title.toLowerCase().includes(search.toLowerCase()) || r.type.toLowerCase().includes(search.toLowerCase()));

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
          <Link to="/reports" className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-bold border-l-4" style={{ color: '#b4c5ff', borderColor: '#b4c5ff', backgroundColor: 'rgba(180,197,255,0.05)' }}>
            <span className="material-symbols-outlined text-[20px]">bar_chart</span> Reports
          </Link>
          <Link to="/notifications" className="flex items-center gap-3 px-4 py-2.5 rounded-lg hover:bg-white/5 text-sm font-medium" style={{ color: '#c3c6d7' }}>
            <span className="material-symbols-outlined text-[20px]">notifications</span> Notifications
          </Link>
        </nav>
      </aside>

      {/* Main */}
      <main className="flex-1 flex flex-col">
        <header className="h-16 border-b border-white/5 flex items-center justify-between px-6" style={{ backgroundColor: 'rgba(17,19,27,0.8)', backdropFilter: 'blur(12px)' }}>
          <h2 className="text-base font-bold" style={{ color: '#b4c5ff' }}>Reports</h2>
          <button onClick={() => toast.success('Generating new report...')} className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-all hover:opacity-90" style={{ backgroundColor: '#b4c5ff', color: '#00174b' }}>
            <span className="material-symbols-outlined text-[18px]">add</span> Generate Report
          </button>
        </header>

        <div className="p-6 space-y-6">
          {/* Summary Cards */}
          <div className="grid grid-cols-3 gap-4">
            {[
              { label: 'Total Reports', value: '24', icon: 'description', color: '#b4c5ff' },
              { label: 'Ready to Download', value: '20', icon: 'download', color: '#6ee7b7' },
              { label: 'Processing', value: '4', icon: 'sync', color: '#fbbf24' },
            ].map(s => (
              <div key={s.label} className="glass-panel rounded-2xl p-5">
                <div className="flex items-center gap-2 mb-2">
                  <span className="material-symbols-outlined" style={{ color: s.color }}>{s.icon}</span>
                  <span className="text-xs font-semibold" style={{ color: '#c3c6d7' }}>{s.label}</span>
                </div>
                <div className="text-3xl font-bold" style={{ color: s.color }}>{s.value}</div>
              </div>
            ))}
          </div>

          {/* Search */}
          <div className="glass-panel flex items-center gap-2 px-4 py-2.5 rounded-full w-72">
            <span className="material-symbols-outlined text-sm" style={{ color: '#c3c6d7' }}>search</span>
            <input value={search} onChange={e => setSearch(e.target.value)} className="bg-transparent border-none outline-none text-sm flex-1" placeholder="Search reports..." style={{ color: '#e1e2ed' }} />
          </div>

          {/* Report List */}
          <div className="space-y-3">
            {filtered.map((r, i) => (
              <div key={i} className="glass-panel rounded-2xl p-5 flex items-center justify-between hover:bg-white/[0.04] transition-all cursor-pointer" onClick={() => toast.success(`Opening: ${r.title}`)}>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: 'rgba(180,197,255,0.1)' }}>
                    <span className="material-symbols-outlined text-[20px]" style={{ color: '#b4c5ff' }}>description</span>
                  </div>
                  <div>
                    <div className="text-sm font-semibold">{r.title}</div>
                    <div className="text-xs mt-0.5" style={{ color: '#c3c6d7' }}>{r.type} · {r.date} · {r.size}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="px-3 py-0.5 rounded-full text-[10px] font-bold uppercase" style={{
                    backgroundColor: r.status === 'Ready' ? 'rgba(110,231,183,0.1)' : 'rgba(251,191,36,0.1)',
                    color: r.status === 'Ready' ? '#6ee7b7' : '#fbbf24',
                    border: `1px solid ${r.status === 'Ready' ? 'rgba(110,231,183,0.2)' : 'rgba(251,191,36,0.2)'}`
                  }}>
                    {r.status}
                  </span>
                  {r.status === 'Ready' && (
                    <button onClick={e => { e.stopPropagation(); toast.success('Downloading report...'); }} className="material-symbols-outlined text-[20px] hover:text-white transition-colors" style={{ color: '#b4c5ff' }}>
                      download
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
