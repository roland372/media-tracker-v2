import { Ref } from "vue";
import { EAnimeType, EAnimeStatus } from "@/types";

export const favouriteMedia = (media: Ref) =>
  media.value.filter((el: { favourites: boolean }) => el.favourites);

export const sortMediaByDate = (media: Ref) =>
  [...media.value].sort(
    (a: { lastModified: number }, b: { lastModified: number }) =>
      b.lastModified - a.lastModified
  );

export const sortArrayByPropertyASC = (media: Ref, property: string) => {
  return [...media.value].sort((a, b) =>
    a[property].localeCompare(b[property])
  );
};

export const sortArrayByPropertyDESC = (media: Ref, property: string) => {
  return [...media.value].sort((a, b) =>
    b[property].localeCompare(a[property])
  );
};

export const filterMediaStatus = (media: Ref, status: string) =>
  [...media.value].filter(
    (media) => media.status.toLowerCase() === status.toLowerCase()
  );

export const filterGameSource = (media: Ref, source: string) =>
  [...media.value].filter(
    (media) => media.source.toLowerCase() === source.toLowerCase()
  );

export const round = (value: number, precision: number) => {
  const multiplier = Math.pow(10, precision || 0);
  return Math.round(value * multiplier) / multiplier;
};

export const calculatePercentage = (numerator: number, denominator: number) =>
  (numerator / denominator) * 100;

export const mediaRating = [10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0];

export const animeType = [
  EAnimeType.MOVIE,
  EAnimeType.ONA,
  EAnimeType.OVA,
  EAnimeType.SPECIAL,
  EAnimeType.TV_SHOW,
];

export const animeStatus = [
  EAnimeStatus.WATCHING,
  EAnimeStatus.COMPLETED,
  EAnimeStatus.ON_HOLD,
  EAnimeStatus.DROPPED,
  EAnimeStatus.PLAN_TO_WATCH,
];
// ⭐
