import { apolloClient } from "@/graphql";
import gql from "graphql-tag";

export const getAllGames = async (userId: string) => {
  return await apolloClient.query({
    query: gql`
      query GetAllGames {
        getAllGames {
          favourites
          _id
          id
          imageURL
          lastModified
          link1
          link1Name
          owner
          playtime
          rating
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

export const getSingleGame = async (variables: { id: string }) => {
  return await apolloClient.query({
    query: gql`
      query GetSingleGame($id: ID!) {
        getSingleGame(ID: $id) {
          favourites
          _id
          id
          imageURL
          lastModified
          link1
          link1Name
          owner
          playtime
          rating
          status
          title
          type
        }
      }
    `,
    variables,
  });
};
