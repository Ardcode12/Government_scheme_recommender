import React, { useState, useEffect, useRef } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import './home.css';

const Home = () => {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [isLoading, setIsLoading] = useState(true);
  const [terminalText, setTerminalText] = useState('');
  const [glitchEffect, setGlitchEffect] = useState(false);
  const [systemStatus, setSystemStatus] = useState('ONLINE');
  const [scrollProgress, setScrollProgress] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  // CRT Terminal Text Animation
  const terminalMessages = [
    'INITIALIZING GOVERNMENT SCHEMES PORTAL...',
    'LOADING CITIZEN DATABASE...',
    'CONNECTING TO SECURE SERVERS...',
    'SYSTEM READY. WELCOME TO GSP v2.0'
  ];

  // Navigation Items with CRT Style
  const navItems = [
    { id: 'dashboard', label: 'DASHBOARD', icon: '◆', sublabel: 'System Overview' },
    { id: 'schemes', label: 'SCHEMES', icon: '▣', sublabel: 'Active Programs' },
    { id: 'eligibility', label: 'ELIGIBILITY', icon: '▤', sublabel: 'Check Status' },
    { id: 'apply', label: 'APPLY', icon: '▥', sublabel: 'New Application' },
    { id: 'track', label: 'TRACK', icon: '▦', sublabel: 'Application Status' },
    { id: 'analytics', label: 'ANALYTICS', icon: '▧', sublabel: 'Data Insights' },
    { id: 'support', label: 'SUPPORT', icon: '▨', sublabel: 'Help Center' },
    { id: 'settings', label: 'SETTINGS', icon: '▩', sublabel: 'System Config' }
  ];

  // Scheme Categories for SIH Problem Statement
  const schemeCategories = [
    {
      id: 'agriculture',
      name: 'Agriculture & Farmers Welfare',
      schemes: 127,
      beneficiaries: '12.5M',
      icon: '🌾',
      color: '#00ff41',
      description: 'Supporting farmers with subsidies, insurance, and technology'
    },
    {
      id: 'education',
      name: 'Education & Skill Development',
      schemes: 89,
      beneficiaries: '45.2M',
      icon: '📚',
      color: '#00ffff',
      description: 'Scholarships, skill training, and educational infrastructure'
    },
    {
      id: 'healthcare',
      name: 'Healthcare & Wellness',
      schemes: 76,
      beneficiaries: '78.9M',
      icon: '🏥',
      color: '#ff00ff',
      description: 'Health insurance, medical facilities, and wellness programs'
    },
    {
      id: 'women',
      name: 'Women & Child Development',
      schemes: 94,
      beneficiaries: '34.7M',
      icon: '👩‍👧',
      color: '#ffff00',
      description: 'Empowerment programs, nutrition schemes, and safety initiatives'
    },
    {
      id: 'rural',
      name: 'Rural Development',
      schemes: 112,
      beneficiaries: '56.3M',
      icon: '🏘️',
      color: '#ff6b00',
      description: 'Infrastructure, employment, and rural connectivity'
    },
    {
      id: 'urban',
      name: 'Urban Development',
      schemes: 68,
      beneficiaries: '23.4M',
      icon: '🏙️',
      color: '#00ff9f',
      description: 'Smart cities, housing, and urban infrastructure'
    }
  ];

  // Featured Schemes Data
  const featuredSchemes = [
    {
      id: 1,
      name: 'PM-KISAN',
      fullName: 'Pradhan Mantri Kisan Samman Nidhi',
      category: 'Agriculture',
      benefits: '₹6,000 per year',
      eligibility: 'Small and marginal farmers',
      status: 'ACTIVE',
      priority: 'HIGH',
      lastUpdated: '2024-01-15'
    },
    {
      id: 2,
      name: 'PMJAY',
      fullName: 'Pradhan Mantri Jan Arogya Yojana',
      category: 'Healthcare',
      benefits: '₹5 lakh health coverage',
      eligibility: 'Bottom 40% of population',
      status: 'ACTIVE',
      priority: 'CRITICAL',
      lastUpdated: '2024-01-10'
    },
    {
      id: 3,
      name: 'PM-AWAS',
      fullName: 'Pradhan Mantri Awas Yojana',
      category: 'Housing',
      benefits: 'Housing subsidy up to ₹2.67 lakh',
      eligibility: 'EWS, LIG, MIG categories',
      status: 'ACTIVE',
      priority: 'HIGH',
      lastUpdated: '2024-01-12'
    }
  ];

  useEffect(() => {
    // Initialize AOS with custom settings
    AOS.init({
      duration: 1200,
      easing: 'ease-out-cubic',
      once: false,
      mirror: true,
      anchorPlacement: 'top-bottom',
    });

    // Terminal text animation
    let messageIndex = 0;
    let charIndex = 0;
    const typeWriter = setInterval(() => {
      if (messageIndex < terminalMessages.length) {
        if (charIndex < terminalMessages[messageIndex].length) {
          setTerminalText(prev => prev + terminalMessages[messageIndex][charIndex]);
          charIndex++;
        } else {
          if (messageIndex < terminalMessages.length - 1) {
            setTerminalText('');
            messageIndex++;
            charIndex = 0;
          } else {
            clearInterval(typeWriter);
            setTimeout(() => setIsLoading(false), 1000);
          }
        }
      }
    }, 50);

    // Scroll progress tracker
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      const currentProgress = (window.pageYOffset / totalScroll) * 100;
      setScrollProgress(currentProgress);

      // Random glitch effect
      if (Math.random() > 0.98) {
        setGlitchEffect(true);
        setTimeout(() => setGlitchEffect(false), 200);
      }
    };

    // Mouse tracking for effects
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    // System status simulator
    const statusInterval = setInterval(() => {
      const statuses = ['ONLINE', 'PROCESSING', 'SYNCING', 'READY'];
      setSystemStatus(statuses[Math.floor(Math.random() * statuses.length)]);
    }, 5000);

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      clearInterval(typeWriter);
      clearInterval(statusInterval);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // Loading Screen
  if (isLoading) {
    return (
      <div className="loading-screen crt-effect">
        <div className="scanlines"></div>
        <div className="terminal-loader">
          <div className="terminal-header">
            <span className="terminal-dot red"></span>
            <span className="terminal-dot yellow"></span>
            <span className="terminal-dot green"></span>
            <span className="terminal-title">GOVERNMENT SCHEMES PORTAL v2.0</span>
          </div>
          <div className="terminal-body">
            <p className="terminal-text">{terminalText}<span className="cursor">_</span></p>
            <div className="loading-bar">
              <div className="loading-progress"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`home-container crt-theme ${glitchEffect ? 'glitch' : ''}`}>
      {/* CRT Scanlines Overlay */}
      <div className="crt-overlay">
        <div className="scanlines"></div>
        <div className="noise"></div>
      </div>

      {/* Scroll Progress Bar */}
      <div className="scroll-progress-bar">
        <div className="progress-fill" style={{ width: `${scrollProgress}%` }}></div>
      </div>

      {/* CRT Side Navigation */}
      <nav className="crt-side-nav">
        <div className="nav-header">
          <div className="logo-container">
            <div className="logo-glitch" data-text="GSP">GSP</div>
            <div className="logo-subtitle">GOV SCHEMES PORTAL</div>
          </div>
          <div className="system-status">
            <span className="status-dot"></span>
            <span className="status-text">{systemStatus}</span>
          </div>
        </div>

        <div className="nav-items">
          {navItems.map((item, index) => (
            <button
              key={item.id}
              className={`nav-item ${activeSection === item.id ? 'active' : ''}`}
              onClick={() => setActiveSection(item.id)}
              data-aos="fade-right"
              data-aos-delay={index * 100}
            >
              <span className="nav-icon">{item.icon}</span>
              <div className="nav-content">
                <span className="nav-label">{item.label}</span>
                <span className="nav-sublabel">{item.sublabel}</span>
              </div>
              <div className="nav-indicator"></div>
              {activeSection === item.id && <div className="nav-glow"></div>}
            </button>
          ))}
        </div>

        <div className="nav-footer">
          <div className="user-info">
            <div className="user-avatar">
              <span className="avatar-icon">◉</span>
            </div>
            <div className="user-details">
              <span className="user-name">GUEST USER</span>
              <span className="user-id">ID: 00000000</span>
            </div>
          </div>
          <button className="logout-btn">
            <span className="btn-icon">⏻</span>
            <span>LOGOUT</span>
          </button>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="main-content">
        {/* Hero Section */}
        <section className="hero-section crt-hero">
          <div className="matrix-rain"></div>
          
          <div className="hero-content" data-aos="fade-up">
            <h1 className="hero-title glitch-text" data-text="DIGITAL INDIA">
              DIGITAL INDIA
            </h1>
            <h2 className="hero-subtitle">
              Unified Government Schemes Portal
            </h2>
            <p className="hero-description">
              Access 500+ government schemes | Real-time eligibility check | Seamless application tracking
            </p>
            
            <div className="hero-search" data-aos="fade-up" data-aos-delay="200">
              <div className="search-container crt-style">
                <input
                  type="text"
                  className="search-input"
                  placeholder="Search schemes by name, category, or keyword..."
                />
                <button className="search-btn">
                  <span className="btn-text">SEARCH</span>
                  <span className="btn-icon">►</span>
                </button>
              </div>
            </div>

            <div className="quick-stats" data-aos="fade-up" data-aos-delay="300">
              <div className="stat-card">
                <div className="stat-value">500+</div>
                <div className="stat-label">Active Schemes</div>
              </div>
              <div className="stat-card">
                <div className="stat-value">25M+</div>
                <div className="stat-label">Beneficiaries</div>
              </div>
              <div className="stat-card">
                <div className="stat-value">100%</div>
                <div className="stat-label">Digital Process</div>
              </div>
              <div className="stat-card">
                <div className="stat-value">24/7</div>
                <div className="stat-label">Support</div>
              </div>
            </div>
          </div>

          <div className="hero-visual">
            <div className="hologram-display" data-aos="fade-left" data-aos-delay="400">
              <div className="hologram-content">
                <div className="data-visualization">
                  <canvas id="dataCanvas"></canvas>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Scheme Categories Grid */}
        <section className="categories-section">
          <div className="section-header" data-aos="fade-up">
            <h2 className="section-title crt-text">SCHEME CATEGORIES</h2>
            <div className="title-underline"></div>
          </div>

          <div className="categories-grid">
            {schemeCategories.map((category, index) => (
              <div
                key={category.id}
                className="category-card crt-card"
                data-aos="zoom-in"
                data-aos-delay={index * 100}
                style={{ '--accent-color': category.color }}
              >
                <div className="card-header">
                  <span className="category-icon">{category.icon}</span>
                  <div className="card-stats">
                    <span className="schemes-count">{category.schemes}</span>
                    <span className="schemes-label">SCHEMES</span>
                  </div>
                </div>
                <h3 className="category-name">{category.name}</h3>
                <p className="category-description">{category.description}</p>
                <div className="beneficiary-info">
                  <span className="info-icon">👥</span>
                  <span className="info-text">{category.beneficiaries} Beneficiaries</span>
                </div>
                <button className="explore-btn">
                  <span>EXPLORE</span>
                  <span className="btn-arrow">→</span>
                </button>
                <div className="card-glow"></div>
              </div>
            ))}
          </div>
        </section>

        {/* Featured Schemes Terminal */}
        <section className="featured-section">
          <div className="section-header" data-aos="fade-up">
            <h2 className="section-title crt-text">FEATURED SCHEMES</h2>
            <div className="title-underline"></div>
          </div>

          <div className="terminal-container" data-aos="fade-up" data-aos-delay="200">
            <div className="terminal-header">
              <div className="terminal-controls">
                <span className="control-btn minimize">_</span>
                <span className="control-btn maximize">□</span>
                <span className="control-btn close">×</span>
              </div>
              <span className="terminal-title">scheme_database.exe</span>
            </div>
            
            <div className="terminal-content">
              {featuredSchemes.map((scheme, index) => (
                <div
                  key={scheme.id}
                  className="scheme-entry"
                  data-aos="fade-right"
                  data-aos-delay={index * 150}
                >
                  <div className="scheme-header">
                    <span className="scheme-id">[{scheme.id.toString().padStart(3, '0')}]</span>
                    <span className="scheme-name">{scheme.name}</span>
                    <span className={`scheme-status ${scheme.priority.toLowerCase()}`}>
                      {scheme.priority}
                    </span>
                  </div>
                  <div className="scheme-details">
                    <div className="detail-row">
                      <span className="detail-label">FULL_NAME:</span>
                      <span className="detail-value">{scheme.fullName}</span>
                    </div>
                    <div className="detail-row">
                      <span className="detail-label">CATEGORY:</span>
                      <span className="detail-value">{scheme.category}</span>
                    </div>
                    <div className="detail-row">
                      <span className="detail-label">BENEFITS:</span>
                      <span className="detail-value">{scheme.benefits}</span>
                    </div>
                    <div className="detail-row">
                      <span className="detail-label">ELIGIBILITY:</span>
                      <span className="detail-value">{scheme.eligibility}</span>
                    </div>
                    <div className="detail-row">
                      <span className="detail-label">LAST_UPDATE:</span>
                      <span className="detail-value">{scheme.lastUpdated}</span>
                    </div>
                  </div>
                  <div className="scheme-actions">
                    <button className="action-btn apply">APPLY</button>
                    <button className="action-btn details">DETAILS</button>
                    <button className="action-btn check">CHECK ELIGIBILITY</button>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="terminal-footer">
              <span className="terminal-prompt">&gt; _</span>
            </div>
          </div>
        </section>

        {/* Interactive Dashboard */}
        <section className="dashboard-section">
          <div className="section-header" data-aos="fade-up">
            <h2 className="section-title crt-text">REAL-TIME ANALYTICS</h2>
            <div className="title-underline"></div>
          </div>

          <div className="dashboard-grid">
            <div className="dashboard-card large" data-aos="fade-up" data-aos-delay="100">
              <div className="card-header">
                <h3 className="card-title">APPLICATION FLOW</h3>
                <span className="live-indicator">● LIVE</span>
              </div>
              <div className="chart-container">
                <div className="flow-chart">
                  <div className="flow-item">
                    <div className="flow-number">2,456</div>
                    <div className="flow-label">New Applications</div>
                  </div>
                  <div className="flow-arrow">→</div>
                  <div className="flow-item">
                    <div className="flow-number">1,823</div>
                    <div className="flow-label">Under Review</div>
                  </div>
                  <div className="flow-arrow">→</div>
                  <div className="flow-item">
                    <div className="flow-number">1,567</div>
                    <div className="flow-label">Approved</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="dashboard-card" data-aos="fade-up" data-aos-delay="200">
              <div className="card-header">
                <h3 className="card-title">SCHEME PERFORMANCE</h3>
              </div>
              <div className="performance-list">
                <div className="performance-item">
                  <span className="item-name">PM-KISAN</span>
                  <div className="progress-bar">
                    <div className="progress" style={{ width: '87%' }}></div>
                  </div>
                  <span className="item-value">87%</span>
                </div>
                <div className="performance-item">
                  <span className="item-name">PMJAY</span>
                  <div className="progress-bar">
                    <div className="progress" style={{ width: '92%' }}></div>
                  </div>
                  <span className="item-value">92%</span>
                </div>
                <div className="performance-item">
                  <span className="item-name">PM-AWAS</span>
                  <div className="progress-bar">
                    <div className="progress" style={{ width: '78%' }}></div>
                  </div>
                  <span className="item-value">78%</span>
                </div>
              </div>
            </div>

            <div className="dashboard-card" data-aos="fade-up" data-aos-delay="300">
              <div className="card-header">
                <h3 className="card-title">SYSTEM HEALTH</h3>
              </div>
              <div className="system-metrics">
                <div className="metric">
                  <div className="metric-label">CPU</div>
                  <div className="metric-value">42%</div>
                  <div className="metric-bar">
                    <div className="bar-fill" style={{ width: '42%' }}></div>
                  </div>
                </div>
                <div className="metric">
                  <div className="metric-label">RAM</div>
                  <div className="metric-value">68%</div>
                  <div className="metric-bar">
                    <div className="bar-fill" style={{ width: '68%' }}></div>
                  </div>
                </div>
                <div className="metric">
                  <div className="metric-label">NETWORK</div>
                  <div className="metric-value">94%</div>
                  <div className="metric-bar">
                    <div className="bar-fill" style={{ width: '94%' }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* AI Assistant Section */}
        <section className="ai-assistant-section">
          <div className="section-header" data-aos="fade-up">
            <h2 className="section-title crt-text">AI-POWERED ASSISTANT</h2>
            <div className="title-underline"></div>
          </div>

          <div className="ai-container" data-aos="fade-up" data-aos-delay="200">
            <div className="ai-interface">
              <div className="ai-avatar">
                <div className="avatar-ring"></div>
                <div className="avatar-core">AI</div>
                <div className="avatar-pulse"></div>
              </div>
              
              <div className="ai-chat">
                <div className="chat-message system">
                  <span className="message-text">Hello! I'm your AI assistant. I can help you find suitable government schemes based on your profile.</span>
                </div>
                <div className="chat-input-container">
                  <input
                    type="text"
                    className="chat-input"
                    placeholder="Ask me about government schemes..."
                  />
                  <button className="send-btn">SEND</button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Floating Action Buttons */}
      <div className="fab-container">
        <button className="fab primary" data-aos="fade-left" data-aos-delay="500">
          <span className="fab-icon">+</span>
          <span className="fab-label">NEW APPLICATION</span>
        </button>
        <button className="fab secondary" data-aos="fade-left" data-aos-delay="600">
          <span className="fab-icon">?</span>
          <span className="fab-label">HELP</span>
        </button>
      </div>

      {/* Mouse Follower Effect */}
      <div 
        className="mouse-glow"
        style={{
          left: mousePosition.x + 'px',
          top: mousePosition.y + 'px'
        }}
      ></div>
    </div>
  );
};

export default Home;
