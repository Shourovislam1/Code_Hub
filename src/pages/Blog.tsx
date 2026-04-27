import { useScrollAnimation } from '../hooks/useScrollAnimation';

const blogCategories = [
  { name: 'Python', color: '#3776AB', bg: 'rgba(55,118,171,0.15)' },
  { name: 'AI', color: '#7B2FFF', bg: 'rgba(123,47,255,0.15)' },
  { name: 'Web', color: '#F7DF1E', bg: 'rgba(247,223,30,0.15)' },
  { name: 'Career', color: '#00D4FF', bg: 'rgba(0,212,255,0.15)' },
  { name: 'Tools', color: '#FF3D71', bg: 'rgba(255,61,113,0.15)' },
];

const featured = {
  title: 'The Future of AI in Education: How CODE HUB is Leading the Charge',
  excerpt: 'Artificial intelligence is revolutionizing how we learn to code. From personalized learning paths to AI-powered code reviews, discover how CODE HUB integrates cutting-edge AI to create the most effective learning experience for aspiring developers worldwide.',
  category: 'AI',
  date: 'Dec 15, 2025',
  readTime: '8 min read',
  catColor: '#7B2FFF',
  catBg: 'rgba(123,47,255,0.15)',
  icon: '🤖',
  gradient: 'linear-gradient(135deg, #7B2FFF, #00D4FF)',
};

const posts = [
  { title: 'Python 4.0: What Every Developer Needs to Know', category: 'Python', date: 'Dec 10, 2025', readTime: '6 min', excerpt: 'A deep dive into the upcoming Python 4.0 features that will change how you write code forever. From performance improvements to new syntax.', catColor: '#3776AB', catBg: 'rgba(55,118,171,0.15)', icon: '🐍' },
  { title: 'Building Scalable APIs with Laravel 12', category: 'Web', date: 'Dec 8, 2025', readTime: '10 min', excerpt: 'Learn how to build production-ready APIs using Laravel 12 with rate limiting, caching, and advanced Eloquent patterns.', catColor: '#F7DF1E', catBg: 'rgba(247,223,30,0.15)', icon: '🔥' },
  { title: 'From Student to Software Engineer: A 6-Month Roadmap', category: 'Career', date: 'Dec 5, 2025', readTime: '7 min', excerpt: 'A practical guide for transitioning from learning to earning. Real strategies that helped our students land their first tech roles.', catColor: '#00D4FF', catBg: 'rgba(0,212,255,0.15)', icon: '💼' },
  { title: 'Understanding Transformers: The Architecture Behind ChatGPT', category: 'AI', date: 'Dec 1, 2025', readTime: '12 min', excerpt: 'Break down the transformer architecture piece by piece. Self-attention, positional encoding, and why it changed NLP forever.', catColor: '#7B2FFF', catBg: 'rgba(123,47,255,0.15)', icon: '🧠' },
  { title: '10 VS Code Extensions Every Developer Must Have in 2025', category: 'Tools', date: 'Nov 28, 2025', readTime: '5 min', excerpt: 'Supercharge your development workflow with these essential VS Code extensions for productivity, debugging, and code quality.', catColor: '#FF3D71', catBg: 'rgba(255,61,113,0.15)', icon: '⚡' },
  { title: 'React Server Components: The Complete Guide', category: 'Web', date: 'Nov 25, 2025', readTime: '9 min', excerpt: 'Master React Server Components with practical examples. Understand when to use server vs client components for optimal performance.', catColor: '#F7DF1E', catBg: 'rgba(247,223,30,0.15)', icon: '⚛️' },
];

const recentPosts = [
  { title: 'Getting Started with Docker for Beginners', date: 'Dec 12, 2025' },
  { title: 'CSS Grid vs Flexbox: When to Use Which', date: 'Dec 9, 2025' },
  { title: 'The Rise of Rust in Systems Programming', date: 'Dec 6, 2025' },
  { title: 'How to Build Your First Neural Network', date: 'Dec 3, 2025' },
];

const tags = ['Python', 'JavaScript', 'React', 'AI', 'Machine Learning', 'DevOps', 'Cybersecurity', 'Docker', 'Git', 'Laravel', 'Node.js', 'TypeScript', 'Career', 'Tutorial', 'Project'];

export default function Blog() {
  const sectionRef = useScrollAnimation();

  return (
    <div ref={sectionRef}>
      <section className="page-hero">
        <div className="gradient-orb orb-violet" style={{ width: 250, height: 250, top: '-5%', left: '15%' }} />
        <div style={{ position: 'relative', zIndex: 1 }}>
          <h1 className="scroll-animate" style={{ fontFamily: 'Orbitron', fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 900 }}>
            <span className="text-gradient">Tech Blog</span>
          </h1>
          <p className="scroll-animate" style={{ color: 'var(--text-muted)', fontSize: '1.1rem', marginTop: '0.75rem' }}>
            Insights, tutorials, and stories from the world of code
          </p>
        </div>
      </section>

      <section className="section">
        <div className="blog-layout">
          <div>
            {/* Featured */}
            <div className="blog-featured scroll-animate">
              <div className="blog-featured-thumb" style={{ background: featured.gradient }}>
                {featured.icon}
              </div>
              <div className="blog-featured-body">
                <span className="blog-card-category" style={{ background: featured.catBg, color: featured.catColor }}>{featured.category}</span>
                <div className="blog-featured-title">{featured.title}</div>
                <div className="blog-card-meta" style={{ marginBottom: '0.75rem' }}>
                  <span>{featured.date}</span>
                  <span>{featured.readTime}</span>
                </div>
                <div className="blog-featured-excerpt">{featured.excerpt}</div>
                <button className="btn-primary btn-sm" style={{ marginTop: '1rem' }}>Read Article →</button>
              </div>
            </div>

            {/* Grid */}
            <div className="blog-grid">
              {posts.map((post, i) => (
                <div key={i} className="blog-card blog-glow scroll-animate" style={{ transitionDelay: `${i * 0.05}s` }}>
                  <span className="blog-card-category" style={{ background: post.catBg, color: post.catColor }}>{post.category}</span>
                  <div className="blog-card-title">{post.title}</div>
                  <div className="blog-card-meta">
                    <span>{post.date}</span>
                    <span>{post.readTime}</span>
                  </div>
                  <div className="blog-card-excerpt">{post.excerpt}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="blog-sidebar">
            <div className="sidebar-card scroll-animate">
              <div className="sidebar-title">Recent Posts</div>
              {recentPosts.map((post, i) => (
                <div key={i} className="sidebar-post">
                  <div className="sidebar-post-title">{post.title}</div>
                  <div className="sidebar-post-date">{post.date}</div>
                </div>
              ))}
            </div>

            <div className="sidebar-card scroll-animate">
              <div className="sidebar-title">Categories</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {blogCategories.map((cat, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '8px 0', cursor: 'pointer' }}>
                    <span style={{ width: 8, height: 8, borderRadius: '50%', background: cat.color }} />
                    <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>{cat.name}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="sidebar-card scroll-animate">
              <div className="sidebar-title">Tags</div>
              <div className="tag-cloud">
                {tags.map((tag, i) => (
                  <span key={i} className="tag-cloud-item">{tag}</span>
                ))}
              </div>
            </div>

            <div className="sidebar-card scroll-animate" style={{ background: 'linear-gradient(135deg, rgba(0,212,255,0.1), rgba(123,47,255,0.1))' }}>
              <div className="sidebar-title">Newsletter</div>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '1rem', lineHeight: 1.5 }}>
                Get the latest articles delivered to your inbox weekly.
              </p>
              <input className="form-input" placeholder="your@email.com" style={{ marginBottom: '0.75rem' }} />
              <button className="btn-primary btn-sm" style={{ width: '100%' }}>Subscribe →</button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
