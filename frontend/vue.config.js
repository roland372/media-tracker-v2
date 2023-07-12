const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  pluginOptions: {
    vuetify: {
      // https://github.com/vuetifyjs/vuetify-loader/tree/next/packages/vuetify-loader
    },
  },
  pwa: {
    name: "Media-Tracker",
    startUrl: "/",
    themeColor: "#12232e",
  },
});
