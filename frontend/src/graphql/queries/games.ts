import { apolloClient } from "@/graphql";
import gql from "graphql-tag";

export const getAllGames = async (userId: string) => {
  return await apolloClient.query({
    query: gql`
      query GetAllGames {
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
      }
    `,
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
      }
    `,
    variables,
  });
};
