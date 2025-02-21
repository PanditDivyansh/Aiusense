/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ["./app/**/*.{js,jsx,ts,tsx}","./components/**/*.{js,jsx,ts,tsx}",],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        // Custom Colors
        metalgrey: '#2d3538', 
        brownish: '#b5774a', 
        dimgrey: '#d9d6d1',   
        lightblue: '#4a89b5', 
        deepblue: '#2c4e71', 
        grey1e: '#333333',
        gred: '#ac4ab5'
      },
      fontFamily: {
        gentium: ['GentiumPlusRegular', 'GentiumPlusBold'],
        nunito: ["Nunitoregular", "Nunitobold"],
      },
    },
  },
  plugins: [],
}