import { animeResolvers } from './animeResolvers';
import { mangaResolvers } from './mangaResolvers';
import { gameResolvers } from './gameResolvers';
import { characterResolvers } from './characterResolvers';
import { emoteResolvers } from './emoteResolvers';
import { noteResolvers } from './noteResolvers';
import { userResolvers } from './userResolvers';

export const resolvers = [
	animeResolvers,
	mangaResolvers,
	gameResolvers,
	characterResolvers,
	emoteResolvers,
	noteResolvers,
	userResolvers,
];
