import { apolloClient } from "@/graphql";
import gql from "graphql-tag";

export const getAllAnime = async (userId: string) => {
  return await apolloClient.query({
    query: gql`
      query GetAllAnime {
        getAllAnime {
          episodesMax
          episodesMin
          favourites
          _id
          imageURL
          lastModified
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
          lastModified
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
