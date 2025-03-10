
import { TCharacter } from '@/types';
import { defineStore } from "pinia";
import { ref } from "vue";

export const useCharactersStore = defineStore("characters", () => {
  const characters = ref<TCharacter[]>([]);
  const setCharacters = (payload: TCharacter[]) => {
    characters.value = payload;
  };
  const fetchAllCharacters = async (mediaData: { characters: TCharacter[]; }) => {
    return mediaData.characters.map((item) => ({
      ...item,
      favourites: (item.favourites as unknown as string) === "TRUE"
    }));
  };

  return { characters, setCharacters, fetchAllCharacters };
});
