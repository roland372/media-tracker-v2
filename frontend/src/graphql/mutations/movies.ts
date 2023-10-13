import { apolloClient } from "@/graphql";
import gql from "graphql-tag";
import { TMovieInput } from "@/types";

export const addMovie = async (
  userId: string | undefined,
  variables: { movieInput: TMovieInput }
) => {
  return apolloClient.mutate({
    mutation: gql`
      mutation AddMovie($movieInput: MovieInput) {
        addMovie(movieInput: $movieInput) {
          episodesMax
          episodesMin
          favourites
          _id
          imageURL
          lastModified
          link
          linkName
          owner
          rating
          seasonsMax
          seasonsMin
          status
          title
          type
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

export const deleteMovie = async (
  userId: string | undefined,
  variables: { id: string }
) => {
  return apolloClient.mutate({
    mutation: gql`
      mutation DeleteMovie($id: ID!) {
        deleteMovie(ID: $id)
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

export const editMovie = async (
  userId: string | undefined,
  variables: {
    id: string;
    movieInput: TMovieInput;
  }
) => {
  return apolloClient.mutate({
    mutation: gql`
      mutation EditMovie($id: ID!, $movieInput: MovieInput) {
        editMovie(ID: $id, movieInput: $movieInput)
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
