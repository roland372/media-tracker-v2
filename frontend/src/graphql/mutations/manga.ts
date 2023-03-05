import { apolloClient } from "@/graphql";
import { TMangaInput } from "@/types";
import gql from "graphql-tag";

export const addManga = async (variables: { mangaInput: TMangaInput }) => {
  return apolloClient.mutate({
    mutation: gql`
      mutation AddManga($mangaInput: MangaInput) {
        addManga(mangaInput: $mangaInput) {
          chaptersMax
          chaptersMin
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
          volumesMax
          volumesMin
        }
      }
    `,
    variables,
  });
};

export const editManga = async (variables: {
  id: string;
  mangaInput: TMangaInput;
}) => {
  return apolloClient.mutate({
    mutation: gql`
      mutation EditManga($id: ID!, $mangaInput: MangaInput) {
        editManga(ID: $id, mangaInput: $mangaInput)
      }
    `,
    variables,
  });
};

export const deleteManga = async (variables: { id: string }) => {
  return apolloClient.mutate({
    mutation: gql`
      mutation DeleteManga($id: ID!) {
        deleteManga(ID: $id)
      }
    `,
    variables,
  });
};
