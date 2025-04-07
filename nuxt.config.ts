// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },

  modules: [
    "@nuxt/content",
    "@nuxt/fonts",
    "@nuxt/icon",
    "@nuxt/image",
    "@nuxt/scripts",
    "@nuxt/test-utils",
    "@nuxt/ui",
    "nuxt-gtag",
  ],

  css: ["/assets/css/main.css"],

  app: {
    head: {
      viewport: "width=device-width, initial-scale=1, maximum-scale=1",
      charset: "utf-8",
      title: "Car Box Size - 자동차 크기 비교",
      meta: [
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        {
          name: "description",
          content: "자동차 박스 볼륨(전장 x 전폭 x 전고) 비교 서비스",
        },
        {
          name: "keywords",
          content: "자동차, 차량, 크기비교, 전장, 전폭, 전고, 박스볼륨",
        },
        { name: "author", content: "Car Box Size" },
        { property: "og:title", content: "Car Box Size - 자동차 크기 비교" },
        {
          property: "og:description",
          content: "디자인 배제하고 자동차 박스 볼륨 비교하기",
        },
        { property: "og:type", content: "website" },
        { property: "og:image", content: "/og-image.png" },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: "Car Box Size - 자동차 크기 비교" },
        {
          name: "twitter:description",
          content: "자동차 박스 볼륨 비교 서비스",
        },
        { name: "twitter:image", content: "/og-image.png" },
      ],
      link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
    },
  },

  ssr: true,

  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@import "@/assets/css/variables.scss";',
        },
      },
    },
  },

  gtag: {
    id: "G-C5WG018PPN",
  },
});
