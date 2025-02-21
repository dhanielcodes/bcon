import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        "primary-orange": "#FC5900",
        "secondary-orange": "#FF7434",
        "light-orange": "#FD9563",
        neutral: "#F2F4F7",
        neutral2: "#F7F9FC",
        neutral3: "#98A2B3",
      },
    },
  },
  plugins: [],
} satisfies Config;
