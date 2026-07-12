import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import Sidebar from '../../components/Sidebar';

const STATS = [
  { label: 'Available', value: 128, icon: 'check_circle', color: '#16a34a', bg: '#f0fdf4', border: '#bbf7d0' },
  { label: 'Allocated', value: 76,  icon: 'person',       color: '#3b5bdb', bg: '#eff2ff', border: '#c5d0fc' },
  { label: 'Available Rooms', value: 4, icon: 'meeting_room', color: '#7c3aed', bg: '#f5f3ff', border: '#ddd6fe' },
  { label: 'Active Bookings', value: 9, icon: 'event_available', color: '#0891b2', bg: '#ecfeff', border: '#a5f3fc' },
  { label: 'Pending Transfers', value: 3, icon: 'swap_horiz', color: '#d97706', bg: '#fffbeb', border: '#fde68a' },
  { label: 'Upcoming Returns', value: 12, icon: 'assignment_return', color: '#dc2626', bg: '#fef2f2', border: '#fecaca' },
];

const ACTIVITIES = [
  { icon: 'laptop',         color: '#3b5bdb', text: 'Laptop AF-0114 — allocated to Priya Shah — IT Dept',  time: '9:41 AM' },
  { icon: 'meeting_room',   color: '#7c3aed', text: 'Room B2 — booking confirmed — 2:00 to 3:00 PM',       time: '9:28 AM' },
  { icon: 'display_settings', color: '#0891b2', text: 'Projector AF-0062 — maintenance resolved',           time: '8:55 AM' },
  { icon: 'swap_horiz',     color: '#d97706', text: 'Monitor AF-0088 — transfer request from Rohan Mehta',  time: '8:30 AM' },
  { icon: 'inventory_2',    color: '#16a34a', text: 'iPad AF-0199 — returned to warehouse by Sana Iqbal',  time: '8:10 AM' },
];

const QUICK_ACTIONS = [
  { label: '+ Register Asset',  color: '#3b5bdb', bg: '#3b5bdb', text: '#fff',    icon: 'add_circle', path: '/assets' },
  { label: 'Book Resource',     color: '#7c3aed', bg: '#f5f3ff', text: '#7c3aed', icon: 'event_available', path: '/booking' },
  { label: 'Raise Request',     color: '#d97706', bg: '#fffbeb', text: '#d97706', icon: 'warning', path: '/allocation' },
];

export default function Dashboard() {
  const navigate = useNavigate();
  const [overdueVisible, setOverdueVisible] = useState(true);

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f8f9fc', fontFamily: "'Inter', sans-serif" }}>
      <style>{`
        .stat-card { background: #fff; border: 1px solid #e5e7eb; border-radius: 12px; padding: 20px; transition: box-shadow 0.15s, transform 0.15s; cursor: default; }
        .stat-card:hover { box-shadow: 0 4px 16px rgba(0,0,0,0.08); transform: translateY(-1px); }
        .activity-row { display: flex; align-items: center; gap: 12px; padding: 12px 0; border-bottom: 1px solid #f3f4f6; }
        .activity-row:last-child { border-bottom: none; }
        .quick-btn { display: flex; align-items: center; gap: 8px; padding: 10px 20px; border-radius: 9px; font-size: 13px; font-weight: 700; border: none; cursor: pointer; transition: all 0.12s; }
        .quick-btn:hover { filter: brightness(0.93); transform: translateY(-1px); box-shadow: 0 4px 12px rgba(0,0,0,0.1); }
      `}</style>

      <Sidebar />

      <main style={{ flex: 1, overflowY: 'auto' }}>
        {/* Top header */}
        <header style={{ backgroundColor: '#fff', borderBottom: '1px solid #e5e7eb', padding: '14px 28px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'sticky', top: 0, zIndex: 40 }}>
          <div>
            <div style={{ fontSize: 18, fontWeight: 800, color: '#111827', letterSpacing: '-0.3px' }}>Dashboard</div>
            <div style={{ fontSize: 12, color: '#9ca3af', fontWeight: 500 }}>Good morning · {new Date().toLocaleDateString('en-IN', { weekday:'long', day:'numeric', month:'long' })}</div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ position: 'relative' }}>
              <span className="material-symbols-outlined" style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', color: '#9ca3af', fontSize: 16 }}>search</span>
              <input placeholder="Search assets..." style={{ paddingLeft: 34, paddingRight: 14, paddingTop: 8, paddingBottom: 8, borderRadius: 8, border: '1px solid #e5e7eb', fontSize: 13, color: '#374151', backgroundColor: '#f9fafb', outline: 'none', width: 220 }} />
            </div>
            <button onClick={() => navigate('/notifications')} style={{ width: 36, height: 36, borderRadius: 8, border: '1px solid #e5e7eb', backgroundColor: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', position: 'relative' }}>
              <span className="material-symbols-outlined" style={{ fontSize: 18, color: '#374151' }}>notifications</span>
              <span style={{ position: 'absolute', top: 6, right: 6, width: 8, height: 8, borderRadius: '50%', backgroundColor: '#ef4444', border: '2px solid #fff' }} />
            </button>
            <div style={{ width: 34, height: 34, borderRadius: 8, background: 'linear-gradient(135deg, #3b5bdb, #845ef7)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ color: '#fff', fontSize: 13, fontWeight: 700 }}>A</span>
            </div>
          </div>
        </header>

        <div style={{ padding: '24px 28px', maxWidth: 1200 }}>

          {/* Section heading */}
          <div style={{ marginBottom: 16 }}>
            <h2 style={{ fontSize: 16, fontWeight: 700, color: '#111827', marginBottom: 2 }}>Today's Overview</h2>
            <p style={{ fontSize: 12, color: '#9ca3af' }}>Live snapshot of all enterprise assets and bookings</p>
          </div>

          {/* Stats grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14, marginBottom: 20 }}>
            {STATS.map(s => (
              <div key={s.label} className="stat-card">
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
                  <span style={{ fontSize: 11, fontWeight: 700, color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{s.label}</span>
                  <div style={{ width: 32, height: 32, borderRadius: 8, backgroundColor: s.bg, border: `1px solid ${s.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <span className="material-symbols-outlined" style={{ fontSize: 16, color: s.color, fontVariationSettings: "'FILL' 1" }}>{s.icon}</span>
                  </div>
                </div>
                <div style={{ fontSize: 32, fontWeight: 800, color: '#111827', lineHeight: 1 }}>{s.value}</div>
              </div>
            ))}
          </div>

          {/* Overdue alert */}
          {overdueVisible && (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 16px', borderRadius: 10, backgroundColor: '#fef2f2', border: '1px solid #fecaca', marginBottom: 20 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <span className="material-symbols-outlined" style={{ fontSize: 18, color: '#ef4444', fontVariationSettings: "'FILL' 1" }}>warning</span>
                <span style={{ fontSize: 13, fontWeight: 600, color: '#dc2626' }}>3 assets overdue for return — flagged for follow-up</span>
              </div>
              <button onClick={() => setOverdueVisible(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#ef4444', padding: 4 }}>
                <span className="material-symbols-outlined" style={{ fontSize: 16 }}>close</span>
              </button>
            </div>
          )}

          {/* Quick actions */}
          <div style={{ display: 'flex', gap: 10, marginBottom: 28 }}>
            {QUICK_ACTIONS.map(a => (
              <button key={a.label} className="quick-btn" onClick={() => navigate(a.path)} style={{ backgroundColor: a.bg, color: a.text }}>
                <span className="material-symbols-outlined" style={{ fontSize: 16, fontVariationSettings: "'FILL' 1" }}>{a.icon}</span>
                {a.label}
              </button>
            ))}
          </div>

          {/* Recent Activity */}
          <div style={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: 12, overflow: 'hidden' }}>
            <div style={{ padding: '16px 20px', borderBottom: '1px solid #f3f4f6', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: '#111827' }}>Recent Activity</div>
              <span style={{ fontSize: 11, color: '#9ca3af', fontWeight: 600, backgroundColor: '#f3f4f6', padding: '3px 10px', borderRadius: 99 }}>Today</span>
            </div>
            <div style={{ padding: '4px 20px 8px' }}>
              {ACTIVITIES.map((a, i) => (
                <div key={i} className="activity-row">
                  <div style={{ width: 34, height: 34, borderRadius: 9, backgroundColor: a.color + '15', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <span className="material-symbols-outlined" style={{ fontSize: 16, color: a.color, fontVariationSettings: "'FILL' 1" }}>{a.icon}</span>
                  </div>
                  <span style={{ flex: 1, fontSize: 13, color: '#374151', fontWeight: 500 }}>{a.text}</span>
                  <span style={{ fontSize: 11, color: '#9ca3af', fontWeight: 600, flexShrink: 0 }}>{a.time}</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}
