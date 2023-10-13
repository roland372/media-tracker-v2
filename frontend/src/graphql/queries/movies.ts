import { apolloClient } from "@/graphql";
import gql from "graphql-tag";

export const getAllMovies = async (userId: string) => {
  return await apolloClient.query({
    query: gql`
      query GetAllMovies {
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

export const getSingleMovie = async (variables: { id: string }) => {
  return await apolloClient.query({
    query: gql`
      query GetSingleMovie($id: ID!) {
        getSingleMovie(ID: $id) {
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
        }
      }
    `,
    variables,
  });
};
