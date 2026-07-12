import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import Sidebar from '../../components/Sidebar';

export default function Maintenance() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [aiQuery, setAiQuery] = useState('');
  
  // Authentication check
  useEffect(() => {
    const user = localStorage.getItem('af_logged_in_user');
    if (!user) {
      navigate('/login');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('af_logged_in_user');
    toast.success('Successfully logged out.');
    navigate('/login');
  };

  const handleAiSend = (e) => {
    e.preventDefault();
    if (!aiQuery.trim()) return;
    toast.loading('Analyzing maintenance logs baseline…', { id: 'ai' });
    setTimeout(() => {
      toast.success('Lumina: Current resolution rates are optimal. Cooling calibration tickets are priority.', { id: 'ai', duration: 4000 });
      setAiQuery('');
    }, 1200);
  };

  // Mock active tickets
  const tickets = [
    { id: '#TK-9042', title: 'Turbine Cooling Leak', desc: 'Main sector C-4 cooling pressure dropping below safety thresholds. Immediate inspection required.', status: 'CRITICAL', statusBg: 'bg-error-container', statusColor: 'text-[#ffdad6]', time: '24m ago', assignee: 'R. Miller' },
    { id: '#TK-8831', title: 'HVAC Filter Swap', desc: 'Regular quarterly replacement scheduled for Server Wing 12.', status: 'ELEVATED', statusBg: 'bg-tertiary-container', statusColor: 'text-[#eaf0ff]', time: '2h ago', assignee: 'A. Chen' },
    { id: '#TK-8710', title: 'Lighting Array Check', desc: 'Flickering identified in the main corridor sensor array.', status: 'ROUTINE', statusBg: 'bg-secondary-container', statusColor: 'text-[#adb4ce]', time: '5h ago', assignee: 'S. Gupta' },
    { id: '#TK-9102', title: 'Conveyor Jam - Line 4', desc: 'Physical obstruction detected. Emergency stop triggered.', status: 'CRITICAL', statusBg: 'bg-error-container', statusColor: 'text-[#ffdad6]', time: '12m ago', assignee: 'K. Vogt' }
  ];

  const filteredTickets = tickets.filter(item => 
    item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div 
      className="bg-[#0F172A] text-on-background font-body-lg overflow-hidden h-screen flex w-full"
      style={{ color: '#e1e2ed', fontFamily: "'Inter', sans-serif" }}
    >
      <style>{`
        .glass-panel {
          backdrop-filter: blur(12px);
          background: rgba(30, 41, 59, 0.5);
          border: 1px solid rgba(255, 255, 255, 0.05);
          border-top: 1px solid rgba(255, 255, 255, 0.1);
        }
        .active-glow {
          box-shadow: 0 0 15px rgba(180, 197, 255, 0.1);
        }
      `}</style>

      <Sidebar />

      {/* Main scrollable content */}
      <main style={{ flex: 1, overflowY: 'auto' }}>
        {/* Main Content Canvas */}
        <div className="p-6 grid grid-cols-12 gap-6 h-full items-stretch">
          
          {/* Left Column: Active Repair Tickets */}
          <section className="col-span-3 flex flex-col gap-4 h-full overflow-hidden pb-4">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-bold text-on-surface">Active Tickets</h2>
              <span className="bg-primary/20 text-primary text-[10px] px-2.5 py-0.5 rounded-full font-mono font-bold" style={{ color: '#b4c5ff' }}>
                {filteredTickets.length} LIVE
              </span>
            </div>
            
            <div className="flex-grow overflow-y-auto pr-2 space-y-4 no-scrollbar">
              {filteredTickets.length === 0 ? (
                <div className="text-xs text-on-surface-variant text-center py-10">
                  No matching tickets.
                </div>
              ) : (
                filteredTickets.map(item => (
                  <div 
                    key={item.id}
                    onClick={() => toast.success(`Viewing logs details for ${item.id}`)}
                    className="glass-panel p-4 rounded-xl active-glow transition-all hover:translate-x-1 cursor-pointer"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <span className={`text-[9px] px-2 py-0.5 rounded font-mono font-bold ${item.statusBg} ${item.statusColor}`}>
                        {item.status}
                      </span>
                      <span className="text-on-surface-variant text-[9px] font-mono" style={{ color: '#c3c6d7' }}>{item.id}</span>
                    </div>
                    <h3 className="text-sm font-semibold mb-1">{item.title}</h3>
                    <p className="text-xs text-on-surface-variant/70 mb-4 line-clamp-2 leading-relaxed" style={{ color: '#c3c6d7' }}>{item.desc}</p>
                    <div className="flex items-center justify-between text-[10px] font-mono text-on-surface-variant" style={{ color: '#8d90a0' }}>
                      <div className="flex items-center gap-1">
                        <span className="material-symbols-outlined text-xs">person</span>
                        <span>{item.assignee}</span>
                      </div>
                      <span>{item.time}</span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </section>

          {/* Center/Right Column: Schedule & Load */}
          <section className="col-span-9 flex flex-col gap-6 h-full pb-4">
            
            {/* Maintenance Schedule Calendar */}
            <div className="grid grid-cols-12 gap-6 flex-grow">
              
              {/* Calendar view */}
              <div className="col-span-8 glass-panel rounded-2xl p-6 flex flex-col overflow-hidden relative justify-between">
                <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary/10 blur-[100px] rounded-full" />
                <div className="flex items-center justify-between mb-4 relative z-10">
                  <div>
                    <h2 className="text-base font-bold">Service Schedule</h2>
                    <p className="text-xs text-on-surface-variant" style={{ color: '#c3c6d7' }}>Oct 14 - Oct 20, 2023</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button onClick={() => toast.success('Previous week')} className="p-1 rounded-lg hover:bg-white/5 cursor-pointer"><span className="material-symbols-outlined">chevron_left</span></button>
                    <button onClick={() => toast.success('Jump to current date')} className="px-3 py-1 bg-white/5 rounded-lg text-xs font-semibold cursor-pointer">Today</button>
                    <button onClick={() => toast.success('Next week')} className="p-1 rounded-lg hover:bg-white/5 cursor-pointer"><span className="material-symbols-outlined">chevron_right</span></button>
                  </div>
                </div>

                <div className="flex-grow grid grid-cols-7 gap-px bg-white/5 rounded-xl overflow-hidden relative border border-white/5 mt-2 min-h-[160px]">
                  {/* Week Headers */}
                  <div className="col-span-7 grid grid-cols-7 border-b border-white/10 h-10 items-center">
                    {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => (
                      <div key={day} className="text-center text-[9px] font-mono uppercase text-on-surface-variant font-bold" style={{ color: '#c3c6d7' }}>{day}</div>
                    ))}
                  </div>
                  
                  {/* Cells */}
                  <div className="bg-surface/40 p-2 min-h-[100px]">
                    <div className="text-[10px] text-on-surface-variant/40 mb-1" style={{ color: 'rgba(195,198,215,0.4)' }}>14</div>
                    <div className="bg-primary/20 border-l-2 border-primary p-1 rounded-sm text-[9px] mb-1 truncate" style={{ backgroundColor: 'rgba(37,99,235,0.2)', borderLeftColor: '#2563eb' }}>Gen-Set Prep</div>
                  </div>
                  
                  <div className="bg-surface/40 p-2 min-h-[100px] border-l border-white/5">
                    <div className="text-[10px] text-on-surface-variant mb-1" style={{ color: '#c3c6d7' }}>15</div>
                    <div className="bg-error/20 border-l-2 border-error p-1 rounded-sm text-[9px] mb-1 truncate" style={{ backgroundColor: 'rgba(255,180,171,0.2)', borderLeftColor: '#ffb4ab' }}>Main Boiler</div>
                    <div className="bg-secondary/20 border-l-2 border-secondary p-1 rounded-sm text-[9px] truncate" style={{ backgroundColor: 'rgba(190,198,224,0.2)', borderLeftColor: '#bec6e0' }}>IT Audit</div>
                  </div>

                  <div className="bg-surface/60 p-2 min-h-[100px] border-l border-white/5 relative active-glow">
                    <div className="text-[10px] text-primary font-bold mb-1" style={{ color: '#b4c5ff' }}>16</div>
                    <div className="absolute inset-0 border-2 border-primary/20 pointer-events-none" style={{ borderColor: 'rgba(180,197,255,0.2)' }} />
                    <div className="bg-primary p-1 rounded-sm text-[9px] text-on-primary font-bold truncate" style={{ backgroundColor: '#2563eb', color: '#fff' }}>Server Coolant</div>
                  </div>

                  <div className="bg-surface/40 p-2 min-h-[100px] border-l border-white/5">
                    <div className="text-[10px] text-on-surface-variant mb-1" style={{ color: '#c3c6d7' }}>17</div>
                  </div>

                  <div className="bg-surface/40 p-2 min-h-[100px] border-l border-white/5">
                    <div className="text-[10px] text-on-surface-variant mb-1" style={{ color: '#c3c6d7' }}>18</div>
                    <div className="bg-tertiary/20 border-l-2 border-tertiary p-1 rounded-sm text-[9px] truncate" style={{ backgroundColor: 'rgba(185,199,224,0.2)', borderLeftColor: '#b9c7e0' }}>Roof Access</div>
                  </div>

                  <div className="bg-surface/20 p-2 min-h-[100px] border-l border-white/5">
                    <div className="text-[10px] text-on-surface-variant/30 mb-1" style={{ color: 'rgba(195,198,215,0.3)' }}>19</div>
                  </div>

                  <div className="bg-surface/20 p-2 min-h-[100px] border-l border-white/5">
                    <div className="text-[10px] text-on-surface-variant/30 mb-1" style={{ color: 'rgba(195,198,215,0.3)' }}>20</div>
                  </div>
                </div>
              </div>

              {/* Technician Load Utilization */}
              <div className="col-span-4 glass-panel rounded-2xl p-6 flex flex-col justify-between">
                <div>
                  <h2 className="text-base font-bold">Technician Load</h2>
                  <p className="text-xs text-on-surface-variant mt-0.5" style={{ color: '#c3c6d7' }}>Fleet capacity utilization</p>
                </div>
                
                <div className="flex-1 flex flex-col justify-center gap-5 my-4">
                  <div className="space-y-1.5">
                    <div className="flex justify-between text-[10px] font-mono font-semibold">
                      <span className="text-on-surface">Mechanical Team</span>
                      <span className="text-primary" style={{ color: '#b4c5ff' }}>88%</span>
                    </div>
                    <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                      <div className="h-full bg-primary rounded-full" style={{ width: '88%', backgroundColor: '#2563eb' }} />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <div className="flex justify-between text-[10px] font-mono font-semibold">
                      <span className="text-on-surface">Electrical Team</span>
                      <span className="text-tertiary" style={{ color: '#b9c7e0' }}>64%</span>
                    </div>
                    <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                      <div className="h-full bg-tertiary rounded-full" style={{ width: '64%', backgroundColor: '#b9c7e0' }} />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <div className="flex justify-between text-[10px] font-mono font-semibold">
                      <span className="text-on-surface">HVAC Specialists</span>
                      <span className="text-error" style={{ color: '#ffb4ab' }}>95%</span>
                    </div>
                    <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                      <div className="h-full bg-error rounded-full" style={{ width: '95%', backgroundColor: '#ffb4ab' }} />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <div className="flex justify-between text-[10px] font-mono font-semibold">
                      <span className="text-on-surface">IT/Sensor Ops</span>
                      <span className="text-secondary" style={{ color: '#bec6e0' }}>42%</span>
                    </div>
                    <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                      <div className="h-full bg-secondary rounded-full" style={{ width: '42%', backgroundColor: '#bec6e0' }} />
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-white/5 mt-2 flex items-center gap-3">
                  <div className="flex -space-x-2">
                    <div className="w-8 h-8 rounded-full border-2 border-surface bg-primary/20 flex items-center justify-center text-[10px] font-bold" style={{ backgroundColor: 'rgba(180,197,255,0.2)', borderColor: '#0F172A' }}>+5</div>
                  </div>
                  <span className="text-xs text-on-surface-variant" style={{ color: '#c3c6d7' }}>Subcontractors standby</span>
                </div>
              </div>
            </div>

            {/* Bottom Analytical Chart */}
            <div className="h-44 glass-panel rounded-2xl p-5 flex flex-col overflow-hidden justify-between">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-[10px] font-mono font-bold uppercase tracking-wider text-on-surface-variant" style={{ color: '#c3c6d7' }}>Weekly Resolution Trend</h3>
                <div className="flex gap-4">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-primary" style={{ backgroundColor: '#b4c5ff' }} />
                    <span className="text-[9px] font-mono font-semibold text-on-surface-variant" style={{ color: '#c3c6d7' }}>RESOLVED</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-error" style={{ backgroundColor: '#ffb4ab' }} />
                    <span className="text-[9px] font-mono font-semibold text-on-surface-variant" style={{ color: '#c3c6d7' }}>NEW TICKET</span>
                  </div>
                </div>
              </div>
              
              <div className="flex-1 relative min-h-[90px]">
                <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 1000 100">
                  <line stroke="rgba(255,255,255,0.05)" strokeDasharray="4" x1="0" x2="1000" y1="25" y2="25" />
                  <line stroke="rgba(255,255,255,0.05)" strokeDasharray="4" x1="0" x2="1000" y1="50" y2="50" />
                  <line stroke="rgba(255,255,255,0.05)" strokeDasharray="4" x1="0" x2="1000" y1="75" y2="75" />
                  
                  <defs>
                    <linearGradient id="areaGradientM" x1="0" x2="0" y1="0" y2="1">
                      <stop offset="0%" stopColor="#b4c5ff" stopOpacity="0.2" />
                      <stop offset="100%" stopColor="#b4c5ff" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  
                  <path d="M0,80 Q100,20 200,60 T400,30 T600,70 T800,20 T1000,50" fill="none" stroke="#b4c5ff" strokeWidth="2" vectorEffect="non-scaling-stroke" />
                  <path d="M0,80 Q100,20 200,60 T400,30 T600,70 T800,20 T1000,50 L1000,100 L0,100 Z" fill="url(#areaGradientM)" vectorEffect="non-scaling-stroke" />
                  <path d="M0,40 Q150,90 300,50 T500,80 T750,40 T1000,60" fill="none" stroke="#ffb4ab" strokeDasharray="4" strokeWidth="1.5" vectorEffect="non-scaling-stroke" />
                </svg>
              </div>
            </div>
          </section>
        </div>

        {/* AI Assistant Floating Input */}
        <div className="fixed bottom-6 right-6 w-96 z-50">
          <form onSubmit={handleAiSend} className="glass-panel p-2.5 rounded-2xl shadow-2xl flex items-center gap-3 active-glow bg-[#1e2029]">
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center animate-pulse flex-shrink-0" style={{ backgroundColor: '#2563eb' }}>
              <span className="material-symbols-outlined text-on-primary text-sm">smart_toy</span>
            </div>
            <input 
              className="flex-1 bg-transparent border-none text-xs outline-none focus:ring-0 text-on-surface placeholder:text-on-surface-variant/40" 
              placeholder="Ask maintenance assistant..." 
              type="text"
              value={aiQuery}
              onChange={e => setAiQuery(e.target.value)}
            />
            <button type="submit" className="p-1.5 hover:bg-white/5 rounded-lg text-primary cursor-pointer" style={{ color: '#b4c5ff' }}>
              <span className="material-symbols-outlined text-sm">send</span>
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}
