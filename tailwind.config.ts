import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: "#0864a7",
        accent: "#efcf05",
        cta: "#e87929",
        "cta-hover": "#e65428"
      },
      boxShadow: {
        card: "0 4px 12px rgba(15,23,42,0.08)",
        nav: "0 1px 2px rgba(15,23,42,0.08)"
      },
      maxWidth: {
        idea: "960px"
      }
    }
  },
  plugins: []
};

export default config;

