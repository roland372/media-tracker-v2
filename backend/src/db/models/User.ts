import mongoose, { Schema } from 'mongoose';
import { EUserRole, TUser } from '../../types';
import { v4 as uuidv4 } from 'uuid';

const UserSchema: Schema = new Schema<TUser>(
	{
		color: {
			type: String,
			default: '#FFFFFF',
		},
    email: { 
      type: String, required: true, unique: true
    },
		googleId: { type: String },
    profileDesc: { type: String, default: '' },
    profileImg: { type: String, default: '' },
		role: { type: String, enum: EUserRole, default: EUserRole.USER },
		username: { type: String, required: true },
		uid: { type: String, required: true, default: uuidv4() }
	},
	{ versionKey: false, collection: 'users' }
);

export default mongoose.model('users', UserSchema);
