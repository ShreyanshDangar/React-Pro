import {
  FONT_OPTIONS,
  MAX_FONT_SCALE,
  MIN_FONT_SCALE,
  THEME_OPTIONS,
} from '../data/readerSettings';

function formatTimestamp(savedAt) {
  if (!savedAt) {
    return '';
  }

  try {
    return new Intl.DateTimeFormat(undefined, {
      dateStyle: 'medium',
      timeStyle: 'short',
    }).format(new Date(savedAt));
  } catch {
    return '';
  }
}

export default function SettingsPanel({
  isOpen,
  onClose,
  currentPage,
  bookmark,
  onSaveBookmark,
  onGoToBookmark,
  onRemoveBookmark,
  themeId,
  onThemeChange,
  fontId,
  onFontChange,
  fontScale,
  onDecreaseFont,
  onIncreaseFont,
}) {
  const bookmarkTimestamp = formatTimestamp(bookmark?.savedAt);
  const bookmarkOnCurrentPage = bookmark?.path === currentPage.path;

  return (
    <>
      <div
        className={`settings-overlay ${isOpen ? 'active' : ''}`}
        onClick={onClose}
        aria-hidden={!isOpen}
      />

      <aside
        className={`settings-panel ${isOpen ? 'active' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-hidden={!isOpen}
        aria-labelledby="settings-panel-title"
      >
        <div className="settings-panel-header">
          <div>
            <p className="drawer-eyebrow">Reader Controls</p>
            <h2 id="settings-panel-title">Settings</h2>
            <p className="drawer-subtitle">
              Tune the reading experience and save your place for later.
            </p>
          </div>

          <button
            type="button"
            className="drawer-close"
            onClick={onClose}
            aria-label="Close settings"
          >
            <span />
            <span />
          </button>
        </div>

        <section className="settings-section">
          <div className="settings-copy">
            <h3>Theme</h3>
            <p>Pick the study mood that feels easiest on your eyes.</p>
          </div>

          <div className="settings-grid settings-grid-themes">
            {THEME_OPTIONS.map((theme) => (
              <button
                key={theme.id}
                type="button"
                className={`settings-choice theme-choice ${
                  themeId === theme.id ? 'active' : ''
                }`}
                onClick={() => onThemeChange(theme.id)}
                style={{
                  '--choice-bg': theme.preview.background,
                  '--choice-text': theme.preview.text,
                  '--choice-muted': theme.preview.muted,
                  '--choice-swatch': theme.preview.swatch,
                }}
              >
                <span className="choice-swatch" />
                <span className="choice-body">
                  <strong>{theme.name}</strong>
                  <small>{theme.description}</small>
                </span>
              </button>
            ))}
          </div>
        </section>

        <section className="settings-section">
          <div className="settings-copy">
            <h3>Font</h3>
            <p>Switch between editorial, neutral, and code-forward reading styles.</p>
          </div>

          <div className="settings-grid">
            {FONT_OPTIONS.map((font) => (
              <button
                key={font.id}
                type="button"
                className={`settings-choice font-choice ${
                  fontId === font.id ? 'active' : ''
                }`}
                onClick={() => onFontChange(font.id)}
              >
                <span className="choice-body">
                  <strong>{font.name}</strong>
                  <small>{font.description}</small>
                </span>
              </button>
            ))}
          </div>
        </section>

        <section className="settings-section">
          <div className="settings-copy">
            <h3>Font Size</h3>
            <p>Increase or reduce reading scale across lessons and practice pages.</p>
          </div>

          <div className="font-scale-control">
            <button
              type="button"
              className="scale-btn"
              onClick={onDecreaseFont}
              disabled={fontScale <= MIN_FONT_SCALE}
              aria-label="Decrease font size"
            >
              -
            </button>

            <div className="font-scale-readout">
              <strong>{Math.round(fontScale * 100)}%</strong>
              <span>Applied to every route in React Pro.</span>
            </div>

            <button
              type="button"
              className="scale-btn"
              onClick={onIncreaseFont}
              disabled={fontScale >= MAX_FONT_SCALE}
              aria-label="Increase font size"
            >
              +
            </button>
          </div>
        </section>

        <section className="settings-section">
          <div className="settings-copy">
            <h3>Bookmark</h3>
            <p>Save the exact reading spot you want to resume from later.</p>
          </div>

          <div className="bookmark-card">
            <span className="bookmark-status">
              {bookmark ? 'Saved spot' : 'No bookmark set'}
            </span>
            <strong>{bookmark?.label ?? 'Pick a page, then save it here.'}</strong>
            <p>
              {bookmark
                ? `${bookmark.note}${bookmarkTimestamp ? ` • ${bookmarkTimestamp}` : ''}`
                : 'Use "Set Here" while viewing any lesson or the MCQ page to keep your place.'}
            </p>

            <div className="bookmark-current">
              <span>Current page</span>
              <strong>{currentPage.label}</strong>
            </div>
          </div>

          <div className="bookmark-actions">
            <button
              type="button"
              className="settings-action primary"
              onClick={onSaveBookmark}
            >
              {bookmarkOnCurrentPage ? 'Update Here' : 'Set Here'}
            </button>
            <button
              type="button"
              className="settings-action"
              onClick={onGoToBookmark}
              disabled={!bookmark}
            >
              Go To
            </button>
            <button
              type="button"
              className="settings-action"
              onClick={onRemoveBookmark}
              disabled={!bookmark}
            >
              Remove
            </button>
          </div>
        </section>
      </aside>
    </>
  );
}
