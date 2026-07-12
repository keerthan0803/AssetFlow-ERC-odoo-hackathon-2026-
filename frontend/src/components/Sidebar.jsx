import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { clearAuthSession, getAuthRole, getAuthUserName } from '../lib/authSession';

const NAV_ITEMS = [
  { label: 'Dashboard',             path: '/',                          icon: 'dashboard' },
  { label: 'Organization Setup',    path: '/organization/departments',   icon: 'corporate_fare' },
  { label: 'Assets',                path: '/assets',                     icon: 'inventory_2' },
  { label: 'Allocation & Transfer', path: '/allocation',               icon: 'swap_horiz' },
  { label: 'Resource Booking',      path: '/booking',                    icon: 'event_available' },
  { label: 'Maintenance',           path: '/maintenance',                icon: 'engineering' },
  { label: 'Audit',                 path: '/audit',                      icon: 'gavel' },
  { label: 'Reports',               path: '/reports',                    icon: 'bar_chart' },
  { label: 'Notifications',         path: '/notifications',              icon: 'notifications' },
];

export default function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    clearAuthSession();
    toast.success('Logged out successfully');
    navigate('/login');
  };

  const user = getAuthUserName();
  const role = getAuthRole();
  const roleLabel = role === 'ADMIN' ? 'Administrator' : 'Employee';

  const sidebarContent = (
    <div className="flex flex-col h-full bg-white border-r border-gray-100 shadow-sm font-sans w-64">
      {/* Logo Header */}
      <div className="p-6 border-b border-gray-50 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-white border border-gray-100 flex items-center justify-center shadow-sm flex-shrink-0 p-1">
            <img src="/logo.svg" className="w-full h-full object-contain" alt="AssetFlow Logo" />
          </div>
          <div>
            <div className="text-base font-extrabold text-gray-900 tracking-tight">AssetFlow</div>
            <div className="text-[10px] text-gray-400 font-bold tracking-wider uppercase">Enterprise EAM</div>
          </div>
        </div>
        {/* Close Button for mobile drawer */}
        <button 
          onClick={() => setIsOpen(false)}
          className="md:hidden p-1.5 rounded-lg hover:bg-gray-50 text-gray-400 hover:text-gray-700 transition-colors"
        >
          <span className="material-symbols-outlined text-lg">close</span>
        </button>
      </div>

      {/* Navigation List */}
      <nav className="flex-1 px-4 py-6 overflow-y-auto space-y-1 scrollbar-thin scrollbar-thumb-gray-200">
        {NAV_ITEMS.map(item => {
          const isActive = location.pathname === item.path || (item.path !== '/' && location.pathname.startsWith(item.path));
          return (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setIsOpen(false)}
              className={`flex items-center gap-3.5 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200 group ${
                isActive 
                  ? 'bg-indigo-50/50 text-indigo-600 border-l-4 border-indigo-600' 
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900 border-l-4 border-transparent'
              }`}
            >
              <span className={`material-symbols-outlined text-lg transition-transform duration-200 group-hover:scale-110 ${
                isActive ? 'text-indigo-600' : 'text-gray-400 group-hover:text-gray-600'
              }`}>
                {item.icon}
              </span>
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* User Footer Profile */}
      <div className="p-4 border-t border-gray-50 bg-gray-50/50">
        <div className="flex items-center gap-3 p-3 rounded-xl bg-white border border-gray-100 shadow-sm">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-600 to-purple-500 flex items-center justify-center text-white text-xs font-bold shadow-inner">
            {user[0]?.toUpperCase()}
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-xs font-bold text-gray-900 truncate">{user}</div>
            <div className="text-[10px] text-gray-400 font-medium uppercase tracking-wider">{roleLabel}</div>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="w-full mt-3 flex items-center justify-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold text-gray-500 hover:text-red-600 hover:bg-red-50/50 transition-all border border-transparent hover:border-red-100/30"
        >
          <span className="material-symbols-outlined text-sm">logout</span>
          Sign Out
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Floating Hamburger menu on Mobile/Tablets */}
      <div className="md:hidden fixed top-3 left-3 z-[60]">
        <button
          onClick={() => setIsOpen(true)}
          className="w-10 h-10 bg-white border border-gray-100 text-gray-700 rounded-xl shadow-md flex items-center justify-center hover:bg-gray-50 active:scale-95 transition-all"
        >
          <span className="material-symbols-outlined text-xl">menu</span>
        </button>
      </div>

      {/* Desktop Sidebar Layout */}
      <div className="hidden md:flex h-screen sticky top-0 flex-shrink-0 z-50">
        {sidebarContent}
      </div>

      {/* Mobile Drawer Overlay */}
      {isOpen && (
        <div className="md:hidden fixed inset-0 z-[100] flex">
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-gray-900/40 backdrop-blur-sm transition-opacity"
            onClick={() => setIsOpen(false)}
          />
          {/* Menu Drawer */}
          <div className="relative flex-1 flex flex-col max-w-xs w-full bg-white shadow-xl animate-slide-in">
            {sidebarContent}
          </div>
        </div>
      )}
    </>
  );
}
