import mongoose, { Schema } from 'mongoose';
import { EUserRole, TUser } from '@common/types';

const UserSchema: Schema = new Schema<TUser>(
	{
		color: {
			type: String,
			default: '#FFFFFF',
		},
		email: {
			type: String, required: true, unique: true
		},
		googleId: { type: String, index: true },
		profileDesc: { type: String, default: '' },
		profileImg: { type: String, default: '' },
		role: { type: String, enum: EUserRole, default: EUserRole.USER },
		username: { type: String, required: true },
	},
	{ versionKey: false, collection: 'users', timestamps: true },
);

export default mongoose.model('users', UserSchema);
