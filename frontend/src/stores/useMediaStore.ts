/* eslint-disable @typescript-eslint/no-explicit-any */
import { ref } from "vue";
import { defineStore } from "pinia";
import {
  TAnime,
  TBook,
  TCharacter,
  TEmote,
  TGame,
  TManga,
  TMovie,
  TMusic,
  TNote,
  TUser,
} from "@/types";
import { EUserRole } from "../../../common/types";

export const useMediaStore = defineStore("media", () => {
  //* <----- MEDIA ----->
  const fetchAllMedia = async (mediaData: any) => {
    try {
      const animeData = mediaData.anime.slice(1).map((item: any) => ({
        title: item[0].toString(),
        imageURL: item[1].toString(),
        type: item[2],
        link: item[3],
        linkName: item[4],
        rating: +item[5],
        status: item[6],
        episodesMax: +item[7],
        episodesMin: +item[8],
        favourites: item[9],
        createdAt: item[10],
        updatedAt: item[11],
      }));

      const booksData = mediaData.books.slice(1).map((item: any) => ({
        title: item[0].toString(),
        author: item[1].toString(),
        imageURL: item[2].toString(),
        link: item[3],
        linkName: item[4],
        genre: item[5],
        pages: +item[6],
        rating: +item[7],
        status: item[8],
        favourites: item[9],
        createdAt: item[10],
        updatedAt: item[11],
      }));

      const charactersData = mediaData.characters.slice(1).map((item: any) => ({
        name: item[0].toString(),
        imageURL: item[1].toString(),
        link: item[2],
        linkName: item[3],
        source: item[4],
        gender: item[5],
        series: item[6],
        hairColor: item[7],
        favourites: item[8],
        createdAt: item[9],
        updatedAt: item[10],
      }));

      const emotesData = mediaData.emotes.slice(1).map((item: any) => ({
        name: item[0].toString(),
        url: item[1].toString(),
        favourites: item[2],
        createdAt: item[3],
        updatedAt: item[4],
      }));

      const gamesData = mediaData.games.slice(1).map((item: any) => ({
        title: item[0].toString(),
        imageURL: item[1].toString(),
        type: item[2],
        link: item[3],
        linkName: item[4],
        rating: +item[5],
        playtime: +item[6],
        status: item[7],
        favourites: item[8],
        createdAt: item[9],
        updatedAt: item[10],
      }));

      const mangaData = mediaData.manga.slice(1).map((item: any) => ({
        title: item[0].toString(),
        imageURL: item[1].toString(),
        type: item[2],
        link: item[3],
        linkName: item[4],
        rating: +item[5],
        status: item[6],
        chaptersMax: +item[7],
        chaptersMin: +item[8],
        volumesMin: +item[9],
        volumesMax: +item[10],
        favourites: item[11],
        createdAt: item[12],
        updatedAt: item[13],
      }));

      const moviesData = mediaData.movies.slice(1).map((item: any) => ({
        title: item[0].toString(),
        imageURL: item[1].toString(),
        type: item[2],
        link: item[3],
        linkName: item[4],
        rating: +item[5],
        status: item[6],
        episodesMin: +item[7],
        episodesMax: +item[8],
        seasonsMin: +item[9],
        seasonsMax: +item[10],
        favourites: item[11],
        createdAt: item[12],
        updatedAt: item[13],
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

  //* <----- MUSIC ----->
  const music = ref<TMusic[]>([]);
  const setMusic = (payload: TMusic[]) => {
    music.value = payload;
  };

  //* <----- NOTES ----->
  const notes = ref<TNote[]>([]);
  const setNotes = (payload: TNote[]) => {
    notes.value = payload;
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
    //* <----- MUSIC ----->
    music,
    setMusic,
    //* <----- NOTES ----->
    notes,
    setNotes,
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
