import { createPinia } from "pinia";
import { createApp, h } from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import { loadFonts } from "./plugins/webfontloader";
import router from "./router";

import "./registerServiceWorker";

import { initializeApp } from "firebase/app";
import { firebaseConfig } from "./auth/firebaseConfig";

const pinia = createPinia();

loadFonts();

initializeApp(firebaseConfig);

const app = createApp({
  render: () => h(App),
});

app.use(pinia).use(vuetify).use(router).mount("#app");
