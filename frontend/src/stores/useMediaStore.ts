import { defineStore } from "pinia";
import { ref } from "vue";
import {
  getAllAnime,
  getSingleAnime,
  addAnime,
  editAnime,
  deleteAnime,
} from "@/graphql";
import { TAnime, TAnimeInput } from "@/types";

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

  return {
    isLoading,
    setLoading,
    anime,
    singleAnime,
    setSingleAnime,
    setAnime,
    fetchAnime,
    fetchSingleAnime,
    submitAddAnime,
    submitEditAnime,
    submitDeleteAnime,
  };
});
