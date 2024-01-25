import { apolloClient } from "@/graphql";
import gql from "graphql-tag";

export const getAllBooks = async (userId: string, query: string) => {
  return await apolloClient.query({
    query: gql`
      query GetAllBooks($query: EQueryParams) {
        getAllBooks(query: $query) {
          author
          favourites
          genre
          _id
          imageURL
          link
          linkName
          owner
          pages
          rating
          status
          title
          createdAt
          updatedAt
        }
      }
    `,
    variables: {
      query,
    },
    context: {
      headers: {
        userId,
      },
    },
  });
};

export const getSingleBook = async (variables: { id: string }) => {
  return await apolloClient.query({
    query: gql`
      query GetSingleBook($id: ID!) {
        getSingleBook(ID: $id) {
          author
          favourites
          genre
          _id
          imageURL
          link
          linkName
          owner
          pages
          rating
          status
          title
          createdAt
          updatedAt
        }
      }
    `,
    variables,
  });
};
