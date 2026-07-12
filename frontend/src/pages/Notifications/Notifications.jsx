import React, { useState } from 'react';
import toast from 'react-hot-toast';
import Sidebar from '../../components/Sidebar';

export default function Notifications() {
  const [filterType, setFilterType] = useState('All');
  const [prefDesktop, setPrefDesktop] = useState(true);
  const [prefEmail, setPrefEmail] = useState(true);
  const [prefSms, setPrefSms] = useState(false);

  const initialActivities = [
    { id: 1, type: 'assignment', desc: <>Laptop <span className="font-black text-[#00352d]">AF-0014</span> assigned to <span className="text-[#0d4d43] font-bold">Priya Shah</span></>, detail: 'IT Inventory Cluster • Office Hub A', time: '2m ago', icon: 'assignment_ind', bg: 'bg-[#b3eee0]/40 text-[#00201b]', cat: 'Approvals' },
    { id: 2, type: 'success', desc: <>Maintenance request <span className="font-black text-[#00352d]">AF-0055</span> approved</>, detail: 'Status: Scheduled for tomorrow, 09:00 AM', time: '18m ago', icon: 'check_circle', bg: 'bg-slate-100 text-[#00352d]', cat: 'Approvals' },
    { id: 3, type: 'event', desc: <>Booking confirmed: <span className="font-bold">Room B2</span></>, detail: 'Time slot: 2:00 PM to 3:00 PM', time: '1h ago', icon: 'event_available', bg: 'bg-[#0d4d43]/10 text-[#0d4d43]', cat: 'Bookings' },
    { id: 4, type: 'transfer', desc: <>Transfer approved: <span className="font-black text-[#00352d]">AF-0033</span> to facilities dept</>, detail: 'Initiated by: Mark Thompson', time: '3h ago', icon: 'move_up', bg: 'bg-slate-100 text-slate-700', cat: 'Approvals' },
    { id: 5, type: 'error', desc: <><span className="font-bold text-red-650">Overdue return: AF-0021</span></>, detail: 'Was due 3 days ago from Creative Studio', time: '1d ago', icon: 'alarm', bg: 'bg-[#ffdad6] text-[#ba1a1a]', cat: 'Alerts' },
    { id: 6, type: 'error', desc: <><span className="font-bold text-red-650">Audit discrepancy flagged: AF-0088 damaged</span></>, detail: 'Requires immediate physical inspection', time: '2d ago', icon: 'report', bg: 'bg-[#ffdad6] text-[#ba1a1a]', cat: 'Alerts' },
  ];

  const [activities, setActivities] = useState(initialActivities);

  const handleMarkAllRead = () => {
    toast.success('All live activities marked as acknowledged.');
  };

  const handleLoadMore = () => {
    toast.success('Loading archive history backlog records...');
  };

  const filtered = activities.filter(act => {
    if (filterType === 'All') return true;
    return act.cat === filterType;
  });

  return (
    <div className="flex min-h-screen bg-[#F9F9F7] font-sans antialiased text-[#1a1c1b]">
      <Sidebar />

      <main className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
        
        {/* Top App Bar */}
        <header className="sticky top-0 z-40 h-16 bg-[#F9F9F7]/80 backdrop-blur-md border-b border-[#bfc9c5]/30 flex justify-between items-center px-8 w-full">
          <div className="flex items-center gap-4 flex-1">
            <div className="relative w-full max-w-md group">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#00352d] transition-colors text-base">search</span>
              <input 
                type="text" 
                placeholder="Search activities..." 
                className="w-full bg-[#f4f4f1] border border-[#bfc9c5]/50 rounded-lg pl-9 pr-4 py-2 text-xs focus:ring-2 focus:ring-[#00352d]/10 focus:border-[#00352d] transition-all outline-none text-[#1a1c1b]"
              />
            </div>
          </div>
          
          <div className="flex items-center gap-6">
            <button className="text-[#404946] hover:text-[#00352d] transition-colors cursor-pointer">
              <span className="material-symbols-outlined text-lg">help_outline</span>
            </button>
            <button className="text-[#404946] hover:text-[#00352d] transition-colors cursor-pointer">
              <span className="material-symbols-outlined text-lg">settings</span>
            </button>
            <div className="h-6 w-[1px] bg-[#bfc9c5]/60 mx-1"></div>
            <div className="flex items-center gap-3">
              <div className="text-right hidden sm:block">
                <p className="text-xs text-slate-800 font-bold leading-none">Admin User</p>
                <p className="text-[9px] text-[#404946] leading-none mt-1">Global Admin</p>
              </div>
              <div className="w-8 h-8 rounded-full bg-[#0d4d43] text-white flex items-center justify-center font-bold text-xs flex-shrink-0">
                A
              </div>
            </div>
          </div>
        </header>

        {/* Scrollable Container */}
        <div className="flex-1 overflow-y-auto p-8 text-left pb-24 scrollbar-thin scrollbar-thumb-slate-200">
          <div className="max-w-[1080px] mx-auto space-y-6">
            
            {/* Page Header */}
            <div>
              <h2 className="text-2xl font-black text-[#00352d] tracking-tight">Activity Logs & Notifications</h2>
              <p className="text-xs text-[#404946]/70 font-semibold mt-1">Real-time monitoring of asset movements, system alerts, and administrative approvals.</p>
            </div>

            {/* Layout Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              
              {/* Left Column: Filter & Feed */}
              <div className="lg:col-span-8 space-y-5">
                
                {/* Filter Bar */}
                <div className="flex items-center gap-2.5 bg-white p-1 rounded-full border border-[#bfc9c5]/40 w-fit">
                  {['All', 'Alerts', 'Approvals', 'Bookings'].map(type => (
                    <button 
                      key={type}
                      onClick={() => setFilterType(type)}
                      className={`px-5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                        filterType === type 
                          ? 'bg-[#00352d] text-white shadow-sm' 
                          : 'text-[#404946] hover:bg-slate-50'
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>

                {/* Chronological Timeline Feed */}
                <div className="bg-white border border-[#bfc9c5]/40 rounded-2xl overflow-hidden shadow-xs">
                  <div className="px-6 py-4.5 border-b border-[#eeeeec] bg-slate-50/20 flex justify-between items-center">
                    <span className="text-[10px] font-black text-slate-400 tracking-wider uppercase">Live Activity Stream</span>
                    <button 
                      onClick={handleMarkAllRead}
                      className="text-[#00352d] text-xs font-bold hover:underline flex items-center gap-1 cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-sm">refresh</span> 
                      Mark all as read
                    </button>
                  </div>

                  <div className="divide-y divide-[#eeeeec]/60">
                    {filtered.length === 0 ? (
                      <p className="text-xs text-slate-400 text-center py-10 font-semibold">No active timeline alerts under this tab.</p>
                    ) : (
                      filtered.map(act => (
                        <div key={act.id} className="p-6 hover:bg-slate-50 transition-colors flex items-start gap-4 text-left">
                          <div className={`w-10 h-10 rounded-full ${act.bg} border border-current/10 flex items-center justify-center flex-shrink-0`}>
                            <span className="material-symbols-outlined text-base" style={{ fontVariationSettings: "'FILL' 1" }}>{act.icon}</span>
                          </div>
                          
                          <div className="flex-1 min-w-0">
                            <p className="text-xs font-medium text-slate-800 leading-relaxed">{act.desc}</p>
                            <p className="text-[10px] text-slate-400 font-semibold mt-1">{act.detail}</p>
                          </div>
                          
                          <span className="text-[10px] font-mono font-bold text-slate-400 whitespace-nowrap">{act.time}</span>
                        </div>
                      ))
                    )}
                  </div>

                  <button 
                    onClick={handleLoadMore}
                    className="w-full py-4 text-xs font-bold text-[#00352d] hover:bg-slate-50 transition-colors text-center border-t border-[#eeeeec] cursor-pointer"
                  >
                    Load older activities
                  </button>
                </div>

              </div>

              {/* Right Column: Trends & Settings */}
              <div className="lg:col-span-4 space-y-6">
                
                {/* Notification Trends Card */}
                <div className="bg-white border border-[#bfc9c5]/40 rounded-2xl p-6 shadow-xs">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xs font-black uppercase text-slate-800 tracking-wider">Activity Trends</h3>
                    <span className="material-symbols-outlined text-[#00352d]">trending_up</span>
                  </div>

                  <div className="space-y-4">
                    {[
                      { label: 'System Health', pct: '98%', width: 'w-[98%]', color: 'bg-[#00352d]' },
                      { label: 'Asset Utilization', pct: '82%', width: 'w-[82%]', color: 'bg-[#0d4d43]' },
                      { label: 'Pending Approvals', pct: '12', width: 'w-[45%]', color: 'bg-[#59605f]' },
                    ].map(trend => (
                      <div key={trend.label}>
                        <div className="flex justify-between text-xs mb-1.5 font-semibold text-slate-650">
                          <span>{trend.label}</span>
                          <span className="font-bold text-[#00352d]">{trend.pct}</span>
                        </div>
                        <div className="w-full bg-[#f4f4f1] h-1.5 rounded-full overflow-hidden border border-slate-200/50">
                          <div className={`h-full ${trend.color} rounded-full`} style={{ width: trend.label.includes('Pending') ? '45%' : trend.pct }}></div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 pt-5 border-t border-[#eeeeec]">
                    <p className="text-[11px] text-slate-450 leading-relaxed font-semibold">
                      Activity volume is <span className="font-bold text-[#00352d]">12% higher</span> this week compared to last, primarily driven by the annual hardware refresh.
                    </p>
                  </div>
                </div>

                {/* Quick Preferences Card */}
                <div className="bg-[#0d4d43] text-white rounded-2xl p-6 relative overflow-hidden group shadow-sm">
                  <div className="relative z-10 space-y-5">
                    <h3 className="text-xs font-black tracking-wider uppercase opacity-90">Preferences</h3>
                    
                    <div className="space-y-4">
                      <label className="flex items-center justify-between cursor-pointer group/item text-xs font-bold">
                        <span>Desktop Alerts</span>
                        <div 
                          onClick={() => setPrefDesktop(!prefDesktop)}
                          className="w-10 h-5 bg-white/20 rounded-full relative transition-all"
                        >
                          <div className={`absolute top-1 w-3 h-3 bg-white rounded-full transition-all ${prefDesktop ? 'right-1' : 'left-1'}`}></div>
                        </div>
                      </label>

                      <label className="flex items-center justify-between cursor-pointer group/item text-xs font-bold">
                        <span>Email Digest</span>
                        <div 
                          onClick={() => setPrefEmail(!prefEmail)}
                          className="w-10 h-5 bg-white/20 rounded-full relative transition-all"
                        >
                          <div className={`absolute top-1 w-3 h-3 bg-white rounded-full transition-all ${prefEmail ? 'right-1' : 'left-1'}`}></div>
                        </div>
                      </label>

                      <label className="flex items-center justify-between cursor-pointer group/item text-xs font-bold">
                        <span>SMS Updates</span>
                        <div 
                          onClick={() => setPrefSms(!prefSms)}
                          className="w-10 h-5 bg-white/10 rounded-full relative transition-all opacity-60"
                        >
                          <div className={`absolute top-1 w-3 h-3 bg-white/70 rounded-full transition-all ${prefSms ? 'right-1' : 'left-1'}`}></div>
                        </div>
                      </label>
                    </div>

                    <button 
                      onClick={() => toast.success('Advanced notification configuration rules active.')}
                      className="mt-4 w-full py-2.5 bg-white text-[#00352d] font-bold rounded-xl text-xs hover:bg-[#b3eee0] transition-colors cursor-pointer"
                    >
                      Advanced Settings
                    </button>
                  </div>
                  <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-[#83bdb0] opacity-10 rounded-full blur-3xl group-hover:scale-110 transition-transform duration-700"></div>
                </div>

                {/* Illustration Card */}
                <div className="relative h-44 rounded-2xl overflow-hidden border border-[#bfc9c5]/40 shadow-xs">
                  <div 
                    className="w-full h-full bg-cover bg-center" 
                    style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuB1LjyW6N0YOQb7G7SNQ8VrhNCHYa2mvBfk2IYx2NmKmBnJ0VmKBHA9qsIE5UJFoxlqRXgMCPCZg8vtQpFZhi3FwDjoCH2fzWiMRkH5_RTTN_A9r8rsRD2T-rPpPN0fz2ejOLYrjwrVDSgqzjtucasoPpLijev5RTQsM6u8oeZ-H4J1BG3N7K033u-8ojk5SAazsKEk6ao2DdOvMOz_k7rqgUG3odw4bKquBS1oX2ojSYsSYee9VWbW')" }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#00352d]/80 to-transparent flex items-end p-4 text-left">
                    <p className="text-white text-[10px] font-semibold italic">"Efficient management is the foundation of institutional clarity."</p>
                  </div>
                </div>

              </div>

            </div>

          </div>
        </div>
      </main>

    </div>
  );
}
