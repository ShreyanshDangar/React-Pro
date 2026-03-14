export default function QuizIllustration({ className = '' }) {
  return (
    <div className={`quiz-illustration ${className}`.trim()} aria-hidden="true">
      <svg viewBox="0 0 560 420" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="38" y="44" width="484" height="332" rx="34" className="quiz-shell" />
        <rect x="78" y="88" width="244" height="236" rx="24" className="quiz-card quiz-card-main" />
        <rect x="268" y="120" width="188" height="168" rx="22" className="quiz-card quiz-card-stack" />
        <circle cx="418" cy="108" r="42" className="quiz-glow" />

        <rect x="102" y="116" width="132" height="16" rx="8" className="quiz-line quiz-line-strong" />
        <rect x="102" y="146" width="172" height="12" rx="6" className="quiz-line" />

        <rect x="102" y="186" width="196" height="40" rx="18" className="quiz-option" />
        <circle cx="128" cy="206" r="12" className="quiz-letter-bg" />
        <path d="M123 206h10" className="quiz-letter" />
        <path d="M128 201v10" className="quiz-letter" />
        <rect x="152" y="198" width="110" height="12" rx="6" className="quiz-line" />

        <rect x="102" y="240" width="196" height="40" rx="18" className="quiz-option quiz-option-active" />
        <circle cx="128" cy="260" r="12" className="quiz-letter-bg quiz-letter-bg-active" />
        <path
          d="M123 260l3.5 3.5 7.5-8"
          className="quiz-check"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <rect x="152" y="252" width="122" height="12" rx="6" className="quiz-line quiz-line-active" />

        <rect x="292" y="146" width="140" height="18" rx="9" className="quiz-line quiz-line-strong" />
        <rect x="292" y="180" width="120" height="12" rx="6" className="quiz-line" />
        <rect x="292" y="208" width="144" height="12" rx="6" className="quiz-line" />

        <rect x="292" y="244" width="126" height="28" rx="14" className="quiz-pill" />
        <path
          d="M318 258l8 8 16-18"
          className="quiz-check"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <rect x="340" y="252" width="54" height="12" rx="6" className="quiz-pill-line" />

        <path
          d="M448 250c0 17.673-14.327 32-32 32s-32-14.327-32-32 14.327-32 32-32 32 14.327 32 32Z"
          className="quiz-badge"
        />
        <path
          d="M401 250h30M416 235v30"
          className="quiz-badge-mark"
          strokeLinecap="round"
        />

        <path
          d="M188 324c18-30 50-52 96-52s80 22 100 52"
          className="quiz-curve"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}
