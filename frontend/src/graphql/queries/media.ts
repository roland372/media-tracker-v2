import { apolloClient } from "@/graphql";
import gql from "graphql-tag";

export const getMediaCount = async (userId: string) => {
  return await apolloClient.query({
    query: gql`
      query Query {
        getAnimeCount
        getBookCount
        getCharacterCount
        getEmoteCount
        getGameCount
        getMangaCount
        getMovieCount
        getMusicCount
        getNoteCount
      }
    `,
    context: {
      headers: {
        userId,
      },
    },
  });
};

export const getRecentMedia = async (userId: string) => {
  return await apolloClient.query({
    query: gql`
      query Query($query: EQueryParams) {
        getAllAnime(query: $query) {
          episodesMax
          episodesMin
          favourites
          _id
          imageURL
          link
          linkName
          mal_id
          owner
          rating
          status
          title
          type
          createdAt
          updatedAt
        }
        getAllBooks(query: $query) {
          author
          favourites
          genre
          _id
          imageURL
          link
          linkName
          owner
          pages
          rating
          status
          title
          createdAt
          updatedAt
        }
        getAllCharacters(query: $query) {
          favourites
          gender
          hairColor
          _id
          imageURL
          link
          linkName
          mal_id
          name
          owner
          series
          source
          createdAt
          updatedAt
        }
        getAllGames(query: $query) {
          favourites
          _id
          imageURL
          link
          linkName
          owner
          playtime
          rating
          status
          title
          type
          createdAt
          updatedAt
        }
        getAllManga(query: $query) {
          chaptersMax
          chaptersMin
          favourites
          _id
          imageURL
          link
          linkName
          mal_id
          owner
          rating
          status
          title
          type
          volumesMax
          volumesMin
          createdAt
          updatedAt
        }
        getAllMovies(query: $query) {
          episodesMax
          episodesMin
          favourites
          _id
          imageURL
          link
          linkName
          owner
          rating
          seasonsMax
          seasonsMin
          status
          title
          type
          createdAt
          updatedAt
        }
      }
    `,
    variables: {
      query: "LIMIT",
    },
    context: {
      headers: {
        userId,
      },
    },
  });
};
