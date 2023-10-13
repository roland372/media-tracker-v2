import mongoose, { Schema } from 'mongoose';
import { TBook } from '../../types';
import { EBookStatus } from '@common/types';

const BookSchema: Schema = new Schema<TBook>(
  {
    author: { type: String, default: '', required: true },
    favourites: { type: Boolean, default: false },
    genre: { type: String, default: '' },
    imageURL: { type: String, default: '' },
    lastModified: { type: Number, index: true },
    link1: { type: String, default: '' },
    link1Name: { type: String, default: '' },
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
  { versionKey: false, collection: 'books', timestamps: true }
);

export default mongoose.model('Books', BookSchema);
