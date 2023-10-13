import { apolloClient } from "@/graphql";
import gql from "graphql-tag";
import { TMangaInput } from "@/types";

export const addManga = async (
  userId: string | undefined,
  variables: { mangaInput: TMangaInput }
) => {
  return apolloClient.mutate({
    mutation: gql`
      mutation AddManga($mangaInput: MangaInput) {
        addManga(mangaInput: $mangaInput) {
          chaptersMax
          chaptersMin
          favourites
          _id
          imageURL
          lastModified
          link
          linkName
          mal_id
          owner
          rating
          status
          title
          type
          volumesMax
          volumesMin
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

export const deleteManga = async (
  userId: string | undefined,
  variables: { id: string }
) => {
  return apolloClient.mutate({
    mutation: gql`
      mutation DeleteManga($id: ID!) {
        deleteManga(ID: $id)
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

export const editManga = async (
  userId: string | undefined,
  variables: {
    id: string;
    mangaInput: TMangaInput;
  }
) => {
  return apolloClient.mutate({
    mutation: gql`
      mutation EditManga($id: ID!, $mangaInput: MangaInput) {
        editManga(ID: $id, mangaInput: $mangaInput)
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
