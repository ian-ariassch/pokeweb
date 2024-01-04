import type { Config } from "tailwindcss"

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      animation: {
        "scale-up-down": "scale-up-down 0.25s ease-in-out",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        "base-400": "var(--base-400)",
      },
      keyframes: {
        "scale-up-down": {
          "0%": { transform: "scale(1)" },
          "50%": { transform: "scale(0.9)" },
          "100%": { transform: "scale(1)" },
        },
      },
    },
  },
  daisyui: {
    themes: [
      {
        light: {
          primary: "#be123c",
          secondary: "#d6d3d1",
          accent: "#e11d48",
          neutral: "#f2f2f2",
          "base-100": "#f2f2f2",
          "--base-400": "#bfbfbf",
          info: "#7dd3fc",
          success: "#22c55e",
          warning: "#fdba74",
          error: "#ef4444",
        },
      },
      {
        dark: {
          primary: "#be123c",
          secondary: "#d6d3d1",
          accent: "#e11d48",
          neutral: "#474151",
          "base-100": "#1f2937",
          "--base-400": "#121821",
          info: "#7dd3fc",
          success: "#22c55e",
          warning: "#fdba74",
          error: "#ef4444",
        },
      },
    ],
  },
  plugins: [require("daisyui")],
}
export default config
