import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

export default function Signup() {
  const navigate = useNavigate();
  const threeLoadedRef = useRef(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (threeLoadedRef.current) return;
    threeLoadedRef.current = true;

    const tryInit = () => {
      if (window.THREE) {
        // Small delay so the DOM is fully painted and container has real dimensions
        setTimeout(initThreeScene, 100);
      } else {
        const existing = document.querySelector('script[data-threejs]');
        if (existing) {
          existing.addEventListener('load', () => setTimeout(initThreeScene, 100));
          return;
        }
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js';
        script.async = true;
        script.setAttribute('data-threejs', 'true');
        script.onload = () => setTimeout(initThreeScene, 100);
        document.head.appendChild(script);
      }
    };
    tryInit();

    return () => {
      const c = document.getElementById('threejs-signup');
      if (c && c._cleanup) c._cleanup();
    };
  }, []);

  function initThreeScene() {
    const container = document.getElementById('threejs-signup');
    if (!container || !window.THREE) return;

    // Ensure no double-init
    if (container._initialized) return;
    container._initialized = true;

    const THREE = window.THREE;
    let animId;

    const w = container.clientWidth || window.innerWidth / 2;
    const h = container.clientHeight || window.innerHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, w / h, 0.1, 1000);
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(w, h);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Lights
    scene.add(new THREE.AmbientLight(0xffffff, 0.5));
    const pl1 = new THREE.PointLight(0x2563eb, 2);
    pl1.position.set(5, 5, 5);
    scene.add(pl1);
    const pl2 = new THREE.PointLight(0xb4c5ff, 0.8);
    pl2.position.set(-5, -3, 3);
    scene.add(pl2);

    // Geometry group
    const group = new THREE.Group();

    group.add(new THREE.Mesh(
      new THREE.BoxGeometry(2, 2, 2),
      new THREE.MeshPhongMaterial({ color: 0x2563eb, transparent: true, opacity: 0.2, shininess: 100 })
    ));
    group.add(new THREE.Mesh(
      new THREE.BoxGeometry(2.1, 2.1, 2.1),
      new THREE.MeshBasicMaterial({ color: 0x60a5fa, wireframe: true, transparent: true, opacity: 0.5 })
    ));

    for (let i = 0; i < 35; i++) {
      const s = new THREE.Mesh(
        new THREE.SphereGeometry(0.045, 8, 8),
        new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.7 })
      );
      s.position.set((Math.random() - 0.5) * 1.85, (Math.random() - 0.5) * 1.85, (Math.random() - 0.5) * 1.85);
      group.add(s);
    }

    const ringMat = (op) => new THREE.MeshPhongMaterial({ color: 0x2563eb, transparent: true, opacity: op });
    const ring1 = new THREE.Mesh(new THREE.TorusGeometry(2.4, 0.018, 16, 100), ringMat(0.4));
    const ring2 = new THREE.Mesh(new THREE.TorusGeometry(2.4, 0.018, 16, 100), ringMat(0.3));
    const ring3 = new THREE.Mesh(new THREE.TorusGeometry(3.0, 0.012, 16, 100), ringMat(0.2));
    ring1.rotation.x = Math.PI / 2;
    ring2.rotation.x = Math.PI / 4;
    ring3.rotation.y = Math.PI / 3;
    group.add(ring1, ring2, ring3);
    scene.add(group);

    let mx = 0, my = 0;
    const onMouse = (e) => {
      mx = (e.clientX / window.innerWidth - 0.5) * 0.4;
      my = (e.clientY / window.innerHeight - 0.5) * 0.4;
    };
    window.addEventListener('mousemove', onMouse);

    const animate = () => {
      animId = requestAnimationFrame(animate);
      group.rotation.y += 0.004;
      group.rotation.x += 0.002;
      group.position.x += (mx - group.position.x) * 0.04;
      group.position.y += (-my - group.position.y) * 0.04;
      ring1.rotation.z += 0.008;
      ring2.rotation.z -= 0.006;
      ring3.rotation.x += 0.003;
      renderer.render(scene, camera);
    };
    animate();

    const onResize = () => {
      const nw = container.clientWidth;
      const nh = container.clientHeight;
      if (!nw || !nh) return;
      camera.aspect = nw / nh;
      camera.updateProjectionMatrix();
      renderer.setSize(nw, nh);
    };
    window.addEventListener('resize', onResize);

    container._cleanup = () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', onMouse);
      window.removeEventListener('resize', onResize);
      renderer.dispose();
      if (container.contains(renderer.domElement)) container.removeChild(renderer.domElement);
      container._initialized = false;
    };
  }

  const handleSignup = (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    const name = data.get('full_name');
    const pw = data.get('password');
    const cpw = data.get('confirm_password');
    if (pw !== cpw) { toast.error('Passwords do not match!'); return; }
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
      toast.success(`Account initialized for ${name}! Redirecting…`);
      setTimeout(() => { localStorage.setItem('af_logged_in_user', name); navigate('/'); }, 1500);
    }, 1500);
  };

  const handleGoogleSignup = () => {
    localStorage.setItem('af_logged_in_user', 'Admin');
    toast.success('Account created via Google. Welcome!');
    navigate('/');
  };

  const inputStyle = {
    background: 'rgba(15,23,42,0.4)',
    border: '1px solid rgba(255,255,255,0.1)',
    color: '#e1e2ed',
    outline: 'none',
  };
  const inputFocus = (e) => {
    e.target.style.background = 'rgba(15,23,42,0.6)';
    e.target.style.borderColor = '#b4c5ff';
    e.target.style.boxShadow = '0 0 0 4px rgba(180,197,255,0.1)';
  };
  const inputBlur = (e) => {
    e.target.style.background = 'rgba(15,23,42,0.4)';
    e.target.style.borderColor = 'rgba(255,255,255,0.1)';
    e.target.style.boxShadow = 'none';
  };

  return (
    <div
      style={{ backgroundColor: '#11131b', color: '#e1e2ed', fontFamily: "'Inter', sans-serif", minHeight: '100vh', display: 'flex' }}
    >
      {/* ── Left: Registration Form (scrollable) ── */}
      <div
        style={{
          width: '100%',
          maxWidth: '660px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '40px 32px',
          overflowY: 'auto',
          minHeight: '100vh',
          position: 'relative',
          zIndex: 10,
        }}
        className="lg:max-w-[50%]"
      >
        <div style={{ width: '100%', maxWidth: '520px' }}>

          {/* Brand header — inside scrollable column, not fixed */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '32px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ width: '38px', height: '38px', borderRadius: '10px', backgroundColor: '#2563eb', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="#eeefff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/>
                </svg>
              </div>
              <span style={{ fontSize: '22px', fontWeight: 700, color: '#b4c5ff', letterSpacing: '-0.01em' }}>AssetFlow</span>
            </div>
            <Link to="/login" style={{ fontSize: '13px', color: '#c3c6d7', fontWeight: 500, whiteSpace: 'nowrap' }}>
              Have an account? <span style={{ color: '#b4c5ff', fontWeight: 700 }}>Sign In →</span>
            </Link>
          </div>

          {/* Glass form card */}
          <div style={{
            borderRadius: '16px',
            padding: '40px 40px',
            backdropFilter: 'blur(20px)',
            background: 'rgba(29, 31, 39, 0.7)',
            border: '1px solid rgba(255,255,255,0.08)',
            boxShadow: '0 24px 64px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.05)',
          }}>
            {/* Card heading */}
            <div style={{ textAlign: 'center', marginBottom: '32px' }}>
              <h1 style={{ fontSize: '28px', lineHeight: '36px', fontWeight: 700, color: '#e1e2ed', letterSpacing: '-0.01em', margin: 0 }}>
                Initialize Your Account
              </h1>
              <p style={{ fontFamily: "'Geist', 'Courier New', monospace", fontSize: '11px', letterSpacing: '0.1em', color: '#8d90a0', marginTop: '8px', textTransform: 'uppercase' }}>
                Global Asset Architecture
              </p>
            </div>

            <form style={{ display: 'flex', flexDirection: 'column', gap: '20px' }} onSubmit={handleSignup}>

              {/* Full Name */}
              <div>
                <label htmlFor="full_name" style={{ fontFamily: "'Geist', monospace", fontSize: '11px', letterSpacing: '0.08em', color: 'rgba(195,198,215,0.7)', textTransform: 'uppercase', display: 'block', marginBottom: '8px' }}>
                  Legal Full Name
                </label>
                <div style={{ position: 'relative' }}>
                  <svg style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="rgba(195,198,215,0.4)" strokeWidth="2">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
                  </svg>
                  <input id="full_name" name="full_name" type="text" placeholder="Alexander Vance" required
                    style={{ ...inputStyle, width: '100%', height: '52px', paddingLeft: '42px', paddingRight: '16px', borderRadius: '10px', fontSize: '15px', boxSizing: 'border-box' }}
                    onFocus={inputFocus} onBlur={inputBlur}
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" style={{ fontFamily: "'Geist', monospace", fontSize: '11px', letterSpacing: '0.08em', color: 'rgba(195,198,215,0.7)', textTransform: 'uppercase', display: 'block', marginBottom: '8px' }}>
                  Corporate Email
                </label>
                <div style={{ position: 'relative' }}>
                  <svg style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="rgba(195,198,215,0.4)" strokeWidth="2">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>
                  </svg>
                  <input id="email" name="email" type="email" placeholder="vance@assetflow.com" required
                    style={{ ...inputStyle, width: '100%', height: '52px', paddingLeft: '42px', paddingRight: '16px', borderRadius: '10px', fontSize: '15px', boxSizing: 'border-box' }}
                    onFocus={inputFocus} onBlur={inputBlur}
                  />
                </div>
              </div>

              {/* Password Row */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <label htmlFor="password" style={{ fontFamily: "'Geist', monospace", fontSize: '11px', letterSpacing: '0.08em', color: 'rgba(195,198,215,0.7)', textTransform: 'uppercase', display: 'block', marginBottom: '8px' }}>
                    Access Key
                  </label>
                  <div style={{ position: 'relative' }}>
                    <svg style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="rgba(195,198,215,0.4)" strokeWidth="2">
                      <rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                    </svg>
                    <input id="password" name="password" type="password" placeholder="••••••••" required
                      style={{ ...inputStyle, width: '100%', height: '52px', paddingLeft: '42px', paddingRight: '12px', borderRadius: '10px', fontSize: '15px', boxSizing: 'border-box' }}
                      onFocus={inputFocus} onBlur={inputBlur}
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="confirm_password" style={{ fontFamily: "'Geist', monospace", fontSize: '11px', letterSpacing: '0.08em', color: 'rgba(195,198,215,0.7)', textTransform: 'uppercase', display: 'block', marginBottom: '8px' }}>
                    Confirm Key
                  </label>
                  <div style={{ position: 'relative' }}>
                    <svg style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="rgba(195,198,215,0.4)" strokeWidth="2">
                      <path d="M9 12l2 2 4-4m6 2a9 9 0 1 1-18 0 9 9 0 0 1 18 0z"/>
                    </svg>
                    <input id="confirm_password" name="confirm_password" type="password" placeholder="••••••••" required
                      style={{ ...inputStyle, width: '100%', height: '52px', paddingLeft: '42px', paddingRight: '12px', borderRadius: '10px', fontSize: '15px', boxSizing: 'border-box' }}
                      onFocus={inputFocus} onBlur={inputBlur}
                    />
                  </div>
                </div>
              </div>

              {/* Terms */}
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', paddingTop: '4px' }}>
                <input id="terms" name="terms" type="checkbox" required
                  style={{ marginTop: '3px', width: '16px', height: '16px', accentColor: '#2563eb', cursor: 'pointer', flexShrink: 0 }}
                />
                <label htmlFor="terms" style={{ fontSize: '13px', color: '#c3c6d7', cursor: 'pointer', lineHeight: '1.5' }}>
                  I accept the <a href="#" style={{ color: '#b4c5ff' }}>Terms of Service</a> and <a href="#" style={{ color: '#b4c5ff' }}>Privacy Protocol</a>.
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={submitting || submitted}
                style={{
                  width: '100%',
                  height: '58px',
                  borderRadius: '12px',
                  border: 'none',
                  background: submitted ? '#10b981' : '#2563eb',
                  color: '#fff',
                  fontSize: '17px',
                  fontWeight: 600,
                  cursor: submitting || submitted ? 'not-allowed' : 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '10px',
                  boxShadow: '0 8px 24px rgba(37,99,235,0.3)',
                  transition: 'all 0.2s ease',
                  transform: 'scale(1)',
                }}
                onMouseEnter={e => { if (!submitting && !submitted) e.currentTarget.style.filter = 'brightness(1.1)'; }}
                onMouseLeave={e => { e.currentTarget.style.filter = 'none'; }}
              >
                {submitting ? (
                  <>
                    <svg style={{ animation: 'spin 1s linear infinite' }} viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21 12a9 9 0 1 1-6.219-8.56"/>
                    </svg>
                    Processing…
                  </>
                ) : submitted ? (
                  <>
                    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                    Initialized
                  </>
                ) : (
                  <>
                    Create Account
                    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
                  </>
                )}
              </button>
            </form>

            {/* Divider */}
            <div style={{ display: 'flex', alignItems: 'center', margin: '24px 0' }}>
              <div style={{ flex: 1, height: '1px', background: 'rgba(255,255,255,0.06)' }} />
              <span style={{ padding: '0 16px', fontFamily: "'Geist', monospace", fontSize: '11px', letterSpacing: '0.08em', color: 'rgba(195,198,215,0.4)', textTransform: 'uppercase' }}>
                Or Continue With
              </span>
              <div style={{ flex: 1, height: '1px', background: 'rgba(255,255,255,0.06)' }} />
            </div>

            {/* Google Button */}
            <button
              type="button"
              onClick={handleGoogleSignup}
              style={{ width: '100%', height: '50px', borderRadius: '10px', background: 'rgba(15,23,42,0.4)', border: '1px solid rgba(255,255,255,0.1)', color: '#e1e2ed', fontSize: '14px', fontWeight: 500, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', transition: 'all 0.2s' }}
              onMouseEnter={e => { e.currentTarget.style.background = 'rgba(15,23,42,0.7)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)'; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'rgba(15,23,42,0.4)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; }}
            >
              <svg viewBox="0 0 24 24" width="18" height="18">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Continue with Google
            </button>

            <div style={{ marginTop: '24px', paddingTop: '20px', borderTop: '1px solid rgba(255,255,255,0.05)', textAlign: 'center' }}>
              <p style={{ fontSize: '13px', color: '#8d90a0' }}>
                Already have an account?{' '}
                <Link to="/login" style={{ color: '#b4c5ff', fontWeight: 600 }}>Sign In</Link>
              </p>
            </div>
          </div>

          {/* Encrypted label (below card) */}
          <div style={{ textAlign: 'center', marginTop: '20px', fontFamily: "'Geist', monospace", fontSize: '11px', letterSpacing: '0.08em', color: 'rgba(141,144,160,0.4)', display: 'flex', justifyContent: 'center', gap: '24px' }}>
            <span>AES-256 ENCRYPTED</span>
            <span>V4.2.1-STABLE</span>
          </div>
        </div>
      </div>

      {/* ── Right: Immersive 3D Scene ── */}
      <div
        className="hidden lg:block"
        style={{ flex: 1, position: 'relative', backgroundColor: '#0c0e16', overflow: 'hidden', height: '100vh', minHeight: '100vh' }}
      >
        {/* Three.js canvas mount — explicit full dimensions */}
        <div
          id="threejs-signup"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', zIndex: 0 }}
        />

        {/* Branding overlay */}
        <div style={{
          position: 'relative', zIndex: 10,
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
          width: '100%', height: '100%', textAlign: 'center', padding: '48px',
          background: 'linear-gradient(to top, rgba(17,19,27,0.9) 0%, transparent 55%)',
          pointerEvents: 'none', userSelect: 'none',
        }}>
          <h2 style={{ fontSize: '48px', lineHeight: '56px', fontWeight: 700, letterSpacing: '-0.02em', color: '#e1e2ed', marginBottom: '20px' }}>
            Scale Your <br/>
            <span style={{ background: 'linear-gradient(to right, #b4c5ff, #b9c7e0)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              Enterprise Assets
            </span>
          </h2>
          <p style={{ color: 'rgba(195,198,215,0.75)', fontSize: '16px', maxWidth: '400px', lineHeight: '1.7' }}>
            Experience the next generation of asset management with high-fidelity, real-time data architecture.
          </p>

          {/* Status bar */}
          <div style={{
            position: 'absolute', bottom: '40px', left: '48px', right: '48px',
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            fontFamily: "'Geist', monospace", fontSize: '11px', letterSpacing: '0.08em', color: 'rgba(195,198,215,0.45)',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#b4c5ff', boxShadow: '0 0 8px rgba(180,197,255,0.5)' }} />
              NODE: ASHBURN-VA-01
            </div>
            <div style={{ display: 'flex', gap: '24px' }}>
              <span>AES-256 ENCRYPTED</span>
              <span>V4.2.1-STABLE</span>
            </div>
          </div>
        </div>

        {/* Radial glow */}
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 50% 40%, rgba(37,99,235,0.06), transparent 65%)', pointerEvents: 'none', zIndex: 1 }} />
      </div>

      {/* Mobile bottom nav */}
      <nav
        className="lg:hidden"
        style={{
          position: 'fixed', bottom: 0, left: 0, width: '100%', zIndex: 50,
          display: 'flex', justifyContent: 'space-around', alignItems: 'center', height: '72px',
          backdropFilter: 'blur(16px)', background: 'rgba(29,31,39,0.7)',
          borderTop: '1px solid rgba(255,255,255,0.06)',
        }}
      >
        <Link to="/login" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', color: 'rgba(195,198,215,0.5)', fontFamily: "'Geist', monospace", fontSize: '11px', textDecoration: 'none' }}>
          <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/><polyline points="10 17 15 12 10 7"/><line x1="15" y1="12" x2="3" y2="12"/></svg>
          Sign In
        </Link>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', color: '#b4c5ff', fontFamily: "'Geist', monospace", fontSize: '11px', fontWeight: 700 }}>
          <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><line x1="19" y1="8" x2="19" y2="14"/><line x1="22" y1="11" x2="16" y2="11"/></svg>
          Sign Up
        </div>
      </nav>

      <style>{`
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
}
