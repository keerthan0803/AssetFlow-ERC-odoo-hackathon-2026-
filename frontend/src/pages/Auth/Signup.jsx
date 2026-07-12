import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

export default function Signup() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const handleSignup = (e) => {
    e.preventDefault();
    toast.success('Organization Account Created successfully!');
    setTimeout(() => navigate('/login'), 1500);
  };

  return (
    <div className="min-h-screen flex w-full font-sans bg-gray-50">
      
      {/* Left Panel */}
      <div className="hidden lg:flex w-1/2 bg-[#0F172A] text-white flex-col justify-center px-12 xl:px-20 relative overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 z-0 opacity-40"
          style={{
            backgroundImage: 'url("/signup.png")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        {/* Dark Gradient Overlay for text readability */}
        <div className="absolute inset-0 z-0 bg-gradient-to-t from-[#0F172A] via-[#0F172A]/70 to-transparent pointer-events-none" />
        
        <div className="relative z-10 max-w-lg">
          <div className="mb-10 flex items-center gap-4">
            <div className="flex items-center justify-center">
              <img src="/favicon.jpg" alt="AssetFlow Logo" className="w-14 h-14 object-contain rounded-md" />
            </div>
            <div className="flex flex-col justify-center">
              <h1 className="text-4xl font-bold tracking-tight leading-none mb-2">AssetFlow</h1>
              <p className="text-slate-400 text-[15px] font-medium leading-none">Industrial Grade Enterprise Resource Planning</p>
            </div>
          </div>
          
          <div className="space-y-6">
            {/* Feature 1 */}
            <div className="bg-[#1E293B]/60 p-6 rounded-xl border border-slate-700/50 flex gap-5 backdrop-blur-sm">
              <div className="mt-1 flex-shrink-0 text-slate-300">
                <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/>
                  <polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/>
                  <line x1="12" y1="12" x2="16" y2="9.5"/><line x1="12" y1="12" x2="8" y2="9.5"/>
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-[17px] mb-1.5 text-slate-100">Centralized Inventory</h3>
                <p className="text-[14px] text-slate-400 leading-relaxed">Single source of truth for all physical and digital assets across multi-site operations.</p>
              </div>
            </div>
            
            {/* Feature 2 */}
            <div className="bg-[#1E293B]/60 p-6 rounded-xl border border-slate-700/50 flex gap-5 backdrop-blur-sm">
              <div className="mt-1 flex-shrink-0 text-slate-300">
                <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/>
                  <line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
                  <path d="M9 16l2 2 4-4"/>
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-[17px] mb-1.5 text-slate-100">Conflict-free Booking</h3>
                <p className="text-[14px] text-slate-400 leading-relaxed">Intelligent resource allocation preventing double-bookings and scheduling bottlenecks.</p>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="bg-[#1E293B]/60 p-6 rounded-xl border border-slate-700/50 flex gap-5 backdrop-blur-sm">
              <div className="mt-1 flex-shrink-0 text-slate-300">
                <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22v-4"/><path d="M12 8V2"/><path d="M4 12H2"/><path d="M22 12h-2"/>
                  <path d="M19.07 4.93l-1.41 1.41"/><path d="M6.34 17.66l-1.41 1.41"/>
                  <path d="M19.07 19.07l-1.41-1.41"/><path d="M6.34 6.34L4.93 4.93"/>
                  <path d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"/>
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-[17px] mb-1.5 text-slate-100">Automated Maintenance</h3>
                <p className="text-[14px] text-slate-400 leading-relaxed">Predictive lifecycle monitoring and automated service ticket generation.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Decorative watermark icon at bottom right */}
        <div className="absolute -bottom-16 -right-16 text-slate-800/40 pointer-events-none">
          <svg viewBox="0 0 24 24" width="300" height="300" fill="none" stroke="currentColor" strokeWidth="0.5">
            <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
          </svg>
        </div>
      </div>

      {/* Right Panel */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12">
        
        <div className="w-full max-w-xl bg-white p-8 sm:p-12 rounded-lg shadow-sm border border-gray-200">
          
          <div className="flex items-center gap-2 text-[11px] font-bold tracking-[0.15em] uppercase text-gray-800 mb-6">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="4" y="2" width="16" height="20" rx="2" ry="2"/>
              <line x1="9" y1="22" x2="15" y2="22"/><line x1="12" y1="18" x2="12" y2="22"/>
              <line x1="4" y1="14" x2="20" y2="14"/>
              <circle cx="9" cy="7" r="1"/><circle cx="15" cy="7" r="1"/>
              <circle cx="9" cy="11" r="1"/><circle cx="15" cy="11" r="1"/>
            </svg>
            Enterprise Onboarding
          </div>
          
          <h2 className="text-[32px] leading-tight font-bold text-gray-900 mb-3 tracking-tight">Create Organization Account</h2>
          <p className="text-gray-500 mb-8 text-[15px] leading-relaxed">
            Scale your operations with precision tracking and unified resource management.
          </p>

          <form className="space-y-5" onSubmit={handleSignup}>
            
            <div className="flex flex-col sm:flex-row gap-5">
              <div className="flex-1 space-y-1.5">
                <label className="text-[11px] font-semibold text-gray-600 uppercase tracking-wider">Full Name</label>
                <input required type="text" placeholder="e.g. Marcus Aurelius" 
                  className="w-full px-4 py-3 rounded-md border border-gray-200 text-[15px] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all" />
              </div>
              <div className="flex-1 space-y-1.5">
                <label className="text-[11px] font-semibold text-gray-600 uppercase tracking-wider">Corporate Email</label>
                <input required type="email" placeholder="m.aurelius@company.com" 
                  className="w-full px-4 py-3 rounded-md border border-gray-200 text-[15px] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all" />
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-5">
              <div className="flex-1 space-y-1.5">
                <label className="text-[11px] font-semibold text-gray-600 uppercase tracking-wider">Organization Name</label>
                <input required type="text" placeholder="AssetFlow Enterprise" 
                  className="w-full px-4 py-3 rounded-md border border-gray-200 text-[15px] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all" />
              </div>
              <div className="flex-1 space-y-1.5">
                <label className="text-[11px] font-semibold text-gray-600 uppercase tracking-wider">Department</label>
                <div className="relative">
                  <select required className="w-full px-4 py-3 rounded-md border border-gray-200 text-[15px] text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all appearance-none cursor-pointer pr-10">
                    <option value="">Select Department</option>
                    <option value="engineering">Engineering</option>
                    <option value="operations">Operations</option>
                    <option value="finance">Finance</option>
                    <option value="hr">Human Resources</option>
                  </select>
                  <svg className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="6 9 12 15 18 9"></polyline>
                  </svg>
                </div>
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex justify-between items-center">
                <label className="text-[11px] font-semibold text-gray-600 uppercase tracking-wider">Password</label>
                <span className="text-[11px] font-medium text-gray-400 tracking-wide">Strength: Empty</span>
              </div>
              <div className="relative">
                 <input required type={showPassword ? "text" : "password"} placeholder="••••••••••••" 
                   className="w-full px-4 py-3 rounded-md border border-gray-200 text-[15px] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all pr-12" />
                 <button type="button" onClick={() => setShowPassword(!showPassword)}
                   className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors">
                   {showPassword ? (
                     <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24M1 1l22 22"/></svg>
                   ) : (
                     <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                   )}
                 </button>
              </div>
            </div>

            <div className="flex items-start gap-3 pt-4 pb-2">
              <input required type="checkbox" id="terms" className="mt-1 w-4 h-4 rounded border-gray-300 text-black focus:ring-black cursor-pointer" />
              <label htmlFor="terms" className="text-[13px] text-gray-500 leading-relaxed cursor-pointer select-none">
                I agree to the <span className="text-gray-900 font-semibold hover:underline cursor-pointer">Terms of Service</span> and <span className="text-gray-900 font-semibold hover:underline cursor-pointer">Privacy Policy</span>. I understand that my data will be managed according to enterprise security standards.
              </label>
            </div>

            <button type="submit" className="w-full bg-black text-white py-3.5 rounded-md font-semibold text-[15px] hover:bg-gray-800 transition-colors flex justify-center items-center gap-2 mt-4 shadow-sm">
              Create Account 
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
            </button>

            <div className="text-center pt-5 text-[14px] text-gray-500 border-t border-gray-100 mt-6">
              Already have an account? <Link to="/login" className="text-gray-900 font-bold hover:underline ml-1">Sign In</Link>
            </div>
            
          </form>
        </div>
      </div>
      
    </div>
  );
}
