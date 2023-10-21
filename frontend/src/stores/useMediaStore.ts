import { ref } from "vue";
import { defineStore } from "pinia";
import { sortedIndexBy } from "lodash";
import {
  //* <----- ALL MEDIA ----->
  getAllMedia,
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

export const useMediaStore = defineStore("media", () => {
  //* <----- ALL MEDIA ----->
  const fetchAllMedia = async (email: string) => {
    try {
      const { data, loading } = await getAllMedia(email);
      isLoading.value = loading;
      setAnime(data.getAllAnime);
      setBooks(data.getAllBooks);
      setCharacters(data.getAllCharacters);
      setEmotes(data.getAllEmotes);
      setGames(data.getAllGames);
      setManga(data.getAllManga);
      setMovies(data.getAllMovies);
      setMusic(data.getAllMusic);
      setNotes(data.getAllNotes);
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
  const fetchAnime = async (email: string) => {
    try {
      const {
        data,
        loading,
        // error
      } = await getAllAnime(email);
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
      const { data } = await addAnime(googleUser.value?.email, { animeInput });
      const arrCopy = [...anime.value];
      const index = sortedIndexBy(
        arrCopy,
        data.addAnime,
        (obj) => obj["title"]
      );
      arrCopy.splice(index, 0, data.addAnime);

      setAnime(arrCopy);
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };
  const submitDeleteAnime = async (id: string) => {
    try {
      const { data } = await deleteAnime(googleUser.value?.email, { id });
      setAnime(anime.value.filter((el) => el._id !== id));

      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };
  const submitEditAnime = async (id: string, animeInput: TAnimeInput) => {
    try {
      const { data } = await editAnime(googleUser.value?.email, {
        id,
        animeInput,
      });
      setAnime(
        anime.value.map((el) => (el._id === id ? { ...el, ...animeInput } : el))
      );

      console.log({ data });
    } catch (err) {
      console.log(err);
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
  const fetchBooks = async (email: string) => {
    try {
      const { data, loading } = await getAllBooks(email);
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
      const { data } = await addBook(googleUser.value?.email, { bookInput });
      const arrCopy = [...books.value];
      const index = sortedIndexBy(arrCopy, data.addBook, (obj) => obj["title"]);
      arrCopy.splice(index, 0, data.addBook);

      setBooks(arrCopy);
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };
  const submitDeleteBook = async (id: string) => {
    try {
      const { data } = await deleteBook(googleUser.value?.email, { id });
      setBooks(books.value.filter((book) => book._id !== id));

      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };
  const submitEditBook = async (id: string, bookInput: TBookInput) => {
    try {
      const { data } = await editBook(googleUser.value?.email, {
        id,
        bookInput,
      });
      setBooks(
        books.value.map((book) =>
          book._id === id ? { ...book, ...bookInput } : book
        )
      );

      console.log(data);
    } catch (err) {
      console.log(err);
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
  const fetchCharacters = async (email: string) => {
    try {
      const { data, loading } = await getAllCharacters(email);
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
      const { data } = await addCharacter(googleUser.value?.email, {
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
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };
  const submitDeleteCharacter = async (id: string) => {
    try {
      const { data } = await deleteCharacter(googleUser.value?.email, { id });
      setCharacters(
        characters.value.filter((character) => character._id !== id)
      );

      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };
  const submitEditCharacter = async (
    id: string,
    characterInput: TCharacterInput
  ) => {
    try {
      const { data } = await editCharacter(googleUser.value?.email, {
        id,
        characterInput,
      });
      setCharacters(
        characters.value.map((character) =>
          character._id === id ? { ...character, ...characterInput } : character
        )
      );

      console.log(data);
    } catch (err) {
      console.log(err);
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
  const fetchEmotes = async (email: string) => {
    try {
      const { data, loading } = await getAllEmotes(email);
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
      const { data } = await addEmote(googleUser.value?.email, { emoteInput });
      const arrCopy = [...emotes.value];
      const index = sortedIndexBy(arrCopy, data.addEmote, (obj) => obj["name"]);
      arrCopy.splice(index, 0, data.addEmote);

      setEmotes(arrCopy);
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };
  const submitDeleteEmote = async (id: string) => {
    try {
      const { data } = await deleteEmote(googleUser.value?.email, { id });
      setEmotes(emotes.value.filter((emote) => emote._id !== id));

      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };
  const submitEditEmote = async (id: string, emoteInput: TEmoteInput) => {
    try {
      const { data } = await editEmote(googleUser.value?.email, {
        id,
        emoteInput,
      });
      setEmotes(
        emotes.value.map((emote) =>
          emote._id === id ? { ...emote, ...emoteInput } : emote
        )
      );

      console.log(data);
    } catch (err) {
      console.log(err);
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
  const fetchGames = async (email: string) => {
    try {
      const { data, loading } = await getAllGames(email);
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
      const { data } = await addGame(googleUser.value?.email, { gameInput });
      const arrCopy = [...games.value];
      const index = sortedIndexBy(arrCopy, data.addGame, (obj) => obj["title"]);
      arrCopy.splice(index, 0, data.addGame);

      setGames(arrCopy);
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };
  const submitDeleteGame = async (id: string) => {
    try {
      const { data } = await deleteGame(googleUser.value?.email, { id });
      setGames(games.value.filter((game) => game._id !== id));

      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };
  const submitEditGame = async (id: string, gameInput: TGameInput) => {
    try {
      const { data } = await editGame(googleUser.value?.email, {
        id,
        gameInput,
      });
      setGames(
        games.value.map((game) =>
          game._id === id ? { ...game, ...gameInput } : game
        )
      );

      console.log(data);
    } catch (err) {
      console.log(err);
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
  const fetchManga = async (email: string) => {
    try {
      const { data, loading } = await getAllManga(email);
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
      const { data } = await addManga(googleUser.value?.email, { mangaInput });
      const arrCopy = [...manga.value];
      const index = sortedIndexBy(
        arrCopy,
        data.addManga,
        (obj) => obj["title"]
      );
      arrCopy.splice(index, 0, data.addManga);

      setManga(arrCopy);
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };
  const submitDeleteManga = async (id: string) => {
    try {
      const { data } = await deleteManga(googleUser.value?.email, { id });
      setManga(manga.value.filter((el) => el._id !== id));

      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };
  const submitEditManga = async (id: string, mangaInput: TMangaInput) => {
    try {
      const { data } = await editManga(googleUser.value?.email, {
        id,
        mangaInput,
      });
      setManga(
        manga.value.map((el) => (el._id === id ? { ...el, ...mangaInput } : el))
      );

      console.log(data);
    } catch (err) {
      console.log(err);
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
  const fetchMovies = async (email: string) => {
    try {
      const { data, loading } = await getAllMovies(email);
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
      const { data } = await addMovie(googleUser.value?.email, { movieInput });
      const arrCopy = [...movies.value];
      const index = sortedIndexBy(
        arrCopy,
        data.addMovie,
        (obj) => obj["title"]
      );
      arrCopy.splice(index, 0, data.addMovie);

      setMovies(arrCopy);
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };
  const submitDeleteMovie = async (id: string) => {
    try {
      const { data } = await deleteMovie(googleUser.value?.email, { id });
      setMovies(movies.value.filter((movie) => movie._id !== id));

      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };
  const submitEditMovie = async (id: string, movieInput: TMovieInput) => {
    try {
      const { data } = await editMovie(googleUser.value?.email, {
        id,
        movieInput,
      });
      setMovies(
        movies.value.map((movie) =>
          movie._id === id ? { ...movie, ...movieInput } : movie
        )
      );

      console.log(data);
    } catch (err) {
      console.log(err);
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
  const fetchMusic = async (email: string) => {
    try {
      const { data, loading } = await getAllMusic(email);
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
      const { data } = await addMusic(googleUser.value?.email, { musicInput });
      const arrCopy = [...music.value];
      const index = sortedIndexBy(
        arrCopy,
        data.addMusic,
        (obj) => obj["artist"]
      );
      arrCopy.splice(index, 0, data.addMusic);

      setMusic(arrCopy);
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };
  const submitDeleteMusic = async (id: string) => {
    try {
      const { data } = await deleteMusic(googleUser.value?.email, { id });
      setMusic(music.value.filter((el) => el._id !== id));

      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };
  const submitEditMusic = async (id: string, musicInput: TMusicInput) => {
    try {
      const { data } = await editMusic(googleUser.value?.email, {
        id,
        musicInput,
      });
      setMusic(
        music.value.map((el) => (el._id === id ? { ...el, ...musicInput } : el))
      );

      console.log(data);
    } catch (err) {
      console.log(err);
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
  const fetchNotes = async (email: string) => {
    try {
      const { data, loading } = await getAllNotes(email);
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
      const { data } = await addNote(googleUser.value?.email, { noteInput });
      const arrCopy = [...notes.value];
      arrCopy.splice(0, 0, data.addNote);

      setNotes(arrCopy);
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };
  const submitDeleteNote = async (id: string) => {
    try {
      const { data } = await deleteNote(googleUser.value?.email, { id });
      setNotes(notes.value.filter((note) => note._id !== id));

      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };
  const submitEditNote = async (id: string, noteInput: TNoteInput) => {
    try {
      const { data } = await editNote(googleUser.value?.email, {
        id,
        noteInput,
      });
      setNotes(
        notes.value.map((note) =>
          note._id === id ? { ...note, ...noteInput } : note
        )
      );

      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };

  //* <----- USER ----->
  const googleUser = ref<TUser>();
  const setGoogleUser = (payload: TUser) => {
    googleUser.value = payload;
  };
  const userFromDB = ref<TUser>();
  const setUserFromDB = (payload: TUser) => {
    userFromDB.value = payload;
  };
  const fetchUser = async (email: string, id: string) => {
    try {
      const { data } = await getSingleUser(email, { id });
      setUserFromDB(data.getSingleUser);
      setGoogleUser(data.getSingleUser);
    } catch (err) {
      console.log(err);
    }
  };
  const submitEditUser = async (
    id: string | undefined,
    userInput: TUserInput
  ) => {
    try {
      const { data } = await editUser(googleUser.value?.email, {
        id,
        userInput,
      });

      console.log({ data });
    } catch (err) {
      console.log(err);
    }
  };

  //* <----- UTILS ----->
  const isLoading = ref<boolean>(true);
  const setLoading = (payload: boolean): boolean => (isLoading.value = payload);

  return {
    //* <----- ALL MEDIA ----->
    fetchAllMedia,
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
    googleUser,
    setGoogleUser,
    userFromDB,
    setUserFromDB,
    fetchUser,
    submitEditUser,
    //* <----- UTILS ----->
    isLoading,
    setLoading,
  };
});
