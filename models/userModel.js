import { Schema, model, models } from 'mongoose';

const UserSchema = new Schema({
  email: {
    type: String,
    unique: true,
    required: [true, 'Email is required'],
  },
  username: {
    type: String,
    required: [true, 'Username is required'],
    match: [/^[a-zA-Z0-9]{4,20}$/, 'Username invalid, it should contain 4-20 alphanumeric letters and be unique!'], // Updated validation
    unique: true,
  },
  name: {
    type: String,
    required: false,
  },
  password: {
    type: String,
    required: false, // Password is now optional
  },
  image: {
    type: String,
    required: false,
  },
});

const User = models.User || model("User", UserSchema);

export default User;
