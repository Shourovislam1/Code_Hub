import { useScrollAnimation } from '../hooks/useScrollAnimation';
import p1Image from '../img/persons/p1.jpeg';
import p2Image from '../img/persons/p2.jpeg';
import p3Image from '../img/persons/p3.jpeg';

const teamMembers = [
  {
    name: 'Md. Shourov Islam',
    initials: 'SI',
    image: p1Image,
    title: 'Lead AI Engineer & Platform Architect',
    bio: 'Visionary engineer with expertise in building AI-powered systems, managing cloud infrastructure, and developing intelligent automation pipelines. Leading the technical direction of CODE HUB with innovation at every step.',
    skills: ['AI/ML Engineer', 'Python Developer', 'DevOps Engineer', 'Cyber Analytics', 'AI Research', 'NLP Specialist', 'Deep Learning', 'Cloud Infrastructure', 'Data Science', 'Automation Expert'],
  },
  {
    name: 'Tahmid Hasan',
    initials: 'TH',
    image: p2Image,
    title: 'Backend Engineer & Infrastructure Lead',
    bio: 'Backend specialist focused on scalable server architectures, seamless API integrations, and robust DevOps workflows. Ensuring CODE HUB runs on a rock-solid infrastructure built for performance.',
    skills: ['DevOps Engineer', 'Laravel Developer', 'Backend Programmer', 'API Architect', 'Database Engineer', 'Server Management', 'CI/CD Pipeline Expert', 'PHP Developer'],
  },
  {
    name: 'Md. Mufthakherul Islam Miraz',
    initials: 'MI',
    image: p3Image,
    title: 'Security Engineer & Systems Architect',
    bio: 'Security-first engineer with deep expertise in protecting systems, managing cloud security, and building resilient infrastructure. The guardian of CODE HUB\'s platform integrity and student data.',
    skills: ['DevOps Engineer', 'Cybersecurity Specialist', 'Firebase Developer', 'Network Security', 'Cloud Security', 'Penetration Tester', 'System Architecture', 'Infrastructure Security'],
  },
];

const milestones = [
  { year: '2025', text: 'CODE HUB concept born — a vision to democratize tech education for everyone.' },
  { year: '2025', text: 'Core team assembled: AI, Backend, and Security experts joined forces.' },
  { year: '2025', text: 'Platform development began with focus on interactive, project-based learning.' },
  { year: '2026', text: 'First cohort of 50 students enrolled. Python and Web Dev courses launched.' },
  { year: '2026', text: 'Expanded to 20+ courses across 6 categories. AI Lab introduced.' },
  { year: '2026', text: 'Community grew to 500+ active students with a 95% satisfaction rate.' },
];

export default function About() {
  const sectionRef = useScrollAnimation();

  return (
    <div ref={sectionRef}>
      <section className="page-hero">
        <div className="gradient-orb orb-primary" style={{ width: 300, height: 300, top: '-10%', right: '10%' }} />
        <div className="gradient-orb orb-violet" style={{ width: 250, height: 250, bottom: '-5%', left: '5%' }} />
        <div className="page-hero-inner">
          <h1 className="glitch-text shimmer-text scroll-animate" data-text="Meet the Architects" style={{ WebkitTextFillColor: 'initial' }}>
            Meet the Architects
          </h1>
          <p className="scroll-animate glow-heading-soft" style={{ color: 'var(--text-muted)', fontSize: '1.2rem', marginTop: '1rem' }}>
            The engineers behind CODE HUB
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="mission-section scroll-animate">
        <div style={{ position: 'relative' }}>
          <blockquote className="mission-quote glow-heading-soft">
            Our mission is to bridge the gap between ambition and expertise. We believe every aspiring developer deserves
            access to world-class education, hands-on projects, and a community that uplifts. CODE HUB isn't just a
            platform — it's a launchpad for the next generation of tech innovators.
          </blockquote>
        </div>
      </section>

      {/* Team */}
      <section className="section">
        <div className="scroll-animate text-center">
          <div className="section-label" style={{ justifyContent: 'center' }}>Our Team</div>
          <h2 className="section-heading heading-animated glow-heading-soft" style={{ margin: '0 auto 0.5rem' }}>The Team</h2>
          <p className="section-subheading" style={{ margin: '0 auto 3rem' }}>Three engineers, one vision — transforming tech education.</p>
        </div>

        <div className="team-grid">
          {teamMembers.map((member, i) => (
            <div key={i} className="team-card glow-card scroll-animate">
              <div className="team-avatar glow-orbit">
                <img src={member.image} alt={member.name} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%' }} />
              </div>
              <div className="team-name glow-text">{member.name}</div>
              <div className="team-title">{member.title}</div>
              <div className="team-bio">{member.bio}</div>
              <div className="team-skills">
                {member.skills.map((skill, j) => (
                  <span key={j} className="skill-chip skill-glow" style={{ animationDelay: `${j * 0.05}s` }}>{skill}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Timeline */}
      <section className="section" style={{ background: 'var(--bg-raised)', maxWidth: 'none', paddingLeft: 'calc((100% - 1280px) / 2 + 2rem)', paddingRight: 'calc((100% - 1280px) / 2 + 2rem)', transition: 'background var(--dur-slow) ease' }}>
        <div className="scroll-animate text-center">
          <div className="section-label" style={{ justifyContent: 'center' }}>Our Journey</div>
          <h2 className="section-heading heading-animated" style={{ margin: '0 auto 0.5rem' }}>Milestones</h2>
          <p className="section-subheading" style={{ margin: '0 auto 3rem' }}>Key moments in the CODE HUB story.</p>
        </div>

        <div className="timeline">
          {milestones.map((item, i) => (
            <div key={i} className="timeline-item scroll-animate">
              <div className="timeline-dot" />
              <div className="timeline-year">{item.year}</div>
              <div className="timeline-text">{item.text}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
