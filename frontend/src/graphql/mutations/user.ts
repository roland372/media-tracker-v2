import { apolloClient } from "@/graphql";
import { TUserInput } from "@/types";
import gql from "graphql-tag";

export const editUser = async (
  userId: string | undefined,
  variables: {
    id: string | undefined;
    userInput: TUserInput;
  }
) => {
  return apolloClient.mutate({
    mutation: gql`
      mutation EditUser($id: ID!, $userInput: UserInput) {
        editUser(ID: $id, userInput: $userInput)
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
