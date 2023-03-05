import { defineStore } from "pinia";
import { ref } from "vue";
import {
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
} from "@/graphql";
import { TAnime, TAnimeInput, TManga, TMangaInput } from "@/types";

export const useMediaStore = defineStore("media", () => {
  //* <----- UTILS ----->
  const isLoading = ref<boolean>(true);
  const setLoading = (payload: boolean): boolean => (isLoading.value = payload);

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
      const { data } = await addAnime({ animeInput });
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };
  const submitEditAnime = async (id: string, animeInput: TAnimeInput) => {
    try {
      const { data } = await editAnime({ id, animeInput });
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };
  const submitDeleteAnime = async (id: string) => {
    try {
      const { data } = await deleteAnime({ id });
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
      const {
        data,
        loading,
        // error
      } = await getAllManga();
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
      const { data } = await addManga({ mangaInput });
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };
  const submitEditManga = async (id: string, mangaInput: TMangaInput) => {
    try {
      const { data } = await editManga({ id, mangaInput });
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };
  const submitDeleteManga = async (id: string) => {
    try {
      const { data } = await deleteManga({ id });
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };

  return {
    //* <----- UTILS ----->
    isLoading,
    setLoading,
    //* <----- ANIME ----->
    anime,
    singleAnime,
    setSingleAnime,
    setAnime,
    fetchAnime,
    fetchSingleAnime,
    submitAddAnime,
    submitEditAnime,
    submitDeleteAnime,
    //* <----- MANGA ----->
    manga,
    singleManga,
    setSingleManga,
    setManga,
    fetchManga,
    fetchSingleManga,
    submitAddManga,
    submitEditManga,
    submitDeleteManga,
  };
});
