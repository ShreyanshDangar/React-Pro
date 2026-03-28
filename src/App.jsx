import { Suspense, lazy, useEffect, useMemo, useRef, useState } from 'react';
import {
  Routes,
  Route,
  matchPath,
  useLocation,
  useNavigate,
} from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Navbar from './components/Navbar';
import BookmarkIndicator from './components/BookmarkIndicator';
import Sidebar from './components/Sidebar';
import ScrollProgress from './components/ScrollProgress';
import SettingsPanel from './components/SettingsPanel';
import {
  DEFAULT_FONT_ID,
  DEFAULT_FONT_SCALE,
  DEFAULT_THEME_ID,
  FONT_OPTIONS,
  MAX_FONT_SCALE,
  MIN_FONT_SCALE,
  THEME_OPTIONS,
} from './data/readerSettings';
import { HomeLayout, InternalLayout } from './components/PageLayout';
import topics from './data/topics';

const Home = lazy(() => import('./pages/Home'));
const LearnTopic = lazy(() => import('./pages/LearnTopic'));
const MCQ = lazy(() => import('./pages/MCQ'));

const STORAGE_KEYS = {
  theme: 'react-pro-theme',
  font: 'react-pro-font',
  fontScale: 'react-pro-font-scale',
  bookmark: 'react-pro-bookmark',
};
const NAV_HEIGHT = 64;

function readStorage(key, fallback) {
  if (typeof window === 'undefined') {
    return fallback;
  }

  try {
    const value = window.localStorage.getItem(key);
    return value ?? fallback;
  } catch {
    return fallback;
  }
}

function readNumberStorage(key, fallback, min, max) {
  const value = Number(readStorage(key, fallback));

  if (Number.isNaN(value)) {
    return fallback;
  }

  return Math.min(max, Math.max(min, value));
}

function readJsonStorage(key, fallback) {
  const value = readStorage(key, null);

  if (!value) {
    return fallback;
  }

  try {
    return JSON.parse(value);
  } catch {
    return fallback;
  }
}

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function getBookmarkIndicatorTop() {
  if (typeof window === 'undefined') {
    return 140;
  }

  return clamp(window.innerHeight * 0.36, NAV_HEIGHT + 28, window.innerHeight - 84);
}

function getBookmarkResumeOffset() {
  if (typeof window === 'undefined') {
    return 120;
  }

  return clamp(window.innerHeight * 0.18, 92, 148);
}

function describeBookmarkPosition(position) {
  if (typeof window === 'undefined') {
    return 'Saved for later review';
  }

  const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
  const progress = Math.round((Math.min(position, maxScroll) / maxScroll) * 100);

  if (progress <= 8) {
    return 'Saved near the start of this page';
  }

  if (progress >= 92) {
    return 'Saved near the end of this page';
  }

  return `Saved around ${progress}% through this page`;
}

function smoothScrollTo(targetTop) {
  if (typeof window === 'undefined') {
    return;
  }

  const prefersReducedMotion = window.matchMedia(
    '(prefers-reduced-motion: reduce)'
  ).matches;

  if (prefersReducedMotion) {
    window.scrollTo({ top: targetTop, behavior: 'auto' });
    return;
  }

  const startTop = window.scrollY;
  const distance = targetTop - startTop;

  if (Math.abs(distance) < 1) {
    return;
  }

  const duration = 520;
  let startTime = null;

  const tick = (timestamp) => {
    if (startTime === null) {
      startTime = timestamp;
    }

    const progress = Math.min((timestamp - startTime) / duration, 1);
    const eased =
      progress < 0.5
        ? 4 * progress * progress * progress
        : 1 - Math.pow(-2 * progress + 2, 3) / 2;

    window.scrollTo(0, startTop + distance * eased);

    if (progress < 1) {
      window.requestAnimationFrame(tick);
    }
  };

  window.requestAnimationFrame(tick);
}

function RouteLoader() {
  return <div className="route-loading">Loading content...</div>;
}

export default function App() {
  const location = useLocation();
  const navigate = useNavigate();

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [themeId, setThemeId] = useState(() =>
    readStorage(STORAGE_KEYS.theme, DEFAULT_THEME_ID)
  );
  const [fontId, setFontId] = useState(() =>
    readStorage(STORAGE_KEYS.font, DEFAULT_FONT_ID)
  );
  const [fontScale, setFontScale] = useState(() =>
    readNumberStorage(
      STORAGE_KEYS.fontScale,
      DEFAULT_FONT_SCALE,
      MIN_FONT_SCALE,
      MAX_FONT_SCALE
    )
  );
  const [bookmark, setBookmark] = useState(() =>
    readJsonStorage(STORAGE_KEYS.bookmark, null)
  );
  const [pendingBookmark, setPendingBookmark] = useState(null);
  const [bookmarkToast, setBookmarkToast] = useState('');
  const [installPrompt, setInstallPrompt] = useState(null);
  const bookmarkToastTimeoutRef = useRef(null);

  const currentPage = useMemo(() => {
    if (location.pathname === '/') {
      return {
        path: '/',
        label: 'Home',
        shortLabel: 'Home',
        navNote: 'React learning hub',
        note: 'Landing page',
      };
    }

    if (location.pathname === '/mcq') {
      return {
        path: '/mcq',
        label: 'Practice Questions',
        shortLabel: 'MCQs',
        navNote: 'Quiz practice',
        note: 'Practice question bank',
      };
    }

    const topicMatch = matchPath('/learn/:topicId', location.pathname);

    if (topicMatch?.params.topicId) {
      const topicIndex = topics.findIndex(
        (topic) => topic.id === topicMatch.params.topicId
      );
      const topic = topics[topicIndex];

      if (topic) {
        return {
          path: location.pathname,
          label: topic.title,
          shortLabel: topic.shortTitle ?? topic.title,
          navNote: `Topic ${String(topicIndex + 1).padStart(2, '0')} • ${topic.category}`,
          note: `${topic.category} lesson`,
        };
      }
    }

    return {
      path: location.pathname,
      label: 'Current page',
      shortLabel: 'Page',
      navNote: 'Study view',
      note: 'Study view',
    };
  }, [location.pathname]);

  const selectedTheme =
    THEME_OPTIONS.find((theme) => theme.id === themeId) ?? THEME_OPTIONS[0];
  const selectedFont =
    FONT_OPTIONS.find((font) => font.id === fontId) ?? FONT_OPTIONS[0];
  const currentPath = location.pathname;
  const hasBookmark = Boolean(bookmark?.path);
  const isBookmarked = bookmark?.path === currentPath;
  const bookmarkTag = !hasBookmark ? null : isBookmarked ? 'Saved' : 'Resume';

  const closePanels = () => {
    setSidebarOpen(false);
    setSettingsOpen(false);
  };

  const toggleSidebar = () => {
    setSettingsOpen(false);
    setSidebarOpen((prev) => !prev);
  };

  const toggleSettings = () => {
    setSidebarOpen(false);
    setSettingsOpen((prev) => !prev);
  };

  const flashBookmarkToast = (message) => {
    if (bookmarkToastTimeoutRef.current) {
      window.clearTimeout(bookmarkToastTimeoutRef.current);
    }

    setBookmarkToast(message);
    bookmarkToastTimeoutRef.current = window.setTimeout(() => {
      setBookmarkToast('');
      bookmarkToastTimeoutRef.current = null;
    }, 2200);
  };

  const saveBookmarkAtSpot = (indicatorTop = getBookmarkIndicatorTop()) => {
    const position = Math.max(0, window.scrollY + indicatorTop - NAV_HEIGHT);

    setBookmark({
      path: currentPath,
      label: currentPage.label,
      shortLabel: currentPage.shortLabel,
      note: `${currentPage.note} • ${describeBookmarkPosition(position)}`,
      position,
      savedAt: new Date().toISOString(),
    });
  };

  const handleSaveBookmark = (indicatorTop) => {
    saveBookmarkAtSpot(indicatorTop);
    flashBookmarkToast('Bookmark saved');
  };

  const handleRemoveBookmark = () => {
    setBookmark(null);
    setPendingBookmark(null);
    flashBookmarkToast('Bookmark removed');
  };

  const scrollToSavedBookmark = (bookmarkToUse) => {
    if (
      !bookmarkToUse ||
      bookmarkToUse.path !== location.pathname ||
      typeof bookmarkToUse.position !== 'number'
    ) {
      return;
    }

    const targetTop = Math.max(
      0,
      bookmarkToUse.position - NAV_HEIGHT - getBookmarkResumeOffset()
    );

    smoothScrollTo(targetTop);
    flashBookmarkToast('Returning to your saved spot');
  };

  const handleGoToBookmark = () => {
    if (!bookmark?.path) {
      return;
    }

    closePanels();

    if (bookmark.path !== location.pathname) {
      setPendingBookmark(bookmark);
      navigate(bookmark.path);
      return;
    }

    scrollToSavedBookmark(bookmark);
  };

  const handleBookmarkAction = () => {
    if (!bookmark?.path) {
      handleSaveBookmark();
      return;
    }

    handleGoToBookmark();
  };

  const handleRepositionBookmark = (indicatorTop) => {
    if (!bookmark || bookmark.path !== location.pathname) {
      return;
    }

    handleSaveBookmark(indicatorTop);
  };

  const handleFontScaleChange = (delta) => {
    setFontScale((prev) =>
      Math.min(MAX_FONT_SCALE, Math.max(MIN_FONT_SCALE, prev + delta))
    );
  };

  useEffect(() => {
    if (bookmark?.path && bookmark.path.includes('#')) {
      setBookmark((prev) =>
        prev ? { ...prev, path: prev.path.split('#')[0] || prev.path } : prev
      );
    }
  }, [bookmark]);

  useEffect(() => {
    if (pendingBookmark?.path === location.pathname) {
      return;
    }

    window.scrollTo({ top: 0, behavior: 'auto' });
  }, [location.pathname, pendingBookmark]);

  useEffect(() => {
    setSidebarOpen(false);
    setSettingsOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (!pendingBookmark || pendingBookmark.path !== location.pathname) {
      return undefined;
    }

    const timeoutId = window.setTimeout(() => {
      scrollToSavedBookmark(pendingBookmark);
      setPendingBookmark(null);
    }, 120);

    return () => window.clearTimeout(timeoutId);
  }, [location.pathname, pendingBookmark]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setSidebarOpen(false);
        setSettingsOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    const root = document.documentElement;

    Object.entries(selectedTheme.vars).forEach(([name, value]) => {
      root.style.setProperty(name, value);
    });
    root.style.setProperty('--reading-font', selectedFont.value);
    root.style.setProperty('--font-scale', String(fontScale));

    const themeColorMeta = document.querySelector('meta[name="theme-color"]');
    if (themeColorMeta && selectedTheme.vars['--accent']) {
      themeColorMeta.setAttribute('content', selectedTheme.vars['--accent']);
    }
  }, [fontScale, selectedFont, selectedTheme]);

  useEffect(() => {
    document.body.style.overflow = sidebarOpen || settingsOpen ? 'hidden' : '';

    return () => {
      document.body.style.overflow = '';
    };
  }, [settingsOpen, sidebarOpen]);

  useEffect(() => {
    return () => {
      if (bookmarkToastTimeoutRef.current) {
        window.clearTimeout(bookmarkToastTimeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(STORAGE_KEYS.theme, themeId);
    }
  }, [themeId]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(STORAGE_KEYS.font, fontId);
    }
  }, [fontId]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(STORAGE_KEYS.fontScale, String(fontScale));
    }
  }, [fontScale]);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    if (bookmark) {
      window.localStorage.setItem(STORAGE_KEYS.bookmark, JSON.stringify(bookmark));
      return;
    }

    window.localStorage.removeItem(STORAGE_KEYS.bookmark);
  }, [bookmark]);

  useEffect(() => {
    // Check for early-captured prompt (from index.html script)
    if (window.__pwaInstallPrompt) {
      setInstallPrompt(window.__pwaInstallPrompt);
      window.__pwaInstallPrompt = null;
    }

    const handler = (event) => {
      event.preventDefault();
      setInstallPrompt(event);
    };

    window.addEventListener('beforeinstallprompt', handler);

    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const handleInstallClick = async () => {
    if (!installPrompt) return;

    await installPrompt.prompt();
    const { outcome } = await installPrompt.userChoice;
    if (outcome === 'accepted' || outcome === 'dismissed') {
      setInstallPrompt(null);
    }
  };

  return (
    <>
      <ScrollProgress />
      <Navbar
        currentPage={currentPage}
        onToggleSidebar={toggleSidebar}
        onToggleSettings={toggleSettings}
        onBookmarkAction={handleBookmarkAction}
        hasBookmark={hasBookmark}
        isBookmarked={isBookmarked}
        bookmarkTag={bookmarkTag}
        sidebarOpen={sidebarOpen}
        settingsOpen={settingsOpen}
      />
      {isBookmarked && typeof bookmark?.position === 'number' ? (
        <BookmarkIndicator
          bookmark={bookmark}
          onReposition={handleRepositionBookmark}
        />
      ) : null}
      <Sidebar
        isOpen={sidebarOpen}
        onClose={closePanels}
        installPrompt={installPrompt}
        onInstallClick={handleInstallClick}
      />
      <SettingsPanel
        isOpen={settingsOpen}
        onClose={closePanels}
        currentPage={currentPage}
        bookmark={bookmark}
        onSaveBookmark={handleSaveBookmark}
        onGoToBookmark={handleGoToBookmark}
        onRemoveBookmark={handleRemoveBookmark}
        themeId={themeId}
        onThemeChange={setThemeId}
        fontId={fontId}
        onFontChange={setFontId}
        fontScale={fontScale}
        onDecreaseFont={() => handleFontScaleChange(-0.1)}
        onIncreaseFont={() => handleFontScaleChange(0.1)}
      />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route element={<HomeLayout />}>
            <Route
              path="/"
              element={
                <Suspense fallback={<RouteLoader />}>
                  <Home />
                </Suspense>
              }
            />
          </Route>
          <Route element={<InternalLayout />}>
            <Route
              path="/learn/:topicId"
              element={
                <Suspense fallback={<RouteLoader />}>
                  <LearnTopic />
                </Suspense>
              }
            />
            <Route
              path="/mcq"
              element={
                <Suspense fallback={<RouteLoader />}>
                  <MCQ />
                </Suspense>
              }
            />
          </Route>
        </Routes>
      </AnimatePresence>
      <AnimatePresence>
        {bookmarkToast ? (
          <motion.div
            key="bookmark-toast"
            className="bookmark-toast show"
            initial={{ opacity: 0, y: 16, x: '-50%', scale: 0.96 }}
            animate={{ opacity: 1, y: 0, x: '-50%', scale: 1 }}
            exit={{ opacity: 0, y: 8, x: '-50%', scale: 0.96 }}
            transition={{
              type: 'spring',
              stiffness: 500,
              damping: 30,
            }}
          >
            {bookmarkToast}
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
