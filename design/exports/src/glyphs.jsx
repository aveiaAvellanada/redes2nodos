// Bold geometric glyphs — simple shapes only, no illustrations
// Each renders in a 48x48 box, takes stroke/fill colors from props.

const G = ({ children, size = 48 }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    {children}
  </svg>
);

const Glyph = ({ name, color = 'currentColor', accent, size = 48 }) => {
  const c = color;
  const a = accent || color;
  switch (name) {
    case 'calendar':
      return (
        <G size={size}>
          <rect x="6" y="10" width="36" height="32" rx="2" stroke={c} strokeWidth="2" />
          <line x1="6" y1="18" x2="42" y2="18" stroke={c} strokeWidth="2" />
          <line x1="14" y1="6" x2="14" y2="14" stroke={c} strokeWidth="2" strokeLinecap="round" />
          <line x1="34" y1="6" x2="34" y2="14" stroke={c} strokeWidth="2" strokeLinecap="round" />
          <rect x="22" y="24" width="6" height="6" fill={a} />
        </G>
      );
    case 'phone':
      return (
        <G size={size}>
          <rect x="14" y="6" width="20" height="36" rx="3" stroke={c} strokeWidth="2" />
          <circle cx="24" cy="36" r="1.8" fill={c} />
          <rect x="20" y="10" width="8" height="1.5" rx="0.75" fill={c} />
          <circle cx="24" cy="22" r="4" fill={a} />
        </G>
      );
    case 'house':
      return (
        <G size={size}>
          <path d="M6 24 L24 8 L42 24 V40 H6 Z" stroke={c} strokeWidth="2" strokeLinejoin="round" />
          <rect x="20" y="28" width="8" height="12" fill={a} />
          <rect x="10" y="28" width="6" height="6" stroke={c} strokeWidth="1.5" />
          <rect x="32" y="28" width="6" height="6" stroke={c} strokeWidth="1.5" />
        </G>
      );
    case 'sprout':
      return (
        <G size={size}>
          <path d="M24 42 V24" stroke={c} strokeWidth="2" strokeLinecap="round" />
          <path d="M24 24 C 12 22 10 12 12 8 C 20 8 24 16 24 24" fill={a} />
          <path d="M24 28 C 34 26 38 18 36 14 C 28 14 24 20 24 28" fill={c} opacity="0.5" />
          <path d="M16 42 H 32" stroke={c} strokeWidth="2" strokeLinecap="round" />
        </G>
      );
    case 'hands':
      return (
        <G size={size}>
          <path d="M6 28 L 18 22 L 24 26 L 30 22 L 42 28" stroke={c} strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" />
          <circle cx="24" cy="26" r="3" fill={a} />
          <path d="M10 30 V 40" stroke={c} strokeWidth="2" strokeLinecap="round" />
          <path d="M38 30 V 40" stroke={c} strokeWidth="2" strokeLinecap="round" />
          <path d="M18 32 V 40" stroke={c} strokeWidth="2" strokeLinecap="round" />
          <path d="M30 32 V 40" stroke={c} strokeWidth="2" strokeLinecap="round" />
        </G>
      );
    case 'bell':
      return (
        <G size={size}>
          <path d="M12 32 C 12 20 16 12 24 12 C 32 12 36 20 36 32 L 40 36 H 8 Z" stroke={c} strokeWidth="2" strokeLinejoin="round" fill={a} fillOpacity="0.15" />
          <circle cx="24" cy="8" r="2" fill={c} />
          <path d="M20 40 C 20 42 22 44 24 44 C 26 44 28 42 28 40" stroke={c} strokeWidth="2" strokeLinecap="round" />
          <circle cx="36" cy="14" r="3" fill={a} />
        </G>
      );
    case 'swap':
      return (
        <G size={size}>
          <path d="M8 18 H 36 L 30 12" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M40 30 H 12 L 18 36" stroke={a} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </G>
      );
    case 'book':
      return (
        <G size={size}>
          <path d="M8 10 H 22 V 40 H 8 Z" stroke={c} strokeWidth="2" strokeLinejoin="round" />
          <path d="M26 10 H 40 V 40 H 26 Z" stroke={c} strokeWidth="2" strokeLinejoin="round" fill={a} fillOpacity="0.25" />
          <line x1="12" y1="16" x2="18" y2="16" stroke={c} strokeWidth="1.5" strokeLinecap="round" />
          <line x1="12" y1="22" x2="18" y2="22" stroke={c} strokeWidth="1.5" strokeLinecap="round" />
          <line x1="30" y1="16" x2="36" y2="16" stroke={c} strokeWidth="1.5" strokeLinecap="round" />
          <line x1="30" y1="22" x2="36" y2="22" stroke={c} strokeWidth="1.5" strokeLinecap="round" />
        </G>
      );
    case 'cross':
      return (
        <G size={size}>
          <rect x="6" y="6" width="36" height="36" rx="4" stroke={c} strokeWidth="2" />
          <rect x="21" y="14" width="6" height="20" fill={a} />
          <rect x="14" y="21" width="20" height="6" fill={a} />
        </G>
      );
    case 'leaf':
      return (
        <G size={size}>
          <path d="M8 40 C 8 20 20 8 40 8 C 40 28 28 40 8 40 Z" stroke={c} strokeWidth="2" strokeLinejoin="round" fill={a} fillOpacity="0.2" />
          <path d="M8 40 L 32 16" stroke={c} strokeWidth="1.5" strokeLinecap="round" />
        </G>
      );
    case 'bag':
      return (
        <G size={size}>
          <path d="M10 16 H 38 L 36 42 H 12 Z" stroke={c} strokeWidth="2" strokeLinejoin="round" fill={a} fillOpacity="0.2" />
          <path d="M18 16 V 12 C 18 8 21 6 24 6 C 27 6 30 8 30 12 V 16" stroke={c} strokeWidth="2" strokeLinecap="round" />
        </G>
      );
    default:
      return <G size={size}><rect x="8" y="8" width="32" height="32" stroke={c} strokeWidth="2" /></G>;
  }
};

window.Glyph = Glyph;
