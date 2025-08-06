import mongoose from 'mongoose';

const adjustmentRequestSchema = new mongoose.Schema({
  lecture: { type: mongoose.Schema.Types.ObjectId, ref: 'Timetable', required: true },
  leaveTeacher: { type: mongoose.Schema.Types.ObjectId, ref: 'Teacher', required: true },
  replacementTeacher: { type: mongoose.Schema.Types.ObjectId, ref: 'Teacher', required: true },
  date: { type: Date, required: true }, 
  status: {
    type: String,
    enum: ['Pending', 'Accepted', 'Rejected'],
    default: 'Pending'
  },
  rejectionReason: { type: String }
}, { timestamps: true });

export default mongoose.model('AdjustmentRequest', adjustmentRequestSchema);
