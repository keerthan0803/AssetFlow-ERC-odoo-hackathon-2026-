import React, { useState } from 'react';
import toast from 'react-hot-toast';
import Sidebar from '../../components/Sidebar';

const RESOURCES = ['Conference Room B2', 'Conference Room A1', 'Lab 3 — Electronics', 'Training Hall', 'Meeting Pod 1', 'Board Room'];
const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
const MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

const today = new Date();
const dayName = DAYS[today.getDay() === 0 ? 4 : Math.max(0, today.getDay() - 1)];
const dayNum = today.getDate();
const monthName = MONTHS[today.getMonth()];

const generateSlots = (resource) => {
  const base = {
    'Conference Room B2': [
      { time: '9:00',  label: 'Booked — Procurement Team — 9 to 10',             type: 'booked' },
      { time: '10:00', label: 'Requested 9:30 to 10:30 — conflict — slot is unavailable', type: 'conflict' },
      { time: '11:00', label: '', type: 'available' },
      { time: '12:00', label: '', type: 'available' },
      { time: '1:00',  label: '', type: 'available' },
      { time: '2:00',  label: 'Booked — HR Onboarding — 2 to 3',                 type: 'booked' },
      { time: '3:00',  label: '', type: 'available' },
    ],
    'Conference Room A1': [
      { time: '9:00',  label: '', type: 'available' },
      { time: '10:00', label: 'Booked — Engineering Sync — 10 to 11',            type: 'booked' },
      { time: '11:00', label: '', type: 'available' },
      { time: '12:00', label: 'Booked — Leadership Meeting — 12 to 2',           type: 'booked' },
      { time: '1:00',  label: '', type: 'available' },
      { time: '2:00',  label: '', type: 'available' },
      { time: '3:00',  label: '', type: 'available' },
    ],
  };
  return base[resource] || DAYS.map((_, i) => ({ time: `${9+i}:00`, label: '', type: 'available' }));
};

export default function Booking() {
  const [selectedResource, setSelectedResource] = useState(RESOURCES[0]);
  const [resourceInput, setResourceInput] = useState(`${RESOURCES[0]} — ${dayName}, ${dayNum} ${monthName}`);
  const [showResourceDrop, setShowResourceDrop] = useState(false);
  const [selectedDay, setSelectedDay] = useState(dayName);
  const [showBookModal, setShowBookModal] = useState(false);
  const [bookingTitle, setBookingTitle] = useState('');
  const [bookingSlot, setBookingSlot] = useState('11:00');

  const slots = generateSlots(selectedResource);
  const availableSlots = slots.filter(s => s.type === 'available');

  const handleResourceSelect = (r) => { setSelectedResource(r); setResourceInput(`${r} — ${selectedDay}, ${dayNum} ${monthName}`); setShowResourceDrop(false); };

  const handleSlotClick = (slot) => {
    if (slot.type === 'booked')   { toast.error('Slot already booked'); return; }
    if (slot.type === 'conflict') { toast.error('Slot has a conflict'); return; }
    setBookingSlot(slot.time); setShowBookModal(true);
  };

  const handleConfirm = () => {
    if (!bookingTitle.trim()) { toast.error('Please enter a meeting title'); return; }
    toast.success(`Booked ${bookingSlot} in ${selectedResource} for "${bookingTitle}"`);
    setShowBookModal(false); setBookingTitle('');
  };

  const SlotRow = ({ slot }) => {
    const styles = {
      booked:    { bg: '#f0fdf4', border: '1.5px solid #86efac', color: '#15803d', icon: 'event_busy',    cursor: 'not-allowed' },
      conflict:  { bg: '#fef2f2', border: '1.5px dashed #fca5a5', color: '#b91c1c', icon: 'warning',      cursor: 'not-allowed' },
      available: { bg: '#fff',    border: '1px dashed #d1d5db',   color: '#9ca3af', icon: 'add_circle',   cursor: 'pointer' },
    };
    const s = styles[slot.type];
    return (
      <div onClick={() => handleSlotClick(slot)} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '10px 18px', borderBottom: '1px solid #f3f4f6', minHeight: 48, cursor: s.cursor }}
        onMouseEnter={e => { if (slot.type === 'available') e.currentTarget.style.background = '#eff2ff'; }}
        onMouseLeave={e => { if (slot.type === 'available') e.currentTarget.style.background = '#fff'; }}>
        <span style={{ width: 42, fontSize: 13, fontWeight: 700, color: '#374151', flexShrink: 0 }}>{slot.time}</span>
        <div style={{ flex: 1, padding: slot.type === 'available' ? '7px 12px' : '7px 12px', borderRadius: 7, border: s.border, backgroundColor: s.bg, display: 'flex', alignItems: 'center', gap: 8 }}>
          <span className="material-symbols-outlined" style={{ fontSize: 15, color: s.color, fontVariationSettings: "'FILL' 1" }}>{s.icon}</span>
          <span style={{ fontSize: 13, color: s.color, fontWeight: slot.type === 'booked' ? 600 : 500, fontStyle: slot.type === 'conflict' ? 'italic' : 'normal' }}>
            {slot.label || 'Available — click to book'}
          </span>
        </div>
      </div>
    );
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f8f9fc', fontFamily: "'Inter', sans-serif" }}>
      <style>{`
        .fi { width:100%;padding:9px 12px;border:1px solid #e5e7eb;border-radius:8px;font-size:13px;color:#111827;outline:none;box-sizing:border-box;background:#fff; }
        .fi:focus { border-color:#3b5bdb;box-shadow:0 0 0 3px rgba(59,91,219,0.1); }
        .dd-item:hover { background:#f9fafb; }
        .modal-overlay { position:fixed;inset:0;background:rgba(0,0,0,0.35);display:flex;align-items:center;justify-content:center;z-index:999; }
        .modal-box { background:#fff;border-radius:16px;padding:28px;width:400px;box-shadow:0 20px 60px rgba(0,0,0,0.15); }
      `}</style>

      <Sidebar />

      <main style={{ flex: 1, overflowY: 'auto' }}>
        <header style={{ backgroundColor: '#fff', borderBottom: '1px solid #e5e7eb', padding: '14px 28px', position: 'sticky', top: 0, zIndex: 40 }}>
          <div style={{ fontSize: 18, fontWeight: 800, color: '#111827' }}>Resource Booking</div>
          <div style={{ fontSize: 12, color: '#9ca3af' }}>Schedule and manage shared resource reservations</div>
        </header>

        <div style={{ padding: '28px', maxWidth: 680 }}>
          {/* Resource Selector */}
          <div style={{ marginBottom: 20, position: 'relative' }}>
            <label style={{ fontSize: 12, fontWeight: 600, color: '#374151', display: 'block', marginBottom: 5 }}>Resource</label>
            <input className="fi" value={resourceInput} onChange={e => setResourceInput(e.target.value)} onFocus={() => setShowResourceDrop(true)} onBlur={() => setTimeout(() => setShowResourceDrop(false), 150)} />
            {showResourceDrop && (
              <div style={{ position: 'absolute', top: '100%', left: 0, right: 0, zIndex: 100, background: '#fff', border: '1px solid #e5e7eb', borderRadius: 10, marginTop: 4, overflow: 'hidden', boxShadow: '0 8px 24px rgba(0,0,0,0.1)' }}>
                {RESOURCES.map(r => (
                  <div key={r} className="dd-item" onMouseDown={() => handleResourceSelect(r)} style={{ padding: '10px 14px', cursor: 'pointer', fontSize: 13, borderBottom: '1px solid #f3f4f6', color: r === selectedResource ? '#3b5bdb' : '#374151', fontWeight: r === selectedResource ? 700 : 400 }}>
                    {r}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Day tabs */}
          <div style={{ display: 'flex', gap: 6, marginBottom: 18 }}>
            {DAYS.map(d => (
              <button key={d} onClick={() => setSelectedDay(d)}
                style={{ padding: '6px 16px', borderRadius: 8, fontSize: 12, fontWeight: d===selectedDay ? 700 : 500, cursor: 'pointer', border: d===selectedDay ? 'none' : '1px solid #e5e7eb', backgroundColor: d===selectedDay ? '#3b5bdb' : '#fff', color: d===selectedDay ? '#fff' : '#374151' }}>
                {d}
              </button>
            ))}
          </div>

          {/* Slot grid */}
          <div style={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: 12, overflow: 'hidden', marginBottom: 20 }}>
            {slots.map((s, i) => <SlotRow key={i} slot={s} />)}
          </div>

          {/* Book button */}
          <button onClick={() => setShowBookModal(true)}
            style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '10px 24px', borderRadius: 9, border: 'none', cursor: 'pointer', backgroundColor: '#16a34a', color: '#fff', fontSize: 13, fontWeight: 700 }}>
            <span className="material-symbols-outlined" style={{ fontSize: 16 }}>add</span>
            Book a Slot
          </button>

          {/* Legend */}
          <div style={{ marginTop: 16, display: 'flex', gap: 20 }}>
            {[{bg:'#f0fdf4',border:'#86efac',color:'#15803d',label:'Booked'},{bg:'#fef2f2',border:'#fca5a5',color:'#b91c1c',label:'Conflict',dashed:true},{bg:'#fff',border:'#d1d5db',color:'#9ca3af',label:'Available',dashed:true}].map(l => (
              <div key={l.label} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <div style={{ width: 12, height: 12, borderRadius: 3, backgroundColor: l.bg, border: `${l.dashed?'1px dashed':'1.5px solid'} ${l.border}` }} />
                <span style={{ fontSize: 12, color: '#6b7280', fontWeight: 500 }}>{l.label}</span>
              </div>
            ))}
          </div>
        </div>
      </main>

      {showBookModal && (
        <div className="modal-overlay" onClick={() => setShowBookModal(false)}>
          <div className="modal-box" onClick={e => e.stopPropagation()}>
            <h3 style={{ fontSize: 16, fontWeight: 800, marginBottom: 20, color: '#111827' }}>Book a Slot</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 13 }}>
              {[{l:'Resource',v:selectedResource,ro:true},{l:'Date',v:`${selectedDay}, ${dayNum} ${monthName}`,ro:true}].map(f => (
                <div key={f.l}>
                  <label style={{ fontSize: 12, fontWeight: 600, color: '#374151', display: 'block', marginBottom: 5 }}>{f.l}</label>
                  <input className="fi" value={f.v} readOnly style={{ color: '#9ca3af', background: '#f9fafb' }} />
                </div>
              ))}
              <div>
                <label style={{ fontSize: 12, fontWeight: 600, color: '#374151', display: 'block', marginBottom: 5 }}>Time Slot</label>
                <select className="fi" value={bookingSlot} onChange={e => setBookingSlot(e.target.value)} style={{ cursor: 'pointer' }}>
                  {availableSlots.map(s => <option key={s.time}>{s.time}</option>)}
                </select>
              </div>
              <div>
                <label style={{ fontSize: 12, fontWeight: 600, color: '#374151', display: 'block', marginBottom: 5 }}>Meeting Title *</label>
                <input className="fi" value={bookingTitle} onChange={e => setBookingTitle(e.target.value)} placeholder="e.g. Sprint Planning" autoFocus />
              </div>
            </div>
            <div style={{ display: 'flex', gap: 10, marginTop: 24, justifyContent: 'flex-end' }}>
              <button onClick={() => setShowBookModal(false)} style={{ padding: '8px 20px', borderRadius: 8, border: '1px solid #e5e7eb', background: '#fff', color: '#374151', fontSize: 13, cursor: 'pointer' }}>Cancel</button>
              <button onClick={handleConfirm} style={{ padding: '8px 22px', borderRadius: 8, border: 'none', background: '#16a34a', color: '#fff', fontSize: 13, fontWeight: 700, cursor: 'pointer' }}>Confirm Booking</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
