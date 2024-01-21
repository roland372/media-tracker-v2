import { apolloClient } from "@/graphql";
import gql from "graphql-tag";

export const getSingleUser = async (userId: string) => {
  return await apolloClient.query({
    query: gql`
      query GetSingleUser($userId: String!) {
        getSingleUser(email: $userId) {
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
    variables: {
      userId,
    },
  });
};
