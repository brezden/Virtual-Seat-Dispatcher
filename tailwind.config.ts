import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

export default {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)", ...fontFamily.sans],
      },
    },
    colors: {
      'primary': '#e2e8f0',
      'highlight': '#0ea5e9',
      'background' : '#082f49'
    },
  },
  plugins: [],
} satisfies Config;
