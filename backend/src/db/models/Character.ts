import mongoose, { Schema } from 'mongoose';
import { TCharacter, ECharacterGender, ECharacterSource } from '../../types';
import { v4 as uuidv4 } from 'uuid';

const CharacterSchema: Schema = new Schema<TCharacter>(
	{
		favourites: { type: Boolean, default: false },
		gender: {
			type: String,
			enum: ECharacterGender,
			default: ECharacterGender.FEMALE,
		},
		hairColor: { type: String, default: '' },
		id: { type: String, default: uuidv4() },
		imageURL: { type: String, default: '' },
		lastModified: { type: Number },
		link1: { type: String, default: '' },
		link1Name: { type: String, default: '' },
		mal_id: { type: Number, default: null },
		name: { type: String, required: true },
		owner: { type: String, required: true },
		series: { type: String, default: '' },
		source: {
			type: String,
			enum: ECharacterSource,
			default: ECharacterSource.ANIME,
		},
	},
	{ versionKey: false, collection: 'characters' }
);

export default mongoose.model('Characters', CharacterSchema);
