import { TBook } from '@/types';
import { toNumber } from '@/utils/mediaUtils';
import { defineStore } from "pinia";
import { ref } from "vue";

export const useBooksStore = defineStore("books", () => {
  const books = ref<TBook[]>([]);
  const setBooks = (payload: TBook[]) => {
    books.value = payload;
  };

  const fetchAllBooks = async (mediaData: any) => {
    return mediaData.books.map((item: any) => ({
      ...item,
      pages: toNumber(item.pages),
      rating: toNumber(item.rating),
      favourites: item.favourites === "TRUE"
    }));
  };

  return { books, setBooks, fetchAllBooks };
});
