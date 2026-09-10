import { TGame } from '@/types';
import { parseSeriesOrder, toNumber } from '@/utils/mediaUtils';
import { defineStore } from "pinia";
import { ref } from "vue";

export const useGamesStore = defineStore("games", () => {
  const games = ref<TGame[]>([]);
  const setGames = (payload: TGame[]) => {
    games.value = payload;
  };

  const fetchAllGames = async (mediaData: { games: TGame[]; }) => {
    return mediaData.games.map((item) => ({
      ...item,
      playtime: toNumber(item.playtime),
      seriesOrder: parseSeriesOrder(item.seriesOrder),
      favourites: (item.favourites as unknown as string) === "TRUE"
    }));
  };

  return { games, setGames, fetchAllGames };
});
