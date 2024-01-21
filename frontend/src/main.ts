import App from "./App.vue";
import { createPinia } from "pinia";
import router from "./router";
import { createApp, provide, h } from "vue";
import vuetify from "./plugins/vuetify";
import { loadFonts } from "./plugins/webfontloader";

import { DefaultApolloClient } from "@vue/apollo-composable";
import { apolloClient } from "@/graphql";
import "./registerServiceWorker";

import { initializeApp } from "firebase/app";
import { firebaseConfig } from "./auth/firebaseConfig";

const pinia = createPinia();

loadFonts();

initializeApp(firebaseConfig);

const app = createApp({
  setup() {
    provide(DefaultApolloClient, apolloClient);
  },

  render: () => h(App),
});

app.use(pinia).use(vuetify).use(router).mount("#app");
