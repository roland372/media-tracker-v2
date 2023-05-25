import { TNavLinks, TUsefulLinks, EUserRole } from "@/types";

export const navLinks: TNavLinks[] = [
  {
    name: "HomePage",
    route: EUserRole.PROTECTED,
    url: "/",
    text: "Media-Tracker",
    title: "Home",
  },
  {
    name: "AnimePage",
    route: EUserRole.PROTECTED,
    url: "/anime",
    text: "Anime",
    title: "Anime",
  },
  {
    name: "GamesPage",
    route: EUserRole.PROTECTED,
    url: "/games",
    text: "Games",
    title: "Games",
  },
  {
    name: "MangaPage",
    route: EUserRole.PROTECTED,
    url: "/manga",
    text: "Manga",
    title: "Manga",
  },
  {
    name: "CharactersPage",
    route: EUserRole.PROTECTED,
    url: "/characters",
    text: "Characters",
    title: "Characters",
  },
  {
    name: "MoviesPage",
    route: EUserRole.PROTECTED,
    url: "/movies",
    text: "Movies",
    title: "Movies",
  },
  {
    name: "BooksPage",
    route: EUserRole.PROTECTED,
    url: "/books",
    text: "Books",
    title: "Books",
  },
  // {
  //   name: "ChartsPage",
  //   route: EUserRole.PROTECTED,
  //   url: "/charts",
  //   text: "Charts",
  //   title: "Charts",
  // },
  // {
  //   name: "NewsPage",
  //   route: EUserRole.PROTECTED,
  //   url: "/news",
  //   text: "News",
  //   title: "News",
  // },
  {
    name: "NotesPage",
    route: EUserRole.PROTECTED,
    url: "/notes",
    text: "Notes",
    title: "Notes",
  },
  {
    name: "EmotesPage",
    route: EUserRole.ADMIN,
    url: "/emotes",
    text: "Emotes",
    title: "Emotes",
  },
  // {
  //   name: "AboutPage",
  //   route: EUserRole.PROTECTED,
  //   url: "/about",
  //   text: "About",
  //   title: "About",
  // },
  {
    name: "ProfilePage",
    route: EUserRole.PROTECTED,
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
