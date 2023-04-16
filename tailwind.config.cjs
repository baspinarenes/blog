/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    colors: {
      primary: "#EBB700",
      black: "#101828",
      gray: {
        50: "#F9FAFB",
        75: "#F3F4F6",
        100: "#F2F4F7",
        200: "#EAECF0",
        300: "#D0D5DD",
        400: "#98A2B3",
        500: "#667085",
        600: "#4B5563",
        700: "#344054",
        800: "#1D2939",
      },
      red: "#DC2626",
      yellow: "#FFC700",
      green: "#15B025",
      blue: "#1D4ED8",
      orange: "#FF4600",
    },
    fontSize: {
      "display-2xl": ["4.5rem", "5.625rem"],
      "display-xl": ["3.75rem", "4.5rem"],
      "display-lg": ["3rem", "3.75rem"],
      "display-md": ["2.25rem", "2.75rem"],
      "display-sm": ["1.875rem", "2.375rem"],
      "display-xs": ["1.5rem", "2rem"],
      xl: ["1.25rem", "1.875rem"],
      lg: ["1.125rem", "1.75rem"],
      md: ["1rem", "1.5rem"],
      sm: ["0.875rem", "1.25rem"],
      xs: ["0.75rem", "1.125rem"],
    },

    extend: {
      animation: {
        scream: "scream 3s linear infinite",
      },
      keyframes: {
        scream: {
          "0%, 100%": { transform: "rotateY(-30deg)" },
          "50%": { transform: "rotate(10deg)" },
        },
      },
    },
  },
  plugins: [],
};
