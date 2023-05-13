import { watch } from "vue";
import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import { navLinks } from "@/utils/links";
import { useMediaStore } from "@/stores/useMediaStore";
import { storeToRefs } from "pinia";

const routes: Array<RouteRecordRaw> = [
  {
    component: () => import("@/views/LoginPage.vue"),
    name: "LoginPage",
    path: "/login",
    meta: { title: "Login" + " | Media-Tracker" },
  },
  ...navLinks.map((link) => {
    return {
      component: () => import(`@/views/${link.name}.vue`),
      name: link.name,
      path: link.url,
      meta: { title: link.title + " | Media-Tracker" },
    };
  }),
  {
    component: () => import("@/views/NotFound.vue"),
    name: "NotFound",
    path: "/:catchAll(.*)*",
    meta: { title: "Not Found" + " | Media-Tracker" },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 };
  },
});

router.beforeEach((to, _, next) => {
  const mediaStore = useMediaStore();
  const { googleUser } = storeToRefs(mediaStore);

  watch(
    () => googleUser.value,
    () => {
      if (to.name === "EmotesPage" && googleUser.value?.role !== "ADMIN") {
        router.push({ name: "NotFound" });
      }
    }
  );

  const pageTitle = to.meta.title as string;
  document.title = pageTitle;
  next();
});

export default router;
