import { apolloClient } from "@/graphql";
import gql from "graphql-tag";
import { TEmoteInput } from "@/types";

export const addEmote = async (
  userId: string | undefined,
  variables: { emoteInput: TEmoteInput }
) => {
  return apolloClient.mutate({
    mutation: gql`
      mutation AddEmote($emoteInput: EmoteInput) {
        addEmote(emoteInput: $emoteInput) {
          favourites
          _id
          lastModified
          name
          url
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

export const deleteEmote = async (
  userId: string | undefined,
  variables: { id: string }
) => {
  return apolloClient.mutate({
    mutation: gql`
      mutation DeleteEmote($id: ID!) {
        deleteEmote(ID: $id)
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

export const editEmote = async (
  userId: string | undefined,
  variables: {
    id: string;
    emoteInput: TEmoteInput;
  }
) => {
  return apolloClient.mutate({
    mutation: gql`
      mutation EditEmote($id: ID!, $emoteInput: EmoteInput) {
        editEmote(ID: $id, emoteInput: $emoteInput)
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
