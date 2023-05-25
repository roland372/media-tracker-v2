import { apolloClient } from "@/graphql";
import gql from "graphql-tag";

export const getAllBooks = async (userId: string) => {
  return await apolloClient.query({
    query: gql`
      query GetAllBooks {
        getAllBooks {
          author
          favourites
          genre
          _id
          id
          imageURL
          lastModified
          link1
          link1Name
          link2
          link2Name
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
          id
          imageURL
          lastModified
          link1
          link1Name
          link2
          link2Name
          owner
          pages
          rating
          status
          title
        }
      }
    `,
    variables,
  });
};
