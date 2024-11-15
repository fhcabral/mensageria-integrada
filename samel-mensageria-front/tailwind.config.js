/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./components/**/*.{js,vue,ts}",
    // "./layouts/**/*.vue",
    "./pages/**/*.vue",
    // "./plugins/**/*.{js,ts}",
    "./app.vue",
    // "./error.vue",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        darkTheme: {
          100: "#121212",
          200: "#20212C",
        },

        lightMode: {
          100: "#FFFFFF",
          200: "#F9F9F9",
        },
      },
    },
  },
  plugins: [],
};
