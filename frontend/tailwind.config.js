import { nav, text } from "framer-motion/client";

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        light: {
          primary: '#5F7D94',
          secondary: '#9FB5C8',
          tertiary: '#103B56',
          background: '#DDE6EF'
        },
        dark: {
          primary: '#89A2BA',
          secondary: '#3E5062',
          tertiary: '#1A2B3B',
          background: '#0C1219'
        },
        text: {
          dark: '#A2B7CE',
          light: '#D1DFEC',
          dim: '#798A9E',
          fade: '#4C5D6F'
        },
        nav: {
          dark: '#0D1620',
          light: '#EBF1F6'
        },
      },
      backgroundImage: {
        'noise': 'url("data:image/svg+xml,%3Csvg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg"%3E%3Cfilter id="noise"%3E%3CfeTurbulence type="fractalNoise" baseFrequency="0.3" numOctaves="3" stitchTiles="stitch"/%3E%3C/filter%3E%3Crect width="100%" height="100%" filter="url(%23noise)" opacity="0.07"/%3E%3C/svg%3E")'
      },
      opacity: {
        '85': '0.85'
      }
    },
  },
  plugins: [],
};
