import { apolloClient } from "@/graphql";
import { TNoteInput } from "@/types";
import gql from "graphql-tag";

export const addNote = async (variables: { noteInput: TNoteInput }) => {
  return apolloClient.mutate({
    mutation: gql`
      mutation AddNote($noteInput: NoteInput) {
        addNote(noteInput: $noteInput) {
          color
          _id
          id
          lastModified
          note
          title
        }
      }
    `,
    variables,
  });
};

export const editNote = async (variables: {
  id: string;
  noteInput: TNoteInput;
}) => {
  return apolloClient.mutate({
    mutation: gql`
      mutation EditNote($id: ID!, $noteInput: NoteInput) {
        editNote(ID: $id, noteInput: $noteInput)
      }
    `,
    variables,
  });
};

export const deleteNote = async (variables: { id: string }) => {
  return apolloClient.mutate({
    mutation: gql`
      mutation DeleteNote($id: ID!) {
        deleteNote(ID: $id)
      }
    `,
    variables,
  });
};
