import { apolloClient } from "@/graphql";
import gql from "graphql-tag";

export const getAllEmotes = async (userId: string) => {
  return await apolloClient.query({
    query: gql`
      query GetAllEmotes {
        getAllEmotes {
          favourites
          _id
          lastModified
          name
          url
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

export const getSingleEmote = async (variables: { id: string }) => {
  return await apolloClient.query({
    query: gql`
      query GetSingleEmote($id: ID!) {
        getSingleEmote(ID: $id) {
          favourites
          _id
          lastModified
          name
          url
          createdAt
          updatedAt
        }
      }
    `,
    variables,
  });
};
