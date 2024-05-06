import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors: {
      primary: "var(--primary-color)",
      secondary: "var(--secondary-color)",
      light: "var(--light-color)",
      dark: "var(--dark-color)",
      tertiary: "var(--tertiary-color)",
      danger: "var(--danger-color)",
      white: "#fff",
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
        merchant: ["var(--font-merchant)"],
        "merchant-wide": ["var(--font-merchant-wide)"],
      },
      spacing: {
        space: "2rem",
        "space-md": "1.25rem",
      },
    },
  },
  plugins: [],
};
export default config;
