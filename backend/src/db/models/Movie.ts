import mongoose, { Schema } from 'mongoose';
import { TMovie, EMovieStatus, EMovieType } from '@common/types';
import { v4 as uuidv4 } from 'uuid';

const MovieSchema: Schema = new Schema<TMovie>(
  {
    episodesMax: { type: Number, default: 0, min: 0 },
    episodesMin: { type: Number, default: 0, min: 0 },
    favourites: { type: Boolean, default: false },
    id: { type: String, default: uuidv4() },
    imageURL: { type: String, default: '' },
    lastModified: { type: Number, index: true },
    link1: { type: String, default: '' },
    link1Name: { type: String, default: '' },
    link2: { type: String, default: '' },
    link2Name: { type: String, default: '' },
    owner: { type: String, required: true, index: true },
    rating: { type: Number, default: 0, min: 0, max: 10 },
    seasonsMax: { type: Number, default: 0, min: 0 },
    seasonsMin: { type: Number, default: 0, min: 0 },
    status: {
      type: String,
      enum: EMovieStatus,
      default: EMovieStatus.PLAN_TO_WATCH,
    },
    title: { type: String, required: true, index: true },
    type: {
      type: String,
      enum: EMovieType,
      default: EMovieType.MOVIE,
    },
  },
  { versionKey: false, collection: 'movies' },
);

export default mongoose.model('Movies', MovieSchema);
