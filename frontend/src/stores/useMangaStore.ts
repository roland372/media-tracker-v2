import { TManga } from '@/types';
import { toNumber } from '@/utils/mediaUtils';
import { defineStore } from "pinia";
import { ref } from "vue";

export const useMangaStore = defineStore("manga", () => {
  const manga = ref<TManga[]>([]);
  const setManga = (payload: TManga[]) => {
    manga.value = payload;
  };

  const fetchAllManga = async (mediaData: { manga: TManga[]; }) => {
    return mediaData.manga.map((item) => ({
      ...item,
      chaptersMax: toNumber(item.chaptersMax),
      chaptersMin: toNumber(item.chaptersMin),
      volumesMin: toNumber(item.volumesMin),
      volumesMax: toNumber(item.volumesMax),
      favourites: (item.favourites as unknown as string) === "TRUE"
    }));
  };

  return { manga, setManga, fetchAllManga };
});
