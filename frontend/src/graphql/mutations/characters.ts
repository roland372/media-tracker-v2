import { apolloClient } from "@/graphql";
import { TCharacterInput } from "@/types";
import gql from "graphql-tag";

export const addCharacter = async (variables: {
  characterInput: TCharacterInput;
}) => {
  return apolloClient.mutate({
    mutation: gql`
      mutation AddCharacter($characterInput: CharacterInput) {
        addCharacter(characterInput: $characterInput) {
          favourites
          gender
          hairColor
          _id
          id
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
    variables,
  });
};

export const editCharacter = async (variables: {
  id: string;
  characterInput: TCharacterInput;
}) => {
  return apolloClient.mutate({
    mutation: gql`
      mutation EditCharacter($id: ID!, $characterInput: CharacterInput) {
        editCharacter(ID: $id, characterInput: $characterInput)
      }
    `,
    variables,
  });
};

export const deleteCharacter = async (variables: { id: string }) => {
  return apolloClient.mutate({
    mutation: gql`
      mutation EditCharacter($id: ID!) {
        deleteCharacter(ID: $id)
      }
    `,
    variables,
  });
};
