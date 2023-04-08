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
		password: { type: String, min: 6, max: 30 },
		role: { enum: EUserRole, default: EUserRole.USER },
		username: { type: String, required: true, unique: true },
		uid: { type: String, required: true, default: uuidv4() }
	},
	{ versionKey: false, collection: 'Users' }
);

export default mongoose.model('Users', UserSchema);
