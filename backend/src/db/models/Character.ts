import mongoose, { Schema } from 'mongoose';
import { TCharacter } from '../../types';
import { ECharacterGender, ECharacterSource } from '@common/types';

const CharacterSchema: Schema = new Schema<TCharacter>(
	{
		favourites: { type: Boolean, default: false },
		gender: {
			type: String,
			enum: ECharacterGender,
			default: ECharacterGender.FEMALE,
		},
		hairColor: { type: String, default: '' },
		imageURL: { type: String, default: '' },
		link: { type: String, default: '' },
		linkName: { type: String, default: '' },
		mal_id: { type: Number, default: null },
		name: { type: String, required: true, index: true },
		owner: { type: String, required: true, index: true },
		series: { type: String, default: '' },
		source: {
			type: String,
			enum: ECharacterSource,
			default: ECharacterSource.ANIME,
		},
	},
	{ versionKey: false, collection: 'characters', timestamps: true }
);

CharacterSchema.index({ owner: 1, name: 1, series: 1 }, { unique: true });

export default mongoose.model('Characters', CharacterSchema);
