import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "#000000",
        foreground: "#FFFFFF",
        gold: {
          DEFAULT: "#B8860B",
          light: "#FFD700",
          dark: "#8B6914",
        },
        primary: {
          DEFAULT: "#B8860B",
          foreground: "#FFFFFF",
        },
        secondary: {
          DEFAULT: "#FFD700",
          foreground: "#000000",
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
