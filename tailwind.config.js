/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class", // ⬅️ PASTIKAN INI ADA!
  theme: {
    extend: {
      colors: {
        primary: "#9ca3e8",
        primaryDark: "#8b93d6",
        background: "#f5f7fa",
        cardBg: "#ffffff",
        textPrimary: "#2d3748",
        textSecondary: "#4a5568",
        accent: "#c4b5fd",
        accentLight: "#e9d5ff",
        success: "#a5f3fc",
        border: "#e2e8f0",
        // Dark mode colors
        darkBg: "#1a202c",
        darkCard: "#2d3748",
        darkBorder: "#4a5568",
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-in-out",
        "slide-up": "slideUp 0.4s ease-out",
        "scale-in": "scaleIn 0.3s ease-out",
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { transform: "translateY(20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        scaleIn: {
          "0%": { transform: "scale(0.9)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
      },
      backdropBlur: {
        xs: "2px",
      },
    },
  },
  plugins: [],
};
