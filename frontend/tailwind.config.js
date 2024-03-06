/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        custom1: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
        custom2: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
        custom3: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
        custom4: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
        custom5: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
        custom6: '0 25px 50px -12px rgb(0 0 0 / 0.25)',
        custom7: 'inset 0 2px 4px 0 rgb(0 0 0 / 0.05)',
        custom8: 'none',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}

