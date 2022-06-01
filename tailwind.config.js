module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#495732"
      },
      fontFamily: {
        'body': ['"Open Sans"', ],
        'header': ['"Syne"', ],
      }
      
    },

  },
  plugins: [],
}
