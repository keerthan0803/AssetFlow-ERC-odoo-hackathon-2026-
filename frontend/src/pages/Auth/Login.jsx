import React, { useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

export default function Login() {
  const navigate = useNavigate();
  const canvasRef = useRef(null);
  const threeLoadedRef = useRef(false);

  useEffect(() => {
    // Dynamically load Three.js from CDN
    if (threeLoadedRef.current) return;
    threeLoadedRef.current = true;

    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js';
    script.async = true;
    script.onload = () => initThreeScene();
    document.head.appendChild(script);

    return () => {
      // cleanup handled inside initThreeScene via cancelAnimationFrame
    };
  }, []);

  function initThreeScene() {
    const container = document.getElementById('threejs-login');
    if (!container || !window.THREE) return;

    const THREE = window.THREE;
    let animId;

    const width = container.clientWidth;
    const height = container.clientHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);
    const pointLight = new THREE.PointLight(0x2563eb, 2.5);
    pointLight.position.set(5, 5, 5);
    scene.add(pointLight);
    const secondaryLight = new THREE.PointLight(0xb4c5ff, 1);
    secondaryLight.position.set(-5, -5, 2);
    scene.add(secondaryLight);

    // Core group
    const group = new THREE.Group();

    const mainBoxMat = new THREE.MeshPhongMaterial({ color: 0x2563eb, transparent: true, opacity: 0.15, shininess: 120 });
    const mainBox = new THREE.Mesh(new THREE.BoxGeometry(2, 2, 2), mainBoxMat);
    group.add(mainBox);

    const wireframeMat = new THREE.MeshBasicMaterial({ color: 0x60a5fa, wireframe: true, transparent: true, opacity: 0.4 });
    const wireframe = new THREE.Mesh(new THREE.BoxGeometry(2.1, 2.1, 2.1), wireframeMat);
    group.add(wireframe);

    const particlesGroup = new THREE.Group();
    for (let i = 0; i < 40; i++) {
      const sphere = new THREE.Mesh(
        new THREE.SphereGeometry(0.04, 8, 8),
        new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.8 })
      );
      sphere.position.set((Math.random() - 0.5) * 1.9, (Math.random() - 0.5) * 1.9, (Math.random() - 0.5) * 1.9);
      particlesGroup.add(sphere);
    }
    group.add(particlesGroup);

    const ringMat = new THREE.MeshPhongMaterial({ color: 0x2563eb, transparent: true, opacity: 0.3 });
    const ring1 = new THREE.Mesh(new THREE.TorusGeometry(2.6, 0.015, 16, 100), ringMat);
    const ring2 = new THREE.Mesh(new THREE.TorusGeometry(2.6, 0.015, 16, 100), ringMat.clone());
    const ring3 = new THREE.Mesh(new THREE.TorusGeometry(2.6, 0.015, 16, 100), ringMat.clone());
    ring1.rotation.x = Math.PI / 3;
    ring2.rotation.x = -Math.PI / 4;
    ring2.rotation.y = Math.PI / 4;
    ring3.rotation.z = Math.PI / 2;
    group.add(ring1, ring2, ring3);
    scene.add(group);

    let mouseX = 0, mouseY = 0;
    const onMouseMove = (e) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 0.5;
      mouseY = (e.clientY / window.innerHeight - 0.5) * 0.5;
    };
    window.addEventListener('mousemove', onMouseMove);

    const animate = () => {
      animId = requestAnimationFrame(animate);
      group.rotation.y += 0.003;
      group.rotation.x += 0.001;
      group.position.x += (mouseX - group.position.x) * 0.05;
      group.position.y += (-mouseY - group.position.y) * 0.05;
      ring1.rotation.z += 0.005;
      ring2.rotation.z -= 0.007;
      ring3.rotation.x += 0.004;
      particlesGroup.children.forEach((p, i) => {
        p.position.y += Math.sin(Date.now() * 0.001 + i) * 0.002;
      });
      renderer.render(scene, camera);
    };
    animate();

    const onResize = () => {
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', onResize);

    // Cleanup
    container._cleanup = () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', onResize);
      renderer.dispose();
      if (container.contains(renderer.domElement)) container.removeChild(renderer.domElement);
    };
  }

  useEffect(() => {
    return () => {
      const container = document.getElementById('threejs-login');
      if (container && container._cleanup) container._cleanup();
    };
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    const email = data.get('email');
    const password = data.get('password');
    if (email === 'admin@assetflow.com' && password === 'admin123') {
      localStorage.setItem('af_logged_in_user', 'Admin');
      toast.success('Successfully logged in as Admin!');
      navigate('/');
    } else {
      toast.error('Invalid credentials. Use admin@assetflow.com / admin123');
    }
  };

  const handleGoogleLogin = () => {
    localStorage.setItem('af_logged_in_user', 'Admin');
    toast.success('Google Authentication matched! Welcome.');
    navigate('/');
  };

  const handleMicrosoftLogin = () => {
    localStorage.setItem('af_logged_in_user', 'Admin');
    toast.success('Microsoft SSO matched! Welcome.');
    navigate('/');
  };

  const handleDemoLogin = () => {
    localStorage.setItem('af_logged_in_user', 'Admin');
    toast.success('Demo bypass active — logged in as Administrator.');
    navigate('/');
  };

  return (
    <div
      className="min-h-screen flex flex-col md:flex-row overflow-hidden"
      style={{ backgroundColor: '#11131b', color: '#e1e2ed', fontFamily: "'Inter', sans-serif" }}
    >
      {/* ── Left: Sign-in Form ── */}
      <section
        className="w-full md:w-1/2 lg:w-[45%] xl:w-[40%] flex flex-col items-center justify-center relative z-10 px-6 py-12 md:py-0 overflow-y-auto"
        style={{ backgroundColor: '#11131b' }}
      >
        <div className="w-full max-w-md">
          {/* Brand */}
          <header className="flex items-center gap-3 mb-10">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#2563eb' }}>
              <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="#eeefff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="7" width="20" height="14" rx="2"/>
                <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
              </svg>
            </div>
            <span style={{ fontSize: '24px', lineHeight: '32px', fontWeight: 700, color: '#e1e2ed', letterSpacing: '-0.01em' }}>AssetFlow</span>
          </header>

          {/* Glass card */}
          <div
            className="rounded-xl p-8 md:p-10"
            style={{
              backdropFilter: 'blur(24px)',
              background: 'rgba(29, 31, 39, 0.6)',
              border: '1px solid rgba(141, 144, 160, 0.1)',
              boxShadow: '0 8px 32px 0 rgba(0,0,0,0.3)',
            }}
          >
            <div className="mb-8 text-center">
              <div
                className="w-14 h-14 rounded-xl mx-auto mb-5 flex items-center justify-center shadow-lg"
                style={{ backgroundColor: '#2563eb', border: '1px solid rgba(141,144,160,0.2)' }}
              >
                <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="#eeefff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/>
                </svg>
              </div>
              <h1 style={{ fontSize: '32px', lineHeight: '40px', fontWeight: 600, color: '#e1e2ed', letterSpacing: '-0.01em' }}>Welcome Back</h1>
              <p style={{ fontSize: '14px', color: '#c3c6d7', marginTop: '6px' }}>Access your decentralized asset portfolio</p>
            </div>

            {/* Form */}
            <form className="space-y-5" onSubmit={handleLogin}>
              <div className="space-y-1.5">
                <label htmlFor="email" style={{ fontSize: '12px', letterSpacing: '0.05em', fontWeight: 500, color: '#c3c6d7', textTransform: 'uppercase', display: 'block', fontFamily: "'Geist', monospace" }}>
                  Email Address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  defaultValue="admin@assetflow.com"
                  placeholder="name@enterprise.com"
                  required
                  className="w-full rounded-lg px-4 py-3.5 transition-all"
                  style={{
                    background: '#0c0e16',
                    border: '1px solid #434655',
                    color: '#e1e2ed',
                    fontSize: '16px',
                    outline: 'none',
                  }}
                  onFocus={e => { e.target.style.borderColor = '#2563eb'; e.target.style.boxShadow = '0 0 0 2px rgba(37,99,235,0.2)'; }}
                  onBlur={e => { e.target.style.borderColor = '#434655'; e.target.style.boxShadow = 'none'; }}
                />
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between items-center">
                  <label htmlFor="password" style={{ fontSize: '12px', letterSpacing: '0.05em', fontWeight: 500, color: '#c3c6d7', textTransform: 'uppercase', fontFamily: "'Geist', monospace" }}>
                    Password
                  </label>
                  <Link to="/forgot-password" style={{ fontSize: '12px', color: '#2563eb', fontWeight: 500 }}>
                    Forgot Password?
                  </Link>
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  defaultValue="admin123"
                  placeholder="••••••••"
                  required
                  className="w-full rounded-lg px-4 py-3.5 transition-all"
                  style={{
                    background: '#0c0e16',
                    border: '1px solid #434655',
                    color: '#e1e2ed',
                    fontSize: '16px',
                    outline: 'none',
                  }}
                  onFocus={e => { e.target.style.borderColor = '#2563eb'; e.target.style.boxShadow = '0 0 0 2px rgba(37,99,235,0.2)'; }}
                  onBlur={e => { e.target.style.borderColor = '#434655'; e.target.style.boxShadow = 'none'; }}
                />
              </div>

              <button
                type="submit"
                className="w-full rounded-lg py-4 transition-all hover:brightness-110 active:scale-[0.98]"
                style={{
                  backgroundColor: '#2563eb',
                  color: '#eeefff',
                  fontSize: '20px',
                  fontWeight: 600,
                  boxShadow: '0 8px 24px rgba(37,99,235,0.25)',
                }}
              >
                Sign In
              </button>
            </form>

            {/* Divider */}
            <div className="flex items-center w-full my-7">
              <div className="flex-grow h-px" style={{ background: 'rgba(67,70,85,0.4)' }} />
              <span className="px-4" style={{ fontSize: '12px', color: 'rgba(195,198,215,0.6)', fontFamily: "'Geist', monospace", letterSpacing: '0.05em' }}>
                OR CONTINUE WITH
              </span>
              <div className="flex-grow h-px" style={{ background: 'rgba(67,70,85,0.4)' }} />
            </div>

            {/* SSO Buttons */}
            <div className="grid grid-cols-2 gap-3 mb-6">
              <button
                type="button"
                onClick={handleGoogleLogin}
                className="flex items-center justify-center gap-2.5 py-3 px-4 rounded-lg transition-colors"
                style={{ background: '#1d1f27', border: '1px solid #434655', color: '#e1e2ed', fontSize: '14px' }}
                onMouseEnter={e => e.currentTarget.style.background = '#282a32'}
                onMouseLeave={e => e.currentTarget.style.background = '#1d1f27'}
              >
                <svg viewBox="0 0 24 24" width="18" height="18">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Google
              </button>
              <button
                type="button"
                onClick={handleMicrosoftLogin}
                className="flex items-center justify-center gap-2.5 py-3 px-4 rounded-lg transition-colors"
                style={{ background: '#1d1f27', border: '1px solid #434655', color: '#e1e2ed', fontSize: '14px' }}
                onMouseEnter={e => e.currentTarget.style.background = '#282a32'}
                onMouseLeave={e => e.currentTarget.style.background = '#1d1f27'}
              >
                <svg viewBox="0 0 24 24" width="18" height="18">
                  <path fill="#f25022" d="M11.4 11.4H0V0h11.4v11.4z"/>
                  <path fill="#7fba00" d="M24 11.4H12.6V0H24v11.4z"/>
                  <path fill="#00a4ef" d="M11.4 24H0V12.6h11.4V24z"/>
                  <path fill="#ffb900" d="M24 24H12.6V12.6H24V24z"/>
                </svg>
                Microsoft
              </button>
            </div>

            {/* Demo bypass */}
            <button
              type="button"
              onClick={handleDemoLogin}
              className="w-full rounded-lg py-3 text-sm font-semibold transition-all"
              style={{ background: 'rgba(37,99,235,0.08)', border: '1px dashed rgba(37,99,235,0.4)', color: '#b4c5ff' }}
              onMouseEnter={e => e.currentTarget.style.background = 'rgba(37,99,235,0.15)'}
              onMouseLeave={e => e.currentTarget.style.background = 'rgba(37,99,235,0.08)'}
            >
              ⚡ Quick Demo Bypass (Hackathon Mode)
            </button>

            <div className="mt-7 text-center" style={{ fontSize: '14px', color: '#c3c6d7' }}>
              New to AssetFlow?{' '}
              <Link to="/signup" style={{ color: '#2563eb', fontWeight: 700, marginLeft: '4px' }}
                onMouseEnter={e => e.target.style.textDecoration = 'underline'}
                onMouseLeave={e => e.target.style.textDecoration = 'none'}
              >
                Create an account
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Right: Three.js 3D Scene ── */}
      <section
        className="hidden md:flex flex-1 relative items-center justify-center overflow-hidden h-screen"
        style={{ backgroundColor: '#0c0e16', borderLeft: '1px solid rgba(67,70,85,0.1)' }}
      >
        <div id="threejs-login" className="absolute inset-0 z-0" />

        {/* Branding overlay */}
        <div className="relative z-10 text-center px-12 pointer-events-none select-none">
          <h2
            className="mb-6 drop-shadow-2xl"
            style={{ fontSize: '48px', lineHeight: '56px', fontWeight: 700, letterSpacing: '-0.02em', color: '#b4c5ff' }}
          >
            The Future of <br/>
            <span style={{ color: '#e1e2ed' }}>Asset Intelligence</span>
          </h2>
          <p style={{ color: '#c3c6d7', fontSize: '20px', fontWeight: 600, maxWidth: '32rem', margin: '0 auto', opacity: 0.8, lineHeight: '1.6' }}>
            Secure, autonomous, and scalable. Experience the next evolution in decentralized global asset architecture.
          </p>
        </div>

        {/* Bottom gradient */}
        <div
          className="absolute bottom-0 left-0 right-0 h-1/2 pointer-events-none"
          style={{ background: 'linear-gradient(to top, #11131b 0%, rgba(17,19,27,0.4) 60%, transparent 100%)', opacity: 0.8 }}
        />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(circle at 50% 50%, rgba(37,99,235,0.05), transparent 70%)' }}
        />

        {/* Bottom status bar */}
        <div className="absolute bottom-8 left-8 right-8 flex justify-between items-center z-10 pointer-events-none"
          style={{ fontFamily: "'Geist', monospace", fontSize: '12px', letterSpacing: '0.05em', color: 'rgba(195,198,215,0.5)' }}>
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full" style={{ background: '#b4c5ff', boxShadow: '0 0 8px rgba(180,197,255,0.5)' }} />
            NODE: ASHBURN-VA-01
          </div>
          <div className="flex gap-6">
            <span>AES-256 ENCRYPTED</span>
            <span>V4.2.1-STABLE</span>
          </div>
        </div>
      </section>

      {/* Mobile Bottom Nav */}
      <nav
        className="md:hidden fixed bottom-0 left-0 w-full z-50 flex justify-around items-center h-20 px-6"
        style={{ background: 'rgba(29,31,39,0.8)', backdropFilter: 'blur(16px)', borderTop: '1px solid rgba(67,70,85,0.1)' }}
      >
        <div className="flex flex-col items-center" style={{ color: '#2563eb', fontFamily: "'Geist', monospace", fontSize: '12px', fontWeight: 700 }}>
          <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/><polyline points="10 17 15 12 10 7"/><line x1="15" y1="12" x2="3" y2="12"/></svg>
          Sign In
        </div>
        <Link to="/signup" className="flex flex-col items-center" style={{ color: 'rgba(195,198,215,0.6)', fontFamily: "'Geist', monospace", fontSize: '12px' }}>
          <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><line x1="19" y1="8" x2="19" y2="14"/><line x1="22" y1="11" x2="16" y2="11"/></svg>
          Sign Up
        </Link>
      </nav>
    </div>
  );
}
