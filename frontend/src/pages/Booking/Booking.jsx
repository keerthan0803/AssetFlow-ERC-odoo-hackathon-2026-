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
      { time: '09:00', label: 'Booked — Procurement Team Sync — 9 to 10', type: 'booked' },
      { time: '10:00', label: 'Overlapping request 9:30 to 10:30 — scheduling conflict detected', type: 'conflict' },
      { time: '11:00', label: '', type: 'available' },
      { time: '12:00', label: '', type: 'available' },
      { time: '13:00', label: '', type: 'available' },
      { time: '14:00', label: 'Booked — Employee Onboarding Session — 2 to 3', type: 'booked' },
      { time: '15:00', label: '', type: 'available' },
    ],
    'Conference Room A1': [
      { time: '09:00', label: '', type: 'available' },
      { time: '10:00', label: 'Booked — Engineering Sync — 10 to 11', type: 'booked' },
      { time: '11:00', label: '', type: 'available' },
      { time: '12:00', label: 'Booked — Executive Leadership Meeting — 12 to 2', type: 'booked' },
      { time: '13:00', label: '', type: 'available' },
      { time: '14:00', label: '', type: 'available' },
      { time: '15:00', label: '', type: 'available' },
    ],
  };
  return base[resource] || [
    { time: '09:00', label: '', type: 'available' },
    { time: '10:00', label: '', type: 'available' },
    { time: '11:00', label: '', type: 'available' },
    { time: '12:00', label: '', type: 'available' },
    { time: '13:00', label: '', type: 'available' },
    { time: '14:00', label: '', type: 'available' },
    { time: '15:00', label: '', type: 'available' },
  ];
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

  const handleResourceSelect = (r) => {
    setSelectedResource(r);
    setResourceInput(`${r} — ${selectedDay}, ${dayNum} ${monthName}`);
    setShowResourceDrop(false);
  };

  const handleSlotClick = (slot) => {
    if (slot.type === 'booked') { 
      toast.error('This slot is already booked'); 
      return; 
    }
    if (slot.type === 'conflict') { 
      toast.error('This slot has a conflict check warning'); 
      return; 
    }
    setBookingSlot(slot.time);
    setShowBookModal(true);
  };

  const handleConfirm = (e) => {
    e.preventDefault();
    if (!bookingTitle.trim()) { 
      toast.error('Please enter a meeting title'); 
      return; 
    }
    toast.success(`Reserved ${bookingSlot} in ${selectedResource} for "${bookingTitle}"`);
    setShowBookModal(false);
    setBookingTitle('');
  };

  return (
    <div className="flex min-h-screen bg-[#FBFBFC] font-sans antialiased text-slate-800">
      <Sidebar />

      <main className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        {/* Top Header */}
        <header className="bg-white border-b border-slate-100 px-8 py-5 sticky top-0 z-40">
          <div>
            <h1 className="text-xl font-black text-slate-900 tracking-tight">Resource Booking</h1>
            <p className="text-xs text-slate-400 font-semibold mt-1">Schedule and manage shared resource reservations</p>
          </div>
        </header>

        {/* Page Content */}
        <div className="px-8 py-6 max-w-3xl w-full mx-auto space-y-6 text-left">
          
          {/* Resource Selector */}
          <div className="relative">
            <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">Resource Selection</label>
            <input 
              type="text"
              value={resourceInput} 
              onChange={e => setResourceInput(e.target.value)} 
              onFocus={() => setShowResourceDrop(true)} 
              onBlur={() => setTimeout(() => setShowResourceDrop(false), 180)}
              className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-xs text-slate-850 placeholder-slate-400 focus:outline-none focus:border-black focus:ring-1 focus:ring-black bg-white shadow-sm"
            />
            {showResourceDrop && (
              <div className="absolute top-[100%] left-0 right-0 z-50 bg-white border border-slate-200 rounded-2xl mt-1.5 shadow-xl overflow-hidden divide-y divide-slate-50">
                {RESOURCES.map(r => (
                  <div 
                    key={r} 
                    onMouseDown={() => handleResourceSelect(r)} 
                    className={`p-3 text-xs cursor-pointer hover:bg-slate-50 transition-colors ${
                      r === selectedResource ? 'text-indigo-650 font-bold bg-indigo-50/20' : 'text-slate-700'
                    }`}
                  >
                    {r}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Day Tabs */}
          <div className="flex gap-1.5 bg-slate-100 p-1 rounded-xl w-fit">
            {DAYS.map(d => (
              <button 
                key={d} 
                onClick={() => setSelectedDay(d)}
                className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  d === selectedDay 
                    ? 'bg-white text-slate-900 shadow-sm' 
                    : 'text-slate-500 hover:text-slate-850'
                }`}
              >
                {d}
              </button>
            ))}
          </div>

          {/* Slot Rows List */}
          <div className="bg-white border border-slate-100 rounded-2xl shadow-sm overflow-hidden divide-y divide-slate-100">
            {slots.map((s, i) => {
              let rowStyle = '';
              let labelStyle = '';
              let icon = '';
              let badge = '';

              if (s.type === 'booked') {
                rowStyle = 'cursor-not-allowed bg-emerald-50/20';
                labelStyle = 'bg-emerald-50 border-emerald-100 text-emerald-700 font-semibold';
                icon = 'event_busy';
                badge = 'Booked';
              } else if (s.type === 'conflict') {
                rowStyle = 'cursor-not-allowed bg-red-50/10';
                labelStyle = 'bg-red-50 border-red-100 text-red-600 font-semibold italic border-dashed';
                icon = 'warning';
                badge = 'Conflict';
              } else {
                rowStyle = 'cursor-pointer hover:bg-indigo-50/20';
                labelStyle = 'bg-white border-slate-200 border-dashed text-slate-400 font-medium hover:border-indigo-400 hover:text-indigo-600';
                icon = 'add_circle';
                badge = 'Available';
              }

              return (
                <div 
                  key={i} 
                  onClick={() => handleSlotClick(s)} 
                  className={`flex items-center gap-4 px-6 py-4.5 transition-colors ${rowStyle}`}
                >
                  <span className="w-12 text-xs font-black text-slate-800 flex-shrink-0">{s.time}</span>
                  <div className={`flex-1 p-2.5 border rounded-xl flex items-center justify-between gap-3 transition-colors ${labelStyle}`}>
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-base flex-shrink-0">{icon}</span>
                      <span className="text-xs leading-normal">{s.label || 'Slot is open — click to reserve resource'}</span>
                    </div>
                    <span className="text-[9px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-full border border-current bg-white/50">{badge}</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Quick Book Trigger */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-1">
            <button 
              onClick={() => setShowBookModal(true)}
              className="flex items-center gap-1.5 px-6 py-3 bg-black hover:bg-slate-800 text-white rounded-xl text-xs font-bold shadow-sm transition-all active:scale-98 cursor-pointer"
            >
              <span className="material-symbols-outlined text-base">add</span>
              Book a Slot
            </button>

            {/* Legend indicators */}
            <div className="flex gap-4">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-md bg-emerald-50 border border-emerald-250 inline-block" />
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Booked</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-md bg-red-50 border border-red-250 border-dashed inline-block" />
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Conflict</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-md bg-white border border-slate-250 border-dashed inline-block" />
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Available</span>
              </div>
            </div>
          </div>

        </div>
      </main>

      {/* Booking Form Dialog */}
      {showBookModal && (
        <div 
          className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fade-in"
          onClick={() => setShowBookModal(false)}
        >
          <div 
            className="bg-white border border-slate-100 rounded-2xl shadow-xl w-full max-w-md p-6 space-y-6 text-left animate-slide-up"
            onClick={e => e.stopPropagation()}
          >
            <div>
              <h3 className="text-base font-black text-slate-900 tracking-tight">Reserve Time Slot</h3>
              <p className="text-xs text-slate-400 font-semibold mt-1">Book shared facilities for team collaborations</p>
            </div>

            <form onSubmit={handleConfirm} className="space-y-4">
              <div>
                <label className="block text-[9px] font-bold text-slate-400 uppercase mb-1">Resource</label>
                <input 
                  type="text" 
                  value={selectedResource} 
                  readOnly 
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs text-slate-400 bg-slate-50 cursor-not-allowed font-semibold"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[9px] font-bold text-slate-400 uppercase mb-1">Date</label>
                  <input 
                    type="text" 
                    value={`${selectedDay}, ${dayNum} ${monthName}`} 
                    readOnly 
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs text-slate-400 bg-slate-50 cursor-not-allowed font-semibold"
                  />
                </div>
                <div>
                  <label className="block text-[9px] font-bold text-slate-400 uppercase mb-1">Time Slot</label>
                  <select 
                    value={bookingSlot} 
                    onChange={e => setBookingSlot(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-black focus:ring-1 focus:ring-black bg-white cursor-pointer"
                  >
                    {availableSlots.map(s => <option key={s.time} value={s.time}>{s.time}</option>)}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[9px] font-bold text-slate-400 uppercase mb-1">Meeting Title *</label>
                <input 
                  type="text" 
                  required
                  placeholder="e.g. Sprint Planning Session"
                  value={bookingTitle}
                  onChange={e => setBookingTitle(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-black focus:ring-1 focus:ring-black bg-slate-50/30 focus:bg-white"
                />
              </div>

              <div className="flex justify-end gap-2.5 pt-2">
                <button 
                  type="button"
                  onClick={() => setShowBookModal(false)}
                  className="px-4 py-2 border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-xl text-xs font-semibold cursor-pointer transition-colors"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow-sm transition-colors cursor-pointer"
                >
                  Confirm Booking
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
