import { useState } from 'react';
import { Link } from 'react-router-dom';
import headerImage from '../img/header/head.jpeg';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '0.5rem' }}>
            <img
              src={headerImage}
              alt="CODE HUB"
              style={{ width: 32, height: 32, objectFit: 'contain', filter: 'drop-shadow(0 0 6px rgba(251,191,36,0.3))' }}
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
                const fallback = target.nextElementSibling as HTMLElement;
                if (fallback) fallback.style.display = 'block';
              }}
            />
            <svg width="32" height="32" viewBox="0 0 36 36" fill="none" style={{ display: 'none' }}>
              <rect x="2" y="2" width="32" height="32" rx="8" stroke="#FBBF24" strokeWidth="2" fill="none" />
              <path d="M10 10L18 26L26 10" stroke="#F472B6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <circle cx="18" cy="7" r="2.5" fill="#FBBF24" />
            </svg>
            <span style={{ fontFamily: 'Orbitron, sans-serif', fontSize: '1.15rem', fontWeight: 800, background: 'linear-gradient(135deg, #00D4FF, #7B2FFF)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              CODE HUB
            </span>
          </div>
          <p>Empowering the next generation of developers with cutting-edge courses in coding, AI, and web development.</p>
          <div className="footer-socials" style={{ marginTop: '1rem' }}>
            <a href="#" className="footer-social" title="GitHub">
              <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
            </a>
            <a href="#" className="footer-social" title="LinkedIn">
              <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
            </a>
            <a href="#" className="footer-social" title="Facebook">
              <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
            </a>
            <a href="#" className="footer-social" title="YouTube">
              <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
            </a>
          </div>
        </div>

        <div>
          <h4 className="footer-heading">Courses</h4>
          <ul className="footer-links">
            <li><Link to="/courses">Python Basics</Link></li>
            <li><Link to="/courses">Web Development</Link></li>
            <li><Link to="/courses">AI & Machine Learning</Link></li>
            <li><Link to="/courses">DevOps & Cloud</Link></li>
            <li><Link to="/courses">Cybersecurity</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="footer-heading">Company</h4>
          <ul className="footer-links">
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/projects">Projects</Link></li>
            <li><Link to="/blog">Blog</Link></li>
            <li><Link to="/contact">Contact</Link></li>
            <li><Link to="/enroll">Enroll Now</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="footer-heading">Resources</h4>
          <ul className="footer-links">
            <li><Link to="/ai-lab">AI Lab</Link></li>
            <li><Link to="/blog">Documentation</Link></li>
            <li><Link to="/projects">Open Source</Link></li>
            <li><Link to="/courses">Tutorials</Link></li>
            <li><Link to="/contact">Support</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="footer-heading">Newsletter</h4>
          <p style={{ color: '#52525B', fontSize: '0.82rem', marginBottom: '0.75rem', lineHeight: 1.5 }}>
            Stay updated with courses, projects, and tech insights.
          </p>
          <form className="footer-newsletter" onSubmit={handleSubscribe}>
            <input type="email" placeholder="your@email.com" value={email} onChange={e => setEmail(e.target.value)} required />
            <button type="submit">{subscribed ? '✓' : '→'}</button>
          </form>
        </div>
      </div>

      <div className="footer-bottom">
        <span className="footer-copyright">© 2025 CODE HUB. All rights reserved.</span>
        <div className="footer-legal">
          <a href="#">Privacy</a>
          <a href="#">Terms</a>
          <a href="#">Cookies</a>
        </div>
      </div>
    </footer>
  );
}
