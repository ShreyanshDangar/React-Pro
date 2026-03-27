import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import mcqData from '../data/mcqData';
import QuizIllustration from '../components/QuizIllustration';
import PageTransition from '../components/PageTransition';

const letters = ['A', 'B', 'C', 'D'];
const ALL_CATEGORY = 'ALL';

const CATEGORY_COLORS = {
  ALL: 'var(--accent)',
  Fundamentals: 'var(--cat-fundamentals)',
  'React Hooks': 'var(--cat-hooks)',
  Hooks: 'var(--cat-hooks)',
  Components: 'var(--cat-components)',
  Advanced: 'var(--cat-advanced)',
  'State Management': 'var(--cat-state)',
};

export default function MCQ() {
  const allCategories = [ALL_CATEGORY, ...mcqData.map((category) => category.category)];
  const [activeCategory, setActiveCategory] = useState(ALL_CATEGORY);
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 400);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const themeColor = CATEGORY_COLORS[activeCategory] || 'var(--accent)';

  const questions =
    activeCategory === ALL_CATEGORY
      ? mcqData.flatMap((category) =>
          category.questions.map((question, questionIndex) => ({
            ...question,
            questionId: `${category.category}-${questionIndex}`,
            sourceCategory: category.category,
          }))
        )
      : (mcqData.find((category) => category.category === activeCategory)?.questions ?? []).map(
          (question, questionIndex) => ({
            ...question,
            questionId: `${activeCategory}-${questionIndex}`,
            sourceCategory: activeCategory,
          })
        );

  const progressLabel =
    activeCategory === ALL_CATEGORY
      ? `${questions.length} questions across all ${mcqData.length} tracks`
      : `${questions.length} questions in ${activeCategory}`;

  return (
    <PageTransition>
    <div className="mcq-page">
      <section className="mcq-hero">
        <div className="mcq-hero-copy">
          <span className="page-eyebrow">Practice Mode</span>
          <h1>Practice Questions</h1>
          <p className="mcq-subtitle">
            Test your understanding of React concepts with curated multiple-choice
            questions. Start in All mode for a full mixed set or jump into a single track.
          </p>
          <p className="mcq-progress">{progressLabel}</p>
        </div>

        <QuizIllustration className="mcq-hero-art" />
      </section>

      <div className="mcq-category-tabs" role="tablist" aria-label="Practice categories">
        {allCategories.map((category) => (
          <button
            key={category}
            type="button"
            role="tab"
            aria-selected={activeCategory === category}
            className={`mcq-tab ${activeCategory === category ? 'active' : ''}`}
            onClick={() => setActiveCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>

      {questions.map((question, questionIndex) => (
        <QuestionBlock
          key={question.questionId}
          question={question}
          index={questionIndex}
          showCategory={activeCategory === ALL_CATEGORY}
        />
      ))}

      <button
        type="button"
        className={`mcq-back-to-top ${showBackToTop ? 'visible' : ''}`}
        onClick={scrollToTop}
        aria-label="Back to top"
        style={{ '--btt-color': themeColor }}
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="20" height="20">
          <polyline points="18 15 12 9 6 15" />
        </svg>
      </button>
    </div>
    </PageTransition>
  );
}

function QuestionBlock({ question, index, showCategory }) {
  const [selected, setSelected] = useState(null);
  const answered = selected !== null;

  const handleSelect = (optionIndex) => {
    if (answered) {
      return;
    }

    setSelected(optionIndex);
  };

  const isCorrect = selected === question.correct;

  return (
    <div className="question-block">
      {showCategory ? (
        <div className="question-meta">
          <span className="cat-badge" data-category={question.sourceCategory}>
            {question.sourceCategory}
          </span>
        </div>
      ) : null}

      <div className="question-text">
        {index + 1}. {question.question}
      </div>

      <div className="options-list">
        {question.options.map((option, optionIndex) => {
          let className = 'option';

          if (answered) {
            className += ' answered';

            if (optionIndex === selected) {
              className += ' selected';
            }

            if (optionIndex === question.correct) {
              className += ' correct';
            }

            if (optionIndex === selected && selected !== question.correct) {
              className += ' incorrect';
            }
          }

          return (
            <button
              key={optionIndex}
              type="button"
              className={className}
              onClick={() => handleSelect(optionIndex)}
              disabled={answered}
              aria-pressed={selected === optionIndex}
            >
              <span className="option-letter">{letters[optionIndex]}</span>
              <span>{option}</span>
            </button>
          );
        })}
      </div>

      <AnimatePresence>
        {answered && (
          <motion.div
            initial={{ opacity: 0, height: 0, marginTop: 0 }}
            animate={{
              opacity: 1,
              height: 'auto',
              marginTop: '1rem',
              transition: { duration: 0.35, ease: [0.25, 1, 0.5, 1] },
            }}
            exit={{ opacity: 0, height: 0, marginTop: 0 }}
            style={{ overflow: 'hidden' }}
            className={`explanation show ${
              isCorrect ? 'correct-explanation' : 'incorrect-explanation'
            }`}
          >
            <strong>{isCorrect ? 'Correct!' : 'Not quite.'}</strong>{' '}
            {question.explanation}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
