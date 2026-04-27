import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const categories = ['All', 'Python', 'Web Dev', 'AI/ML', 'Office', 'DevOps', 'Cybersecurity'];

const allCourses = [
  { id: 1, title: 'Python Basics', desc: 'Start your programming journey with Python fundamentals, data types, control flow, and functions.', cat: 'Python', tagClass: 'tag-python', difficulty: 'Beginner', diffClass: 'difficulty-beginner', duration: '8 weeks', instructor: 'Shourov Islam', instructorInit: 'SI', icon: '🐍', gradient: 'linear-gradient(135deg, #3776AB, #003366)' },
  { id: 2, title: 'Advanced Python', desc: 'Master decorators, generators, context managers, async programming, and advanced OOP concepts.', cat: 'Python', tagClass: 'tag-python', difficulty: 'Advanced', diffClass: 'difficulty-advanced', duration: '10 weeks', instructor: 'Shourov Islam', instructorInit: 'SI', icon: '🔥', gradient: 'linear-gradient(135deg, #FF6B35, #D72638)' },
  { id: 3, title: 'Data Analysis with Python', desc: 'Learn Pandas, NumPy, Matplotlib for data manipulation, visualization, and statistical analysis.', cat: 'Python', tagClass: 'tag-python', difficulty: 'Intermediate', diffClass: 'difficulty-intermediate', duration: '8 weeks', instructor: 'Shourov Islam', instructorInit: 'SI', icon: '📊', gradient: 'linear-gradient(135deg, #150050, #3F0071)' },
  { id: 4, title: 'HTML/CSS Mastery', desc: 'Build stunning, responsive websites with modern HTML5 semantic elements and CSS3 techniques.', cat: 'Web Dev', tagClass: 'tag-webdev', difficulty: 'Beginner', diffClass: 'difficulty-beginner', duration: '6 weeks', instructor: 'Tahmid Hasan', instructorInit: 'TH', icon: '🎨', gradient: 'linear-gradient(135deg, #E44D26, #2965F1)' },
  { id: 5, title: 'JavaScript Pro', desc: 'Deep dive into ES6+, closures, prototypes, async patterns, and modern JavaScript best practices.', cat: 'Web Dev', tagClass: 'tag-webdev', difficulty: 'Intermediate', diffClass: 'difficulty-intermediate', duration: '10 weeks', instructor: 'Tahmid Hasan', instructorInit: 'TH', icon: '⚡', gradient: 'linear-gradient(135deg, #F7DF1E, #333)' },
  { id: 6, title: 'React Fundamentals', desc: 'Component-based UI development with React hooks, state management, and routing.', cat: 'Web Dev', tagClass: 'tag-webdev', difficulty: 'Intermediate', diffClass: 'difficulty-intermediate', duration: '8 weeks', instructor: 'Tahmid Hasan', instructorInit: 'TH', icon: '⚛️', gradient: 'linear-gradient(135deg, #61DAFB, #282C34)' },
  { id: 7, title: 'Backend with Laravel', desc: 'Build powerful APIs and web applications with Laravel, Eloquent ORM, and Blade templates.', cat: 'Web Dev', tagClass: 'tag-webdev', difficulty: 'Intermediate', diffClass: 'difficulty-intermediate', duration: '10 weeks', instructor: 'Tahmid Hasan', instructorInit: 'TH', icon: '🔥', gradient: 'linear-gradient(135deg, #FF2D20, #333)' },
  { id: 8, title: 'Full-Stack Development', desc: 'End-to-end development from React frontend to Node.js/Laravel backend with database integration.', cat: 'Web Dev', tagClass: 'tag-fullstack', difficulty: 'Advanced', diffClass: 'difficulty-advanced', duration: '16 weeks', instructor: 'Tahmid Hasan', instructorInit: 'TH', icon: '🚀', gradient: 'linear-gradient(135deg, #00D4FF, #7B2FFF)' },
  { id: 9, title: 'Machine Learning Basics', desc: 'Understand supervised and unsupervised learning, model training, and evaluation with scikit-learn.', cat: 'AI/ML', tagClass: 'tag-ai', difficulty: 'Intermediate', diffClass: 'difficulty-intermediate', duration: '12 weeks', instructor: 'Shourov Islam', instructorInit: 'SI', icon: '🧠', gradient: 'linear-gradient(135deg, #7B2FFF, #FF3D71)' },
  { id: 10, title: 'Deep Learning', desc: 'Neural networks, CNNs, RNNs, and transformers with TensorFlow and PyTorch implementations.', cat: 'AI/ML', tagClass: 'tag-ai', difficulty: 'Advanced', diffClass: 'difficulty-advanced', duration: '14 weeks', instructor: 'Shourov Islam', instructorInit: 'SI', icon: '🔬', gradient: 'linear-gradient(135deg, #00D4FF, #0D1520)' },
  { id: 11, title: 'AI Tools for Beginners', desc: 'Hands-on guide to ChatGPT, Copilot, Midjourney, and other AI-powered productivity tools.', cat: 'AI/ML', tagClass: 'tag-ai', difficulty: 'Beginner', diffClass: 'difficulty-beginner', duration: '4 weeks', instructor: 'Shourov Islam', instructorInit: 'SI', icon: '🤖', gradient: 'linear-gradient(135deg, #10A37F, #1A1A2E)' },
  { id: 12, title: 'NLP Fundamentals', desc: 'Text processing, sentiment analysis, named entity recognition, and language models.', cat: 'AI/ML', tagClass: 'tag-ai', difficulty: 'Advanced', diffClass: 'difficulty-advanced', duration: '10 weeks', instructor: 'Shourov Islam', instructorInit: 'SI', icon: '💬', gradient: 'linear-gradient(135deg, #FF6B6B, #7B2FFF)' },
  { id: 13, title: 'Microsoft Word Pro', desc: 'Professional document creation, formatting, templates, mail merge, and collaboration features.', cat: 'Office', tagClass: 'tag-office', difficulty: 'Beginner', diffClass: 'difficulty-beginner', duration: '4 weeks', instructor: 'Miraz Islam', instructorInit: 'MI', icon: '📝', gradient: 'linear-gradient(135deg, #2B579A, #D83B01)' },
  { id: 14, title: 'Excel Advanced', desc: 'Pivot tables, VLOOKUP, macros, data visualization, and advanced formulas for data analysis.', cat: 'Office', tagClass: 'tag-office', difficulty: 'Intermediate', diffClass: 'difficulty-intermediate', duration: '6 weeks', instructor: 'Miraz Islam', instructorInit: 'MI', icon: '📊', gradient: 'linear-gradient(135deg, #217346, #333)' },
  { id: 15, title: 'PowerPoint Mastery', desc: 'Create stunning presentations with animations, transitions, and professional design principles.', cat: 'Office', tagClass: 'tag-office', difficulty: 'Beginner', diffClass: 'difficulty-beginner', duration: '4 weeks', instructor: 'Miraz Islam', instructorInit: 'MI', icon: '📽️', gradient: 'linear-gradient(135deg, #D24726, #333)' },
  { id: 16, title: 'Linux Fundamentals', desc: 'Command line mastery, file system navigation, permissions, shell scripting, and system administration.', cat: 'DevOps', tagClass: 'tag-devops', difficulty: 'Beginner', diffClass: 'difficulty-beginner', duration: '6 weeks', instructor: 'Tahmid Hasan', instructorInit: 'TH', icon: '🐧', gradient: 'linear-gradient(135deg, #FCC624, #333)' },
  { id: 17, title: 'Docker & Containers', desc: 'Containerization concepts, Docker images, compose, orchestration, and microservices architecture.', cat: 'DevOps', tagClass: 'tag-devops', difficulty: 'Intermediate', diffClass: 'difficulty-intermediate', duration: '8 weeks', instructor: 'Tahmid Hasan', instructorInit: 'TH', icon: '🐳', gradient: 'linear-gradient(135deg, #2496ED, #0D1520)' },
  { id: 18, title: 'Git & GitHub', desc: 'Version control workflows, branching strategies, pull requests, and collaborative development.', cat: 'DevOps', tagClass: 'tag-devops', difficulty: 'Beginner', diffClass: 'difficulty-beginner', duration: '4 weeks', instructor: 'Tahmid Hasan', instructorInit: 'TH', icon: '📦', gradient: 'linear-gradient(135deg, #F05032, #333)' },
  { id: 19, title: 'Ethical Hacking Basics', desc: 'Penetration testing methodology, vulnerability assessment, and security auditing with Kali Linux.', cat: 'Cybersecurity', tagClass: 'tag-cyber', difficulty: 'Intermediate', diffClass: 'difficulty-intermediate', duration: '10 weeks', instructor: 'Miraz Islam', instructorInit: 'MI', icon: '🔒', gradient: 'linear-gradient(135deg, #FF3D71, #7B2FFF)' },
  { id: 20, title: 'Network Security', desc: 'Firewalls, IDS/IPS, VPNs, network monitoring, and defense strategies against modern threats.', cat: 'Cybersecurity', tagClass: 'tag-cyber', difficulty: 'Advanced', diffClass: 'difficulty-advanced', duration: '12 weeks', instructor: 'Miraz Islam', instructorInit: 'MI', icon: '🛡️', gradient: 'linear-gradient(135deg, #00D4FF, #7B2FFF)' },
];

export default function Courses() {
  const [activeFilter, setActiveFilter] = useState('All');
  const sectionRef = useScrollAnimation();

  const filtered = activeFilter === 'All' 
    ? allCourses 
    : allCourses.filter(c => c.cat === activeFilter);

  return (
    <div ref={sectionRef}>
      <section className="page-hero">
        <div className="gradient-orb orb-cyan" style={{ width: 300, height: 300, top: '-10%', right: '10%' }} />
        <div style={{ position: 'relative', zIndex: 1 }}>
          <h1 className="scroll-animate" style={{ fontFamily: 'Orbitron', fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 900 }}>
            <span className="text-gradient">All Courses</span>
          </h1>
          <p className="scroll-animate" style={{ color: 'var(--text-muted)', fontSize: '1.1rem', marginTop: '0.75rem' }}>
            {allCourses.length} courses across {categories.length - 1} categories
          </p>
        </div>
      </section>

      <section className="section">
        <div className="filter-bar scroll-animate">
          {categories.map(cat => (
            <button
              key={cat}
              className={`filter-btn ${activeFilter === cat ? 'active' : ''}`}
              onClick={() => setActiveFilter(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="courses-grid">
          {filtered.map((course, i) => (
            <div key={course.id} className="course-full-card course-card-enhanced scroll-animate" style={{ transitionDelay: `${i * 0.05}s` }}>
              <div className="course-full-thumb">
                <div className="course-full-thumb-content" style={{ background: course.gradient }}>
                  {course.icon}
                </div>
                <span className={`course-tag ${course.tagClass}`} style={{ position: 'absolute', top: 12, left: 12 }}>
                  {course.cat}
                </span>
              </div>
              <div className="course-full-body">
                <div className="course-full-title">{course.title}</div>
                <div className="course-full-desc">{course.desc}</div>
                <div className="course-full-meta">
                  <div className="course-instructor">
                    <div className="instructor-avatar">{course.instructorInit}</div>
                    <span>{course.instructor}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <span>⏱ {course.duration}</span>
                    <span className={`difficulty-badge ${course.diffClass}`}>{course.difficulty}</span>
                  </div>
                </div>
                <Link to="/enroll" className="btn-primary btn-sm pulse-glow" style={{ display: 'block', textAlign: 'center', marginTop: '1rem', width: '100%' }}>
                  Enroll Now
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
