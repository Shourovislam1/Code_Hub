import { useState, useEffect } from 'react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const projectFilters = ['All', 'Python', 'Web', 'AI/ML', 'Competition', 'Documentation'];

const projects = [
  { id: 1, title: 'AI Image Classifier', desc: 'A deep learning model that classifies images into categories using convolutional neural networks with TensorFlow and Keras.', tech: ['Python', 'TensorFlow', 'Keras', 'NumPy'], type: 'Open Source', typeClass: 'type-opensource', cat: 'AI/ML', difficulty: 'Advanced', diffClass: 'difficulty-advanced', borderClass: 'border-violet', icon: '🖼️', gradient: 'linear-gradient(135deg, #3B0764, #7C3AED)' },
  { id: 2, title: 'e-Commerce Platform', desc: 'A full-featured online store with product management, cart system, payment integration, and admin dashboard.', tech: ['Laravel', 'MySQL', 'Blade', 'JavaScript'], type: 'Open Source', typeClass: 'type-opensource', cat: 'Web', difficulty: 'Advanced', diffClass: 'difficulty-advanced', borderClass: '', icon: '🛒', gradient: 'linear-gradient(135deg, #7C2A12, #DC2626)' },
  { id: 3, title: 'Cybersecurity Dashboard', desc: 'Real-time threat monitoring dashboard with vulnerability scanning, log analysis, and security alerting system.', tech: ['Python', 'Flask', 'Chart.js', 'SQLite'], type: 'Open Source', typeClass: 'type-opensource', cat: 'Python', difficulty: 'Intermediate', diffClass: 'difficulty-intermediate', borderClass: 'border-coral', icon: '🛡️', gradient: 'linear-gradient(135deg, #4C0519, #E11D48)' },
  { id: 4, title: 'AI Chatbot', desc: 'An intelligent conversational agent powered by NLP techniques, capable of understanding context and providing relevant responses.', tech: ['Python', 'NLP', 'Transformers', 'FastAPI'], type: 'Open Source', typeClass: 'type-opensource', cat: 'AI/ML', difficulty: 'Advanced', diffClass: 'difficulty-advanced', borderClass: 'border-violet', icon: '🤖', gradient: 'linear-gradient(135deg, #059669, #064E3B)' },
  { id: 5, title: 'Portfolio Generator', desc: 'A React-based tool that generates professional developer portfolios from a simple JSON configuration file.', tech: ['React', 'TypeScript', 'Styled Components'], type: 'Open Source', typeClass: 'type-opensource', cat: 'Web', difficulty: 'Intermediate', diffClass: 'difficulty-intermediate', borderClass: '', icon: '👨‍💻', gradient: 'linear-gradient(135deg, #164E63, #0891B2)' },
  { id: 6, title: 'Code Challenge Arena', desc: 'Annual coding competition where students solve algorithmic problems under time pressure. Prizes for top performers.', tech: ['Python', 'JavaScript', 'C++'], type: 'Competition', typeClass: 'type-competition', cat: 'Competition', difficulty: 'Intermediate', diffClass: 'difficulty-intermediate', borderClass: 'border-coral', icon: '🏆', gradient: 'linear-gradient(135deg, #713F12, #D97706)' },
  { id: 7, title: 'AI Hackathon 2025', desc: '48-hour hackathon focused on building AI-powered solutions for real-world problems. Team-based competition.', tech: ['Python', 'TensorFlow', 'OpenAI API'], type: 'Competition', typeClass: 'type-competition', cat: 'Competition', difficulty: 'Advanced', diffClass: 'difficulty-advanced', borderClass: 'border-coral', icon: '🎯', gradient: 'linear-gradient(135deg, #3B0764, #E11D48)' },
  { id: 8, title: 'Python Project Docs', desc: 'Comprehensive documentation for all Python projects including setup guides, API references, and code examples.', tech: ['Markdown', 'Python'], type: 'Documentation', typeClass: 'type-documentation', cat: 'Documentation', difficulty: 'Beginner', diffClass: 'difficulty-beginner', borderClass: '', icon: '📄', gradient: 'linear-gradient(135deg, #1E3A5F, #2563EB)' },
];

const competitions = [
  { title: 'Code Sprint 2025', desc: 'Fast-paced algorithmic coding challenge with 20 problems in 3 hours.', deadline: '2025-09-15T00:00:00', prize: '🏆 Certificate + GitHub Pro' },
  { title: 'AI Innovation Jam', desc: 'Build an AI solution for social good in this 48-hour team hackathon.', deadline: '2025-10-01T00:00:00', prize: '🏆 Cash Prize + Mentorship' },
];

function CountdownTimer({ deadline }: { deadline: string }) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const calc = () => {
      const diff = new Date(deadline).getTime() - Date.now();
      if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
      return {
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      };
    };
    setTimeLeft(calc());
    const timer = setInterval(() => setTimeLeft(calc()), 1000);
    return () => clearInterval(timer);
  }, [deadline]);

  return (
    <div className="countdown-grid">
      {Object.entries(timeLeft).map(([unit, val]) => (
        <div key={unit} className="countdown-unit countdown-glow">
          <div className="countdown-number number-glow">{String(val).padStart(2, '0')}</div>
          <div className="countdown-label">{unit.charAt(0).toUpperCase() + unit.slice(1)}s</div>
        </div>
      ))}
    </div>
  );
}

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [modalProject, setModalProject] = useState<typeof projects[0] | null>(null);
  const sectionRef = useScrollAnimation();

  const filtered = activeFilter === 'All' ? projects : projects.filter(p => p.cat === activeFilter);
  const featured = projects.slice(0, 3);

  return (
    <div ref={sectionRef}>
      <section className="page-hero">
        <div className="gradient-orb orb-violet" style={{ width: 300, height: 300, top: '-10%', left: '10%' }} />
        <div className="page-hero-inner">
          <h1 className="glitch-text scroll-animate" data-text="Project Arena">Project Arena</h1>
          <p className="scroll-animate glow-heading-soft" style={{ color: 'var(--text-muted)', fontSize: '1.1rem', marginTop: '0.75rem' }}>
            Where code becomes reality
          </p>
        </div>
      </section>

      <section className="section">
        <div className="scroll-animate">
          <div className="section-label">Highlights</div>
          <h2 className="section-heading heading-animated glow-heading-soft">Featured Projects</h2>
          <p className="section-subheading">Our top picks showcasing student excellence.</p>
        </div>

        {featured.map((project) => (
          <div key={project.id} className="project-featured glow-card scroll-animate" style={{ marginBottom: '2rem' }}>
            <div className="project-featured-visual" style={{ background: project.gradient }}>
              <span className="icon-float">{project.icon}</span>
            </div>
            <div>
              <span className={`project-type-badge ${project.typeClass}`}>{project.type}</span>
              <div className="project-title glow-text">{project.title}</div>
              <p style={{ color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: '1rem' }}>{project.desc}</p>
              <div className="project-tech">
                {project.tech.map((t, j) => <span key={j} className="tech-pill tag-glow">{t}</span>)}
              </div>
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginTop: '1rem' }}>
                <span className={`difficulty-badge ${project.diffClass}`}>{project.difficulty}</span>
                <button className="btn-primary btn-sm pulse-glow" onClick={() => setModalProject(project)}>View Details</button>
              </div>
            </div>
          </div>
        ))}
      </section>

      <section className="section">
        <div className="scroll-animate">
          <div className="section-label">Browse</div>
          <h2 className="section-heading heading-animated">All Projects</h2>
          <p className="section-subheading">Our complete project portfolio.</p>
        </div>

        <div className="filter-bar scroll-animate">
          {projectFilters.map(f => (
            <button key={f} className={`filter-btn glow-border ${activeFilter === f ? 'active' : ''}`} onClick={() => setActiveFilter(f)}>
              {f}
            </button>
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))', gap: '1.5rem' }}>
          {filtered.map((project, i) => (
            <div key={project.id} className={`project-card project-card-enhanced ${project.borderClass} scroll-animate`} style={{ transitionDelay: `${i * 0.05}s` }}>
              <span className={`project-type-badge ${project.typeClass}`}>{project.type}</span>
              <div className="project-title">{project.title}</div>
              <div className="project-desc">{project.desc}</div>
              <div className="project-tech">
                {project.tech.map((t, j) => <span key={j} className="tech-pill tag-glow">{t}</span>)}
              </div>
              <div className="project-meta-row">
                <span className={`difficulty-badge ${project.diffClass}`}>{project.difficulty}</span>
                <button className="btn-secondary btn-sm glow-border" onClick={() => setModalProject(project)}>View Details</button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Competitions */}
      <section className="section" style={{ background: 'var(--bg-raised)', maxWidth: 'none', paddingLeft: 'calc((100% - 1280px) / 2 + 2rem)', paddingRight: 'calc((100% - 1280px) / 2 + 2rem)', transition: 'background var(--dur-slow) ease' }}>
        <div className="scroll-animate text-center">
          <div className="section-label" style={{ justifyContent: 'center' }}>🏆 Compete</div>
          <h2 className="section-heading heading-animated glow-heading-soft" style={{ margin: '0 auto 0.5rem' }}>Competitions</h2>
          <p className="section-subheading" style={{ margin: '0 auto 3rem' }}>Test your skills and win amazing prizes.</p>
        </div>

        {competitions.map((comp, i) => (
          <div key={i} className="glow-card scroll-animate" style={{ maxWidth: 700, margin: '0 auto 2rem', padding: '2rem', textAlign: 'center', borderRadius: 'var(--radius-xl)', background: 'var(--bg-card)', border: '1px solid var(--border-subtle)' }}>
            <div className="icon-float" style={{ fontSize: '2.5rem', marginBottom: '0.75rem' }}>🏆</div>
            <div className="glow-text" style={{ fontFamily: 'Orbitron, sans-serif', fontSize: '1.3rem', fontWeight: 700, color: 'var(--text)', marginBottom: '0.5rem' }}>{comp.title}</div>
            <p style={{ color: 'var(--text-muted)', marginBottom: '1rem' }}>{comp.desc}</p>
            <CountdownTimer deadline={comp.deadline} />
            <p className="glow-heading-soft" style={{ color: 'var(--primary)', fontWeight: 600, marginTop: '1rem' }}>{comp.prize}</p>
          </div>
        ))}
      </section>

      {/* Modal */}
      {modalProject && (
        <div className="modal-overlay" onClick={() => setModalProject(null)}>
          <div className="modal-content glow-card" onClick={e => e.stopPropagation()} style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}>
            <button className="modal-close" onClick={() => setModalProject(null)}>✕</button>
            <div style={{ height: 180, borderRadius: 14, overflow: 'hidden', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '4rem', background: modalProject.gradient }}>
              {modalProject.icon}
            </div>
            <span className={`project-type-badge ${modalProject.typeClass}`}>{modalProject.type}</span>
            <h3 className="glow-text" style={{ fontFamily: 'Orbitron, sans-serif', fontSize: '1.3rem', color: 'var(--text)', margin: '0.75rem 0' }}>{modalProject.title}</h3>
            <p style={{ color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: '1rem' }}>{modalProject.desc}</p>
            <div className="project-tech" style={{ marginBottom: '1rem' }}>
              {modalProject.tech.map((t, j) => <span key={j} className="tech-pill tag-glow">{t}</span>)}
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span className={`difficulty-badge ${modalProject.diffClass}`}>{modalProject.difficulty}</span>
              <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Category: {modalProject.cat}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
