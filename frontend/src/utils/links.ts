import { TNavLinks, EUserRole } from "@/types";

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
    name: "BooksPage",
    route: EUserRole.PROTECTED,
    url: "/books",
    text: "Books",
    title: "Books",
  },
  {
    name: "CharactersPage",
    route: EUserRole.PROTECTED,
    url: "/characters",
    text: "Characters",
    title: "Characters",
  },
  {
    name: "EmotesPage",
    route: EUserRole.ADMIN,
    url: "/emotes",
    text: "Emotes",
    title: "Emotes",
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
    name: "MoviesPage",
    route: EUserRole.PROTECTED,
    url: "/movies",
    text: "Movies",
    title: "Movies",
  },
  {
    name: "MusicPage",
    route: EUserRole.PROTECTED,
    url: "/music",
    text: "Music",
    title: "Music",
  },
  {
    name: "NotesPage",
    route: EUserRole.PROTECTED,
    url: "/notes",
    text: "Notes",
    title: "Notes",
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
  // {
  //   name: "AboutPage",
  //   route: EUserRole.PROTECTED,
  //   url: "/about",
  //   text: "About",
  //   title: "About",
  // },
  // {
  //   name: "ProfilePage",
  //   route: EUserRole.PROTECTED,
  //   url: "/profile",
  //   text: "Profile",
  //   title: "Profile",
  // },
];

export const usefulLinks = {
  anime: [
    {
      url: "https://9anime.to/",
      text: "9anime",
    },
    {
      url: "https://www.erai-raws.info/",
      text: "Erai-raws",
    },
    {
      url: "https://subsplease.org/",
      text: "SubsPlease",
    },
  ],
  books: [
    {
      url: "https://www.amazon.com/",
      text: "Amazon - Kindle Store",
    },
  ],
  games: [
    {
      url: "https://erogedownload.com/downloads/",
      text: "Eroge Download",
    },
    {
      url: "https://howlongtobeat.com/",
      text: "HowLongToBeat",
    },
    {
      url: "https://www.igdb.com/",
      text: "IGDB",
    },
    {
      url: "https://www.ryuugames.com/",
      text: "Ryuugames",
    },
    {
      url: "https://www.skidrowcodex.net/",
      text: "SKiDROW CODEX GAMES",
    },
    {
      url: "https://steamunlocked.net/",
      text: "STEAMUNLOCKED",
    },
    {
      url: "https://store.steampowered.com/",
      text: "Steam",
    },
    {
      url: "https://vndb.org/",
      text: "The Visual Novel Database",
    },
  ],
  manga: [
    {
      url: "https://www.justlightnovels.com/light-novels-list/",
      text: "Just Light Novels",
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
      url: "https://tachiyomi.org/",
      text: "Tachiyomi",
    },
  ],
  movies: [
    {
      url: "https://bflix.io/home",
      text: "BFLIX",
    },
    {
      url: "https://lookmovie2.to/",
      text: "Lookmovie",
    },
    {
      url: "https://kissasian.pe/",
      text: "Kissasian",
    },
    {
      url: "https://movies2watch.tv/",
      text: "Movies2Watch",
    },
    {
      url: "https://www.themoviedb.org/",
      text: "The Movie Database",
    },
  ],
  other: [
    {
      url: "https://www.1337x.tw/",
      text: "1337x",
    },
    {
      url: "https://myanimelist.net/",
      text: "MyAnimeList",
    },
    {
      url: "https://thepiratebay.org/index.html",
      text: "The Pirate Bay",
    },
  ],
};
