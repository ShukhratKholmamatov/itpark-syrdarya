import type { Config } from "tailwindcss";

/**
 * Brand theme derived strictly from the IT Park Uzbekistan Logobook (2024):
 *   Green  #7DBA28  — primary (innovation, freshness, energy)
 *   Dark   #1E1E1E  — stability, professionalism
 *   Light  #D9D9D9  — modern, minimal background
 * Typeface: Gilroy (full weight range).
 */
const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: "#7DBA28",
          50: "#f4f9ea",
          100: "#e6f2cf",
          200: "#cfe6a3",
          300: "#b2d66e",
          400: "#97c845",
          500: "#7DBA28",
          600: "#639a1e",
          700: "#4d771c",
          800: "#3f5e1d",
          900: "#36501d",
          950: "#1a2c0a",
        },
        ink: {
          DEFAULT: "#1E1E1E",
          soft: "#2b2b2b",
          muted: "#5b5b5b",
        },
        mist: {
          DEFAULT: "#D9D9D9",
          light: "#f3f4f2",
        },
      },
      fontFamily: {
        sans: [
          "Gilroy",
          "Manrope",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "Segoe UI",
          "Roboto",
          "Arial",
          "sans-serif",
        ],
      },
      maxWidth: {
        content: "1200px",
      },
      borderRadius: {
        brand: "18px",
      },
      boxShadow: {
        card: "0 10px 30px -12px rgba(30,30,30,0.18)",
        soft: "0 4px 20px -8px rgba(30,30,30,0.12)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.6s ease-out both",
      },
    },
  },
  plugins: [],
};

export default config;
