import { colors } from "./src/tailwind/colors/colors";
import { fontFamily } from "./src/tailwind/typography/fontFamily";
import { fontSize } from "./src/tailwind/typography/fontSize";
import { spacing } from "./src/tailwind/spacing/spacing";
import { borderRadius } from "./src/tailwind/spacing/borderRadius";

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      display: ['data-state'],
      borderRadius,
      spacing,
      colors,
      fontSize,
      fontFamily,
      backgroundImage: {
        'gradient-default': 'linear-gradient(90deg, #5BE2F7 0%, #50DDA0 100%)',
        'gradient-disabled': 'linear-gradient(0deg, rgba(168, 161, 161, 0.4), rgba(168, 161, 161, 0.4)), linear-gradient(90deg, #5BE2F7 0%, #50DDA0 100%)',
        'gradient-fainted': 'linear-gradient(90deg, rgba(247, 91, 91, 0.57) 0%, rgba(221, 113, 80, 0.46) 100%)',
      }
    },
  },
  plugins: [
  ],
  safelist: [
    'data-[state=open]:block',
    'data-[state=open]:hidden',
  ],
}
 