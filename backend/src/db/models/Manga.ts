import mongoose, { Schema } from 'mongoose';
import { TManga, EMangaStatus, EMangaType } from '@common/types';
import { v4 as uuidv4 } from 'uuid';

const MangaSchema: Schema = new Schema<TManga>(
	{
		chaptersMax: { type: Number, default: 0, min: 0 },
		chaptersMin: { type: Number, default: 0, min: 0 },
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
			enum: EMangaStatus,
			default: EMangaStatus.PLAN_TO_READ,
		},
		title: { type: String, required: true, index: true },
		type: {
			type: String,
			enum: EMangaType,
			default: EMangaType.MANGA,
		},
		volumesMax: { type: Number, default: 0, min: 0 },
		volumesMin: { type: Number, default: 0, min: 0 },
	},
	{ versionKey: false, collection: 'manga' }
);

export default mongoose.model('Manga', MangaSchema);
