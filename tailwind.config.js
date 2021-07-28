module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        'brand-blue-1': '#0095DA',
        'brand-blue-2': '#005888',
        'brand-blue-3': '#83F2F2',
        'brand-gray-1': '#CDCDCD',
        'brand-gray-2': '#B4B4B4',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
