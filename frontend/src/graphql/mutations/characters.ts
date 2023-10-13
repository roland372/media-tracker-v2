import { apolloClient } from "@/graphql";
import gql from "graphql-tag";
import { TCharacterInput } from "@/types";

export const addCharacter = async (
  userId: string | undefined,
  variables: {
    characterInput: TCharacterInput;
  }
) => {
  return apolloClient.mutate({
    mutation: gql`
      mutation AddCharacter($characterInput: CharacterInput) {
        addCharacter(characterInput: $characterInput) {
          favourites
          gender
          hairColor
          _id
          imageURL
          lastModified
          link1
          link1Name
          mal_id
          name
          owner
          series
          source
        }
      }
    `,
    context: {
      headers: {
        userId,
      },
    },
    variables,
  });
};

export const editCharacter = async (
  userId: string | undefined,
  variables: {
    id: string;
    characterInput: TCharacterInput;
  }
) => {
  return apolloClient.mutate({
    mutation: gql`
      mutation EditCharacter($id: ID!, $characterInput: CharacterInput) {
        editCharacter(ID: $id, characterInput: $characterInput)
      }
    `,
    context: {
      headers: {
        userId,
      },
    },
    variables,
  });
};

export const deleteCharacter = async (
  userId: string | undefined,
  variables: { id: string }
) => {
  return apolloClient.mutate({
    mutation: gql`
      mutation EditCharacter($id: ID!) {
        deleteCharacter(ID: $id)
      }
    `,
    context: {
      headers: {
        userId,
      },
    },
    variables,
  });
};
