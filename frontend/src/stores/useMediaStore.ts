/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  EUserRole,
  TAnime,
  TBook,
  TCharacter,
  TEmote,
  TGame,
  TManga,
  TMovie,
  TUser,
} from "@/types";
import { toNumber } from '@/utils/mediaUtils';
import { defineStore } from "pinia";
import { ref } from "vue";

export const useMediaStore = defineStore("media", () => {
  //* <----- MEDIA ----->
  const fetchAllMedia = async (mediaData: any) => {
    try {
      const animeData = mediaData.anime.map((item: any) => ({
        ...item,
        rating: toNumber(item.rating),
        episodesMin: toNumber(item.episodesMin),
        episodesMax: toNumber(item.episodesMax),
        favourites: item.favourites === "TRUE"
      }));

      const booksData = mediaData.books.map((item: any) => ({
        ...item,
        pages: toNumber(item.pages),
        rating: toNumber(item.rating),
        favourites: item.favourites === "TRUE"
      }));

      const charactersData = mediaData.characters.map((item: any) => ({
        ...item,
        favourites: item.favourites === "TRUE"
      }));

      const emotesData = mediaData.emotes.map((item: any) => ({
        ...item,
        favourites: item.favourites === "TRUE"
      }));

      const gamesData = mediaData.games.map((item: any) => ({
        ...item,
        rating: toNumber(item.rating),
        playtime: toNumber(item.playtime),
        favourites: item.favourites === "TRUE"
      }));

      const mangaData = mediaData.manga.map((item: any) => ({
        ...item,
        rating: toNumber(item.rating),
        chaptersMax: toNumber(item.chaptersMax),
        chaptersMin: toNumber(item.chaptersMin),
        volumesMin: toNumber(item.volumesMin),
        volumesMax: toNumber(item.volumesMax),
        favourites: item.favourites === "TRUE"
      }));

      const moviesData = mediaData.movies.map((item: any) => ({
        ...item,
        rating: toNumber(item.rating),
        episodesMin: toNumber(item.episodesMin),
        episodesMax: toNumber(item.episodesMax),
        seasonsMin: toNumber(item.seasonsMin),
        seasonsMax: toNumber(item.seasonsMax),
        favourites: item.favourites === "TRUE"
      }));

      setAnime(animeData);
      setBooks(booksData);
      setCharacters(charactersData);
      userFromDB.value?.role === EUserRole.ADMIN && setEmotes(emotesData);
      setGames(gamesData);
      setManga(mangaData);
      setMovies(moviesData);
    } catch (err) {
      console.log(err);
    }
  };

  //* <----- ANIME ----->
  const anime = ref<TAnime[]>([]);
  const setAnime = (payload: TAnime[]) => {
    anime.value = payload;
  };

  //* <----- BOOKS ----->
  const books = ref<TBook[]>([]);
  const setBooks = (payload: TBook[]) => {
    books.value = payload;
  };

  //* <----- CHARACTERS ----->
  const characters = ref<TCharacter[]>([]);
  const setCharacters = (payload: TCharacter[]) => {
    characters.value = payload;
  };

  //* <----- EMOTES ----->
  const emotes = ref<TEmote[]>([]);
  const setEmotes = (payload: TEmote[]) => {
    emotes.value = payload;
  };

  //* <----- GAMES ----->
  const games = ref<TGame[]>([]);
  const setGames = (payload: TGame[]) => {
    games.value = payload;
  };

  //* <----- MANGA ----->
  const manga = ref<TManga[]>([]);
  const setManga = (payload: TManga[]) => {
    manga.value = payload;
  };

  //* <----- MOVIES ----->
  const movies = ref<TMovie[]>([]);
  const setMovies = (payload: TMovie[]) => {
    movies.value = payload;
  };

  //* <----- USER ----->
  const userFromDB = ref<TUser>();
  const setUserFromDB = (payload: TUser) => {
    userFromDB.value = payload;
  };
  const fetchUser = async (userData: any) => {
    try {
      setUserFromDB(userData);
    } catch (err) {
      console.log(err);
    }
  };

  //* <----- UTILS ----->
  const isLoading = ref<boolean>(true);
  const setLoading = (payload: boolean): boolean => (isLoading.value = payload);

  type TSnackbarOptions = {
    color?: string;
    img?: string;
    text: string;
  };

  const snackbar = ref<boolean>(false);
  const snackbarOptions = ref<TSnackbarOptions>({
    color: "",
    img: "",
    text: "",
  });

  const setSnackbar = (
    value: boolean,
    options: TSnackbarOptions = {
      text: "",
      color: "",
      img: "",
    }
  ) => {
    snackbar.value = value;
    snackbarOptions.value = options;
  };

  return {
    //* <----- MEDIA ----->
    fetchAllMedia,
    //* <----- ANIME ----->
    anime,
    setAnime,
    //* <----- BOOKS ----->
    books,
    setBooks,
    //* <----- CHARACTERS ----->
    characters,
    setCharacters,
    //* <----- EMOTES ----->
    emotes,
    setEmotes,
    //* <----- GAMES ----->
    games,
    setGames,
    //* <----- MANGA ----->
    manga,
    setManga,
    //* <----- MOVIES ----->
    movies,
    setMovies,
    //* <----- USER ----->
    userFromDB,
    setUserFromDB,
    fetchUser,
    //* <----- UTILS ----->
    isLoading,
    setLoading,
    snackbar,
    snackbarOptions,
    setSnackbar,
  };
});
