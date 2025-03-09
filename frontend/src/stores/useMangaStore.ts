import { TManga } from '@/types';
import { toNumber } from '@/utils/mediaUtils';
import { defineStore } from "pinia";
import { ref } from "vue";

export const useMangaStore = defineStore("manga", () => {
  const manga = ref<TManga[]>([]);
  const setManga = (payload: TManga[]) => {
    manga.value = payload;
  };

  const fetchAllManga = async (mediaData: any) => {
    return mediaData.manga.map((item: any) => ({
      ...item,
      rating: toNumber(item.rating),
      chaptersMax: toNumber(item.chaptersMax),
      chaptersMin: toNumber(item.chaptersMin),
      volumesMin: toNumber(item.volumesMin),
      volumesMax: toNumber(item.volumesMax),
      favourites: item.favourites === "TRUE"
    }));
  };

  return { manga, setManga, fetchAllManga };
});
