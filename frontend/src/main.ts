import { createPinia } from "pinia";
import { createApp, h } from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import { loadFonts } from "./plugins/webfontloader";
import "./registerServiceWorker";
import router from "./router";

const pinia = createPinia();

loadFonts();

const app = createApp({
  render: () => h(App),
});

app.use(pinia).use(vuetify).use(router).mount("#app");
