import { useState } from 'react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

const contactInfo = [
  { icon: '📧', label: 'Email', value: 'hello@codehub.dev' },
  { icon: '📱', label: 'Phone', value: '+880 1XXX-XXXXXX' },
  { icon: '📍', label: 'Location', value: 'Dhaka, Bangladesh' },
  { icon: '💬', label: 'Discord', value: 'CODE HUB Community' },
];

export default function Contact() {
  const [form, setForm] = useState<FormData>({ name: '', email: '', subject: '', message: '' });
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const sectionRef = useScrollAnimation();

  const validate = (): boolean => {
    const errs: FormErrors = {};
    if (!form.name.trim()) errs.name = 'Name is required';
    if (!form.email.trim()) errs.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = 'Invalid email format';
    if (!form.subject) errs.subject = 'Please select a subject';
    if (!form.message.trim()) errs.message = 'Message is required';
    else if (form.message.trim().length < 10) errs.message = 'Message must be at least 10 characters';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 4000);
      setForm({ name: '', email: '', subject: '', message: '' });
    }
  };

  const handleChange = (field: keyof FormData, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: undefined }));
  };

  return (
    <div ref={sectionRef}>
      <section className="page-hero">
        <div className="gradient-orb orb-cyan" style={{ width: 250, height: 250, top: '-5%', right: '15%' }} />
        <div style={{ position: 'relative', zIndex: 1 }}>
          <h1 className="scroll-animate" style={{ fontFamily: 'Orbitron', fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 900 }}>
            <span className="text-gradient">Get In Touch</span>
          </h1>
          <p className="scroll-animate" style={{ color: 'var(--text-muted)', fontSize: '1.1rem', marginTop: '0.75rem' }}>
            We'd love to hear from you. Let's start a conversation.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="contact-grid">
          <div className="scroll-animate">
            <h3 style={{ fontFamily: 'Orbitron', fontSize: '1.3rem', fontWeight: 700, color: 'var(--text)', marginBottom: '1.5rem' }}>
              Contact Information
            </h3>
            {contactInfo.map((info, i) => (
              <div key={i} className="contact-info-card">
                <div className="contact-icon">{info.icon}</div>
                <div>
                  <div className="contact-info-label">{info.label}</div>
                  <div className="contact-info-value">{info.value}</div>
                </div>
              </div>
            ))}

            <div style={{ marginTop: '2rem', padding: '2rem', borderRadius: 16, background: 'var(--glass-bg)', border: '1px solid var(--glass-border)', position: 'relative', overflow: 'hidden' }}>
              <svg width="100%" height="200" viewBox="0 0 400 200" style={{ opacity: 0.3 }}>
                <circle cx="200" cy="100" r="60" fill="none" stroke="var(--primary)" strokeWidth="1" opacity="0.5" />
                <circle cx="200" cy="100" r="90" fill="none" stroke="var(--secondary)" strokeWidth="0.5" opacity="0.3" />
                <circle cx="200" cy="100" r="30" fill="none" stroke="var(--primary)" strokeWidth="1.5" opacity="0.6" />
                <circle cx="200" cy="100" r="5" fill="var(--primary)" />
                {[0, 45, 90, 135, 180, 225, 270, 315].map(angle => {
                  const rad = (angle * Math.PI) / 180;
                  const x = 200 + 60 * Math.cos(rad);
                  const y = 100 + 60 * Math.sin(rad);
                  return <circle key={angle} cx={x} cy={y} r="3" fill="var(--secondary)" opacity="0.6" />;
                })}
                {[0, 60, 120, 180, 240, 300].map(angle => {
                  const rad = (angle * Math.PI) / 180;
                  const x = 200 + 90 * Math.cos(rad);
                  const y = 100 + 90 * Math.sin(rad);
                  return <circle key={angle} cx={x} cy={y} r="2" fill="var(--primary)" opacity="0.4" />;
                })}
              </svg>
            </div>
          </div>

          <div className="scroll-animate-left">
            <h3 style={{ fontFamily: 'Orbitron', fontSize: '1.3rem', fontWeight: 700, color: 'var(--text)', marginBottom: '1.5rem' }}>
              Send a Message
            </h3>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-label">Your Name</label>
                <input
                  className={`form-input ${errors.name ? 'error' : ''}`}
                  type="text"
                  placeholder="John Doe"
                  value={form.name}
                  onChange={e => handleChange('name', e.target.value)}
                />
                {errors.name && <div className="form-error">{errors.name}</div>}
              </div>

              <div className="form-group">
                <label className="form-label">Email Address</label>
                <input
                  className={`form-input ${errors.email ? 'error' : ''}`}
                  type="email"
                  placeholder="john@example.com"
                  value={form.email}
                  onChange={e => handleChange('email', e.target.value)}
                />
                {errors.email && <div className="form-error">{errors.email}</div>}
              </div>

              <div className="form-group">
                <label className="form-label">Subject</label>
                <select
                  className={`form-select ${errors.subject ? 'error' : ''}`}
                  value={form.subject}
                  onChange={e => handleChange('subject', e.target.value)}
                >
                  <option value="">Select a subject</option>
                  <option value="course">Course Inquiry</option>
                  <option value="support">Technical Support</option>
                  <option value="partnership">Partnership</option>
                  <option value="feedback">Feedback</option>
                  <option value="other">Other</option>
                </select>
                {errors.subject && <div className="form-error">{errors.subject}</div>}
              </div>

              <div className="form-group">
                <label className="form-label">Message</label>
                <textarea
                  className={`form-textarea ${errors.message ? 'error' : ''}`}
                  placeholder="Tell us how we can help..."
                  value={form.message}
                  onChange={e => handleChange('message', e.target.value)}
                />
                {errors.message && <div className="form-error">{errors.message}</div>}
              </div>

              <button type="submit" className="submit-btn pulse-glow">
                Send Message →
              </button>
            </form>
          </div>
        </div>
      </section>

      {submitted && (
        <div className="success-overlay" onClick={() => setSubmitted(false)}>
          <div className="success-content">
            <div className="success-check">✓</div>
            <div className="success-title">Message Sent!</div>
            <div className="success-text">We'll get back to you within 24 hours.</div>
          </div>
        </div>
      )}
    </div>
  );
}
