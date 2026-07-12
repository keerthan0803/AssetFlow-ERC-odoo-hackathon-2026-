import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

// Auth Pages
import Login from './pages/Auth/Login';
import Signup from './pages/Auth/Signup';

// App Pages
import Dashboard from './pages/Dashboard/Dashboard';
import Assistant from './pages/Assistant/Assistant';
import AssetList from './pages/Assets/AssetList';
import AssetDetail from './pages/Assets/AssetDetail';
import Departments from './pages/Organization/Departments';
import Sustainability from './pages/Sustainability/Sustainability';
import Maintenance from './pages/Maintenance/Maintenance';
import Booking from './pages/Booking/Booking';
import Audit from './pages/Audit/Audit';
import Allocation from './pages/Allocation/Allocation';
import Reports from './pages/Reports/Reports';
import Notifications from './pages/Notifications/Notifications';

// Layouts
import AuthLayout from './layouts/AuthLayout';

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

        {/* Dashboard */}
        <Route path="/" element={<Dashboard />} />

        {/* Assets */}
        <Route path="/assets" element={<AssetList />} />
        <Route path="/assets/:id" element={<AssetDetail />} />

        {/* Organization */}
        <Route path="/organization/departments" element={<Departments />} />

        {/* Allocation & Transfer */}
        <Route path="/allocation" element={<Allocation />} />

        {/* Resource Booking */}
        <Route path="/booking" element={<Booking />} />

        {/* Maintenance */}
        <Route path="/maintenance" element={<Maintenance />} />

        {/* Sustainability */}
        <Route path="/sustainability" element={<Sustainability />} />

        {/* Audit & Compliance */}
        <Route path="/audit" element={<Audit />} />

        {/* Reports */}
        <Route path="/reports" element={<Reports />} />

        {/* Notifications */}
        <Route path="/notifications" element={<Notifications />} />

        {/* AI Assistant */}
        <Route path="/assistant" element={<Assistant />} />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
}
