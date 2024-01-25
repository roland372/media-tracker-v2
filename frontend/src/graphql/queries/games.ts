import { apolloClient } from "@/graphql";
import gql from "graphql-tag";

export const getAllGames = async (userId: string, query: string) => {
  return await apolloClient.query({
    query: gql`
      query GetAllGames($query: EQueryParams) {
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

export const getSingleGame = async (variables: { id: string }) => {
  return await apolloClient.query({
    query: gql`
      query GetSingleGame($id: ID!) {
        getSingleGame(ID: $id) {
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
      }
    `,
    variables,
  });
};
