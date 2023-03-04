import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import { Quasar } from "quasar";
import quasarUserOptions from "./quasar-user-options";

const pinia = createPinia();

createApp(App).use(pinia).use(Quasar, quasarUserOptions).mount("#app");
