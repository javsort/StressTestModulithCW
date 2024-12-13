/** @type {import('tailwindcss').Config} */

export default {
   // Scan all files in src
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],

  // Standard color palette for application
  theme: {
    colors:{
      primary: "#B2D3A8", // Clear green
      secondary: "#498467", // Dark green
      secondary_darker: "#2b4f3d", // Even darker green
      background: "#F5F5F5",  // Light color for background
      text: "#1f2937",  // Dark color for text
      text_subtitle: "#374151", // Lighter color for text
      accent: "#F4A259", // Orange color for accent
    }
  },
  plugins: [],
};
