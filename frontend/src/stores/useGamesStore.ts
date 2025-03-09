
import { TGame } from '@/types';
import { toNumber } from '@/utils/mediaUtils';
import { defineStore } from "pinia";
import { ref } from "vue";

export const useGamesStore = defineStore("games", () => {
  const games = ref<TGame[]>([]);
  const setGames = (payload: TGame[]) => {
    games.value = payload;
  };

  const fetchAllGames = async (mediaData: any) => {
    return mediaData.games.map((item: any) => ({
      ...item,
      rating: toNumber(item.rating),
      playtime: toNumber(item.playtime),
      favourites: item.favourites === "TRUE"
    }));
  };

  return { games, setGames, fetchAllGames };
});
