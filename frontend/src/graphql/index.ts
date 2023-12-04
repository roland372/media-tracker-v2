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

const SERVER_URL =
  process.env.NODE_ENV?.trim() === "development"
    ? process.env.VUE_APP_SERVER_URL_DEVELOPMENT
    : process.env.VUE_APP_SERVER_URL;

const httpLink = createHttpLink({
  uri: SERVER_URL,
  credentials: "include",
});

const cache = new InMemoryCache();

export const apolloClient = new ApolloClient({
  link: errorLink.concat(httpLink),
  cache,
  credentials: "include",
});

export * from "./queries/allMedia";

export * from "./queries/anime";
export * from "./mutations/anime";

export * from "./queries/books";
export * from "./mutations/books";

export * from "./queries/characters";
export * from "./mutations/characters";

export * from "./queries/emotes";
export * from "./mutations/emotes";

export * from "./queries/games";
export * from "./mutations/games";

export * from "./queries/manga";
export * from "./mutations/manga";

export * from "./queries/movies";
export * from "./mutations/movies";

export * from "./queries/music";
export * from "./mutations/music";

export * from "./queries/notes";
export * from "./mutations/notes";

export * from "./queries/user";
export * from "./mutations/user";
