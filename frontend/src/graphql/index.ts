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
  credentials: "same-origin",
});

const cache = new InMemoryCache();

export const apolloClient = new ApolloClient({
  link: errorLink.concat(httpLink),
  cache,
});
