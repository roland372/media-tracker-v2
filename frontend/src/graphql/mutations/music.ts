import { apolloClient } from "@/graphql";
import gql from "graphql-tag";
import { TMusicInput } from "@/types";

export const addMusic = async (
  userId: string | undefined,
  variables: { musicInput: TMusicInput }
) => {
  return apolloClient.mutate({
    mutation: gql`
      mutation AddMusic($musicInput: MusicInput) {
        addMusic(musicInput: $musicInput) {
          artist
          category
          favourites
          _id
          imageURL
          lastModified
          link
          owner
          title
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

export const deleteMusic = async (
  userId: string | undefined,
  variables: { id: string }
) => {
  return apolloClient.mutate({
    mutation: gql`
      mutation DeleteMusic($id: ID!) {
        deleteMusic(ID: $id)
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

export const editMusic = async (
  userId: string | undefined,
  variables: {
    id: string;
    musicInput: TMusicInput;
  }
) => {
  return apolloClient.mutate({
    mutation: gql`
      mutation EditMusic($id: ID!, $musicInput: MusicInput) {
        editMusic(ID: $id, musicInput: $musicInput)
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
