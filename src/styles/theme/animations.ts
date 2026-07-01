// Animation Tokens — Phase 2 Design System
// Source of Truth: BankMate AI Frontend Blueprint · Phase 1 §11
// slide-in-right, slide-down, fade-in, pulse-badge, shimmer, card-dismiss

export const keyframes = {
  'slide-in-right': {
    '0%': { transform: 'translateX(100%)', opacity: '0' },
    '100%': { transform: 'translateX(0)', opacity: '1' },
  },
  'slide-down': {
    '0%': { transform: 'translateY(-100%)', opacity: '0' },
    '100%': { transform: 'translateY(0)', opacity: '1' },
  },
  'fade-in': {
    '0%': { opacity: '0' },
    '100%': { opacity: '1' },
  },
  'fade-out': {
    '0%': { opacity: '1' },
    '100%': { opacity: '0' },
  },
  'pulse-badge': {
    '0%, 100%': { transform: 'scale(1)' },
    '50%': { transform: 'scale(1.15)' },
  },
  shimmer: {
    '0%': { backgroundPosition: '-1000px 0' },
    '100%': { backgroundPosition: '1000px 0' },
  },
  'card-dismiss': {
    '0%': { transform: 'scale(1)', opacity: '1' },
    '100%': { transform: 'scale(0.95)', opacity: '0' },
  },
} as const;

export const animation = {
  'slide-in-right': 'slide-in-right 300ms ease',
  'slide-down': 'slide-down 300ms ease',
  'fade-in': 'fade-in 200ms ease',
  'fade-out': 'fade-out 200ms ease',
  'pulse-badge': 'pulse-badge 1.2s ease-in-out infinite',
  shimmer: 'shimmer 1.5s infinite linear',
  'card-dismiss': 'card-dismiss 300ms ease',
};

export const transitionTiming = {
  fast: '150ms',
  base: '200ms',
  slow: '300ms',
} as const;

export const animations = { keyframes, animation, transitionTiming };

export default animations;
