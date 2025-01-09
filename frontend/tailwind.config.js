import { nav, text } from "framer-motion/client";

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        light: {
          primary: '#31b4f2',
          secondary: '#0000ff',
          tertiary: '#025492',
          background: '#ffffff'
        },
        dark: {
          primary: '#31b4f2',
          secondary: '#0000ff',
          tertiary: '#025492',
          background: '#1a1a1a'
        },
        text: {
          dark: '#31b4f2',
          light: '#0000ff',
          dim: '#025492',
          fade: '#f8cf40'
        },
        nav: {
          dark: '#1a1a1a',
          light: '#ffffff'
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