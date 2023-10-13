import { apolloClient } from "@/graphql";
import gql from "graphql-tag";
import { TNoteInput } from "@/types";

export const addNote = async (
  userId: string | undefined,
  variables: { noteInput: TNoteInput }
) => {
  return apolloClient.mutate({
    mutation: gql`
      mutation AddNote($noteInput: NoteInput) {
        addNote(noteInput: $noteInput) {
          color
          _id
          lastModified
          note
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

export const deleteNote = async (
  userId: string | undefined,
  variables: { id: string }
) => {
  return apolloClient.mutate({
    mutation: gql`
      mutation DeleteNote($id: ID!) {
        deleteNote(ID: $id)
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

export const editNote = async (
  userId: string | undefined,
  variables: {
    id: string;
    noteInput: TNoteInput;
  }
) => {
  return apolloClient.mutate({
    mutation: gql`
      mutation EditNote($id: ID!, $noteInput: NoteInput) {
        editNote(ID: $id, noteInput: $noteInput)
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
