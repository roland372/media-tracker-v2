import { apolloClient } from "@/graphql";
import gql from "graphql-tag";

export const getAllMovies = async (userId: string, query: string) => {
  return await apolloClient.query({
    query: gql`
      query GetAllMovies($query: EQueryParams) {
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
      query,
    },
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
    variables,
  });
};
