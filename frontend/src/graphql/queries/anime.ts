import { apolloClient } from "@/graphql";
import gql from "graphql-tag";

export const getAllAnime = async () => {
  return await apolloClient.query({
    query: gql`
      query GetAllAnime {
        getAllAnime {
          episodesMax
          episodesMin
          favourites
          _id
          id
          imageURL
          lastModified
          link1
          link1Name
          link2
          link2Name
          mal_id
          owner
          rating
          status
          title
          type
        }
      }
    `,
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
          id
          imageURL
          lastModified
          link1
          link1Name
          link2
          link2Name
          mal_id
          owner
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
