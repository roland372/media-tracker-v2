import { apolloClient } from "@/graphql";
import gql from "graphql-tag";

export const getAllMusic = async (userId: string) => {
  return await apolloClient.query({
    query: gql`
      query GetAllMusic {
        getAllMusic {
          artist
          category
          favourites
          _id
          id
          imageURL
          lastModified
          link
          owner
          title
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

export const getSingleMusic = async (variables: { id: string }) => {
  return await apolloClient.query({
    query: gql`
      query GetSingleMusic($id: ID!) {
        getSingleMusic(ID: $id) {
          artist
          category
          favourites
          _id
          id
          imageURL
          lastModified
          link
          owner
          title
        }
      }
    `,
    variables,
  });
};
