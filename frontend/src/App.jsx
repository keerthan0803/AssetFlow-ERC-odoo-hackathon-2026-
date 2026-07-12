import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

// Layouts
import AuthLayout from './layouts/AuthLayout';
import RequireAuth from './components/RequireAuth';

// Auth Pages
import Login from './pages/Auth/Login';
import Signup from './pages/Auth/Signup';

// Dashboard & AI Pages
import Dashboard from './pages/Dashboard/Dashboard';
import Assistant from './pages/Assistant/Assistant';
import AssetList from './pages/Assets/AssetList';
import AssetDetail from './pages/Assets/AssetDetail';
import Departments from './pages/Organization/Departments';
import Sustainability from './pages/Sustainability/Sustainability';
import Maintenance from './pages/Maintenance/Maintenance';
import Booking from './pages/Booking/Booking';
import Allocation from './pages/Allocation/Allocation';
import Audit from './pages/Audit/Audit';
import Reports from './pages/Reports/Reports';
import Notifications from './pages/Notifications/Notifications';

export default function App() {
  return (
    <Router>
      <Toaster 
        position="top-right"
        toastOptions={{
          style: {
            background: '#1e293b',
            color: '#f8fafc',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            borderRadius: '16px',
            fontSize: '13px',
          },
        }}
      />
      <Routes>
        {/* Auth Group */}
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Route>

        <Route element={<RequireAuth />}>
          {/* Command Center Dashboard */}
          <Route path="/" element={<Dashboard />} />

          {/* Assets Overview */}
          <Route path="/assets" element={<AssetList />} />
          <Route path="/assets/:id" element={<AssetDetail />} />

          {/* AI Assistant Feed */}
          <Route path="/assistant" element={<Assistant />} />

          {/* Organization Directory */}
          <Route path="/organization/departments" element={<Departments />} />

          {/* Maintenance Center */}
          <Route path="/maintenance" element={<Maintenance />} />

          {/* Sustainability Dashboard */}
          <Route path="/sustainability" element={<Sustainability />} />

          {/* Booking & Reservations */}
          <Route path="/booking" element={<Booking />} />

          {/* Allocation & Transfer */}
          <Route path="/allocation" element={<Allocation />} />

          {/* Asset Audit */}
          <Route path="/audit" element={<Audit />} />

          {/* Reports & Analytics */}
          <Route path="/reports" element={<Reports />} />

          {/* Notifications */}
          <Route path="/notifications" element={<Notifications />} />
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
}
