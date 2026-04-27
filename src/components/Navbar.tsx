import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import headerImage from '../img/header/head.jpeg';

const navItems = [
  { path: '/', label: 'Home' },
  { path: '/about', label: 'About' },
  { path: '/courses', label: 'Courses' },
  { path: '/projects', label: 'Projects' },
  { path: '/ai-lab', label: 'AI Lab' },
  { path: '/blog', label: 'Blog' },
  { path: '/contact', label: 'Contact' },
  { path: '/enroll', label: 'Enroll' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [theme, setTheme] = useState<'dark' | 'light'>(
    () => (localStorage.getItem('codehub-theme') as 'dark' | 'light') || 'dark'
  );
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('codehub-theme', theme);
  }, [theme]);

  useEffect(() => { setMobileOpen(false); }, [location]);

  const toggleTheme = () => setTheme(prev => prev === 'dark' ? 'light' : 'dark');

  return (
    <>
      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
        <div className="navbar-inner">
          <Link to="/" className="nav-logo">
            <img
              src={headerImage}
              alt="CODE HUB"
              style={{ width: 36, height: 36, objectFit: 'contain', filter: 'drop-shadow(0 0 8px var(--primary-glow))', transition: 'filter 0.3s' }}
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
                const fallback = target.nextElementSibling as HTMLElement;
                if (fallback) fallback.style.display = 'block';
              }}
            />
            <svg viewBox="0 0 36 36" fill="none" style={{ display: 'none', width: 36, height: 36, filter: 'drop-shadow(0 0 8px var(--primary-glow))' }}>
              <rect x="2" y="2" width="32" height="32" rx="8" stroke="var(--primary)" strokeWidth="2" fill="none" />
              <path d="M10 10L18 26L26 10" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <circle cx="18" cy="7" r="2.5" fill="var(--primary)" />
            </svg>
            <span className="nav-logo-text">CODE HUB</span>
          </Link>

          <ul className="nav-links">
            {navItems.map(item => (
              <li key={item.path}>
                <Link to={item.path} className={`nav-link ${location.pathname === item.path ? 'active' : ''}`}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="nav-actions">
            <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle theme">
              {theme === 'dark' ? '☀️' : '🌙'}
            </button>
            <button className={`mobile-menu-btn ${mobileOpen ? 'active' : ''}`} onClick={() => setMobileOpen(!mobileOpen)} aria-label="Menu">
              <span></span><span></span><span></span>
            </button>
          </div>
        </div>
      </nav>

      <div className={`mobile-overlay ${mobileOpen ? 'active' : ''}`}>
        {navItems.map(item => (
          <Link key={item.path} to={item.path} className="mobile-link" onClick={() => setMobileOpen(false)}>
            {item.label}
          </Link>
        ))}
      </div>
    </>
  );
}
