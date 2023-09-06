import mongoose, { Schema } from 'mongoose';
import { TBook, EBookStatus } from '../../types';
import { v4 as uuidv4 } from 'uuid';

const BookSchema: Schema = new Schema<TBook>(
  {
    author: { type: String, default: '', required: true },
    favourites: { type: Boolean, default: false },
    genre: { type: String, default: '' },
    id: { type: String, default: uuidv4() },
    imageURL: { type: String, default: '' },
    lastModified: { type: Number, index: true },
    link1: { type: String, default: '' },
    link1Name: { type: String, default: '' },
    link2: { type: String, default: '' },
    link2Name: { type: String, default: '' },
    owner: { type: String, required: true, index: true },
    pages: { type: Number, default: 0 },
    rating: { type: Number, default: 0, min: 0, max: 10 },
    status: {
      type: String,
      enum: EBookStatus,
      default: EBookStatus.PLAN_TO_READ,
    },
    title: { type: String, required: true, index: true },
  },
  { versionKey: false, collection: 'books' }
);

export default mongoose.model('Books', BookSchema);
