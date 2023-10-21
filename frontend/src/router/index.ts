import { watch } from "vue";
import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import { useMediaStore } from "@/stores/useMediaStore";
import { storeToRefs } from "pinia";
import { navLinks } from "@/utils/links";

const routes: Array<RouteRecordRaw> = [
  ...navLinks.map((link) => {
    return {
      component: () => import(`@/views/${link.name}.vue`),
      meta: { title: link.title + " | Media-Tracker" },
      name: link.name,
      path: link.url,
    };
  }),
  {
    component: () => import("@/views/ProfilePage.vue"),
    meta: { title: "Profile" + " | Media-Tracker" },
    name: "ProfilePage",
    path: "/profile",
  },
  {
    component: () => import("@/views/NotFound.vue"),
    meta: { title: "Not Found" + " | Media-Tracker" },
    name: "NotFound",
    path: "/:catchAll(.*)*",
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
