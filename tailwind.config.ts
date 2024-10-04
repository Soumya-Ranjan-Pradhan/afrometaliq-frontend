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
        customColor1: "rgba(19, 17, 50, 1)",
        customColor2: "rgba(96, 90, 197, 1)",
      },
    },
  },
  plugins: [],
};
export default config;
