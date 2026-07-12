import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import Sidebar from '../../components/Sidebar';

const initialDepartments = [
  { id: 1, name: 'Engineering',     head: 'Aditi Rao',    parentDept: '—',        status: 'Active' },
  { id: 2, name: 'Facilities',      head: 'Rohan Mehta',  parentDept: '—',        status: 'Active' },
  { id: 3, name: 'Field Ops (East)',head: 'Sana Iqbal',   parentDept: 'Field Ops', status: 'Inactive' },
  { id: 4, name: 'Finance',         head: 'Priya Shah',   parentDept: '—',        status: 'Active' },
  { id: 5, name: 'HR',              head: 'Marcus Sterling', parentDept: '—',     status: 'Active' },
];
const initialCategories = [
  { id: 1, name: 'Electronics',    description: 'Laptops, monitors, projectors', count: 48 },
  { id: 2, name: 'Furniture',      description: 'Chairs, desks, cabinets',       count: 32 },
  { id: 3, name: 'Vehicles',       description: 'Company vehicles and fleet',    count: 12 },
  { id: 4, name: 'Infrastructure', description: 'Servers, network equipment',    count: 27 },
];
const initialEmployees = [
  { id: 1, name: 'Aditi Rao',       email: 'aditi.r@assetflow.com',   dept: 'Engineering',     role: 'Head of Engineering', status: 'Active' },
  { id: 2, name: 'Rohan Mehta',     email: 'rohan.m@assetflow.com',   dept: 'Facilities',      role: 'Facilities Manager',  status: 'Active' },
  { id: 3, name: 'Sana Iqbal',      email: 'sana.i@assetflow.com',    dept: 'Field Ops (East)',role: 'Field Lead',          status: 'Inactive' },
  { id: 4, name: 'Priya Shah',      email: 'priya.s@assetflow.com',   dept: 'Finance',         role: 'Finance Head',        status: 'Active' },
];

const StatusBadge = ({ status }) => {
  const active = status === 'Active';
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 5,
      padding: '3px 10px', borderRadius: 99, fontSize: 12, fontWeight: 600,
      backgroundColor: active ? '#f0fdf4' : '#fef2f2',
      color: active ? '#16a34a' : '#dc2626',
      border: `1px solid ${active ? '#bbf7d0' : '#fecaca'}`,
    }}>
      <span style={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: active ? '#16a34a' : '#ef4444', display: 'inline-block' }} />
      {status}
    </span>
  );
};

export default function Departments() {
  const [activeTab, setActiveTab] = useState('Departments');
  const [departments, setDepartments] = useState(initialDepartments);
  const [categories] = useState(initialCategories);
  const [employees] = useState(initialEmployees);
  const [showModal, setShowModal] = useState(false);
  const [newDept, setNewDept] = useState({ name: '', head: '', parentDept: '', status: 'Active' });

  const handleAdd = () => {
    if (!newDept.name.trim()) { toast.error('Name is required'); return; }
    setDepartments(prev => [...prev, { id: Date.now(), ...newDept, parentDept: newDept.parentDept || '—' }]);
    toast.success(`"${newDept.name}" added`);
    setNewDept({ name: '', head: '', parentDept: '', status: 'Active' });
    setShowModal(false);
  };

  const TH = ({ children }) => (
    <th style={{ padding: '10px 16px', textAlign: 'left', fontSize: 11, fontWeight: 700, color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.06em', backgroundColor: '#f9fafb', borderBottom: '1px solid #e5e7eb' }}>{children}</th>
  );
  const TD = ({ children, mono }) => (
    <td style={{ padding: '12px 16px', fontSize: 13, color: mono ? '#3b5bdb' : '#374151', fontWeight: mono ? 700 : 500, fontFamily: mono ? 'monospace' : 'inherit', borderBottom: '1px solid #f3f4f6' }}>{children}</td>
  );

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f8f9fc', fontFamily: "'Inter', sans-serif" }}>
      <style>{`
        .tab-btn { padding: 7px 18px; border-radius: 7px; font-size: 13px; cursor: pointer; border: 1px solid #e5e7eb; font-weight: 500; transition: all 0.12s; }
        .tab-btn.active { background: #3b5bdb; color: #fff; border-color: #3b5bdb; font-weight: 700; }
        .tab-btn:not(.active) { background: #fff; color: #374151; }
        .tab-btn:not(.active):hover { background: #f9fafb; }
        .tbl-row:hover { background: #f9fafb; }
        .fi { width: 100%; padding: 9px 12px; border: 1px solid #e5e7eb; border-radius: 8px; font-size: 13px; color: #111827; outline: none; box-sizing: border-box; background: #fff; }
        .fi:focus { border-color: #3b5bdb; box-shadow: 0 0 0 3px rgba(59,91,219,0.1); }
        .modal-overlay { position:fixed;inset:0;background:rgba(0,0,0,0.35);display:flex;align-items:center;justify-content:center;z-index:999; }
        .modal-box { background:#fff;border-radius:16px;padding:28px;width:420px;box-shadow:0 20px 60px rgba(0,0,0,0.15); }
      `}</style>

      <Sidebar />

      <main style={{ flex: 1, overflowY: 'auto' }}>
        <header style={{ backgroundColor: '#fff', borderBottom: '1px solid #e5e7eb', padding: '14px 28px', position: 'sticky', top: 0, zIndex: 40 }}>
          <div style={{ fontSize: 18, fontWeight: 800, color: '#111827' }}>Organization Setup</div>
          <div style={{ fontSize: 12, color: '#9ca3af' }}>Manage departments, categories and employee directory</div>
        </header>

        <div style={{ padding: '24px 28px' }}>
          {/* Tabs + Add */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 20 }}>
            {['Departments','Categories','Employee'].map(t => (
              <button key={t} className={`tab-btn ${activeTab===t?'active':''}`} onClick={() => setActiveTab(t)}>{t}</button>
            ))}
            <button onClick={() => setShowModal(true)} style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 6, padding: '7px 16px', borderRadius: 8, border: 'none', backgroundColor: '#3b5bdb', color: '#fff', fontSize: 13, fontWeight: 700, cursor: 'pointer' }}>
              <span className="material-symbols-outlined" style={{ fontSize: 16 }}>add</span> Add
            </button>
          </div>

          {activeTab === 'Departments' && (
            <p style={{ fontSize: 12, color: '#9ca3af', marginBottom: 14, fontStyle: 'italic' }}>
              Editing a department here also drives the picklist in Asset Registration & Booking screens.
            </p>
          )}

          <div style={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: 12, overflow: 'hidden' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              {activeTab === 'Departments' && (
                <>
                  <thead><tr>{['Department','Head','Parent Dept','Status','Actions'].map(h => <TH key={h}>{h}</TH>)}</tr></thead>
                  <tbody>{departments.map(d => (
                    <tr key={d.id} className="tbl-row">
                      <TD><span style={{ fontWeight: 700, color: '#111827' }}>{d.name}</span></TD>
                      <TD>{d.head}</TD>
                      <TD>{d.parentDept}</TD>
                      <td style={{ padding: '12px 16px', borderBottom: '1px solid #f3f4f6' }}><StatusBadge status={d.status} /></td>
                      <td style={{ padding: '12px 16px', borderBottom: '1px solid #f3f4f6' }}>
                        <button onClick={() => toast.success(`Editing ${d.name}`)} style={{ fontSize: 12, color: '#3b5bdb', fontWeight: 700, background: 'none', border: 'none', cursor: 'pointer' }}>Edit</button>
                      </td>
                    </tr>
                  ))}</tbody>
                </>
              )}
              {activeTab === 'Categories' && (
                <>
                  <thead><tr>{['Category','Description','Asset Count','Actions'].map(h => <TH key={h}>{h}</TH>)}</tr></thead>
                  <tbody>{categories.map(c => (
                    <tr key={c.id} className="tbl-row">
                      <TD><span style={{ fontWeight: 700, color: '#111827' }}>{c.name}</span></TD>
                      <TD>{c.description}</TD>
                      <td style={{ padding: '12px 16px', borderBottom: '1px solid #f3f4f6' }}><span style={{ fontWeight: 800, color: '#3b5bdb', fontSize: 14 }}>{c.count}</span></td>
                      <td style={{ padding: '12px 16px', borderBottom: '1px solid #f3f4f6' }}>
                        <button onClick={() => toast.success(`Editing ${c.name}`)} style={{ fontSize: 12, color: '#3b5bdb', fontWeight: 700, background: 'none', border: 'none', cursor: 'pointer' }}>Edit</button>
                      </td>
                    </tr>
                  ))}</tbody>
                </>
              )}
              {activeTab === 'Employee' && (
                <>
                  <thead><tr>{['Name','Email','Department','Role','Status'].map(h => <TH key={h}>{h}</TH>)}</tr></thead>
                  <tbody>{employees.map(e => (
                    <tr key={e.id} className="tbl-row">
                      <TD><span style={{ fontWeight: 700, color: '#111827' }}>{e.name}</span></TD>
                      <TD>{e.email}</TD>
                      <TD>{e.dept}</TD>
                      <TD>{e.role}</TD>
                      <td style={{ padding: '12px 16px', borderBottom: '1px solid #f3f4f6' }}><StatusBadge status={e.status} /></td>
                    </tr>
                  ))}</tbody>
                </>
              )}
            </table>
          </div>
        </div>
      </main>

      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-box" onClick={e => e.stopPropagation()}>
            <h3 style={{ fontSize: 16, fontWeight: 800, marginBottom: 20, color: '#111827' }}>Add {activeTab === 'Employee' ? 'Employee' : activeTab === 'Categories' ? 'Category' : 'Department'}</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {[{ label: 'Name *', key: 'name', ph: 'e.g. Engineering' }, { label: 'Head', key: 'head', ph: 'Manager name' }, { label: 'Parent Dept', key: 'parentDept', ph: 'Leave blank if none' }].map(f => (
                <div key={f.key}>
                  <label style={{ fontSize: 12, fontWeight: 600, color: '#374151', display: 'block', marginBottom: 5 }}>{f.label}</label>
                  <input className="fi" placeholder={f.ph} value={newDept[f.key]} onChange={e => setNewDept(p => ({ ...p, [f.key]: e.target.value }))} />
                </div>
              ))}
              <div>
                <label style={{ fontSize: 12, fontWeight: 600, color: '#374151', display: 'block', marginBottom: 5 }}>Status</label>
                <select className="fi" value={newDept.status} onChange={e => setNewDept(p => ({ ...p, status: e.target.value }))}>
                  <option>Active</option><option>Inactive</option>
                </select>
              </div>
            </div>
            <div style={{ display: 'flex', gap: 10, marginTop: 24, justifyContent: 'flex-end' }}>
              <button onClick={() => setShowModal(false)} style={{ padding: '8px 20px', borderRadius: 8, border: '1px solid #e5e7eb', background: '#fff', color: '#374151', fontSize: 13, cursor: 'pointer' }}>Cancel</button>
              <button onClick={handleAdd} style={{ padding: '8px 20px', borderRadius: 8, border: 'none', background: '#3b5bdb', color: '#fff', fontSize: 13, fontWeight: 700, cursor: 'pointer' }}>Add</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
