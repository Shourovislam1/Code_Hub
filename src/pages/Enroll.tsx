import { useState } from 'react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const courseOptions = [
  { name: 'Python Basics', cat: 'Python' },
  { name: 'Advanced Python', cat: 'Python' },
  { name: 'Data Analysis with Python', cat: 'Python' },
  { name: 'HTML/CSS Mastery', cat: 'Web Dev' },
  { name: 'JavaScript Pro', cat: 'Web Dev' },
  { name: 'React Fundamentals', cat: 'Web Dev' },
  { name: 'Backend with Laravel', cat: 'Web Dev' },
  { name: 'Full-Stack Development', cat: 'Web Dev' },
  { name: 'Machine Learning Basics', cat: 'AI/ML' },
  { name: 'Deep Learning', cat: 'AI/ML' },
  { name: 'AI Tools for Beginners', cat: 'AI/ML' },
  { name: 'NLP Fundamentals', cat: 'AI/ML' },
  { name: 'Microsoft Word Pro', cat: 'Office' },
  { name: 'Excel Advanced', cat: 'Office' },
  { name: 'PowerPoint Mastery', cat: 'Office' },
  { name: 'Linux Fundamentals', cat: 'DevOps' },
  { name: 'Docker & Containers', cat: 'DevOps' },
  { name: 'Git & GitHub', cat: 'DevOps' },
  { name: 'Ethical Hacking Basics', cat: 'Cybersecurity' },
  { name: 'Network Security', cat: 'Cybersecurity' },
];

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  experience: string;
  selectedCourses: string[];
  goals: string;
}

export default function Enroll() {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState<FormData>({
    firstName: '', lastName: '', email: '', phone: '', experience: '',
    selectedCourses: [], goals: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const sectionRef = useScrollAnimation();

  const toggleCourse = (course: string) => {
    setForm(prev => ({
      ...prev,
      selectedCourses: prev.selectedCourses.includes(course)
        ? prev.selectedCourses.filter(c => c !== course)
        : [...prev.selectedCourses, course],
    }));
  };

  const handleSubmit = () => {
    setSubmitted(true);
  };

  const canProceed = (s: number) => {
    if (s === 1) return form.firstName && form.lastName && form.email;
    if (s === 2) return form.selectedCourses.length > 0;
    return true;
  };

  if (submitted) {
    return (
      <div ref={sectionRef}>
        <section style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
          <div className="success-content" style={{ textAlign: 'center' }}>
            <div className="success-check" style={{ width: 100, height: 100, fontSize: '3rem', margin: '0 auto 1.5rem' }}>✓</div>
            <h2 style={{ fontFamily: 'Orbitron', fontSize: '2rem', color: 'var(--text)', marginBottom: '0.75rem' }}>
              Enrollment Successful!
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', marginBottom: '0.5rem' }}>
              Welcome to CODE HUB, {form.firstName}! 🎉
            </p>
            <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>
              You've enrolled in {form.selectedCourses.length} course{form.selectedCourses.length !== 1 ? 's' : ''}.
              Check your email for next steps.
            </p>
            <div className="enroll-summary" style={{ textAlign: 'left', maxWidth: 400, margin: '0 auto 2rem' }}>
              {form.selectedCourses.map((c, i) => (
                <div key={i} className="enroll-summary-item">
                  <span className="enroll-summary-label">Course {i + 1}</span>
                  <span className="enroll-summary-value">{c}</span>
                </div>
              ))}
            </div>
            <a href="/" className="btn-primary">Go to Home →</a>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div ref={sectionRef}>
      <section className="page-hero">
        <div className="gradient-orb orb-cyan" style={{ width: 250, height: 250, top: '-5%', right: '20%' }} />
        <div className="gradient-orb orb-violet" style={{ width: 200, height: 200, bottom: '-5%', left: '15%' }} />
        <div style={{ position: 'relative', zIndex: 1 }}>
          <h1 className="scroll-animate" style={{ fontFamily: 'Orbitron', fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 900 }}>
            <span className="text-gradient">Enroll Now</span>
          </h1>
          <p className="scroll-animate" style={{ color: 'var(--text-muted)', fontSize: '1.1rem', marginTop: '0.75rem' }}>
            Start your journey to becoming a world-class developer
          </p>
        </div>
      </section>

      <section className="section">
        <div className="enroll-container">
          {/* Progress Bar */}
          <div className="progress-bar scroll-animate">
            <div className="progress-step">
              <div className={`progress-circle ${step >= 1 ? 'active' : ''} ${step > 1 ? 'completed' : ''}`}>
                {step > 1 ? '✓' : '1'}
              </div>
            </div>
            <div className={`progress-line ${step > 1 ? 'active' : ''}`} />
            <div className="progress-step">
              <div className={`progress-circle ${step >= 2 ? 'active' : ''} ${step > 2 ? 'completed' : ''}`}>
                {step > 2 ? '✓' : '2'}
              </div>
            </div>
            <div className={`progress-line ${step > 2 ? 'active' : ''}`} />
            <div className="progress-step">
              <div className={`progress-circle ${step >= 3 ? 'active' : ''}`}>3</div>
            </div>
          </div>

          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
              Step {step} of 3 — {step === 1 ? 'Personal Information' : step === 2 ? 'Course Selection' : 'Review & Confirm'}
            </p>
          </div>

          {/* Step 1: Personal Info */}
          {step === 1 && (
            <div className="step-content glass-card" style={{ padding: '2.5rem' }}>
              <h3 style={{ fontFamily: 'Orbitron', fontSize: '1.2rem', color: 'var(--text)', marginBottom: '1.5rem' }}>
                Personal Information
              </h3>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div className="form-group">
                  <label className="form-label">First Name *</label>
                  <input className="form-input" placeholder="John" value={form.firstName} onChange={e => setForm(p => ({ ...p, firstName: e.target.value }))} />
                </div>
                <div className="form-group">
                  <label className="form-label">Last Name *</label>
                  <input className="form-input" placeholder="Doe" value={form.lastName} onChange={e => setForm(p => ({ ...p, lastName: e.target.value }))} />
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">Email Address *</label>
                <input className="form-input" type="email" placeholder="john@example.com" value={form.email} onChange={e => setForm(p => ({ ...p, email: e.target.value }))} />
              </div>
              <div className="form-group">
                <label className="form-label">Phone Number</label>
                <input className="form-input" placeholder="+880 1XXX-XXXXXX" value={form.phone} onChange={e => setForm(p => ({ ...p, phone: e.target.value }))} />
              </div>
              <div className="form-group">
                <label className="form-label">Programming Experience</label>
                <select className="form-select" value={form.experience} onChange={e => setForm(p => ({ ...p, experience: e.target.value }))}>
                  <option value="">Select your level</option>
                  <option value="beginner">Complete Beginner</option>
                  <option value="some">Some Experience</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="advanced">Advanced</option>
                </select>
              </div>
                <button
                  className="submit-btn pulse-glow"
                  disabled={!canProceed(1)}
                  onClick={() => setStep(2)}
                >
                  Next: Select Courses →
                </button>
            </div>
          )}

          {/* Step 2: Course Selection */}
          {step === 2 && (
            <div className="step-content glass-card" style={{ padding: '2.5rem' }}>
              <h3 style={{ fontFamily: 'Orbitron', fontSize: '1.2rem', color: 'var(--text)', marginBottom: '0.5rem' }}>
                Select Your Courses
              </h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
                Choose one or more courses to enroll in ({form.selectedCourses.length} selected)
              </p>
              <div className="course-option-grid">
                {courseOptions.map((course, i) => (
                  <div
                    key={i}
                    className={`course-option ${form.selectedCourses.includes(course.name) ? 'selected' : ''}`}
                    onClick={() => toggleCourse(course.name)}
                  >
                    <div className="course-option-name">{course.name}</div>
                    <div className="course-option-cat">{course.cat}</div>
                  </div>
                ))}
              </div>
              <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem' }}>
                <button className="btn-secondary" onClick={() => setStep(1)} style={{ flex: 1 }}>
                  ← Back
                </button>
                <button
                  className="submit-btn pulse-glow"
                  style={{ flex: 2 }}
                  disabled={!canProceed(2)}
                  onClick={() => setStep(3)}
                >
                  Next: Review →
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Confirm */}
          {step === 3 && (
            <div className="step-content glass-card" style={{ padding: '2.5rem' }}>
              <h3 style={{ fontFamily: 'Orbitron', fontSize: '1.2rem', color: 'var(--text)', marginBottom: '1.5rem' }}>
                Review & Confirm
              </h3>

              <div className="enroll-summary">
                <div style={{ fontFamily: 'Orbitron', fontSize: '0.85rem', color: 'var(--primary)', marginBottom: '0.75rem' }}>Personal Details</div>
                <div className="enroll-summary-item">
                  <span className="enroll-summary-label">Name</span>
                  <span className="enroll-summary-value">{form.firstName} {form.lastName}</span>
                </div>
                <div className="enroll-summary-item">
                  <span className="enroll-summary-label">Email</span>
                  <span className="enroll-summary-value">{form.email}</span>
                </div>
                {form.phone && (
                  <div className="enroll-summary-item">
                    <span className="enroll-summary-label">Phone</span>
                    <span className="enroll-summary-value">{form.phone}</span>
                  </div>
                )}
                {form.experience && (
                  <div className="enroll-summary-item">
                    <span className="enroll-summary-label">Experience</span>
                    <span className="enroll-summary-value" style={{ textTransform: 'capitalize' }}>{form.experience}</span>
                  </div>
                )}
              </div>

              <div className="enroll-summary">
                <div style={{ fontFamily: 'Orbitron', fontSize: '0.85rem', color: 'var(--primary)', marginBottom: '0.75rem' }}>Selected Courses ({form.selectedCourses.length})</div>
                {form.selectedCourses.map((course, i) => (
                  <div key={i} className="enroll-summary-item">
                    <span className="enroll-summary-label">Course {i + 1}</span>
                    <span className="enroll-summary-value">{course}</span>
                  </div>
                ))}
              </div>

              <div className="form-group">
                <label className="form-label">Learning Goals (optional)</label>
                <textarea
                  className="form-textarea"
                  placeholder="What do you hope to achieve?"
                  value={form.goals}
                  onChange={e => setForm(p => ({ ...p, goals: e.target.value }))}
                  style={{ minHeight: 100 }}
                />
              </div>

              <div style={{ display: 'flex', gap: '1rem' }}>
                <button className="btn-secondary" onClick={() => setStep(2)} style={{ flex: 1 }}>
                  ← Back
                </button>
                <button className="submit-btn pulse-glow" style={{ flex: 2 }} onClick={handleSubmit}>
                  Confirm Enrollment 🚀
                </button>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
