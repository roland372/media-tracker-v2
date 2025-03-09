
import { TCharacter } from '@/types';
import { defineStore } from "pinia";
import { ref } from "vue";

export const useCharactersStore = defineStore("characters", () => {
  const characters = ref<TCharacter[]>([]);
  const setCharacters = (payload: TCharacter[]) => {
    characters.value = payload;
  };
  const fetchAllCharacters = async (mediaData: any) => {
    return mediaData.characters.map((item: any) => ({
      ...item,
      favourites: item.favourites === "TRUE"
    }));
  };

  return { characters, setCharacters, fetchAllCharacters };
});
