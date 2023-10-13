import mongoose, { Schema } from 'mongoose';
import { TMovie } from '../../types';
import { EMovieStatus, EMovieType } from '@common/types';

const MovieSchema: Schema = new Schema<TMovie>(
  {
    episodesMax: { type: Number, default: 0, min: 0 },
    episodesMin: { type: Number, default: 0, min: 0 },
    favourites: { type: Boolean, default: false },
    imageURL: { type: String, default: '' },
    lastModified: { type: Number, index: true },
    link: { type: String, default: '' },
    linkName: { type: String, default: '' },
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
  { versionKey: false, collection: 'movies', timestamps: true },
);

export default mongoose.model('Movies', MovieSchema);
