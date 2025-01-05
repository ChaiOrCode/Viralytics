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
          primary: '#8AA3B8',
          secondary: '#DCE5ED',
          tertiary: '#1A5885',
          background: '#F2F6FA'
        },
        dark: {
          primary: '#C8D5E2',
          secondary: '#6989A3',
          tertiary: '#184C74',
          background: '#1d304a'
        },
        text: {
          dark:' #376f99',
          light: '#6989A3',
          dim: '#A0B3C0',
          fade: '#B0C0D0'
        },
        nav: {
          dark: '#1d304a',
          light: '#F2F6FA'
        }
    },
    backgroundImage: {
      'noise': 'url("data:image/svg+xml,%3Csvg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg"%3E%3Cfilter id="noise"%3E%3CfeTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch"/%3E%3C/filter%3E%3Crect width="100%" height="100%" filter="url(%23noise)" opacity="0.075"/%3E%3C/svg%3E")',
    },
    opacity: {
      '85': '0.85',
    }
  },
},
plugins: [],
}