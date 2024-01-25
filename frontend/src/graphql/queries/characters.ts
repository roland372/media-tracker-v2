import { apolloClient } from "@/graphql";
import gql from "graphql-tag";

export const getAllCharacters = async (userId: string, query: string) => {
  return await apolloClient.query({
    query: gql`
      query GetAllCharacters($query: EQueryParams) {
        getAllCharacters(query: $query) {
          favourites
          gender
          hairColor
          _id
          imageURL
          link
          linkName
          mal_id
          name
          owner
          series
          source
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

export const getSingleCharacter = async (variables: { id: string }) => {
  return await apolloClient.query({
    query: gql`
      query GetSingleCharacter($id: ID!) {
        getSingleCharacter(ID: $id) {
          favourites
          gender
          hairColor
          _id
          imageURL
          link
          linkName
          mal_id
          name
          owner
          series
          source
          createdAt
          updatedAt
        }
      }
    `,
    variables,
  });
};
