// tailwind.config.js
module.exports = {
  content: [
    './*.html',
    './**/*.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#ffe5e5',  // very light red
          100: '#fcbcbc', // light red
          600: '#dc2626', // red-600 (Tailwind default red)
          700: '#b91c1c', // red-700
        },
      },
      fontFamily: {
        roboto: ['Roboto', 'sans-serif'],
        ubuntu: ['Ubuntu', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
