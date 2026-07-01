import { Config } from '@/styles/theme';

const tailwindConfig = {
  content: ['./src/**/*.{ts,tsx}', './public/**/*.html'],
  theme: {
    extend: {
      colors: Config.colors,
      fontFamily: Config.fontFamily,
      borderRadius: Config.borderRadius,
      boxShadow: Config.boxShadow,
      animation: Config.animation,
      screens: Config.screens,
    },
  },
  plugins: [],
};

export default tailwindConfig;
