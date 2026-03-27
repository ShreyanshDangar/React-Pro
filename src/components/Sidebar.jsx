import { Link, useLocation } from 'react-router-dom';
import topics, { categories } from '../data/topics';

export default function Sidebar({ isOpen, onClose, installPrompt, onInstallClick }) {
  const location = useLocation();

  const grouped = categories.map((category) => ({
    ...category,
    topics: topics.filter((topic) => topic.category === category.id),
  }));

  return (
    <>
      <div
        className={`sidebar-overlay ${isOpen ? 'active' : ''}`}
        onClick={onClose}
        aria-hidden={!isOpen}
      />

      <aside
        id="site-navigation"
        className={`sidebar ${isOpen ? 'active' : ''}`}
        role="navigation"
        aria-hidden={!isOpen}
        aria-labelledby="navigation-sheet-title"
      >
        <div className="sidebar-shell">
          <div className="sidebar-hero">
            <div className="drawer-copy">
              <p className="drawer-eyebrow">Navigation</p>
              <h2 id="navigation-sheet-title">Course roadmap</h2>
              <p className="drawer-subtitle">
                Move through the syllabus from the same layout. The hamburger stays
                fixed as the open and close anchor.
              </p>
            </div>

            <div className="sidebar-shortcuts">
              <Link
                to="/"
                className={`sidebar-shortcut ${
                  location.pathname === '/' ? 'active' : ''
                }`}
                onClick={onClose}
              >
                <span className="sidebar-shortcut-icon" aria-hidden="true">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    width="20"
                    height="20"
                  >
                    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                    <polyline points="9 22 9 12 15 12 15 22" />
                  </svg>
                </span>
                <span className="sidebar-shortcut-copy">
                  <strong>Home</strong>
                  <span>Go back to the learning hub</span>
                </span>
              </Link>

              <Link
                to="/mcq"
                className={`sidebar-shortcut ${
                  location.pathname === '/mcq' ? 'active' : ''
                }`}
                onClick={onClose}
              >
                <span className="sidebar-shortcut-icon" aria-hidden="true">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    width="20"
                    height="20"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
                    <circle cx="12" cy="17" r="0.5" fill="currentColor" stroke="none" />
                  </svg>
                </span>
                <span className="sidebar-shortcut-copy">
                  <strong>Practice MCQs</strong>
                  <span>Open the quiz round directly</span>
                </span>
              </Link>
            </div>
          </div>

          <div className="sidebar-groups">
            {grouped.map((category) => (
              <section
                className="sidebar-category"
                key={category.id}
                style={{
                  '--category-color': category.color,
                  '--category-soft': `${category.color}14`,
                  '--category-border': `${category.color}36`,
                }}
              >
                <div className="sidebar-title-row">
                  <div className="sidebar-title">{category.label}</div>
                  <div className="sidebar-title-count">
                    {category.topics.length} lessons
                  </div>
                </div>

                <div className="sidebar-topic-list">
                  {category.topics.map((topic) => {
                    const globalIdx = topics.indexOf(topic) + 1;
                    const path = `/learn/${topic.id}`;

                    return (
                      <Link
                        key={topic.id}
                        to={path}
                        className={`sidebar-link ${
                          location.pathname === path ? 'active' : ''
                        }`}
                        onClick={onClose}
                      >
                        <span className="topic-num">
                          {String(globalIdx).padStart(2, '0')}
                        </span>

                        <span className="sidebar-link-copy">
                          <span className="sidebar-link-title">{topic.title}</span>
                          <span className="sidebar-link-desc">{topic.description}</span>
                          <span className="sidebar-link-tags" aria-hidden="true">
                            {topic.tags.slice(0, 3).map((tag) => (
                              <span className="sidebar-tag" key={tag}>
                                {tag}
                              </span>
                            ))}
                          </span>
                        </span>
                      </Link>
                    );
                  })}
                </div>
              </section>
            ))}
          </div>

          {installPrompt && (
            <div className="sidebar-install">
              <button
                type="button"
                className="sidebar-install-btn"
                onClick={() => {
                  onInstallClick();
                  onClose();
                }}
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  width="20"
                  height="20"
                >
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
                Install App
              </button>
            </div>
          )}
        </div>
      </aside>
    </>
  );
}
