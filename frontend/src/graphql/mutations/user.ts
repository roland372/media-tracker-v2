import { apolloClient } from "@/graphql";
import gql from "graphql-tag";
import { TUserInput } from "@/types";

export const editUser = async (
  userId: string | undefined,
  userInput: TUserInput
) => {
  return apolloClient.mutate({
    mutation: gql`
      mutation EditUser($userId: String!, $userInput: UserInput) {
        editUser(email: $userId, userInput: $userInput)
      }
    `,
    context: {
      headers: {
        userId,
      },
    },
    variables: {
      userId,
      userInput,
    },
  });
};
