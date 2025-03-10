
import { TEmote } from '@/types';
import { defineStore } from "pinia";
import { ref } from "vue";

export const useEmotesStore = defineStore("emotes", () => {
  const emotes = ref<TEmote[]>([]);
  const setEmotes = (payload: TEmote[]) => {
    emotes.value = payload;
  };

  const fetchAllEmotes = async (mediaData: { emotes: TEmote[]; }) => {
    return mediaData.emotes.map((item) => ({
      ...item,
      favourites: (item.favourites as unknown as string) === "TRUE"
    }));
  };

  return { emotes, setEmotes, fetchAllEmotes };
});
