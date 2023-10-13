import mongoose, { Schema } from 'mongoose';
import { TGame } from '../../types';
import { EGameStatus, EGameType } from '@common/types';

const GameSchema: Schema = new Schema<TGame>(
	{
		favourites: { type: Boolean, default: false },
		imageURL: { type: String, default: '' },
		lastModified: { type: Number, index: true },
		link: { type: String, default: '' },
		linkName: { type: String, default: '' },
		owner: { type: String, required: true, index: true },
		playtime: { type: Number, default: 0 },
		rating: { type: Number, default: 0, min: 0, max: 10 },
		status: {
			type: String,
			enum: EGameStatus,
			default: EGameStatus.PLAN_TO_PLAY,
		},
		title: { type: String, required: true, index: true },
		type: {
			type: String,
			enum: EGameType,
			default: EGameType.GAME,
		},
	},
	{ versionKey: false, collection: 'games', timestamps: true }
);

export default mongoose.model('Games', GameSchema);
