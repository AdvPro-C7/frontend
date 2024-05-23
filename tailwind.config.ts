/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundColor: {
        primary: "#FFFFFF",
      },
      colors: {
        white:{
          100:'#FFFFFF'
        },
        blue:{
          100: '#0060AE',
        },
        grey:{
          100:'#6D6D6D',
        },
        black:{
          100:'#151515'
        },
        purple:{
          100:'#25225A'
        },
      }
    },
  },
  plugins: [require('daisyui'),],
}