import { TMovie } from '@/types';
import { toNumber } from '@/utils/mediaUtils';
import { defineStore } from "pinia";
import { ref } from "vue";

export const useMoviesStore = defineStore("movies", () => {
  const movies = ref<TMovie[]>([]);
  const setMovies = (payload: TMovie[]) => {
    movies.value = payload;
  };

  const fetchAllMovies = async (mediaData: { movies: TMovie[]; }) => {
    return mediaData.movies.map((item) => ({
      ...item,
      episodesMin: toNumber(item.episodesMin),
      episodesMax: toNumber(item.episodesMax),
      seasonsMin: toNumber(item.seasonsMin),
      seasonsMax: toNumber(item.seasonsMax),
      favourites: (item.favourites as unknown as string) === "TRUE"
    }));
  };

  return { movies, setMovies, fetchAllMovies };
});
