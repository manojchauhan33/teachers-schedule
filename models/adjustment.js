import mongoose from 'mongoose';

const adjustmentSchema = new mongoose.Schema({
  leaveTeacher: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  date: String,
  day: String,
  lecture: String,
  subject: String,
  room: String,
  freeTeachers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  substituteTeacher: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

const Adjustment = mongoose.model('Adjustment', adjustmentSchema);
export default Adjustment;
