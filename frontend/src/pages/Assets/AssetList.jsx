import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import Sidebar from '../../components/Sidebar';

const allAssets = [
  { tag: 'AF-0012', name: 'Dell Laptop',    category: 'Electronics',    status: 'Allocated',    location: 'Bengaluru',  dept: 'Engineering' },
  { tag: 'AF-0062', name: 'Projector',       category: 'Electronics',    status: 'Maintenance',  location: 'HQ Floor 2', dept: 'Facilities' },
  { tag: 'AF-0201', name: 'Office Chair',    category: 'Furniture',      status: 'Available',    location: 'Warehouse',  dept: 'HR' },
  { tag: 'AF-0114', name: 'MacBook Pro 14"', category: 'Electronics',    status: 'Allocated',    location: 'IT Dept',    dept: 'Engineering' },
  { tag: 'AF-0088', name: 'Monitor 27"',     category: 'Electronics',    status: 'Available',    location: 'Warehouse',  dept: 'IT' },
  { tag: 'AF-0031', name: 'Barcode Scanner', category: 'Electronics',    status: 'Allocated',    location: 'Warehouse',  dept: 'Operations' },
  { tag: 'AF-0199', name: 'iPad Pro',        category: 'Electronics',    status: 'Available',    location: 'IT Dept',    dept: 'Engineering' },
  { tag: 'AF-0045', name: 'Standing Desk',   category: 'Furniture',      status: 'Allocated',    location: 'HQ Floor 3', dept: 'Finance' },
  { tag: 'AF-0077', name: 'UPS Battery Pack',category: 'Infrastructure', status: 'Available',    location: 'Data Center',dept: 'IT' },
  { tag: 'AF-0093', name: 'Conf. Camera',    category: 'Electronics',    status: 'Maintenance',  location: 'Room B2',    dept: 'Facilities' },
];

const STATUS = {
  'Available':   { bg: '#f0fdf4', color: '#16a34a', border: '#bbf7d0', dot: '#16a34a' },
  'Allocated':   { bg: '#eff2ff', color: '#3b5bdb', border: '#c5d0fc', dot: '#3b5bdb' },
  'Maintenance': { bg: '#fffbeb', color: '#d97706', border: '#fde68a', dot: '#d97706' },
};

export default function AssetList() {
  const navigate = useNavigate();
  const [assets, setAssets] = useState(allAssets);
  const [search, setSearch] = useState('');
  const [catFilter, setCatFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [deptFilter, setDeptFilter] = useState('All');
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ tag: '', name: '', category: 'Electronics', status: 'Available', location: '', dept: '' });

  const cats = ['All', ...new Set(allAssets.map(a => a.category))];
  const statuses = ['All', 'Available', 'Allocated', 'Maintenance'];
  const depts = ['All', ...new Set(allAssets.map(a => a.dept))];

  const filtered = assets.filter(a => {
    const q = search.toLowerCase();
    return (!search || a.tag.toLowerCase().includes(q) || a.name.toLowerCase().includes(q) || a.location.toLowerCase().includes(q))
      && (catFilter === 'All' || a.category === catFilter)
      && (statusFilter === 'All' || a.status === statusFilter)
      && (deptFilter === 'All' || a.dept === deptFilter);
  });

  const handleRegister = () => {
    if (!form.tag || !form.name) { toast.error('Tag and Name are required'); return; }
    setAssets(prev => [form, ...prev]);
    toast.success(`Asset ${form.tag} registered!`);
    setForm({ tag: '', name: '', category: 'Electronics', status: 'Available', location: '', dept: '' });
    setShowModal(false);
  };

  const FilterChip = ({ label, active, onClick }) => (
    <button onClick={onClick} style={{ padding: '5px 14px', borderRadius: 99, fontSize: 12, fontWeight: active ? 700 : 500, cursor: 'pointer', border: active ? 'none' : '1px solid #e5e7eb', backgroundColor: active ? '#3b5bdb' : '#fff', color: active ? '#fff' : '#6b7280', transition: 'all 0.1s' }}>{label}</button>
  );

  const TH = ({ c }) => <th style={{ padding: '10px 16px', textAlign: 'left', fontSize: 11, fontWeight: 700, color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.06em', backgroundColor: '#f9fafb', borderBottom: '1px solid #e5e7eb' }}>{c}</th>;

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f8f9fc', fontFamily: "'Inter', sans-serif" }}>
      <style>{`
        .tbl-row:hover { background: #f9fafb; cursor: pointer; }
        .fi { width:100%;padding:9px 12px;border:1px solid #e5e7eb;border-radius:8px;font-size:13px;color:#111827;outline:none;box-sizing:border-box;background:#fff; }
        .fi:focus { border-color:#3b5bdb;box-shadow:0 0 0 3px rgba(59,91,219,0.1); }
        .modal-overlay { position:fixed;inset:0;background:rgba(0,0,0,0.35);display:flex;align-items:center;justify-content:center;z-index:999; }
        .modal-box { background:#fff;border-radius:16px;padding:28px;width:420px;box-shadow:0 20px 60px rgba(0,0,0,0.15); }
      `}</style>

      <Sidebar />

      <main style={{ flex: 1, overflowY: 'auto' }}>
        <header style={{ backgroundColor: '#fff', borderBottom: '1px solid #e5e7eb', padding: '14px 28px', position: 'sticky', top: 0, zIndex: 40 }}>
          <div style={{ fontSize: 18, fontWeight: 800, color: '#111827' }}>Assets</div>
          <div style={{ fontSize: 12, color: '#9ca3af' }}>Manage and track all enterprise assets</div>
        </header>

        <div style={{ padding: '24px 28px' }}>
          {/* Search + Register */}
          <div style={{ display: 'flex', gap: 12, marginBottom: 16 }}>
            <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 10, backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: 9, padding: '8px 14px' }}>
              <span className="material-symbols-outlined" style={{ fontSize: 18, color: '#9ca3af' }}>search</span>
              <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search by tag, serial, or QR code..." style={{ flex: 1, border: 'none', outline: 'none', fontSize: 13, color: '#374151', background: 'none' }} />
            </div>
            <button onClick={() => setShowModal(true)} style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '9px 18px', borderRadius: 9, border: 'none', backgroundColor: '#3b5bdb', color: '#fff', fontSize: 13, fontWeight: 700, cursor: 'pointer', whiteSpace: 'nowrap' }}>
              <span className="material-symbols-outlined" style={{ fontSize: 16 }}>add</span> Register Asset
            </button>
          </div>

          {/* Filters */}
          <div style={{ display: 'flex', gap: 12, marginBottom: 20, flexWrap: 'wrap', alignItems: 'center' }}>
            <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
              <span style={{ fontSize: 11, fontWeight: 700, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Category</span>
              {cats.map(c => <FilterChip key={c} label={c} active={catFilter===c} onClick={() => setCatFilter(c)} />)}
            </div>
            <div style={{ width: 1, height: 20, backgroundColor: '#e5e7eb' }} />
            <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
              <span style={{ fontSize: 11, fontWeight: 700, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Status</span>
              {statuses.map(s => <FilterChip key={s} label={s} active={statusFilter===s} onClick={() => setStatusFilter(s)} />)}
            </div>
          </div>

          {/* Table */}
          <div style={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: 12, overflow: 'hidden' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead><tr>{['Tag','Name','Category','Status','Location','Dept'].map(h => <TH key={h} c={h} />)}</tr></thead>
              <tbody>
                {filtered.length === 0 ? (
                  <tr><td colSpan={6} style={{ padding: 40, textAlign: 'center', color: '#9ca3af', fontSize: 13 }}>No assets match your filters.</td></tr>
                ) : filtered.map((a, i) => {
                  const sc = STATUS[a.status] || STATUS['Available'];
                  return (
                    <tr key={i} className="tbl-row" onDoubleClick={() => navigate(`/assets/${a.tag}`)}>
                      <td style={{ padding: '12px 16px', borderBottom: '1px solid #f3f4f6', fontFamily: 'monospace', fontSize: 13, fontWeight: 700, color: '#3b5bdb' }}>{a.tag}</td>
                      <td style={{ padding: '12px 16px', borderBottom: '1px solid #f3f4f6', fontSize: 13, fontWeight: 600, color: '#111827' }}>{a.name}</td>
                      <td style={{ padding: '12px 16px', borderBottom: '1px solid #f3f4f6', fontSize: 13, color: '#6b7280' }}>{a.category}</td>
                      <td style={{ padding: '12px 16px', borderBottom: '1px solid #f3f4f6' }}>
                        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, padding: '3px 10px', borderRadius: 99, fontSize: 12, fontWeight: 600, backgroundColor: sc.bg, color: sc.color, border: `1px solid ${sc.border}` }}>
                          <span style={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: sc.dot, display: 'inline-block' }} />{a.status}
                        </span>
                      </td>
                      <td style={{ padding: '12px 16px', borderBottom: '1px solid #f3f4f6', fontSize: 13, color: '#6b7280' }}>{a.location}</td>
                      <td style={{ padding: '12px 16px', borderBottom: '1px solid #f3f4f6', fontSize: 13, color: '#6b7280' }}>{a.dept}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <div style={{ padding: '10px 16px', fontSize: 12, color: '#9ca3af', borderTop: '1px solid #f3f4f6', backgroundColor: '#f9fafb' }}>
              Showing {filtered.length} of {assets.length} assets · Double-click a row to view details
            </div>
          </div>
        </div>
      </main>

      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-box" onClick={e => e.stopPropagation()}>
            <h3 style={{ fontSize: 16, fontWeight: 800, marginBottom: 20, color: '#111827' }}>Register New Asset</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 13 }}>
              {[{ l:'Asset Tag *', k:'tag', p:'e.g. AF-0300' }, { l:'Name *', k:'name', p:'e.g. Dell Laptop' }, { l:'Location', k:'location', p:'e.g. HQ Floor 2' }, { l:'Department', k:'dept', p:'e.g. Engineering' }].map(f => (
                <div key={f.k}>
                  <label style={{ fontSize: 12, fontWeight: 600, color: '#374151', display: 'block', marginBottom: 5 }}>{f.l}</label>
                  <input className="fi" value={form[f.k]} onChange={e => setForm(p => ({ ...p, [f.k]: e.target.value }))} placeholder={f.p} />
                </div>
              ))}
              {[{ l:'Category', k:'category', opts:['Electronics','Furniture','Infrastructure','Vehicles'] }, { l:'Status', k:'status', opts:['Available','Allocated','Maintenance'] }].map(f => (
                <div key={f.k}>
                  <label style={{ fontSize: 12, fontWeight: 600, color: '#374151', display: 'block', marginBottom: 5 }}>{f.l}</label>
                  <select className="fi" value={form[f.k]} onChange={e => setForm(p => ({ ...p, [f.k]: e.target.value }))}>
                    {f.opts.map(o => <option key={o}>{o}</option>)}
                  </select>
                </div>
              ))}
            </div>
            <div style={{ display: 'flex', gap: 10, marginTop: 24, justifyContent: 'flex-end' }}>
              <button onClick={() => setShowModal(false)} style={{ padding: '8px 20px', borderRadius: 8, border: '1px solid #e5e7eb', background: '#fff', color: '#374151', fontSize: 13, cursor: 'pointer' }}>Cancel</button>
              <button onClick={handleRegister} style={{ padding: '8px 20px', borderRadius: 8, border: 'none', background: '#3b5bdb', color: '#fff', fontSize: 13, fontWeight: 700, cursor: 'pointer' }}>Register</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
