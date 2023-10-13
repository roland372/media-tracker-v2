import { apolloClient } from "@/graphql";
import gql from "graphql-tag";
import { TBookInput } from "@/types";

export const addBook = async (
  userId: string | undefined,
  variables: { bookInput: TBookInput }
) => {
  return apolloClient.mutate({
    mutation: gql`
      mutation AddBook($bookInput: BookInput) {
        addBook(bookInput: $bookInput) {
          author
          favourites
          genre
          _id
          id
          imageURL
          lastModified
          link1
          link1Name
          owner
          pages
          rating
          status
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

export const deleteBook = async (
  userId: string | undefined,
  variables: { id: string }
) => {
  return apolloClient.mutate({
    mutation: gql`
      mutation DeleteBook($id: ID!) {
        deleteBook(ID: $id)
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

export const editBook = async (
  userId: string | undefined,
  variables: {
    id: string;
    bookInput: TBookInput;
  }
) => {
  return apolloClient.mutate({
    mutation: gql`
      mutation EditBook($id: ID!, $bookInput: BookInput) {
        editBook(ID: $id, bookInput: $bookInput)
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
