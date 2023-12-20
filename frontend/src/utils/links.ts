import { TNavLinks } from "@/types";
import { EUserRole } from "../../../common/types";

export const navLinks: TNavLinks[] = [
  {
    color: "white",
    icon: "mdi-home",
    name: "HomePage",
    route: EUserRole.PROTECTED,
    url: "/",
    text: "Media-Tracker",
    title: "Home",
  },
  {
    color: "indigo",
    name: "AnimePage",
    icon: "mdi-cat",
    route: EUserRole.PROTECTED,
    url: "/anime",
    text: "Anime",
    title: "Anime",
  },
  {
    color: "purple",
    name: "BooksPage",
    icon: "mdi-book-open-variant",
    route: EUserRole.PROTECTED,
    url: "/books",
    text: "Books",
    title: "Books",
  },
  {
    color: "red",
    name: "CharactersPage",
    icon: "mdi-face-woman",
    route: EUserRole.PROTECTED,
    url: "/characters",
    text: "Characters",
    title: "Characters",
  },
  {
    color: "white",
    name: "EmotesPage",
    icon: "mdi-emoticon",
    route: EUserRole.ADMIN,
    url: "/emotes",
    text: "Emotes",
    title: "Emotes",
  },
  {
    color: "amber",
    name: "GamesPage",
    icon: "mdi-gamepad-square",
    route: EUserRole.PROTECTED,
    url: "/games",
    text: "Games",
    title: "Games",
  },
  {
    color: "green",
    name: "MangaPage",
    icon: "mdi-book-account",
    route: EUserRole.PROTECTED,
    url: "/manga",
    text: "Manga",
    title: "Manga",
  },
  {
    color: "yellow",
    name: "MoviesPage",
    icon: "mdi-movie-open",
    route: EUserRole.PROTECTED,
    url: "/movies",
    text: "Movies",
    title: "Movies",
  },
  {
    color: "blue",
    name: "GenshinImpactPage",
    icon: "mdi-controller",
    route: EUserRole.ADMIN,
    url: "/genshin-impact",
    text: "Genshin Impact",
    title: "Genshin Impact",
  },
  {
    color: "yellow",
    name: "HonkaiStarRailPage",
    icon: "mdi-controller",
    route: EUserRole.ADMIN,
    url: "/honkai-star-rail",
    text: "Honkai: Star Rail",
    title: "Honkai: Star Rail",
  },
  {
    color: "deep-purple",
    name: "MusicPage",
    icon: "mdi-music",
    route: EUserRole.PROTECTED,
    url: "/music",
    text: "Music",
    title: "Music",
  },
  {
    color: "cyan",
    name: "NotesPage",
    icon: "mdi-note",
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
