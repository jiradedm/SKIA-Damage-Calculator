import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/data/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        legendary1: "#cf8525",
        legendary2: "#f0b750",
        legendary3: "#f0cc69",
        unique1: "#cb605f",
        unique2: "#de9087",
        unique3: "#ed6b51",
        epic1: "#895cab",
        epic2: "#996fab",
        epic3: "#e273c5",
        rare1: "#5b72ab",
        rare2: "#6f75aa",
        rare3: "#6885a7",
        normal1: "#728b46",
        normal2: "#91a86f",
        normal3: "#91b36d",
      },
      maxWidth: { maxw: "768px" },
      boxShadow: {
        "blue-neon":
          "0 0 0.1rem #3079ab, 0 0 0.3rem #3079ab, 0 0 0.3rem #3079ab, inset 0 0 0.1rem #3079ab, 0 0 0.3rem #3079ab, inset 0 0 0.3rem #3079ab",
      },
    },
  },
  plugins: [],
};
export default config;
