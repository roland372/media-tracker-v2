import App from "./App.vue";
import { createPinia } from "pinia";
import router from "./router";
import { createApp, provide, h } from "vue";
import vue3GoogleLogin from "vue3-google-login";
import vuetify from "./plugins/vuetify";
import { loadFonts } from "./plugins/webfontloader";

import { DefaultApolloClient } from "@vue/apollo-composable";
import { apolloClient } from "@/graphql";

const pinia = createPinia();

loadFonts();

const app = createApp({
  setup() {
    provide(DefaultApolloClient, apolloClient);
  },

  render: () => h(App),
});

app
  .use(pinia)
  .use(vue3GoogleLogin, {
    clientId: process.env.VUE_APP_GOOGLE_CLIENT_ID,
  })
  .use(vuetify)
  .use(router)
  .mount("#app");
