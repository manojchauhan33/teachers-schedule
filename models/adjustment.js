const mongoose = require('mongoose');

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

module.exports = mongoose.model('Adjustment', adjustmentSchema);
