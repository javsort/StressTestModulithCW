/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'], // Scan all files in src
  theme: {
    extend: {
      colors:{
        primary: "#B2D3A8",
        secondary: "#498467",
        secondary_darker: "#2b4f3d",
        background: "#F5F5F5",
        text: "#1f2937",
        text_subtitle: "#374151",
        accent: "#F4A259",
      }
    },
  },
  plugins: [],
};
