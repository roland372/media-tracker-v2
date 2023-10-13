import { apolloClient } from "@/graphql";
import gql from "graphql-tag";

export const getAllMedia = async (userId: string) => {
  return await apolloClient.query({
    query: gql`
      query Query {
        getAllAnime {
          episodesMax
          episodesMin
          favourites
          _id
          imageURL
          lastModified
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
        getAllBooks {
          author
          favourites
          genre
          _id
          imageURL
          lastModified
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
        getAllCharacters {
          favourites
          gender
          hairColor
          _id
          imageURL
          lastModified
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
        getAllEmotes {
          favourites
          _id
          lastModified
          name
          url
          createdAt
          updatedAt
        }
        getAllGames {
          favourites
          _id
          imageURL
          lastModified
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
        getAllManga {
          chaptersMax
          chaptersMin
          favourites
          _id
          imageURL
          lastModified
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
        getAllMovies {
          episodesMax
          episodesMin
          favourites
          _id
          imageURL
          lastModified
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
        getAllMusic {
          artist
          category
          favourites
          _id
          imageURL
          lastModified
          link
          owner
          title
          createdAt
          updatedAt
        }
        getAllNotes {
          color
          _id
          lastModified
          note
          title
          createdAt
          updatedAt
        }
      }
    `,
    context: {
      headers: {
        userId,
      },
    },
  });
};
