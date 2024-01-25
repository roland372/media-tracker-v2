import { apolloClient } from "@/graphql";
import gql from "graphql-tag";

export const getAllManga = async (userId: string, query: string) => {
  return await apolloClient.query({
    query: gql`
      query GetAllManga($query: EQueryParams) {
        getAllManga(query: $query) {
          chaptersMax
          chaptersMin
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
          volumesMax
          volumesMin
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

export const getSingleManga = async (variables: { id: string }) => {
  return await apolloClient.query({
    query: gql`
      query GetSingleManga($id: ID!) {
        getSingleManga(ID: $id) {
          chaptersMax
          chaptersMin
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
          volumesMax
          volumesMin
          createdAt
          updatedAt
        }
      }
    `,
    variables,
  });
};
