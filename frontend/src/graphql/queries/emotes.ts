import { apolloClient } from "@/graphql";
import gql from "graphql-tag";

export const getAllEmotes = async () => {
  return await apolloClient.query({
    query: gql`
      query GetAllEmotes {
        getAllEmotes {
          favourites
          _id
          id
          lastModified
          name
          url
        }
      }
    `,
  });
};

export const getSingleEmote = async (variables: { id: string }) => {
  return await apolloClient.query({
    query: gql`
      query GetSingleEmote($id: ID!) {
        getSingleEmote(ID: $id) {
          favourites
          _id
          id
          lastModified
          name
          url
        }
      }
    `,
    variables,
  });
};
