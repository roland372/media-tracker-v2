import { apolloClient } from "@/graphql";
import gql from "graphql-tag";
import { TAnimeInput } from "@/types";

export const addAnime = async (
  userId: string | undefined,
  variables: { animeInput: TAnimeInput }
) => {
  return apolloClient.mutate({
    mutation: gql`
      mutation AddAnime($animeInput: AnimeInput) {
        addAnime(animeInput: $animeInput) {
          episodesMax
          episodesMin
          favourites
          _id
          imageURL
          lastModified
          link1
          link1Name
          mal_id
          owner
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

export const deleteAnime = async (
  userId: string | undefined,
  variables: { id: string }
) => {
  return apolloClient.mutate({
    mutation: gql`
      mutation DeleteAnime($id: ID!) {
        deleteAnime(ID: $id)
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

export const editAnime = async (
  userId: string | undefined,
  variables: {
    id: string;
    animeInput: TAnimeInput;
  }
) => {
  return apolloClient.mutate({
    mutation: gql`
      mutation EditAnime($id: ID!, $animeInput: AnimeInput) {
        editAnime(ID: $id, animeInput: $animeInput)
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
