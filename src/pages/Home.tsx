import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useScrollAnimation, useCountUp } from '../hooks/useScrollAnimation';

const typewriterWords = ['Python', 'Web Dev', 'AI & ML', 'Cybersecurity', 'DevOps', 'Full-Stack'];

const featuredCourses = [
  { title: 'Python Basics', desc: 'Master Python from scratch with hands-on projects and real-world applications.', tag: 'Python', tagClass: 'tag-python', difficulty: 'Beginner', diffClass: 'difficulty-beginner', duration: '8 weeks', icon: '🐍', gradient: 'linear-gradient(135deg, #1E3A5F, #2563EB)' },
  { title: 'Advanced Python', desc: 'Deep dive into decorators, generators, async programming, and design patterns.', tag: 'Python', tagClass: 'tag-python', difficulty: 'Advanced', diffClass: 'difficulty-advanced', duration: '10 weeks', icon: '🔥', gradient: 'linear-gradient(135deg, #7C2A12, #DC2626)' },
  { title: 'HTML/CSS Mastery', desc: 'Build stunning, responsive websites with modern HTML5 and CSS3 techniques.', tag: 'Web Dev', tagClass: 'tag-webdev', difficulty: 'Beginner', diffClass: 'difficulty-beginner', duration: '6 weeks', icon: '🎨', gradient: 'linear-gradient(135deg, #713F12, #D97706)' },
  { title: 'React Fundamentals', desc: 'Component-based UI development with React hooks and state management.', tag: 'Web Dev', tagClass: 'tag-webdev', difficulty: 'Intermediate', diffClass: 'difficulty-intermediate', duration: '8 weeks', icon: '⚛️', gradient: 'linear-gradient(135deg, #164E63, #0891B2)' },
  { title: 'Machine Learning Basics', desc: 'Understand ML algorithms, data preprocessing, and model evaluation.', tag: 'AI/ML', tagClass: 'tag-ai', difficulty: 'Intermediate', diffClass: 'difficulty-intermediate', duration: '12 weeks', icon: '🧠', gradient: 'linear-gradient(135deg, #3B0764, #7C3AED)' },
  { title: 'Linux Fundamentals', desc: 'Command line mastery, system administration, and shell scripting.', tag: 'DevOps', tagClass: 'tag-devops', difficulty: 'Beginner', diffClass: 'difficulty-beginner', duration: '6 weeks', icon: '🐧', gradient: 'linear-gradient(135deg, #365314, #65A30D)' },
  { title: 'Ethical Hacking', desc: 'Penetration testing, vulnerability assessment, and security auditing.', tag: 'Cyber', tagClass: 'tag-cyber', difficulty: 'Intermediate', diffClass: 'difficulty-intermediate', duration: '10 weeks', icon: '🔒', gradient: 'linear-gradient(135deg, #4C0519, #E11D48)' },
  { title: 'Full-Stack Dev', desc: 'End-to-end web development from React frontend to backend APIs.', tag: 'Full-Stack', tagClass: 'tag-fullstack', difficulty: 'Advanced', diffClass: 'difficulty-advanced', duration: '16 weeks', icon: '🚀', gradient: 'linear-gradient(135deg, #064E3B, #059669)' },
];

const techItems1 = [
  { name: 'Python', icon: '🐍' }, { name: 'JavaScript', icon: 'JS' }, { name: 'React', icon: '⚛️' }, { name: 'Laravel', icon: '🔥' },
];

const techItems2 = [
  { name: 'Docker', icon: '🐳' }, { name: 'TensorFlow', icon: '🧠' }, { name: 'MySQL', icon: '🗃️' }, { name: 'Node.js', icon: '💚' },
];

const testimonials = [
  { name: 'Sarah Chen', initials: 'SC', role: 'Full-Stack Developer', quote: 'CODE HUB transformed my career. The project-based approach gave me real skills that landed me my dream job at a top tech company.', stars: 5 },
  { name: 'Ahmed Rahman', initials: 'AR', role: 'AI Engineer', quote: 'The AI/ML courses are exceptional. Hands-on projects with real datasets made complex concepts click in a way no other platform could.', stars: 5 },
  { name: 'Maria Santos', initials: 'MS', role: 'DevOps Engineer', quote: 'From zero to DevOps engineer in 6 months. The instructors are genuinely knowledgeable and the community support is incredible.', stars: 5 },
];

const features = [
  { icon: '👨‍🏫', title: 'Expert Mentors', desc: 'Learn from industry professionals with years of real-world experience.' },
  { icon: '🛠️', title: 'Project-Based', desc: 'Build real projects from day one. Portfolio-worthy work, not toy examples.' },
  { icon: '🤖', title: 'AI-Powered Tools', desc: 'Access cutting-edge AI tools to accelerate your learning journey.' },
  { icon: '💼', title: 'Job-Ready Skills', desc: 'Curriculum designed with industry input for the most in-demand skills.' },
  { icon: '👥', title: 'Community', desc: 'A vibrant community of learners, mentors, and coding challenges.' },
  { icon: '♾️', title: 'Lifetime Access', desc: 'Enroll once, learn forever. All updates included at no extra cost.' },
];

function StatCard({ target, label }: { target: number; label: string }) {
  const { count, ref } = useCountUp(target);
  return (
    <div className="stat-card stat-glow" ref={ref}>
      <div className="stat-number number-glow">{count}+</div>
      <div className="stat-label">{label}</div>
    </div>
  );
}

export default function Home() {
  const [wordIndex, setWordIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const sectionRef = useScrollAnimation();

  useEffect(() => {
    const word = typewriterWords[wordIndex];
    const speed = isDeleting ? 40 : 80;
    if (!isDeleting && charIndex === word.length) {
      setTimeout(() => setIsDeleting(true), 2200);
      return;
    }
    if (isDeleting && charIndex === 0) {
      setIsDeleting(false);
      setWordIndex(prev => (prev + 1) % typewriterWords.length);
      return;
    }
    const timer = setTimeout(() => setCharIndex(prev => isDeleting ? prev - 1 : prev + 1), speed);
    return () => clearTimeout(timer);
  }, [charIndex, isDeleting, wordIndex]);

  const currentWord = typewriterWords[wordIndex].slice(0, charIndex);

  return (
    <div ref={sectionRef}>
      {/* Hero */}
      <section className="hero">
        <div className="hero-bg">
          {[...Array(25)].map((_, i) => (
            <div
              key={i}
              className="hero-particle"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                '--dx': `${(Math.random() - 0.5) * 200}px`,
                '--dy': `${(Math.random() - 0.5) * 200}px`,
                animationDuration: `${Math.random() * 12 + 8}s`,
                animationDelay: `${Math.random() * 8}s`,
              } as React.CSSProperties}
            />
          ))}
        </div>

        <div className="hero-content">
          <div className="hero-eyebrow badge-glow">
            <span className="hero-eyebrow-dot">✦</span>
            Now Enrolling — Limited Spots
          </div>

          <h1 className="hero-title glow-heading">
            Master the Code.<br />
            <span className="shimmer-text">Shape the Future.</span>
          </h1>

          <div className="hero-typewriter-wrap">
            <span className="hero-typewriter-label">Learn</span>
            <span className="hero-typewriter">{currentWord}</span>
          </div>

          <p className="hero-subtitle glow-heading-soft">
            Expert-led courses in Python, Web Development, AI, Cybersecurity, and more.
            Build real projects. Launch your career.
          </p>

          <div className="hero-ctas">
            <Link to="/enroll" className="btn-primary pulse-glow">Start Learning →</Link>
            <Link to="/projects" className="btn-secondary glow-border">Explore Projects</Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="stats-section">
        <div className="stats-grid">
          <StatCard target={3} label="Expert Instructors" />
          <StatCard target={20} label="Premium Courses" />
          <StatCard target={500} label="Active Students" />
          <StatCard target={10} label="Real Projects" />
        </div>
      </section>

      {/* Featured Courses */}
      <section className="section">
        <div className="scroll-animate">
          <div className="section-label">Popular</div>
          <h2 className="section-heading heading-animated">Featured Courses</h2>
          <p className="section-subheading">Handpicked courses to take you from beginner to professional.</p>
        </div>

        <div className="courses-scroll-wrapper scroll-animate">
          <div className="courses-scroll">
            {featuredCourses.map((course, i) => (
              <div key={i} className="course-card course-card-enhanced">
                <div className="course-thumbnail">
                  <div className="course-thumbnail-gradient" style={{ background: course.gradient }}>{course.icon}</div>
                  <span className={`course-tag ${course.tagClass} tag-glow`}>{course.tag}</span>
                </div>
                <div className="course-body">
                  <div className="course-title">{course.title}</div>
                  <div className="course-desc">{course.desc}</div>
                  <div className="course-meta">
                    <span className="course-meta-item">⏱ {course.duration}</span>
                    <span className={`difficulty-badge ${course.diffClass}`}>{course.difficulty}</span>
                  </div>
                </div>
                <Link to="/enroll" className="course-enroll-btn">Enroll Now →</Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Marquee */}
      <section className="marquee-section">
        <div className="marquee-heading">Technologies you'll master</div>
        <div style={{ marginBottom: '0.75rem', overflow: 'hidden' }}>
          <div className="marquee-track scroll-right">
            {[...techItems1, ...techItems1, ...techItems1].map((item, i) => (
              <div key={i} className="marquee-item"><span className="marquee-icon icon-float">{item.icon}</span>{item.name}</div>
            ))}
          </div>
        </div>
        <div style={{ overflow: 'hidden' }}>
          <div className="marquee-track scroll-left">
            {[...techItems2, ...techItems2, ...techItems2].map((item, i) => (
              <div key={i} className="marquee-item"><span className="marquee-icon icon-float">{item.icon}</span>{item.name}</div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section">
        <div className="scroll-animate">
          <div className="section-label">Testimonials</div>
          <h2 className="section-heading heading-animated">What Students Say</h2>
          <p className="section-subheading">Real stories from our thriving community.</p>
        </div>

        <div className="testimonials-grid">
          {testimonials.map((t, i) => (
            <div key={i} className="testimonial-card testimonial-glow scroll-animate">
              <div className="testimonial-stars">{'★'.repeat(t.stars)}</div>
              <p className="testimonial-quote">"{t.quote}"</p>
              <div className="testimonial-author">
                <div className="testimonial-avatar glow-orbit">{t.initials}</div>
                <div>
                  <div className="testimonial-name glow-text">{t.name}</div>
                  <div className="testimonial-role">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Why Code Hub */}
      <section className="section" style={{ background: 'var(--bg-raised)', maxWidth: 'none', paddingLeft: 'calc((100% - 1280px) / 2 + 2rem)', paddingRight: 'calc((100% - 1280px) / 2 + 2rem)', transition: 'background var(--dur-slow) ease' }}>
        <div className="scroll-animate">
          <div className="section-label">Why Us</div>
          <h2 className="section-heading heading-animated glow-heading-soft">Why CODE HUB?</h2>
          <p className="section-subheading">Everything you need to become a world-class developer.</p>
        </div>
        <div className="features-grid">
          {features.map((f, i) => (
            <div key={i} className="feature-card glow-card scroll-animate">
              <div className="feature-icon feature-icon-glow icon-float">{f.icon}</div>
              <div className="feature-title glow-text">{f.title}</div>
              <div className="feature-desc">{f.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="cta-banner">
        <div className="scroll-animate">
          <h2 className="cta-banner-title shimmer-text cta-breath" style={{ fontFamily: 'Orbitron, sans-serif', fontSize: 'clamp(2rem, 4vw, 3.2rem)', fontWeight: 700, WebkitTextFillColor: 'initial' }}>
            Ready to begin?
          </h2>
          <p className="cta-banner-subtitle">
            Join 500+ students transforming their careers. Start learning today.
          </p>
          <Link to="/enroll" className="btn-primary pulse-glow">Enroll Now — Free to Start →</Link>
        </div>
      </section>
    </div>
  );
}
