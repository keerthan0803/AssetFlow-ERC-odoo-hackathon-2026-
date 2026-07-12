import React, { useState } from 'react';
import toast from 'react-hot-toast';
import Sidebar from '../../components/Sidebar';

const INITIAL_AUDIT_ASSETS = [
  { id: 'AF-003', name: 'Dell laptop', expectedLocation: 'Desk E12', verification: 'Verified' },
  { id: 'AF-9921', name: 'Office chair', expectedLocation: 'Desk E14', verification: 'Missing' },
  { id: 'AF-9838', name: 'Monitor', expectedLocation: 'Desk E15', verification: 'Damaged' },
  { id: 'AF-0119', name: 'iPad Pro 12.9"', expectedLocation: 'Cabinet B', verification: 'Verified' },
  { id: 'AF-0044', name: 'Label Printer', expectedLocation: 'Reception Desk', verification: 'Verified' },
];

export default function Audit() {
  const [assets, setAssets] = useState(INITIAL_AUDIT_ASSETS);
  const [closed, setClosed] = useState(false);

  const handleStatusChange = (id, newStatus) => {
    if (closed) return;
    setAssets(prev => prev.map(a => a.id === id ? { ...a, verification: newStatus } : a));
    toast.success(`Asset ${id} marked as ${newStatus}`);
  };

  const handleCloseCycle = () => {
    setClosed(true);
    const flagged = assets.filter(a => a.verification === 'Missing' || a.verification === 'Damaged').length;
    toast.success(`Audit cycle closed. ${flagged} discrepancy records dispatched for review.`);
  };

  const flaggedAssets = assets.filter(a => a.verification === 'Missing' || a.verification === 'Damaged');

  return (
    <div className="flex min-h-screen bg-gray-50/50 font-sans">
      <Sidebar />

      <main className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <header className="bg-white border-b border-gray-100 px-8 py-5 sticky top-0 z-40 shadow-sm flex items-center justify-between">
          <div className="pl-10 md:pl-0">
            <h1 className="text-xl font-bold text-gray-900 tracking-tight">Asset Audit</h1>
            <p className="text-xs text-gray-500 mt-1">Conduct cyclical audits, verify placement checklists, and log exceptions</p>
          </div>
        </header>

        {/* Content Container */}
        <div className="p-8 max-w-4xl w-full mx-auto space-y-6 text-left">
          
          {/* Audit Cycle Meta Card */}
          <div className="bg-gradient-to-tr from-gray-900 to-indigo-950 text-white rounded-2xl p-6 shadow-sm border border-gray-950 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <span className="text-[10px] uppercase font-bold tracking-widest text-indigo-300">Active Audit Loop</span>
              <h2 className="text-base font-extrabold tracking-tight mt-1">Q3 audit: Engineering dept</h2>
              <p className="text-xs text-gray-300 mt-0.5">Timeline: 1 - 15 July · Scope: 5 Items</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="text-right hidden sm:block">
                <div className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Auditors Assigned</div>
                <div className="text-xs font-bold text-white">A. Rao, S. Iqbal</div>
              </div>
              <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0">
                <span className="material-symbols-outlined text-white text-lg">fact_check</span>
              </div>
            </div>
          </div>

          {/* Audit List Table Card */}
          <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-gray-100 bg-gray-50/50">
                    <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Asset</th>
                    <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Expected Location</th>
                    <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-right">Verification</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {assets.map(asset => (
                    <tr key={asset.id} className="hover:bg-gray-50/30 transition-colors">
                      <td className="px-6 py-4.5">
                        <div>
                          <div className="text-sm font-bold text-gray-800">{asset.name}</div>
                          <div className="text-[10px] text-gray-400 font-bold font-mono tracking-wider mt-0.5 uppercase">{asset.id}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4.5 text-xs font-semibold text-gray-600">
                        {asset.expectedLocation}
                      </td>
                      <td className="px-6 py-4.5">
                        <div className="flex items-center justify-end gap-1.5">
                          {['Verified', 'Missing', 'Damaged'].map(status => {
                            const isSelected = asset.verification === status;
                            let btnStyle = 'text-gray-400 hover:text-gray-700 bg-gray-50 hover:bg-gray-100';
                            
                            if (isSelected) {
                              if (status === 'Verified') btnStyle = 'bg-green-600 text-white shadow-sm shadow-green-100 font-bold';
                              if (status === 'Missing') btnStyle = 'bg-red-600 text-white shadow-sm shadow-red-100 font-bold';
                              if (status === 'Damaged') btnStyle = 'bg-amber-600 text-white shadow-sm shadow-amber-100 font-bold';
                            }

                            return (
                              <button
                                key={status}
                                disabled={closed}
                                onClick={() => handleStatusChange(asset.id, status)}
                                className={`px-3 py-1.5 rounded-lg text-[10px] transition-all tracking-wide uppercase ${btnStyle} ${
                                  closed ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer active:scale-95'
                                }`}
                              >
                                {status}
                              </button>
                            );
                          })}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Alert discrepancy block (Screen 8 mock) */}
          {flaggedAssets.length > 0 ? (
            <div className="bg-amber-50/70 border border-amber-200/60 rounded-2xl p-5 flex gap-3.5 items-start">
              <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center text-amber-600 flex-shrink-0 animate-bounce">
                <span className="material-symbols-outlined text-lg">flag</span>
              </div>
              <div className="flex-1">
                <h3 className="text-sm font-bold text-amber-800">
                  {flaggedAssets.length} asset{flaggedAssets.length > 1 ? 's' : ''} flagged for review
                </h3>
                <p className="text-xs text-amber-700 mt-1 leading-relaxed">
                  Discrepancy reports have been automatically compiled and appended to compliance files.
                </p>
              </div>
            </div>
          ) : (
            <div className="bg-green-50/70 border border-green-200/60 rounded-2xl p-5 flex gap-3.5 items-start">
              <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-600 flex-shrink-0">
                <span className="material-symbols-outlined text-lg">verified_user</span>
              </div>
              <div className="flex-1">
                <h3 className="text-sm font-bold text-green-800">Compliance verified</h3>
                <p className="text-xs text-green-700 mt-1 leading-relaxed">
                  All audit queue items are accounted for. Compliance levels remain in green status.
                </p>
              </div>
            </div>
          )}

          {/* Action button */}
          <div className="pt-2">
            <button 
              onClick={handleCloseCycle}
              disabled={closed}
              className={`px-6 py-3 rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition-all active:scale-98 shadow-sm ${
                closed 
                  ? 'bg-gray-100 text-gray-400 border border-gray-200 cursor-not-allowed' 
                  : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-100/50 hover:shadow-lg cursor-pointer'
              }`}
            >
              <span className="material-symbols-outlined text-lg font-bold">lock</span>
              {closed ? 'Audit Cycle Closed' : 'Close Audit Cycle'}
            </button>
          </div>

        </div>
      </main>
    </div>
  );
}
