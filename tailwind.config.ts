import { type Config } from "tailwindcss";
import { fontFamily, colors as defaultColors } from "tailwindcss/defaultTheme";

export default {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)", ...fontFamily.sans],
      },
      colors: {
        primary: '#e2e8f0',
        highlight: '#0ea5e9',
        highlight_hover: '#0284c7',
        background: '#082f49',
        ...defaultColors
      },
    },
  },
  plugins: [],
} satisfies Config;
