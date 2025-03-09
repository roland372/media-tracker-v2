import { TMovie } from '@/types';
import { toNumber } from '@/utils/mediaUtils';
import { defineStore } from "pinia";
import { ref } from "vue";

export const useMoviesStore = defineStore("movies", () => {
  const movies = ref<TMovie[]>([]);
  const setMovies = (payload: TMovie[]) => {
    movies.value = payload;
  };

  const fetchAllMovies = async (mediaData: any) => {
    return mediaData.movies.map((item: any) => ({
      ...item,
      rating: toNumber(item.rating),
      episodesMin: toNumber(item.episodesMin),
      episodesMax: toNumber(item.episodesMax),
      seasonsMin: toNumber(item.seasonsMin),
      seasonsMax: toNumber(item.seasonsMax),
      favourites: item.favourites === "TRUE"
    }));
  };

  return { movies, setMovies, fetchAllMovies };
});
