import { Ref } from "vue";
import {
  EAnimeStatus,
  EAnimeType,
  EBookStatus,
  ECharacterGender,
  ECharacterSource,
  EGameStatus,
  EGameType,
  EMangaStatus,
  EMangaType,
  EMediaType,
  EMovieStatus,
  EMovieType,
  EMusicCategory,
} from "@/types";

export const calculatePercentage = (numerator: number, denominator: number) =>
  (numerator / denominator) * 100;

export const favouriteMedia = (media: Ref) =>
  media.value.filter((el: { favourites: boolean }) => el.favourites);

export const fetchMediaURL = (
  mediaType: string,
  query: string,
  orderBy: string,
  sort: string
) =>
  `https://api.jikan.moe/v4/${mediaType}?q=${query}&order_by=${orderBy}&sort=${sort}`;

export const filterGameSource = (media: Ref, source: string) =>
  [...media.value].filter(
    (media) => media.source.toLowerCase() === source.toLowerCase()
  );

export const filterMediaStatus = (media: Ref, status: string) =>
  [...media.value].filter(
    (media) => media.status.toLowerCase() === status.toLowerCase()
  );

export const round = (value: number, precision: number) => {
  const multiplier = Math.pow(10, precision || 0);
  return Math.round(value * multiplier) / multiplier;
};

export const sortMediaByDate = (media: Ref) =>
  [...media.value].sort(
    (a: { lastModified: number }, b: { lastModified: number }) =>
      b.lastModified - a.lastModified
  );

export const animeStatus = [
  EAnimeStatus.WATCHING,
  EAnimeStatus.COMPLETED,
  EAnimeStatus.ON_HOLD,
  EAnimeStatus.DROPPED,
  EAnimeStatus.PLAN_TO_WATCH,
];

export const animeType = [
  EAnimeType.MOVIE,
  EAnimeType.ONA,
  EAnimeType.OVA,
  EAnimeType.SPECIAL,
  EAnimeType.TV_SHOW,
];

export const bookStatus = [
  EBookStatus.READING,
  EBookStatus.COMPLETED,
  EBookStatus.ON_HOLD,
  EBookStatus.DROPPED,
  EBookStatus.PLAN_TO_READ,
];

export const characterGender = [
  ECharacterGender.FEMALE,
  ECharacterGender.MALE,
  ECharacterGender.OTHER,
];

export const characterSource = [
  ECharacterSource.ANIME,
  ECharacterSource.GAME,
  ECharacterSource.MANGA,
];

export const gameStatus = [
  EGameStatus.PLAYING,
  EGameStatus.COMPLETED,
  EGameStatus.ON_HOLD,
  EGameStatus.DROPPED,
  EGameStatus.PLAN_TO_PLAY,
];

export const gameType = [EGameType.GAME, EGameType.VISUAL_NOVEL];

export const mangaStatus = [
  EMangaStatus.READING,
  EMangaStatus.COMPLETED,
  EMangaStatus.ON_HOLD,
  EMangaStatus.DROPPED,
  EMangaStatus.PLAN_TO_READ,
];

export const mangaType = [
  EMangaType.DOUJINSHI,
  EMangaType.LIGHT_NOVEL,
  EMangaType.MANGA,
  EMangaType.MANHUA,
  EMangaType.NOVEL,
  EMangaType.ONE_SHOT,
  EMangaType.WEBTOON,
];

export const mediaList = [
  EMediaType.ANIME,
  EMediaType.BOOK,
  EMediaType.CHARACTER,
  EMediaType.GAME,
  EMediaType.MANGA,
  EMediaType.MOVIE,
];

export const mediaRating = [10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0];

export const movieStatus = [
  EMovieStatus.WATCHING,
  EMovieStatus.COMPLETED,
  EMovieStatus.ON_HOLD,
  EMovieStatus.DROPPED,
  EMovieStatus.PLAN_TO_WATCH,
];

export const movieType = [EMovieType.MOVIE, EMovieType.TV_SHOW];

export const musicCategory = [
  EMusicCategory.ANIME,
  EMusicCategory.GAME,
  EMusicCategory.JAPANESE,
  EMusicCategory.OTHER,
  EMusicCategory.TOUHOU,
];

export const placeholderImg = "https://placehold.co/225x300?text=Image";
export const placeholderMusicImg = "https://placehold.co/600x400";
