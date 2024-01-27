import { ref } from "vue";
import { defineStore } from "pinia";
import { sortedIndexBy } from "lodash";
import {
  //* <----- MEDIA ----->
  getMediaCount,
  //* <----- ANIME ----->
  addAnime,
  deleteAnime,
  editAnime,
  getAllAnime,
  getSingleAnime,
  //* <----- BOOKS ----->
  addBook,
  deleteBook,
  editBook,
  getAllBooks,
  getSingleBook,
  //* <----- CHARACTERS ----->
  addCharacter,
  deleteCharacter,
  editCharacter,
  getAllCharacters,
  getSingleCharacter,
  //* <----- EMOTES ----->
  addEmote,
  deleteEmote,
  editEmote,
  getAllEmotes,
  getSingleEmote,
  //* <----- GAMES ----->
  addGame,
  deleteGame,
  editGame,
  getAllGames,
  getSingleGame,
  //* <----- MANGA ----->
  addManga,
  deleteManga,
  editManga,
  getAllManga,
  getSingleManga,
  //* <----- MOVIES ----->
  addMovie,
  deleteMovie,
  editMovie,
  getAllMovies,
  getSingleMovie,
  //* <----- MUSIC ----->
  addMusic,
  deleteMusic,
  editMusic,
  getAllMusic,
  getSingleMusic,
  //* <----- NOTES ----->
  addNote,
  deleteNote,
  editNote,
  getAllNotes,
  getSingleNote,
  //* <----- USER ----->
  getSingleUser,
  editUser,
  getAllMedia,
} from "@/graphql";
import {
  TAnime,
  TAnimeInput,
  TBook,
  TBookInput,
  TCharacter,
  TCharacterInput,
  TEmote,
  TEmoteInput,
  TGame,
  TGameInput,
  TManga,
  TMangaInput,
  TMovie,
  TMovieInput,
  TMusic,
  TMusicInput,
  TNote,
  TNoteInput,
  TUser,
  TUserInput,
} from "@/types";
import { EMediaType, EUserRole, TMediaCount } from "../../../common/types";

export const useMediaStore = defineStore("media", () => {
  //* <----- MEDIA ----->
  const mediaCount = ref<TMediaCount>();
  const setMediaCount = (payload: TMediaCount) => {
    mediaCount.value = payload;
  };

  const fetchMediaCount = async () => {
    try {
      const { data, loading } = await getMediaCount(
        userFromDB.value?.email ?? ""
      );
      isLoading.value = loading;

      setMediaCount({
        anime: data.getAnimeCount,
        books: data.getBookCount,
        characters: data.getCharacterCount,
        emotes: data.getEmoteCount,
        games: data.getGameCount,
        manga: data.getMangaCount,
        movies: data.getMovieCount,
        music: data.getMusicCount,
        notes: data.getNoteCount,
      });
    } catch (err) {
      console.log(err);
    }
  };

  const fetchAllMedia = async () => {
    try {
      const { data, loading } = await getAllMedia(
        userFromDB.value?.email ?? ""
      );
      setAnime(data.getAllAnime);
      setBooks(data.getAllBooks);
      setCharacters(data.getAllCharacters);
      userFromDB.value?.role === EUserRole.ADMIN &&
        setEmotes(data.getAllEmotes);
      setGames(data.getAllGames);
      setManga(data.getAllManga);
      setMovies(data.getAllMovies);
      setMusic(data.getAllMusic);
      setNotes(data.getAllNotes);

      setLoading(loading);
    } catch (err) {
      console.log(err);
    }
  };

  //* <----- ANIME ----->
  const anime = ref<TAnime[]>([]);
  const setAnime = (payload: TAnime[]) => {
    anime.value = payload;
  };
  const singleAnime = ref<TAnime>();
  const setSingleAnime = (payload: TAnime) => {
    singleAnime.value = payload;
  };
  const fetchAnime = async () => {
    try {
      const {
        data,
        loading,
        // error
      } = await getAllAnime(userFromDB.value?.email ?? "", "ALL");
      isLoading.value = loading;
      setAnime(data.getAllAnime);
    } catch (err) {
      console.log(err);
    }
  };
  const fetchSingleAnime = async (id: string) => {
    try {
      const { data, loading } = await getSingleAnime({ id });
      isLoading.value = loading;
      setSingleAnime(data.getSingleAnime);
    } catch (err) {
      console.log(err);
    }
  };
  const submitAddAnime = async (animeInput: TAnimeInput) => {
    try {
      const { data } = await addAnime(userFromDB.value?.email, { animeInput });
      const arrCopy = [...anime.value];
      const index = sortedIndexBy(
        arrCopy,
        data.addAnime,
        (obj) => obj["title"]
      );
      arrCopy.splice(index, 0, data.addAnime);
      setAnime(arrCopy);
      setSnackbar(true, {
        color: "green",
        text: `${EMediaType.ANIME} Added: ${animeInput.title}`,
      });

      console.log(data);
    } catch (err) {
      setSnackbar(true, {
        color: "red",
        text: `Failed to Add ${EMediaType.ANIME}: ${animeInput.title}`,
      });

      throw err;
    }
  };
  const submitDeleteAnime = async (id: string) => {
    try {
      const { data } = await deleteAnime(userFromDB.value?.email, { id });
      setAnime(anime.value.filter((el) => el._id !== id));
      setSnackbar(true, {
        color: "red",
        text: `${EMediaType.ANIME} Deleted`,
      });

      console.log(data);
    } catch (err) {
      setSnackbar(true, {
        color: "red",
        text: `Failed to Delete ${EMediaType.ANIME}`,
      });

      throw err;
    }
  };
  const submitEditAnime = async (id: string, animeInput: TAnimeInput) => {
    try {
      const { data } = await editAnime(userFromDB.value?.email, {
        id,
        animeInput,
      });
      setAnime(
        anime.value.map((el) => (el._id === id ? { ...el, ...animeInput } : el))
      );
      setSnackbar(true, {
        color: "green",
        text: `${EMediaType.ANIME} Updated: ${animeInput.title}`,
      });

      console.log(data);
    } catch (err) {
      setSnackbar(true, {
        color: "red",
        text: `Failed to Update ${EMediaType.ANIME}: ${animeInput.title}`,
      });

      throw err;
    }
  };

  //* <----- BOOKS ----->
  const books = ref<TBook[]>([]);
  const setBooks = (payload: TBook[]) => {
    books.value = payload;
  };
  const singleBook = ref<TBook>();
  const setSingleBook = (payload: TBook) => {
    singleBook.value = payload;
  };
  const fetchBooks = async () => {
    try {
      const { data, loading } = await getAllBooks(
        userFromDB.value?.email ?? "",
        "ALL"
      );
      isLoading.value = loading;
      setBooks(data.getAllBooks);
    } catch (err) {
      console.log(err);
    }
  };
  const fetchSingleBook = async (id: string) => {
    try {
      const { data, loading } = await getSingleBook({ id });
      isLoading.value = loading;
      setSingleBook(data.getSingleBook);
    } catch (err) {
      console.log(err);
    }
  };
  const submitAddBook = async (bookInput: TBookInput) => {
    try {
      const { data } = await addBook(userFromDB.value?.email, { bookInput });
      const arrCopy = [...books.value];
      const index = sortedIndexBy(arrCopy, data.addBook, (obj) => obj["title"]);
      arrCopy.splice(index, 0, data.addBook);
      setBooks(arrCopy);
      setSnackbar(true, {
        color: "green",
        text: `${EMediaType.BOOK} Added: ${bookInput.title}`,
      });

      console.log(data);
    } catch (err) {
      setSnackbar(true, {
        color: "red",
        text: `Failed to Add ${EMediaType.BOOK}: ${bookInput.title}`,
      });

      throw err;
    }
  };
  const submitDeleteBook = async (id: string) => {
    try {
      const { data } = await deleteBook(userFromDB.value?.email, { id });
      setBooks(books.value.filter((book) => book._id !== id));
      setSnackbar(true, {
        color: "red",
        text: `${EMediaType.BOOK} Deleted`,
      });

      console.log(data);
    } catch (err) {
      setSnackbar(true, {
        color: "red",
        text: `Failed to Delete ${EMediaType.BOOK}`,
      });

      throw err;
    }
  };
  const submitEditBook = async (id: string, bookInput: TBookInput) => {
    try {
      const { data } = await editBook(userFromDB.value?.email, {
        id,
        bookInput,
      });
      setBooks(
        books.value.map((book) =>
          book._id === id ? { ...book, ...bookInput } : book
        )
      );
      setSnackbar(true, {
        color: "green",
        text: `${EMediaType.BOOK} Updated: ${bookInput.title}`,
      });

      console.log(data);
    } catch (err) {
      setSnackbar(true, {
        color: "red",
        text: `Failed to Update ${EMediaType.BOOK}: ${bookInput.title}`,
      });

      throw err;
    }
  };

  //* <----- CHARACTERS ----->
  const characters = ref<TCharacter[]>([]);
  const setCharacters = (payload: TCharacter[]) => {
    characters.value = payload;
  };
  const singleCharacter = ref<TCharacter>();
  const setSingleCharacter = (payload: TCharacter) => {
    singleCharacter.value = payload;
  };
  const fetchCharacters = async () => {
    try {
      const { data, loading } = await getAllCharacters(
        userFromDB.value?.email ?? "",
        "ALL"
      );
      isLoading.value = loading;
      setCharacters(data.getAllCharacters);
    } catch (err) {
      console.log(err);
    }
  };
  const fetchSingleCharacter = async (id: string) => {
    try {
      const { data, loading } = await getSingleCharacter({ id });
      isLoading.value = loading;
      setSingleCharacter(data.getSingleCharacter);
    } catch (err) {
      console.log(err);
    }
  };
  const submitAddCharacter = async (characterInput: TCharacterInput) => {
    try {
      const { data } = await addCharacter(userFromDB.value?.email, {
        characterInput,
      });
      const arrCopy = [...characters.value];
      const index = sortedIndexBy(
        arrCopy,
        data.addCharacter,
        (obj) => obj["name"]
      );
      arrCopy.splice(index, 0, data.addCharacter);
      setCharacters(arrCopy);
      setSnackbar(true, {
        color: "green",
        text: `${EMediaType.CHARACTER} Added: ${characterInput.name}`,
      });

      console.log(data);
    } catch (err) {
      setSnackbar(true, {
        color: "red",
        text: `Failed to Add ${EMediaType.ANIME}: ${characterInput.name}`,
      });

      throw err;
    }
  };
  const submitDeleteCharacter = async (id: string) => {
    try {
      const { data } = await deleteCharacter(userFromDB.value?.email, { id });
      setCharacters(
        characters.value.filter((character) => character._id !== id)
      );
      setSnackbar(true, {
        color: "red",
        text: `${EMediaType.CHARACTER} Deleted`,
      });

      console.log(data);
    } catch (err) {
      setSnackbar(true, {
        color: "red",
        text: `Failed to Delete ${EMediaType.CHARACTER}`,
      });

      throw err;
    }
  };
  const submitEditCharacter = async (
    id: string,
    characterInput: TCharacterInput
  ) => {
    try {
      const { data } = await editCharacter(userFromDB.value?.email, {
        id,
        characterInput,
      });
      setCharacters(
        characters.value.map((character) =>
          character._id === id ? { ...character, ...characterInput } : character
        )
      );
      setSnackbar(true, {
        color: "green",
        text: `${EMediaType.CHARACTER} Updated: ${characterInput.name}`,
      });

      console.log(data);
    } catch (err) {
      setSnackbar(true, {
        color: "red",
        text: `Failed to Update ${EMediaType.CHARACTER}: ${characterInput.name}`,
      });

      throw err;
    }
  };

  //* <----- EMOTES ----->
  const emotes = ref<TEmote[]>([]);
  const setEmotes = (payload: TEmote[]) => {
    emotes.value = payload;
  };
  const singleEmote = ref<TEmote>();
  const setSingleEmote = (payload: TEmote) => {
    singleEmote.value = payload;
  };
  const fetchEmotes = async () => {
    try {
      const { data, loading } = await getAllEmotes(
        userFromDB.value?.email ?? ""
      );
      isLoading.value = loading;
      setEmotes(data.getAllEmotes);
    } catch (err) {
      console.log(err);
    }
  };
  const fetchSingleEmote = async (id: string) => {
    try {
      const { data, loading } = await getSingleEmote({ id });
      isLoading.value = loading;
      setSingleEmote(data.getSingleEmote);
    } catch (err) {
      console.log(err);
    }
  };
  const submitAddEmote = async (emoteInput: TEmoteInput) => {
    try {
      const { data } = await addEmote(userFromDB.value?.email, { emoteInput });
      const arrCopy = [...emotes.value];
      const index = sortedIndexBy(arrCopy, data.addEmote, (obj) => obj["name"]);
      arrCopy.splice(index, 0, data.addEmote);
      setEmotes(arrCopy);
      setSnackbar(true, {
        color: "green",
        img: emoteInput.url,
        text: `Emote Added: ${emoteInput.name}`,
      });

      console.log(data);
    } catch (err) {
      setSnackbar(true, {
        color: "red",
        img: emoteInput.url,
        text: `Failed to Add Emote ${emoteInput.name}`,
      });

      throw err;
    }
  };
  const submitDeleteEmote = async (id: string) => {
    try {
      const { data } = await deleteEmote(userFromDB.value?.email, { id });
      setEmotes(emotes.value.filter((emote) => emote._id !== id));
      setSnackbar(true, {
        color: "red",
        text: `Emote Deleted`,
      });

      console.log(data);
    } catch (err) {
      setSnackbar(true, {
        color: "red",
        text: `Failed to Delete Emote`,
      });
    }
  };
  const submitEditEmote = async (id: string, emoteInput: TEmoteInput) => {
    try {
      const { data } = await editEmote(userFromDB.value?.email, {
        id,
        emoteInput,
      });
      setEmotes(
        emotes.value.map((emote) =>
          emote._id === id ? { ...emote, ...emoteInput } : emote
        )
      );
      setSnackbar(true, {
        color: "green",
        img: emoteInput.url,
        text: `Emote Updated: ${emoteInput.name}`,
      });

      console.log(data);
    } catch (err) {
      setSnackbar(true, {
        color: "red",
        img: emoteInput.url,
        text: `Failed to Update Emote: ${emoteInput.name}`,
      });

      throw err;
    }
  };

  //* <----- GAMES ----->
  const games = ref<TGame[]>([]);
  const setGames = (payload: TGame[]) => {
    games.value = payload;
  };
  const singleGame = ref<TGame>();
  const setSingleGame = (payload: TGame) => {
    singleGame.value = payload;
  };
  const fetchGames = async () => {
    try {
      const { data, loading } = await getAllGames(
        userFromDB.value?.email ?? "",
        "ALL"
      );
      isLoading.value = loading;
      setGames(data.getAllGames);
    } catch (err) {
      console.log(err);
    }
  };
  const fetchSingleGame = async (id: string) => {
    try {
      const { data, loading } = await getSingleGame({ id });
      isLoading.value = loading;
      setSingleGame(data.getSingleGame);
    } catch (err) {
      console.log(err);
    }
  };
  const submitAddGame = async (gameInput: TGameInput) => {
    try {
      const { data } = await addGame(userFromDB.value?.email, { gameInput });
      const arrCopy = [...games.value];
      const index = sortedIndexBy(arrCopy, data.addGame, (obj) => obj["title"]);
      arrCopy.splice(index, 0, data.addGame);
      setGames(arrCopy);
      setSnackbar(true, {
        color: "green",
        text: `${EMediaType.GAME} Added: ${gameInput.title}`,
      });

      console.log(data);
    } catch (err) {
      setSnackbar(true, {
        color: "red",
        text: `Failed to Add ${EMediaType.GAME}: ${gameInput.title}`,
      });

      throw err;
    }
  };
  const submitDeleteGame = async (id: string) => {
    try {
      const { data } = await deleteGame(userFromDB.value?.email, { id });
      setGames(games.value.filter((game) => game._id !== id));
      setSnackbar(true, {
        color: "red",
        text: `${EMediaType.GAME} Deleted`,
      });

      console.log(data);
    } catch (err) {
      setSnackbar(true, {
        color: "red",
        text: `Failed to Delete ${EMediaType.GAME}`,
      });

      throw err;
    }
  };
  const submitEditGame = async (id: string, gameInput: TGameInput) => {
    try {
      const { data } = await editGame(userFromDB.value?.email, {
        id,
        gameInput,
      });
      setGames(
        games.value.map((game) =>
          game._id === id ? { ...game, ...gameInput } : game
        )
      );
      setSnackbar(true, {
        color: "green",
        text: `${EMediaType.GAME} Updated: ${gameInput.title}`,
      });

      console.log(data);
    } catch (err) {
      setSnackbar(true, {
        color: "red",
        text: `Failed to Update ${EMediaType.GAME}: ${gameInput.title}`,
      });

      throw err;
    }
  };

  //* <----- MANGA ----->
  const manga = ref<TManga[]>([]);
  const setManga = (payload: TManga[]) => {
    manga.value = payload;
  };
  const singleManga = ref<TManga>();
  const setSingleManga = (payload: TManga) => {
    singleManga.value = payload;
  };
  const fetchManga = async () => {
    try {
      const { data, loading } = await getAllManga(
        userFromDB.value?.email ?? "",
        "ALL"
      );
      isLoading.value = loading;
      setManga(data.getAllManga);
    } catch (err) {
      console.log(err);
    }
  };
  const fetchSingleManga = async (id: string) => {
    try {
      const { data, loading } = await getSingleManga({ id });
      isLoading.value = loading;
      setSingleManga(data.getSingleManga);
    } catch (err) {
      console.log(err);
    }
  };
  const submitAddManga = async (mangaInput: TMangaInput) => {
    try {
      const { data } = await addManga(userFromDB.value?.email, { mangaInput });
      const arrCopy = [...manga.value];
      const index = sortedIndexBy(
        arrCopy,
        data.addManga,
        (obj) => obj["title"]
      );
      arrCopy.splice(index, 0, data.addManga);
      setManga(arrCopy);
      setSnackbar(true, {
        color: "green",
        text: `${EMediaType.MANGA} Added: ${mangaInput.title}`,
      });

      console.log(data);
    } catch (err) {
      setSnackbar(true, {
        color: "red",
        text: `Failed to Add ${EMediaType.MANGA}: ${mangaInput.title}`,
      });

      throw err;
    }
  };
  const submitDeleteManga = async (id: string) => {
    try {
      const { data } = await deleteManga(userFromDB.value?.email, { id });
      setManga(manga.value.filter((el) => el._id !== id));
      setSnackbar(true, {
        color: "red",
        text: `${EMediaType.MANGA} Deleted`,
      });

      console.log(data);
    } catch (err) {
      setSnackbar(true, {
        color: "red",
        text: `Failed to Delete ${EMediaType.MANGA}`,
      });

      throw err;
    }
  };
  const submitEditManga = async (id: string, mangaInput: TMangaInput) => {
    try {
      const { data } = await editManga(userFromDB.value?.email, {
        id,
        mangaInput,
      });
      setManga(
        manga.value.map((el) => (el._id === id ? { ...el, ...mangaInput } : el))
      );
      setSnackbar(true, {
        color: "green",
        text: `${EMediaType.MANGA} Updated: ${mangaInput.title}`,
      });

      console.log(data);
    } catch (err) {
      setSnackbar(true, {
        color: "red",
        text: `Failed to Update ${EMediaType.MANGA}: ${mangaInput.title}`,
      });

      throw err;
    }
  };

  //* <----- MOVIES ----->
  const movies = ref<TMovie[]>([]);
  const setMovies = (payload: TMovie[]) => {
    movies.value = payload;
  };
  const singleMovie = ref<TMovie>();
  const setSingleMovie = (payload: TMovie) => {
    singleMovie.value = payload;
  };
  const fetchMovies = async () => {
    try {
      const { data, loading } = await getAllMovies(
        userFromDB.value?.email ?? "",
        "ALL"
      );
      isLoading.value = loading;
      setMovies(data.getAllMovies);
    } catch (err) {
      console.log(err);
    }
  };
  const fetchSingleMovie = async (id: string) => {
    try {
      const { data, loading } = await getSingleMovie({ id });
      isLoading.value = loading;
      setSingleMovie(data.getSingleMovie);
    } catch (err) {
      console.log(err);
    }
  };
  const submitAddMovie = async (movieInput: TMovieInput) => {
    try {
      const { data } = await addMovie(userFromDB.value?.email, { movieInput });
      const arrCopy = [...movies.value];
      const index = sortedIndexBy(
        arrCopy,
        data.addMovie,
        (obj) => obj["title"]
      );
      arrCopy.splice(index, 0, data.addMovie);
      setMovies(arrCopy);
      setSnackbar(true, {
        color: "green",
        text: `${EMediaType.MOVIE} Added: ${movieInput.title}`,
      });

      console.log(data);
    } catch (err) {
      setSnackbar(true, {
        color: "red",
        text: `Failed to Add ${EMediaType.MOVIE}: ${movieInput.title}`,
      });

      throw err;
    }
  };
  const submitDeleteMovie = async (id: string) => {
    try {
      const { data } = await deleteMovie(userFromDB.value?.email, { id });
      setMovies(movies.value.filter((movie) => movie._id !== id));
      setSnackbar(true, {
        color: "red",
        text: `${EMediaType.MOVIE} Deleted`,
      });

      console.log(data);
    } catch (err) {
      setSnackbar(true, {
        color: "red",
        text: `Failed to Delete ${EMediaType.MOVIE}`,
      });

      throw err;
    }
  };
  const submitEditMovie = async (id: string, movieInput: TMovieInput) => {
    try {
      const { data } = await editMovie(userFromDB.value?.email, {
        id,
        movieInput,
      });
      setMovies(
        movies.value.map((movie) =>
          movie._id === id ? { ...movie, ...movieInput } : movie
        )
      );
      setSnackbar(true, {
        color: "green",
        text: `${EMediaType.MOVIE} Updated: ${movieInput.title}`,
      });

      console.log(data);
    } catch (err) {
      setSnackbar(true, {
        color: "red",
        text: `Failed to Update ${EMediaType.MOVIE}: ${movieInput.title}`,
      });

      throw err;
    }
  };

  //* <----- MUSIC ----->
  const music = ref<TMusic[]>([]);
  const setMusic = (payload: TMusic[]) => {
    music.value = payload;
  };
  const singleMusic = ref<TMusic>();
  const setSingleMusic = (payload: TMusic) => {
    singleMusic.value = payload;
  };
  const fetchMusic = async () => {
    try {
      const { data, loading } = await getAllMusic(
        userFromDB.value?.email ?? "",
        "ALL"
      );
      isLoading.value = loading;
      setMusic(data.getAllMusic);
    } catch (err) {
      console.log(err);
    }
  };
  const fetchSingleMusic = async (id: string) => {
    try {
      const { data, loading } = await getSingleMusic({ id });
      isLoading.value = loading;
      setSingleMusic(data.getSingleMusic);
    } catch (err) {
      console.log(err);
    }
  };
  const submitAddMusic = async (musicInput: TMusicInput) => {
    try {
      const { data } = await addMusic(userFromDB.value?.email, { musicInput });
      const arrCopy = [...music.value];
      const index = sortedIndexBy(
        arrCopy,
        data.addMusic,
        (obj) => obj["artist"]
      );
      arrCopy.splice(index, 0, data.addMusic);
      setMusic(arrCopy);
      setSnackbar(true, {
        color: "green",
        text: `Song Added: ${musicInput.artist} - ${musicInput.title}`,
      });

      console.log(data);
    } catch (err) {
      setSnackbar(true, {
        color: "red",
        text: `Failed to Add Song: ${musicInput.artist} - ${musicInput.title}`,
      });

      throw err;
    }
  };
  const submitDeleteMusic = async (id: string) => {
    try {
      const { data } = await deleteMusic(userFromDB.value?.email, { id });
      setMusic(music.value.filter((el) => el._id !== id));
      setSnackbar(true, {
        color: "red",
        text: `Song Deleted`,
      });

      console.log(data);
    } catch (err) {
      setSnackbar(true, {
        color: "red",
        text: `Failed to Delete Song`,
      });

      throw err;
    }
  };
  const submitEditMusic = async (id: string, musicInput: TMusicInput) => {
    try {
      const { data } = await editMusic(userFromDB.value?.email, {
        id,
        musicInput,
      });
      setMusic(
        music.value.map((el) => (el._id === id ? { ...el, ...musicInput } : el))
      );
      setSnackbar(true, {
        color: "green",
        text: `Song Updated: ${musicInput.artist} - ${musicInput.title}`,
      });

      console.log(data);
    } catch (err) {
      setSnackbar(true, {
        color: "red",
        text: `Failed to Update Song: ${musicInput.artist} - ${musicInput.title}`,
      });

      throw err;
    }
  };

  //* <----- NOTES ----->
  const notes = ref<TNote[]>([]);
  const setNotes = (payload: TNote[]) => {
    notes.value = payload;
  };
  const singleNote = ref<TNote>();
  const setSingleNote = (payload: TNote) => {
    singleNote.value = payload;
  };
  const fetchNotes = async () => {
    try {
      const { data, loading } = await getAllNotes(
        userFromDB.value?.email ?? ""
      );
      isLoading.value = loading;
      setNotes(data.getAllNotes);
    } catch (err) {
      console.log(err);
    }
  };
  const fetchSingleNote = async (id: string) => {
    try {
      const { data, loading } = await getSingleNote({ id });
      isLoading.value = loading;
      setSingleNote(data.getSingleNote);
    } catch (err) {
      console.log(err);
    }
  };
  const submitAddNote = async (noteInput: TNoteInput) => {
    try {
      const { data } = await addNote(userFromDB.value?.email, { noteInput });
      const arrCopy = [...notes.value];
      arrCopy.splice(0, 0, data.addNote);
      setNotes(arrCopy);
      setSnackbar(true, {
        color: "green",
        text: `Note Added: ${noteInput.title}`,
      });

      console.log(data);
    } catch (err) {
      setSnackbar(true, {
        color: "red",
        text: `Failed to Add Note: ${noteInput.title}`,
      });

      throw err;
    }
  };
  const submitDeleteNote = async (id: string) => {
    try {
      const { data } = await deleteNote(userFromDB.value?.email, { id });
      setNotes(notes.value.filter((note) => note._id !== id));
      setSnackbar(true, {
        color: "red",
        text: `Note Deleted`,
      });

      console.log(data);
    } catch (err) {
      setSnackbar(true, {
        color: "red",
        text: `Failed to Delete Note`,
      });

      throw err;
    }
  };
  const submitEditNote = async (id: string, noteInput: TNoteInput) => {
    try {
      const { data } = await editNote(userFromDB.value?.email, {
        id,
        noteInput,
      });
      setNotes(
        notes.value.map((note) =>
          note._id === id ? { ...note, ...noteInput } : note
        )
      );
      setSnackbar(true, {
        color: "green",
        text: `Note Updated: ${noteInput.title}`,
      });

      console.log(data);
    } catch (err) {
      setSnackbar(true, {
        color: "red",
        text: `Failed to Update Note: ${noteInput.title}`,
      });

      throw err;
    }
  };

  //* <----- USER ----->
  const userFromDB = ref<TUser>();
  const setUserFromDB = (payload: TUser) => {
    userFromDB.value = payload;
  };
  const fetchUser = async (email: string) => {
    try {
      const { data } = await getSingleUser(email);
      setUserFromDB(data.getSingleUser);
    } catch (err) {
      console.log(err);
    }
  };
  const submitEditUser = async (userInput: TUserInput) => {
    try {
      const { data } = await editUser(userFromDB.value?.email, userInput);
      setSnackbar(true, {
        color: "green",
        text: `Profile Updated`,
      });

      console.log(data);
    } catch (err) {
      setSnackbar(true, {
        color: "red",
        text: `Failed to Update Profile`,
      });

      throw err;
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
    fetchMediaCount,
    fetchAllMedia,
    mediaCount,
    setMediaCount,
    //* <----- ANIME ----->
    anime,
    setAnime,
    singleAnime,
    setSingleAnime,
    fetchAnime,
    fetchSingleAnime,
    submitAddAnime,
    submitDeleteAnime,
    submitEditAnime,
    //* <----- BOOKS ----->
    books,
    setBooks,
    singleBook,
    setSingleBook,
    fetchBooks,
    fetchSingleBook,
    submitAddBook,
    submitDeleteBook,
    submitEditBook,
    //* <----- CHARACTERS ----->
    characters,
    setCharacters,
    singleCharacter,
    setSingleCharacter,
    fetchCharacters,
    fetchSingleCharacter,
    submitAddCharacter,
    submitDeleteCharacter,
    submitEditCharacter,
    //* <----- EMOTES ----->
    emotes,
    setEmotes,
    singleEmote,
    setSingleEmote,
    fetchEmotes,
    fetchSingleEmote,
    submitAddEmote,
    submitDeleteEmote,
    submitEditEmote,
    //* <----- GAMES ----->
    games,
    setGames,
    singleGame,
    setSingleGame,
    fetchGames,
    fetchSingleGame,
    submitAddGame,
    submitDeleteGame,
    submitEditGame,
    //* <----- MANGA ----->
    manga,
    setManga,
    singleManga,
    setSingleManga,
    fetchManga,
    fetchSingleManga,
    submitAddManga,
    submitDeleteManga,
    submitEditManga,
    //* <----- MOVIES ----->
    movies,
    setMovies,
    singleMovie,
    setSingleMovie,
    fetchMovies,
    fetchSingleMovie,
    submitAddMovie,
    submitDeleteMovie,
    submitEditMovie,
    //* <----- MUSIC ----->
    music,
    setMusic,
    singleMusic,
    setSingleMusic,
    fetchMusic,
    fetchSingleMusic,
    submitAddMusic,
    submitDeleteMusic,
    submitEditMusic,
    //* <----- NOTES ----->
    notes,
    setNotes,
    singleNote,
    setSingleNote,
    fetchNotes,
    fetchSingleNote,
    submitAddNote,
    submitDeleteNote,
    submitEditNote,
    //* <----- USER ----->
    userFromDB,
    setUserFromDB,
    fetchUser,
    submitEditUser,
    //* <----- UTILS ----->
    isLoading,
    setLoading,
    snackbar,
    snackbarOptions,
    setSnackbar,
  };
});
