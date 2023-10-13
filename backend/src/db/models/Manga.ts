import mongoose, { Schema } from 'mongoose';
import { TManga } from '../../types';
import { EMangaStatus, EMangaType } from '@common/types';

const MangaSchema: Schema = new Schema<TManga>(
	{
		chaptersMax: { type: Number, default: 0, min: 0 },
		chaptersMin: { type: Number, default: 0, min: 0 },
		favourites: { type: Boolean, default: false },
		imageURL: { type: String, default: '' },
		link: { type: String, default: '' },
		linkName: { type: String, default: '' },
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
	{ versionKey: false, collection: 'manga', timestamps: true }
);

export default mongoose.model('Manga', MangaSchema);
