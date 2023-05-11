import { rule, shield } from 'graphql-shield';
import { GraphQLError } from 'graphql/index';

const authErrorMessage = 'You are not authorized to do this';
const authErrorCode = 403;

// const isAuthenticated = rule({ cache: 'contextual' })(async (_, __, ctx) => {
// const isAuthenticated = rule()(async (_, __, ctx) => {
//   if (ctx.user) {
//     console.log("permissions: authenticated", ctx.user);
//     return ctx.user !== null;
//   } else {
//     console.log("permissions: not authenticated");
//     return new GraphQLError(authErrorMessage, {
//       extensions: { code: authErrorCode },
//     });
//   }
// });

// const isAuthenticated = rule()(async (_, __, ctx) => {
//   console.log(ctx);
//   return ctx.session.passport.user !== null;
// });

const isAuthenticated = rule()(async (_, __, ctx) => {
  // console.log("CTX", ctx);
  if (ctx.userFromContext.length) {
    console.log("permissions: authenticated");
    return ctx.userFromContext.email !== null;
  } else {
    console.log("permissions: not authenticated");
    return new GraphQLError(authErrorMessage, {
      extensions: { code: authErrorCode },
    });
  }
});

export default shield({
  Query: {
    getAllAnime: isAuthenticated,
    getSingleAnime: isAuthenticated,
    getAllManga: isAuthenticated,
    getSingleManga: isAuthenticated,
    getAllGames: isAuthenticated,
    getSingleGame: isAuthenticated,
    getAllCharacters: isAuthenticated,
    getSingleCharacter: isAuthenticated,
    getAllEmotes: isAuthenticated,
    getSingleEmote: isAuthenticated,
    getAllNotes: isAuthenticated,
    getSingleNote: isAuthenticated,
    getSingleUser: isAuthenticated,
  },

  Mutation: {
    addAnime: isAuthenticated,
    deleteAnime: isAuthenticated,
    editAnime: isAuthenticated,
    addManga: isAuthenticated,
    deleteManga: isAuthenticated,
    editManga: isAuthenticated,
    addGame: isAuthenticated,
    deleteGame: isAuthenticated,
    editGame: isAuthenticated,
    addCharacter: isAuthenticated,
    deleteCharacter: isAuthenticated,
    editCharacter: isAuthenticated,
    addEmote: isAuthenticated,
    deleteEmote: isAuthenticated,
    editEmote: isAuthenticated,
    addNote: isAuthenticated,
    deleteNote: isAuthenticated,
    editNote: isAuthenticated,
    editUser: isAuthenticated,
  },
});