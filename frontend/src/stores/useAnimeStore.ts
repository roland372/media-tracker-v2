import { TAnime } from '@/types';
import { toNumber } from '@/utils/mediaUtils';
import { defineStore } from "pinia";
import { ref } from "vue";

export const useAnimeStore = defineStore("anime", () => {
  const anime = ref<TAnime[]>([]);
  const setAnime = (payload: TAnime[]) => {
    anime.value = payload;
  };

  const fetchAllAnime = async (mediaData: any) => {
    return mediaData.anime.map((item: any) => ({
      ...item,
      rating: toNumber(item.rating),
      episodesMin: toNumber(item.episodesMin),
      episodesMax: toNumber(item.episodesMax),
      favourites: item.favourites === "TRUE"
    }));
  };

  return { anime, setAnime, fetchAllAnime };
});
