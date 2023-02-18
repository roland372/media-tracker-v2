import mongoose, { Schema } from 'mongoose';
import { TAnime, EStatus, EType } from '../../types';
import { v4 as uuidv4 } from 'uuid';

const AnimeSchema: Schema = new Schema<TAnime>(
	{
		episodesMax: { type: Number, default: 0, min: 0 },
		episodesMin: { type: Number, default: 0, min: 0 },
		favourites: { type: Boolean, default: false },
		id: { type: String, default: uuidv4() },
		imageURL: { type: String, default: '' },
		lastModified: { type: Number },
		link1: { type: String, default: '' },
		link1Name: { type: String, default: '' },
		link2: { type: String, default: '' },
		link2Name: { type: String, default: '' },
		mal_id: { type: String, default: null },
		owner: { type: String, default: process.env.NODE_ADMIN_ID },
		rating: { type: Number, default: 0, min: 0, max: 10 },
		status: {
			type: String,
			enum: EStatus,
			default: EStatus.PLAN_TO_WATCH,
		},
		title: { type: String, required: true },
		type: {
			type: String,
			enum: EType,
			default: EType.TV_SHOW,
		},
	},
	{ versionKey: false }
);

export default mongoose.model('Anime', AnimeSchema);
