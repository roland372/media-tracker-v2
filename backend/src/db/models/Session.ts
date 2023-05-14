import mongoose, { Schema } from 'mongoose';

const sessionSchema: Schema = new Schema({
  _id: String,
  session: Object,
  expires: Date,
})

export default mongoose.model("Session", sessionSchema);
