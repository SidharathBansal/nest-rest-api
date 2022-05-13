import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
  name: String,
  username: {
    type: String,
    unique: true,
  },
  password: String,
});
