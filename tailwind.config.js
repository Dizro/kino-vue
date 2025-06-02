/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'gray-900': '#0D1117',
        'slate-800': '#161B22',
        'slate-700': '#21262D',
        'slate-600': '#30363D',
        'slate-500': '#8B949E',
        'slate-400': '#475069',
        'slate-300': '#CBD5E1',
        'slate-100': '#F0F6FC',
        'violet-500': '#7B6EF6',
        'violet-300': '#A5B4FC',
        'violet-950': '#281E5D',
        'blue-500': '#3D98F3',
        'orange-400': '#FFAD49',
        'orange-300': '#FFBD6D',
        'brand-blue-dark': '#0C4265',
        'brand-green-dark': '#02523A',
        'brand-violet-bg': '#5A4AF4',
      },
      fontFamily: {
        montserrat: ['Montserrat', 'sans-serif'],
        poppins: ['Poppins', 'sans-serif'],
      },
      maxWidth: {
        'screen-desktop': '1440px',
      },
      padding: {
        'desktop-x': '112px',
        'desktop-y-header': '16px',
        'desktop-y-main-pt': '80px',
        'desktop-y-main-pb': '80px',
      },
      lineHeight: {
        '[80px]': '80px',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      const newUtilities = {
        '.main-container': {
          '@apply max-w-screen-desktop mx-auto px-4 sm:px-6 md:px-10 lg:px-desktop-x': {},
        },
        '.caret-violet-500': {
          'caret-color': '#7B6EF6',
        },
      }
      addUtilities(newUtilities, ['responsive', 'hover'])
    },
  ],
}
