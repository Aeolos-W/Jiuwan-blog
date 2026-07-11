/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'tao-teal': '#006a80',
        'tao-green': '#8fbf60',
        'tao-dark': '#000000',
        'tao-gray': '#666666',
        'tao-light-gray': '#999999',
        'tao-border': '#dddddd',
      },
      fontFamily: {
        'heading': ['"Times New Roman"', 'Times', 'serif'],
        'body': ['Verdana', 'Helvetica', 'Arial', 'sans-serif'],
      },
      fontSize: {
        'body': '12.16px',
        'nav': '12.16px',
        'h1': '24.32px',
        'h2': '24.32px',
        'small': '11px',
      },
      lineHeight: {
        'body': '1.2',
        'relaxed': '1.6',
      },
      maxWidth: {
        'content': '760px',
        'primary': '500px',
        'sidebar': '200px',
      },
      width: {
        'primary': '500px',
        'sidebar': '200px',
      },
    },
  },
  plugins: [],
}
