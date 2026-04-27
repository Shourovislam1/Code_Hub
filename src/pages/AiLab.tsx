import { useScrollAnimation } from '../hooks/useScrollAnimation';

const aiTools = [
  { name: 'ChatGPT', desc: 'Advanced AI language model for code generation, debugging, and learning assistance. Get instant help with programming questions.', useCase: 'Code generation, debugging, learning', icon: '🤖', gradient: 'linear-gradient(135deg, #10A37F, #1A1A2E)' },
  { name: 'GitHub Copilot', desc: 'AI pair programmer that suggests code completions and entire functions in your editor in real-time.', useCase: 'Code completion, refactoring', icon: '✈️', gradient: 'linear-gradient(135deg, #333, #7B2FFF)' },
  { name: 'Midjourney', desc: 'AI image generation tool for creating stunning visuals, UI mockups, and design assets for web projects.', useCase: 'UI design, image generation', icon: '🎨', gradient: 'linear-gradient(135deg, #FF3D71, #7B2FFF)' },
  { name: 'Hugging Face', desc: 'Open-source platform with thousands of pre-trained AI models for NLP, computer vision, and audio tasks.', useCase: 'Model deployment, NLP tasks', icon: '🤗', gradient: 'linear-gradient(135deg, #FFD21E, #FF9D00)' },
  { name: 'Google Colab', desc: 'Cloud-based Jupyter notebook environment with free GPU access for training machine learning models.', useCase: 'ML training, data analysis', icon: '☁️', gradient: 'linear-gradient(135deg, #4285F4, #34A853)' },
  { name: 'TensorFlow Playground', desc: 'Interactive visualization of neural networks. Experiment with different architectures and see results instantly.', useCase: 'Learning neural networks', icon: '🧠', gradient: 'linear-gradient(135deg, #FF6F00, #FF8F00)' },
  { name: 'Kaggle', desc: 'The world\'s largest data science community with datasets, competitions, and notebooks for hands-on ML practice.', useCase: 'Competitions, datasets, learning', icon: '📊', gradient: 'linear-gradient(135deg, #20BEFF, #0D1520)' },
];

const studentProjects = [
  { title: 'Sentiment Analysis Bot', desc: 'Real-time Twitter sentiment analyzer using BERT and Flask API.', tech: ['Python', 'BERT', 'Flask'], author: 'Ahmed R.', gradient: 'linear-gradient(135deg, #7B2FFF, #FF3D71)' },
  { title: 'AI Music Generator', desc: 'Generates original music compositions using LSTM neural networks.', tech: ['Python', 'TensorFlow', 'MIDI'], author: 'Sarah C.', gradient: 'linear-gradient(135deg, #00D4FF, #7B2FFF)' },
  { title: 'Smart Study Planner', desc: 'AI-powered study schedule optimizer using reinforcement learning.', tech: ['Python', 'OpenAI', 'React'], author: 'Maria S.', gradient: 'linear-gradient(135deg, #FF3D71, #FFD700)' },
  { title: 'Plant Disease Detector', desc: 'Computer vision model identifying plant diseases from leaf images.', tech: ['Python', 'CNN', 'OpenCV'], author: 'Karim H.', gradient: 'linear-gradient(135deg, #34A853, #00D4FF)' },
];

export default function AiLab() {
  const sectionRef = useScrollAnimation();

  return (
    <div ref={sectionRef}>
      <section className="ai-hero">
        <div className="ai-neural-bg">
          <svg width="100%" height="100%" viewBox="0 0 800 400" preserveAspectRatio="xMidYMid slice">
            {/* Neural network visualization */}
            {[30, 130, 230, 330, 430, 530, 630, 730].map((x, i) => (
              <g key={`col${i}`}>
                {[80, 160, 240, 320].map((y, j) => (
                  <g key={`node${i}-${j}`}>
                    <circle cx={x} cy={y} r="4" fill="var(--primary)" opacity="0.6">
                      <animate attributeName="r" values="4;7;4" dur={`${2 + Math.random() * 2}s`} repeatCount="indefinite" />
                      <animate attributeName="opacity" values="0.3;0.8;0.3" dur={`${2 + Math.random() * 2}s`} repeatCount="indefinite" />
                    </circle>
                    {i < 7 && [80, 160, 240, 320].map((y2, k) => (
                      <line key={`line${i}-${j}-${k}`} x1={x} y1={y} x2={x + 100} y2={y2} stroke="var(--primary)" strokeWidth="0.5" opacity="0.15" />
                    ))}
                  </g>
                ))}
              </g>
            ))}
          </svg>
        </div>
        
        <div className="gradient-orb orb-cyan" style={{ width: 300, height: 300, top: '-5%', right: '5%' }} />
        <div className="gradient-orb orb-violet" style={{ width: 200, height: 200, bottom: '5%', left: '10%' }} />
        
        <div style={{ position: 'relative', zIndex: 1 }}>
          <h1 className="scroll-animate" style={{ fontFamily: 'Orbitron', fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 900 }}>
            <span className="text-gradient">AI Laboratory</span>
          </h1>
          <p className="scroll-animate" style={{ color: 'var(--text-muted)', fontSize: '1.1rem', marginTop: '0.75rem', maxWidth: 600, margin: '0.75rem auto 0' }}>
            Explore cutting-edge AI tools and resources. Build intelligent applications with the power of artificial intelligence.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="scroll-animate text-center">
          <h2 className="section-heading" style={{ margin: '0 auto 0.5rem' }}>AI Tools & Resources</h2>
          <p className="section-subheading" style={{ margin: '0 auto 3rem' }}>Master the tools shaping the future of development.</p>
        </div>

        <div className="ai-tools-grid">
          {aiTools.map((tool, i) => (
            <div key={i} className="ai-tool-card ai-tool-glow scroll-animate" style={{ transitionDelay: `${i * 0.05}s` }}>
              <div className="ai-tool-icon" style={{ background: tool.gradient }}>
                {tool.icon}
              </div>
              <div className="ai-tool-name">{tool.name}</div>
              <div className="ai-tool-desc">{tool.desc}</div>
              <div className="ai-tool-use-case">Use case: {tool.useCase}</div>
              <button className="btn-secondary btn-sm">Learn More →</button>
            </div>
          ))}
        </div>
      </section>

      <section className="section" style={{ background: 'var(--bg-surface)', maxWidth: 'none', paddingLeft: 'calc((100% - 1400px) / 2 + 2rem)', paddingRight: 'calc((100% - 1400px) / 2 + 2rem)' }}>
        <div className="scroll-animate text-center">
          <h2 className="section-heading" style={{ margin: '0 auto 0.5rem' }}>AI Projects by Students</h2>
          <p className="section-subheading" style={{ margin: '0 auto 3rem' }}>Real AI applications built by our community members.</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
          {studentProjects.map((project, i) => (
            <div key={i} className="glass-card scroll-animate" style={{ padding: '1.5rem', transitionDelay: `${i * 0.05}s` }}>
              <div style={{ height: 120, borderRadius: 12, overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2.5rem', background: project.gradient, marginBottom: '1rem' }}>
                🧠
              </div>
              <div style={{ fontFamily: 'DM Sans', fontSize: '1.1rem', fontWeight: 700, color: 'var(--text)', marginBottom: '0.5rem' }}>{project.title}</div>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.5, marginBottom: '0.75rem' }}>{project.desc}</p>
              <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '0.75rem' }}>
                {project.tech.map((t, j) => <span key={j} className="tech-pill">{t}</span>)}
              </div>
              <div style={{ fontSize: '0.8rem', color: 'var(--primary)' }}>by {project.author}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
