import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

export default function Login() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    toast.success('Successfully signed in!');
    setTimeout(() => navigate('/'), 1000);
  };

  return (
    <div className="min-h-screen flex w-full font-sans bg-gray-50">
      
      {/* Left Panel - Image with Overlay */}
      <div className="hidden lg:flex w-1/2 relative bg-[#0B132B] text-white flex-col justify-between p-12 overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 z-0 opacity-40"
          style={{
            backgroundImage: 'url("/login.png")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        {/* Dark Gradient Overlay for text readability */}
        <div className="absolute inset-0 z-0 bg-gradient-to-t from-[#0B132B] via-[#0B132B]/60 to-transparent pointer-events-none" />

        {/* Logo Section */}
        <div className="relative z-10 flex items-start gap-3">
          <div className="bg-black text-white p-2 rounded flex items-center justify-center shadow-lg border border-gray-800">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
              <line x1="16" y1="2" x2="16" y2="6"/>
              <line x1="8" y1="2" x2="8" y2="6"/>
              <line x1="3" y1="10" x2="21" y2="10"/>
            </svg>
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">AssetFlow</h1>
            <p className="text-xs font-semibold text-gray-400 tracking-wider">Enterprise ERP</p>
          </div>
        </div>
        
        {/* Text Content */}
        <div className="relative z-10 max-w-md mb-20">
          <h2 className="text-4xl font-bold mb-6 leading-tight tracking-tight">
            Precision tracking for the modern enterprise.
          </h2>
          <p className="text-gray-400 text-[17px] leading-relaxed">
            Enterprise-grade asset management for modern organizations. Control lifecycle, maintenance, and logistics from a single, high-density interface.
          </p>
        </div>
      </div>

      {/* Right Panel - Login Form */}
      <div className="w-full lg:w-1/2 flex flex-col relative">
        
        {/* Main Content */}
        <div className="flex-1 flex items-center justify-center p-6 sm:p-12">
          <div className="w-full max-w-[460px] bg-white p-8 sm:p-12 rounded-lg shadow-sm border border-gray-200">
            
            <h2 className="text-[28px] font-bold text-gray-900 mb-2 tracking-tight">Sign In</h2>
            <p className="text-gray-500 mb-8 text-[15px]">
              Enter your corporate credentials to continue.
            </p>

            <form className="space-y-6" onSubmit={handleLogin}>
              
              {/* Email Field */}
              <div className="space-y-2">
                <label className="text-[11px] font-bold text-gray-600 uppercase tracking-widest font-mono">Work Email Address</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="2" y="4" width="20" height="16" rx="2" ry="2"/>
                      <path d="M2 4l10 8 10-8"/>
                    </svg>
                  </div>
                  <input required type="email" placeholder="name@company.com" 
                    className="w-full pl-10 pr-4 py-3 rounded-md border border-gray-200 text-[15px] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all bg-gray-50/50" />
                </div>
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <label className="text-[11px] font-bold text-gray-600 uppercase tracking-widest font-mono">Password</label>
                  <Link to="/forgot-password" className="text-[11px] font-bold text-gray-900 hover:underline font-mono">Forgot Password?</Link>
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                      <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                    </svg>
                  </div>
                  <input required type={showPassword ? "text" : "password"} placeholder="••••••••" 
                    className="w-full pl-10 pr-12 py-3 rounded-md border border-gray-200 text-[15px] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all bg-gray-50/50 tracking-widest" />
                  <button type="button" onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-gray-400 hover:text-gray-600 transition-colors">
                    {showPassword ? (
                      <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24M1 1l22 22"/></svg>
                    ) : (
                      <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                    )}
                  </button>
                </div>
              </div>

              {/* Keep me signed in */}
              <div className="flex items-center gap-2.5 pt-1 pb-2">
                <input type="checkbox" id="keep-signed-in" className="w-4 h-4 rounded border-gray-300 text-black focus:ring-black cursor-pointer" />
                <label htmlFor="keep-signed-in" className="text-[13px] text-gray-600 cursor-pointer select-none">
                  Keep me signed in for 30 days
                </label>
              </div>

              {/* Submit Button */}
              <button type="submit" className="w-full bg-black text-white py-3.5 rounded font-bold text-[14px] hover:bg-gray-800 transition-colors flex justify-center items-center gap-2 mt-4 shadow-sm tracking-wide font-mono">
                Sign In
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
              </button>

              <div className="text-center pt-6 text-[13px] text-gray-500 border-t border-gray-100 mt-8">
                New to AssetFlow? <Link to="/signup" className="text-gray-900 font-bold hover:underline ml-1">Create an account</Link>
              </div>
              
            </form>
          </div>
        </div>

        {/* Footer Links */}
        <div className="pb-8 pt-4 flex justify-center gap-6 text-[11px] font-mono tracking-widest text-gray-400 uppercase">
          <Link to="#" className="hover:text-gray-700 transition-colors">Privacy Policy</Link>
          <Link to="#" className="hover:text-gray-700 transition-colors">Terms of Service</Link>
          <Link to="#" className="hover:text-gray-700 transition-colors">System Status</Link>
        </div>
      </div>
      
    </div>
  );
}
