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

const allTestimonials = [
  { name: 'Rabbani Mia', initials: 'SC', role: 'Full-Stack Developer', quote: 'CODE HUB transformed my career. The project-based approach gave me real skills that landed me my dream job at a top tech company.', stars: 5 },
  { name: 'Arman Khan', initials: 'AR', role: 'AI Engineer', quote: 'The AI/ML courses are exceptional. Hands-on projects with real datasets made complex concepts click in a way no other platform could.', stars: 5 },
  { name: 'Shakib Islam', initials: 'MS', role: 'DevOps Engineer', quote: 'From zero to DevOps engineer in 6 months. The instructors are genuinely knowledgeable and the community support is incredible.', stars: 5 },
  { name: 'Fatima Rahman', initials: 'FR', role: 'Frontend Developer', quote: 'The React and TypeScript courses are world-class. I went from knowing nothing to building production-ready apps in just 3 months.', stars: 5 },
  { name: 'Ahmed Hassan', initials: 'AH', role: 'Backend Developer', quote: 'Python and Django mastery at its finest. The real-world projects helped me understand backend architecture deeply.', stars: 5 },
  { name: 'Sarah Ahmed', initials: 'SA', role: 'Data Scientist', quote: 'The data science track is comprehensive. From Python basics to advanced ML, every concept is explained with practical examples.', stars: 5 },
  { name: 'Mohammed Ali', initials: 'MA', role: 'Cybersecurity Analyst', quote: 'The ethical hacking course opened my eyes to real-world security vulnerabilities. Now I work as a security consultant.', stars: 5 },
  { name: 'Nadia Hassan', initials: 'NH', role: 'UI/UX Designer', quote: 'The design principles taught here are industry-standard. I now lead design at a Fortune 500 company.', stars: 5 },
  { name: 'Omar Farooq', initials: 'OF', role: 'Mobile Developer', quote: 'React Native mastery in 4 months. Built 3 apps that are now in the App Store with thousands of downloads.', stars: 5 },
  { name: 'Aisha Khan', initials: 'AK', role: 'Cloud Architect', quote: 'AWS and cloud computing courses are top-notch. Now managing enterprise-level infrastructure.', stars: 5 },
  { name: 'Imran Hossain', initials: 'IH', role: 'Blockchain Developer', quote: 'The blockchain track is cutting-edge. Built my first DeFi project and got funded!', stars: 5 },
  { name: 'Zara Ahmed', initials: 'ZA', role: 'Game Developer', quote: 'Unity and C# game development courses are amazing. Published my first game on Steam!', stars: 5 },
  { name: 'Kamal Uddin', initials: 'KU', role: 'Software Engineer', quote: 'The software engineering fundamentals course gave me a solid foundation. Now working at Google.', stars: 5 },
  { name: 'Laila Rahman', initials: 'LR', role: 'Product Manager', quote: 'The product management courses helped me transition from dev to PM. Best career decision ever!', stars: 5 },
  { name: 'Hasan Mahmud', initials: 'HM', role: 'Database Administrator', quote: 'SQL and NoSQL mastery at its finest. Now managing databases for major e-commerce platforms.', stars: 5 },
  { name: 'Riya Akter', initials: 'RA', role: 'QA Engineer', quote: 'The testing and QA courses are comprehensive. Now leading quality assurance at a fintech startup.', stars: 5 },
  { name: 'Jamil Ahmed', initials: 'JA', role: 'System Architect', quote: 'The system design courses are world-class. Now architecting systems for millions of users.', stars: 5 },
  { name: 'Nusrat Jahan', initials: 'NJ', role: 'DevOps Engineer', quote: 'Kubernetes and Docker courses are exceptional. Now managing containerized infrastructure at scale.', stars: 5 },
  { name: 'Rafiqul Islam', initials: 'RI', role: 'Full-Stack Developer', quote: 'The MERN stack course is perfect. Built multiple full-stack applications and got hired immediately.', stars: 5 },
  { name: 'Sumaiya Rahman', initials: 'SR', role: 'Data Analyst', quote: 'The data analysis track is comprehensive. Now working with Fortune 500 companies on data insights.', stars: 5 },
  { name: 'Tanvir Ahmed', initials: 'TA', role: 'Network Engineer', quote: 'The networking courses are top-notch. Now designing and maintaining enterprise networks.', stars: 5 },
  { name: 'Farhana Islam', initials: 'FI', role: 'Machine Learning Engineer', quote: 'The ML engineering track is exceptional. Now deploying ML models at scale in production.', stars: 5 },
  { name: 'Sajib Hossain', initials: 'SH', role: 'Frontend Developer', quote: 'Vue.js and React courses are world-class. Now building beautiful, performant web applications.', stars: 5 },
  { name: 'Nasreen Akter', initials: 'NA', role: 'Backend Developer', quote: 'Node.js and Express mastery in 3 months. Now building scalable APIs for startups.', stars: 5 },
  { name: 'Abdur Rahman', initials: 'AR', role: 'Security Engineer', quote: 'The security courses are comprehensive. Now protecting enterprise systems from cyber threats.', stars: 5 },
  { name: 'Tahmina Islam', initials: 'TI', role: 'Data Engineer', quote: 'The data engineering track is exceptional. Now building data pipelines for major companies.', stars: 5 },
  { name: 'Mizanur Rahman', initials: 'MR', role: 'Cloud Developer', quote: 'The cloud development courses are top-notch. Now deploying applications on AWS, Azure, and GCP.', stars: 5 },
  { name: 'Rumana Ahmed', initials: 'RA', role: 'AI Researcher', quote: 'The AI research track is cutting-edge. Now publishing papers and working on breakthrough projects.', stars: 5 },
  { name: 'Shafiqul Islam', initials: 'SI', role: 'Software Architect', quote: 'The architecture courses are world-class. Now designing systems for high-traffic applications.', stars: 5 },
  { name: 'Kawsar Ahmed', initials: 'KA', role: 'DevOps Engineer', quote: 'The CI/CD and DevOps courses are exceptional. Now automating everything from code to deployment.', stars: 5 },
  { name: 'Nasima Akter', initials: 'NA', role: 'Data Scientist', quote: 'The data science track is comprehensive. Now working on predictive models for major companies.', stars: 5 },
  { name: 'Habibur Rahman', initials: 'HR', role: 'Full-Stack Developer', quote: 'The full-stack course is perfect. Built multiple projects and got hired at a top startup.', stars: 5 },
  { name: 'Jahanara Islam', initials: 'JI', role: 'UI Developer', quote: 'The UI development courses are world-class. Now building beautiful, accessible interfaces.', stars: 5 },
  { name: 'Rashedul Islam', initials: 'RI', role: 'Backend Developer', quote: 'The backend courses are exceptional. Now building robust, scalable APIs.', stars: 5 },
  { name: 'Shamima Akter', initials: 'SA', role: 'Frontend Developer', quote: 'The frontend courses are top-notch. Now creating stunning, responsive web applications.', stars: 5 },
  { name: 'Abul Bashar', initials: 'AB', role: 'Database Developer', quote: 'The database courses are comprehensive. Now designing and optimizing databases for performance.', stars: 5 },
  { name: 'Roksana Rahman', initials: 'RR', role: 'QA Engineer', quote: 'The QA courses are world-class. Now ensuring quality across all software projects.', stars: 5 },
  { name: 'Mamunur Rashid', initials: 'MR', role: 'DevOps Engineer', quote: 'The DevOps courses are exceptional. Now managing infrastructure for major platforms.', stars: 5 },
  { name: 'Kazi Nazmul', initials: 'KN', role: 'Security Analyst', quote: 'The security courses are comprehensive. Now identifying and mitigating security risks.', stars: 5 },
  { name: 'Taslima Islam', initials: 'TI', role: 'Data Analyst', quote: 'The data analysis courses are world-class. Now providing actionable insights to businesses.', stars: 5 },
  { name: 'Shahidul Islam', initials: 'SI', role: 'Full-Stack Developer', quote: 'The full-stack courses are exceptional. Now building end-to-end applications.', stars: 5 },
  { name: 'Nurul Islam', initials: 'NI', role: 'Backend Developer', quote: 'The backend courses are top-notch. Now building microservices at scale.', stars: 5 },
  { name: 'Rafiqul Haque', initials: 'RH', role: 'Frontend Developer', quote: 'The frontend courses are comprehensive. Now creating beautiful, performant user interfaces.', stars: 5 },
  { name: 'Shahana Akter', initials: 'SA', role: 'UI/UX Designer', quote: 'The design courses are world-class. Now creating user-centered designs that users love.', stars: 5 },
  { name: 'Abdul Karim', initials: 'AK', role: 'Cloud Architect', quote: 'The cloud architecture courses are exceptional. Now designing cloud-native applications.', stars: 5 },
  { name: 'Nasreen Akter', initials: 'NA', role: 'DevOps Engineer', quote: 'The DevOps courses are comprehensive. Now automating infrastructure and deployments.', stars: 5 },
  { name: 'Mizanur Islam', initials: 'MI', role: 'Security Engineer', quote: 'The security courses are world-class. Now protecting systems from cyber threats.', stars: 5 },
  { name: 'Ruma Islam', initials: 'RI', role: 'Data Scientist', quote: 'The data science courses are exceptional. Now building ML models that drive business value.', stars: 5 },
  { name: 'Shahidul Haque', initials: 'SH', role: 'Full-Stack Developer', quote: 'The full-stack courses are top-notch. Now building complete web applications.', stars: 5 },
  { name: 'Nurul Haque', initials: 'NH', role: 'Backend Developer', quote: 'The backend courses are comprehensive. Now building scalable, maintainable APIs.', stars: 5 },
  { name: 'Rafiqul Islam', initials: 'RI', role: 'Frontend Developer', quote: 'The frontend courses are world-class. Now creating stunning, responsive interfaces.', stars: 5 },
  { name: 'Shahana Begum', initials: 'SB', role: 'UI/UX Designer', quote: 'The design courses are exceptional. Now creating beautiful, intuitive user experiences.', stars: 5 },
  { name: 'Abdul Latif', initials: 'AL', role: 'Cloud Developer', quote: 'The cloud development courses are comprehensive. Now deploying applications across multiple clouds.', stars: 5 },
  { name: 'Nasreen Begum', initials: 'NB', role: 'DevOps Engineer', quote: 'The DevOps courses are world-class. Now managing infrastructure at enterprise scale.', stars: 5 },
  { name: 'Mizanur Haque', initials: 'MH', role: 'Security Analyst', quote: 'The security courses are exceptional. Now identifying vulnerabilities before hackers do.', stars: 5 },
  { name: 'Ruma Akter', initials: 'RA', role: 'Data Analyst', quote: 'The data analysis courses are top-notch. Now providing data-driven insights to stakeholders.', stars: 5 },
  { name: 'Shahidul Alam', initials: 'SA', role: 'Full-Stack Developer', quote: 'The full-stack courses are comprehensive. Now building complete, production-ready applications.', stars: 5 },
  { name: 'Nurul Alam', initials: 'NA', role: 'Backend Developer', quote: 'The backend courses are world-class. Now building robust, high-performance APIs.', stars: 5 },
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
  const [showAllTestimonials, setShowAllTestimonials] = useState(false);
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

  const displayedTestimonials = showAllTestimonials ? allTestimonials : allTestimonials.slice(0, 10);

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
      <section className="section testimonials-section">
        <div className="scroll-animate">
          <div className="section-label">Testimonials</div>
          <h2 className="section-heading heading-animated">What Students Say</h2>
          <p className="section-subheading">Real stories from our thriving community.</p>
        </div>

        <div className="testimonials-grid">
          {displayedTestimonials.map((t, i) => (
            <div key={i} className="testimonial-card testimonial-glow scroll-animate">
              <div className="testimonial-stars">
                {[...Array(t.stars)].map((_, starIndex) => (
                  <span key={starIndex}>★</span>
                ))}
              </div>
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

        {!showAllTestimonials && (
          <div className="testimonials-cta">
            <button 
              className="btn-see-more" 
              onClick={() => setShowAllTestimonials(true)}
            >
              <span className="btn-see-more-text">See More Reviews</span>
              <span className="btn-see-more-icon">↓</span>
            </button>
          </div>
        )}
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