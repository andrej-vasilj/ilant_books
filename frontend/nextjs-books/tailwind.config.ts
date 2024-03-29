import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'dark-green': '#003c41',
        'rich-green': '#b4ce8a',
        'white': '#ffffff',
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      keyframes: {
        shrink: {
          '0%': { transform: 'scale(1)' },
          '100%': { transform: 'scale(0.95)' },
        }
      },
      animation: {
        shrink: 'shrink 0.1s ease-in forwards',
      },
    },
  },
  plugins: [],
};
export default config;
