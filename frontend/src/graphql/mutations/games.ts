import { apolloClient } from "@/graphql";
import { TGameInput } from "@/types";
import gql from "graphql-tag";

export const addGame = async (
  userId: string | undefined,
  variables: { gameInput: TGameInput }
) => {
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
    context: {
      headers: {
        userId,
      },
    },
    variables,
  });
};

export const editGame = async (
  userId: string | undefined,
  variables: {
    id: string;
    gameInput: TGameInput;
  }
) => {
  return apolloClient.mutate({
    mutation: gql`
      mutation EditGame($id: ID!, $gameInput: GameInput) {
        editGame(ID: $id, gameInput: $gameInput)
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

export const deleteGame = async (
  userId: string | undefined,
  variables: { id: string }
) => {
  return apolloClient.mutate({
    mutation: gql`
      mutation DeleteGame($id: ID!) {
        deleteGame(ID: $id)
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
