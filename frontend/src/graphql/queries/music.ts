import { apolloClient } from "@/graphql";
import gql from "graphql-tag";

export const getAllMusic = async (userId: string, query: string) => {
  return await apolloClient.query({
    query: gql`
      query GetAllMusic($query: EQueryParams) {
        getAllMusic(query: $query) {
          artist
          category
          favourites
          _id
          imageURL
          link
          owner
          title
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

export const getSingleMusic = async (variables: { id: string }) => {
  return await apolloClient.query({
    query: gql`
      query GetSingleMusic($id: ID!) {
        getSingleMusic(ID: $id) {
          artist
          category
          favourites
          _id
          imageURL
          link
          owner
          title
          createdAt
          updatedAt
        }
      }
    `,
    variables,
  });
};
