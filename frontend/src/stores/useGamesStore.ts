
import { TGame } from '@/types';
import { toNumber } from '@/utils/mediaUtils';
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
      rating: toNumber(item.rating),
      playtime: toNumber(item.playtime),
      favourites: (item.favourites as unknown as string) === "TRUE"
    }));
  };

  return { games, setGames, fetchAllGames };
});
