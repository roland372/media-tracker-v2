import mongoose, { Schema } from 'mongoose';
import { TNote, ENoteColor } from '../../types';
import { v4 as uuidv4 } from 'uuid';

const NoteSchema: Schema = new Schema<TNote>(
	{
		color: {
			type: String,
			enum: ENoteColor,
			default: ENoteColor.PRIMARY,
		},
		id: { type: String, default: uuidv4() },
		lastModified: { type: Number },
		note: { type: String },
		title: { type: String, required: true, default: 'New Note' },
	},
	{ versionKey: false, collection: 'notes' }
);

export default mongoose.model('Notes', NoteSchema);
