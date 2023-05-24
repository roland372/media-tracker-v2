import mongoose, { Schema } from 'mongoose';
import { TNote } from '../../types';
import { v4 as uuidv4 } from 'uuid';

const NoteSchema: Schema = new Schema<TNote>(
	{
		color: { type: String, default: "#FFFFFF" },
		id: { type: String, default: uuidv4() },
		lastModified: { type: Number, index: true },
		note: { type: String },
		owner: { type: String, required: true, index: true },
		title: { type: String, required: true, default: 'New Note', index: true },
	},
	{ versionKey: false, collection: 'notes' }
);

export default mongoose.model('Notes', NoteSchema);
