import { apolloClient } from "@/graphql";
import { TEmoteInput } from "@/types";
import gql from "graphql-tag";

export const addEmote = async (variables: { emoteInput: TEmoteInput }) => {
  return apolloClient.mutate({
    mutation: gql`
      mutation AddEmote($emoteInput: EmoteInput) {
        addEmote(emoteInput: $emoteInput) {
          favourites
          _id
          id
          lastModified
          name
          url
        }
      }
    `,
    variables,
  });
};

export const editEmote = async (variables: {
  id: string;
  emoteInput: TEmoteInput;
}) => {
  return apolloClient.mutate({
    mutation: gql`
      mutation EditEmote($id: ID!, $emoteInput: EmoteInput) {
        editEmote(ID: $id, emoteInput: $emoteInput)
      }
    `,
    variables,
  });
};

export const deleteEmote = async (variables: { id: string }) => {
  return apolloClient.mutate({
    mutation: gql`
      mutation DeleteEmote($id: ID!) {
        deleteEmote(ID: $id)
      }
    `,
    variables,
  });
};
