import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
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
          info: "#7dd3fc",
          success: "#22c55e",
          warning: "#fdba74",
          error: "#ef4444",
        },
      },
    ],
  },
  plugins: [require("daisyui")],
};
export default config;
