export default defineNuxtConfig({
  css: ["~/assets/main.css"],
  devtools: { enabled: true },
  runtimeConfig: {
    public: {
      apiBase: process.env.NUX_API_BASE,
    },
  },

  devServer: {
    port: 4005,
  },

  colorMode: {
    classSuffix: "",
  },

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  modules: [
    "@pinia/nuxt",
    "@nuxtjs/color-mode",
    "@nuxtjs/tailwindcss",
    "maz-ui/nuxt",
  ],
  compatibilityDate: "2024-09-20",
});