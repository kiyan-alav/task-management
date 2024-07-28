import type { Config } from "tailwindcss";
import { nextui } from "@nextui-org/react";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  important: true,
  theme: {
    extend: {
      colors: {
        palette: {
          50: "#9C2CF3",
          100: "#3A49F9",
          200: "#F2F5FF",
          300: "#2E3A59"
        },
      },
    },
  },
  darkMode: "class",
  plugins: [nextui()],
};
export default config;
