import mongoose from 'mongoose';

const adjustmentSchema = new mongoose.Schema({
  leaveId: { type: mongoose.Schema.Types.ObjectId, ref: 'Leave' },
  teacher: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  day: String,
  lecture: String,
  subject: String,
  startTime: String,
  endTime: String,
  room: String,
  status: { type: String, enum: ['Pending', 'Adjusted'], default: 'Pending' }
});

const Adjustment = mongoose.model('Adjustment', adjustmentSchema);

export default Adjustment;
