import { TNavLinks, TUsefulLinks } from "@/types";

export const navLinks: TNavLinks[] = [
  {
    route: "normal",
    url: "/",
    text: "Media-Tracker",
  },
  {
    route: "protected",
    url: "anime",
    text: "Anime",
  },
  {
    route: "protected",
    url: "games",
    text: "Games",
  },
  {
    route: "protected",
    url: "manga",
    text: "Manga",
  },
  {
    route: "protected",
    url: "characters",
    text: "Characters",
  },
  {
    route: "protected",
    url: "charts",
    text: "Charts",
  },
  {
    route: "normal",
    url: "news",
    text: "News",
  },
  {
    route: "admin",
    url: "notes",
    text: "Notes",
  },
  {
    route: "admin",
    url: "emotes",
    text: "Emotes",
  },
  {
    route: "normal",
    url: "about",
    text: "About",
  },
  {
    route: "protected",
    url: "profile",
    text: "Profile",
  },
];

export const usefulLinks: TUsefulLinks[] = [
  {
    url: "https://myanimelist.net/",
    text: "MyAnimeList",
  },
  {
    url: "https://9anime.id/",
    text: "9anime",
  },
  {
    url: "https://subsplease.org/",
    text: "SubsPlease",
  },
  {
    url: "https://www.bookdepository.com/",
    text: "Book Depository",
  },
  {
    url: "https://manga4life.com/",
    text: "MangaLife",
  },
  {
    url: "https://mangasee123.com/",
    text: "MangaSee",
  },
  {
    url: "https://store.steampowered.com/",
    text: "Steam",
  },
  {
    url: "https://howlongtobeat.com/",
    text: "HowLongToBeat",
  },
];
