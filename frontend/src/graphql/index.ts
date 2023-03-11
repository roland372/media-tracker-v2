import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
} from "@apollo/client/core";
import { onError } from "@apollo/client/link/error";

const errorLink = onError((err) => {
  const error = JSON.stringify(err);
  const parsedError = JSON.parse(error);
  if (
    (Object.keys(parsedError)?.length !== 0 &&
      parsedError?.graphQLErrors[0]?.extensions?.code === 403) ||
    parsedError?.networkError?.statusCode === 401
  ) {
    console.log(parsedError);
  }
});

const httpLink = createHttpLink({
  uri: "http://localhost:4000",
});

const cache = new InMemoryCache();

export const apolloClient = new ApolloClient({
  link: errorLink.concat(httpLink),
  cache,
});

export * from "./queries/anime";
export * from "./mutations/anime";
export * from "./queries/manga";
export * from "./mutations/manga";
export * from "./queries/games";
export * from "./mutations/games";
export * from "./queries/characters";
export * from "./mutations/characters";
export * from "./queries/emotes";
export * from "./mutations/emotes";
export * from "./queries/notes";
export * from "./mutations/notes";
export * from "./queries/allMedia";
