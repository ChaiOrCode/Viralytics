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
          primary: '#7A92A5',
          secondary: '#BCCEDD',
          tertiary: '#145168',
          background: '#E6EEF5'
        },
        dark: {
          primary: '#C0C8D4',
          secondary: '#5E78A2',
          tertiary: '#163C5C',
          background: '#172739'
        },
        text: {
          dark: '#376f99',
          light: '#6989A3',
          dim: '#A0B3C0',
          fade: '#B0C0D0'
        },
        nav: {
          dark: '#172739',
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