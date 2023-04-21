import { TNavLinks, TUsefulLinks } from "@/types";

export const navLinks: TNavLinks[] = [
  {
    name: "HomePage",
    route: "normal",
    url: "/",
    text: "Media-Tracker",
    title: "Home",
  },
  {
    name: "AnimePage",
    route: "protected",
    url: "/anime",
    text: "Anime",
    title: "Anime",
  },
  {
    name: "GamesPage",
    route: "protected",
    url: "/games",
    text: "Games",
    title: "Games",
  },
  {
    name: "MangaPage",
    route: "protected",
    url: "/manga",
    text: "Manga",
    title: "Manga",
  },
  {
    name: "CharactersPage",
    route: "protected",
    url: "/characters",
    text: "Characters",
    title: "Characters",
  },
  {
    name: "ChartsPage",
    route: "protected",
    url: "/charts",
    text: "Charts",
    title: "Charts",
  },
  {
    name: "NewsPage",
    route: "normal",
    url: "/news",
    text: "News",
    title: "News",
  },
  {
    name: "NotesPage",
    route: "admin",
    url: "/notes",
    text: "Notes",
    title: "Notes",
  },
  {
    name: "EmotesPage",
    route: "admin",
    url: "/emotes",
    text: "Emotes",
    title: "Emotes",
  },
  {
    name: "AboutPage",
    route: "normal",
    url: "/about",
    text: "About",
    title: "About",
  },
  {
    name: "ProfilePage",
    route: "protected",
    url: "/profile",
    text: "Profile",
    title: "Profile",
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
