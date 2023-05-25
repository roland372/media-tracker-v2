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
          id
          imageURL
          lastModified
          link1
          link1Name
          link2
          link2Name
          mal_id
          owner
          rating
          status
          title
          type
        }
        getAllManga {
          chaptersMax
          chaptersMin
          favourites
          _id
          id
          imageURL
          lastModified
          link1
          link1Name
          link2
          link2Name
          mal_id
          owner
          rating
          status
          title
          type
          volumesMax
          volumesMin
        }
        getAllGames {
          favourites
          _id
          id
          imageURL
          lastModified
          link1
          link1Name
          link2
          link2Name
          owner
          playtime
          rating
          status
          title
          type
        }
        getAllCharacters {
          favourites
          gender
          hairColor
          _id
          id
          imageURL
          lastModified
          link1
          link1Name
          mal_id
          name
          owner
          series
          source
        }
        getAllEmotes {
          favourites
          _id
          id
          lastModified
          name
          url
        }
        getAllNotes {
          color
          _id
          id
          lastModified
          note
          title
        }
        getAllBooks {
          author
          favourites
          genre
          _id
          id
          imageURL
          lastModified
          link1
          link1Name
          link2
          link2Name
          owner
          pages
          rating
          status
          title
        }
        getAllMovies {
          episodesMax
          episodesMin
          favourites
          _id
          id
          imageURL
          lastModified
          link1
          link1Name
          link2
          link2Name
          owner
          rating
          seasonsMax
          seasonsMin
          status
          title
          type
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
