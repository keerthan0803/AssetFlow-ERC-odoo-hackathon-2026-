import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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

  const handleAssetSelect = (a) => { setSelectedAsset(a); setAssetInput(a.label); setShowDropdown(false); setSubmitted(false); setToEmployee('Select Employee...'); setReason(''); };
  const isAllocated = selectedAsset.status === 'Allocated';

  const handleSubmit = () => {
    if (toEmployee === 'Select Employee...') { toast.error('Please select a recipient'); return; }
    if (!reason.trim()) { toast.error('Please provide a reason'); return; }
    toast.success(`Transfer request submitted: ${selectedAsset.tag} → ${toEmployee}`);
    setSubmitted(true);
  };

  const FI = ({ label, value, onChange, placeholder, readOnly }) => (
    <div>
      <label style={{ fontSize: 12, fontWeight: 600, color: '#374151', display: 'block', marginBottom: 5 }}>{label}</label>
      <input value={value} onChange={onChange} readOnly={readOnly} placeholder={placeholder}
        style={{ width: '100%', padding: '9px 12px', border: '1px solid #e5e7eb', borderRadius: 8, fontSize: 13, color: readOnly ? '#9ca3af' : '#111827', outline: 'none', boxSizing: 'border-box', background: readOnly ? '#f9fafb' : '#fff', cursor: readOnly ? 'not-allowed' : 'auto' }} />
    </div>
  );

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f8f9fc', fontFamily: "'Inter', sans-serif" }}>
      <style>{`
        .dd-item:hover { background: #f9fafb; }
        .fi-focus:focus { border-color: #3b5bdb !important; box-shadow: 0 0 0 3px rgba(59,91,219,0.1); }
      `}</style>

      <Sidebar />

      <main style={{ flex: 1, overflowY: 'auto' }}>
        <header style={{ backgroundColor: '#fff', borderBottom: '1px solid #e5e7eb', padding: '14px 28px', position: 'sticky', top: 0, zIndex: 40 }}>
          <div style={{ fontSize: 18, fontWeight: 800, color: '#111827' }}>Allocation & Transfer</div>
          <div style={{ fontSize: 12, color: '#9ca3af' }}>Manage asset assignments and transfer requests</div>
        </header>

        <div style={{ padding: '28px', maxWidth: 620 }}>
          {/* Asset Selector */}
          <div style={{ marginBottom: 18, position: 'relative' }}>
            <label style={{ fontSize: 12, fontWeight: 600, color: '#374151', display: 'block', marginBottom: 5 }}>Asset</label>
            <input value={assetInput} onChange={e => setAssetInput(e.target.value)}
              onFocus={() => setShowDropdown(true)} onBlur={() => setTimeout(() => setShowDropdown(false), 150)}
              placeholder="Search by tag or name..."
              className="fi-focus"
              style={{ width: '100%', padding: '9px 12px', border: '1px solid #e5e7eb', borderRadius: 8, fontSize: 13, color: '#111827', outline: 'none', boxSizing: 'border-box', background: '#fff' }} />
            {showDropdown && (
              <div style={{ position: 'absolute', top: '100%', left: 0, right: 0, zIndex: 100, background: '#fff', border: '1px solid #e5e7eb', borderRadius: 10, marginTop: 4, overflow: 'hidden', boxShadow: '0 8px 24px rgba(0,0,0,0.1)' }}>
                {assetOptions.filter(a => a.label.toLowerCase().includes(assetInput.toLowerCase())).map(a => (
                  <div key={a.tag} className="dd-item" onMouseDown={() => handleAssetSelect(a)}
                    style={{ padding: '10px 14px', cursor: 'pointer', fontSize: 13, borderBottom: '1px solid #f3f4f6', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontWeight: 500, color: '#111827' }}>{a.label}</span>
                    <span style={{ fontSize: 11, fontWeight: 700, padding: '2px 9px', borderRadius: 99, backgroundColor: a.status === 'Available' ? '#f0fdf4' : '#eff2ff', color: a.status === 'Available' ? '#16a34a' : '#3b5bdb', border: `1px solid ${a.status === 'Available' ? '#bbf7d0' : '#c5d0fc'}` }}>{a.status}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Status alert */}
          {isAllocated ? (
            <div style={{ padding: '12px 16px', borderRadius: 10, marginBottom: 20, backgroundColor: '#fef2f2', border: '1px solid #fecaca' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 3 }}>
                <span className="material-symbols-outlined" style={{ fontSize: 16, color: '#ef4444', fontVariationSettings: "'FILL' 1" }}>warning</span>
                <span style={{ fontSize: 13, fontWeight: 700, color: '#dc2626' }}>Already Allocated to {selectedAsset.allocatedTo} ({selectedAsset.dept})</span>
              </div>
              <p style={{ fontSize: 12, color: '#b91c1c', margin: 0, paddingLeft: 24 }}>Direct reallocation is blocked — submit a transfer request below</p>
            </div>
          ) : (
            <div style={{ padding: '12px 16px', borderRadius: 10, marginBottom: 20, backgroundColor: '#f0fdf4', border: '1px solid #bbf7d0' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span className="material-symbols-outlined" style={{ fontSize: 16, color: '#16a34a', fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                <span style={{ fontSize: 13, fontWeight: 600, color: '#15803d' }}>Asset is available for direct allocation</span>
              </div>
            </div>
          )}

          <hr style={{ border: 'none', borderTop: '1px solid #f3f4f6', margin: '0 0 20px' }} />

          {/* Transfer form */}
          <h3 style={{ fontSize: 14, fontWeight: 700, color: '#111827', marginBottom: 16 }}>Transfer Request</h3>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 14 }}>
            <FI label="From" value={isAllocated ? selectedAsset.allocatedTo : 'Unallocated'} readOnly />
            <div>
              <label style={{ fontSize: 12, fontWeight: 600, color: '#374151', display: 'block', marginBottom: 5 }}>To</label>
              <select value={toEmployee} onChange={e => setToEmployee(e.target.value)} className="fi-focus"
                style={{ width: '100%', padding: '9px 12px', border: '1px solid #e5e7eb', borderRadius: 8, fontSize: 13, color: '#111827', outline: 'none', background: '#fff', cursor: 'pointer' }}>
                {employees.map(e => <option key={e}>{e}</option>)}
              </select>
            </div>
          </div>

          <div style={{ marginBottom: 20 }}>
            <label style={{ fontSize: 12, fontWeight: 600, color: '#374151', display: 'block', marginBottom: 5 }}>Reason</label>
            <textarea value={reason} onChange={e => setReason(e.target.value)} rows={4} placeholder="Provide reason for transfer or reallocation..."
              className="fi-focus"
              style={{ width: '100%', padding: '9px 12px', border: '1px solid #e5e7eb', borderRadius: 8, fontSize: 13, color: '#111827', outline: 'none', boxSizing: 'border-box', resize: 'vertical', minHeight: 90, background: '#fff' }} />
          </div>

          <button onClick={handleSubmit} disabled={submitted}
            style={{ padding: '10px 24px', borderRadius: 9, fontSize: 13, fontWeight: 700, border: 'none', cursor: submitted ? 'default' : 'pointer', backgroundColor: submitted ? '#f0fdf4' : '#16a34a', color: submitted ? '#15803d' : '#fff', transition: 'all 0.15s', display: 'flex', alignItems: 'center', gap: 6 }}>
            {submitted ? (<><span className="material-symbols-outlined" style={{ fontSize: 16 }}>check_circle</span> Request Submitted</>) : 'Submit Request'}
          </button>

          <hr style={{ border: 'none', borderTop: '1px solid #f3f4f6', margin: '24px 0' }} />

          {/* History */}
          <h3 style={{ fontSize: 14, fontWeight: 700, color: '#111827', marginBottom: 14 }}>Allocation History</h3>
          <div style={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: 10, overflow: 'hidden' }}>
            {allocationHistory.map((e, i) => (
              <div key={i} style={{ display: 'flex', gap: 14, padding: '12px 16px', borderBottom: i < allocationHistory.length - 1 ? '1px solid #f3f4f6' : 'none', alignItems: 'center' }}>
                <span style={{ fontSize: 11, fontWeight: 700, color: '#9ca3af', width: 46, flexShrink: 0 }}>{e.date}</span>
                <div style={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: '#d1d5db', flexShrink: 0 }} />
                <span style={{ fontSize: 13, color: '#374151' }}>{e.desc}</span>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
