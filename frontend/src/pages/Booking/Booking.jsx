import React, { useState } from 'react';
import toast from 'react-hot-toast';
import Sidebar from '../../components/Sidebar';
import Header from '../../components/Header';

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
      { time: '09:00 AM', label: 'Booked - Procurement Team Sync', type: 'booked' },
      { time: '10:00 AM', label: 'Booking Conflict Detected - Requested 9:30 to 10:30', type: 'conflict' },
      { time: '11:00 AM', label: '', type: 'available' },
      { time: '12:00 PM', label: '', type: 'available' },
      { time: '01:00 PM', label: '', type: 'available' },
      { time: '02:00 PM', label: 'Booked - Employee Onboarding Session', type: 'booked' },
      { time: '03:00 PM', label: '', type: 'available' },
    ],
    'Conference Room A1': [
      { time: '09:00 AM', label: '', type: 'available' },
      { time: '10:00 AM', label: 'Booked - Engineering Sync', type: 'booked' },
      { time: '11:00 AM', label: '', type: 'available' },
      { time: '12:00 PM', label: 'Booked - Executive Leadership Meeting', type: 'booked' },
      { time: '01:00 PM', label: '', type: 'available' },
      { time: '02:00 PM', label: '', type: 'available' },
      { time: '03:00 PM', label: '', type: 'available' },
    ],
  };
  return base[resource] || [
    { time: '09:00 AM', label: '', type: 'available' },
    { time: '10:00 AM', label: '', type: 'available' },
    { time: '11:00 AM', label: '', type: 'available' },
    { time: '12:00 PM', label: '', type: 'available' },
    { time: '01:00 PM', label: '', type: 'available' },
    { time: '02:00 PM', label: '', type: 'available' },
    { time: '03:00 PM', label: '', type: 'available' },
  ];
};

export default function Booking() {
  const [selectedResource, setSelectedResource] = useState(RESOURCES[0]);
  const [resourceInput, setResourceInput] = useState(`${RESOURCES[0]} — ${dayName}, ${dayNum} ${monthName}`);
  const [showResourceDrop, setShowResourceDrop] = useState(false);
  const [selectedDay, setSelectedDay] = useState(dayName);
  const [showBookModal, setShowBookModal] = useState(false);
  const [bookingTitle, setBookingTitle] = useState('');
  const [bookingSlot, setBookingSlot] = useState('11:00 AM');

  const slots = generateSlots(selectedResource);
  const availableSlots = slots.filter(s => s.type === 'available');

  const handleResourceSelect = (r) => {
    setSelectedResource(r);
    setResourceInput(`${r} — ${selectedDay}, ${dayNum} ${monthName}`);
    setShowResourceDrop(false);
  };

  const handleSlotClick = (slot) => {
    if (slot.type === 'booked') { 
      toast.error('This slot is already reserved'); 
      return; 
    }
    if (slot.type === 'conflict') { 
      toast.error('This slot has an overlapping booking conflict'); 
      return; 
    }
    setBookingSlot(slot.time);
    setShowBookModal(true);
  };

  const handleConfirm = (e) => {
    e.preventDefault();
    if (!bookingTitle.trim()) { 
      toast.error('Please enter a booking description'); 
      return; 
    }
    toast.success(`Reserved ${bookingSlot} in ${selectedResource} for "${bookingTitle}"`);
    setShowBookModal(false);
    setBookingTitle('');
  };

  return (
    <div className="flex min-h-screen bg-[#F9F9F7] font-sans antialiased text-[#1a1c1b]">
      <Sidebar />

      <main className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
        
        {/* Reusable Header */}
        <Header showSearch={true} placeholder="Search resources, space reservations..." />

        {/* Scrollable Container */}
        <div className="flex-1 overflow-y-auto p-8 text-left pb-24 scrollbar-thin scrollbar-thumb-slate-200">
          <div className="max-w-[1080px] mx-auto grid grid-cols-12 gap-6">
            
            {/* Left Column: Scheduler Section */}
            <div className="col-span-12 lg:col-span-8 flex flex-col gap-6">
              
              {/* Title Section */}
              <div>
                <h1 className="text-2xl font-black text-[#00352d] tracking-tight">Resource Booking</h1>
                <p className="text-xs text-[#404946]/70 font-semibold mt-1">Manage and schedule organizational assets and shared spaces.</p>
              </div>

              {/* Resource Selector Box */}
              <section className="bg-white p-6 rounded-2xl border border-[#bfc9c5]/40 shadow-xs space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex flex-col gap-1.5 flex-1 relative">
                    <span className="text-[10px] font-black uppercase text-[#00352d] tracking-wider">Resource Selection</span>
                    <div className="flex items-center gap-3">
                      <button 
                        onClick={() => toast.success('Previous Date')} 
                        className="material-symbols-outlined p-1.5 text-[#404946] hover:bg-slate-50 border border-slate-200 rounded-xl transition-colors flex shrink-0 cursor-pointer"
                      >
                        chevron_left
                      </button>
                      
                      <div className="relative w-full">
                        <input 
                          type="text" 
                          readOnly 
                          value={resourceInput}
                          onClick={() => setShowResourceDrop(!showResourceDrop)}
                          className="w-full bg-[#f4f4f1] border border-[#bfc9c5]/50 rounded-xl px-4 py-2 text-xs font-bold text-slate-800 cursor-pointer text-left focus:outline-none"
                        />
                        {showResourceDrop && (
                          <div className="absolute top-[100%] left-0 right-0 z-50 bg-white border border-[#bfc9c5]/40 rounded-2xl mt-1.5 shadow-xl overflow-hidden divide-y divide-slate-100">
                            {RESOURCES.map(r => (
                              <div 
                                key={r} 
                                onMouseDown={() => handleResourceSelect(r)}
                                className={`p-3 text-xs cursor-pointer hover:bg-slate-50 transition-colors ${
                                  r === selectedResource ? 'text-[#00352d] font-bold bg-[#b3eee0]/20' : 'text-slate-700'
                                }`}
                              >
                                {r}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>

                      <button 
                        onClick={() => toast.success('Next Date')} 
                        className="material-symbols-outlined p-1.5 text-[#404946] hover:bg-slate-50 border border-slate-200 rounded-xl transition-colors flex shrink-0 cursor-pointer"
                      >
                        chevron_right
                      </button>
                    </div>
                  </div>

                  <button 
                    onClick={() => setShowBookModal(true)}
                    className="flex items-center justify-center gap-1.5 bg-[#00352d] hover:bg-[#0d4d43] text-white px-5 py-3 rounded-xl text-xs font-bold transition-all active:scale-95 cursor-pointer shadow-sm shrink-0 h-fit"
                  >
                    <span className="material-symbols-outlined text-base">add</span>
                    Book a slot
                  </button>
                </div>

                {/* Day Tab Selectors */}
                <div className="flex gap-1.5 bg-[#f4f4f1] p-1 rounded-xl w-fit">
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

                {/* Vertical Timeline Lists */}
                <div className="space-y-4">
                  {slots.map((s, i) => {
                    const isBooked = s.type === 'booked';
                    const isConflict = s.type === 'conflict';
                    
                    return (
                      <div key={i} className="flex gap-4 items-start">
                        <span className="w-16 font-mono text-[10px] font-bold text-slate-400 mt-3 flex-shrink-0 text-right">{s.time}</span>
                        
                        {isBooked && (
                          <div className="flex-1 bg-[#b3eee0]/40 border border-[#b3eee0]/60 text-[#00201b] rounded-xl px-4 py-3 shadow-xs flex justify-between items-center transition-all hover:brightness-98 cursor-pointer">
                            <div>
                              <p className="text-xs font-bold">Booked - Procurement Team</p>
                              <p className="text-[10px] opacity-85 font-semibold mt-0.5">{s.time} — 1 hour slot</p>
                            </div>
                            <span className="material-symbols-outlined text-[#00352d] text-base" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
                          </div>
                        )}

                        {isConflict && (
                          <div className="flex-1 border-2 border-dashed border-[#ba1a1a] bg-[#ffdad6]/20 text-[#ba1a1a] rounded-xl px-4 py-3 flex items-center gap-3">
                            <span className="material-symbols-outlined text-[#ba1a1a] text-lg font-bold">warning</span>
                            <div>
                              <p className="text-xs font-bold">Booking Conflict Detected</p>
                              <p className="text-[10px] text-[#93000a]/85 font-semibold mt-0.5">Requested 9:30 to 10:30 - conflict - slot is unavailable</p>
                            </div>
                          </div>
                        )}

                        {!isBooked && !isConflict && (
                          <div 
                            onClick={() => handleSlotClick(s)}
                            className="flex-1 border border-dashed border-[#bfc9c5]/60 hover:border-[#00352d]/60 hover:text-[#00352d] text-slate-450 rounded-xl px-4 py-3 flex justify-between items-center cursor-pointer transition-all"
                          >
                            <span className="text-xs font-semibold">Slot is open — click to reserve resource</span>
                            <span className="material-symbols-outlined text-base">add_circle</span>
                          </div>
                        )}

                      </div>
                    );
                  })}
                </div>

              </section>

            </div>

            {/* Right Column: Enhanced Analytics Sidebar */}
            <div className="col-span-12 lg:col-span-4 flex flex-col gap-6">
              
              {/* Resource Health Card */}
              <div className="bg-white p-6 rounded-2xl border border-[#bfc9c5]/40 shadow-xs flex flex-col justify-between relative overflow-hidden">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex flex-col text-left">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Resource Health</span>
                    <div className="text-2xl font-black text-[#00352d] leading-none mt-1">84%</div>
                    <span className="text-[10px] font-bold text-slate-400 mt-1">Daily Utilization</span>
                  </div>
                  <div className="p-2.5 bg-[#dbe1e0] rounded-xl text-[#0d4d43]">
                    <span className="material-symbols-outlined text-lg">analytics</span>
                  </div>
                </div>
                
                <div className="w-full bg-[#f4f4f1] h-1.5 rounded-full overflow-hidden border border-slate-200/50">
                  <div className="bg-[#00352d] h-full w-[84%] rounded-full"></div>
                </div>
                
                <p className="text-[10px] text-slate-400 font-semibold mt-4">Resource is performing optimally with steady demand across peak hours.</p>
              </div>

              {/* Weekly insights */}
              <div className="bg-white p-6 rounded-2xl border border-[#bfc9c5]/40 shadow-xs space-y-4">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#00352d] text-lg">assessment</span>
                  <h3 className="text-xs font-black uppercase text-[#1a1c1b] tracking-wider">Weekly Report</h3>
                </div>

                <div className="space-y-2 text-xs">
                  <div className="flex justify-between py-1.5 border-b border-[#bfc9c5]/20 font-semibold text-slate-650">
                    <span>Peak Attendance</span>
                    <span className="text-slate-900 font-bold">Tue: 10:00 — 12:00</span>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-[#bfc9c5]/20 font-semibold text-slate-650">
                    <span>Booking Frequency</span>
                    <span className="text-slate-900 font-bold">12 Bookings / Week</span>
                  </div>
                  <div className="flex justify-between py-1.5 font-semibold text-slate-650">
                    <span>Avg. Duration</span>
                    <span className="text-slate-900 font-bold">1h 45m</span>
                  </div>
                </div>

                <div className="pt-2 border-t border-[#bfc9c5]/20">
                  <img 
                    className="w-full h-24 object-cover rounded-lg border border-slate-100" 
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDgzHamv21zaLX6W16M9SHs5jDIIMecSFKf4bCl-TB0ef2M5igT9GAtc0v-AKczW9mSyacDjRPJgN6l_Xc28XpQs86yHG_Di0yYvaBCqq0RrN_GHCg-Fe6NMFVe7NGyM-czTYrl3HLFWpIacf5eCUwx_mhLGvUPMLAb8824CnCHSyVs6Z93bCaOq5yidTfKXXrhE2khWeJw2NRt20KA5Axp_dVu2OE1llY0FvL34El1uHkf1tWZHQ3x"
                    alt="Booking Analytics chart" 
                  />
                </div>
              </div>

              {/* Optimization Insight AI */}
              <div className="bg-[#0d4d43] text-white p-6 rounded-2xl space-y-3">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#83bdb0] text-base">auto_awesome</span>
                  <h3 className="text-xs font-black uppercase tracking-wider">Optimization Insight</h3>
                </div>
                <p className="text-[11px] font-semibold opacity-90 leading-relaxed">
                  Data shows that <b>Conference Room B2</b> is frequently booked by small teams of 2. Consider redirecting these to <b>Focus Pods</b> to free up larger capacity rooms.
                </p>
                <button 
                  onClick={() => toast.success('Displaying focus pod scheduling optimization recommendations...')}
                  className="w-full py-2.5 bg-white text-[#00352d] rounded-xl font-bold text-xs hover:opacity-95 cursor-pointer shadow-xs"
                >
                  View Suggestions
                </button>
              </div>

              {/* Space layout image */}
              <div className="rounded-2xl overflow-hidden border border-[#bfc9c5]/40 h-44 relative group shadow-xs">
                <img 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDJ3IVpkZp39wbkFdiWzVpNQW__LhMebrgweq59AAFVEgBDc44Kd98Idfn_N5zqsCoSjlQmJN1ffXKHlZlaY682xn4O1F8lX82T-dgnnf258bYidB0vKmNIcmVRkLxOuE5BBvkuLfWspTG0MxIOxQ8DV46lgMwk0V0ab2mWGfdr_7TxqP9MYQbkSkbRjyoZg8ce7w4BRu5r6Zn5EZvJZZnNYw7HPw9keh_bv5enIyDZ_9YoZOTZAJBx" 
                  alt="Conference room photo" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#00352d]/80 to-transparent flex flex-col justify-end p-4 text-left">
                  <span className="text-xs font-black text-white">Conference Room B2</span>
                  <span className="text-[9px] text-white/80 font-semibold mt-0.5">Capacity: 12 People • Full Tech Integration</span>
                </div>
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
                    className="w-full px-3 py-2 border border-[#bfc9c5]/50 rounded-xl text-xs text-slate-800 focus:outline-none bg-white cursor-pointer"
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
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:outline-none bg-slate-50/30 focus:bg-white"
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
                  className="px-4 py-2 bg-[#00352d] hover:bg-[#0d4d43] text-white rounded-xl text-xs font-bold shadow-sm transition-colors cursor-pointer"
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
