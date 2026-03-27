import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import topics from '../data/topics';
import QuizIllustration from '../components/QuizIllustration';
import PageTransition from '../components/PageTransition';

const stagger = {
  animate: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 1, 0.5, 1] },
  },
};

export default function Home() {
  return (
    <PageTransition><>
      <section className="hero">
        <div className="hero-copy">
          <span className="page-eyebrow">React Pro Curriculum</span>
          <h1>
            <span className="accent">React</span> Development Mastery
          </h1>
          <p>
            A comprehensive journey from zero to production-ready React
            applications. Learn by understanding, not just copying code.
          </p>
          <div className="hero-meta">
            <span>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
              </svg>
              {topics.length} Topics
            </span>
            <span>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="4" width="18" height="18" rx="2" />
                <line x1="16" y1="2" x2="16" y2="6" />
                <line x1="8" y1="2" x2="8" y2="6" />
                <line x1="3" y1="10" x2="21" y2="10" />
              </svg>
              Beginner Friendly
            </span>
            <span>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
              </svg>
              Hands-on Examples
            </span>
          </div>

          <div className="quick-links">
            <Link to={`/learn/${topics[0].id}`} className="quick-link">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polygon points="5 3 19 12 5 21 5 3" />
              </svg>
              Start Learning
            </Link>
            <Link to="/mcq" className="quick-link">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
                <circle cx="12" cy="17" r="0.5" fill="currentColor" stroke="none" />
              </svg>
              Practice MCQs
            </Link>
          </div>
        </div>

        <aside className="hero-quiz-card">
          <div className="hero-quiz-top">
            <span className="hero-quiz-pill">Quiz Lab</span>
            <Link to="/mcq" className="hero-quiz-btn">
              Open Practice
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="14" height="14">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </Link>
          </div>

          <QuizIllustration className="hero-quiz-art" />

          <div className="hero-quiz-copy">
            <h2>Built-in revision that actually looks intentional.</h2>
            <p>
              Mix all topics together by default or drill into one track at a
              time with focused questions and instant explanations.
            </p>
          </div>
        </aside>
      </section>

      <h2 className="section-title">Course Curriculum</h2>

      <motion.div
        className="topic-grid"
        variants={stagger}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, margin: '-40px' }}
      >
        {topics.map((topic, index) => (
          <motion.div key={topic.id} variants={fadeUp}>
            <Link to={`/learn/${topic.id}`} className="topic-card">
              <span className="card-num">
                Topic {String(index + 1).padStart(2, '0')}
              </span>
              <h3>{topic.title}</h3>
              <p>{topic.description}</p>
              <div className="tags">
                {topic.tags.map((tag) => (
                  <span className="tag" key={tag}>
                    {tag}
                  </span>
                ))}
              </div>
            </Link>
          </motion.div>
        ))}
      </motion.div>

      <div
        className="cta-box"
        style={{ margin: '0 1.5rem 3rem', maxWidth: 'calc(100% - 3rem)' }}
      >
        <h4>Ready to Begin?</h4>
        <p>
          Start your React development journey with Topic 1 — understanding what
          React is and why it exists.
        </p>
        <Link to={`/learn/${topics[0].id}`} className="cta-btn">
          Start Learning
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            width="20"
            height="20"
          >
            <line x1="5" y1="12" x2="19" y2="12" />
            <polyline points="12 5 19 12 12 19" />
          </svg>
        </Link>
      </div>
    </></PageTransition>
  );
}
