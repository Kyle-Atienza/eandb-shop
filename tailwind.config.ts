import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors: {
      primary: "#00BC89",
      light: "var(--light-color)",
      dark: "#003135",
      base: "#3F6C4B",
    },
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      borderRadius: {
        "4xl": "2.5rem",
      },
      fontFamily: {
        ranille: ["var(--font-ranille)"],
        gopher: ["var(--font-gopher)"],
      },
    },
  },
  plugins: [],
};
export default config;
