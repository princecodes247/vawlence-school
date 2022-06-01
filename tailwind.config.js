module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        xs: "380px",
      },
      colors: {
        primary: "#495732"
      },
      fontFamily: {
        'body': ['"Poppins"', ],
        'header': ['"Syne"', ],
      }
      
    },

  },
  plugins: [],
}
