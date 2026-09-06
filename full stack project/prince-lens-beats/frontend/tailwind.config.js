/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        neonPink: "#ff006e",
        neonCyan: "#00f5ff",
        darkBg: "#0a0a0f",
        cardBg: "#12121a",
        cardBorder: "#1e1e2d"
      },
      fontFamily: {
        bebas: ['"Bebas Neue"', 'cursive', 'sans-serif'],
        poppins: ['Poppins', 'sans-serif']
      },
      backgroundImage: {
        'glow-gradient': 'radial-gradient(circle at center, rgba(255, 0, 110, 0.15) 0%, rgba(0, 245, 255, 0.05) 50%, transparent 100%)',
      }
    },
  },
  plugins: [],
}
