import { apolloClient } from "@/graphql";
import gql from "graphql-tag";

export const getAllNotes = async (userId: string) => {
  return await apolloClient.query({
    query: gql`
      query GetAllNotes {
        getAllNotes {
          color
          _id
          lastModified
          note
          title
        }
      }
    `,
    context: {
      headers: {
        userId,
      },
    },
  });
};

export const getSingleNote = async (variables: { id: string }) => {
  return await apolloClient.query({
    query: gql`
      query GetSingleNote($id: ID!) {
        getSingleNote(ID: $id) {
          color
          _id
          lastModified
          note
          title
        }
      }
    `,
    variables,
  });
};
