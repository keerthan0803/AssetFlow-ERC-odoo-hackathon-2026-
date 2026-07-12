import React, { useState } from 'react';
import toast from 'react-hot-toast';
import Sidebar from '../../components/Sidebar';

const assetOptions = [
  { tag: 'AF-0119', label: 'AF-0119 — Dell Laptop',     allocatedTo: 'Priya Shah', dept: 'Engineering', status: 'Allocated' },
  { tag: 'AF-0088', label: 'AF-0088 — Monitor 27"',     allocatedTo: null,         dept: null,          status: 'Available' },
  { tag: 'AF-0031', label: 'AF-0031 — Barcode Scanner', allocatedTo: 'Sana Iqbal', dept: 'Operations',  status: 'Allocated' },
  { tag: 'AF-0199', label: 'AF-0199 — iPad Pro',        allocatedTo: null,         dept: null,          status: 'Available' },
];

const employees = ['Select Employee...', 'Arjun Nair', 'Rohan Mehta', 'Sana Iqbal', 'Marcus Sterling', 'Elena Rodriguez', 'Aditi Rao'];

const allocationHistory = [
  { date: 'Mar 12', desc: 'Allocated to Priya Shah — Engineering' },
  { date: 'Jan 04', desc: 'Returned by Arjun Nair — condition: good' },
  { date: 'Nov 18', desc: 'Allocated to Arjun Nair — Operations' },
  { date: 'Sep 02', desc: 'Registered — Warehouse intake' },
];

export default function Allocation() {
  const [selectedAsset, setSelectedAsset] = useState(assetOptions[0]);
  const [assetInput, setAssetInput] = useState(assetOptions[0].label);
  const [showDropdown, setShowDropdown] = useState(false);
  const [toEmployee, setToEmployee] = useState('Select Employee...');
  const [reason, setReason] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleAssetSelect = (a) => { 
    setSelectedAsset(a); 
    setAssetInput(a.label); 
    setShowDropdown(false); 
    setSubmitted(false); 
    setToEmployee('Select Employee...'); 
    setReason(''); 
  };

  const isAllocated = selectedAsset.status === 'Allocated';

  const handleSubmit = () => {
    if (toEmployee === 'Select Employee...') { 
      toast.error('Please select a recipient'); 
      return; 
    }
    if (!reason.trim()) { 
      toast.error('Please provide a reason'); 
      return; 
    }
    toast.success(`Transfer request submitted: ${selectedAsset.tag} → ${toEmployee}`);
    setSubmitted(true);
  };

  return (
    <div className="flex min-h-screen bg-gray-50/50 font-sans">
      <Sidebar />

      <main className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <header className="bg-white border-b border-gray-100 px-8 py-5 sticky top-0 z-40 shadow-sm flex items-center justify-between">
          <div className="pl-10 md:pl-0">
            <h1 className="text-xl font-bold text-gray-900 tracking-tight">Allocation &amp; Transfer</h1>
            <p className="text-xs text-gray-500 mt-1">Manage asset assignments and transfer requests</p>
          </div>
        </header>

        {/* Content Container */}
        <div className="p-8 max-w-6.5xl w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Form & Warnings */}
          <div className="lg:col-span-7 bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-6">
            
            {/* Asset Selector */}
            <div className="relative">
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Asset</label>
              <div className="relative">
                <input 
                  value={assetInput} 
                  onChange={e => setAssetInput(e.target.value)}
                  onFocus={() => setShowDropdown(true)} 
                  onBlur={() => setTimeout(() => setShowDropdown(false), 200)}
                  placeholder="Search by tag or name..."
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100/50 transition-all"
                />
                <span className="material-symbols-outlined absolute right-3.5 top-3.5 text-gray-400 pointer-events-none">search</span>
              </div>

              {showDropdown && (
                <div className="absolute top-[102%] left-0 right-0 z-50 bg-white border border-gray-100 rounded-xl mt-1 overflow-hidden shadow-xl max-h-60 overflow-y-auto">
                  {assetOptions
                    .filter(a => a.label.toLowerCase().includes(assetInput.toLowerCase()))
                    .map(a => (
                      <div 
                        key={a.tag} 
                        onMouseDown={() => handleAssetSelect(a)}
                        className="px-4 py-3 hover:bg-gray-50 cursor-pointer text-sm border-b border-gray-50 flex justify-between items-center transition-colors"
                      >
                        <span className="font-semibold text-gray-800">{a.label}</span>
                        <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
                          a.status === 'Available' 
                            ? 'bg-green-50 text-green-700 border border-green-200/50' 
                            : 'bg-indigo-50 text-indigo-700 border border-indigo-200/50'
                        }`}>
                          {a.status}
                        </span>
                      </div>
                    ))}
                </div>
              )}
            </div>

            {/* Warning Alert (Screen 5 mock) */}
            {isAllocated ? (
              <div className="bg-red-50/70 border border-red-200/60 rounded-2xl p-5 flex gap-3.5 items-start">
                <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center text-red-600 flex-shrink-0">
                  <span className="material-symbols-outlined text-lg">warning</span>
                </div>
                <div className="flex-1">
                  <h3 className="text-sm font-bold text-red-800">Already Allocated to {selectedAsset.allocatedTo} ({selectedAsset.dept})</h3>
                  <p className="text-xs text-red-700 mt-1 leading-relaxed">Direct re-allocation is blocked — submit a transfer request below.</p>
                </div>
              </div>
            ) : (
              <div className="bg-green-50/70 border border-green-200/60 rounded-2xl p-5 flex gap-3.5 items-start">
                <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-600 flex-shrink-0">
                  <span className="material-symbols-outlined text-lg">check_circle</span>
                </div>
                <div className="flex-1">
                  <h3 className="text-sm font-bold text-green-800">Asset Available</h3>
                  <p className="text-xs text-green-700 mt-1 leading-relaxed">This asset is available for direct allocation without restrictions.</p>
                </div>
              </div>
            )}

            <div className="border-t border-gray-50 my-6" />

            {/* Transfer request form */}
            <div>
              <h2 className="text-base font-extrabold text-gray-900 mb-5 tracking-tight">Transfer Request</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">From</label>
                  <input 
                    value={isAllocated ? selectedAsset.allocatedTo : 'Unallocated'} 
                    readOnly 
                    className="w-full px-4 py-3 border border-gray-100 bg-gray-50 text-gray-500 rounded-xl text-sm focus:outline-none cursor-not-allowed"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">To</label>
                  <select 
                    value={toEmployee} 
                    onChange={e => setToEmployee(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm text-gray-950 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100/50 bg-white cursor-pointer transition-all"
                  >
                    {employees.map(e => <option key={e} value={e}>{e}</option>)}
                  </select>
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Reason</label>
                <textarea 
                  value={reason} 
                  onChange={e => setReason(e.target.value)}
                  rows={4} 
                  placeholder="Provide detailed reason for transfer or reallocation..."
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100/50 transition-all resize-none"
                />
              </div>

              <button 
                onClick={handleSubmit} 
                disabled={submitted}
                className={`w-full md:w-auto px-6 py-3 rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition-all active:scale-98 shadow-sm ${
                  submitted 
                    ? 'bg-green-50 text-green-700 border border-green-200' 
                    : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-100/50 hover:shadow-lg'
                }`}
              >
                {submitted ? (
                  <>
                    <span className="material-symbols-outlined text-lg">check_circle</span>
                    Request Submitted
                  </>
                ) : (
                  'Submit Request'
                )}
              </button>
            </div>

          </div>

          {/* Right Column: Allocation History */}
          <div className="lg:col-span-5 bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <h2 className="text-base font-extrabold text-gray-900 mb-6 tracking-tight">Allocation History</h2>
            
            <div className="relative pl-6 space-y-6 before:content-[''] before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-[2px] before:bg-gray-100">
              {allocationHistory.map((h, i) => (
                <div key={i} className="relative flex gap-4 items-start group">
                  {/* Bullet indicator */}
                  <div className="absolute -left-[20px] top-1.5 w-3.5 h-3.5 rounded-full border-[3px] border-white bg-indigo-500 shadow-sm group-hover:bg-purple-500 transition-colors" />
                  
                  <div className="flex-1 text-left">
                    <span className="inline-block text-[10px] font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full mb-1">
                      {h.date}
                    </span>
                    <p className="text-sm font-medium text-gray-700 leading-relaxed">{h.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
