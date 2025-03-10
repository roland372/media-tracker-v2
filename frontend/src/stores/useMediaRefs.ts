import { useAnimeStore } from '@/stores/useAnimeStore';
import { useBooksStore } from '@/stores/useBooksStore';
import { useCharactersStore } from '@/stores/useCharactersStore';
import { useEmotesStore } from '@/stores/useEmotesStore';
import { useGamesStore } from '@/stores/useGamesStore';
import { useMangaStore } from '@/stores/useMangaStore';
import { useMoviesStore } from '@/stores/useMoviesStore';
import { useUsersStore } from '@/stores/useUsersStore';
import { useUtilsStore } from '@/stores/useUtilsStore';
import { storeToRefs } from "pinia";

export const useMediaRefs = () => {
  const animeStore = useAnimeStore();
  const charactersStore = useCharactersStore();
  const emotesStore = useEmotesStore();
  const gamesStore = useGamesStore();
  const mangaStore = useMangaStore();
  const booksStore = useBooksStore();
  const moviesStore = useMoviesStore();
  const usersStore = useUsersStore();
  const utilsStore = useUtilsStore();

  return {
    ...storeToRefs(animeStore),
    ...storeToRefs(charactersStore),
    ...storeToRefs(emotesStore),
    ...storeToRefs(gamesStore),
    ...storeToRefs(mangaStore),
    ...storeToRefs(booksStore),
    ...storeToRefs(moviesStore),
    ...storeToRefs(usersStore),
    ...storeToRefs(utilsStore),
  };
};
