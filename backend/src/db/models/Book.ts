import mongoose, { Schema } from 'mongoose';
import { TBook } from '../../types';
import { EBookStatus } from '@common/types';

const BookSchema: Schema = new Schema<TBook>(
  {
    author: { type: String, default: '', required: true },
    favourites: { type: Boolean, default: false },
    genre: { type: String, default: '' },
    imageURL: { type: String, default: '' },
    link: { type: String, default: '' },
    linkName: { type: String, default: '' },
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

BookSchema.index({ owner: 1, author: 1, title: 1 }, { unique: true });

export default mongoose.model('Books', BookSchema);
