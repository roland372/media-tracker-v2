import { defineStore } from "pinia";
import { ref } from "vue";
import {
  //* <----- USER ----->
  getSingleUser,
  editUser,
  //* <----- ANIME ----->
  getAllAnime,
  getSingleAnime,
  addAnime,
  editAnime,
  deleteAnime,
  //* <----- MANGA ----->
  getAllManga,
  getSingleManga,
  addManga,
  editManga,
  deleteManga,
  //* <----- GAMES ----->
  getAllGames,
  getSingleGame,
  addGame,
  editGame,
  deleteGame,
  //* <----- CHARACTERS ----->
  getAllCharacters,
  getSingleCharacter,
  addCharacter,
  editCharacter,
  deleteCharacter,
  //* <----- EMOTES ----->
  getAllEmotes,
  getSingleEmote,
  addEmote,
  editEmote,
  deleteEmote,
  //* <----- NOTES ----->
  getAllNotes,
  getSingleNote,
  addNote,
  editNote,
  deleteNote,
  //* <----- ALL MEDIA ----->
  getAllMedia,
} from "@/graphql";
import {
  TUser,
  TUserInput,
  TAnime,
  TAnimeInput,
  TManga,
  TMangaInput,
  TGame,
  TGameInput,
  TCharacter,
  TCharacterInput,
  TEmote,
  TEmoteInput,
  TNote,
  TNoteInput,
} from "@/types";

import { sortedIndexBy } from "lodash";

export const useMediaStore = defineStore("media", () => {
  //* <----- UTILS ----->
  const isLoading = ref<boolean>(true);
  const setLoading = (payload: boolean): boolean => (isLoading.value = payload);

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
      } = await getAllAnime();
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
  const submitDeleteAnime = async (id: string) => {
    try {
      const { data } = await deleteAnime(googleUser.value?.email, { id });
      setAnime(anime.value.filter((el) => el._id !== id));

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
  const fetchManga = async () => {
    try {
      const { data, loading } = await getAllManga();
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
  const submitDeleteManga = async (id: string) => {
    try {
      const { data } = await deleteManga(googleUser.value?.email, { id });
      setManga(manga.value.filter((el) => el._id !== id));

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
  const submitDeleteGame = async (id: string) => {
    try {
      const { data } = await deleteGame(googleUser.value?.email, { id });
      setGames(games.value.filter((game) => game._id !== id));

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
  const fetchCharacters = async () => {
    try {
      const { data, loading } = await getAllCharacters();
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
      const { data, loading } = await getAllEmotes();
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

  const submitDeleteEmote = async (id: string) => {
    try {
      const { data } = await deleteEmote(googleUser.value?.email, { id });
      setEmotes(emotes.value.filter((emote) => emote._id !== id));

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
  const fetchNotes = async () => {
    try {
      const { data, loading } = await getAllNotes();
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
  const submitDeleteNote = async (id: string) => {
    try {
      const { data } = await deleteNote(googleUser.value?.email, { id });
      setNotes(notes.value.filter((note) => note._id !== id));

      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };

  //* <----- ALL MEDIA ----->
  const fetchAllMedia = async (email: string) => {
    try {
      const { data, loading } = await getAllMedia(email);
      isLoading.value = loading;
      setAnime(data.getAllAnime);
      setManga(data.getAllManga);
      setGames(data.getAllGames);
      setCharacters(data.getAllCharacters);
      setEmotes(data.getAllEmotes);
      setNotes(data.getAllNotes);
    } catch (err) {
      console.log(err);
    }
  };

  return {
    //* <----- UTILS ----->
    isLoading,
    setLoading,
    //* <----- USER ----->
    googleUser,
    setGoogleUser,
    userFromDB,
    setUserFromDB,
    fetchUser,
    submitEditUser,
    //* <----- ANIME ----->
    anime,
    setAnime,
    singleAnime,
    setSingleAnime,
    fetchAnime,
    fetchSingleAnime,
    submitAddAnime,
    submitEditAnime,
    submitDeleteAnime,
    //* <----- MANGA ----->
    manga,
    setManga,
    singleManga,
    setSingleManga,
    fetchManga,
    fetchSingleManga,
    submitAddManga,
    submitEditManga,
    submitDeleteManga,
    //* <----- GAMES ----->
    games,
    setGames,
    singleGame,
    setSingleGame,
    fetchGames,
    fetchSingleGame,
    submitAddGame,
    submitEditGame,
    submitDeleteGame,
    //* <----- CHARACTERS ----->
    characters,
    setCharacters,
    singleCharacter,
    setSingleCharacter,
    fetchCharacters,
    fetchSingleCharacter,
    submitAddCharacter,
    submitEditCharacter,
    submitDeleteCharacter,
    //* <----- EMOTES ----->
    emotes,
    setEmotes,
    singleEmote,
    setSingleEmote,
    fetchEmotes,
    fetchSingleEmote,
    submitAddEmote,
    submitEditEmote,
    submitDeleteEmote,
    //* <----- NOTES ----->
    notes,
    setNotes,
    singleNote,
    setSingleNote,
    fetchNotes,
    fetchSingleNote,
    submitAddNote,
    submitEditNote,
    submitDeleteNote,
    //* <----- ALL MEDIA ----->
    fetchAllMedia,
  };
});
