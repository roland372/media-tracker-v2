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
  TDateRange,
} from "@/types";
import { Ref } from "vue";

export const calculatePercentage = (numerator: number, denominator: number) =>
  (numerator / denominator) * 100;

export const favouriteMedia = (media: Ref) =>
  media.value.filter((el: { favourites: boolean; }) => el.favourites);

export const fetchMediaURL = (
  mediaType: string,
  query: string,
  orderBy: string,
  sort: string
) =>
  `https://api.jikan.moe/v4/${mediaType}?q=${query}&order_by=${orderBy}&sort=${sort}`;

export const fetchMusicURL = (query: string) =>
  `https://www.googleapis.com/youtube/v3/search?part=snippet&key=${process.env.VUE_APP_YOUTUBE_API_KEY}&type=video&regionCode=us&maxResults=20&q=${query}`;

export const filterGameSource = (media: Ref, source: string) =>
  [...media.value].filter(
    (media) => media.source.toLowerCase() === source.toLowerCase()
  );

export const filterMediaStatus = (media: Ref, status: string) =>
  [...media.value].filter(
    (media) => media.status.toLowerCase() === status.toLowerCase()
  );

export const formatDate = (date?: Date) => {
  const createDate = date ? new Date(date) : new Date();

  return createDate.toLocaleDateString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
  });
};

export const round = (value: number, precision: number) => {
  const multiplier = Math.pow(10, precision || 0);
  return Math.round(value * multiplier) / multiplier;
};

export const toNumber = (value: string | number): number => {
  const num = +value;
  return isNaN(num) ? 0 : num;
};

export const sortBy = <T>(item: T, sortField: keyof T) => {
  const value = item[sortField];
  return typeof value === 'string' ? value.toLowerCase() : value;
};

export const isWithinDateRange = (
  value: Date | string | undefined,
  range?: TDateRange
) => {
  if (!range || (!range.start && !range.end)) return true;
  if (!value) return false;

  const itemDate = new Date(value);
  if (isNaN(itemDate.getTime())) return false;

  const startDate = range.start ? new Date(range.start) : null;
  const endDate = range.end ? new Date(range.end) : null;
  if (endDate) {
    endDate.setHours(23, 59, 59, 999);
  }

  const afterStart = !startDate || itemDate >= startDate;
  const beforeEnd = !endDate || itemDate <= endDate;

  return afterStart && beforeEnd;
};

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

/**
 * Returns progress items with percentages or zeroed values if total is 0
 */
export function getProgressItems(
  total: number,
  items: { color: string; value: number; }[]
): { color: string; value: number; }[] {
  if (total === 0) {
    return items.map(item => ({ ...item, value: 0 }));
  }
  return items;
}

/**
 * Extracts search term from a flag-based search query
 * @param searchTerm The full search query
 * @param flag The flag to extract (e.g., 't:', 's:', 'a:', etc.)
 * @returns The extracted search term for the specific flag
 */
export function extractFlagSearchTerm(searchTerm: string, flag: string): string {
  const flagIndex = searchTerm.indexOf(flag);
  if (flagIndex === -1) return '';

  // Extract the search term
  let extractedTerm = '';
  // Get text after flag (e.g., 't:') until next flag or end of string
  const nextFlagIndex = searchTerm.indexOf(':', flagIndex + 2);
  if (nextFlagIndex !== -1) {
    extractedTerm = searchTerm.substring(flagIndex + 2, nextFlagIndex - 1).trim();
  } else {
    extractedTerm = searchTerm.substring(flagIndex + 2).trim();
  }

  return extractedTerm;
}

/**
 * Performs a field match based on the flag and extracted search term
 * @param item The media item to check
 * @param field The field name to check against
 * @param searchTerm The full search query
 * @param flag The flag to look for (e.g., 't:', 's:', 'a:', etc.)
 * @returns True if the field matches the search term, or if the flag is not present
 */
export function fieldFlagMatch<T>(item: T, field: keyof T, searchTerm: string, flag: string): boolean {
  // If flag is not in the search term, return true (no constraint)
  if (!searchTerm.includes(flag)) return true;

  // Extract the search term for this flag
  const flagSearchTerm = extractFlagSearchTerm(searchTerm, flag);

  // Get the field value
  const fieldValue = item[field];

  // If the field doesn't exist in the item, return false
  if (fieldValue === undefined || fieldValue === null) return false;

  // Convert the field value to string and check if it includes the search term
  const fieldValueString = String(fieldValue);
  return fieldValueString.toLowerCase().includes(flagSearchTerm.toLowerCase());
}

/**
 * Performs advanced search with flags or regular search if no flags are present
 * @param items Array of items to search through
 * @param searchTerm The search term
 * @param flagConfigs Array of flag configurations with field and flag
 * @param additionalFilters Function to apply additional filters
 * @returns Filtered array of items
 */
export function advancedSearch<T>(
  items: T[],
  searchTerm: string,
  flagConfigs: Array<{ field: keyof T; flag: string; }>,
  additionalFilters: (item: T) => boolean
): T[] {
  // If search term is empty, only apply additionalFilters
  if (!searchTerm) {
    return items.filter(item => additionalFilters(item));
  }

  // Check if any configured flags are present in the search term
  const hasFlags = flagConfigs.some(config => searchTerm.includes(config.flag));

  return items.filter(item => {
    // If using advanced search with flags
    if (hasFlags) {
      // Check all configured field flags
      const flagsMatch = flagConfigs.every(config =>
        fieldFlagMatch(item, config.field, searchTerm, config.flag)
      );

      return flagsMatch && additionalFilters(item);
    }
    // Regular search without flags
    else {
      // Check if any field matches the search term
      const basicMatch = flagConfigs.some(config => {
        const fieldValue = item[config.field];
        if (fieldValue === undefined || fieldValue === null) return false;

        const fieldValueString = String(fieldValue);
        return fieldValueString.toLowerCase().includes(searchTerm.toLowerCase());
      });

      return basicMatch && additionalFilters(item);
    }
  });
}
