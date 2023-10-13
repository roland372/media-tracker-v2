import mongoose, { Schema } from 'mongoose';
import { TMusic } from '../../types';
import { EMusicCategory } from '@common/types';

const MusicSchema: Schema = new Schema<TMusic>(
  {
    artist: { type: String, required: true, default: '', index: true },
    category: {
      type: String,
      required: true,
      enum: EMusicCategory,
      default: EMusicCategory.JAPANESE,
    },
    favourites: { type: Boolean, default: false },
    imageURL: { type: String, default: '' },
    lastModified: { type: Number, index: true },
    link: { type: String, default: '' },
    owner: { type: String, required: true, index: true },
    title: { type: String, required: true, index: true },
  },
  { versionKey: false, collection: 'music', timestamps: true }
);

export default mongoose.model('Music', MusicSchema);
