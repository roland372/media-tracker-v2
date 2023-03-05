import { apolloClient } from "@/graphql";
import { TGameInput } from "@/types";
import gql from "graphql-tag";

export const addGame = async (variables: { gameInput: TGameInput }) => {
  return apolloClient.mutate({
    mutation: gql`
      mutation AddGame($gameInput: GameInput) {
        addGame(gameInput: $gameInput) {
          favourites
          _id
          id
          imageURL
          lastModified
          link1
          link1Name
          link2
          link2Name
          owner
          playtime
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

export const editGame = async (variables: {
  id: string;
  gameInput: TGameInput;
}) => {
  return apolloClient.mutate({
    mutation: gql`
      mutation EditGame($id: ID!, $gameInput: GameInput) {
        editGame(ID: $id, gameInput: $gameInput)
      }
    `,
    variables,
  });
};

export const deleteGame = async (variables: { id: string }) => {
  return apolloClient.mutate({
    mutation: gql`
      mutation DeleteGame($id: ID!) {
        deleteGame(ID: $id)
      }
    `,
    variables,
  });
};
