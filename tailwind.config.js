/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    colors: { 

      'MCS-BlueBlack':'#0d0d19', 

      'MCS-DarkerBlue': '#0d1d30', 

      'MCS-DarkBlue': '#102c47', 

      'MCS-Blue': '#206191', 

      'MCS-LightBlue': '#2bc0d3', 

      'MCS-WhiteBlue': '#aaced1',

      'MCS-White': '#ffffff',

      'MCS-Black': '#000000',

      'MCS-grey': '#6b717d',

    } 
  },
  plugins: [],
}

