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

  const handleResourceSelect = (r) => { 
    setSelectedResource(r); 
    setResourceInput(`${r} — ${selectedDay}, ${dayNum} ${monthName}`); 
    setShowResourceDrop(false); 
  };

  const handleSlotClick = (slot) => {
    if (slot.type === 'booked') { 
      toast.error('Slot already booked'); 
      return; 
    }
    if (slot.type === 'conflict') { 
      toast.error('Slot has a conflict'); 
      return; 
    }
    setBookingSlot(slot.time); 
    setShowBookModal(true);
  };

  const handleConfirm = () => {
    if (!bookingTitle.trim()) { 
      toast.error('Please enter a meeting title'); 
      return; 
    }
    toast.success(`Booked ${bookingSlot} in ${selectedResource} for "${bookingTitle}"`);
    setShowBookModal(false); 
    setBookingTitle('');
  };

  const slotStyles = {
    booked: {
      cardClass: 'bg-indigo-900 border border-indigo-950 text-indigo-100 font-semibold',
      icon: 'event_busy',
      iconClass: 'text-indigo-300',
      desc: '',
      cursor: 'cursor-not-allowed'
    },
    conflict: {
      cardClass: 'bg-red-50/70 border border-dashed border-red-300 text-red-700 font-medium italic',
      icon: 'warning',
      iconClass: 'text-red-500',
      desc: '',
      cursor: 'cursor-not-allowed'
    },
    available: {
      cardClass: 'bg-white border border-dashed border-gray-200 text-gray-400 font-medium hover:bg-indigo-50/40 hover:border-indigo-200 hover:text-indigo-600 transition-all',
      icon: 'add_circle',
      iconClass: 'text-gray-400 group-hover:text-indigo-500 transition-colors',
      desc: 'Available — click to book',
      cursor: 'cursor-pointer'
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50/50 font-sans">
      <Sidebar />

      <main className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <header className="bg-white border-b border-gray-100 px-8 py-5 sticky top-0 z-40 shadow-sm flex items-center justify-between">
          <div className="pl-10 md:pl-0">
            <h1 className="text-xl font-bold text-gray-900 tracking-tight">Resource Booking</h1>
            <p className="text-xs text-gray-500 mt-1">Schedule and manage shared resource reservations</p>
          </div>
        </header>

        {/* Content Container */}
        <div className="p-8 max-w-4xl w-full mx-auto space-y-6 text-left">
          
          {/* Resource Selector */}
          <div className="relative bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Resource</label>
            <div className="relative">
              <input 
                value={resourceInput} 
                onChange={e => setResourceInput(e.target.value)} 
                onFocus={() => setShowResourceDrop(true)} 
                onBlur={() => setTimeout(() => setShowResourceDrop(false), 200)}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm text-gray-900 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100/50 transition-all"
              />
              <span className="material-symbols-outlined absolute right-3.5 top-3.5 text-gray-400 pointer-events-none">expand_more</span>
            </div>

            {showResourceDrop && (
              <div className="absolute top-[102%] left-6 right-6 z-50 bg-white border border-gray-100 rounded-xl overflow-hidden shadow-xl max-h-60 overflow-y-auto mt-1">
                {RESOURCES.map(r => (
                  <div 
                    key={r} 
                    onMouseDown={() => handleResourceSelect(r)} 
                    className={`px-4 py-3 hover:bg-gray-50 cursor-pointer text-sm border-b border-gray-50 transition-colors flex justify-between items-center ${
                      r === selectedResource ? 'text-indigo-600 font-bold bg-indigo-50/20' : 'text-gray-700'
                    }`}
                  >
                    <span>{r}</span>
                    {r === selectedResource && <span className="material-symbols-outlined text-indigo-600 text-sm">check</span>}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Day selection tabs */}
          <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
            {DAYS.map(d => (
              <button 
                key={d} 
                onClick={() => setSelectedDay(d)}
                className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all flex-shrink-0 active:scale-95 border ${
                  d === selectedDay 
                    ? 'bg-indigo-600 border-indigo-600 text-white shadow-sm shadow-indigo-100' 
                    : 'bg-white border-gray-200 text-gray-600 hover:border-gray-300 hover:bg-gray-50'
                }`}
              >
                {d}
              </button>
            ))}
          </div>

          {/* Slots visual layout */}
          <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden divide-y divide-gray-50">
            {slots.map((slot, index) => {
              const currentStyle = slotStyles[slot.type];
              return (
                <div 
                  key={index} 
                  onClick={() => handleSlotClick(slot)}
                  className={`flex items-center gap-5 px-6 py-4.5 group ${currentStyle.cursor}`}
                >
                  {/* Time label */}
                  <span className="w-12 text-sm font-extrabold text-gray-800 flex-shrink-0">{slot.time}</span>
                  
                  {/* Slot block */}
                  <div className={`flex-1 flex items-center gap-3 px-4 py-3 rounded-xl ${currentStyle.cardClass}`}>
                    <span className={`material-symbols-outlined text-lg ${currentStyle.iconClass}`}>
                      {currentStyle.icon}
                    </span>
                    <span className="text-xs tracking-tight md:text-sm">
                      {slot.label || currentStyle.desc}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Lower Actions & Legend */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-2">
            <button 
              onClick={() => setShowBookModal(true)}
              className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-xl text-sm font-bold flex items-center justify-center gap-2 shadow-sm shadow-green-100 hover:shadow-md active:scale-98 transition-all w-full sm:w-auto"
            >
              <span className="material-symbols-outlined text-lg font-bold">add</span>
              Book a Slot
            </button>

            {/* Legend indicators */}
            <div className="flex gap-4 items-center flex-wrap">
              {[
                { class: 'bg-indigo-900 border-indigo-950', label: 'Booked' },
                { class: 'bg-red-50 border-red-300 border-dashed', label: 'Conflict' },
                { class: 'bg-white border-gray-200 border-dashed', label: 'Available' }
              ].map(item => (
                <div key={item.label} className="flex items-center gap-2">
                  <div className={`w-3.5 h-3.5 rounded-md border ${item.class}`} />
                  <span className="text-xs text-gray-500 font-semibold">{item.label}</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </main>

      {/* Booking Dialog Modal */}
      {showBookModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          {/* Backdrop blur */}
          <div 
            className="fixed inset-0 bg-gray-900/40 backdrop-blur-sm transition-opacity" 
            onClick={() => setShowBookModal(false)}
          />
          {/* Modal content box */}
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden relative z-10 border border-gray-100 p-6 text-left animate-slide-in">
            <div className="flex justify-between items-center mb-5">
              <h3 className="text-base font-extrabold text-gray-900 tracking-tight">Book a Slot</h3>
              <button 
                onClick={() => setShowBookModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <span className="material-symbols-outlined text-lg">close</span>
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">Resource</label>
                <input 
                  value={selectedResource} 
                  readOnly 
                  className="w-full px-4 py-2.5 border border-gray-50 bg-gray-50 text-gray-400 rounded-xl text-sm focus:outline-none cursor-not-allowed"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">Date</label>
                <input 
                  value={`${selectedDay}, ${dayNum} ${monthName}`} 
                  readOnly 
                  className="w-full px-4 py-2.5 border border-gray-50 bg-gray-50 text-gray-400 rounded-xl text-sm focus:outline-none cursor-not-allowed"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">Time Slot</label>
                <select 
                  value={bookingSlot} 
                  onChange={e => setBookingSlot(e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm text-gray-900 focus:outline-none focus:border-indigo-500 bg-white cursor-pointer"
                >
                  {availableSlots.map(s => <option key={s.time} value={s.time}>{s.time}</option>)}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">Meeting Title *</label>
                <input 
                  value={bookingTitle} 
                  onChange={e => setBookingTitle(e.target.value)} 
                  placeholder="e.g. Sprint Planning Sync" 
                  autoFocus 
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-indigo-500 transition-all"
                />
              </div>
            </div>

            <div className="flex gap-3 justify-end mt-6">
              <button 
                onClick={() => setShowBookModal(false)} 
                className="px-4.5 py-2.5 border border-gray-200 rounded-xl text-xs font-bold text-gray-600 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={handleConfirm} 
                className="px-5 py-2.5 bg-green-600 hover:bg-green-700 text-white rounded-xl text-xs font-bold transition-all active:scale-98 shadow-sm shadow-green-100"
              >
                Confirm Booking
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
