import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        base: "#f7f5f1",
        gold: "#a8854a",
        "gold-light": "#c9a96e",
        "gold-dark": "#8a6a35",
        ink: "#1a1814",
        muted: "#6b6456",
      },
      fontFamily: {
        cormorant: ["var(--font-cormorant)", "serif"],
        noto: ["var(--font-noto)", "serif"],
        dm: ["var(--font-dm)", "sans-serif"],
      },
      letterSpacing: {
        widest2: "0.2em",
        widest3: "0.3em",
      },
    },
  },
  plugins: [],
};
export default config;
