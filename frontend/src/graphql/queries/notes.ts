import { apolloClient } from "@/graphql";
import gql from "graphql-tag";

export const getAllNotes = async () => {
  return await apolloClient.query({
    query: gql`
      query GetAllNotes {
        getAllNotes {
          color
          _id
          id
          lastModified
          note
          title
        }
      }
    `,
  });
};

export const getSingleNote = async (variables: { id: string }) => {
  return await apolloClient.query({
    query: gql`
      query GetSingleNote($id: ID!) {
        getSingleNote(ID: $id) {
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
