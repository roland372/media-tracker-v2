import { TAnime } from '@/types';
import { toNumber } from '@/utils/mediaUtils';
import { defineStore } from "pinia";
import { ref } from "vue";

export const useAnimeStore = defineStore("anime", () => {
  const anime = ref<TAnime[]>([]);
  const setAnime = (payload: TAnime[]) => {
    anime.value = payload;
  };

  const fetchAllAnime = async (mediaData: { anime: TAnime[]; }) => {
    return mediaData.anime.map((item) => ({
      ...item,
      episodesMin: toNumber(item.episodesMin),
      episodesMax: toNumber(item.episodesMax),
      favourites: (item.favourites as unknown as string) === "TRUE"
    }));
  };

  return { anime, setAnime, fetchAllAnime };
});
