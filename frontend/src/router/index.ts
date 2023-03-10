import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import { navLinks } from "@/utils/links";

const routes: Array<RouteRecordRaw> = [
  // {
  //   component: () => import("@/views/HomePage.vue"),
  //   name: "HomePage",
  //   path: "/",
  // },
  // {
  //   component: () => import("@/views/AnimePage.vue"),
  //   name: "AnimePage",
  //   path: "/anime",
  // },
  // {
  //   component: () => import("@/views/GamesPage.vue"),
  //   name: "GamesPage",
  //   path: "/games",
  // },
  // {
  //   component: () => import("@/views/MangaPage.vue"),
  //   name: "MangaPage",
  //   path: "/manga",
  // },
  // {
  //   component: () => import("@/views/CharactersPage.vue"),
  //   name: "CharactersPage",
  //   path: "/characters",
  // },
  // {
  //   component: () => import("@/views/ChartsPage.vue"),
  //   name: "ChartsPage",
  //   path: "/charts",
  // },
  // {
  //   component: () => import("@/views/NewsPage.vue"),
  //   name: "NewsPage",
  //   path: "/news",
  // },
  // {
  //   component: () => import("@/views/NotesPage.vue"),
  //   name: "NotesPage",
  //   path: "/notes",
  // },
  // {
  //   component: () => import("@/views/EmotesPage.vue"),
  //   name: "EmotesPage",
  //   path: "/emotes",
  // },
  // {
  //   component: () => import("@/views/AboutPage.vue"),
  //   name: "AboutPage",
  //   path: "/about",
  // },
  // {
  //   component: () => import("@/views/ProfilePage.vue"),
  //   name: "ProfilePage",
  //   path: "/profile",
  // },
  ...navLinks.map((link) => {
    return {
      component: () => import(`@/views/${link.name}.vue`),
      name: link.name,
      path: link.url,
    };
  }),
  {
    component: () => import("@/views/ErrorPage.vue"),
    name: "ErrorPage",
    path: "/:catchAll(.*)*",
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
