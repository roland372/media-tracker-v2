import { apolloClient } from "@/graphql";
import gql from "graphql-tag";

export const getAllCharacters = async () => {
  return await apolloClient.query({
    query: gql`
      query GetAllCharacters {
        getAllCharacters {
          favourites
          gender
          hairColor
          _id
          id
          imageURL
          lastModified
          link1
          link1Name
          link2
          link2Name
          mal_id
          name
          owner
          series
          source
        }
      }
    `,
  });
};

export const getSingleCharacter = async (variables: { id: string }) => {
  return await apolloClient.query({
    query: gql`
      query GetSingleCharacter($id: ID!) {
        getSingleCharacter(ID: $id) {
          favourites
          gender
          hairColor
          _id
          id
          imageURL
          lastModified
          link1
          link1Name
          link2
          link2Name
          mal_id
          name
          owner
          series
          source
        }
      }
    `,
    variables,
  });
};
