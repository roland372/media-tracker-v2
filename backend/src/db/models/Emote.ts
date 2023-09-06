import mongoose, { Schema } from 'mongoose';
import { TEmote } from '@common/types';
import { v4 as uuidv4 } from 'uuid';

const EmoteSchema: Schema = new Schema<TEmote>(
	{
		favourites: { type: Boolean, default: false },
		id: { type: String, default: uuidv4() },
		lastModified: { type: Number, index: true },
		name: { type: String, required: true, index: true },
		url: { type: String, required: true },
	},
	{ versionKey: false, collection: 'emotes' }
);

export default mongoose.model('Emotes', EmoteSchema);
