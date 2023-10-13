import { apolloClient } from "@/graphql";
import gql from "graphql-tag";

export const getAllManga = async (userId: string) => {
  return await apolloClient.query({
    query: gql`
      query GetAllManga {
        getAllManga {
          chaptersMax
          chaptersMin
          favourites
          _id
          id
          imageURL
          lastModified
          link1
          link1Name
          mal_id
          owner
          rating
          status
          title
          type
          volumesMax
          volumesMin
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

export const getSingleManga = async (variables: { id: string }) => {
  return await apolloClient.query({
    query: gql`
      query GetSingleManga($id: ID!) {
        getSingleManga(ID: $id) {
          chaptersMax
          chaptersMin
          favourites
          _id
          id
          imageURL
          lastModified
          link1
          link1Name
          mal_id
          owner
          rating
          status
          title
          type
          volumesMax
          volumesMin
        }
      }
    `,
    variables,
  });
};
