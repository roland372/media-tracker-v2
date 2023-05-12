import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import { navLinks } from "@/utils/links";

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
    component: () => import("@/views/ErrorPage.vue"),
    name: "ErrorPage",
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
  const pageTitle = to.meta.title as string;
  document.title = pageTitle;
  next();
});

export default router;
