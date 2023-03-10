import App from "./App.vue";
import { createApp, provide, h } from "vue";
import { createPinia } from "pinia";
import vuetify from "./plugins/vuetify";
import { loadFonts } from "./plugins/webfontloader";
import { DefaultApolloClient } from "@vue/apollo-composable";
import { apolloClient } from "@/graphql";
import router from "./router";

const pinia = createPinia();

loadFonts();

const app = createApp({
  setup() {
    provide(DefaultApolloClient, apolloClient);
  },

  render: () => h(App),
});

app.use(pinia).use(vuetify).use(router).mount("#app");
