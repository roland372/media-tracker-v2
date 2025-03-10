import { TMediaData } from '@/types';
import { defineStore } from "pinia";
import { useAnimeStore } from './useAnimeStore';
import { useBooksStore } from './useBooksStore';
import { useCharactersStore } from './useCharactersStore';
import { useEmotesStore } from './useEmotesStore';
import { useGamesStore } from './useGamesStore';
import { useMangaStore } from './useMangaStore';
import { useMoviesStore } from './useMoviesStore';

export const useMediaStore = defineStore("media", () => {
  const fetchAllMedia = async (mediaData: TMediaData) => {
    const animeStore = useAnimeStore();
    const booksStore = useBooksStore();
    const charactersStore = useCharactersStore();
    const emotesStore = useEmotesStore();
    const gamesStore = useGamesStore();
    const mangaStore = useMangaStore();
    const moviesStore = useMoviesStore();

    try {
      animeStore.setAnime(await animeStore.fetchAllAnime(mediaData || []));
      booksStore.setBooks(await booksStore.fetchAllBooks(mediaData || []));
      charactersStore.setCharacters(await charactersStore.fetchAllCharacters(mediaData || []));
      emotesStore.setEmotes(await emotesStore.fetchAllEmotes(mediaData || []));
      gamesStore.setGames(await gamesStore.fetchAllGames(mediaData || []));
      mangaStore.setManga(await mangaStore.fetchAllManga(mediaData || []));
      moviesStore.setMovies(await moviesStore.fetchAllMovies(mediaData || []));
    } catch (err) {
      console.log(err);
    }
  };

  return { fetchAllMedia };
});
