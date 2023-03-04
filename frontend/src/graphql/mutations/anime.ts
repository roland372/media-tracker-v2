import { apolloClient } from "@/graphql";
import { TAnimeInput } from "@/types";
import gql from "graphql-tag";

export const addAnime = async (variables: { animeInput: TAnimeInput }) => {
  return apolloClient.mutate({
    mutation: gql`
      mutation Mutation($animeInput: AnimeInput) {
        addAnime(animeInput: $animeInput) {
          episodesMax
          episodesMin
          favourites
          _id
          id
          imageURL
          lastModified
          link1
          link1Name
          link2
          link2Name
          mal_id
          owner
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

export const editAnime = async (variables: {
  id: string;
  animeInput: TAnimeInput;
}) => {
  return apolloClient.mutate({
    mutation: gql`
      mutation EditAnime($id: ID!, $animeInput: AnimeInput) {
        editAnime(ID: $id, animeInput: $animeInput)
      }
    `,
    variables,
  });
};

export const deleteAnime = async (variables: { id: string }) => {
  return apolloClient.mutate({
    mutation: gql`
      mutation Mutation($id: ID!) {
        deleteAnime(ID: $id)
      }
    `,
    variables,
  });
};
