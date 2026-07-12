import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import toast from 'react-hot-toast';

export default function Assistant() {
  const navigate = useNavigate();
  const feedEndRef = useRef(null);
  const [inputText, setInputText] = useState('');
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'ai',
      text: "I'm Lumina, your technical asset assistant. I'm currently monitoring 12 active assets in your portfolio. Markets are volatile today; would you like a risk assessment or a specific tracking report?",
      title: "Good morning, Collector."
    },
    {
      id: 2,
      sender: 'user',
      text: "Show me the current risk distribution for my physical asset holdings in Western Europe."
    },
    {
      id: 3,
      sender: 'ai',
      text: "I've mapped your regional risk. Current exposure in the DACH region remains low, but maintenance cycles for three logistics hubs are approaching. Overall risk score: 14/100.",
      statusText: "Analyzing Spatial Data...",
      hasImage: true,
      imageSrc: "https://lh3.googleusercontent.com/aida-public/AB6AXuCvPbz1_LQ6cOIe7bhd-Yr_hCLHN3YIssjG_KxwVE5Sm9GQXK3CrLKIdZCdiuiIcX_X3CxZpufAoONrh_GOXsCS6lGep4aWdf9Jl6iTLwLvP5uTeAM7JhB-zK1kBZHBNM5sjie1ZM2jO2dYZ81ydBu99MBGVSAXXjwJqZ3_iXf5Gs27rIUKiLAWADLPCChTkImsOdj5MB11y6UzLFhQUvr-a0zpd6r1nFy6FAteIo6W4CeLIc6qCl3k"
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);

  // Authentication check
  useEffect(() => {
    const user = localStorage.getItem('af_logged_in_user');
    if (!user) {
      navigate('/login');
    }
  }, [navigate]);

  // Scroll to bottom of chat
  useEffect(() => {
    feedEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleLogout = () => {
    localStorage.removeItem('af_logged_in_user');
    toast.success('Successfully logged out.');
    navigate('/login');
  };

  const handleSend = (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const userText = inputText;
    setInputText('');

    // Append user message
    const userMsg = { id: Date.now(), sender: 'user', text: userText };
    setMessages(prev => [...prev, userMsg]);
    setIsTyping(true);

    // Simulate AI response stream
    setTimeout(() => {
      setIsTyping(false);
      let replyText = "I've verified your portfolio allocation ratios. Standard liquidity buffers are healthy, and no critical anomalies were registered.";
      
      if (userText.toLowerCase().includes('risk') || userText.toLowerCase().includes('report')) {
        replyText = "DACH region asset health is optimal (98.2% pulse). I recommend scheduling the upcoming logistics audits before Q4 begins to bypass bottleneck schedules.";
      } else if (userText.toLowerCase().includes('maintenance') || userText.toLowerCase().includes('hardware')) {
        replyText = "Maintenance logs indicate Zurich Alpha requires cooling subsystem upgrades. I have drafted an order ticket for execution.";
      }

      setMessages(prev => [...prev, {
        id: Date.now() + 1,
        sender: 'ai',
        text: replyText
      }]);
      toast.success('Lumina response compiled.');
    }, 1800);
  };

  const handlePromptClick = (label, detail) => {
    setInputText(`${label} (${detail})`);
    toast.success(`Prompt loaded: ${label}`);
  };

  return (
    <div 
      className="bg-background text-on-background font-body-lg overflow-hidden h-screen flex flex-col w-full"
      style={{ backgroundColor: '#11131b', color: '#e1e2ed', fontFamily: "'Inter', sans-serif" }}
    >
      <style>{`
        .glass {
          backdrop-filter: blur(12px);
          background: rgba(30, 41, 59, 0.5);
          border: 1px solid rgba(255, 255, 255, 0.05);
        }
        .glass-darker {
          backdrop-filter: blur(20px);
          background: rgba(15, 23, 42, 0.8);
          border: 1px solid rgba(255, 255, 255, 0.1);
        }
        .ai-glow {
          box-shadow: 0 0 20px rgba(180, 197, 255, 0.1);
          animation: pulse-glow 3s infinite ease-in-out;
        }
        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 15px rgba(180, 197, 255, 0.1); }
          50% { box-shadow: 0 0 30px rgba(180, 197, 255, 0.25); }
        }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      {/* Top Navigation Bar */}
      <header className="fixed top-0 w-full bg-surface/50 backdrop-blur-xl border-b border-white/5 shadow-sm flex justify-between items-center px-6 h-16 z-50">
        <div className="flex items-center gap-2">
          <span className="text-xl font-bold text-primary" style={{ color: '#b4c5ff' }}>AssetFlow</span>
        </div>
        <nav className="hidden md:flex items-center gap-6">
          <Link to="/" className="text-sm font-semibold text-on-surface-variant hover:text-primary transition-colors" style={{ color: '#c3c6d7' }}>Dashboard</Link>
          <Link to="/assets" className="text-sm font-semibold text-on-surface-variant hover:text-primary transition-colors" style={{ color: '#c3c6d7' }}>Assets</Link>
          <Link to="/booking" className="text-sm font-semibold text-on-surface-variant hover:text-primary transition-colors" style={{ color: '#c3c6d7' }}>Reservations</Link>
          <Link to="/assistant" className="text-sm font-semibold text-primary transition-colors" style={{ color: '#b4c5ff' }}>Assistant</Link>
          <Link to="/organization/departments" className="text-sm font-semibold text-on-surface-variant hover:text-primary transition-colors" style={{ color: '#c3c6d7' }}>Organization</Link>
          <Link to="/maintenance" className="text-sm font-semibold text-on-surface-variant hover:text-primary transition-colors" style={{ color: '#c3c6d7' }}>Maintenance</Link>
          <Link to="/sustainability" className="text-sm font-semibold text-on-surface-variant hover:text-primary transition-colors" style={{ color: '#c3c6d7' }}>Sustainability</Link>
          <Link to="/audit" className="text-sm font-semibold text-on-surface-variant hover:text-primary transition-colors" style={{ color: '#c3c6d7' }}>Audit</Link>
        </nav>
        <div className="flex items-center gap-4">
          <button className="p-2 rounded-full hover:bg-white/5 text-on-surface-variant transition-all">
            <span className="material-symbols-outlined text-lg">notifications</span>
          </button>
          <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center border border-primary/30" style={{ borderColor: 'rgba(180,197,255,0.3)' }}>
            <span className="material-symbols-outlined text-primary text-sm" style={{ color: '#b4c5ff' }}>person</span>
          </div>
        </div>
      </header>

      {/* Main Container Layout */}
      <main className="flex-1 pt-16 flex overflow-hidden w-full">
        
        {/* Sidebar Navigation */}
        <aside className="hidden md:flex flex-col h-full w-[280px] bg-surface-container-low/95 backdrop-blur-2xl border-r border-white/5 shadow-xl z-45">
          <div className="p-5 flex flex-col h-full text-left">
            <div className="mb-6">
              <button 
                onClick={() => {
                  setMessages([
                    {
                      id: Date.now(),
                      sender: 'ai',
                      text: "Conversation refreshed. I'm Lumina, ready to query and analyze your logistics indices.",
                      title: "Good morning, Collector."
                    }
                  ]);
                  toast.success('New conversation initialized.');
                }}
                className="w-full flex items-center justify-center gap-2 bg-primary text-on-primary font-bold py-3 rounded-xl transition-all active:scale-95 cursor-pointer"
                style={{ backgroundColor: '#b4c5ff', color: '#00174b' }}
              >
                <span className="material-symbols-outlined text-base">add</span>
                New Conversation
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto no-scrollbar space-y-1">
              <p className="text-xs font-semibold text-outline uppercase px-2 mb-3 tracking-widest" style={{ fontFamily: "'Geist', monospace", color: '#8d90a0' }}>
                Recent Queries
              </p>
              
              <button className="w-full text-left px-4 py-2.5 rounded-lg text-primary font-bold bg-primary/5 border-l-4 border-primary transition-all duration-300">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-base">insights</span>
                  <span className="truncate text-sm">Portfolio Risk Analysis</span>
                </div>
              </button>
              
              <button className="w-full text-left px-4 py-2.5 rounded-lg text-on-surface-variant hover:bg-white/5 transition-all text-sm">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-base">trending_up</span>
                  <span className="truncate">Yield Projection 2024</span>
                </div>
              </button>
              
              <button className="w-full text-left px-4 py-2.5 rounded-lg text-on-surface-variant hover:bg-white/5 transition-all text-sm">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-base">description</span>
                  <span className="truncate">Tax Report Generation</span>
                </div>
              </button>
              
              <button className="w-full text-left px-4 py-2.5 rounded-lg text-on-surface-variant hover:bg-white/5 transition-all text-sm">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-base">shield</span>
                  <span className="truncate">Asset Security Audit</span>
                </div>
              </button>
            </div>

            {/* Profile account footer */}
            <div className="mt-auto pt-6 border-t border-white/5 flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg overflow-hidden border border-white/10">
                <img 
                  className="w-full h-full object-cover" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuD2ZgfvOJWT141SJhyUKxULwU_F5aGixqgnqu8COtGx5-OwodIbwZkTC2TUJeqQjfksV-4UP0MkEs70RZQswbiG1en7JRjL226qXLsy51yZMUsO0AXW9kX19wr37jeCQqRkjp1fWiSK0smmaiAS7mFBYn887sndPjhzavYTP_pLTmoHUhnZLWG4uEfbGGWDf838kDTVgx5TysXPrsMx1MdJ_KvjUxWBUy0n_x-TJAsZh0TGQ-KkD8w0"
                  alt="User Avatar"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-bold text-on-surface">Premium Account</span>
                <span className="text-[10px] text-primary tracking-widest uppercase font-semibold" style={{ fontFamily: "'Geist', monospace", color: '#b4c5ff' }}>
                  Active
                </span>
              </div>
              <button 
                onClick={handleLogout}
                className="material-symbols-outlined ml-auto text-on-surface-variant hover:text-primary transition-colors cursor-pointer"
                title="Logout"
              >
                logout
              </button>
            </div>
          </div>
        </aside>

        {/* Main Chat Feed Area */}
        <section className="flex-1 relative flex flex-col overflow-hidden h-full">
          
          {/* Chat Feed Messages */}
          <div className="flex-1 overflow-y-auto px-6 py-8 space-y-6 no-scrollbar scroll-smooth">
            {messages.map((msg) => (
              <div 
                key={msg.id} 
                className={`max-w-3xl mx-auto flex gap-4 ${msg.sender === 'user' ? 'flex-row-reverse' : ''}`}
              >
                {/* Avatar Icon */}
                <div 
                  className={`w-10 h-10 rounded-full flex-shrink-0 flex items-center justify-center border ${
                    msg.sender === 'ai' 
                      ? 'bg-primary/20 border-primary/30 ai-glow' 
                      : 'bg-secondary/20 border-secondary/30'
                  }`}
                  style={{ 
                    borderColor: msg.sender === 'ai' ? 'rgba(180,197,255,0.3)' : 'rgba(190,198,224,0.3)',
                    color: msg.sender === 'ai' ? '#b4c5ff' : '#bec6e0'
                  }}
                >
                  <span className="material-symbols-outlined text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>
                    {msg.sender === 'ai' ? 'smart_toy' : 'person'}
                  </span>
                </div>

                {/* Message Bubble */}
                <div className="flex-1 space-y-3 text-left">
                  <div className={`p-5 rounded-2xl ${msg.sender === 'user' ? 'glass-darker rounded-tr-none max-w-md ml-auto' : 'glass rounded-tl-none'}`}>
                    {msg.title && (
                      <h2 className="text-sm font-bold text-primary mb-2" style={{ color: '#b4c5ff' }}>{msg.title}</h2>
                    )}
                    
                    {msg.statusText && (
                      <div className="flex items-center gap-2 mb-3 text-primary text-xs font-semibold uppercase tracking-wider" style={{ color: '#b4c5ff', fontFamily: "'Geist', monospace" }}>
                        <span className="material-symbols-outlined text-base animate-spin">sync</span>
                        {msg.statusText}
                      </div>
                    )}

                    {msg.hasImage && msg.imageSrc && (
                      <div className="w-full h-48 rounded-xl overflow-hidden mb-3 border border-white/10 bg-surface">
                        <img className="w-full h-full object-cover" src={msg.imageSrc} alt="Data visualization map" />
                      </div>
                    )}

                    <p className="text-sm leading-relaxed text-on-surface">{msg.text}</p>
                  </div>

                  {/* Render Quick Suggested Prompts (only for AI welcomes) */}
                  {msg.id === 1 && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
                      <button 
                        onClick={() => handlePromptClick('Asset tracking report', 'Current Q3 Performance')}
                        className="glass p-3.5 rounded-xl text-left hover:bg-white/10 transition-all border border-white/5 flex items-center gap-3 group cursor-pointer"
                      >
                        <span className="material-symbols-outlined text-primary group-hover:scale-110 transition-transform" style={{ color: '#b4c5ff' }}>analytics</span>
                        <div className="flex flex-col">
                          <span className="text-xs font-bold text-on-surface">Asset tracking report</span>
                          <span className="text-[10px] text-on-surface-variant font-medium mt-0.5" style={{ color: '#c3c6d7', fontFamily: "'Geist', monospace" }}>Current Q3 Performance</span>
                        </div>
                      </button>
                      
                      <button 
                        onClick={() => handlePromptClick('Maintenance schedule', 'Check hardware health')}
                        className="glass p-3.5 rounded-xl text-left hover:bg-white/10 transition-all border border-white/5 flex items-center gap-3 group cursor-pointer"
                      >
                        <span className="material-symbols-outlined text-primary group-hover:scale-110 transition-transform" style={{ color: '#b4c5ff' }}>engineering</span>
                        <div className="flex flex-col">
                          <span className="text-xs font-bold text-on-surface">Maintenance schedule</span>
                          <span className="text-[10px] text-on-surface-variant font-medium mt-0.5" style={{ color: '#c3c6d7', fontFamily: "'Geist', monospace" }}>Check hardware health</span>
                        </div>
                      </button>

                      <button 
                        onClick={() => handlePromptClick('Security audit', 'Review vault access logs')}
                        className="glass p-3.5 rounded-xl text-left hover:bg-white/10 transition-all border border-white/5 flex items-center gap-3 group cursor-pointer"
                      >
                        <span className="material-symbols-outlined text-primary group-hover:scale-110 transition-transform" style={{ color: '#b4c5ff' }}>security</span>
                        <div className="flex flex-col">
                          <span className="text-xs font-bold text-on-surface">Security audit</span>
                          <span className="text-[10px] text-on-surface-variant font-medium mt-0.5" style={{ color: '#c3c6d7', fontFamily: "'Geist', monospace" }}>Review vault access logs</span>
                        </div>
                      </button>

                      <button 
                        onClick={() => handlePromptClick('Rebalance portfolio', 'Optimal liquidity ratios')}
                        className="glass p-3.5 rounded-xl text-left hover:bg-white/10 transition-all border border-white/5 flex items-center gap-3 group cursor-pointer"
                      >
                        <span className="material-symbols-outlined text-primary group-hover:scale-110 transition-transform" style={{ color: '#b4c5ff' }}>balance</span>
                        <div className="flex flex-col">
                          <span className="text-xs font-bold text-on-surface">Rebalance portfolio</span>
                          <span className="text-[10px] text-on-surface-variant font-medium mt-0.5" style={{ color: '#c3c6d7', fontFamily: "'Geist', monospace" }}>Optimal liquidity ratios</span>
                        </div>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}

            {/* AI Typing Loading Animation Bubble */}
            {isTyping && (
              <div className="max-w-3xl mx-auto flex gap-4">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex-shrink-0 flex items-center justify-center border border-primary/30 ai-glow" style={{ borderColor: 'rgba(180,197,255,0.3)' }}>
                  <span className="material-symbols-outlined text-primary text-lg" style={{ color: '#b4c5ff' }}>smart_toy</span>
                </div>
                <div className="glass p-4 rounded-2xl rounded-tl-none flex items-center gap-1">
                  <div className="w-2.5 h-2.5 bg-primary/80 rounded-full animate-bounce" style={{ backgroundColor: '#b4c5ff' }} />
                  <div className="w-2.5 h-2.5 bg-primary/80 rounded-full animate-bounce [animation-delay:0.2s]" style={{ backgroundColor: '#b4c5ff' }} />
                  <div className="w-2.5 h-2.5 bg-primary/80 rounded-full animate-bounce [animation-delay:0.4s]" style={{ backgroundColor: '#b4c5ff' }} />
                </div>
              </div>
            )}

            <div ref={feedEndRef} />
          </div>

          {/* Chat Form Area */}
          <div className="px-6 pb-6 pt-2">
            <div className="max-w-3xl mx-auto relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-1000" />
              <form 
                onSubmit={handleSend}
                className="relative glass-darker rounded-2xl flex items-center px-5 py-3 border border-white/10"
              >
                <button 
                  type="button"
                  onClick={() => toast.success('Attachment select triggered (Demo mode)')}
                  className="p-2 text-on-surface-variant hover:text-primary transition-colors cursor-pointer"
                  style={{ color: '#c3c6d7' }}
                >
                  <span className="material-symbols-outlined text-lg">attach_file</span>
                </button>
                <input 
                  className="flex-1 bg-transparent border-none outline-none focus:ring-0 text-sm text-on-surface px-3 placeholder:text-on-surface-variant/40" 
                  id="chat-input" 
                  placeholder="Ask Lumina about your assets..." 
                  type="text"
                  value={inputText}
                  onChange={e => setInputText(e.target.value)}
                />
                <div className="flex items-center gap-3">
                  <button 
                    type="button"
                    onClick={() => toast.success('Voice dictation active… speak now')}
                    className="p-2 text-on-surface-variant hover:text-primary transition-colors cursor-pointer"
                    style={{ color: '#c3c6d7' }}
                  >
                    <span className="material-symbols-outlined text-lg">mic</span>
                  </button>
                  <button 
                    type="submit"
                    className="w-10 h-10 rounded-xl bg-primary text-on-primary flex items-center justify-center transition-all active:scale-90 hover:shadow-lg hover:shadow-primary/20 cursor-pointer" 
                    id="send-button"
                    style={{ backgroundColor: '#b4c5ff', color: '#00174b' }}
                  >
                    <span className="material-symbols-outlined text-base" style={{ fontVariationSettings: "'FILL' 1" }}>send</span>
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Mobile Bottom Navigation Bar */}
          <nav 
            className="md:hidden fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-4 pb-4 pt-2 bg-surface/80 backdrop-blur-2xl border-t border-white/10"
            style={{ backgroundColor: 'rgba(17,19,27,0.8)' }}
          >
            <Link 
              to="/"
              className="flex flex-col items-center justify-center px-3 py-1 rounded-xl transition-colors text-on-surface-variant"
            >
              <span className="material-symbols-outlined text-xl">dashboard</span>
              <span className="text-[10px] font-semibold" style={{ fontFamily: "'Geist', monospace" }}>Dashboard</span>
            </Link>
            <button 
              onClick={() => { toast.success('Displaying asset registries'); }}
              className="flex flex-col items-center justify-center px-3 py-1 rounded-xl transition-colors text-on-surface-variant cursor-pointer"
            >
              <span className="material-symbols-outlined text-xl">account_balance_wallet</span>
              <span className="text-[10px] font-semibold" style={{ fontFamily: "'Geist', monospace" }}>Assets</span>
            </button>
            <Link 
              to="/assistant"
              className="flex flex-col items-center justify-center px-3 py-1 rounded-xl transition-colors text-primary bg-primary/10"
              style={{ color: '#b4c5ff' }}
            >
              <span className="material-symbols-outlined text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>smart_toy</span>
              <span className="text-[10px] font-semibold" style={{ fontFamily: "'Geist', monospace" }}>Assistant</span>
            </Link>
            <button 
              onClick={() => { toast.success('QR tag scan initialized'); }}
              className="flex flex-col items-center justify-center px-3 py-1 rounded-xl transition-colors text-on-surface-variant cursor-pointer"
            >
              <span className="material-symbols-outlined text-xl">qr_code_scanner</span>
              <span className="text-[10px] font-semibold" style={{ fontFamily: "'Geist', monospace" }}>Scan</span>
            </button>
          </nav>
        </section>
      </main>
    </div>
  );
}
