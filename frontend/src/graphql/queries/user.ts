import { apolloClient } from "@/graphql";
import gql from "graphql-tag";

export const getSingleUser = async (
  userId: string,
  variables: { id: string }
) => {
  return await apolloClient.query({
    query: gql`
      query GetSingleUser($id: ID!) {
        getSingleUser(ID: $id) {
          _id
          color
          email
          profileDesc
          profileImg
          role
          username
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
