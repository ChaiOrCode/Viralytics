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
          primary: '#738fa7',    // Blue Gray
          secondary: '#c3ceda',  // Misty Blue
          tertiary: '#0c4160',   // Midnight Blue
          background: '#f8fafc', // Light Background
        },
        dark: {
          primary: '#c3ceda',    // Misty Blue
          secondary: '#738fa7',  // Blue Gray
          tertiary: '#0c4160',   // Midnight Blue
          background: '#071330', // Dark Blue
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