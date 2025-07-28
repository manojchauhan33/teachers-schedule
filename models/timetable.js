const mongoose = require('mongoose');

const timetableSchema = new mongoose.Schema({
  teacher: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  day: String,
  lecture: String, 
  subject: String,
  startTime: String,
  endTime: String,
  room: String,
  status: { type: String, enum: ['Done', 'Left', 'Pending'], default: 'Pending' }
});

module.exports = mongoose.model('Timetable', timetableSchema);
