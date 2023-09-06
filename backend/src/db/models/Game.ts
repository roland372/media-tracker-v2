import mongoose, { Schema } from 'mongoose';
import { TGame, EGameStatus, EGameType } from '../../types';
import { v4 as uuidv4 } from 'uuid';

const GameSchema: Schema = new Schema<TGame>(
	{
		favourites: { type: Boolean, default: false },
		id: { type: String, default: uuidv4() },
		imageURL: { type: String, default: '' },
		lastModified: { type: Number, index: true },
		link1: { type: String, default: '' },
		link1Name: { type: String, default: '' },
		link2: { type: String, default: '' },
		link2Name: { type: String, default: '' },
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
	{ versionKey: false, collection: 'games' }
);

export default mongoose.model('Games', GameSchema);
