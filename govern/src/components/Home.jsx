import React, { useState, useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import './home.css';

const Home = () => {
  const [currentLang, setCurrentLang] = useState('en');
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeNavItem, setActiveNavItem] = useState('home');
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const languages = {
    en: { name: 'English', code: 'en' },
    hi: { name: 'हिंदी', code: 'hi' },
    ta: { name: 'தமிழ்', code: 'ta' },
    te: { name: 'తెలుగు', code: 'te' },
    bn: { name: 'বাংলা', code: 'bn' }
  };

  // Navigation items with icons
  const navItems = [
    { id: 'home', icon: '🏠', label: 'Home', href: '#home' },
    { id: 'schemes', icon: '📋', label: 'All Schemes', href: '#schemes' },
    { id: 'categories', icon: '📑', label: 'Categories', href: '#categories' },
    { id: 'eligibility', icon: '✅', label: 'Check Eligibility', href: '#eligibility' },
    { id: 'application', icon: '📝', label: 'Application Status', href: '#application' },
    { id: 'documents', icon: '📄', label: 'Documents', href: '#documents' },
    { id: 'faqs', icon: '❓', label: 'FAQs', href: '#faqs' },
    { id: 'contact', icon: '📞', label: 'Contact Us', href: '#contact' }
  ];

  // Sample government schemes data
  const schemesData = {
    en: [
      {
        id: 1,
        name: "PM Kisan Samman Nidhi",
        description: "Financial support to farmers with direct benefit transfer of ₹6000 per year",
        category: "Agriculture",
        benefits: ["₹6000 annual support", "Direct bank transfer", "Small & marginal farmers"],
        isNew: true,
        icon: "🌾",
        gradient: "gradient-1"
      },
      {
        id: 2,
        name: "Ayushman Bharat - PMJAY",
        description: "Health insurance coverage of ₹5 lakh per family per year for secondary and tertiary care",
        category: "Healthcare",
        benefits: ["₹5 lakh coverage", "1350+ medical packages", "Free treatment"],
        isNew: false,
        icon: "🏥",
        gradient: "gradient-2"
      },
      {
        id: 3,
        name: "PM Awas Yojana",
        description: "Affordable housing scheme providing financial assistance for house construction",
        category: "Housing",
        benefits: ["₹2.5 lakh subsidy", "Interest subsidy", "Affordable housing"],
        isNew: false,
        icon: "🏠",
        gradient: "gradient-3"
      }
    ],
    hi: [
      {
        id: 1,
        name: "पीएम किसान सम्मान निधि",
        description: "किसानों को ₹6000 प्रति वर्ष की प्रत्यक्ष वित्तीय सहायता",
        category: "कृषि",
        benefits: ["₹6000 वार्षिक सहायता", "सीधे बैंक हस्तांतरण", "छोटे और सीमांत किसान"],
        isNew: true,
        icon: "🌾",
        gradient: "gradient-1"
      },
      {
        id: 2,
        name: "आयुष्मान भारत - पीएमजेएवाई",
        description: "माध्यमिक और तृतीयक देखभाल के लिए प्रति परिवार प्रति वर्ष ₹5 लाख का स्वास्थ्य बीमा",
        category: "स्वास्थ्य सेवा",
        benefits: ["₹5 लाख कवरेज", "1350+ चिकित्सा पैकेज", "मुफ्त इलाज"],
        isNew: false,
        icon: "🏥",
        gradient: "gradient-2"
      },
      {
        id: 3,
        name: "पीएम आवास योजना",
        description: "घर निर्माण के लिए वित्तीय सहायता प्रदान करने वाली किफायती आवास योजना",
        category: "आवास",
        benefits: ["₹2.5 लाख सब्सिडी", "ब्याज सब्सिडी", "किफायती आवास"],
        isNew: false,
        icon: "🏠",
        gradient: "gradient-3"
      }
    ],
    ta: [
      {
        id: 1,
        name: "பிஎம் கிசான் சம்மான் நிதி",
        description: "விவசாயிகளுக்கு ஆண்டுக்கு ₹6000 நேரடி நிதி உதவி",
        category: "விவசாயம்",
        benefits: ["₹6000 ஆண்டு உதவி", "நேரடி வங்கி பரிமாற்றம்", "சிறு மற்றும் குறு விவசாயிகள்"],
        isNew: true,
        icon: "🌾",
        gradient: "gradient-1"
      },
      {
        id: 2,
        name: "ஆயுஷ்மான் பாரத் - பிஎம்ஜேஏஒய்",
        description: "இரண்டாம் நிலை மற்றும் மூன்றாம் நிலை சிகிச்சைக்கு குடும்பத்திற்கு ஆண்டுக்கு ₹5 லட்சம் சுகாதார காப்பீடு",
        category: "சுகாதாரம்",
        benefits: ["₹5 லட்சம் காப்பீடு", "1350+ மருத்துவ தொகுப்புகள்", "இலவச சிகிச்சை"],
        isNew: false,
        icon: "🏥",
        gradient: "gradient-2"
      },
      {
        id: 3,
        name: "பிஎம் ஆவாஸ் யோஜனா",
        description: "வீடு கட்டுவதற்கு நிதி உதவி வழங்கும் மலிவு விலை வீட்டு திட்டம்",
        category: "வீட்டுவசதி",
        benefits: ["₹2.5 லட்சம் மானியம்", "வட்டி மானியம்", "மலிவு விலை வீடு"],
        isNew: false,
        icon: "🏠",
        gradient: "gradient-3"
      }
    ],
    te: [
      {
        id: 1,
        name: "పిఎం కిసాన్ సమ్మాన్ నిధి",
        description: "రైతులకు సంవత్సరానికి ₹6000 ప్రత్యక్ష ఆర్థిక సహాయం",
        category: "వ్యవసాయం",
        benefits: ["₹6000 వార్షిక సహాయం", "నేరుగా బ్యాంక్ బదిలీ", "చిన్న మరియు సన్న రైతులు"],
        isNew: true,
        icon: "🌾",
        gradient: "gradient-1"
      },
      {
        id: 2,
        name: "ఆయుష్మాన్ భారత్ - పిఎంజెఏవై",
        description: "ద్వితీయ మరియు తృతీయ సంరక్షణ కోసం కుటుంబానికి సంవత్సరానికి ₹5 లక్షల ఆరోగ్య బీమా",
        category: "ఆరోగ్య సంరక్షణ",
        benefits: ["₹5 లక్షల కవరేజీ", "1350+ వైద్య ప్యాకేజీలు", "ఉచిత చికిత్స"],
        isNew: false,
        icon: "🏥",
        gradient: "gradient-2"
      }
    ],
    bn: [
      {
        id: 1,
        name: "পিএম কিষাণ সম্মান নিধি",
        description: "কৃষকদের বছরে ₹6000 সরাসরি আর্থিক সহায়তা",
        category: "কৃষি",
        benefits: ["₹6000 বার্ষিক সহায়তা", "সরাসরি ব্যাংক স্থানান্তর", "ক্ষুদ্র ও প্রান্তিক কৃষক"],
        isNew: true,
        icon: "🌾",
        gradient: "gradient-1"
      },
      {
        id: 2,
        name: "আয়ুষ্মান ভারত - পিএমজেএওয়াই",
        description: "দ্বিতীয় এবং তৃতীয় পর্যায়ের যত্নের জন্য পরিবার প্রতি বছরে ₹5 লক্ষ স্বাস্থ্য বীমা",
        category: "স্বাস্থ্যসেবা",
        benefits: ["₹5 লক্ষ কভারেজ", "1350+ চিকিৎসা প্যাকেজ", "বিনামূল্যে চিকিৎসা"],
        isNew: false,
        icon: "🏥",
        gradient: "gradient-2"
      }
    ]
  };

  const content = {
    en: {
      title: 'Government Schemes Portal',
      subtitle: 'Your Gateway to All Government Benefits',
      searchPlaceholder: 'Search for schemes...',
      categories: ['Education', 'Healthcare', 'Agriculture', 'Business', 'Women & Child', 'Senior Citizens'],
      stats: [
        { number: '500+', label: 'Active Schemes', icon: '📊' },
        { number: '10M+', label: 'Beneficiaries', icon: '👥' },
        { number: '24/7', label: 'Support', icon: '🚀' },
        { number: '100%', label: 'Free Service', icon: '✨' }
      ],
      buttons: {
        learnMore: 'Learn More',
        applyNow: 'Apply Now',
        viewAll: 'View All Schemes',
        login: 'Login'
      }
    },
    hi: {
      title: 'सरकारी योजना पोर्टल',
      subtitle: 'सभी सरकारी लाभों का आपका प्रवेश द्वार',
      searchPlaceholder: 'योजनाओं की खोज करें...',
      categories: ['शिक्षा', 'स्वास्थ्य सेवा', 'कृषि', 'व्यापार', 'महिला एवं बाल', 'वरिष्ठ नागरिक'],
      stats: [
        { number: '500+', label: 'सक्रिय योजनाएं', icon: '📊' },
        { number: '10M+', label: 'लाभार्थी', icon: '👥' },
        { number: '24/7', label: 'सहायता', icon: '🚀' },
        { number: '100%', label: 'मुफ्त सेवा', icon: '✨' }
      ],
      buttons: {
        learnMore: 'और जानें',
        applyNow: 'अभी आवेदन करें',
        viewAll: 'सभी योजनाएं देखें',
        login: 'लॉगिन'
      }
    },
    ta: {
      title: 'அரசு திட்டங்கள் போர்டல்',
      subtitle: 'அனைத்து அரசு நலன்களுக்கான உங்கள் நுழைவாயில்',
      searchPlaceholder: 'திட்டங்களைத் தேடுக...',
      categories: ['கல்வி', 'சுகாதாரம்', 'விவசாயம்', 'வணிகம்', 'பெண்கள் & குழந்தைகள்', 'மூத்த குடிமக்கள்'],
      stats: [
        { number: '500+', label: 'செயலில் உள்ள திட்டங்கள்', icon: '📊' },
        { number: '10M+', label: 'பயனாளிகள்', icon: '👥' },
        { number: '24/7', label: 'ஆதரவு', icon: '🚀' },
        { number: '100%', label: 'இலவச சேவை', icon: '✨' }
      ],
      buttons: {
        learnMore: 'மேலும் அறிக',
        applyNow: 'இப்போது விண்ணப்பிக்கவும்',
        viewAll: 'அனைத்து திட்டங்களையும் காண்க',
        login: 'உள்நுழைய'
      }
    },
    te: {
      title: 'ప్రభుత్వ పథకాల పోర్టల్',
      subtitle: 'అన్ని ప్రభుత్వ ప్రయోజనాలకు మీ గేట్‌వే',
      searchPlaceholder: 'పథకాల కోసం వెతకండి...',
      categories: ['విద్య', 'ఆరోగ్య సంరక్షణ', 'వ్యవసాయం', 'వ్యాపారం', 'మహిళలు & పిల్లలు', 'సీనియర్ పౌరులు'],
      stats: [
        { number: '500+', label: 'క్రియాశీల పథకాలు', icon: '📊' },
        { number: '10M+', label: 'లబ్ధిదారులు', icon: '👥' },
        { number: '24/7', label: 'మద్దతు', icon: '🚀' },
        { number: '100%', label: 'ఉచిత సేవ', icon: '✨' }
      ],
      buttons: {
        learnMore: 'మరింత తెలుసుకోండి',
        applyNow: 'ఇప్పుడు దరఖాస్తు చేసుకోండి',
        viewAll: 'అన్ని పథకాలను చూడండి',
        login: 'లాగిన్'
      }
    },
    bn: {
      title: 'সরকারি প্রকল্প পোর্টাল',
      subtitle: 'সমস্ত সরকারি সুবিধার জন্য আপনার প্রবেশদ্বার',
      searchPlaceholder: 'প্রকল্পগুলি অনুসন্ধান করুন...',
      categories: ['শিক্ষা', 'স্বাস্থ্যসেবা', 'কৃষি', 'ব্যবসা', 'মহিলা ও শিশু', 'প্রবীণ নাগরিক'],
      stats: [
        { number: '500+', label: 'সক্রিয় প্রকল্প', icon: '📊' },
        { number: '10M+', label: 'সুবিধাভোগী', icon: '👥' },
        { number: '24/7', label: 'সহায়তা', icon: '🚀' },
        { number: '100%', label: 'বিনামূল্যে সেবা', icon: '✨' }
      ],
      buttons: {
        learnMore: 'আরও জানুন',
        applyNow: 'এখন আবেদন করুন',
        viewAll: 'সমস্ত প্রকল্প দেখুন',
        login: 'লগইন'
      }
    }
  };

  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: false,
      mirror: true,
      anchorPlacement: 'top-bottom',
    });

    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const currentContent = content[currentLang];
  const currentSchemes = schemesData[currentLang] || schemesData['en'];

  return (
    <div className="home-container">
      {/* Mobile Top Navigation Bar */}
      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
        <div className="nav-container">
          <div className="nav-left">
            <button 
              className="nav-toggle mobile-only"
              onClick={() => setIsNavOpen(!isNavOpen)}
            >
              <span className={`toggle-icon ${isNavOpen ? 'open' : ''}`}>
                <span></span>
                <span></span>
                <span></span>
              </span>
            </button>
            <div className="nav-logo" data-aos="fade-right">
              <div className="logo-icon">
                <span>GS</span>
              </div>
              <span className="logo-text desktop-only">GovSchemes</span>
            </div>
          </div>

          <div className="nav-actions" data-aos="fade-left">
            <div className="language-selector mobile-compact">
              <select 
                value={currentLang} 
                onChange={(e) => setCurrentLang(e.target.value)}
                className="lang-dropdown"
              >
                {Object.entries(languages).map(([code, lang]) => (
                  <option key={code} value={code}>{code.toUpperCase()}</option>
                ))}
              </select>
            </div>

            <button className="login-btn mobile-icon-only">
              <svg className="login-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <span className="desktop-only">{currentContent.buttons.login}</span>
            </button>

            <button 
              className="mobile-menu-btn desktop-hidden"
              onClick={() => setShowMobileMenu(!showMobileMenu)}
            >
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Bottom Navigation */}
      <nav className="mobile-bottom-nav">
        <a href="#home" className={`bottom-nav-item ${activeNavItem === 'home' ? 'active' : ''}`} onClick={() => setActiveNavItem('home')}>
          <span className="nav-icon">🏠</span>
          <span className="nav-label">Home</span>
        </a>
        <a href="#schemes" className={`bottom-nav-item ${activeNavItem === 'schemes' ? 'active' : ''}`} onClick={() => setActiveNavItem('schemes')}>
          <span className="nav-icon">📋</span>
          <span className="nav-label">Schemes</span>
        </a>
        <a href="#eligibility" className={`bottom-nav-item ${activeNavItem === 'eligibility' ? 'active' : ''}`} onClick={() => setActiveNavItem('eligibility')}>
          <span className="nav-icon">✅</span>
          <span className="nav-label">Check</span>
        </a>
        <a href="#application" className={`bottom-nav-item ${activeNavItem === 'application' ? 'active' : ''}`} onClick={() => setActiveNavItem('application')}>
          <span className="nav-icon">📝</span>
          <span className="nav-label">Apply</span>
        </a>
      </nav>

      {/* Mobile Slide Menu */}
      <div className={`mobile-slide-menu ${showMobileMenu ? 'open' : ''}`}>
        <div className="slide-menu-header">
          <h3>Menu</h3>
          <button onClick={() => setShowMobileMenu(false)}>×</button>
        </div>
        <ul className="slide-menu-links">
          {navItems.map((item) => (
            <li key={item.id}>
              <a href={item.href} onClick={() => {
                setActiveNavItem(item.id);
                setShowMobileMenu(false);
              }}>
                <span className="nav-icon">{item.icon}</span>
                <span>{item.label}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>

      {/* Desktop Side Navigation */}
      <aside className={`side-nav desktop-only ${isNavOpen ? 'open' : 'closed'}`}>
        <div className="side-nav-content">
          <ul className="side-nav-links">
            {navItems.map((item, index) => (
              <li key={item.id}>
                <a 
                  href={item.href} 
                  className={`nav-link ${activeNavItem === item.id ? 'active' : ''}`}
                  onClick={() => setActiveNavItem(item.id)}
                  data-aos="fade-right" 
                  data-aos-delay={index * 50}
                >
                  <span className="nav-icon">{item.icon}</span>
                  <span className="nav-label">{item.label}</span>
                </a>
              </li>
            ))}
          </ul>

          <div className="nav-footer">
            <div className="nav-stats">
              <div className="stat-mini">
                <span className="stat-value">24/7</span>
                <span className="stat-label">Support</span>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className={`main-content ${isNavOpen ? 'nav-open' : 'nav-closed'}`}>
        {/* Hero Section */}
        <section className="hero">
          <div className="hero-background">
            <div className="gradient-overlay"></div>
            <div className="animated-shapes">
              <div className="shape shape-1" data-aos="zoom-in" data-aos-delay="200"></div>
              <div className="shape shape-2" data-aos="zoom-in" data-aos-delay="400"></div>
              <div className="shape shape-3" data-aos="zoom-in" data-aos-delay="600"></div>
            </div>
          </div>

          <div className="hero-content">
            <h1 className="hero-title" data-aos="fade-up" data-aos-delay="100">
              {currentContent.title}
            </h1>
            <p className="hero-subtitle" data-aos="fade-up" data-aos-delay="200">
              {currentContent.subtitle}
            </p>

            <div className="search-container" data-aos="fade-up" data-aos-delay="300">
              <input 
                type="text" 
                placeholder={currentContent.searchPlaceholder}
                className="search-input"
              />
              <button className="search-btn">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </div>

            <div className="quick-filters" data-aos="fade-up" data-aos-delay="400">
              <button className="filter-chip">Central Government</button>
              <button className="filter-chip">Tamil Nadu</button>
              <button className="filter-chip">New Schemes</button>
              <button className="filter-chip">Most Popular</button>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="stats-section">
          <div className="stats-container">
            {currentContent.stats.map((stat, index) => (
              <div 
                key={index} 
                className="stat-card"
                data-aos="flip-left"
                data-aos-delay={index * 100}
              >
                <div className="stat-icon">{stat.icon}</div>
                <h3 className="stat-number" data-aos="zoom-in" data-aos-delay={index * 100 + 200}>
                  {stat.number}
                </h3>
                <p className="stat-label">{stat.label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Categories Section */}
        <section className="categories-section">
          <h2 className="section-title" data-aos="fade-up">Explore by Category</h2>
          <div className="categories-grid">
            {currentContent.categories.map((category, index) => (
              <div 
                key={index} 
                className="category-card"
                data-aos="fade-up"
                data-aos-delay={index * 100}
                data-aos-offset="100"
              >
                <div className="category-icon" data-aos="zoom-in" data-aos-delay={index * 100 + 200}>
                  <div className="icon-placeholder"></div>
                </div>
                <h3>{category}</h3>
                <p>Explore schemes</p>
              </div>
            ))}
          </div>
        </section>

        {/* Featured Schemes with Enhanced Cards */}
        <section className="featured-section">
          <h2 className="section-title" data-aos="fade-up">Featured Schemes</h2>
          <div className="schemes-carousel">
            {currentSchemes.slice(0, 3).map((scheme, index) => (
              <div 
                key={scheme.id} 
                className={`scheme-card premium-card ${scheme.gradient}`}
                data-aos="fade-up"
                data-aos-delay={index * 150}
                data-aos-offset="100"
              >
                <div className="card-glow"></div>
                <div className="card-content">
                  <div className="scheme-header">
                    <div className="scheme-icon-wrapper">
                      <span className="scheme-icon">{scheme.icon}</span>
                    </div>
                    {scheme.isNew && (
                      <span className="scheme-badge pulse" data-aos="zoom-in" data-aos-delay={index * 150 + 200}>
                        NEW
                      </span>
                    )}
                  </div>
                  
                  <h3 className="scheme-title">{scheme.name}</h3>
                  <p className="scheme-category">{scheme.category}</p>
                  <p className="scheme-description">{scheme.description}</p>
                  
                  <div className="scheme-benefits">
                    {scheme.benefits.map((benefit, idx) => (
                      <span 
                        key={idx} 
                        className="benefit-tag glass-effect" 
                        data-aos="fade-right" 
                        data-aos-delay={index * 150 + idx * 50}
                      >
                        <span className="benefit-dot"></span>
                        {benefit}
                      </span>
                    ))}
                  </div>
                  
                  <div className="scheme-footer">
                    <button className="learn-more-btn glass-btn">
                      <span>{currentContent.buttons.learnMore}</span>
                      <svg className="btn-arrow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                    <button className="apply-btn glow-btn">
                      <span>{currentContent.buttons.applyNow}</span>
                      <div className="btn-shine"></div>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="view-all-container" data-aos="fade-up" data-aos-delay="400">
            <button className="view-all-btn">
              {currentContent.buttons.viewAll}
              <svg className="arrow-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </button>
          </div>
        </section>
      </main>

      {/* Floating Action Button */}
      <div className="fab-container" data-aos="fade-up" data-aos-delay="1000">
        <button className="fab">
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Home;
