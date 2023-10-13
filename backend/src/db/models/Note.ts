import mongoose, { Schema } from 'mongoose';
import { TNote } from '../../types';

const NoteSchema: Schema = new Schema<TNote>(
	{
		color: { type: String, default: "#FFFFFF" },
		lastModified: { type: Number, index: true },
		note: { type: String },
		owner: { type: String, required: true, index: true },
		title: { type: String, required: true, default: 'New Note', index: true },
	},
	{ versionKey: false, collection: 'notes', timestamps: true }
);

export default mongoose.model('Notes', NoteSchema);
