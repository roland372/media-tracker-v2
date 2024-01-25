import { apolloClient } from "@/graphql";
import gql from "graphql-tag";

export const getAllAnime = async (userId: string, query: string) => {
  return await apolloClient.query({
    query: gql`
      query GetAllAnime($query: EQueryParams) {
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

export const getSingleAnime = async (variables: { id: string }) => {
  return await apolloClient.query({
    query: gql`
      query GetSingleAnime($id: ID!) {
        getSingleAnime(ID: $id) {
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
      }
    `,
    variables,
  });
};
