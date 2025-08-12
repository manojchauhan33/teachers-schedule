import mongoose from 'mongoose';

const adjustmentRequestSchema = new mongoose.Schema({
  lecture: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Timetable', 
    required: true
    },

  originalTeacher: {
     type: mongoose.Schema.Types.ObjectId, 
     ref: 'User', 
     required: true 
    },

  replacementTeacher: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
   },
  date: {
     type: Date,
     required: true 
   },
  status: { 
    type: String, 
    enum: ['Requested', 'Accepted', 'Rejected'], 
    default: 'Requested' 
  },
  rejectionReason: { type: String }

}, { timestamps: true });

export default mongoose.model('AdjustmentRequest', adjustmentRequestSchema);
