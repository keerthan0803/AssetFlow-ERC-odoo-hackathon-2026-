import React from 'react';
import toast from 'react-hot-toast';
import Sidebar from '../../components/Sidebar';

export default function Reports() {
  const handleExport = () => {
    toast.success('Compiling reports... Downloading analytical workbook (XLSX).');
  };

  const mostUsed = [
    { name: 'Conference Room B2', detail: '34 bookings this month', icon: 'room', rate: 85 },
    { name: 'Delivery Van AF-343', detail: '21 trips this month', icon: 'local_shipping', rate: 68 },
    { name: 'Projector AF-335', detail: '18 uses', icon: 'videocam', rate: 52 },
  ];

  const idleAssets = [
    { id: 'AF-0301', name: 'Digital SLR Camera', duration: 'unused 60+ days' },
    { id: 'AF-0410', name: 'Ergonomic Chair', duration: 'unused 45 days' },
  ];

  const maintenanceDue = [
    { id: 'AF-0087', name: 'Warehouse Forklift', info: 'service due in 5 days', type: 'critical' },
    { id: 'AF-0020', name: 'Developer Laptop', info: '4 years old : nearing retirement', type: 'retirement' },
  ];

  // SVG Chart Dimensions
  const barChartWidth = 400;
  const barChartHeight = 180;
  const departments = [
    { name: 'Eng', value: 85 },
    { name: 'Ops', value: 64 },
    { name: 'Mktg', value: 45 },
    { name: 'Sales', value: 72 },
    { name: 'HR', value: 30 }
  ];

  return (
    <div className="flex min-h-screen bg-gray-50/50 font-sans">
      <Sidebar />

      <main className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <header className="bg-white border-b border-gray-100 px-8 py-5 sticky top-0 z-40 shadow-sm flex items-center justify-between">
          <div className="pl-10 md:pl-0">
            <h1 className="text-xl font-bold text-gray-900 tracking-tight">Reports &amp; Analytics</h1>
            <p className="text-xs text-gray-500 mt-1">EAM asset utilization rates, breakdowns, and maintenance frequencies</p>
          </div>
          <button 
            onClick={handleExport}
            className="flex items-center gap-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition-all active:scale-95 shadow-sm shadow-indigo-100 cursor-pointer"
          >
            <span className="material-symbols-outlined text-[16px] font-bold">file_download</span> Export Report
          </button>
        </header>

        {/* Content Container */}
        <div className="p-8 max-w-5xl w-full mx-auto space-y-8 text-left">
          
          {/* Charts Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Utilization By Department Bar Chart */}
            <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm flex flex-col">
              <div className="mb-4">
                <h3 className="text-sm font-bold text-gray-900">Utilization by Department</h3>
                <p className="text-xs text-gray-400 mt-0.5">Asset load per department</p>
              </div>

              {/* Custom SVG Bar Chart */}
              <div className="flex-1 flex justify-center items-end h-[200px] border-b border-gray-100/60 pb-2 relative">
                {departments.map((dept, index) => {
                  const barHeight = (dept.value / 100) * 140;
                  return (
                    <div key={index} className="flex flex-col items-center flex-1 group">
                      <div className="relative w-8 bg-gray-50 rounded-t-lg overflow-hidden h-[150px] flex items-end">
                        <div 
                          style={{ height: `${barHeight}px` }}
                          className="w-full bg-gradient-to-t from-indigo-600 to-purple-500 rounded-t-lg transition-all duration-500 group-hover:brightness-110"
                        />
                        {/* Tooltip */}
                        <div className="absolute opacity-0 group-hover:opacity-100 bottom-[105%] left-1/2 -translate-x-1/2 bg-gray-900 text-white text-[9px] font-bold px-2 py-1 rounded shadow-lg transition-opacity duration-150 pointer-events-none z-10">
                          {dept.value}%
                        </div>
                      </div>
                      <span className="text-[10px] text-gray-400 font-bold mt-2">{dept.name}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Maintenance Frequency Line Chart */}
            <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm flex flex-col">
              <div className="mb-4">
                <h3 className="text-sm font-bold text-gray-900">Maintenance Frequency</h3>
                <p className="text-xs text-gray-400 mt-0.5">Weekly trend of repair resolutions</p>
              </div>

              {/* Custom SVG Area Line Chart */}
              <div className="flex-1 h-[200px] relative mt-2">
                <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 1000 100">
                  <defs>
                    <linearGradient id="chartGradient" x1="0" x2="0" y1="0" y2="1">
                      <stop offset="0%" stopColor="#4f46e5" stopOpacity="0.25" />
                      <stop offset="100%" stopColor="#c084fc" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  
                  {/* Grid Lines */}
                  <line stroke="#f3f4f6" strokeWidth="1" x1="0" x2="1000" y1="25" y2="25" />
                  <line stroke="#f3f4f6" strokeWidth="1" x1="0" x2="1000" y1="50" y2="50" />
                  <line stroke="#f3f4f6" strokeWidth="1" x1="0" x2="1000" y1="75" y2="75" />

                  {/* Area fill */}
                  <path d="M0,85 Q150,20 350,55 T750,25 T1000,45 L1000,100 L0,100 Z" fill="url(#chartGradient)" />
                  {/* Line stroke */}
                  <path d="M0,85 Q150,20 350,55 T750,25 T1000,45" fill="none" stroke="#4f46e5" strokeWidth="3" />
                </svg>
                
                {/* Horizontal Scale Labels */}
                <div className="flex justify-between text-[10px] text-gray-400 font-bold mt-2.5">
                  <span>Mon</span>
                  <span>Tue</span>
                  <span>Wed</span>
                  <span>Thu</span>
                  <span>Fri</span>
                </div>
              </div>
            </div>

          </div>

          {/* Details Lists Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Most Used Assets */}
            <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400">Most Used Assets</h4>
              <div className="space-y-4.5">
                {mostUsed.map((a, i) => (
                  <div key={i} className="flex gap-3.5 items-start">
                    <div className="w-9 h-9 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center flex-shrink-0">
                      <span className="material-symbols-outlined text-lg">{a.icon}</span>
                    </div>
                    <div className="flex-grow min-w-0">
                      <p className="text-sm font-bold text-gray-800 truncate">{a.name}</p>
                      <p className="text-xs text-gray-400 mt-0.5">{a.detail}</p>
                      <div className="w-full h-1 bg-gray-50 rounded-full mt-2 overflow-hidden">
                        <div style={{ width: `${a.rate}%` }} className="h-full bg-indigo-500 rounded-full" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Idle Assets */}
            <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400">Idle Assets</h4>
              <div className="space-y-4">
                {idleAssets.map((a, i) => (
                  <div key={i} className="flex gap-3.5 items-center p-3 rounded-xl hover:bg-gray-50 border border-gray-50/50 transition-colors">
                    <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center flex-shrink-0">
                      <span className="material-symbols-outlined text-lg">hourglass_empty</span>
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-bold text-gray-800 truncate">{a.name}</p>
                      <span className="inline-block text-[9px] font-extrabold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full mt-1 uppercase tracking-wide">
                        {a.duration}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Retirement / Maintenance Due */}
            <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400">Action Required</h4>
              <div className="space-y-4">
                {maintenanceDue.map((a, i) => (
                  <div 
                    key={i} 
                    className={`flex gap-3.5 items-center p-3 rounded-xl border transition-colors ${
                      a.type === 'critical' 
                        ? 'bg-red-50/40 border-red-100/50 text-red-900' 
                        : 'bg-indigo-50/30 border-indigo-100/40 text-indigo-900'
                    }`}
                  >
                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${
                      a.type === 'critical' ? 'bg-red-100 text-red-600' : 'bg-indigo-100 text-indigo-600'
                    }`}>
                      <span className="material-symbols-outlined text-lg">
                        {a.type === 'critical' ? 'dangerous' : 'history_toggle_off'}
                      </span>
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-bold truncate">{a.name}</p>
                      <p className={`text-[10px] font-semibold mt-0.5 ${
                        a.type === 'critical' ? 'text-red-700' : 'text-indigo-600'
                      }`}>
                        {a.info}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>
      </main>
    </div>
  );
}
