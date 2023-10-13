import mongoose, { Schema } from 'mongoose';
import { TEmote } from '../../types';

const EmoteSchema: Schema = new Schema<TEmote>(
	{
		favourites: { type: Boolean, default: false },
		name: { type: String, required: true, index: true },
		url: { type: String, required: true },
	},
	{ versionKey: false, collection: 'emotes', timestamps: true }
);

export default mongoose.model('Emotes', EmoteSchema);
