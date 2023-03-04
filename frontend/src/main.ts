import App from "./App.vue";
import { createApp, provide, h } from "vue";
import { createPinia } from "pinia";
import { Quasar } from "quasar";
import quasarUserOptions from "./quasar-user-options";
import { DefaultApolloClient } from "@vue/apollo-composable";
import { apolloClient } from "@/graphql";

const pinia = createPinia();

const app = createApp({
  setup() {
    provide(DefaultApolloClient, apolloClient);
  },

  render: () => h(App),
});

app.use(pinia).use(Quasar, quasarUserOptions).mount("#app");
