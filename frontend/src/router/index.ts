import { useUsersStore } from '@/stores/useUsersStore';
import { navLinks } from "@/utils/links";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { storeToRefs } from "pinia";
import { watch } from "vue";
import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  ...navLinks.map((link) => {
    return {
      component: () => import(`@/views/${link.name}.vue`),
      meta: { title: link.title + " | Media-Tracker", requiresAuth: true },
      name: link.name,
      path: link.url,
    };
  }),
  {
    component: () => import("@/views/LoginPage.vue"),
    meta: { title: "Login" + " | Media-Tracker" },
    name: "LoginPage",
    path: "/login",
  },
  {
    component: () => import("@/views/ProfilePage.vue"),
    meta: { title: "Profile" + " | Media-Tracker", requiresAuth: true },
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
  const usersStore = useUsersStore();
  const { user } = storeToRefs(usersStore);

  const pageTitle = to.meta.title as string;
  document.title = pageTitle;

  watch(
    () => user.value,
    () => {
      if (to.name === "EmotesPage" && user.value?.role !== "ADMIN") {
        router.push({ name: "NotFound" });
      }
    }
  );

  if (to.matched.some((record) => record.meta.requiresAuth)) {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        next();
      } else {
        next("/login");
      }
    });
  } else {
    next();
  }
});

export default router;
