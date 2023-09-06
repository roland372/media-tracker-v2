import mongoose, { Schema } from 'mongoose';
import { TMusic } from '../../types';
import { EMusicCategory } from '@common/types';
import { v4 as uuidv4 } from 'uuid';

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
    id: { type: String, default: uuidv4() },
    imageURL: { type: String, default: '' },
    lastModified: { type: Number, index: true },
    link: { type: String, default: '' },
    owner: { type: String, required: true, index: true },
    title: { type: String, required: true, index: true },
  },
  { versionKey: false, collection: 'music' }
);

export default mongoose.model('Music', MusicSchema);
