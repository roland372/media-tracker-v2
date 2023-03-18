import { Ref } from "vue";

export const favouriteMedia = (media: Ref) =>
  media.value.filter((el: { favourites: boolean }) => el.favourites);

export const sortMediaByDate = (media: Ref) =>
  [...media.value].sort(
    (a: { lastModified: number }, b: { lastModified: number }) =>
      b.lastModified - a.lastModified
  );

export const filterMediaStatus = (media: Ref, status: string) =>
  [...media.value].filter(
    (media) => media.status.toLowerCase() === status.toLowerCase()
  );
