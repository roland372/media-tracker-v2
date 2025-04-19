const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  pluginOptions: {
    vuetify: {
      // https://github.com/vuetifyjs/vuetify-loader/tree/next/packages/vuetify-loader
    },
  },
  // pwa: {
  //   name: "Media-Tracker",
  //   startUrl: "/",
  //   themeColor: "#12232e",
  // },
  pwa: {
    name: "Media-Tracker",
    startUrl: "/",
    themeColor: "#12232e",
    workboxOptions: {
      skipWaiting: true,
      exclude: [/_redirects/],
      runtimeCaching: [
        {
          urlPattern: /\.(mp3|wav|ogg|m4a|flac|aac)$/i,
          handler: 'CacheFirst',
          options: {
            cacheName: 'audio-cache',
            expiration: {
              maxEntries: 50,
              maxAgeSeconds: 7 * 24 * 60 * 60 // 1 week
            },
            cacheableResponse: {
              statuses: [0, 200]
            },
            rangeRequests: true
          }
        }
      ]
    },
  },
});
