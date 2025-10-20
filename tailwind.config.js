/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        // Primary brand colors
        primary: {
          DEFAULT: "#7A9608",      // Main green
          light: "#BCD657",        // Light green
          lighter: "#CAE368",      // Lighter green
          pale: "#EAF6BC",         // Pale green
          cream: "#F8FFDE",        // Cream background
          yellow: "#F7FEDE",       // Yellow tint
          lime: "#F0FBC3",         // Lime tint
        },

        // Secondary colors
        secondary: {
          DEFAULT: "#576423",      // Olive green
          dark: "#2B3210",         // Dark olive
        },

        // Accent colors
        accent: {
          orange: "#FFB45B",       // Orange accent
          blue: "#1182EA",         // Blue accent
          darkBlue: "#084596",     // Dark blue
          lightBlue: "#5E788C",    // Light blue
          muted: "#4D6B99",        // Muted blue
        },

        // Neutral/Gray scale
        gray: {
          50: "#FDFEFF",           // Almost white
          100: "#DBE0E5",          // Very light gray
          200: "#D4D5D6",          // Light gray
          300: "#8C7D5E",          // Beige gray
          400: "#5C5757",          // Medium gray
          500: "#444444",          // Dark gray
        },

        // Dark theme colors
        dark: {
          DEFAULT: "#1E1E1E",      // Main dark
          100: "#0F0F0F",          // Very dark
          200: "#141415",          // Dark variant
          300: "#0D0E0F",          // Darker variant
          400: "#121417",          // Dark blue-ish
          500: "#121714",          // Dark green-ish
          600: "#171712",          // Dark olive-ish
          700: "#0D121C",          // Deep dark blue
          900: "#000000",          // Pure black
        },

        // Background colors
        background: {
          light: "#FFFFFF",        // White
          cream: "#F8FFDE",        // Cream
          pale: "#D5EDD5",         // Pale green
        },

        // Status colors
        error: {
          DEFAULT: "#FB0000",      // Red
          light: "#FF0B0B",        // Light red
          pale: "#FFE4E4",         // Pale red
        },

        success: {
          DEFAULT: "#7A9608",      // Using primary green
          light: "#D5EDD5",        // Pale green
        },

        // Brown/Tan accents
        brown: {
          DEFAULT: "#8C7D5E",      // Beige brown
          dark: "#432A0D",         // Dark brown
        },
      },

      fontFamily: {
        quicksand: ["Quicksand-Regular", "sans-serif"],
        "quicksand-bold": ["Quicksand-Bold", "sans-serif"],
        "quicksand-semibold": ["Quicksand-SemiBold", "sans-serif"],
        "quicksand-light": ["Quicksand-Light", "sans-serif"],
        "quicksand-medium": ["Quicksand-Medium", "sans-serif"],
      },
    },
  },
  plugins: [],
};
