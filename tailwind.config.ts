import { colors } from "./src/tailwind/colors/colors";
import { fontFamily } from "./src/tailwind/typography/fontFamily";
import { fontSize } from "./src/tailwind/typography/fontSize";

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors,
      fontSize,
      fontFamily,
    },
  },
  plugins: [],
}
 