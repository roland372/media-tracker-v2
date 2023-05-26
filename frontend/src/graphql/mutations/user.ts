import { apolloClient } from "@/graphql";
import gql from "graphql-tag";
import { TUserInput } from "@/types";

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
