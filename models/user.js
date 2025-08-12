import mongoose from 'mongoose';


const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  role: String,
  profilePic: String,

  resetPasswordToken: { type: String, index: true },
  resetPasswordExpire: { type: Date },

  
});


const User = mongoose.model('User', userSchema);

export default User;
