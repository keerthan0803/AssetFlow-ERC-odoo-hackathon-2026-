import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const NAV_ITEMS = [
  { label: 'Dashboard',           path: '/',                        icon: 'grid_view' },
  { label: 'Organization Setup',  path: '/organization/departments', icon: 'corporate_fare' },
  { label: 'Assets',              path: '/assets',                   icon: 'inventory_2' },
  { label: 'Allocation & Transfer', path: '/allocation',             icon: 'swap_horiz' },
  { label: 'Resource Booking',    path: '/booking',                  icon: 'event_available' },
  { label: 'Maintenance',         path: '/maintenance',              icon: 'build' },
  { label: 'Audit',               path: '/audit',                    icon: 'shield_check' },
  { label: 'Reports',             path: '/reports',                  icon: 'bar_chart' },
  { label: 'Notifications',       path: '/notifications',            icon: 'notifications' },
];

export default function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('af_logged_in_user');
    toast.success('Logged out successfully');
    navigate('/login');
  };

  const user = localStorage.getItem('af_logged_in_user') || 'Admin';

  return (
    <aside style={{
      width: 240,
      minWidth: 240,
      height: '100vh',
      position: 'sticky',
      top: 0,
      backgroundColor: '#ffffff',
      borderRight: '1px solid #e5e7eb',
      display: 'flex',
      flexDirection: 'column',
      fontFamily: "'Inter', sans-serif",
      zIndex: 50,
    }}>
      {/* Logo */}
      <div style={{ padding: '20px 20px 16px', borderBottom: '1px solid #f3f4f6' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{
            width: 34, height: 34, borderRadius: 9,
            background: 'linear-gradient(135deg, #3b5bdb 0%, #845ef7 100%)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            flexShrink: 0,
          }}>
            <span className="material-symbols-outlined" style={{ color: '#fff', fontSize: 18, fontVariationSettings: "'FILL' 1" }}>inventory_2</span>
          </div>
          <div>
            <div style={{ fontSize: 15, fontWeight: 800, color: '#111827', letterSpacing: '-0.3px' }}>AssetFlow</div>
            <div style={{ fontSize: 10, color: '#9ca3af', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.08em' }}>Enterprise EAM</div>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav style={{ flex: 1, padding: '12px 10px', overflowY: 'auto' }}>
        {NAV_ITEMS.map(item => {
          const isActive = location.pathname === item.path || (item.path !== '/' && location.pathname.startsWith(item.path));
          return (
            <Link
              key={item.path}
              to={item.path}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                padding: '8px 12px',
                borderRadius: 8,
                marginBottom: 2,
                fontSize: 13,
                fontWeight: isActive ? 700 : 500,
                color: isActive ? '#3b5bdb' : '#374151',
                backgroundColor: isActive ? '#eff2ff' : 'transparent',
                textDecoration: 'none',
                transition: 'all 0.12s',
                borderLeft: isActive ? '3px solid #3b5bdb' : '3px solid transparent',
              }}
              onMouseEnter={e => { if (!isActive) { e.currentTarget.style.backgroundColor = '#f9fafb'; e.currentTarget.style.color = '#111827'; }}}
              onMouseLeave={e => { if (!isActive) { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = '#374151'; }}}
            >
              <span className="material-symbols-outlined" style={{ fontSize: 18, fontVariationSettings: isActive ? "'FILL' 1" : "'FILL' 0", flexShrink: 0 }}>
                {item.icon}
              </span>
              <span style={{ lineHeight: 1.2 }}>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* User footer */}
      <div style={{ borderTop: '1px solid #f3f4f6', padding: '12px 10px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 12px', borderRadius: 8, marginBottom: 4, backgroundColor: '#f9fafb' }}>
          <div style={{
            width: 32, height: 32, borderRadius: '50%',
            background: 'linear-gradient(135deg, #3b5bdb, #845ef7)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
          }}>
            <span style={{ color: '#fff', fontSize: 13, fontWeight: 700 }}>{user[0]?.toUpperCase()}</span>
          </div>
          <div style={{ flex: 1, overflow: 'hidden' }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: '#111827', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{user}</div>
            <div style={{ fontSize: 10, color: '#9ca3af', fontWeight: 500 }}>Administrator</div>
          </div>
        </div>
        <button
          onClick={handleLogout}
          style={{
            width: '100%', display: 'flex', alignItems: 'center', gap: 10,
            padding: '7px 12px', borderRadius: 8, border: 'none',
            backgroundColor: 'transparent', color: '#6b7280', fontSize: 12, fontWeight: 500,
            cursor: 'pointer', textAlign: 'left',
          }}
          onMouseEnter={e => { e.currentTarget.style.backgroundColor = '#fef2f2'; e.currentTarget.style.color = '#ef4444'; }}
          onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = '#6b7280'; }}
        >
          <span className="material-symbols-outlined" style={{ fontSize: 16 }}>logout</span>
          Sign Out
        </button>
      </div>
    </aside>
  );
}
