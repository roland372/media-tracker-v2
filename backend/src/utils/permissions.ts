import { rule, shield } from 'graphql-shield';
import { GraphQLError } from 'graphql/index';

const authErrorMessage = 'You are not authorized to do this';
const authErrorCode = 403;

const isAuthenticated = rule()(async (_, __, ctx) => {
  if (ctx.userFromContext.length) {
    // console.log("permissions: authenticated");
    return ctx.userFromContext[0].email !== null;
  } else {
    // console.log("permissions: not authenticated");
    return new GraphQLError(authErrorMessage, {
      extensions: { code: authErrorCode },
    });
  }
});

export default shield({
  Query: {
    getAllAnime: isAuthenticated,
    getSingleAnime: isAuthenticated,
    getAllBooks: isAuthenticated,
    getSingleBook: isAuthenticated,
    getAllCharacters: isAuthenticated,
    getSingleCharacter: isAuthenticated,
    getAllEmotes: isAuthenticated,
    getSingleEmote: isAuthenticated,
    getAllGames: isAuthenticated,
    getSingleGame: isAuthenticated,
    getAllManga: isAuthenticated,
    getSingleManga: isAuthenticated,
    getAllMovies: isAuthenticated,
    getSingleMovie: isAuthenticated,
    getAllMusic: isAuthenticated,
    getSingleMusic: isAuthenticated,
    getAllNotes: isAuthenticated,
    getSingleNote: isAuthenticated,
    getSingleUser: isAuthenticated,
  },

  Mutation: {
    addAnime: isAuthenticated,
    deleteAnime: isAuthenticated,
    editAnime: isAuthenticated,
    addBook: isAuthenticated,
    deleteBook: isAuthenticated,
    editBook: isAuthenticated,
    addCharacter: isAuthenticated,
    deleteCharacter: isAuthenticated,
    editCharacter: isAuthenticated,
    addEmote: isAuthenticated,
    deleteEmote: isAuthenticated,
    editEmote: isAuthenticated,
    addGame: isAuthenticated,
    deleteGame: isAuthenticated,
    editGame: isAuthenticated,
    addManga: isAuthenticated,
    deleteManga: isAuthenticated,
    editManga: isAuthenticated,
    addMovie: isAuthenticated,
    deleteMovie: isAuthenticated,
    editMovie: isAuthenticated,
    addMusic: isAuthenticated,
    deleteMusic: isAuthenticated,
    editMusic: isAuthenticated,
    addNote: isAuthenticated,
    deleteNote: isAuthenticated,
    editNote: isAuthenticated,
    editUser: isAuthenticated,
  },
});
