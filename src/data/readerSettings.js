export const THEME_OPTIONS = [
  {
    id: 'sand',
    name: 'Sand',
    description: 'Warm paper tones for long study sessions.',
    preview: {
      background: '#f4e6d4',
      text: '#7b491f',
      muted: '#9d754c',
      swatch:
        'linear-gradient(135deg, rgba(255, 211, 147, 0.95), rgba(200, 121, 65, 0.95))',
    },
    vars: {
      '--bg': '#f5efe6',
      '--bg-card': '#ede4d4',
      '--bg-code': '#2d2a24',
      '--text': '#3a3530',
      '--text-muted': '#8a7e72',
      '--accent': '#c87941',
      '--accent-soft': 'rgba(200, 121, 65, 0.12)',
      '--accent-hover': '#b06830',
      '--selection-bg': 'rgba(200, 121, 65, 0.28)',
      '--selection-text': '#2f2114',
      '--border': 'rgba(0, 0, 0, 0.08)',
      '--shadow': '0 2px 12px rgba(0, 0, 0, 0.06)',
      '--shadow-hover': '0 8px 24px rgba(0, 0, 0, 0.1)',
    },
  },
  {
    id: 'cloud',
    name: 'Cloud',
    description: 'Cool daylight contrast with soft blue accents.',
    preview: {
      background: '#dbe7f8',
      text: '#4b6287',
      muted: '#6f85a9',
      swatch:
        'linear-gradient(135deg, rgba(138, 180, 255, 0.95), rgba(73, 107, 173, 0.95))',
    },
    vars: {
      '--bg': '#f4f7fb',
      '--bg-card': '#e1e8f5',
      '--bg-code': '#233243',
      '--text': '#2f3947',
      '--text-muted': '#6b7d94',
      '--accent': '#5d82c1',
      '--accent-soft': 'rgba(93, 130, 193, 0.14)',
      '--accent-hover': '#476aa7',
      '--selection-bg': 'rgba(93, 130, 193, 0.28)',
      '--selection-text': '#1d2a39',
      '--border': 'rgba(52, 74, 109, 0.12)',
      '--shadow': '0 2px 12px rgba(69, 89, 122, 0.08)',
      '--shadow-hover': '0 8px 24px rgba(69, 89, 122, 0.14)',
    },
  },
  {
    id: 'forest',
    name: 'Forest',
    description: 'Muted green contrast for focused reading.',
    preview: {
      background: '#31483a',
      text: '#d7e2d5',
      muted: '#b7c9be',
      swatch:
        'linear-gradient(135deg, rgba(45, 165, 112, 0.95), rgba(30, 94, 64, 0.95))',
    },
    vars: {
      '--bg': '#eef3ed',
      '--bg-card': '#dde7dc',
      '--bg-code': '#1c2d24',
      '--text': '#263228',
      '--text-muted': '#5f7160',
      '--accent': '#2f8d64',
      '--accent-soft': 'rgba(47, 141, 100, 0.14)',
      '--accent-hover': '#236b4c',
      '--selection-bg': 'rgba(47, 141, 100, 0.28)',
      '--selection-text': '#132017',
      '--border': 'rgba(36, 61, 48, 0.12)',
      '--shadow': '0 2px 12px rgba(30, 59, 45, 0.07)',
      '--shadow-hover': '0 8px 24px rgba(30, 59, 45, 0.13)',
    },
  },
  {
    id: 'midnight',
    name: 'Midnight',
    description: 'Deep contrast without losing the editorial feel.',
    preview: {
      background: '#303547',
      text: '#cfd5e8',
      muted: '#aab4d1',
      swatch:
        'linear-gradient(135deg, rgba(93, 138, 255, 0.95), rgba(37, 60, 112, 0.95))',
    },
    vars: {
      '--bg': '#171b25',
      '--bg-card': '#212737',
      '--bg-code': '#0f1218',
      '--text': '#eef1f7',
      '--text-muted': '#a6afc2',
      '--accent': '#7ba5ff',
      '--accent-soft': 'rgba(123, 165, 255, 0.16)',
      '--accent-hover': '#5f8df0',
      '--selection-bg': 'rgba(123, 165, 255, 0.38)',
      '--selection-text': '#f7faff',
      '--border': 'rgba(190, 205, 235, 0.12)',
      '--shadow': '0 2px 12px rgba(0, 0, 0, 0.28)',
      '--shadow-hover': '0 10px 28px rgba(0, 0, 0, 0.34)',
    },
  },
];

export const FONT_OPTIONS = [
  {
    id: 'merriweather',
    name: 'Merriweather',
    description: 'Book-like and calm.',
    value: "'Merriweather', Georgia, serif",
  },
  {
    id: 'inter',
    name: 'Inter',
    description: 'Neutral and crisp.',
    value: "'Inter', sans-serif",
  },
  {
    id: 'jetbrains',
    name: 'JetBrains Mono',
    description: 'Technical and structured.',
    value: "'JetBrains Mono', monospace",
  },
];

export const DEFAULT_THEME_ID = THEME_OPTIONS[0].id;
export const DEFAULT_FONT_ID = FONT_OPTIONS[0].id;
export const DEFAULT_FONT_SCALE = 1;
export const MIN_FONT_SCALE = 0.9;
export const MAX_FONT_SCALE = 1.2;
