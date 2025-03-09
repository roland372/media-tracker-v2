
import { TEmote } from '@/types';
import { defineStore } from "pinia";
import { ref } from "vue";

export const useEmotesStore = defineStore("emotes", () => {
  const emotes = ref<TEmote[]>([]);
  const setEmotes = (payload: TEmote[]) => {
    emotes.value = payload;
  };

  const fetchAllEmotes = async (mediaData: any) => {
    return mediaData.emotes.map((item: any) => ({
      ...item,
      favourites: item.favourites === "TRUE"
    }));
  };

  return { emotes, setEmotes, fetchAllEmotes };
});
