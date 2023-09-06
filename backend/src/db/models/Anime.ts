import mongoose, { Schema } from 'mongoose';
import { TAnime } from '../../types';
import { EAnimeStatus, EAnimeType } from '@common/types';
import { v4 as uuidv4 } from 'uuid';

const AnimeSchema: Schema = new Schema<TAnime>(
	{
		episodesMax: { type: Number, default: 0, min: 0 },
		episodesMin: { type: Number, default: 0, min: 0 },
		favourites: { type: Boolean, default: false },
		id: { type: String, default: uuidv4() },
		imageURL: { type: String, default: '' },
		lastModified: { type: Number, index: true },
		link1: { type: String, default: '' },
		link1Name: { type: String, default: '' },
		link2: { type: String, default: '' },
		link2Name: { type: String, default: '' },
		mal_id: { type: Number, default: null },
		owner: { type: String, required: true, index: true },
		rating: { type: Number, default: 0, min: 0, max: 10 },
		status: {
			type: String,
			enum: EAnimeStatus,
			default: EAnimeStatus.PLAN_TO_WATCH,
		},
		title: { type: String, required: true, index: true },
		type: {
			type: String,
			enum: EAnimeType,
			default: EAnimeType.TV_SHOW,
		},
	},
	{ versionKey: false, collection: 'anime' }
);

export default mongoose.model('Anime', AnimeSchema);
