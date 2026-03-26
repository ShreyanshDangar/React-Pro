import { Link, useLocation } from 'react-router-dom';

export default function Navbar({
  currentPage,
  onToggleSidebar,
  onToggleSettings,
  onBookmarkAction,
  hasBookmark,
  isBookmarked,
  bookmarkTag,
  sidebarOpen,
  settingsOpen,
}) {
  const location = useLocation();
  const isHome = location.pathname === '/';
  const onMcqPage = location.pathname === '/mcq';

  return (
    <nav className="nav">
      <div className="nav-left">
        <Link to="/" className="nav-brand">
          <span className="accent">React</span> Pro
        </Link>

        <div className="nav-context" aria-live="polite">
          <span className="nav-context-note">{currentPage.navNote}</span>
          <strong className="nav-context-label">
            <span className="nav-context-full">{currentPage.label}</span>
            <span className="nav-context-short">{currentPage.shortLabel}</span>
          </strong>
        </div>
      </div>

      <div className="nav-right">
        {!isHome && (
          <Link
            to="/mcq"
            className={`nav-btn nav-panel-btn ${onMcqPage ? 'is-active' : ''}`}
            title="Practice MCQs"
            aria-label="Practice MCQs"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10" />
              <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
              <circle cx="12" cy="17" r="0.5" fill="currentColor" stroke="none" />
            </svg>
          </Link>
        )}

        <button
          type="button"
          className={`nav-btn nav-panel-btn bookmark-btn ${isBookmarked ? 'is-active' : ''} ${
            hasBookmark ? 'has-bookmark' : ''
          }`}
          onClick={onBookmarkAction}
          title={hasBookmark ? 'Resume saved bookmark' : 'Save bookmark at this spot'}
          aria-label={hasBookmark ? 'Resume saved bookmark' : 'Save bookmark at this spot'}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M6 3h12a1 1 0 0 1 1 1v17l-7-4-7 4V4a1 1 0 0 1 1-1z" />
          </svg>
          {bookmarkTag ? <span className="nav-btn-tag">{bookmarkTag}</span> : null}
        </button>

        <button
          type="button"
          className={`nav-btn nav-panel-btn ${settingsOpen ? 'is-active' : ''}`}
          onClick={onToggleSettings}
          title="Open settings"
          aria-label="Open settings"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="3" />
            <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09a1.65 1.65 0 0 0-1-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.6 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09a1.65 1.65 0 0 0 1.51-1 1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 8.92 4.6a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82 1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
          </svg>
        </button>

        <button
          type="button"
          className={`hamburger nav-btn nav-panel-btn ${sidebarOpen ? 'active' : ''}`}
          onClick={onToggleSidebar}
          title="Navigation"
          aria-label={sidebarOpen ? 'Close navigation' : 'Open navigation'}
          aria-expanded={sidebarOpen}
          aria-controls="site-navigation"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </nav>
  );
}
